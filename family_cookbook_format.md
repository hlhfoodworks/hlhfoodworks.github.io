# Family Cookbook — Recipe Format Rules

## Ingredient Group Label Rules

Ingredient group labels must be **descriptive nouns only** — what the group IS, not what you DO with it. Three drift patterns to avoid:

- **Cat 1 — Verb-only labels:** Labels that are just a cooking verb. BAD: "Sear", "Roast", "Blend", "Stir in". FIX: Name the ingredient group as a noun — "Searing fat", "Roasting ingredients", "Sauce", "Wet additions".
- **Cat 2 — Parenthetical cooking instructions:** An otherwise-OK noun label with cooking instructions tacked on in parens. BAD: "Dressing (whisk together)", "Sauce (blend first)", "Filling (combine; spread over batter)". FIX: Drop the parens and instruction entirely — "Dressing", "Sauce", "Filling". Exception: if the parens contain a *timing note* indicating significant advance prep (see below), keep the timing but drop the instruction verb.
- **Cat 3 — Step references:** Labels that reference step numbers. BAD: "Sauce (Step 1)", "Reduction (Steps 1–2)". FIX: Remove the step reference entirely — "Sauce", "Reduction". If the label contained a timing note alongside the step ref, keep the timing note.

**Timing notes to keep:** If an ingredient group must be prepped significantly before the rest of the dish, the label should say so — e.g. "Overnight", "1 hour ahead", "30–60 minutes ahead", "Up to 1 day ahead", "Cool completely before using". Remove the step number but keep the timing. Examples: "Sauce (Step 1 — make 1 hour ahead)" → "Sauce (1 hour ahead)"; "Pastry (make first; refrigerate 30–60 minutes)" → "Pastry (30–60 minutes ahead)". Concurrent prep notes (e.g. "while chicken rests", "while sauce reduces") do NOT warrant a timing note — drop those parentheticals entirely.

**"Serve" vs "To serve":** "Serve" alone is a verb; use "To serve" as the standard infinitive noun form for garnish/serving ingredient groups.

**Informational "(optional)":** A label like "Walnuts (optional)" or "Cream (optional)" is acceptable — "(optional)" indicates the entire group is optional, which is genuinely informational, not a cooking instruction. Do not remove it.

The `check_labels.js` script enforces these rules — run it after every edit to `cookbook_data.js`.

---

## Mise-en-Place Ingredient Ordering

Every recipe added to the Family Cookbook must be reformatted into this standard structure:

1. Recipe name + number of servings (if known) at the top.
2. Ingredient list ordered by mise en place: ingredients used in step 1 appear first as a group, then step 2's ingredients, etc. — not the original recipe's grouping (e.g. not "wet ingredients / dry ingredients", and not a grocery-store aisle grouping like "Produce / Pantry / Dairy / Meat"). If a recipe has several components made in parallel (e.g. a salsa, a rice, and a meatball mix that only combine at serving), group ingredients by component instead, in the order the components are first introduced.
3. Steps, rewritten (lightly) for prep efficiency: if a step calls for several herbs/spices/other items to be added together, the ingredient list should show them as one prep group (e.g. "combine in a small bowl") rather than listing them scattered across unrelated groups.
4. Long or multi-action steps should be broken into a short numbered lead-in plus sub-steps, rather than one long run-on paragraph. Short single-action steps stay as plain numbered steps.

**Why:** Eric cooks by strict mise en place — everything prepped and grouped before cooking starts.

**How to apply:** When reformatting, don't rewrite the recipe's substance — only reorder/regroup ingredients, split multi-part steps, and lightly adjust step wording so prep groups are explicit. Keep quantities, techniques, and cooking instructions faithful to the source.

---

## Unit Notation Standard

All ingredient quantities use **full spelled-out words** — never abbreviations:
- `tablespoon` / `tablespoons` (never T, Tbsp, tbsp)
- `teaspoon` / `teaspoons` (never t, tsp)
- `cup` / `cups` (never c, C)
- `pound` / `pounds` (never lb, lbs)
- `package` / `packages` (never pkg)
- `oz` is acceptable — do not spell out

**Oven temperatures:** always in Fahrenheit only — no Celsius, no dual notation (e.g. `350°F`, never `180°C` or `350°F (180°C)`). Convert any source temperature to °F before formatting. Apply to every new recipe before sending for approval.

**Chili oil / chili crisp spelling:** Always spell as **"chili"** — never "chile" — when referring to the condiment or infused oil (e.g. `chili crisp`, `chili oil`, `garlic-chili oil`). This applies to recipe titles, ingredient group labels, ingredient lines, and comments. Note: "chile" (referring to the pepper itself, e.g. "dried chiles") is unaffected by this rule.

**Chili crisp vs. chili oil branding:**
- **Chili crisp** → specify brand: "Lao Gan Ma or Fly By Jing chili crisp"
- **Chili oil** → keep generic — never brand it as Lao Gan Ma or Fly By Jing (those are chili crisp brands, not chili oil)
These are distinct products; do not conflate them.

