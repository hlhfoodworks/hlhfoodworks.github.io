'use strict';
const fs = require('fs');
const path = require('path');
const data = require('./cookbook_data.js');
const { displayTitle } = require('./recipe_utils.js');

// ── Cluster assignments ────────────────────────────────────────────────────
// Recipes not in this map are rendered without a cluster level in the nav.
// Add entries here whenever a subsection grows large enough to need grouping.
const CLUSTER_MAP = {
  // Chicken — American/Contemporary
  'Baked Crunchy Hot Honey Chicken':                      'American',
  'Brown Butter Sage Skillet Chicken':                    'American',
  'Company Baked Chicken':                                'American',
  'Creamy Spinach-Artichoke Chicken Stew':                'American',
  'Crispy Chicken With Lime Butter':                      'American',
  'Crispy Spice Rubbed Chicken Thighs':                   'American',
  'Grilled Buffalo Wings':                                'American',
  'Skillet Chicken and Zucchini With Charred Scallion Salsa': 'American',
  'Spring Chicken Paillard':                              'American',
  'Weeknight Fancy Chicken and Rice':                     'American',
  // Chicken — Latin/South American
  'Chicken Fajita Marinade':                              'Latin/South American',
  'D.L. Jardine\'s Fajita Marinade':                     'Latin/South American',
  'Peruvian Roasted Chicken With Spicy Cilantro Sauce':  'Latin/South American',
  'Slow-Cooker Chicken Mole':                             'Latin/South American',
  // Vegetables — Italian
  'Eggplant Parmesan':                                    'Italian',
  // Chicken — Italian
  'Chicken Cacciatore':                                   'Italian',
  'Chicken Piccata':                                      'Italian',
  'Marry Me Chicken':                                     'Italian',
  // Chicken — Central/Eastern European
  'Chicken Kiev':                                         'Central/Eastern European',
  'Chicken Paprikash':                                    'Central/Eastern European',
  // Chicken — Mediterranean/Greek
  'Chicken-Zucchini Meatballs With Feta':                'Mediterranean/Greek',
  'Greek Chicken and Orzo Pasta Salad':                   'Mediterranean/Greek',
  'Mediterranean Grilled Chicken Thighs with Dill Yogurt Sauce': 'Mediterranean/Greek',
  'One-Pot Chicken and Rice With Caramelized Lemon':     'Mediterranean/Greek',
  // Chicken — Moroccan/North African
  'Chicken Tagine With Olives and Preserved Lemons':     'Moroccan/North African',
  'Sheet-Pan Chicken With Chickpeas, Cumin and Turmeric': 'Moroccan/North African',
  // Chicken — West African
  'Chicken Yassa':                                        'West African',
  // Chicken — Middle Eastern/Persian
  'Grilled Chicken Skewers with Toum (Shish Taouk)':    'Middle Eastern/Persian',
  'Spiced Green Meatballs with Pickle Rice and Salty Yogurt': 'Middle Eastern/Persian',
  // Chicken — Indian
  'Amu\'s Chicken Korma':                                'Indian',
  'Bhatti da Murgh (Indian Grilled Chicken With Whole Spices)': 'Indian',
  'Chicken Tikka Masala':                                 'Indian',
  // Chicken — Thai
  'One-Pot Chicken and Rice with Peanut Sauce':          'Thai',
  'Pad Krapow Gai (Thai Basil Chicken)':                 'Thai',
  'Sticky Coconut Chicken and Rice':                     'Thai',
  'Thai Chicken Meatballs in Peanut Sauce':              'Thai',
  'Thai-Inspired Chicken Meatball Soup':                 'Thai',
  // Chicken — Vietnamese
  'Vietnamese Caramel Ginger Chicken':                   'Vietnamese',
  // Chicken — Filipino
  'Easiest Chicken Adobo':                               'Filipino',
  // Chicken — Korean-inspired
  'Coconut-Gochujang Glazed Chicken With Broccoli':      'Korean-inspired',
  'Peachy Peanut & Kimchi Chicken':                      'Korean-inspired',
  // Chicken — Chinese
  "Chile Crisp Chicken n' Peanuts Scoop":                'Chinese',
  'Kung Pao Chicken and Broccoli':                       'Chinese',
  'Spicy Orange Sesame Chicken':                         'Chinese',
  'Weeknight Sticky Ginger Sesame Chicken Meatballs':    'Chinese',
  // Chicken — Japanese
  'Crispy Chicken Katsu Bowls':                          'Japanese',
  'Japanese Fried Chicken (Shio Koji Karaage)':          'Japanese',
  'One-Pot Japanese Curry Chicken and Rice':             'Japanese',
};

