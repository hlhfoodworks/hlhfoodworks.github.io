#!/usr/bin/env node
/**
 * check_labels.js — Linter for cookbook_data.js ingredient group labels.
 *
 * Flags three drift patterns:
 *   Cat 1: Verb-only labels  (e.g. "Sear", "Roast", "Blend")
 *   Cat 2: Parenthetical cooking instructions  (e.g. "Sauce (whisk together)")
 *   Cat 3: Step references  (e.g. "Sauce (Step 1)", "Aromatics (Steps 2–3)")
 *
 * Allowed exceptions (not flagged):
 *   - Timing notes indicating significant advance prep, e.g.:
 *       "Overnight", "1 hour ahead", "30–60 minutes ahead", "Up to 1 day ahead",
 *       "Cool completely before using", "Make ahead"
 *   - Informational "(optional)" suffix:  "Walnuts (optional)"
 *
 * Usage:
 *   node check_labels.js          — prints issues, exits 1 if any found
 *   node check_labels.js --fix    — (future) auto-fix simple cases
 */

const data = require('./cookbook_data.js');

// ── Patterns ────────────────────────────────────────────────────────────────

// Timing notes that are ALLOWED inside parens (significant advance prep)
const ALLOWED_TIMING = /\b(overnight|make\s+ahead|\d+[–-]\d+\s+(hours?|minutes?)\s+ahead|\d+\s+(hours?|minutes?|days?)\s+ahead|up\s+to\s+\d|cool\s+completely|before\s+using)\b/i;

// Informational "(optional)" suffix — fine on its own
const OPTIONAL_SUFFIX = /^\S[\w\s–-]+\(optional\)$/i;

// Cat 1: cooking verbs that are NEVER a legitimate ingredient-group noun.
// Keep this list narrow — only words that unambiguously describe an action,
// not a thing. "Garnish", "Finish", "Roast", "Assembly", "Coating" are all
// legitimate culinary nouns and must NOT appear here.
const VERB_ONLY_LABELS = new Set([
  'sear', 'searing',   // searing fat → "Oil and butter"
  'sauté', 'saute',   // sauté → use what's in the group: "Aromatics", "Onion base"
  'fry',              // fry → "Frying oil"
  'marinate',         // marinate → "Marinade"
  'blend',            // blend → name what gets blended: "Sauce", "Mole"
  'serve',            // serve → "To serve"
]);

// Cat 2 / Cat 3 detector: label contains "(" that is NOT a pure timing note
// and NOT a pure "(optional)" suffix
function hasBadParens(label) {
  if (!label.includes('(')) return false;
  if (OPTIONAL_SUFFIX.test(label)) return false;        // "(optional)" suffix — OK
  if (ALLOWED_TIMING.test(label)) return false;         // timing note — OK
  return true;                                           // cooking instruction or step ref
}

// Cat 1 detector
function isVerbOnly(label) {
  return VERB_ONLY_LABELS.has(label.trim().toLowerCase());
}

// ── Walk all recipes ─────────────────────────────────────────────────────────

function allRecipes(section) {
  if (section.recipes) return section.recipes.map(r => ({ r, path: section.title }));
  if (section.subsections) {
    return section.subsections.flatMap(sub =>
      (sub.recipes || []).map(r => ({ r, path: `${section.title} > ${sub.title}` }))
    );
  }
  return [];
}

let issues = [];

for (const section of data.sections) {
  for (const { r, path } of allRecipes(section)) {
    for (const g of r.ingredientGroups) {
      if (!g.label) continue;

      const cat1 = isVerbOnly(g.label);
      const cat23 = hasBadParens(g.label);

      if (cat1 || cat23) {
        const type = cat1 ? 'Cat 1 (verb-only)' : g.label.includes('Step') ? 'Cat 3 (step ref)' : 'Cat 2 (paren instruction)';
        issues.push({ path, recipe: r.title, label: g.label, type });
      }
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────────────

if (issues.length === 0) {
  console.log('✓ No label drift found.');
  process.exit(0);
} else {
  console.log(`\n⚠ ${issues.length} label issue(s) found:\n`);
  for (const i of issues) {
    console.log(`  [${i.type}]`);
    console.log(`  ${i.path} — ${i.recipe}`);
    console.log(`  Label: "${i.label}"\n`);
  }
  console.log('Fix: change labels to descriptive nouns. See CLAUDE.md for rules.');
  process.exit(1);
}
