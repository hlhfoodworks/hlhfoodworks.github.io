'use strict';
// apply_made.js - applies "made it" requests to cookbook_data.js.
//   node apply_made.js --csv path/to/responses.csv      (Google Form responses: timestamp,recipe id)
//   node apply_made.js --ids path/to/ids.txt            (one recipe id per line)
//   node apply_made.js --id some-recipe-id [--id ...]
// Add --dry to preview. Ids already marked, and unknown ids, are reported and skipped. Run node build_website.js afterwards.
const fs = require('fs');
const { setMade } = require('./made_utils.js');

function splitCsv(line) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
    else if (c === '"') q = true; else if (c === ',') { out.push(cur.trim()); cur = ''; } else cur += c;
  }
  out.push(cur.trim());
  return out;
}

const args = process.argv.slice(2);
const ids = [];
const dry = args.includes('--dry');
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--id') ids.push(args[++i].trim());
  else if (args[i] === '--ids') fs.readFileSync(args[++i], 'utf8').split(/\r?\n/).forEach(l => { if (l.trim()) ids.push(l.trim()); });
  else if (args[i] === '--csv') {
    const rows = fs.readFileSync(args[++i], 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter(Boolean);
    rows.forEach((r, n) => {
      if (n === 0 && /recipe id|timestamp/i.test(r)) return;               // header row
      const cells = splitCsv(r);
      const id = cells[cells.length - 1];
      if (id) ids.push(id);
    });
  }
}
if (!ids.length) { console.log('apply_made: no requests to apply.'); process.exit(0); }
const res = setMade(ids, { dryRun: dry });
console.log('apply_made' + (dry ? ' (dry run)' : '') + ': ' + res.changed.length + ' newly marked made, ' + res.already.length + ' already made, ' + res.unknown.length + ' unknown');
res.changed.forEach(r => console.log('  + ' + r.title));
res.unknown.forEach(r => console.log('  ? unknown id: ' + r));
process.exit(0);