// ── Helpers ────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Group an array of recipes by their CLUSTER_MAP entry, preserving order.
// Returns [{cluster, recipes}] — or null if none of the recipes have a cluster.
function groupByCluster(recipes) {
  const hasCluster = recipes.some(r => CLUSTER_MAP[r.title]);
  if (!hasCluster) return null;
  const groups = [];
  for (const recipe of recipes) {
    const c = CLUSTER_MAP[recipe.title] || 'Other';
    if (!groups.length || groups[groups.length - 1].cluster !== c) {
      groups.push({ cluster: c, recipes: [] });
    }
    groups[groups.length - 1].recipes.push(recipe);
  }
  return groups;
}

// ── Content rendering ──────────────────────────────────────────────────────

function renderStep(step) {
  if (typeof step === 'string') return `<li>${esc(step)}</li>`;
  const bullets = step.bullets.map(b => `<li>${esc(b)}</li>`).join('\n');
  return `<li><strong>${esc(step.lead)}</strong><ul class="sub-steps">${bullets}</ul></li>`;
}

function renderRecipe(recipe, idPrefix, idx) {
  const id = `${idPrefix}-${idx}`;
  const title = displayTitle(recipe);
  const isFav = recipe.favorite ? ' data-fav="1"' : '';

  const servings = recipe.servings ? `<p class="meta">${esc(recipe.servings)}</p>` : '';
  const comments = (recipe.comments || []).length
    ? `<p class="comments">${recipe.comments.map(esc).join('<br>')}</p>` : '';
  const source = recipe.source
    ? `<p class="source">Source: ${
        recipe.source.startsWith('http')
          ? `<a href="${esc(recipe.source)}" target="_blank" rel="noopener">${esc(recipe.source)}</a>`
          : esc(recipe.source)
      }</p>` : '';

  const groups = (recipe.ingredientGroups || []).map(g => {
    const note = g.note ? ` <span class="group-note">(${esc(g.note)})</span>` : '';
    const items = g.ingredients.map(i => `<li>${esc(i)}</li>`).join('\n');
    const label = g.label ? `<h4>${esc(g.label)}${note}</h4>` : '';
    return `<div class="ing-group">${label}<ul class="ingredients">${items}</ul></div>`;
  }).join('\n');

  const steps = (recipe.steps || []).map(renderStep).join('\n');

  return `<article class="recipe" id="${esc(id)}"${isFav} data-title="${esc(recipe.title)}">
  <h3>${esc(title)}</h3>
  ${servings}${comments}${source}
  <div class="recipe-body">
    <div class="ingredients-col">
      <h4 class="col-heading">Ingredients</h4>
      ${groups || '<p class="empty"><em>No ingredients listed.</em></p>'}
    </div>
    <div class="steps-col">
      <h4 class="col-heading">Steps</h4>
      <ol class="steps">${steps}</ol>
    </div>
  </div>
</article>`;
}

// Render a list of recipes, optionally wrapped in cluster groups.
// clusterGroups: null (flat) or [{cluster, recipes}] from groupByCluster().
function renderRecipeList(recipes, idPrefix, clusterGroups) {
  if (!clusterGroups) {
    return recipes.map((r, i) => renderRecipe(r, idPrefix, i)).join('\n');
  }
  let html = '';
  let globalIdx = 0;
  for (const { cluster, recipes: cr } of clusterGroups) {
    const cid = `${idPrefix}--${slug(cluster)}`;
    html += `<div class="cluster-group" id="${esc(cid)}">
  <h4 class="cluster-heading">${esc(cluster)}</h4>
  ${cr.map((r, i) => renderRecipe(r, idPrefix, globalIdx + i)).join('\n')}
</div>\n`;
    globalIdx += cr.length;
  }
  return html;
}

// ── Nav building ───────────────────────────────────────────────────────────
// Returns the nav <ul> HTML and a flat list of all recipe IDs (for search).

