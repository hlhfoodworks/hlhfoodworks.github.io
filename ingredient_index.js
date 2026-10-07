'use strict';
// ingredient_index.js - builds the compact ingredient index used by the website's "I have these ingredients" search.
// Called by build_website.js (buildIngredientIndex) and by check_ingredients.js / ingredient_search_test.js.
// Hierarchy logic mirrors generate_ingredient_review.js (keep the two in step if you change one).
//
// buildIngredientIndex(entries) where entries = [{ recipe, id, page, section }] -> index object (see Ingredient_Search_Implementation_Plan.md section 7)

const { parseLine, singularize, V } = require('./ingredient_parser.js');
const { D: DEC, fold, finalizeName } = require('./ingredient_decisions.js');

const KEEP = new Set(V.keep);
const BLOCK = new Set(V.parentBlocklist);
const STAPLE_ALWAYS = new Set((DEC.staples || {}).always || []);
const STAPLE_USUALLY = new Set((DEC.staples || {}).usually || []);
const stripParen = n => n.replace(/\s*\([^)]*\)\s*$/, '').trim();

function candidateParents(n) {
  const out = [];
  const base = stripParen(n);
  if (base !== n) out.push(base);
  const t = base.split(' ');
  for (let i = 1; i < t.length; i++) {
    const prefix = t.slice(0, i), suffix = t.slice(i).join(' ');
    if (BLOCK.has(suffix)) continue;
    if (prefix.every(w => KEEP.has(w) || ['canned', 'frozen', 'dried'].includes(w))) out.push(suffix);
  }
  return out;
}

// spelling-tolerant merge (hyphen / space / accent / plural variants are one item)
const keyWord = w => (w.length > 3 && !/(ss|us|is)$/.test(w)) ? w.replace(/ies$/, 'y').replace(/s$/, '') : w;
const foldKey = n => fold(n).replace(/-/g, ' ').split(' ').map(keyWord).join(' ');

function parseEntries(entries) {
  const parsed = [];
  for (const e of entries) {
    const lines = [];
    (e.recipe.ingredientGroups || []).forEach(g => (g.ingredients || []).forEach(i => {
      const raw = typeof i === 'string' ? i : (i.html || '');
      lines.push({ raw, ...parseLine(raw, { html: typeof i !== 'string' }) });
    }));
    parsed.push({ e, lines });
  }
  const cnt = {};
  parsed.forEach(p => p.lines.filter(l => l.kind === 'ingredient').forEach(l => l.items.forEach(n => { cnt[n] = (cnt[n] || 0) + 1; })));
  const byKey = {};
  Object.keys(cnt).forEach(n => { (byKey[foldKey(n)] = byKey[foldKey(n)] || []).push(n); });
  const dm = {};
  Object.values(byKey).forEach(vs => {
    if (vs.length < 2) return;
    const best = vs.slice().sort((a, b) => cnt[b] - cnt[a] || (b.includes('-') ? 1 : 0) - (a.includes('-') ? 1 : 0) || a.localeCompare(b))[0];
    vs.forEach(v => { if (v !== best) dm[v] = best; });
  });
  parsed.forEach(p => p.lines.forEach(l => { if (l.kind === 'ingredient') l.items = [...new Set(l.items.map(n => dm[n] || n))]; }));
  return { parsed, merged: dm };
}

