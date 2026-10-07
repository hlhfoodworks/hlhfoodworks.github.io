'use strict';
// ingredient_decisions.js - applies Eric's review decisions (ingredient_decisions.json) to parser output.
// Order for each parsed line:  per-line override  ->  per-name rename / split / ignore  ->  spelling & naming rules.
// See extract_review_decisions.py for where the data comes from and Ingredient_Search_Implementation_Plan.md for context.

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'ingredient_decisions.json');
const D = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { rename: {}, ignore: [], split: {}, lineOverrides: {}, typos: {}, parents: {}, distinctPairs: [], staples: { always: [], usually: [] }, displayTokens: {} };

const IGNORE = new Set(D.ignore || []);
const BLEND = new Set(['chili powder', 'dark chili powder']);   // Decision 2: the spice blend keeps the "chili" spelling
const CITRUS = 'lemon|lime|orange|grapefruit|tangerine|clementine|mandarin|yuzu';
const PASTA = 'pasta|noodle|spaghetti|fettuccine|linguine|fusilli|penne|rigatoni|macaroni|orzo|lasagna|elbow|seed';

function fold(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

// naming rules (Decisions 1, 5, 6, 7, 8 and typo/plural clean-up)
const KEEP_EXACT = new Set(['aleppo pepper or red pepper flakes', 'jasmine or basmati rice']);
function rules(n, singularize) {
  n = n.split(' ').map(w => (D.typos && D.typos[w]) || w).join(' ');
  if (KEEP_EXACT.has(n)) return n;
  n = singularize(n);
  if (!BLEND.has(n)) n = n.replace(/\bchil(?:i|li|ly)\b/g, 'chile');                       // D1: spell it "chile"
  n = n.replace(/\b(jalapeno|serrano|habanero) (?:pepper|chile)\b/g, '$1').replace(/\bchile pepper\b/g, 'chile'); // D1 option C
  if (/\bstock$/.test(n) && !/\b(?:fish|seafood|shrimp|shellfish|clam)\s+stock$/.test(n)) n = n.replace(/\bstock$/, 'broth'); // D5
  n = n.replace(/\bbread crumb/g, 'breadcrumb');                                           // D6
  const z = n.match(new RegExp('^(' + CITRUS + ')s? (?:zest|rind|peel)$'));               // D7: zest follows the fruit
  if (z) n = z[1];
  const dr = n.match(new RegExp('^dried (.*\\b(?:' + PASTA + ')s?\\b.*)$'));                // D8: dried pasta/noodles/seeds
  if (dr) n = dr[1];
  n = n.replace(/^whole (star anise|chinese five spice|trout|chicken wing)\b/, '$1');      // D8: whole spices / fish
  return n;
}

function finalizeName(name, singularize) {
  let n = fold(name);
  for (let i = 0; i < 8; i++) {
    const prev = n;
    if (D.rename && Object.prototype.hasOwnProperty.call(D.rename, n)) n = D.rename[n];
    n = rules(n, singularize);
    if (n === prev) break;
  }
  return n;
}

// returns { items, mode, optional, kind, applied }  where applied lists [orig, final] pairs for the change log
function applyDecisions(res, singularize) {
  const out = { items: [], alt: false, andList: false, optional: res.optional, kind: res.kind, applied: [] };
  const lo = D.lineOverrides && D.lineOverrides[res.raw];
  if (lo) {
    if (lo.kind) { out.kind = lo.kind; out.items = []; out.applied.push([res.items.join(' | '), '(' + lo.kind + ')']); return out; }
    out.items = [...new Set(lo.items.map(i => finalizeName(i, singularize)))];
    out.alt = lo.mode === 'alt' && out.items.length > 1;
    out.andList = lo.mode === 'and' && out.items.length > 1;
    if (lo.optional) out.optional = true;
    out.applied.push([res.items.join(' | '), out.items.join(' | ') + '  [line override]']);
    return out;
  }
  const items = [];
  for (const orig of res.items) {
    const f0 = fold(orig);
    if (D.split && D.split[f0]) { D.split[f0].forEach(x => items.push(finalizeName(x, singularize))); out.applied.push([orig, D.split[f0].join(' + ')]); continue; }
    if (IGNORE.has(f0)) { out.applied.push([orig, '(ignored)']); continue; }
    const f = finalizeName(orig, singularize);
    if (f && !IGNORE.has(f)) items.push(f);
    if (f !== orig) out.applied.push([orig, f || '(dropped)']);
  }
  out.items = [...new Set(items)];
  out.alt = res.alt && out.items.length > 1;
  out.andList = res.andList && out.items.length > 1;
  return out;
}

module.exports = { applyDecisions, finalizeName, fold, D };
