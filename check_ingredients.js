'use strict';
// check_ingredients.js - ingredient linter (companion to check_labels.js).
// Run after any edit to cookbook_data.js:   node check_ingredients.js
//   exit 0  = every ingredient line parsed and every canonical name is already in the approved baseline
//   exit 1  = unparsed lines, or NEW canonical names / words that Eric has not yet given direction on
// After Eric has approved the handling of new names (they were surfaced in the recipe's approval email), record his
// decisions in ingredient_vocab.json / ingredient_decisions.json, re-run, and when the output is what he approved run:
//   node check_ingredients.js --accept      (rewrites ingredient_baseline.json with the current names)

const fs = require('fs');
const path = require('path');
const data = require('./cookbook_data.js');
const { buildIngredientIndex } = require('./ingredient_index.js');
const { V } = require('./ingredient_parser.js');

const entries = [];
const walk = (o, sec) => {
  (o.recipes || []).forEach(r => entries.push({ recipe: r, id: r.id || r.title, page: '', section: sec }));
  (o.subsections || []).forEach(s => walk(s, sec));
};
data.sections.forEach(s => walk(s, s.title));

const res = buildIngredientIndex(entries);
const current = res.canonical.filter(n => res.names.has(n)).sort();
const basePath = path.join(__dirname, 'ingredient_baseline.json');

if (process.argv.includes('--accept')) {
  fs.writeFileSync(basePath, JSON.stringify(current, null, 0), 'utf8');
  console.log('ingredient_baseline.json written (' + current.length + ' names).');
  process.exit(0);
}

let failed = false;
if (res.problems.length) {
  failed = true;
  console.log('UNPARSED ingredient lines (' + res.problems.length + '):');
  res.problems.forEach(p => console.log('  [' + p.recipe + '] ' + p.raw));
}

if (!fs.existsSync(basePath)) {
  console.log('No ingredient_baseline.json yet. Run: node check_ingredients.js --accept');
  process.exit(1);
}
const base = new Set(JSON.parse(fs.readFileSync(basePath, 'utf8')));
const baseTokens = new Set();
base.forEach(n => n.split(/[\s()-]+/).forEach(w => baseTokens.add(w)));
(V.strip || []).concat(V.keep || []).forEach(w => baseTokens.add(w));

const fresh = current.filter(n => !base.has(n));
if (fresh.length) {
  failed = true;
  const where = {};
  entries.forEach(e => {
    const seen = new Set();
    (e.recipe.ingredientGroups || []).forEach(g => (g.ingredients || []).forEach(i => {
      const raw = typeof i === 'string' ? i : (i.html || '');
      const { parseLine } = require('./ingredient_parser.js');
      parseLine(raw, { html: typeof i !== 'string' }).items.forEach(n => { if (!seen.has(n)) { seen.add(n); (where[n] = where[n] || []).push('[' + e.recipe.title + '] ' + raw); } });
    }));
  });
  console.log('NEW ingredient names not yet approved (' + fresh.length + '). Surface these to Eric with a recommendation:');
  fresh.forEach(n => {
    const newWords = n.split(/[\s()-]+/).filter(w => w && !baseTokens.has(w));
    console.log('  - ' + n + (newWords.length ? '   (new word: ' + newWords.join(', ') + ')' : '') +
      (res.parentOf[n] ? '   parent: ' + res.parentOf[n] : '   parent: none'));
    (where[n] || []).slice(0, 2).forEach(x => console.log('      ' + x));
  });
}
if (!failed) console.log('check_ingredients: OK (' + current.length + ' canonical names, ' + entries.length + ' recipes).');
process.exit(failed ? 1 : 0);