function buildIngredientIndex(entries) {
  const { parsed, merged } = parseEntries(entries);
  const names = new Set();
  parsed.forEach(p => p.lines.filter(l => l.kind === 'ingredient').forEach(l => l.items.forEach(n => names.add(n))));

  // hierarchy
  const virtualCount = {};
  names.forEach(n => candidateParents(n).forEach(c => { if (!names.has(c)) virtualCount[c] = (virtualCount[c] || 0) + 1; }));
  const parentOf = {};
  names.forEach(n => {
    const cands = candidateParents(n);
    const real = cands.find(c => names.has(c));
    const virt = cands.find(c => !names.has(c) && virtualCount[c] >= 2);
    if (real) parentOf[n] = real; else if (virt) parentOf[n] = virt;
  });
  (DEC.noParent || []).forEach(n => { delete parentOf[n]; });
  Object.entries(DEC.parents || {}).forEach(([c, p]) => { if (names.has(c)) parentOf[c] = p; });
  // "(any)" items never hang under their base name: they are satisfied by the base or any of its descendants (see members below)
  Object.keys(parentOf).forEach(n => { if (/\(any\)$/.test(n)) delete parentOf[n]; });
  const all = new Set(names);
  Object.values(parentOf).forEach(p => all.add(p));

  const chain = n => { const out = []; let cur = parentOf[n], g = 0; while (cur && g++ < 10) { out.push(cur); cur = parentOf[cur]; } return out; };
  const tier = n => {
    for (const x of [n, ...chain(n)]) { if (STAPLE_ALWAYS.has(x)) return 'a'; if (STAPLE_USUALLY.has(x)) return 'u'; }
    return '';
  };

  // "(any)" members: base name + descendants, or an explicit category list from ingredient_vocab.json (anyCategories)
  const cats = V.anyCategories || {};
  const descendants = root => [...all].filter(x => x === root || chain(x).includes(root));
  const members = {};
  names.forEach(n => {
    if (!/\(any\)$/.test(n)) return;
    const base = stripParen(n);
    let m = new Set(descendants(base));
    (cats[base] || []).forEach(c => descendants(c).forEach(x => m.add(x)));
    m.delete(n);
    members[n] = [...m];
  });

  const list = [...all].sort();
  const idx = new Map(list.map((n, i) => [n, i]));
  const disp = n => n.split(' ').map(w => (DEC.displayTokens || {})[w] || w).join(' ');

  // recipes
  const recipes = [];
  const problems = [];
  parsed.forEach(({ e, lines }) => {
    const req = new Set(), opt = new Set(), anyG = [], seenAny = new Set();
    lines.forEach(l => {
      if (l.kind === 'unparsed') problems.push({ recipe: e.recipe.title, raw: l.raw });
      if (l.kind !== 'ingredient') return;
      const ids = l.items.map(n => idx.get(n));
      if (l.optional) { ids.forEach(i => opt.add(i)); return; }
      if (l.alt && ids.length > 1) {
        const k = ids.slice().sort((a, b) => a - b).join(',');
        if (!seenAny.has(k)) { seenAny.add(k); anyG.push(ids.slice().sort((a, b) => a - b)); }
      } else ids.forEach(i => req.add(i));
    });
    // an item that is required outright makes any either/or group containing it redundant
    const anyKept = anyG.filter(g => !g.some(i => req.has(i)));
    const o = { id: e.id, page: e.page, t: e.recipe.title, s: e.section };
    if (e.recipe.favorite) o.f = 1;
    o.req = [...req].sort((a, b) => a - b);
    if (anyKept.length) o.any = anyKept;
    const optOnly = [...opt].filter(i => !req.has(i)).sort((a, b) => a - b);
    if (optOnly.length) o.opt = optOnly;
    recipes.push(o);
  });

  // aliases: typed phrase -> canonical name (from review decisions and vocab)
  const alias = {};
  const addAlias = (from, to) => {
    const f = foldKey(from);
    if (!f || !to) return;
    const t = merged[to] || to;
    if (idx.has(t) && foldKey(t) !== f) alias[f] = idx.get(t);
  };
  Object.entries(DEC.rename || {}).forEach(([from, to]) => addAlias(from, finalizeName(to, singularize)));
  Object.entries(V.aliases || {}).forEach(([from, to]) => addAlias(from, finalizeName(to, singularize)));

  const parent = {};
  list.forEach((n, i) => { if (parentOf[n] && idx.has(parentOf[n])) parent[i] = idx.get(parentOf[n]); });
  const mem = {};
  Object.entries(members).forEach(([n, m]) => { mem[idx.get(n)] = m.map(x => idx.get(x)).sort((a, b) => a - b); });

  return {
    index: {
      v: 1,
      names: list.map(disp),
      keys: list.map(n => foldKey(n)),
      parent,
      virtual: list.map((n, i) => names.has(n) ? -1 : i).filter(i => i >= 0),
      stapleA: list.map((n, i) => tier(n) === 'a' ? i : -1).filter(i => i >= 0),
      stapleU: list.map((n, i) => tier(n) === 'u' ? i : -1).filter(i => i >= 0),
      alias, mem, recipes
    },
    problems, canonical: list, parentOf, names
  };
}

module.exports = { buildIngredientIndex, parseEntries, candidateParents, foldKey };
