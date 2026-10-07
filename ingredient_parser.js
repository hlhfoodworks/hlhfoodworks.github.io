'use strict';
// ingredient_parser.js - DRAFT v0
// Turns free-text ingredient lines from cookbook_data.js into canonical ingredient names.
// Read-only with respect to cookbook_data.js. Vocabulary lives in ingredient_vocab.json.
// See Ingredient_Search_Implementation_Plan.md for the design.

const fs = require('fs');
const path = require('path');
const V = JSON.parse(fs.readFileSync(path.join(__dirname, 'ingredient_vocab.json'), 'utf8'));
const { applyDecisions, D } = require('./ingredient_decisions.js');

const STRIP = new Set(V.strip);
const KEEP = new Set(V.keep);
const NO_SING = new Set(V.noSingularize);
const PROTECTED = V.protectedPhrases.map(p => p.toLowerCase());

const FRAC = { '½':'1/2','⅓':'1/3','⅔':'2/3','¼':'1/4','¾':'3/4','⅛':'1/8','⅜':'3/8','⅝':'5/8','⅞':'7/8','⅕':'1/5' };
const NUMWORDS = '(?:one|two|three|four|five|six|seven|eight|nine|ten|twelve|a|an|half|a half)';
const UNITS = [
  'cups?','tablespoons?','teaspoons?','tbsps?','tsps?','pounds?','lbs?','oz','ounces?','g','grams?','kg','ml','liters?','litres?',
  'quarts?','pints?','gallons?','cans?','packages?','pkgs?','pinch(?:es)?','dash(?:es)?','bunch(?:es)?','handfuls?','sprigs?',
  'dozen','drops?','ears?','sections?','sachets?','cartons?','qts?','amount','tubes?','squares?','glass(?:es)?','racks?','sticks?','heads?','slices?','pieces?','disks?','discs?','stalks?','ribs?','sheets?','strips?','jars?','bottles?','boxes?','bags?',
  'loaf','loaves','links?','fillets?','knobs?','scoops?','splash(?:es)?','drizzles?','squeezes?','inch(?:es)?','batch(?:es)?','packets?','envelopes?','tubs?','containers?','bulbs?','cloves?(?= garlic)'
];
const UNIT_RE = new RegExp('^(?:packed\\s+)?(?:' + UNITS.join('|') + ')\\b\\.?');
const CAN_UNITS = /^(?:cans?|jars?|tubs?)\b/;

function normalize(s) {
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/[½⅓⅔¼¾⅛⅜⅝⅞⅕]/g, m => ' ' + FRAC[m]);
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  s = s.replace(/[’‘]/g, "'").replace(/[–—]/g, '-').replace(/\s&\s/g, ' and ');
  s = s.replace(/\bextra firm\b/g, 'extra-firm').replace(/\bextra virgin\b/g, 'extra-virgin');
  s = s.replace(/\b(?:diamond crystal|morton)(?: kosher)?(?: salt)?\b/gi, 'kosher salt').replace(/\s\+\s/g, ' and ');
  s = s.replace(/\bconfectioners'/g, 'confectioners').replace(/\s+/g, ' ').trim().toLowerCase();
  return s;
}

function stripQuantity(s, info) {
  let prev;
  do {
    prev = s;
    s = s.replace(/^(?:about|approximately|roughly|a generous|generous|scant|slightly heaping|heaping|heaped|rounded|level|a few|few|several|a couple of|couple of|up to|at least|hefty|healthy|a small|a big|small|big|tiny|good|a good|plus)\s+(?=\S)/, '');
    s = s.replace(/^[\d][\d\/.\s]*(?:\s*(?:-|to|or)\s*[\d][\d\/.\s]*)?(?=\s|-|[a-z]|$)/, '');
    s = s.replace(new RegExp('^' + NUMWORDS + '\\s+(?=\\S)'), '');
    s = s.replace(/^[-+]?\s*/, '');
    const m = s.match(UNIT_RE);
    if (m) { if (CAN_UNITS.test(s)) info.canHint = true; s = s.slice(m[0].length).trim(); }
    s = s.replace(/^\/\s*/, '');
    s = s.replace(/^of\s+/, '');
    s = s.replace(/^x\s*\d+\s*/, '');
  } while (s !== prev && s.length);
  return s.trim();
}

