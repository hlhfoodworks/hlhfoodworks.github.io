'use strict';
const fs = require('fs');
const path = require('path');
const data = require('./cookbook_data.js');
const { buildHeadingsList } = require('./recipe_utils.js');

const txtFile = path.join(__dirname, 'cookbook_text.txt');
const raw = fs.readFileSync(txtFile, 'utf8');

const allPages = raw.split('\f');
const TOC_SKIP = 3;
const contentPages = allPages.slice(TOC_SKIP);

function norm(s) { return s.replace(/\s+/g, ' ').trim().toLowerCase(); }

function getDocPageNum(pageText) {
  const lines = pageText.split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return null;
  const n = parseInt(lines[lines.length - 1], 10);
  return isNaN(n) ? null : n;
}

const headings = buildHeadingsList(data);
const result = {};

for (const h of headings) {
  const needle = norm(h.text);
  let found = false;

  for (let pi = 0; pi < contentPages.length; pi++) {
    const pageLines = contentPages[pi].split('\n').map(l => l.trim()).filter(Boolean);
    const searchLines = pageLines.slice(0, -1);

    if (h.level === 1) {
      // H1s start a new page — only look at line 0
      if (searchLines.length > 0 && norm(searchLines[0]) === needle) {
        result[h.text] = getDocPageNum(contentPages[pi]) || (pi + TOC_SKIP);
        found = true;
      }
    } else if (h.level === 2) {
      // H2s may appear at the top of a page or below H1
      for (let li = 0; li < Math.min(searchLines.length, 5); li++) {
        if (norm(searchLines[li]) === needle) {
          result[h.text] = getDocPageNum(contentPages[pi]) || (pi + TOC_SKIP);
          found = true;
          break;
        }
      }
      if (!found) {
        // Also check anywhere as exact line
        for (let li = 0; li < searchLines.length; li++) {
          const l1 = norm(searchLines[li]);
          const l2 = li+1 < searchLines.length ? norm(searchLines[li]+' '+searchLines[li+1]) : '';
          const l3 = li+2 < searchLines.length ? norm(searchLines[li]+' '+searchLines[li+1]+' '+searchLines[li+2]) : '';
          if (l1 === needle || l2 === needle || l3 === needle) {
            result[h.text] = getDocPageNum(contentPages[pi]) || (pi + TOC_SKIP);
            found = true;
            break;
          }
        }
      }
    } else {
      // H3 recipe titles: exact match in any window
      for (let li = 0; li < searchLines.length; li++) {
        const l1 = norm(searchLines[li]);
        const l2 = li+1 < searchLines.length ? norm(searchLines[li]+' '+searchLines[li+1]) : '';
        const l3 = li+2 < searchLines.length ? norm(searchLines[li]+' '+searchLines[li+1]+' '+searchLines[li+2]) : '';
        if (l1 === needle || l2 === needle || l3 === needle) {
          result[h.text] = getDocPageNum(contentPages[pi]) || (pi + TOC_SKIP);
          found = true;
          break;
        }
      }
    }
    if (found) break;
  }

  // Fallback for long headings only
  if (!found && needle.length > 8) {
    for (let pi = 0; pi < contentPages.length; pi++) {
      const pageLines = contentPages[pi].split('\n').map(l => l.trim()).filter(Boolean);
      const searchLines = pageLines.slice(0, -1);
      for (const line of searchLines) {
        if (norm(line).includes(needle)) {
          result[h.text] = getDocPageNum(contentPages[pi]) || (pi + TOC_SKIP);
          found = true;
          break;
        }
      }
      if (found) break;
    }
  }
}

let out = 'module.exports = {\n';
for (const [k, v] of Object.entries(result)) {
  const esc = k.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  out += `  '${esc}': ${v},\n`;
}
out += '};\n';

fs.writeFileSync(path.join(__dirname, 'toc_pages.js'), out);
console.log('Written: toc_pages.js with', Object.keys(result).length, 'entries');
Object.entries(result).forEach(([k,v]) => console.log(v, k));
