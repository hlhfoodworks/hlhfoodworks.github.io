// ── Ingredient search ("I have these ingredients") ───────────────────────
// Source file for the client code inlined into every page by build_website.js. Plain ES5/ES6, no template literals,
// no "</script". Uses CURRENT_PAGE, expandNavToRecipe, search, searchClear, searchResults from the page script.
(function () {
  var modeBtns = document.querySelectorAll('#mode-toggle button');
  var nameWrap = document.getElementById('search-box-wrap');
  var ingWrap = document.getElementById('ing-wrap');
  var chipBox = document.getElementById('ing-chips');
  var ingInput = document.getElementById('ing-input');
  var suggest = document.getElementById('ing-suggest');
  var hintEl = document.getElementById('ing-hint');
  var clearBtn = document.getElementById('ing-clear');
  if (!ingWrap) return;

  var mode = 'name';
  var chips = [];                    // [{ text, idx }]  idx = index into IDX.names, or -1 if unknown
  var nameQuery = '';                // remembered recipe-name query while in ingredient mode
  var IDX = null, loading = false, queue = [];
  var keyMap = {}, children = {}, recipeCount = [], sugActive = -1, sugItems = [];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  // same folding as ingredient_index.js (foldKey): accents, hyphens, plurals
  function keyWord(w) { return (w.length > 3 && !/(ss|us|is)$/.test(w)) ? w.replace(/ies$/, 'y').replace(/s$/, '') : w; }
  function foldKey(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/-/g, ' ').replace(/[^a-z0-9' ]+/g, ' ')
      .replace(/\s+/g, ' ').trim().split(' ').map(keyWord).join(' ');
  }

  function loadIdx(cb) {
    if (IDX) { cb(IDX); return; }
    queue.push(cb);
    if (loading) return;
    loading = true;
    fetch('ingredient-index.json').then(function (r) { return r.json(); }).then(function (d) {
      IDX = d; prep(); loading = false; queue.splice(0).forEach(function (f) { f(IDX); });
    }).catch(function () {
      IDX = { names: [], keys: [], parent: {}, virtual: [], stapleA: [], stapleU: [], alias: {}, mem: {}, recipes: [] };
      prep(); loading = false; queue.splice(0).forEach(function (f) { f(IDX); });
    });
  }

  function chain(i) { var out = [], c = IDX.parent[i], g = 0; while (c !== undefined && g++ < 10) { out.push(c); c = IDX.parent[c]; } return out; }

  function prep() {
    IDX.keys.forEach(function (k, i) { keyMap[k] = i; });
    IDX.sA = {}; IDX.sU = {};
    IDX.stapleA.forEach(function (i) { IDX.sA[i] = 1; });
    IDX.stapleU.forEach(function (i) { IDX.sU[i] = 1; });
    // recipe counts per name, counting descendants too (typing a parent finds its children)
    recipeCount = IDX.names.map(function () { return {}; });
    IDX.recipes.forEach(function (r, ri) {
      var all = r.req.slice();
      (r.any || []).forEach(function (g) { all = all.concat(g); });
      all.forEach(function (i) { recipeCount[i][ri] = 1; chain(i).forEach(function (p) { recipeCount[p][ri] = 1; }); });
    });
    recipeCount = recipeCount.map(function (o) { return Object.keys(o).length; });
  }

  // ── resolving typed text to a canonical name ──
  function resolve(text) {
    var k = foldKey(text);
    if (!k) return -1;
    if (keyMap[k] !== undefined) return keyMap[k];
    if (IDX.alias[k] !== undefined) return IDX.alias[k];
    return -1;
  }
  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) { d[i] = [i]; }
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function didYouMean(text) {
    var k = foldKey(text), out = [];
    IDX.keys.forEach(function (n, i) {
      if (recipeCount[i] === 0) return;
      var s = 0;
      if (n.indexOf(k) >= 0 || k.indexOf(n) >= 0) s = 1;
      else if (Math.abs(n.length - k.length) <= 2 && lev(n, k) <= 2) s = 2;
      if (s) out.push({ i: i, s: s, c: recipeCount[i] });
    });
    out.sort(function (a, b) { return a.s - b.s || b.c - a.c; });
    return out.slice(0, 3).map(function (o) { return IDX.names[o.i]; });
  }

  // ── chips ──
  function addTerms(text) {
    var parts = text.split(/[,;\n]+/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (!parts.length) return;
    loadIdx(function () {
      parts.forEach(function (p) {
        var idx = resolve(p);
        var shown = idx >= 0 ? IDX.names[idx] : p;
        if (chips.some(function (c) { return c.idx >= 0 ? c.idx === idx : (c.idx === -1 && idx === -1 && foldKey(c.text) === foldKey(p)); })) return;
        chips.push({ text: shown, idx: idx });
      });
      afterChange();
    });
  }
  function removeChip(n) { chips.splice(n, 1); afterChange(); }
  function persist() { store('ingChips', JSON.stringify(chips.map(function (c) { return c.text; }))); }
  function renderChips() {
    Array.prototype.slice.call(chipBox.querySelectorAll('.ing-chip')).forEach(function (x) { chipBox.removeChild(x); });   // keep the input
    chips.forEach(function (c, n) {
      var s = document.createElement('span');
      s.className = 'ing-chip' + (c.idx < 0 ? ' unknown' : '');
      s.innerHTML = esc(c.text) + '<button type="button" aria-label="Remove ' + esc(c.text) + '">✕</button>';
      s.querySelector('button').addEventListener('click', function () { removeChip(n); ingInput.focus(); });
      chipBox.insertBefore(s, ingInput);
    });
    clearBtn.style.display = chips.length ? 'inline' : 'none';
  }
  function afterChange() {
    persist(); renderChips(); hideSuggest(); runIngSearch();
  }

  // ── autocomplete ──
  function hideSuggest() { suggest.style.display = 'none'; suggest.innerHTML = ''; sugActive = -1; sugItems = []; }
  function showSuggest() {
    var q = ingInput.value.trim();
    if (!q) { hideSuggest(); return; }
    loadIdx(function () {
      var k = foldKey(q), have = {};
      chips.forEach(function (c) { if (c.idx >= 0) have[c.idx] = 1; });
      var pre = [], sub = [];
      IDX.keys.forEach(function (n, i) {
        if (have[i] || recipeCount[i] === 0) return;
        var words = n.split(' ');
        if (n.indexOf(k) === 0) pre.push(i);
        else if (words.some(function (w) { return w.indexOf(k) === 0; }) || n.indexOf(k) >= 0) sub.push(i);
      });
      var byCount = function (a, b) { return recipeCount[b] - recipeCount[a] || IDX.keys[a].length - IDX.keys[b].length; };
      pre.sort(byCount); sub.sort(byCount);
      sugItems = pre.concat(sub).slice(0, 8);
      sugActive = -1;
      if (!sugItems.length) { hideSuggest(); return; }
      suggest.innerHTML = '';
      sugItems.forEach(function (i, n) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'ing-sug';
        b.innerHTML = '<span>' + esc(IDX.names[i]) + '</span><span class="ing-sug-n">' + recipeCount[i] + '</span>';
        b.addEventListener('mousedown', function (e) { e.preventDefault(); pick(n); });
        suggest.appendChild(b);
      });
      suggest.style.display = 'block';
    });
  }
  function pick(n) {
    var i = sugItems[n];
    ingInput.value = '';
    addTerms(IDX.names[i]);
  }
  function moveActive(d) {
    var els = suggest.children;
    if (!els.length) return;
    if (sugActive >= 0) els[sugActive].classList.remove('active');
    sugActive = (sugActive + d + els.length) % els.length;
    els[sugActive].classList.add('active');
  }

  ingInput.addEventListener('input', function () {
    if (/[,;]/.test(ingInput.value)) { var v = ingInput.value; ingInput.value = ''; addTerms(v); return; }
    showSuggest();
  });
  ingInput.addEventListener('paste', function (e) {
    var t = (e.clipboardData || window.clipboardData).getData('text');
    if (/[,;\n]/.test(t)) { e.preventDefault(); addTerms(t); }
  });
  ingInput.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!sugItems.length) showSuggest(); else moveActive(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
    else if (e.key === 'Escape') { hideSuggest(); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (sugActive >= 0) pick(sugActive);
      else if (ingInput.value.trim()) { var v = ingInput.value; ingInput.value = ''; addTerms(v); }
    } else if (e.key === 'Backspace' && !ingInput.value && chips.length) { removeChip(chips.length - 1); }
  });
  ingInput.addEventListener('blur', function () { setTimeout(hideSuggest, 120); });
  chipBox.addEventListener('click', function () { ingInput.focus(); });
  clearBtn.addEventListener('click', function () { chips = []; afterChange(); ingInput.focus(); });
  // ── matching: a recipe matches when it uses EVERY ingredient typed (inspiration search, not a shopping check) ──
  // A typed ingredient h is found in a recipe if the recipe lists h, lists a child of h (typing a parent finds its children),
  // lists an either/or group containing one of those, or lists an "(any)" item whose members include h.
  var recSets = null;
  function buildSets() {
    if (recSets) return;
    recSets = IDX.recipes.map(function (r) {
      var set = {};
      var add = function (i) { set[i] = 1; chain(i).forEach(function (p) { set[p] = 1; }); if (IDX.mem[i]) IDX.mem[i].forEach(function (m) { set[m] = 1; chain(m).forEach(function (p) { set[p] = 1; }); }); };
      r.req.forEach(add);
      (r.any || []).forEach(function (g) { g.forEach(add); });
      (r.opt || []).forEach(add);
      return set;
    });
  }
  function evaluate(haveIdx) {
    buildSets();
    var out = [];
    IDX.recipes.forEach(function (r, ri) {
      var set = recSets[ri];
      if (haveIdx.every(function (h) { return set[h]; })) out.push({ r: r });
    });
    out.sort(function (a, b) { return (b.r.f ? 1 : 0) - (a.r.f ? 1 : 0) || a.r.t.localeCompare(b.r.t); });
    return out;
  }

  function haveParam() { return chips.map(function (c) { return c.text; }).join(','); }

  function runIngSearch() {
    searchResults.innerHTML = '';
    hintEl.innerHTML = '';
    if (!chips.length) { searchResults.style.display = 'none'; return; }
    loadIdx(function () {
      var unknown = chips.filter(function (c) { return c.idx < 0; });
      if (unknown.length) {
        hintEl.innerHTML = unknown.map(function (c) {
          var alt = didYouMean(c.text);
          return '<div>No recipes use “' + esc(c.text) + '”' + (alt.length ? ' — did you mean ' + alt.map(function (a) { return '<a href="#" data-add="' + esc(a) + '">' + esc(a) + '</a>'; }).join(', ') + '?' : '.') + '</div>';
        }).join('');
        Array.prototype.forEach.call(hintEl.querySelectorAll('a[data-add]'), function (a) {
          a.addEventListener('click', function (e) {
            e.preventDefault();
            var bad = a.parentNode.textContent;
            chips = chips.filter(function (c) { return bad.indexOf('“' + c.text + '”') < 0; });
            addTerms(a.getAttribute('data-add'));
          });
        });
      }
      var known = chips.filter(function (c) { return c.idx >= 0; }).map(function (c) { return c.idx; });
      if (!known.length) { searchResults.style.display = 'none'; return; }
      var res = evaluate(known);
      if (!res.length) {
        searchResults.innerHTML = '<div class="sr-empty">No recipes use ' + (known.length > 1 ? 'all of these' : 'this') + '.' + (known.length > 1 ? ' Try removing one.' : '') + '</div>';
        searchResults.style.display = 'block';
        return;
      }
      var label = document.createElement('div');
      label.className = 'sr-label';
      label.textContent = res.length + ' recipe' + (res.length !== 1 ? 's' : '');
      searchResults.appendChild(label);

      res.forEach(function (m) {
        var r = m.r, isSamePage = r.page === CURRENT_PAGE;
        var a = document.createElement('a');
        a.className = 'sr-item';
        a.href = isSamePage ? (r.page + '#' + r.id) : (r.page + '?have=' + encodeURIComponent(haveParam()) + '#' + r.id);
        a.innerHTML = '<span class="sr-star">' + (r.f ? '\u2605' : '') + '</span><span class="sr-title">' + esc(r.t) + '</span>' +
          (!isSamePage ? '<span class="sr-section">' + esc(r.s) + '</span>' : '');
        if (isSamePage) {
          a.addEventListener('click', function (e) {
            e.preventDefault();
            var el = document.getElementById(r.id);
            if (el) { var rect = el.getBoundingClientRect(); window.scrollTo({ top: Math.max(0, window.pageYOffset + rect.top - 24), behavior: 'smooth' }); }
            expandNavToRecipe(r.id);
          });
        }
        searchResults.appendChild(a);
      });
      searchResults.style.display = 'block';
      if (window.innerWidth <= 480) {
        searchResults.style.maxHeight = '';
        requestAnimationFrame(function () {
          var kids = searchResults.children, h = 0, n = Math.min(kids.length, 6);
          for (var i = 0; i < n; i++) h += kids[i].offsetHeight;
          searchResults.style.maxHeight = (h + 8) + 'px';
        });
      }
    });
  }

  // ── mode toggle ──
  function setMode(m, noFocus) {
    if (m === mode) return;
    if (mode === 'name') nameQuery = search.value;
    mode = m;
    Array.prototype.forEach.call(modeBtns, function (b) {
      var on = b.getAttribute('data-mode') === m;
      b.classList.toggle('active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    searchResults.innerHTML = ''; searchResults.style.display = 'none';
    if (m === 'ing') {
      nameWrap.style.display = 'none'; ingWrap.style.display = 'block';
      renderChips(); runIngSearch();
      if (!noFocus) ingInput.focus();
    } else {
      ingWrap.style.display = 'none'; nameWrap.style.display = '';
      hideSuggest();
      search.value = nameQuery; searchClear.style.display = search.value ? 'block' : 'none';
      if (search.value) runSearch();
      if (!noFocus) search.focus();
    }
  }
  Array.prototype.forEach.call(modeBtns, function (b) {
    b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); });
  });

  // ── restore state ──
  var urlHave = new URLSearchParams(location.search).get('have');
  var saved = null;
  try { saved = JSON.parse(load('ingChips') || 'null'); } catch (e) {}
  var startTerms = urlHave ? urlHave.split(',') : (Array.isArray(saved) ? saved : []);
  if (startTerms.length) {
    loadIdx(function () {
      startTerms.forEach(function (t) {
        var idx = resolve(t);
        if (!chips.some(function (c) { return c.text === (idx >= 0 ? IDX.names[idx] : t); })) chips.push({ text: idx >= 0 ? IDX.names[idx] : t, idx: idx });
      });
      renderChips();
      if (urlHave) { setMode('ing', true); } else if (mode === 'ing') { runIngSearch(); }
    });
  }
  ingInput.addEventListener('focus', function () { loadIdx(function () {}); }, { once: true });
  window.__ing = { loadIdx: loadIdx, resolve: resolve, evaluate: evaluate, names: function () { return IDX.names; } };   // test hook
})();
