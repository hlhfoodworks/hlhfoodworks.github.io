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
  'Baked Crunchy Hot Honey Chicken':                      'General',
  'Brown Butter Sage Skillet Chicken':                    'General',
  'Company Baked Chicken':                                'General',
  'Creamy Spinach-Artichoke Chicken Stew':                'General',
  'Crispy Chicken With Lime Butter':                      'General',
  'Crispy Spice Rubbed Chicken Thighs':                   'General',
  'Grilled Buffalo Wings':                                'General',
  'Skillet Chicken and Zucchini With Charred Scallion Salsa': 'General',
  'Spring Chicken Paillard':                              'General',
  'Sweet and Sour Chicken':                               'General',
  'Weeknight Fancy Chicken and Rice':                     'General',
  // Chicken — Latin/South American
  'Chicken Fajita Marinade':                              'Latin/South American',
  'D.L. Jardine\'s Fajita Marinade':                     'Latin/South American',
  'Peruvian Roasted Chicken With Spicy Cilantro Sauce':  'Latin/South American',
  'Slow-Cooker Chicken Mole':                             'Latin/South American',
  // Vegetables — American
  'Lentil Chili':                                        'General',
  // Vegetables — Italian
  'Eggplant Involtini':                                   'Italian',
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
  'Roast Lemon-Garlic Chicken with Green Olives':        'Mediterranean/Greek',
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
  'Yakitori Chicken Kebabs':                             'Japanese',
  // Pork — American
  'Sloppy Moes':                                         'General',
  // Pork — Latin/South American
  'Slow Cooker Pork Mole':                               'Latin/South American',
  'Haitian Pork Griot':                                  'Latin/South American',
  'Carnitas':                                            'Latin/South American',
  // Pork — Korean-inspired
  'Crispy Pork Lettuce Wraps With Spicy Cucumbers':      'Korean-inspired',
  // Pork — Chinese
  'Moo Shu Mushrooms':                                   'Chinese',
  // Noodles: Italian — Italian
  'Brie Linguine':                                       'Italian',
  'Pasta with Sausage, Basil, and Mustard':              'Italian',
  'Nuala\'s Pasta':                                      'Italian',
  'Three Cheese Manicotti':                              'Italian',
  'Lisa\'s Pasta':                                       'Italian',
  // Noodles: Asian — Thai
  'Fried Drunken Noodles with Chicken (Phad Kii Maw Gai)': 'Thai',
  // Noodles: Asian — Japanese
  'Stir-Fried Udon Noodles With Pork and Scallions':    'Japanese',
  // Lamb — Mediterranean/Greek
  'Garlic & Rosemary Grilled Lamb Chops':                'Mediterranean/Greek',
  // Lamb — Middle Eastern/Persian
  'Lula Kebabs':                                         'Middle Eastern/Persian',
  // Lamb — Indian
  'Luscious Tandoori Lamb Chops':                        'Indian',
  // Beef — American
  'Four Peppercorn Crusted Rotisserie Rib Roast':        'General',
  'The Best Passover Brisket':                           'General',
  "Brenda's Brisket":                                    'General',
  'Cranberry-Chili Brisket':                             'General',
  'Sous Vide Beef Back Ribs':                            'General',
  'Hearty Beef Stew With Red Onions and Ale':            'General',
  // Beef — French
  'Dijon and Cognac Beef Stew':                          'French',
  // Beef — Chinese
  'Asian Braised Short Ribs':                            'Chinese',
  // Shellfish — American
  'Stuffed Eggplant Creole':                             'General',
  'Shrimp with Orzo and Peas':                           'General',
  'Spicy Grilled Shrimp':                                'General',
  'Bacon-Wrapped Scallops with Chili Butter':            'General',
  // Shellfish — French
  'Moules Marinières':                                   'French',
  // Shellfish — Italian
  'Shrimp Scampi with Linguini':                         'Italian',
  // Shellfish — Chinese
  'Yang Chow Slippery Shrimp':                           'Chinese',
  // Fish — American
  'Dry-Brined Salmon':                                   'General',
  'Baked Lemon Salmon with Creamy Dill Sauce':           'General',
  'Sriracha Maple Salmon':                               'General',
  'Fish and Chips with Malt Vinegar Mayonnaise':         'General',
  // Fish — French
  'Smoked Salmon Niçoise Salad':                         'French',
  // Fish — Italian
  'Sole with Lemon-Caper Sauce':                         'Italian',
  // Fish — Vietnamese
  'Fast Vietnamese Caramel Bluefish':                    'Vietnamese',
  // Fish — Japanese
  'Spicy Tuna Salad with Crispy Rice':                   'Japanese',
  // Ground Beef — American
  'Taco Night!!':                                        'General',
  'Sweet Potato Shepherd\'s Pie':                        'General',
  'Taco Soup':                                           'General',
  // Ground Beef — Korean-inspired
  'Korean Beef Bowl':                                    'Korean-inspired',
  // Noodles: Italian — Middle Eastern/Persian
  'Spiced Meatballs with Pappardelle':                   'Middle Eastern/Persian',
  // Dressings — American
  'Horseradish Sauce':                                   'General',
  'Steak Seasoning Rub':                                 'General',
  'Cherry Barbecue Sauce':                               'General',
  // Sauces — Italian
  'Sun-Dried Tomato Cream Sauce':                        'Italian',
  // Dressings — Latin/South American
  'Authentic Chimichurri':                               'Latin/South American',
  // Desserts — American
  'Fresh Cranberry Mold':                                'General',
  'Lauren\'s Banana Pudding':                            'General',
  // Desserts — Thai
  'Mango with Sticky Rice (Khao Neow Mamuang)':         'Thai',
  // Drinks — American
  'Melon Ball':                                          'General',
  // Turkey — American
  'Expertly Spiced and Glazed Roast Turkey':             'General',
  'Turkey and Quinoa Meatloaf':                          'General',
  // Turkey — Indian
  'Turkey Tikka Masala':                                 'Indian',
  // Other (Meat Mains) — French
  'Peppered Duck Breast With Red Wine Sauce':            'French',
  // Other (Meat Mains) — Italian
  'Sheet-Pan Italian Sub Dinner':                        'Italian',
  // Tofu — American
  'Tofu Stir Fry':                                       'General',
  'Sesame Ginger Tofu and Veggie Stir Fry':              'General',
  // Tofu — West African
  'Baked Tofu With Peanut Sauce and Coconut-Lime Rice':  'West African',
  // Mushroom — Italian
  'Oven Polenta with Roasted Mushrooms and Thyme':       'Italian',
  'Stuffed Portobello Mushrooms with Crispy Goat Cheese': 'Italian',
  'Truffle Mushroom Risotto':                            'Italian',
  'Roasted Portobellos With Pesto':                      'Italian',
  // Vegetables — Latin/South American
  'Slow Cooker Vegan Mole Chili':                        'Latin/South American',
  // Vegetables — Moroccan/North African
  'Moroccan Eggplant with Couscous':                     'Moroccan/North African',
  // Salads > Pasta Salads — American
  'Chuck Wagon Barbecued Pasta Salad':                   'General',
  // Salads > Pasta Salads — Chinese
  'Asian Pasta Salad':                                   'Chinese',
  "Holly's Spicy Noodle Salad with Peanut Dressing":    'Chinese',
  // Vegetable Sides — American
  'Sautéed Mushrooms':                                   'General',
  'Coleslaw Salad':                                      'General',
  'Summer Salad':                                        'General',
  // Vegetable Sides — Mediterranean/Greek
  'Potatoes Gratin (Low Calorie)':                       'Mediterranean/Greek',
  // Vegetable Sides — Central/Eastern European
  'Potato Latkes':                                       'Central/Eastern European',
  // Baking: Sweet — American
  'Jumbo Banana-Nut Muffins':                            'General',
  "Eric's Chocolate Chip Cookies":                       'General',
  'Chocolate "Birthday Cake"':                           'General',
  "Nana's Poundcake":                                    'General',
  'Filled Coffee Cake':                                  'General',
  'Nut Butter Balls':                                    'General',
  'Red Velvet Cake':                                     'General',
  // Baking: Sweet — Central/Eastern European
  'Blintz Soufflé':                                      'Central/Eastern European',
  "Brenda's Noodle Kugel":                               'Central/Eastern European',
  "Min Cohen's Inscrutable Apple Cake":                  'Central/Eastern European',
  // Turkey — American
  'Bristol Farms Turkey Salad (Copycat)':                'General',
  // Dressings and Sauces — French
  'Béarnaise Sauce':                                     'French',
  // Appetizers — American
  "Barbara Glabman's Cheese Ball":                       'General',
  'Shrimp Dip':                                          'General',
  // Appetizers — Central/Eastern European
  'Chopped Eggplant':                                    'Central/Eastern European',
  'Charoset (Ashkenazic Style)':                         'Central/Eastern European',
  // Appetizers — Mediterranean/Greek
  'Gazpacho':                                            'Mediterranean/Greek',
  // Mushroom — Italian
  'Mushrooms Florentine':                                'Italian',
  // Baking Savory — Italian
  "Susan's Calzones":                                    'Italian',
  // Baking Sweet — American
  'Butter Pecan Coffee Cake':                            'General',
  // Breakfast — American
  'Glazed Cinnamon Rolls (Tangzhong Version)':           'General',
  'Homemade Biscuits':                                   'General',
  'Raised Waffles':                                      'General',
  'Baked German Pancake (or Dutch Babies)':              'General',
  'Egg Strata':                                          'General',
  'Broiled Cod in Miso Sauce':                            'Japanese',
  'Grilled Shrimp and Green Onion Skewers':               'American',
  'Sea Scallops with Red Peppers and Tomatoes':           'Italian',
  'Mussels with Thai Broth':                             'Thai',
  'Linguine with Mussels':                               'Italian',
  'Linguine with Clams and Wild Mushrooms':               'Italian',
  'Baked Trout St. Helena':                              'Italian',
  'Soy-Salmon with Cilantro-Coconut Chutney':            'American',
  'Chicken with 40 Cloves of Garlic and Garlic Bread':   'Italian',
  'Lemon-Rubbed Chicken Legs with Garlic and Rosemary':  'American',
  'Stir-Fry Shrimp':                                     'Chinese',
  "Christy's Stir-Fry (Adapted)":                        'Chinese',
  'Rice with Dill':                                      'American',
  'Creamy Louisiana Marinade':                           'American',
  "Nancy's Flank Steak":                                 'American',
  'Coq au Vin':                                          'French',
  'Chicken Breasts and Garlic Balsamic Vinegar':         'Italian',
  "Regina's Coffee Cake":                                'American',
  "Brenda's Chocolate Chip Cookies":                     'American',
  'Apple Pie':                                           'American',
  'Chinese Tomato Egg Stir-fry':                         'Chinese',
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

