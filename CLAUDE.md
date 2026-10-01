# Family Cookbook — Project Context

This folder contains the Family Cookbook project. Read this file at the start of every session.

## What this project is

A family recipe collection maintained as:
- **`cookbook_data.js`** — canonical source data (sections → subsections → recipes). Always edit this first.
- **Per-section HTML files** — generated GitHub Pages website, one file per section (breakfast.html, meat-mains.html, etc.) plus `index.html` (redirect to breakfast.html) and `search-index.json`. Rebuild all with `node build_website.js` after any data change.
- **`Family Cookbook.docx`** — generated Word document. Rebuild with `bash build_toc.sh` when a print/PDF version is needed.

## Adding a recipe — standard flow

**Read `family_cookbook_format.md` and `family_cookbook_workflow.md` in this folder before doing any cookbook work.**

1. Format per mise-en-place standard (see `family_cookbook_format.md`).
   - Apply unit notation standard (see below) before sending.
2. Email draft to **muhlheim@gmail.com** (FROM muhlheim@gmail.com) for approval. Never add to `cookbook_data.js` without explicit approval.
   - **Baking recipes with leavening:** include a high-altitude variant in the same approval email (see `family_cookbook_workflow.md` → High-Altitude Baking Workflow). This applies to any recipe in Baking > Savory, Baking > Sweet, Baking > Sweet Loaves, Breakfast, or Desserts that contains baking powder, baking soda, yeast, or eggs as primary leavening. Do not skip this step.
3. After approval: add recipe object to `cookbook_data.js` in the correct section/subsection and cuisine-cluster position.
4. Add a CLUSTER_MAP entry in `build_website.js` (near the top of the file).
5. Run `node check_labels.js` — must exit clean before proceeding.
6. Run `node build_website.js` → rebuilds all 17 per-section HTML files + `search-index.json` + `index.html` redirect.
7. Tell Eric to run `publish_cookbook.bat` (he runs it; Claude does not).

## Unit notation standard

All ingredient quantities use **full words, never abbreviations**:
- `tablespoon` / `tablespoons` (never T, Tbsp, tbsp)
- `teaspoon` / `teaspoons` (never t, tsp)
- `cup` / `cups` (never c, C)
- `pound` / `pounds` (never lb, lbs)
- `package` / `packages` (never pkg)
- `oz` is acceptable — do not spell out as "ounce"
- **Oven temperatures:** Fahrenheit only — no Celsius, no dual notation (e.g. `350°F`, never `180°C` or `350°F (180°C)`). Convert source temperatures to °F before formatting.

Apply this standard when formatting any new recipe before sending for approval. To standardize existing entries in bulk, use the `node /tmp/unit_standardize.js` approach (see session history).

## Section / subsection structure

- Breakfast
- Sandwiches
- Appetizers
- Soups & Stews
- Salads — Green Salads, Chopped & Composed Salads, Pasta Salads
- Meat Mains — Chicken, Turkey, Pork, Lamb, Beef, Ground Beef, Fish, Shellfish, Other
- Vegetarian Mains — Vegetables, Tofu, Mushroom
- Noodles — Baked & Stuffed, Stovetop (Tomato-Based; Cream, Butter & Cheese; Oil & Pesto; Seafood), Asian Noodles
- Vegetable Sides — Potatoes, Stovetop, Oven
- Rice
- Baking — Bread, Sweet Loaves, Cookies, Sweet (Pies & Pastries; Cakes & Cupcakes), Savory
- Dairy
- Dressings
- Sauces — General, Latin/South American, Italian, French/Continental, Middle Eastern/Persian
- Preserves — Pickles & Ferments, Jams & Spreads
- Desserts (no-bake, fried, and assembled desserts only — anything with a bake step belongs in Baking)
- Drinks — Alcoholic, Non-Alcoholic

## Recipe format rules (summary)

Full detail in `family_cookbook_format.md` (this folder). Key points:
- Ingredients grouped by the step they are **first used** (mise en place order), not grocery-store or wet/dry groupings.
- Comments field (`comments: ["..."]`) for substitution notes, tips, headnote info.
- Cuisine-cluster ordering within subsections: General → Latin/South American → Italian → French/Continental → Central/Eastern European → Mediterranean/Greek → Moroccan/North African → West African → Middle Eastern/Persian → Indian → Thai → Vietnamese → Filipino → Korean-inspired → Chinese → Japanese. Alphabetical within each cluster.
  - **"American" is never used as a cluster label — use "General" instead.** Same rule for subsection names. See `family_cookbook_format.md` for the full rule.
- **Ingredient group labels must be descriptive nouns only** — what the group IS, not what you do. Three patterns to reject:
  - Verb-only labels: "Sear", "Roast", "Blend" → use a noun: "Searing fat", "Roasting ingredients", "Sauce"
  - Parenthetical cooking instructions: "Dressing (whisk together)" → "Dressing" (drop the parens)
  - Step references: "Sauce (Step 1)" → "Sauce" (remove step number; keep timing notes like "1 hour ahead")
  - "Serve" → "To serve"; "(optional)" parentheticals on labels are fine (informational, not instructions)
- **Standing substitutions (apply automatically):**
  - "red pepper flakes" → "Aleppo pepper or red pepper flakes"
  - "long grain / basmati / jasmine rice" → "Jasmine or Basmati rice"
  - "eschallot(s)" → "shallot(s)"
  - Ground meat choice recipes → default to ground chicken; note alternatives in Comments.

## Label linter

After any edit to `cookbook_data.js`, run:

```
node check_labels.js
```

It exits 0 if clean. If it reports issues, fix them (or send for approval) before rebuilding. The linter catches three drift patterns: verb-only labels, parenthetical cooking instructions, and step references. See `family_cookbook_format.md` in this folder for the full rules.

## Updating format or workflow rules

When any format rule, workflow step, section structure, or convention changes during a session, **update the local files in this folder** — not just session memory:

- Format/label/ordering rules → edit `family_cookbook_format.md` in this folder
- Workflow, section structure, build tooling, HA process → edit `family_cookbook_workflow.md` in this folder
- Section structure listed in CLAUDE.md → also update it here

Session memory (if present) is a secondary cache — the files in this folder are the authoritative record and are accessible to any future session that connects the folder.

## Key conventions

- **Gmail sender:** Always send approval emails FROM muhlheim@gmail.com (not Mozilla address).
- **`publish_cookbook.bat`:** Eric runs this at end of day. Claude never runs it.
- **`cookbook_data.js` is the source of truth** — never reconstruct from the docx or index.html. It is large (500KB+); never do a full Read. Use targeted `node -e` scripts or `grep -n` to find insertion points, recipe lists, or specific fields.
- Favorite recipes use `favorite: true` on the recipe object (renders a ★).
- CLUSTER_MAP in `build_website.js` must have an entry for every recipe title or it will silently fall back to the 'General' cluster. (There is no 'Other' cluster.)
