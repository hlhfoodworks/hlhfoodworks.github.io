  // ── "Made it" marks (author-only; see Made_It_Feature_Plan.md) ──────────
  // Source for the client code inlined by build_website.js. The tokens __MADE_FORM_ID__, __MADE_ENTRY__ and
  // __MADE_PASSWORD__ are replaced from made_it_config.json at build time. No template literals here.
  var notMade = false;
  (function () {
    var FORM_URL = 'https://docs.google.com/forms/d/e/__MADE_FORM_ID__/formResponse';
    var ENTRY = '__MADE_ENTRY__';
    var PASSWORD = '__MADE_PASSWORD__';
    var KEY = 'madePending';
    var nmBtn = document.getElementById('notmade-toggle');
    var pendBox = document.getElementById('made-pending');
    var modal = document.getElementById('made-modal');
    var form = document.getElementById('made-form');
    var pwInput = document.getElementById('made-pw');
    var errEl = document.getElementById('made-err');
    var nameEl = document.getElementById('made-name');
    var cancelBtn = document.getElementById('made-cancel');
    var target = null;   // the .made-btn being confirmed

    function getPending() { try { var a = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
    function setPending(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} renderPending(); }

    function showMade(btn) {
      btn.classList.add('made');
      btn.setAttribute('aria-label', 'Made');
      btn.title = 'Made it';
      btn.querySelector('.made-label').textContent = 'Made';
      var art = btn.closest('.recipe');
      if (art) art.dataset.made = '1';
      var id = btn.getAttribute('data-id');
      document.querySelectorAll('.nav-recipe-link').forEach(function (a) {
        var h = a.getAttribute('href') || '';
        if (h.slice(h.lastIndexOf('#') + 1) === id && a.parentNode) a.parentNode.dataset.made = '1';
      });
    }

    function renderPending() {
      var p = getPending();
      if (!p.length) { pendBox.style.display = 'none'; return; }
      pendBox.style.display = 'flex';
      pendBox.querySelector('.made-pend-n').textContent = p.length + ' pending made-it mark' + (p.length === 1 ? '' : 's');
    }

    // apply locally-pending marks, and drop any that the published data already contains
    var localIds = getPending();
    var stillPending = [], otherPage = [];
    localIds.forEach(function (id) {
      var btn = document.querySelector('.made-btn[data-id="' + id.replace(/"/g, '') + '"]');
      if (!btn) { stillPending.push(id); otherPage.push(id); return; }
      if (btn.classList.contains('made')) return;          // this page's published HTML already says made -> no longer pending
      showMade(btn); stillPending.push(id);
    });
    if (stillPending.length !== localIds.length) setPending(stillPending);
    // ids for recipes on other pages: ask a fresh copy of search-index.json (bypass the browser cache)
    if (otherPage.length) {
      fetch('search-index.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (index) {
        var madeIds = {};
        index.forEach(function (r) { if (r.made) madeIds[r.id] = 1; });
        var cur = getPending(), keep = cur.filter(function (id) { return !madeIds[id]; });
        if (keep.length !== cur.length) setPending(keep);
      }).catch(function () {});
    }
    renderPending();

    function openModal(btn) {
      target = btn;
      nameEl.textContent = btn.getAttribute('data-title') || '';
      pwInput.value = ''; errEl.textContent = '';
      modal.hidden = false;
      setTimeout(function () { pwInput.focus(); }, 0);
    }
    function closeModal() { modal.hidden = true; target = null; }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.made-btn');
      if (!btn) return;
      e.preventDefault();
      if (btn.classList.contains('made')) return;     // no un-making from the site
      openModal(btn);
    });
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (pwInput.value !== PASSWORD) { errEl.textContent = 'Incorrect password.'; pwInput.select(); return; }
      var btn = target, id = btn.getAttribute('data-id');
      closeModal();
      showMade(btn);
      var p = getPending();
      if (p.indexOf(id) < 0) p.push(id);
      setPending(p);
      try {
        fetch(FORM_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: ENTRY + '=' + encodeURIComponent(id) }).catch(function () {});
      } catch (err) {}
    });

    pendBox.querySelector('.made-copy').addEventListener('click', function () {
      var p = getPending();
      var text = p.join('\n');
      var done = function () { var b = pendBox.querySelector('.made-copy'); b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy list'; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { window.prompt('Copy these recipe ids:', text); });
      else window.prompt('Copy these recipe ids:', text);
    });

    // "Not yet made" filter (works with Favorites only)
    try { notMade = localStorage.getItem('notMadeOnly') === 'true'; } catch (e) {}
    nmBtn.classList.toggle('active', notMade);
    nmBtn.addEventListener('click', function () {
      notMade = !notMade;
      try { localStorage.setItem('notMadeOnly', notMade); } catch (e) {}
      nmBtn.classList.toggle('active', notMade);
      applyFilters();
    });
    if (notMade) {
      if (window.location.hash) {
        var t = document.getElementById(window.location.hash.slice(1));
        if (t && t.dataset.made === '1') { notMade = false; try { localStorage.setItem('notMadeOnly', 'false'); } catch (e) {} nmBtn.classList.remove('active'); }
      }
      applyFilters();
    }
  })();