function buildNav(data) {
  let nav = '<ul class="nav-l1">\n';

  for (const section of data.sections) {
    const sl = slug(section.title);
    const secId = `sec-${sl}`;

    if (section.recipes) {
      // Flat section — Section → Recipes
      const hasContent = section.recipes.length > 0;
      const clusterGroups = groupByCluster(section.recipes);
      const arrow = hasContent ? '<span class="arrow">▶</span>' : '';

      nav += `<li class="nav-section${hasContent ? '' : ' empty'}" data-sec="${secId}">`;
      nav += `<span class="nav-hd section-hd" data-toggle="${secId}-children">${arrow}${esc(section.title)}</span>`;

      if (hasContent) {
        nav += `<ul class="nav-l2 collapsed" id="${secId}-children">`;
        if (clusterGroups) {
          // Section → Cluster → Recipe
          for (const { cluster, recipes: cr } of clusterGroups) {
            const cid = `${sl}--${slug(cluster)}`;
            nav += navClusterItem(cid, cluster, cr, sl);
          }
        } else {
          // Section → Recipe directly
          section.recipes.forEach((r, i) => {
            const rid = `${sl}-${i}`;
            nav += navRecipeItem(rid, r);
          });
        }
        nav += '</ul>';
      }
      nav += '</li>\n';

    } else if (section.subsections) {
      // Section with subsections
      const hasContent = section.subsections.some(s => s.recipes && s.recipes.length > 0);
      const arrow = hasContent ? '<span class="arrow">▶</span>' : '';

      nav += `<li class="nav-section${hasContent ? '' : ' empty'}" data-sec="${secId}">`;
      nav += `<span class="nav-hd section-hd" data-toggle="${secId}-children">${arrow}${esc(section.title)}</span>`;

      nav += `<ul class="nav-l2 collapsed" id="${secId}-children">`;
      for (const sub of section.subsections) {
        const subsl = `${sl}-${slug(sub.title)}`;
        const subSecId = `sub-${subsl}`;
        const hasRecipes = sub.recipes && sub.recipes.length > 0;
        const clusterGroups = hasRecipes ? groupByCluster(sub.recipes) : null;
        const subArrow = hasRecipes ? '<span class="arrow">▶</span>' : '';

        nav += `<li class="nav-sub${hasRecipes ? '' : ' empty'}">`;
        // Subsection heading — navigates AND toggles
        nav += `<a class="nav-hd sub-hd" href="#${subSecId}" data-toggle="${subSecId}-children">${subArrow}${esc(sub.title)}</a>`;

        if (hasRecipes) {
          nav += `<ul class="nav-l3 collapsed" id="${subSecId}-children">`;
          if (clusterGroups) {
            for (const { cluster, recipes: cr } of clusterGroups) {
              const cid = `${subsl}--${slug(cluster)}`;
              nav += navClusterItem(cid, cluster, cr, subsl);
            }
          } else {
            sub.recipes.forEach((r, i) => {
              const rid = `${subsl}-${i}`;
              nav += navRecipeItem(rid, r);
            });
          }
          nav += '</ul>';
        }
        nav += '</li>\n';
      }
      nav += '</ul>';
      nav += '</li>\n';
    }
  }
  nav += '</ul>';
  return nav;
}

function navClusterItem(cid, cluster, recipes, idPrefix) {
  let html = `<li class="nav-cluster">`;
  // Cluster heading — navigates to anchor AND toggles
  html += `<a class="nav-hd cluster-hd" href="#${esc(cid)}" data-toggle="${esc(cid)}-children"><span class="arrow">▶</span>${esc(cluster)}</a>`;
  html += `<ul class="nav-l4 collapsed" id="${esc(cid)}-children">`;
  recipes.forEach((r, i) => {
    // Find global index within full subsection (passed as idPrefix)
    // Note: we pass idPrefix here which is the section/subsection slug.
    // The recipe id needs a global index; we'll handle with data-ridx.
    const rid = `${idPrefix}-r-${slug(r.title).slice(0, 40)}`;
    html += navRecipeItem(rid, r, true);
  });
  html += '</ul></li>\n';
  return html;
}