function singularizeWord(w) {
  if (NO_SING.has(w)) return w;
  if (w.length < 4) return w;
  if (/(ss|us|is|ous)$/.test(w)) return w;
  if (/^chil(?:ie|e)s$/.test(w)) return 'chile';
  if (/ies$/.test(w)) return w.slice(0, -3) + 'y';
  if (/(tomato|potato|mango|avocado)es$/.test(w)) return w.slice(0, -2);
  if (/(ch|sh|x)es$/.test(w)) return w.slice(0, -2);
  if (/(leaves|loaves|halves|knives|wolves|calves|shelves)$/.test(w)) return w.slice(0, -3) + 'f';
  if (/s$/.test(w)) return w.slice(0, -1);
  return w;
}

function singularize(phrase) {
  const t = phrase.split(' ');
  if (!t.length) return phrase;
  // singularize last token; also first token of compounds like "tomatoes and" not needed
  t[t.length - 1] = singularizeWord(t[t.length - 1]);
  return t.join(' ');
}

function cleanTokens(part, info) {
  // protect phrases
  let protectedMap = [];
  let p = ' ' + part + ' ';
  PROTECTED.forEach((ph, i) => {
    if (p.includes(' ' + ph + ' ') || p.includes(' ' + ph + 's ')) {
      const key = '§' + i + '§';
      p = p.split(' ' + ph + ' ').join(' ' + key + ' ');
      protectedMap.push([key, ph]);
    }
  });
  let tokens = p.trim().split(' ').filter(Boolean);
  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    let w = tokens[i].replace(/^[^a-z0-9§']+|[^a-z0-9§']+$/g, '');
    if (!w) continue;
    const pm = protectedMap.find(([k]) => k === w);
    if (pm) { out.push(pm[1]); continue; }
    if (/\d/.test(w) && !/^\d+%$/.test(w)) continue;           // dimensions, leftover numbers
    if (/-inch$|^inch$/.test(w)) continue;
    if (w === 'leaves' || w === 'leaf') {
      const prev = out[out.length - 1];
      if (prev && ['bay', 'kaffir', 'curry', 'makrut', 'lime'].includes(prev)) out.push('leaf'); // keep: bay leaf, curry leaf
      continue;                                                // basil leaves -> basil
    }
    if (w === 'cloves' || w === 'clove') {
      if (out[out.length - 1] === 'garlic') continue;          // garlic cloves -> garlic
    }
    if (STRIP.has(w)) continue;
    out.push(w);
  }
  return out;
}

function canonicalize(tokens) {
  let phrase = singularize(tokens.join(' ').trim().replace(/\bskinless boneless\b/, 'boneless skinless'));
  if (!phrase) return '';
  for (let i = 0; i < 3; i++) {
    const a = V.aliases[phrase];
    if (!a || a === phrase) break;
    phrase = a;
  }
  return phrase;
}

const TAIL_IDENTITY = [
  [/packed in (?:olive )?oil|in oil|oil-packed/, 'in oil'],
  [/packed in water|in water|water-packed/, 'in water'],
  [/in brine/, 'in brine'],
  [/in syrup/, 'in syrup'],
  [/\bcanned\b|\btinned\b/, 'canned'],
  [/\bjarred\b/, 'jarred'],
  [/\bfrozen\b/, 'frozen']
];

