  // ── "Date added" filter (implemented 2026-10-29; see CLAUDE.md) ─────────
  // Inlined by build_website.js inside the page IIFE, so applyFilters() can read
  // dateFrom / dateTo. Recipes carry data-added="YYYY-MM-DD" (articles and nav items).
  // No template literals here (this file is inlined into a template string).
  var dateFrom = '', dateTo = '', datePreset = 0;
  function dateMatch(el) {
    var a = el.getAttribute('data-added') || '';
    return (!dateFrom || a >= dateFrom) && (!dateTo || a <= dateTo);
  }
  (function () {
    var box = document.getElementById('date-filter');
    var tog = document.getElementById('date-toggle');
    if (!box || !tog) return;
    var from = document.getElementById('date-from'), to = document.getElementById('date-to');
    var val = tog.querySelector('.dt-val'), cnt = document.getElementById('date-count');
    var st = document.getElementById('date-status');
    var presets = box.querySelectorAll('.dp-presets button');
    var KEY = 'dateFilter';
    var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    function iso(d) { var m = d.getMonth() + 1, x = d.getDate(); return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (x < 10 ? '0' : '') + x; }
    function today() { return iso(new Date()); }
    function daysAgo(n) { var d = new Date(); d.setDate(d.getDate() - n + 1); return iso(d); }
    function fmt(s) { var p = s.split('-'); return MON[+p[1] - 1] + ' ' + (+p[2]); }

    function save() { try { localStorage.setItem(KEY, JSON.stringify({ p: datePreset, f: dateFrom, t: dateTo })); } catch (e) {} }
    function load() {
      try {
        var s = JSON.parse(localStorage.getItem(KEY) || 'null');
        if (!s) return;
        if (s.p) { datePreset = s.p; dateFrom = daysAgo(s.p); dateTo = today(); }
        else { dateFrom = s.f || ''; dateTo = s.t || ''; }
      } catch (e) {}
    }

    function expandMatches() {
      document.querySelectorAll('.nav-section, .nav-sub, .nav-cluster').forEach(function (li) {
        if (!li.querySelector('.nav-recipe:not(.nav-hidden)')) return;
        li.querySelectorAll(':scope > ul').forEach(function (u) { u.classList.remove('collapsed'); });
        li.querySelectorAll(':scope > .nav-hd[data-toggle], :scope > .nav-sec-row > .nav-sec-arrow').forEach(function (h) { h.classList.add('open'); });
      });
    }

    function render() {
      var on = !!(dateFrom || dateTo);
      from.value = dateFrom; to.value = dateTo;
      presets.forEach(function (b) { var d = +b.dataset.days; b.classList.toggle('on', d ? d === datePreset : !on); });
      var label, phrase;
      if (!on) { label = 'Added'; phrase = ''; }
      else if (datePreset) { label = datePreset + ' days'; phrase = 'in the last ' + datePreset + ' days'; }
      else if (dateFrom && dateTo) { label = fmt(dateFrom) + ' – ' + fmt(dateTo); phrase = 'between ' + fmt(dateFrom) + ' and ' + fmt(dateTo); }
      else if (dateFrom) { label = 'Since ' + fmt(dateFrom); phrase = 'since ' + fmt(dateFrom); }
      else { label = 'Before ' + fmt(dateTo); phrase = 'on or before ' + fmt(dateTo); }
      val.textContent = label;
      tog.classList.toggle('active', on);
      var navAll = document.querySelectorAll('.nav-recipe');
      var nVis = 0; navAll.forEach(function (li) { if (dateMatch(li)) nVis++; });
      cnt.textContent = on ? nVis + ' of ' + navAll.length + ' recipes' : navAll.length + ' recipes';
      if (st) {
        st.classList.toggle('on', on);
        if (on) {
          var here = 0; document.querySelectorAll('#main .recipe').forEach(function (r) { if (dateMatch(r)) here++; });
          var secEl = document.querySelector('#main .section h2');
          st.innerHTML = '<span><strong>' + nVis + '</strong> recipe' + (nVis === 1 ? '' : 's') + ' added ' + phrase +
            (secEl ? ' <span class="dsec">(' + here + ' in ' + secEl.textContent + ')</span>' : '') +
            '</span><button type="button" class="date-status-clear">Show all</button>';
          st.querySelector('.date-status-clear').onclick = clear;
        } else { st.innerHTML = ''; }
      }
    }
    function update(userAction) { save(); applyFilters(); render(); if (userAction && (dateFrom || dateTo)) expandMatches(); }
    function clear() { dateFrom = ''; dateTo = ''; datePreset = 0; update(true); }

    tog.addEventListener('click', function () {
      var o = box.classList.toggle('open'); tog.classList.toggle('open', o); tog.setAttribute('aria-expanded', o);
    });
    presets.forEach(function (b) {
      b.addEventListener('click', function () {
        var d = +b.dataset.days;
        if (!d) { clear(); return; }
        datePreset = d; dateFrom = daysAgo(d); dateTo = today(); update(true);
      });
    });
    from.addEventListener('change', function () { datePreset = 0; dateFrom = from.value; update(true); });
    to.addEventListener('change', function () { datePreset = 0; dateTo = to.value; update(true); });
    document.getElementById('date-clear').addEventListener('click', clear);

    load();
    // A link straight to a recipe the saved date range would hide: drop the filter.
    if (dateFrom || dateTo) {
      var want = (location.hash || '').slice(1) || (new URLSearchParams(location.search).get('recipe') || '');
      var t = want ? document.getElementById(want) : null;
      if (t && t.classList.contains('recipe') && !dateMatch(t)) { dateFrom = ''; dateTo = ''; datePreset = 0; save(); }
    }
    if (dateFrom || dateTo) applyFilters();
    render();
  })();
