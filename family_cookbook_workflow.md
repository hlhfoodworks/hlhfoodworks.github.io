# Family Cookbook — Ingestion Workflow

## Standard Add-Recipe Flow

1. Format the recipe per `family_cookbook_format.md` (mise en place ordering, label rules, unit notation, standing substitutions).
2. If the recipe has leavening (baking powder, baking soda, yeast, or eggs as primary leavening), prepare a high-altitude variant alongside the standard version.
3. Email both versions (standard + high-altitude if applicable) FROM muhlheim@gmail.com TO muhlheim@gmail.com. Wait for explicit approval. **Never add to `cookbook_data.js` without approval.**
4. After approval: add the recipe object to `cookbook_data.js` in the correct section/subsection and cuisine-cluster position.
5. Add a CLUSTER_MAP entry in `build_website.js` for the new recipe title.
6. Run `node check_labels.js` — must exit clean before proceeding.
7. Run `node build_website.js` to rebuild all 17 per-section HTML files + `search-index.json` + `index.html` redirect.
8. Tell Eric to run `publish_cookbook.bat` (Eric runs this; Claude does not).

---

## Section / Subsection Structure (as of 2026-09-30)

- Breakfast
- Sandwiches
- Appetizers
- Soups & Stews
- Salads — Greens, Pasta Salads
- Meat Mains — Chicken, Turkey, Pork, Lamb, Beef, Ground Beef, Fish, Shellfish, Other
- Vegetarian Mains — Vegetables, Tofu, Mushroom
- Vegetable Sides
- Rice
- Noodles — Italian, Asian
- Baking — Bread, Sweet Loaves, Cookies, Sweet (Pies & Pastries; Cakes & Cupcakes), Savory
- Dairy (flat, no subsections)
- Dressings (flat, no subsections)
- Sauces — General, Latin/South American, Italian, French/Continental, Middle Eastern/Persian
- Preserves — Pickles & Ferments, Jams & Spreads
- Desserts (no-bake, fried, and assembled desserts only — anything with a bake step belongs in Baking; see format doc for full classification principle)
- Drinks — Alcoholic, Non-Alcoholic

---

## Build Tooling

All scripts live in the Family Cookbook folder:

- **`cookbook_data.js`** — canonical source data (sections → subsections → recipes). The source of truth. Never reconstruct from the docx or index.html. It is large (500KB+); never do a full Read — use targeted `node -e` scripts or `grep -n` to find insertion points.
- **`build_website.js`** — renders `cookbook_data.js` into 17 per-section HTML files (breakfast.html, meat-mains.html, etc.), `search-index.json`, and `index.html` (redirect to breakfast.html). Contains a `CLUSTER_MAP` near the top mapping every recipe title to a cuisine cluster. Every new recipe needs an entry here. Run with `node build_website.js`.
  - The site is multi-page: one HTML file per top-level section. Nav sidebar shows all sections with collapsible trees; expand/collapse state persists in localStorage. Cross-section search works via an inlined SEARCH_INDEX (not a fetch). Search state (?q=) is preserved when clicking cross-section results.
  - **Recipe DOM IDs** are stable slug-based strings: `${sectionSlug}-${subsectionSlug}-${titleSlug}` for subsectioned recipes, `${sectionSlug}-${titleSlug}` for flat sections. Any recipe can override this with an explicit `"id"` field on the recipe object (preferred for recipes that are cross-linked). Explicit `"id"` values take priority and never shift when recipes are reordered.
  - **🔗 Link button** on each recipe generates a `?recipe=ID` URL that opens only that recipe in a new tab, with the recipe name as the browser tab title.
  - **`CLUSTER_MAP`** assigns every recipe to a cuisine cluster. Missing entries silently fall back to 'General' (there is no 'Other' cluster). "American" is never used — use 'General' instead. See `family_cookbook_format.md` for the full no-American rule.
  - **`build_website.js.bak`** and **`index.html.bak`** are backups of the prior single-page build (revert point if needed).