---

## Standing Ingredient Substitutions (apply automatically)

- "red pepper flakes" (or "crushed red pepper") → "Aleppo pepper or red pepper flakes"
  - **Cayenne pepper is a distinct spice — do NOT apply this substitution to it.** Cayenne has a different heat profile and is used as a precise seasoning (classic in quiche lorraine, béchamel, etc.). Keep "cayenne pepper" exactly as written; never replace it with Aleppo pepper.
- "long grain rice", "basmati rice", or "jasmine rice" → "Jasmine or Basmati rice"
- "eschallot(s)" → "shallot(s)"
- Any recipe calling for a choice of ground meats → default to ground chicken; name alternatives in Comments.
- **Anchovies as flavor enhancer** (used in aromatics/sauce base, not as the defining protein — e.g. Caramelized Shallot Pasta, not Pasta con le Sarde): add a comment "To make meatless: substitute ½ teaspoon soy sauce + a pinch of crumbled nori per anchovy fillet." Also classify the recipe as Meatless, not With Meat.

---

## Recipe Object Fields

**`source`:** Attribution field. Use for a specific person, book, or publication — e.g. `"From Grandmother Brenda"`, `"From Christy Ponder"`, `"New York Times"`. Do NOT put attribution in `comments`. If source is unknown, omit the field.

**`comments`:** Array of short notes shown above the ingredient list. Use for: substitution options, garnish/mix-in variations, cooking tips, headnote info. Do NOT use for attribution. Example: `"comments": ["Can substitute turkey for chicken.", "Freezes well."]`

**Cross-references in comments must be hyperlinks.** Whenever a comment references another recipe by name, use an `{html: ...}` comment object rather than plain text. The linked recipe must have an explicit `"id"` field in `cookbook_data.js`; if it lacks one, add it at the same time. Link format: `{ "html": "See <a href='section.html#recipe-id'>Recipe Title</a> in the X section." }` — same-page links use `#anchor-only`; cross-page links must include the filename prefix (e.g. `pickling.html#quick-pickled-red-onions`). See "Cross-recipe hyperlinks" under the American cluster rule for full details.

**`favorite`:** Set `favorite: true` to mark a recipe with a ★ star. Favorites are NOT pinned to the top — they sit in their normal cuisine-cluster position.

**`servings` must always include a unit.** A bare number (e.g. `"4"`) is not acceptable — the website renders it with no context. Always use a form like `"Serves 4"`, `"Serves 4–6   |   Total: 30 min"`, `"Makes 12 cookies"`, `"About 3 dozen"`, or any other phrase where the number is accompanied by a word. The only exception is a fully descriptive phrase that makes quantity clear without "Serves" (e.g. `"One 9×13 pan"`, `"1 large cheese ball (12–16 as an appetizer)"`). If a servings string begins with a bare digit followed only by a range or pipe-separated timing, it is a violation.

**`highAltitude`:** Optional field with same structure as the standard recipe (`ingredientGroups`, `steps`, `comments`). Never add without explicit approval. See workflow doc for details.

---

## Cuisine Cluster Ordering

Within every subsection, recipes are ordered by cuisine cluster (geographic sweep), then alphabetically within each cluster:

General → Latin/South American → Italian → French/Continental → Central/Eastern European → Mediterranean/Greek → Moroccan/North African → West African → Middle Eastern/Persian → Indian → Thai → Vietnamese → Filipino → Korean-inspired → Chinese → Japanese

**This ordering is enforced automatically at build time by `build_website.js`**, which sorts recipes alphabetically within each cluster when generating HTML. The physical order of recipes in `cookbook_data.js` does not affect the rendered display — the build always produces the correct ordering.

**This also applies to top-level sections with no subsections** (Breakfast, Vegetable Sides, Rice, Dressings, etc.).

**Standalone sauces in Noodles subsections** go at the end of the subsection, after all complete noodle dishes — regardless of their cluster.

**Favorites are not pinned to the top** — the ★ is purely a visual marker; a favorite sits wherever its cuisine cluster places it.

**Cluster heading display rules:**
- Geographic cluster names (Italian, Moroccan/North African, etc.) appear in the website nav and content at the lowest organizational level: inside subsections for sections that have them, or directly inside the section for sections without subsections.
- The `'General'` cluster is **never** rendered as a visible heading. General-cluster recipes appear first within their subsection without any cluster label.
- When a subsection contains recipes from only one cluster (any cluster), no cluster heading is shown — recipes render flat within the subsection.

---

## "American" Is Never Used as a Cuisine Cluster or Subsection Name

**Rule:** The cuisine cluster label `'American'` does not exist in this cookbook. American-origin or otherwise uncategorized recipes use `'General'` as their cluster. This is enforced in `CLUSTER_MAP` in `build_website.js`.

**Rationale:** "General" is the catch-all for recipes that don't belong to a distinct non-American cuisine tradition. Using "American" as a label would create a hierarchy where other cuisines are named but American food gets special treatment — "General" is more accurate and consistent.