function navRecipeItem(rid, recipe, useSlugId = false) {
  // Star occupies a fixed column; non-favorites get an empty placeholder so
  // all recipe titles align to the same left edge regardless of favorite status.
  const starHtml = recipe.favorite
    ? `<span class="nav-star">★</span>`
    : `<span class="nav-star"></span>`;
  return `<li class="nav-recipe"><a class="nav-recipe-link" data-recipe-title="${esc(recipe.title)}" href="#">${starHtml}<span class="nav-title">${esc(recipe.title)}</span></a></li>\n`;
}

// ── Full content HTML ──────────────────────────────────────────────────────

function buildContent(data) {
  let html = '';

  for (const section of data.sections) {
    const sl = slug(section.title);
    const secId = `sec-${sl}`;

    if (section.recipes) {
      const clusterGroups = groupByCluster(section.recipes);
      html += `<section id="${secId}" class="section">
  <h2>${esc(section.title)}</h2>
  ${section.recipes.length
    ? renderRecipeList(section.recipes, sl, clusterGroups)
    : '<p class="empty"><em>No recipes yet.</em></p>'}
</section>\n`;

    } else if (section.subsections) {
      html += `<section id="${secId}" class="section"><h2>${esc(section.title)}</h2>\n`;
      for (const sub of section.subsections) {
        const subsl = `${sl}-${slug(sub.title)}`;
        const subSecId = `sub-${subsl}`;
        const clusterGroups = sub.recipes && sub.recipes.length ? groupByCluster(sub.recipes) : null;
        html += `<section id="${subSecId}" class="subsection">
  <h3 class="subsection-heading">${esc(sub.title)}</h3>
  ${sub.recipes && sub.recipes.length
    ? renderRecipeList(sub.recipes, subsl, clusterGroups)
    : '<p class="empty"><em>No recipes yet.</em></p>'}
</section>\n`;
      }
      html += `</section>\n`;
    }
  }
  return html;
}

// ── Recipe ID lookup table (title → DOM id) ───────────────────────────────
// Generated at build time and inlined into the page for the nav to use.

function buildRecipeLookup(data) {
  const map = {};

  for (const section of data.sections) {
    const sl = slug(section.title);

    if (section.recipes) {
      section.recipes.forEach((r, i) => { map[r.title] = `${sl}-${i}`; });
    } else if (section.subsections) {
      for (const sub of section.subsections) {
        const subsl = `${sl}-${slug(sub.title)}`;
        (sub.recipes || []).forEach((r, i) => { map[r.title] = `${subsl}-${i}`; });
      }
    }
  }
  return map;
}

// ── Assemble ───────────────────────────────────────────────────────────────