- **`check_labels.js`** — lints ingredient group labels for drift (verb-only, parenthetical instructions, step references). Run after every edit. Must exit 0 before rebuilding.
- **`search-index.json`** — written by every build run. Not fetched by the live site (the search index is inlined directly into each page's HTML). Useful as a debugging artifact: it lists all 214+ recipes with their assigned DOM IDs, pages, and section names. Handy for auditing ID assignments or diagnosing search/link issues without running a full build.
- **`publish_cookbook.bat`** — `git add / commit / push`. Eric runs this manually; Claude never runs it.
- **`build_cookbook.js`** — renders `cookbook_data.js` into `Family Cookbook.docx`. Requires `docx` npm package.
- **`build_toc.sh`** — full docx + TOC pipeline (rebuilds, renders to PDF, finds page numbers, regenerates `toc_pages.js`, rebuilds again). Use this instead of `node build_cookbook.js` directly when updating the docx.

---

## Adding a New Section

When a new top-level section is added to `cookbook_data.js`:

1. Run `node build_website.js` — it auto-generates the new `<section-slug>.html` file.
2. Tell Eric to run `publish_cookbook.bat` — the bat now uses `git add *.html` (glob), so it automatically stages every HTML file including any newly created ones. No edits to the bat file are needed.
3. Update the Section / Subsection Structure table in this file and in `CLAUDE.md`.

---

## Cross-Recipe Hyperlinks

Comments, steps, and ingredients all support raw HTML via a `{html: "..."}` object instead of a plain string. This enables linking one recipe to another anywhere in the recipe body.

**Rules:**
1. **Always use page-prefixed hrefs for cross-section links.** `href='#anchor'` only works on the same page. A link from a Meat Mains recipe to a Sauces recipe must be `href='sauces.html#anchor-id'`. Check `search-index.json` to verify the target recipe's page and ID.
2. **Give the target recipe an explicit `"id"` field** in `cookbook_data.js` before linking to it. Positional IDs (auto-generated from title slug) are stable under normal additions, but an explicit `"id"` is a permanent guarantee. This is especially important for recipes that are "hub" recipes — linked from multiple other recipes.
3. **Format for comments:** `{"html": "Best served with <a href=\"sauces.html#cherry-bbq-sauce\">Cherry Barbecue Sauce</a>."}` — replaces a plain string entry in the `comments` array.
4. **Format for steps:** `{"html": "Follow the <a href=\"baking.html#pie-crust\">Pie Crust</a> recipe."}` — replaces a plain string in the `steps` array. (Steps also support `{lead, bullets}` objects; `{html}` is the third variant.)
5. **Format for ingredients:** `{"html": "1 disk <a href=\"baking.html#pie-crust\">Pie Crust</a>, blind-baked"}` — replaces a plain string in an `ingredientGroups[n].ingredients` array.
6. **HTML entities:** Use `&gt;` for `>` in section-path text (e.g. `Baking &gt; Sweet`). Quotes inside the href must be escaped as `\"`.
7. **Clipboard copy** strips HTML tags from `{html: ...}` objects, so the plain-text copy still reads naturally.

---

## Approval Email Format

- **From / To:** muhlheim@gmail.com (personal address, NOT the Mozilla work address)
- **Subject lines:** Plain ASCII only — no em dashes, no Unicode characters (they arrive garbled)
- **Source line:** Include "Source:" only when the recipe has a traceable attribution (a specific person, book, or publication). Do NOT describe the physical card. Omit entirely if source is unknown.
- **Leavening rule:** For any baking recipe with leavening (baking powder, baking soda, yeast, or eggs as primary leavening), include the high-altitude variant in the same email. Do not send standard-only and wait.

---

## High-Altitude Baking Workflow

Altitude: 4,000–5,000 feet.

1. **New baking recipes with leavening:** Send both standard and high-altitude versions in the same approval email. Include reasoning in the email; do not put reasoning in the cookbook notes.
2. **Data model:** High-altitude versions live as an optional `highAltitude` field on the recipe object in `cookbook_data.js`. Same structure as the standard recipe: `ingredientGroups`, `steps`, optional `comments`. Only recipes with this field show the altitude toggle button on the website.
3. **Approval rule:** Never add a `highAltitude` field to `cookbook_data.js` without explicit approval of the adjusted version.
4. **Recipes that don't need HA:** If a recipe has no leavening and no altitude-sensitive eggs/sugars (e.g. shortbread, pasta casseroles), skip it.
5. **Word document:** Add a High Altitude Appendix listing adjusted recipes in the same order as the main body. In each standard recipe's Comments, add: "High-altitude version in Appendix."

General high-altitude adjustment principles (4,000–5,000 ft):
- Reduce baking powder/soda by 15–25%
- Reduce sugar by 1–2 tablespoons per cup
- Add 2 tablespoons flour per cup
- Increase liquid slightly (1–2 tablespoons per cup)
- For yeast breads: reduce yeast ~25%, shorten rise times (dough rises ~30–50% faster)
- For egg-foam cakes: reduce sugar, beat slightly less, bake slightly shorter; inverted cooling is even more critical

---

## Key Conventions

- **`cookbook_data.js` is the source of truth** — never reconstruct from the docx or index.html.
- **`favorite: true`** on a recipe object renders a ★. Favorites are not pinned to the top; they sit in normal cuisine-cluster order.
- **CLUSTER_MAP** in `build_website.js` must have an entry for every recipe title, or it silently falls back to 'General'. There is no 'Other' cluster. Never use 'American' as a cluster value — use 'General'.
- **Gmail sender:** Always FROM muhlheim@gmail.com.
- **`publish_cookbook.bat`:** Eric runs this. Claude never runs it.