**Subsection names follow the same rule:** Subsections in any section must be named by recipe type or other descriptive characteristic, not by geography alone. `Sauces > General` is correct; `Sauces > American` is not. No subsection may be named after a geographic region if `General` captures the same meaning.

**No nested geography:** A subsection named "American" containing recipes clustered as "American" (or "General") creates redundant nested geography. Avoid this at all levels.

**When adding recipes:** Always assign `'General'` (never `'American'`) in `CLUSTER_MAP` for American-origin or unclassifiable recipes. If a recipe belongs to a recognized non-American cuisine tradition, assign the appropriate named cluster.

**Cross-recipe hyperlinks in `{html: ...}` comment objects:** When linking to a recipe on a different page, always prefix the anchor with the correct page filename — e.g. `sauces.html#horseradish-sauce`, `meat-mains.html#sous-vide-beef-ribs`, `pickling.html#haitian-pikliz`. Same-page links (`#anchor-only`) only work on the same section page. Every linked recipe must have an explicit `"id"` field in `cookbook_data.js` to ensure the anchor is stable across reorders.

---

## Cross-Recipe Link Style

When a recipe references another recipe in the cookbook (as an ingredient, in a step, or in a comment), use a hyperlink — and the hyperlink alone is sufficient for navigation. **Do not append the section path after the link.** The reader can follow the link; spelling out "(Baking > Sweet)" or "(Sauces > Italian)" is redundant and clutters the text.

**Correct:**
- `{"html": "1 disk <a href=\"baking.html#baking-sweet-all-shortening-pie-crust\">All-Shortening Pie Crust</a>"}`
- `{"html": "Uses one ball of <a href=\"baking.html#baking-savory-72-hour-pizza-dough\">72-Hour Pizza Dough</a>. Make the dough at least 3 days ahead."}`

**Wrong:**
- `{"html": "1 disk <a href=\"baking.html#baking-sweet-all-shortening-pie-crust\">All-Shortening Pie Crust</a> (Baking &gt; Sweet)"}` — remove the parenthetical
- `{"html": "Uses one ball of <a href=\"baking.html#baking-savory-72-hour-pizza-dough\">72-Hour Pizza Dough</a> from Baking &gt; Savory."}` — remove "from Baking > Savory"

**Plain-text mentions without links:** If a recipe reference cannot be hyperlinked (rare), mention the recipe name only — do not include the section path. In such cases, convert to an `{html: ...}` object with a hyperlink wherever possible.

**Comments noting cookbook use:** A recipe may include a note in its `comments` field that it uses another cookbook recipe — this is encouraged for discoverability. The note should use an `{html: ...}` hyperlink (not plain text with a section path).

---

## Section Classification: Baking vs. Desserts

### Core principle

**Baking** contains anything that requires a bake step, plus cookie-format confections (bars, balls, no-bake cookies) that belong in the same browsing context as cookies.

**Desserts** contains sweet dishes that require no bake step and are not cookie-format: puddings, no-bake pies, frozen/chilled desserts, assembled desserts (Tiramisu), fried sweets (Churros), and fresh fruit desserts (Mango with Sticky Rice).

### Baking subsections

- **Bread** — yeasted and laminated breads served as a meal component or alongside savory food (Challah, Focaccia, Naan, Malawah, etc.)
- **Sweet Loaves** — sweet baked breads, both yeasted (Babka) and quick loaves (Zucchini Bread, Pumpkin Gut Bread)
- **Cookies** — cookies, brownies, bars, and cookie-format confections regardless of whether they have a bake step
- **Sweet** — everything else that is baked and sweet: pies, tarts, cobblers, cakes, scones, muffins, doughnuts, pastry, shortcake, bread pudding, profiteroles

### Deciding where a new sweet recipe goes

1. Does it have a bake step? If no → **Desserts** (unless it is cookie-format → **Cookies**).
2. If yes → **Baking**. Then:
   - Is it a yeasted or quick sweet loaf (primary identity is "a loaf of bread")? → **Sweet Loaves**
   - Is it cookie/brownie/bar format? → **Cookies**
   - Is it a cake or cupcake? → **Sweet > Cakes & Cupcakes**
   - Everything else (pie, tart, cobbler, scone, muffin, pastry, shortcake, bread pudding) → **Sweet > Pies & Pastries**
3. Is it a savory baked item (pizza, quiche, cornbread)? → **Savory**
4. Is it a yeasted/laminated bread served with or as a meal? → **Bread**

---

## Approval Email Format

- Send FROM muhlheim@gmail.com TO muhlheim@gmail.com (never to the Mozilla work address).
- Subject lines must be plain ASCII only — no em dashes, no Unicode (they arrive garbled).
- Include a "Source:" line only when the recipe has a traceable attribution. Do NOT describe the physical card.
- For any baking recipe with leavening (baking powder, baking soda, yeast, or eggs as primary leavening), include a high-altitude variant in the same email. Do not send the standard version only and wait.
- The email should show the recipe in human-readable format. The actual JS object goes into `cookbook_data.js` after approval.
