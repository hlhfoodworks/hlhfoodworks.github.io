'use strict';
// made_utils.js - sets `"made": true` on recipes in cookbook_data.js by editing the file as TEXT (never re-serializing it).
// Recipe ids come from search-index.json (written by build_website.js): id -> { title, section }.
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, 'cookbook_data.js');

function loadIdMap() {
  const idx = JSON.parse(fs.readFileSync(path.join(__dirname, 'search-index.json'), 'utf8'));
  const m = new Map();
  idx.forEach(r => m.set(r.id, r));
  return m;
}

// Returns { changed: [ {id,title} ], already: [...], unknown: [...] }.  If dryRun, does not write.
function setMade(ids, { dryRun = false } = {}) {
  const map = loadIdMap();
  let text = fs.readFileSync(DATA, 'utf8');
  const lines = text.split('\n');
  const out = { changed: [], already: [], unknown: [] };
  const sectionStarts = [];
  lines.forEach((l, i) => { const m = /^      "title": "(.*)",?$/.exec(l); if (m) sectionStarts.push({ i, title: JSON.parse('"' + m[1] + '"') }); });
  for (const id of [...new Set(ids)]) {
    const rec = map.get(id);
    if (!rec) { out.unknown.push(id); continue; }
    const si = sectionStarts.findIndex(s => s.title === rec.section);
    if (si < 0) { out.unknown.push(id); continue; }
    const from = sectionStarts[si].i, to = si + 1 < sectionStarts.length ? sectionStarts[si + 1].i : lines.length;
    const want = JSON.stringify(rec.title);
    const hits = [];
    for (let i = from; i < to; i++) {
      const m = /^(\s+)"title": (".*"),?$/.exec(lines[i]);
      if (m && m[2] === want && m[1].length >= 10 && (/^\s+\{$/.test(lines[i - 1]) || (/^\s+"id": ".*",$/.test(lines[i - 1]) && /^\s+\{$/.test(lines[i - 2])))) hits.push(i);
    }
    if (hits.length !== 1) { out.unknown.push(id + (hits.length ? ' (ambiguous title)' : '')); continue; }
    const ti = hits[0];
    const indent = /^(\s+)/.exec(lines[ti])[1];
    // look for an existing made flag within this recipe's top-level keys (before its ingredientGroups)
    let has = false;
    for (let j = ti + 1; j < Math.min(ti + 12, lines.length); j++) {
      if (lines[j].startsWith(indent + '"made"')) { has = true; break; }
      if (lines[j].startsWith(indent + '"ingredientGroups"')) break;
    }
    if (has) { out.already.push({ id, title: rec.title }); continue; }
    lines.splice(ti + 1, 0, indent + '"made": true,');
    for (const s of sectionStarts) if (s.i > ti) s.i++;
    out.changed.push({ id, title: rec.title });
  }
  if (!dryRun && out.changed.length) fs.writeFileSync(DATA, lines.join('\n'), 'utf8');
  return out;
}

module.exports = { setMade };