// Cuisine-cluster sort order — General always first.
const CLUSTER_ORDER = [
  'General',
  'Latin/South American',
  'Italian',
  'French',
  'Central/Eastern European',
  'Mediterranean/Greek',
  'Moroccan/North African',
  'West African',
  'Middle Eastern/Persian',
  'Indian',
  'Thai',
  'Vietnamese',
  'Filipino',
  'Korean-inspired',
  'Chinese',
  'Japanese',
];

// Group an array of recipes by their CLUSTER_MAP entry.
// Merges all recipes with the same cluster (non-consecutive runs are combined).
// Returns [{cluster, recipes}] sorted by CLUSTER_ORDER, or null if all recipes
// fall into a single cluster (no headers needed).
function groupByCluster(recipes) {
  const clusterMap = new Map();
  for (const recipe of recipes) {
    const c = CLUSTER_MAP[recipe.title] || 'General';
    if (!clusterMap.has(c)) clusterMap.set(c, []);
    clusterMap.get(c).push(recipe);
  }
  // If there's only one cluster, no headers needed — return null.
  if (clusterMap.size <= 1) return null;
  // Sort clusters by CLUSTER_ORDER; unknown clusters go at the end.
  const sorted = [...clusterMap.entries()].sort(([a], [b]) => {
    const ai = CLUSTER_ORDER.indexOf(a);
    const bi = CLUSTER_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
  return sorted.map(([cluster, recipes]) => ({ cluster, recipes }));
}

// ── Content rendering ──────────────────────────────────────────────────────

function renderStep(step) {
  if (typeof step === 'string') return `<li>${esc(step)}</li>`;
  const bullets = step.bullets.map(b => `<li>${esc(b)}</li>`).join('\n');
  return `<li><strong>${esc(step.lead)}</strong><ul class="sub-steps">${bullets}</ul></li>`;
}

function renderIngredientGroups(ingredientGroups) {
  return (ingredientGroups || []).map(g => {
    const note = g.note ? ` <span class="group-note">(${esc(g.note)})</span>` : '';
    const items = g.ingredients.map(i => `<li>${esc(i)}</li>`).join('\n');
    const label = g.label ? `<h4>${esc(g.label)}${note}</h4>` : '';
    return `<div class="ing-group">${label}<ul class="ingredients">${items}</ul></div>`;
  }).join('\n');
}

function renderRecipe(recipe, idPrefix, idx) {
  const id = recipe.id || `${idPrefix}-${idx}`;
  const title = displayTitle(recipe);
  const isFav = recipe.favorite ? ' data-fav="1"' : '';
  const hasAlt = !!recipe.highAltitude;

  const servings = recipe.servings ? `<p class="meta">${esc(recipe.servings)}</p>` : '';
  const source = recipe.source
    ? `<p class="source">Source: ${
        recipe.source.startsWith('http')
          ? `<a href="${esc(recipe.source)}" target="_blank" rel="noopener">${esc(recipe.source)}</a>`
          : esc(recipe.source)
      }</p>` : '';

  let commentsHtml, groupsHtml, stepsHtml;

  if (hasAlt) {
    const ha = recipe.highAltitude;
    // Standard comments
    const stdComments = (recipe.comments || []).length
      ? `<p class="comments">${recipe.comments.map(c => typeof c === 'object' && c.html ? c.html : esc(c)).join('<br>')}</p>` : '';
    // High-altitude comments (fall back to standard if not specified)
    const altComments = (ha.comments || []).length
      ? `<p class="comments">${ha.comments.map(c => esc(c)).join('<br>')}</p>`
      : stdComments;

    commentsHtml = `<div class="alt-standard">${stdComments}</div><div class="alt-high">${altComments}</div>`;

    groupsHtml = `<div class="alt-standard">${renderIngredientGroups(recipe.ingredientGroups) || '<p class="empty"><em>No ingredients listed.</em></p>'}</div>` +
      `<div class="alt-high">${renderIngredientGroups(ha.ingredientGroups) || '<p class="empty"><em>No ingredients listed.</em></p>'}</div>`;

    const stdSteps = (recipe.steps || []).map(renderStep).join('\n');
    const altSteps = (ha.steps || []).map(renderStep).join('\n');
    stepsHtml = `<div class="alt-standard"><ol class="steps">${stdSteps}</ol></div>` +
      `<div class="alt-high"><ol class="steps">${altSteps}</ol></div>`;
  } else {
    commentsHtml = (recipe.comments || []).length
      ? `<p class="comments">${recipe.comments.map(c => typeof c === 'object' && c.html ? c.html : esc(c)).join('<br>')}</p>` : '';
    groupsHtml = renderIngredientGroups(recipe.ingredientGroups) || '<p class="empty"><em>No ingredients listed.</em></p>';
    stepsHtml = `<ol class="steps">${(recipe.steps || []).map(renderStep).join('\n')}</ol>`;
  }

  const altBadge = hasAlt ? `<p class="altitude-badge">🏔 High altitude version</p>` : '';
  const articleClass = hasAlt ? 'recipe has-alt' : 'recipe';

  return `<article class="${articleClass}" id="${esc(id)}"${isFav} data-title="${esc(recipe.title)}">
  <div class="recipe-header-row">
    <h3>${esc(title)}</h3>
    <div class="recipe-btns">
      <button class="copy-btn" title="Copy recipe to clipboard" aria-label="Copy ${esc(recipe.title)}">📋 Copy Recipe</button>
      <button class="print-btn" title="Print this recipe" aria-label="Print ${esc(recipe.title)}">🖨 Print</button>
    </div>
  </div>
  ${servings}${commentsHtml}${source}${altBadge}
  <div class="recipe-body">
    <div class="ingredients-col">
      <h4 class="col-heading">Ingredients</h4>
      ${groupsHtml}
    </div>
    <div class="steps-col">
      <h4 class="col-heading">Steps</h4>
      ${stepsHtml}
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
      section.recipes.forEach((r, i) => { map[r.title] = r.id || `${sl}-${i}`; });
    } else if (section.subsections) {
      for (const sub of section.subsections) {
        const subsl = `${sl}-${slug(sub.title)}`;
        (sub.recipes || []).forEach((r, i) => { map[r.title] = r.id || `${subsl}-${i}`; });
      }
    }
  }
  return map;
}

// ── Cookbook data for clipboard copy ──────────────────────────────────────
// Builds a flat title → recipe map with only the fields needed for formatting.

function buildCookbookData(data) {
  const map = {};
  for (const section of data.sections) {
    if (section.recipes) {
      for (const r of section.recipes) map[r.title] = r;
    } else if (section.subsections) {
      for (const sub of section.subsections) {
        for (const r of (sub.recipes || [])) map[r.title] = r;
      }
    }
  }
  return map;
}

// ── Assemble ───────────────────────────────────────────────────────────────

const navHtml    = buildNav(data);
const contentHtml = buildContent(data);
const recipeLookup = buildRecipeLookup(data);
const cookbookData = buildCookbookData(data);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Family Cookbook</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍴</text></svg>">
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
  #fav-toggle.active {
    background: var(--fav);
    color: #1a0e00;
    font-weight: bold;
  }
  #fav-toggle.active .star { color: #1a0e00; }
  #fav-toggle.active:hover { background: #e09a10; }
  #collapse-all {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 14px;
    font-size: 0.82rem; cursor: pointer;
    color: var(--nav-text);
    background: none; border: none; border-bottom: 1px solid #5a3e28;
    text-align: left; width: 100%;
  }
  #collapse-all:hover { background: #4e3522; }
  #collapse-all .collapse-icon { font-size: 0.85rem; color: #a8906e; }

  /* ── High Altitude toggle ── */
  #alt-toggle {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 14px;
    font-size: 0.82rem; cursor: pointer;
    color: var(--nav-text);
    background: none; border: none; border-bottom: 1px solid #5a3e28;
    text-align: left; width: 100%;
  }
  #alt-toggle:hover { background: #4e3522; }
  #alt-toggle .alt-icon { font-size: 0.9rem; }
  #alt-toggle.active {
    background: #1a3a5c;
    color: #8ecfff;
    font-weight: bold;
  }
  #alt-toggle.active:hover { background: #1f4878; }

  /* High altitude content visibility */
  .alt-high { display: none; }
  .altitude-badge {
    display: none; font-size: 0.75rem;
    color: #6bb5e8; margin-bottom: 4px; margin-top: 2px;
    font-style: italic;
  }
  body.high-altitude-mode .alt-standard { display: none; }
  body.high-altitude-mode .alt-high { display: block; }
  body.high-altitude-mode .altitude-badge { display: block; }

  .nav-recipe.nav-hidden { display: none; }
  .nav-cluster.nav-hidden { display: none; }
  .nav-sub.nav-hidden { display: none; }
  .nav-section.nav-hidden { display: none; }

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

  /* Level 2 recipe links — direct (flat sections with no cluster headers) */
  .nav-l2 > li.nav-recipe > .nav-recipe-link {
    padding-left: 28px;
    font-size: 0.8rem;
    color: #c4ad90;
  }
  /* Level 3 recipe links — direct (subsection, no cluster headers) */
  .nav-l3 > li.nav-recipe > .nav-recipe-link {
    padding-left: 38px;
    font-size: 0.78rem;
  }
  /* Cluster children (nav-l4) inside nav-l2: must indent past cluster heading at 32px */
  .nav-l2 .nav-l4 .nav-recipe-link {
    padding-left: 46px;
    font-size: 0.78rem;
    color: #a8906e;
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
  .comments a { color: var(--accent2); }
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

  /* ── Print & Copy buttons ── */
  .recipe-header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 4px;
  }
  .recipe-header-row h3 { margin-bottom: 0; flex: 1; }
  .recipe-btns { display: flex; gap: 6px; flex-shrink: 0; }
  .copy-btn,
  .print-btn {
    flex-shrink: 0;
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--muted);
    font-size: 0.72rem;
    padding: 3px 8px;
    cursor: pointer;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    white-space: nowrap;
    margin-top: 2px;
    transition: background 0.12s, color 0.12s;
  }
  .copy-btn:hover,
  .print-btn:hover { background: var(--border); color: var(--text); }
  .copy-btn.copied { background: #e6f4ea; border-color: #4caf50; color: #2e7d32; }

  /* ── Print media ── */
  @media print {
    @page { margin: 0.75in; }
    /* Reset body layout so sidebar isn't part of the flow */
    body { display: block !important; background: white !important; min-height: 0 !important; }
    /* Hide sidebar and chrome */
    #nav, #mobile-header, #cookbook-title, .print-btn, .copy-btn, .recipe-btns { display: none !important; }
    /* Main area: full width, no extra padding */
    #main { padding: 0 !important; max-width: none !important; flex: none !important; }
    /* Collapse section/subsection/cluster containers so they add no whitespace */
    .section, .subsection, .cluster-group {
      margin: 0 !important; padding: 0 !important; border: none !important;
    }
    /* Hide all structural headings */
    .section > h2, .subsection-heading, .cluster-heading { display: none !important; }
    /* Hide all recipe cards that are NOT the one being printed */
    .recipe:not(.printing) { display: none !important; }
    /* The printing recipe — full width, no card chrome */
    .recipe.printing {
      display: block !important;
      border: none !important; box-shadow: none !important;
      padding: 0 !important; margin: 0 !important;
      font-size: 0.88rem;
    }
    /* Override grid display entirely — Chrome treats any grid container as
       an unbreakable unit (even single-column), pushing the whole block to
       page 2 and leaving a blank gap after the recipe header on page 1.
       display:block lets ingredients-col and steps-col stack as normal divs
       and break freely across pages.
       (iOS blank-page issue was the afterprint timing, not this CSS; the
       touchstart-deferred cleanup handles that independently.) */
    .recipe.printing .recipe-body {
      display: block !important;
      break-inside: auto;
    }
    .recipe.printing .recipe-btns { display: none !important; }
  }

  /* ── Responsive ── */
  @media (max-width: 700px) {
    body { flex-direction: column; }
    #nav { width: 100%; min-width: unset; position: static; height: auto; }
    #main { padding: 16px; }
    .recipe-body { grid-template-columns: 1fr; }
  }

  /* ── Mobile (iPhone) ── */
  #mobile-header {
    display: none;
  }
  @media (max-width: 480px) {
    /* Sticky top bar with hamburger */
    #mobile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--nav-bg);
      color: var(--nav-text);
      padding: 10px 16px;
      border-bottom: 1px solid #5a3e28;
    }
    #mobile-header-title {
      font-size: 0.9rem;
      color: var(--nav-hover);
      letter-spacing: 0.03em;
      font-family: Georgia, 'Times New Roman', serif;
    }
    #hamburger {
      background: none;
      border: none;
      color: var(--nav-text);
      font-size: 1.3rem;
      cursor: pointer;
      padding: 4px 6px;
      line-height: 1;
    }
    #hamburger:hover { color: var(--nav-hover); }

    /* Nav collapsed by default; toggled via JS */
    #nav {
      display: none;
      width: 100%;
      min-width: unset;
      position: static;
      height: auto;
    }
    /* When open, fix to viewport so it's visible regardless of scroll position */
    #nav.nav-open {
      display: flex;
      position: fixed;
      top: 47px; /* sits just below the mobile header bar */
      left: 0;
      right: 0;
      z-index: 99;
      max-height: calc(80vh - 47px);
      overflow-y: auto;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }
    /* Hide the header inside nav since mobile-header replaces it */
    #nav-header { display: none; }

    #main {
      padding: 14px 12px;
    }

    /* Bigger touch targets in nav */
    .section-hd { padding: 10px 14px; }
    .sub-hd { padding: 8px 14px 8px 22px; }
    .cluster-hd { padding: 7px 14px 7px 32px; }
    .nav-recipe-link { padding-top: 6px; padding-bottom: 6px; }

    /* Tighter recipe cards */
    .recipe { padding: 14px 16px; }

    /* Offset scroll targets so fixed header doesn't cover them (47px header + 10px buffer) */
    .recipe { scroll-margin-top: 57px; }

    /* Fix iOS zoom on search focus: font-size must be ≥16px */
    #search { font-size: 16px; }

    /* Search results: clear desktop cap so JS inline style can take over */
    #search-results { max-height: none; overflow-y: auto; flex-shrink: 0; }
    #search-results .sr-item { padding-top: 5px; padding-bottom: 5px; }
    #search-results .sr-label { padding-top: 5px; padding-bottom: 3px; }
  }
</style>
</head>
<body>

<div id="mobile-header">
  <span id="mobile-header-title">Muhlheim Family Cookbook</span>
  <button id="hamburger" aria-label="Toggle navigation" aria-expanded="false">☰</button>
</div>

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
  <button id="alt-toggle"><span class="alt-icon">&#9650;</span> High Altitude</button>
  <button id="collapse-all"><span class="collapse-icon">⊟</span> Collapse all</button>
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

  // ── Recipe data for clipboard formatting ─────────────────────────────
  const COOKBOOK_DATA = ${JSON.stringify(cookbookData, null, 2)};

  // ── Hamburger toggle (mobile) ─────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.textContent = isOpen ? '✕' : '☰';
    });
    // Close nav when a recipe link (nav tree or search result) is tapped on mobile
    nav.addEventListener('click', function (e) {
      if ((e.target.closest('.nav-recipe-link') || e.target.closest('.sr-item')) && window.innerWidth <= 480) {
        nav.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      }
    });
  }

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
    searchResults.style.maxHeight = '';
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

    // On narrow screens, cap to show label + up to 4 items (5 lines), scroll beyond.
    // Use requestAnimationFrame so browser finishes layout before we measure.
    if (window.innerWidth <= 480) {
      searchResults.style.maxHeight = ''; // clear any previous inline cap
      requestAnimationFrame(function () {
        const children = searchResults.children;
        if (children.length === 0) return;
        const maxVisible = Math.min(children.length, 5); // label counts as 1
        let h = 0;
        for (let i = 0; i < maxVisible; i++) {
          h += children[i].offsetHeight;
        }
        h += 8; // container's top+bottom padding
        searchResults.style.maxHeight = h + 'px';
      });
    }
  }

  favBtn.addEventListener('click', function () {
    favOnly = !favOnly;
    favBtn.classList.toggle('active', favOnly);
    applyFilters();
  });

  // ── Print single recipe ───────────────────────────────────────────────
  document.querySelectorAll('.print-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const recipe = btn.closest('.recipe');
      if (!recipe) return;
      recipe.classList.add('printing');
      // Two nested rAFs guarantee at least 2 paint frames have committed,
      // then a 150ms buffer for iOS Safari which is especially slow to
      // capture the updated layout for the print compositor.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          setTimeout(function () { window.print(); }, 150);
        });
      });
    });
  });
  // ── Copy recipe to clipboard ──────────────────────────────────────────
  function formatRecipeForClipboard(recipe) {
    var lines = [];

    // Title + source
    var heading = recipe.title;
    if (recipe.favorite) heading = '★ ' + heading;
    if (recipe.source && !recipe.source.startsWith('http')) heading += ' (' + recipe.source + ')';
    lines.push(heading);
    lines.push('');

    if (recipe.servings) { lines.push(recipe.servings); lines.push(''); }

    // Comments / notes
    if (recipe.comments && recipe.comments.length) {
      lines.push('NOTES');
      recipe.comments.forEach(function (c) {
        var text = (typeof c === 'object' && c.html)
          ? c.html.replace(/<[^>]+>/g, '') // strip HTML tags
          : c;
        lines.push(text);
      });
      lines.push('');
    }

    // Ingredients
    if (recipe.ingredientGroups && recipe.ingredientGroups.length) {
      lines.push('INGREDIENTS');
      lines.push('');
      recipe.ingredientGroups.forEach(function (g) {
        if (g.label) {
          var lbl = g.label;
          if (g.note) lbl += ' (' + g.note + ')';
          lines.push(lbl + ':');
        }
        (g.ingredients || []).forEach(function (i) { lines.push('  • ' + i); });
        lines.push('');
      });
    }

    // Steps
    if (recipe.steps && recipe.steps.length) {
      lines.push('STEPS');
      lines.push('');
      recipe.steps.forEach(function (step, idx) {
        if (typeof step === 'string') {
          lines.push((idx + 1) + '. ' + step);
        } else {
          lines.push((idx + 1) + '. ' + step.lead);
          (step.bullets || []).forEach(function (b) { lines.push('     • ' + b); });
        }
      });
      lines.push('');
    }

    return lines.join('\\n').trim();
  }

  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var article = btn.closest('.recipe');
      if (!article) return;
      var title = article.dataset.title;
      var recipe = COOKBOOK_DATA[title];
      if (!recipe) return;
      var text = formatRecipeForClipboard(recipe);

      function showSuccess() {
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = '📋 Copy Recipe';
          btn.classList.remove('copied');
        }, 2000);
      }

      function fallbackCopy() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;width:2em;height:2em;opacity:0;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { ta.setSelectionRange(0, 99999); } catch (e) {} // iOS Safari
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        showSuccess(); // Always show feedback -- user will notice if paste fails
      }

      // Guard: clipboard API may be undefined (file://, older browsers)
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        // Wrap in try/catch: on iOS Safari writeText can throw synchronously
        // rather than returning a rejected promise, which would swallow both
        // .then() and .catch() leaving the button with no feedback at all.
        try {
          navigator.clipboard.writeText(text).then(showSuccess).catch(fallbackCopy);
        } catch (e) {
          fallbackCopy();
        }
      } else {
        fallbackCopy();
      }
    });
  });

  window.addEventListener('afterprint', function () {
    // On iOS Safari, afterprint fires while the print dialog is still open and
    // the preview is live — removing .printing immediately blanks the preview.
    // Instead, defer removal until the user's first interaction after returning
    // to the page (touchstart/click). A 30s timeout is the safety net.
    var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

    function cleanup() {
      document.querySelectorAll('.recipe.printing').forEach(function (r) {
        r.classList.remove('printing');
      });
      document.removeEventListener('touchstart', cleanup, true);
      document.removeEventListener('click', cleanup, true);
    }

    if (isIOS) {
      document.addEventListener('touchstart', cleanup, { once: true, capture: true });
      document.addEventListener('click',      cleanup, { once: true, capture: true });
      setTimeout(cleanup, 30000); // safety net
    } else {
      cleanup();
    }
  });

  // High Altitude toggle
  document.getElementById('alt-toggle').addEventListener('click', function () {
    this.classList.toggle('active');
    document.body.classList.toggle('high-altitude-mode');
  });

  // Collapse all open nav menus
  document.getElementById('collapse-all').addEventListener('click', function () {
    document.querySelectorAll('.nav-hd.open').forEach(function (hd) {
      hd.classList.remove('open');
    });
    document.querySelectorAll('.nav-l2, .nav-l3, .nav-l4').forEach(function (list) {
      list.classList.add('collapsed');
    });
  });

  function applyFilters() {
    // ── Main content panel ────────────────────────────────────────────────
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

    // ── Sidebar nav ───────────────────────────────────────────────────────
    // Build a set of favorite recipe titles for quick lookup
    const favTitles = new Set();
    allRecipes.forEach(function (r) {
      if (r.dataset.fav === '1') favTitles.add(r.dataset.title);
    });

    // Show/hide individual recipe nav items
    document.querySelectorAll('.nav-recipe').forEach(function (li) {
      const link = li.querySelector('.nav-recipe-link');
      const title = link ? link.dataset.recipeTitle : '';
      const show = !favOnly || favTitles.has(title);
      li.classList.toggle('nav-hidden', !show);
    });

    // Hide cluster nav items if all their recipes are hidden
    document.querySelectorAll('.nav-cluster').forEach(function (li) {
      const anyVisible = li.querySelectorAll('.nav-recipe:not(.nav-hidden)').length > 0;
      li.classList.toggle('nav-hidden', !anyVisible && favOnly);
    });

    // Hide subsection nav items if all their recipes are hidden
    document.querySelectorAll('.nav-sub').forEach(function (li) {
      const anyVisible = li.querySelectorAll('.nav-recipe:not(.nav-hidden)').length > 0;
      li.classList.toggle('nav-hidden', !anyVisible && favOnly);
    });

    // Hide section nav items if all their recipes are hidden
    document.querySelectorAll('.nav-section').forEach(function (li) {
      const anyVisible = li.querySelectorAll('.nav-recipe:not(.nav-hidden)').length > 0;
      li.classList.toggle('nav-hidden', !anyVisible && favOnly);
    });
  }
})();
</script>

</body>
</html>`;

const outPath = path.join(__dirname, 'index.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Website written to ' + outPath);
