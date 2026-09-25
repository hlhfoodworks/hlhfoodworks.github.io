'use strict';
const docx = require('/usr/local/lib/node_modules_global/lib/node_modules/docx');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageNumber, NumberFormat, Header, Footer, SectionType,
  TabStopPosition, TabStopType, LeaderType, convertInchesToTwip,
  UnderlineType, LineRuleType, ExternalHyperlink
} = docx;
const fs = require('fs');
const path = require('path');
const data = require('./cookbook_data.js');
const { displayTitle, buildHeadingsList } = require('./recipe_utils.js');
let tocPages = {};
try { tocPages = require('./toc_pages.js'); } catch(e) {}

const INDENT = convertInchesToTwip(0.25);

function makeHeading1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    pageBreakBefore: true
  });
}
function makeHeading2(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 }
  });
}
function makeHeading3(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 60 }
  });
}
function makeParagraph(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: opts.size || 22, italics: opts.italics || false })],
    spacing: { before: opts.before || 0, after: opts.after || 60 },
    indent: opts.indent ? { left: INDENT } : undefined
  });
}
function makeBullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    bullet: { level: 0 },
    spacing: { before: 0, after: 40 },
    indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) }
  });
}
function makeSubBullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    bullet: { level: 1 },
    spacing: { before: 0, after: 40 },
    indent: { left: convertInchesToTwip(0.75), hanging: convertInchesToTwip(0.25) }
  });
}
function makeSectionLabel(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, bold: true, underline: { type: UnderlineType.SINGLE } })],
    spacing: { before: 120, after: 40 }
  });
}

function buildRecipeParas(recipe) {
  const paras = [];
  // title
  paras.push(makeHeading3(displayTitle(recipe)));
  // servings line
  if (recipe.servings) {
    paras.push(makeParagraph(recipe.servings, { italics: true, after: 40 }));
  }
  // comments
  if (recipe.comments && recipe.comments.length > 0) {
    for (const c of recipe.comments) {
      paras.push(makeParagraph(c, { italics: true, after: 40 }));
    }
  }
  // ingredients
  paras.push(makeSectionLabel('Ingredients'));
  for (const grp of (recipe.ingredientGroups || [])) {
    if (grp.label) {
      const labelText = grp.note ? `${grp.label} (${grp.note})` : grp.label;
      paras.push(makeParagraph(labelText, { italics: true, before: 80, after: 20 }));
    }
    for (const ing of (grp.ingredients || [])) {
      paras.push(makeBullet(ing));
    }
  }
  // steps
  paras.push(makeSectionLabel('Steps'));
  let stepNum = 1;
  for (const step of (recipe.steps || [])) {
    if (typeof step === 'string') {
      paras.push(new Paragraph({
        children: [
          new TextRun({ text: `${stepNum}. `, size: 22, bold: true }),
          new TextRun({ text: step, size: 22 })
        ],
        spacing: { before: 40, after: 60 }
      }));
      stepNum++;
    } else if (step.lead && step.bullets) {
      paras.push(new Paragraph({
        children: [
          new TextRun({ text: `${stepNum}. `, size: 22, bold: true }),
          new TextRun({ text: step.lead, size: 22 })
        ],
        spacing: { before: 40, after: 20 }
      }));
      stepNum++;
      for (const b of step.bullets) {
        paras.push(makeSubBullet(b));
      }
    }
  }
  // source
  if (recipe.source) {
    paras.push(makeParagraph(`Source: ${recipe.source}`, { italics: true, before: 80, after: 60 }));
  }
  paras.push(new Paragraph({ text: '', spacing: { after: 120 } }));
  return paras;
}

function buildTocEntry(text, level) {
  const pageNum = tocPages[text] || tocPages['★ '.repeat(0) + text];
  const indent = level === 1 ? 0 : level === 2 ? convertInchesToTwip(0.25) : convertInchesToTwip(0.5);
  const boldLevel = level <= 2;
  return new Paragraph({
    children: [
      new TextRun({ text, size: level === 1 ? 24 : 22, bold: boldLevel }),
      new TextRun({ text: '\t', size: 22 }),
      new TextRun({ text: pageNum ? String(pageNum) : '', size: 22 })
    ],
    indent: { left: indent },
    tabStops: [
      { type: TabStopType.RIGHT, position: convertInchesToTwip(5.5), leader: LeaderType.DOT }
    ],
    spacing: { before: level === 1 ? 120 : 40, after: level === 1 ? 60 : 30 }
  });
}

function buildTocSection() {
  const paras = [];
  paras.push(new Paragraph({ text: 'Table of Contents', heading: HeadingLevel.HEADING_1, spacing: { before: 0, after: 240 } }));
  const headings = buildHeadingsList(data);
  for (const h of headings) {
    paras.push(buildTocEntry(h.text, h.level));
  }
  return paras;
}

function buildContentParas() {
  const paras = [];
  for (const section of data.sections) {
    paras.push(makeHeading1(section.title));
    if (section.subsections) {
      for (const sub of section.subsections) {
        paras.push(makeHeading2(sub.title));
        if (!sub.recipes || sub.recipes.length === 0) {
          paras.push(makeParagraph('No recipes yet.', { italics: true }));
        } else {
          for (const r of sub.recipes) {
            for (const p of buildRecipeParas(r)) paras.push(p);
          }
        }
      }
    } else {
      if (!section.recipes || section.recipes.length === 0) {
        paras.push(makeParagraph('No recipes yet.', { italics: true }));
      } else {
        for (const r of section.recipes) {
          for (const p of buildRecipeParas(r)) paras.push(p);
        }
      }
    }
  }
  return paras;
}

const pageFooter = new Footer({
  children: [
    new Paragraph({
      children: [
        new TextRun({ children: [PageNumber.CURRENT] })
      ],
      alignment: AlignmentType.CENTER
    })
  ]
});

const doc = new Document({
  styles: {
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        run: { size: 32, bold: true, color: '2E4057' },
        paragraph: { spacing: { before: 360, after: 120 } }
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        run: { size: 26, bold: true, color: '3A5A40' },
        paragraph: { spacing: { before: 240, after: 80 } }
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        run: { size: 24, bold: true, color: '1B2A3B' },
        paragraph: { spacing: { before: 200, after: 60 } }
      }
    ]
  },
  sections: [
    // Section 1: Title page (no footer)
    {
      properties: {
        type: SectionType.NEXT_PAGE
      },
      children: [
        new Paragraph({
          children: [new TextRun({ text: 'The Muhlheim Family Cookbook', size: 56, bold: true })],
          alignment: AlignmentType.CENTER,
          spacing: { before: convertInchesToTwip(2.5), after: 240 }
        }),
        new Paragraph({
          children: [new TextRun({ text: 'A collection of recipes, standardized for mise en place cooking', size: 24, italics: true })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 0 }
        })
      ]
    },
    // Section 2: TOC (with footer)
    {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } }
      },
      footers: { default: pageFooter },
      children: buildTocSection()
    },
    // Section 3: Content (with footer, page numbers continue)
    {
      properties: { type: SectionType.CONTINUOUS },
      footers: { default: pageFooter },
      children: buildContentParas()
    }
  ]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(path.join(__dirname, 'Family Cookbook.docx'), buf);
  console.log('Written: Family Cookbook.docx');
}).catch(err => {
  console.error('Error building docx:', err);
  process.exit(1);
});