const navHtml    = buildNav(data);
const contentHtml = buildContent(data);
const recipeLookup = buildRecipeLookup(data);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Family Cookbook</title>
<style>
  :root {
    --bg: #fdfaf5;
    --surface: #fff;
    --nav-bg: #3b2a1a;
    --nav-text: #f5e9d5;
    --nav-hover: #c8a96e;
    --accent: #8b4513;
    --accent2: #c8a96e;
    --text: #2c1a0e;
    --muted: #7a6040;
    --border: #e0d4be;
    --fav: #c8860a;
    --radius: 6px;
    --nav-width: 308px;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Georgia, 'Times New Roman', serif;
    background: var(--bg);
    color: var(--text);
    display: flex;
    min-height: 100vh;
    font-size: 16px;
    line-height: 1.6;
  }

  /* ── Sidebar ── */
  #nav {
    width: var(--nav-width);
    min-width: var(--nav-width);
    background: var(--nav-bg);
    color: var(--nav-text);
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
  #nav-header {
    padding: 18px 16px 10px;
    border-bottom: 1px solid #5a3e28;
  }
  #nav-header h1 {
    font-size: 0.95rem;
    font-weight: normal;
    color: var(--nav-hover);
    letter-spacing: 0.03em;
  }
  #search-wrap { padding: 9px 12px; border-bottom: 1px solid #5a3e28; }
  #search-box-wrap { position: relative; }
  #search {
    width: 100%;
    box-sizing: border-box;
    padding: 6px 28px 6px 10px;
    border-radius: var(--radius);
    border: none;
    font-size: 0.85rem;
    background: #4e3522;
    color: var(--nav-text);
  }
  #search::placeholder { color: #9a7a58; }
  #search:focus { outline: 2px solid var(--nav-hover); }
  #search-clear {
    position: absolute;
    right: 7px; top: 50%; transform: translateY(-50%);
    background: none; border: none; padding: 0;
    color: #9a7a58; font-size: 1rem; line-height: 1;
    cursor: pointer; display: none;
  }
  #search-clear:hover { color: var(--nav-hover); }
  #search-results {
    display: none;
    border-bottom: 1px solid #5a3e28;
    padding: 4px 0;
    max-height: 260px;
    overflow-y: auto;
  }
  .sr-label {
    font-size: 0.7rem; color: #9a7a58;
    padding: 3px 14px 2px;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .sr-item {
    display: flex; align-items: flex-start; gap: 0;
    width: 100%; background: none; border: none;
    padding: 4px 14px; text-align: left;
    font-size: 0.78rem; color: #a8906e;
    cursor: pointer;
    font-family: inherit;
  }
  .sr-item:hover { color: var(--nav-hover); background: #4e3522; }
  .sr-item .sr-star { flex-shrink: 0; width: 1.1em; color: var(--fav); }
  .sr-item .sr-title { flex: 1; padding-left: 0.55em; text-indent: -0.55em; }
  .sr-empty { font-size: 0.82rem; color: #9a7a58; font-style: italic; padding: 5px 14px; }
  #fav-toggle {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 14px;
    font-size: 0.82rem; cursor: pointer;
    color: var(--nav-text);
    background: none; border: none; border-bottom: 1px solid #5a3e28;
    text-align: left; width: 100%;
  }
  #fav-toggle:hover { background: #4e3522; }
  #fav-toggle .star { color: var(--fav); }

  /* ── Nav tree ── */
  #nav-tree { flex: 1; overflow-y: auto; padding: 6px 0 24px; }
  .nav-l1, .nav-l2, .nav-l3, .nav-l4 { list-style: none; }

  /* collapsed/expanded */
  .collapsed { display: none; }

  /* shared heading style */
  .nav-hd {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
  }
  .nav-hd:hover { color: var(--nav-hover); }
  .nav-hd .arrow {
    font-size: 0.6rem;
    display: inline-block;
    transition: transform 0.15s;
    flex-shrink: 0;
    width: 12px;
    text-align: center;
  }
  .nav-hd.open .arrow { transform: rotate(90deg); }

  /* Level 1 — sections */
  .nav-section { }
  .section-hd {
    padding: 7px 14px;
    color: var(--nav-text);
    font-size: 0.88rem;
    font-weight: bold;
  }
  .nav-section.empty .section-hd { color: #7a5e45; cursor: default; }

  /* Level 2 — subsections */
  .nav-l2 { padding-left: 0; }
  .sub-hd {
    padding: 5px 14px 5px 22px;
    font-size: 0.83rem;
    color: #d4b98a;
    font-style: italic;
  }
  .nav-sub.empty .sub-hd { color: #5a4030; cursor: default; }

  /* Level 3 — clusters */
  .nav-l3 { padding-left: 0; }
  .cluster-hd {
    padding: 4px 14px 4px 32px;
    font-size: 0.8rem;
    color: #c4ad90;
    font-style: normal;
  }

  /* Level 4 — recipes */
  .nav-l4 { padding-left: 0; }
  .nav-recipe-link {
    display: flex;
    align-items: flex-start;
    gap: 0;
    padding: 3px 14px 3px 46px;
    font-size: 0.76rem;
    color: #a8906e;
    text-decoration: none;
    line-height: 1.35;
  }
  .nav-recipe-link:hover { color: var(--nav-hover); }
  /* Fixed-width star column — always present, empty for non-favorites */
  .nav-star {
    flex-shrink: 0;
    width: 1.1em;
    color: var(--fav);
    font-size: 0.85em;
    padding-top: 0.05em; /* optical alignment with first text line */
  }
  /* Title column — hanging indent on wrap */
  .nav-title {
    flex: 1;
    padding-left: 0.55em;
    text-indent: -0.55em; /* first line flush, subsequent lines indented */
  }

  /* Level 2 recipe links (for flat sections) */
  .nav-l2 .nav-recipe-link {
    padding-left: 28px;
    font-size: 0.8rem;
    color: #c4ad90;
  }
  /* Level 3 recipe links (subsection without clusters) */
  .nav-l3 .nav-recipe-link {
    padding-left: 38px;
    font-size: 0.78rem;
  }

  /* ── Main ── */
  #main { flex: 1; padding: 32px 40px; max-width: 960px; }
  #cookbook-title {
    font-size: 2rem;
    color: var(--accent);
    border-bottom: 2px solid var(--accent2);
    padding-bottom: 8px;
    margin-bottom: 32px;
  }

  /* ── Sections ── */
  .section { margin-bottom: 48px; }
  .section > h2 {
    font-size: 1.6rem; color: var(--accent);
    border-bottom: 2px solid var(--accent2);
    padding-bottom: 6px; margin-bottom: 24px;
  }
  .subsection { margin-bottom: 36px; }
  .subsection-heading {
    font-size: 1.2rem; color: var(--muted);
    border-bottom: 1px solid var(--border);
    padding-bottom: 4px; margin-bottom: 16px;
  }

  /* Cluster groups */
  .cluster-group { margin-bottom: 20px; }
  .cluster-heading {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent2);
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin-bottom: 12px;
    padding: 4px 0 4px 8px;
    border-left: 3px solid var(--accent2);
  }

  /* ── Recipe cards ── */
  .recipe {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 24px;
    margin-bottom: 20px;
    scroll-margin-top: 16px;
  }
  .recipe h3 { font-size: 1.12rem; color: var(--accent); margin-bottom: 4px; }
  .meta { font-size: 0.82rem; color: var(--muted); margin-bottom: 6px; font-family: 'Helvetica Neue', Arial, sans-serif; }
  .comments {
    font-style: italic; font-size: 0.9rem; color: var(--muted);
    margin-bottom: 6px; border-left: 3px solid var(--accent2); padding-left: 10px;
  }
  .source { font-size: 0.8rem; color: #999; margin-bottom: 14px; font-family: 'Helvetica Neue', Arial, sans-serif; }
  .source a { color: #999; }

  .recipe-body {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 24px;
    margin-top: 12px;
  }
  .col-heading {
    font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--muted); margin-bottom: 10px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    border-bottom: 1px solid var(--border); padding-bottom: 4px;
  }
  .ing-group { margin-bottom: 14px; }
  .ing-group h4 { font-size: 0.85rem; font-style: italic; color: var(--muted); margin-bottom: 4px; font-weight: normal; }
  .group-note { font-size: 0.78rem; color: #bbb; }
  .ingredients { list-style: disc; padding-left: 18px; }
  .ingredients li { font-size: 0.88rem; margin-bottom: 2px; }
  .steps { padding-left: 20px; }
  .steps > li { font-size: 0.9rem; margin-bottom: 10px; }
  .sub-steps { list-style: disc; padding-left: 20px; margin-top: 6px; }
  .sub-steps li { margin-bottom: 4px; }
  .empty { color: var(--muted); font-style: italic; }

  /* ── Search / filter ── */
  .recipe.hidden { display: none; }
  .cluster-group.all-hidden { display: none; }
  .subsection.all-hidden { display: none; }
  .section.all-hidden { display: none; }

  /* ── Responsive ── */
  @media (max-width: 700px) {
    body { flex-direction: column; }
    #nav { width: 100%; min-width: unset; position: static; height: auto; }
    #main { padding: 16px; }
    .recipe-body { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>

<div id="nav">
  <div id="nav-header"><h1>Muhlheim Family Cookbook</h1></div>
  <div id="search-wrap">
    <div id="search-box-wrap">
      <input id="search" type="text" placeholder="Search recipes…" autocomplete="off">
      <button id="search-clear" title="Clear search">✕</button>
    </div>
  </div>
  <div id="search-results"></div>
  <button id="fav-toggle"><span class="star">★</span> Favorites only</button>
  <div id="nav-tree">
    ${navHtml}
  </div>
</div>

<div id="main">
  <h1 id="cookbook-title">Family Cookbook</h1>
  ${contentHtml}
</div>

<script>
(function () {
  // ── Recipe title → DOM id lookup ──────────────────────────────────────
  const RECIPE_IDS = ${JSON.stringify(recipeLookup, null, 2)};

  // ── Collapsible nav ───────────────────────────────────────────────────

  // Toggle a list open/closed, updating the arrow on the heading.
  function toggleList(listId, headingEl) {
    const list = document.getElementById(listId);
    if (!list) return;
    const isOpen = !list.classList.contains('collapsed');
    if (isOpen) {
      list.classList.add('collapsed');
      headingEl.classList.remove('open');
    } else {
      list.classList.remove('collapsed');
      headingEl.classList.add('open');
    }
  }

  // Section headings — toggle only, no navigation.
  document.querySelectorAll('.section-hd[data-toggle]').forEach(function (hd) {
    hd.addEventListener('click', function (e) {
      e.preventDefault();
      toggleList(hd.dataset.toggle, hd);
    });
  });

  // Subsection and cluster headings — navigate AND toggle.
  document.querySelectorAll('.sub-hd[data-toggle], .cluster-hd[data-toggle]').forEach(function (hd) {
    hd.addEventListener('click', function (e) {
      e.preventDefault();
      const href = hd.getAttribute('href');
      const target = href && href !== '#' ? document.getElementById(href.slice(1)) : null;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      toggleList(hd.dataset.toggle, hd);
    });
  });

  // Recipe links — look up the actual DOM id from the title and navigate.
  document.querySelectorAll('.nav-recipe-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const title = link.dataset.recipeTitle;
      const id = RECIPE_IDS[title];
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── Search & favorites filter ─────────────────────────────────────────
  const search = document.getElementById('search');
  const searchClear = document.getElementById('search-clear');
  const searchResults = document.getElementById('search-results');
  const favBtn = document.getElementById('fav-toggle');
  const allRecipes = Array.from(document.querySelectorAll('.recipe'));
  let favOnly = false;

  // Show/hide × as user types
  search.addEventListener('input', function () {
    searchClear.style.display = search.value ? 'block' : 'none';
  });

  // Enter key triggers the results panel
  search.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); runSearch(); }
  });

  // × button — clear search and dismiss results
  searchClear.addEventListener('click', function () {
    search.value = '';
    searchClear.style.display = 'none';
    searchResults.style.display = 'none';
    searchResults.innerHTML = '';
    search.focus();
  });

  function runSearch() {
    const q = search.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    if (!q) { searchResults.style.display = 'none'; return; }

    const matches = allRecipes.filter(function (r) {
      return r.dataset.title.toLowerCase().includes(q);
    });

    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="sr-empty">No recipes found.</div>';
    } else {
      const label = document.createElement('div');
      label.className = 'sr-label';
      label.textContent = matches.length + ' recipe' + (matches.length !== 1 ? 's' : '');
      searchResults.appendChild(label);
      matches.forEach(function (r) {
        const isFav = r.dataset.fav === '1';
        const btn = document.createElement('button');
        btn.className = 'sr-item';
        btn.innerHTML = '<span class="sr-star">' + (isFav ? '★' : '') + '</span>' +
                        '<span class="sr-title">' + r.dataset.title.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</span>';
        btn.addEventListener('click', function () {
          r.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        searchResults.appendChild(btn);
      });
    }
    searchResults.style.display = 'block';
  }

  favBtn.addEventListener('click', function () {
    favOnly = !favOnly;
    favBtn.style.background = favOnly ? '#4e3522' : '';
    favBtn.querySelector('.star').style.color = favOnly ? '#f5c842' : '';
    applyFilters();
  });

  function applyFilters() {
    allRecipes.forEach(function (r) {
      const favMatch = !favOnly || r.dataset.fav === '1';
      r.classList.toggle('hidden', !favMatch);
    });
    document.querySelectorAll('.cluster-group').forEach(function (g) {
      const visible = g.querySelectorAll('.recipe:not(.hidden)').length > 0;
      g.classList.toggle('all-hidden', !visible && favOnly);
    });
    document.querySelectorAll('.subsection').forEach(function (s) {
      const visible = s.querySelectorAll('.recipe:not(.hidden)').length > 0;
      s.classList.toggle('all-hidden', !visible && favOnly);
    });
    document.querySelectorAll('.section').forEach(function (s) {
      const visible = s.querySelectorAll('.recipe:not(.hidden)').length > 0;
      s.classList.toggle('all-hidden', !visible && favOnly);
    });
  }
})();
</script>

</body>
</html>`;

const outPath = path.join(__dirname, 'index.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Website written to ' + outPath);