const SHARED_NOUNS = new Set(['oil', 'vinegar', 'stock', 'broth', 'wine', 'cheese', 'sugar', 'flour', 'milk', 'cream', 'powder', 'noodle', 'rice', 'salt', 'tomato', 'cucumber', 'mushroom', 'potato', 'tortilla', 'sausage', 'onion', 'lentil', 'cabbage']);
const NO_SHARE = new Set(['ghee','butter','lard','shortening','margarine','tamari','shoyu','water','broth','stock']);
const PREP_START = new Set(['chopped','minced','diced','sliced','grated','peeled','halved','quartered','cut','crushed','torn','beaten','melted','softened','divided','finely','coarsely','roughly','thinly','trimmed','rinsed','drained','cubed','seeded','crumbled','stemmed','removed','thawed','plus','about','preferably','reserved','at','room','lightly','stems','stalks','shredded','toasted','cooked','mashed','zested','juiced','slit','scraped','deseeded','seeded']);

const STATE_COLOR = new Set(['frozen','dried','canned','jarred','red','white','yellow','green','black','brown','golden','orange','purple','plain','low-sodium','unsalted','salted','light','dark','hot','mild','spicy','smoked','roasted','pickled','sun-dried']);
function isAdjOnly(seg, res) {
  const t = seg.trim().split(/\s+/).filter(Boolean).map(w => w.replace(/[^a-z0-9'-]/g, '')).filter(Boolean);
  return t.every(w => STRIP.has(w) || KEEP.has(w) || /\d/.test(w));
}

function parseLine(raw, opts = {}) {
  const res = { raw, kind: 'ingredient', optional: false, canHint: false, items: [], alt: false, notes: [], tailIdentity: [] };
  let s = normalize(raw);
  const wp = s.match(/\b(water|oil)-packed\b/);
  if (wp) { res.tailIdentity.push('in ' + wp[1]); s = s.replace(wp[0], ' ').replace(/\s+/g, ' ').trim(); }
  const s0 = s;
  if (D.lineOverrides && D.lineOverrides[raw] && !opts.html) {
    res.origItems = [];
    const ad = applyDecisions(Object.assign(res, { items: [] }), singularize);
    res.items = ad.items; res.alt = ad.alt; res.andList = ad.andList; res.optional = ad.optional; res.applied = ad.applied;
    res.kind = ad.kind === 'ingredient' ? (ad.items.length ? 'ingredient' : 'unparsed') : ad.kind;
    res.overridden = true;
    return res;
  }
  if (opts.html || /^(?:\d+\s+)?(?:batch(?:es)?|disks?|recipe)\b/.test(s) || /^dough for\b/.test(s)) {
    res.kind = 'recipe-ref';
    return res;
  }
  if (/^\(/.test(s)) { res.kind = 'note'; return res; }
  const sNoParen = s.replace(/\([^)]*\)/g, ' ');
  if ((/\breserved\b/.test(sNoParen) && !/water|liquid|juice|cooking/.test(sNoParen)) || /\((?:the )?(?:remaining|reserved|from above|from step|from the)\b[^)]*\)/.test(s)) { res.kind = 'internal-ref'; return res; }

  // parentheticals
  const parens = [];
  s = s.replace(/\(([^)]*)\)/g, (m, p) => { parens.push(p); return ' '; }).replace(/\s+/g, ' ').trim();
  const parenText = parens.join(' ');
  if (/optional/.test(parenText) || /\boptional\b/.test(s)) res.optional = true;
  if (/\bcans?\b(?!\s+(?:be\b|also\b|substitut|replac|work|use\b|sub\b))|\bcanned\b|\bjar\b/.test(parenText)) res.canHint = true;
  const parenAlt = /^\s*or\b/.test(parenText);
  if (/substitut/.test(parenText)) res.notes.push('paren alternative: ' + parenText.trim());
  if (parenAlt && /\b(?:dried|fresh|frozen|canned)\b/.test(parenText)) res.parenFormAlt = true;
  if (!parenAlt) for (const [re, tag] of TAIL_IDENTITY) if (re.test(parenText)) res.tailIdentity.push(tag);

  // noise phrases
  s = s.replace(/,?\s*(?:or|plus)?\s*(?:more|extra|less)?\s*(?:as needed|to taste|if needed|if desired|if using|for [a-z ,'-]*(?:serving|garnish|garnishing|dusting|greasing|drizzling|brushing|frying|the pan|sprinkling|topping|dipping|finishing|coating|rolling|cooking|searing|sauteing|sautéing|grilling|dredging)\b[a-z ,'-]*)$/g, '');
  s = s.replace(/,?\s*plus (?:more|extra) .*$/, '').replace(/,\s*(?:or more|or less|or so)\b.*$/, '');
  s = s.replace(/\b(?:or|plus) (?:more|less)\b/g, ' ').replace(/\boptional\b/g, '').replace(/\s+/g, ' ').trim();

  // "juice of 1/2 lemon" / "zest of 1 lime"
  const jz = s.match(/\b(juice|zest) of (.+)$/) && s.match(/(juice|zest) of (.+)$/);
  const jz2 = s.match(/^(?:zest and juice|juice and zest) of (.+)$/);
  if (jz2) { const x = stripQuantity(jz2[1].split(',')[0], res); s = x + ' zest and ' + x + ' juice'; }
  else if (jz) { s = singularize(stripQuantity(jz[2].split(',')[0], res)) + ' ' + jz[1]; }
  else s = stripQuantity(s, res);
  s = s.replace(/\s+(?:such as|e\.g\.)\b.*$/, '');

  // merge adjective-only leading segments: "boneless, skinless chicken thighs", "large, ripe tomatoes"
  let segs = s.split(',').map(x => x.trim());
  while (segs.length > 1 && isAdjOnly(segs[0], res)) { segs = [segs[0] + ' ' + segs[1], ...segs.slice(2)]; }

  let head, tail = '';
  const lastHasOr = segs.length > 1 && / or /.test(',' + segs.slice(1).join(',') + ',') && /(^|\s)or\s/.test(segs[segs.length - 1]);
  const listOk = lastHasOr && segs.every(sg => sg.split(' ').length <= 5 && !PREP_START.has(sg.replace(/^or /, '').split(' ')[0]));
  if (listOk) {
    head = segs.map(x => x.replace(/^or\s+/, '')).join(' or ');
    res.listAlt = true;
  } else { head = segs[0]; tail = segs.slice(1).join(','); }
  for (const [re, tag] of TAIL_IDENTITY) if (re.test(tail)) res.tailIdentity.push(tag);

  head = head.replace(/\s+-\s+.*$/, '').trim();
  head = head.replace(/\s+(?:dissolved|mixed with|combined with|stirred into|whisked with|blended with)\b.*$/, '').replace(/\s+with (?:the )?skin\b/, '').replace(/^(zest|juice) from (?:half |1\/2 )?(?:a |an )?(.*)$/, '$2 $1').replace(/\s+from\b.*$/, '').replace(/\s+(?:such as|e\.g\.)\b.*$/, '').replace(/\s+(?:with\s+|and\s+)?(?:their|its)\s+(?:juices?|liquid|oil)\b.*$/, '').replace(/\s+liquid$/, '');
  // "tomatoes in puree" / "tuna packed in oil"
  const inM = head.match(/\s+(?:packed\s+)?in\s+(oil|water|brine|syrup|puree|juice|adobo|heavy syrup)\b.*$/);
  if (inM) { head = head.replace(inM[0], ''); if (['oil', 'water', 'brine', 'syrup', 'adobo'].includes(inM[1])) res.tailIdentity.push('in ' + inM[1]); }

  // equivalent-or phrases (standing substitutions) become one placeholder token: "aleppo pepper or red pepper flakes"
  const eqMap = {};
  V.equivalentOrPhrases.forEach((e, i) => {
    const re = new RegExp(e.pattern);
    if (re.test(head)) { const key = 'eqphrase' + 'abcdefgh'[i]; head = head.replace(re, key); eqMap[key] = e.canonical; res.equiv = true; }
  });

  let parts;
  if (/ or | and\/or /.test(head)) {
    parts = head.replace(/ and\/or /g, ' or ').split(/\s+or\s+/);
    res.alt = true;
  } else if (/ and /.test(head) && !V.protectedAnd.some(ph => head.includes(ph))) {
    parts = head.split(/\s+and\s+/);
    res.andList = true;
  } else parts = [head];

  const partToks = parts.map(p => cleanTokens(stripQuantity(p.trim(), res), res));
  if (parts.length > 1) {
    const lastTok = partToks[partToks.length - 1];
    const noun = lastTok[lastTok.length - 1];
    // adjective-only part inherits the trailing noun phrase: "fresh or frozen udon noodles", "red or white wine vinegar"
    let k = 0; while (k < lastTok.length - 1 && KEEP.has(lastTok[k]) && lastTok[k] !== 'sweet') k++;
    const nounPhrase = lastTok.slice(k);
    partToks.forEach((t, i) => {
      if (i >= partToks.length - 1 || !parts[i].trim()) return;
      if (t.length === 0 || t.every(w => KEEP.has(w))) t.push(...nounPhrase);
      else if (t.length === 1 && res.alt && lastTok.length >= 2 && SHARED_NOUNS.has(singularizeWord(noun)) && !NO_SHARE.has(t[0]) && singularizeWord(t[0]) !== singularizeWord(noun)) t.push(noun);
    });
  }
  for (const toks of partToks) {
    let name = canonicalize(toks);
    for (const [k, c] of Object.entries(eqMap)) name = name.split(k).join(c);
    if (/cooking water$/.test(name)) name = 'water';
    if (name) res.items.push(name);
  }
  res.items = [...new Set(res.items)];
  if (res.items.length === 1) { res.alt = false; res.andList = false; }
  // canned / tail identity hints
  res.items = res.items.map(n => {
    let v = n;
    if (res.tailIdentity.length && res.items.length === 1) {
      for (const t of res.tailIdentity) {
        if (t.startsWith('in ')) { if (!/\(in /.test(v)) v += ' (' + t + ')'; }
        else if (!v.split(' ').includes(t)) v = t + ' ' + v;
      }
    }
    if (res.canHint && res.items.length === 1 && !/^canned /.test(v) && !/\(in /.test(v) && !V.noCanTag.includes(v)) v = 'canned ' + v;
    return v;
  });
  if (res.parenFormAlt || /\(\s*or\s+frozen\s*\)/.test(s0)) res.items = res.items.map(n => n.replace(/^(?:dried|frozen|canned) /, ''));
  // fresh pasta: keep "fresh" when the line asks for fresh pasta and does not also allow dried
  if (/\bfresh\b/.test(s0) && !/\bdried\b/.test(s0)) res.items = res.items.map(n => (/\b(pasta|noodle|fettuccine|linguine|spaghetti|lasagna|tagliatelle|ravioli|gnocchi)\b/.test(n) && !/^fresh /.test(n)) ? 'fresh ' + n : n);
  {
    const pre = s0.split(',')[0];
    const cheese = /\b(cheddar|mozzarella|gruyere|monterey jack|pepper jack|parmesan|swiss|provolone|colby|jack|fontina|asiago|gouda|cheese)\b/;
    if (/\bshredded\b/.test(pre) && !/coconut/.test(pre)) res.items = res.items.map(n => (cheese.test(n) && !/^shredded /.test(n)) ? 'shredded ' + n : n);
    if (/\bcrumbled\b/.test(pre)) res.items = res.items.map(n => (/^feta\b/.test(n) && !/^crumbled /.test(n)) ? 'crumbled ' + n : n);
  }
  res.origItems = res.items.slice();
  if (res.kind === 'ingredient') {
    const ad = applyDecisions(res, singularize);
    res.items = ad.items; res.alt = ad.alt; res.andList = ad.andList; res.optional = ad.optional; res.applied = ad.applied;
    if (ad.kind && ad.kind !== 'ingredient') res.kind = ad.kind;
  }
  if (res.kind === 'ingredient' && !res.items.length) res.kind = (res.applied && res.applied.some(a => a[1] === '(ignored)')) ? 'ignored' : 'unparsed';
  return res;
}

module.exports = { parseLine, normalize, singularize, singularizeWord, V };
