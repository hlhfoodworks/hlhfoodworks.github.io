const data = {
  sections: [
    {
      title: "Breakfast",
      recipes: [
        {
          title: "Glazed Cinnamon Rolls (Tangzhong Version)",
          favorite: true,
          servings: "One dozen round rolls   |   Cook: 15-17 minutes",
          comments: [
            "This dough uses a tangzhong (a pre-cooked flour-and-milk paste) for a softer, more tender roll and better keeping quality.",
            "The filling here is doubled from the original for a more generous swirl, the glaze includes optional cinnamon and food coloring."
          ],
          source: "The Breakfast Book, by Marion Cunningham, adapted to use a tangzhong (see https://www.theperfectloaf.com/how-to-make-tangzhong/)",
          ingredientGroups: [
            { label: "Tangzhong (make first)", ingredients: ["1/4 cup (30g) all-purpose flour", "2/3 cup (160g) milk"] },
            { label: "Yeast", ingredients: ["1/4 cup warm water", "1 package active dry yeast", "1 teaspoon sugar"] },
            { label: "Dough", ingredients: ["3 3/4 cups all-purpose flour", "1/4 cup sugar", "1 teaspoon salt", "1/2 pound (2 sticks) butter, chilled", "3 egg yolks", "1/3 cup plus 2 tablespoons milk (the reserved 1/3 cup from the tangzhong step, plus 2 tablespoons extra)"] },
            { label: "Filling (doubled)", ingredients: ["1/2 cup (1 stick) butter, melted", "3/4 cup (12 tablespoons) sugar", "2 teaspoons cinnamon"] },
            { label: "Glaze", ingredients: ["1 1/2 cups confectioners' sugar", "2 tablespoons butter, room temperature", "2 tablespoons water", "1/4 teaspoon ground cinnamon (optional)", "Food coloring (optional, to taste)"] }
          ],
          steps: [
            "Tangzhong: In a small saucepan, whisk together the 1/4 cup (30g) flour and 2/3 cup (160g) milk until smooth. Cook over medium heat, stirring constantly, until thickened to a paste, about 2 minutes. Scrape into a small bowl; reserve 1/3 cup for the dough and discard the rest (or save for another use).",
            "Yeast: Put the warm water in a small bowl and sprinkle the yeast over. Stir in the 1 teaspoon sugar and let stand until foamy, about 5 minutes.",
            "Dry mix: In the bowl of a food processor, combine the flour, sugar, and salt; pulse briefly to blend. Add the chilled butter and pulse until the mixture resembles coarse crumbs.",
            "Dough: Transfer the flour-butter mixture to the bowl of a stand mixer fitted with the paddle attachment. Add the yeast mixture, the tangzhong, the egg yolks, and the 1/3 cup plus 2 tablespoons milk. Mix on medium speed until a smooth dough forms.",
            { lead: "Filling:", bullets: [
              "Combine the melted butter, sugar, and cinnamon in a small bowl to make a spreadable filling.",
              "On a clean, floured countertop, roll out the whole batch of dough into one large, thin rectangle about 18-20 inches by 24 inches.",
              "Spread the filling mixture evenly over the rectangle.",
              "Using a pizza cutter, cut the rectangle lengthwise into 12 long strips. Roll each strip up individually into a spiral and place in a greased pan.",
            ]},
            "Cover loosely and let rise for 1 hour. Meanwhile, make the glaze: Sift the confectioners' sugar into a small bowl, then stir in the butter, water, and optional cinnamon until smooth. Tint with food coloring if desired.",
            "Bake in a preheated 400°F oven for 15-17 minutes. Remove the rolls and set them on a rack over a piece of waxed paper.",
            "Spoon the prepared glaze over each roll while still hot."
          ]
        },
        {
          title: "Homemade Biscuits",
          favorite: true,
          servings: "8 large biscuits   |   Prep: 15 minutes   |   Cook: 15 to 20 minutes",
          comments: [
            "Cut into 8 big squares rather than small rounds, so these come out extra generous.",
            "Whole milk plus a splash of white vinegar stands in for buttermilk here — no need to track down real buttermilk."
          ],
          source: "Adapted from Inspired Taste (inspiredtaste.net), by Adam and Joanne Gallagher",
          ingredientGroups: [
            { label: "Soured milk (start this first)", ingredients: ["1 3/4 cups whole milk", "1 tablespoon white vinegar"] },
            { label: "Dry ingredients", ingredients: ["4 cups (520 g) all-purpose flour, spooned and leveled", "10 teaspoons (3 tablespoons plus 1 teaspoon) aluminum-free baking powder, leveled", "1/2 teaspoon baking soda", "2 tablespoons sugar", "2 teaspoons fine sea salt"] },
            { label: "Butter", ingredients: ["12 tablespoons (1 1/2 sticks; 170 g) cold butter"] }
          ],
          steps: [
            "Make the soured milk: Stir the vinegar into the whole milk. Let stand at least 5 minutes while you prepare the dough (it will look slightly curdled — that's fine).",
            "Heat the oven to 425°F. Set aside an oven-safe 10- to 12-inch skillet, preferably cast iron, or a cookie sheet lined with parchment.",
            "Dry ingredients: In a food processor, combine the flour, baking powder, baking soda, sugar, and salt. Pulse 3 to 4 times to combine.",
            "Cut the cold butter into small cubes or thin slices; scatter over the flour mixture. Pulse 5 to 7 times, just until the butter is broken into pea-sized pieces.",
            "Transfer to a large bowl. Make a well in the middle; pour in the soured milk and stir gently with a fork or spatula just until the dough comes together (some dry bits are fine — don't overmix).",
            "Transfer the dough to a lightly floured work surface. Sprinkle a little flour over the top and gently bring the dough together with your hands.",
            { lead: "Fold the dough:", bullets: [
              "Without overworking the dough, gently pat it into a rough rectangle about 3/4 inch thick.",
              "Fold the dough into thirds, envelope-style — bring one short side over the center, then fold the opposite side over it, like a letter.",
              "Rotate the dough 90 degrees, then repeat the pat-and-fold two more times to build flaky layers.",
            ]},
            "Pat the dough into a rough 3/4-inch-thick rectangle. Cut into 8 squares — no need to cut rounds or reroll scraps.",
            "Arrange the squares close together on the skillet (or parchment-lined cookie sheet) to help them rise tall.",
            "Bake 15 to 20 minutes, until the tops are deeply golden brown and the biscuits have risen tall."
          ]
        },
        {
          title: "Raised Waffles",
          servings: "About 8 waffles",
          comments: ["The batter keeps well in the refrigerator for several days."],
          source: "The Breakfast Book, by Marion Cunningham (originally from an early Fannie Farmer cookbook)",
          ingredientGroups: [
            { label: "Yeast", ingredients: ["1/2 cup warm water", "1 package dry yeast"] },
            { label: "Batter (mixed and left overnight)", ingredients: ["2 cups milk, warmed", "1/2 cup (1 stick) butter, melted", "1 teaspoon salt", "1 teaspoon sugar", "2 cups all-purpose flour"] },
            { label: "Added before cooking", ingredients: ["2 eggs", "1/4 teaspoon baking soda"] }
          ],
          steps: [
            "Yeast: In a large mixing bowl (the batter will rise to double its volume), put the warm water and sprinkle the yeast over. Let stand until foamy, about 5 minutes.",
            "Add the milk, butter, salt, sugar, and flour to the yeast mixture; beat until smooth and blended (a hand-rotary beater works well). Cover tightly and leave overnight at room temperature.",
            "Just before cooking, beat in the eggs and baking soda; stir until well mixed. The batter will be very thin.",
            "Pour about 1/2 to 3/4 cup batter into a very hot waffle iron. Bake until golden and crisp."
          ]
        },
        {
          title: "Baked German Pancake (or Dutch Babies)",
          servings: "One 12-inch pancake, or four 6-inch Dutch babies   |   Cook: 15-25 minutes",
          source: "The Breakfast Book, by Marion Cunningham",
          ingredientGroups: [
            { label: "For the pan", ingredients: ["Butter, for greasing the pan(s)"] },
            { label: "Batter", ingredients: ["3 eggs, room temperature", "1/2 cup milk", "1/2 cup all-purpose flour", "1/2 teaspoon salt", "2 tablespoons butter, melted"] },
            { label: "To finish", ingredients: ["2 tablespoons lemon juice", "Confectioners' sugar, for dusting"] }
          ],
          steps: [
            "Preheat the oven to 450°F. Butter one 12-inch ovenproof skillet, or four 6-inch skillets or pans with ovenproof handles.",
            "Beat the eggs in a mixing bowl until thoroughly combined, then add the milk and blend well.",
            "Sift the flour and salt over the egg mixture, whisking steadily until smooth. Add the melted butter and mix briskly until combined.",
            "Pour the batter into the pan(s). Bake for 15 minutes at 450°F for small pancakes; for one large pancake, bake 15 minutes at 450°F then reduce to 350°F and bake 10 minutes more.",
            "Sprinkle the lemon juice over the pancake(s) and dust with confectioners' sugar. Serve at once, while puffed and hot."
          ]
        }
      ]
    },
    {
      title: "Meat Mains",
      subsections: [
        {
          title: "Chicken",
          recipes: [
            {
              title: "Baked Crunchy Hot Honey Chicken",
              servings: "6   |   Prep: 15 minutes   |   Cook: 25 minutes   |   Total: 40 minutes",
              source: "Half Baked Harvest, by Tieghan Gerard",
              ingredientGroups: [
                { label: "Crumb coating", ingredients: ["6 cups cornflakes (gluten-free if needed)", "1/4 cup grated parmesan cheese", "1 teaspoon smoked paprika", "1/2 teaspoon onion powder", "1/2 teaspoon garlic powder"] },
                { label: "Egg wash", ingredients: ["2 large eggs, beaten", "2 tablespoons hot sauce"] },
                { label: "Chicken", ingredients: ["2 pounds chicken breast tenderloins", "Extra-virgin olive oil, for drizzling"] },
                { label: "Hot honey sauce", ingredients: ["1/2 cup honey", "2 to 3 tablespoons hot sauce", "1 to 3 teaspoons cayenne pepper", "3/4 teaspoon chipotle chili powder", "1/2 teaspoon garlic powder", "1/2 teaspoon onion powder", "Sea salt"] },
                { label: "To finish", ingredients: ["Fresh thyme, cilantro, or parsley"] }
              ],
              steps: [
                "Preheat the oven to 425°F. Line a baking sheet with parchment paper.",
                "Pulse the cornflakes, parmesan, paprika, onion powder, garlic powder, and a pinch of salt in a food processor until fine crumbs form. Transfer to a shallow bowl.",
                "Beat the eggs with the hot sauce in a bowl; add the chicken and toss well to coat.",
                "Dredge the chicken through the crumbs, covering fully. Place on the baking sheet. For a thicker coating, dip back through the egg wash and crumbs a second time.",
                "Drizzle the chicken with olive oil. Bake 20 to 25 minutes, until crisp all around.",
                "Just before the chicken is done, warm the honey, hot sauce, cayenne, chili powder, onion powder, and garlic powder with a pinch of salt in a small saucepan over low heat until combined.",
                "Drizzle the warm sauce over the chicken. Top with fresh herbs."
              ]
            },
            {
              title: "Brown Butter Sage Skillet Chicken",
              servings: "4   |   Prep: 10 minutes   |   Cook: 20 minutes   |   Total: 30 minutes",
              comments: [
                "Thin-sliced chicken breasts cook fastest; if starting with standard breasts, slice horizontally through the middle for thinner cutlets.",
                "Great served over egg noodles, orzo, or a light pasta."
              ],
              source: "Nourish and Fete, by Monica",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["4 boneless, skinless chicken breasts, sliced or pounded thin", "Kosher salt and black pepper", "1/4 cup all-purpose flour"] },
                { label: "Sear", ingredients: ["2 tablespoons unsalted butter (of the 6 tablespoons below)", "2 tablespoons extra-virgin olive oil"] },
                { label: "Brown butter sauce", ingredients: ["4 tablespoons unsalted butter (the remainder of the 6 tablespoons total)", "1/3 cup fresh sage leaves", "Juice of 1/2 lemon (reserve the other half for serving)", "1/2 cup white wine or low-sodium chicken broth"] },
                { label: "To serve", ingredients: ["Lemon wedges"] }
              ],
              steps: [
                "Season both sides of the chicken generously with salt and pepper. Place the flour in a shallow bowl or plate and dredge each cutlet, shaking off the excess.",
                "Add 2 tablespoons of the butter and the olive oil to a large skillet over medium-high heat. When the butter melts, add the chicken and cook until golden brown, about 3 to 4 minutes per side. Transfer to a plate.",
                "Add the remaining 4 tablespoons butter to the skillet. When melted, add the sage leaves. Let the butter brown and bubble until it smells nutty and the sage is crispy, about 2 minutes.",
                "Add the lemon juice and wine (or broth) to the skillet. Simmer 2 to 3 minutes, scraping up any browned bits from the bottom. Return the chicken to the skillet and warm through. Serve with lemon wedges."
              ]
            },
            {
              title: "Company Baked Chicken",
              favorite: true,
              comments: ["Marked \"v. good!\" on the original card."],
              source: "Family recipe card, credited to Grandmother Brenda",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["2 chickens or equivalent amount of chicken parts", "Black pepper", "Garlic powder"] },
                { label: "Marinade", ingredients: ["1/2 cup honey", "1/2 cup soy sauce", "3 tablespoons oil"] },
                { label: "To finish", ingredients: ["Sesame seeds"] }
              ],
              steps: [
                "Season the chicken pieces all over with pepper and garlic powder.",
                "Combine the honey, soy sauce, and oil to make the marinade.",
                "Add the chicken to the marinade, turning to coat. Cover and marinate in the refrigerator 24 hours, turning frequently.",
                "Preheat the oven to 350°F.",
                "Place the chicken skin-side down in a baking dish with the marinade. Bake uncovered 45 minutes.",
                "Turn the chicken pieces over, sprinkle with sesame seeds, and continue baking another 30 minutes, basting occasionally with the pan juices."
              ]
            },
            {
              title: "Creamy Spinach-Artichoke Chicken Stew",
              servings: "4 to 6   |   Total: 50 minutes",
              source: "NYT Cooking, by Sarah DiGregorio",
              ingredientGroups: [
                { label: "Aromatics", ingredients: ["2 tablespoons unsalted butter", "1 large yellow or red onion, finely chopped", "Kosher salt and black pepper", "3 celery stalks, chopped", "8 garlic cloves, smashed and chopped"] },
                { label: "Braise", ingredients: ["2 cups chicken stock", "3/4 cup white wine", "2 to 2 1/4 pounds boneless, skinless chicken thighs", "1/2 lemon, juiced (about 1 1/2 tablespoons)", "1 teaspoon Aleppo pepper or red pepper flakes"] },
                { label: "Spinach and artichokes", ingredients: ["1 (10-ounce) package frozen cut spinach", "1 (12-ounce) jar marinated artichoke hearts, drained (about 1 heaping cup)"] },
                { label: "To finish", ingredients: ["1/2 cup cream cheese (about 4 ounces)", "1/2 cup finely chopped fresh dill", "4 to 6 scallions, thinly sliced", "Grated Parmesan cheese"] }
              ],
              steps: [
                { lead: "Aromatics:", bullets: [
                  "In a large Dutch oven over medium-high heat, melt the butter. Add the onion, season lightly with salt, and cook, stirring, until softened, about 5 minutes.",
                  "Add the celery and cook, stirring, until softened, about 5 minutes, adjusting the heat as needed to avoid scorching. Stir in the garlic and cook 1 minute more."
                ]},
                "Pour in the stock and wine, and bring to a bubble. Add the chicken thighs, lemon juice, and Aleppo pepper or red pepper flakes.",
                "Reduce the heat to maintain a low simmer and simmer, uncovered, 20 minutes.",
                "Add the frozen spinach and artichoke hearts. Increase the heat to medium-high and cook, stirring, to help the spinach defrost and the liquid reduce slightly, about 5 minutes.",
                "Add the cream cheese in dollops, stirring to melt it into the stew. Add the dill. Using two forks, coarsely break or shred the chicken into pieces. Taste and adjust seasoning.",
                "Divide among bowls and top with scallions and Parmesan."
              ]
            },
            {
              title: "Crispy Chicken With Lime Butter",
              servings: "4   |   Prep: 5 minutes   |   Cook: 35 minutes   |   Total: 40 minutes",
              comments: ["The rendered chicken fat (schmaltz) can be saved to pan-fry vegetables, enrich a soup or sauce, or spread on toast."],
              source: "NYT Cooking, by Eric Kim",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["4 large bone-in, skin-on chicken thighs (about 2 pounds)", "Salt and pepper", "1 tablespoon peanut or canola oil"] },
                { label: "Aromatics", ingredients: ["2 garlic cloves, crushed"] },
                { label: "Pan sauce", ingredients: ["1/2 cup chicken stock or 1/4 cup water", "2 tablespoons fresh lime juice, plus wedges for serving", "2 teaspoons maple syrup", "3 tablespoons cold unsalted butter, cut into pats"] },
                { label: "To serve", ingredients: ["Parsley, cilantro, basil, or mint leaves (optional)"] }
              ],
              steps: [
                "Pat the chicken dry and season with salt and pepper. If you have time, let sit at room temperature 10 to 30 minutes.",
                "Heat a large skillet over medium heat. Add the oil and swirl to coat the pan. Place the chicken skin side down and cook undisturbed until the skin is deeply golden and crispy, about 20 to 25 minutes.",
                "Add the garlic to the pan. Flip the chicken and cook until the bottom is lightly browned and the meat is cooked through, about 5 to 8 minutes more. Transfer to a plate.",
                "Pan sauce: Add the chicken stock, lime juice, and maple syrup to the skillet. Season with salt and pepper. Bring to a simmer and cook until slightly reduced, about 2 minutes. Remove from heat and whisk in the cold butter a pat at a time until the sauce is glossy.",
                "Serve the chicken with the pan sauce, lime wedges, and the optional fresh herbs (lightly spritzed with lime juice and seasoned with flaky salt, if using)."
              ]
            },
            {
              title: "Crispy Spice Rubbed Chicken Thighs",
              favorite: true,
              servings: "3 to 4   |   Prep: 5 minutes   |   Cook: 30 minutes   |   Total: 35 minutes",
              source: "Fifteen Spatulas",
              ingredientGroups: [
                { label: "Spice rub", ingredients: ["1 teaspoon ground ginger", "1 teaspoon ground chipotle pepper", "2 teaspoons yellow curry powder", "1 teaspoon paprika", "1 teaspoon garlic powder", "1/2 teaspoon ground coriander", "1/4 teaspoon ground cardamom", "1/8 teaspoon ground cloves", "1/4 teaspoon ground cayenne pepper", "1/2 teaspoon ground cumin", "1 1/2 teaspoons sea salt"] },
                { label: "Chicken", ingredients: ["2 to 3 pounds skin-on, bone-in chicken thighs (about 5 pieces)", "Olive oil"] }
              ],
              steps: [
                "Preheat the oven to 400°F.",
                "Combine the ginger, chipotle pepper, curry powder, paprika, garlic powder, coriander, cardamom, cloves, cayenne, cumin, and salt in a small bowl.",
                "Trim excess fat from the chicken thighs. Rub the thighs all over with the spice mixture.",
                "Heat an ovenproof skillet over medium heat with enough olive oil to coat the bottom (about 2 tablespoons). Cook the thighs skin-side down, undisturbed, until the skin is deeply golden brown and crispy, about 10 minutes.",
                "Flip and cook 5 more minutes, then transfer the skillet to the oven. Bake 10 to 15 minutes more, until cooked through (internal temperature 165°F)."
              ]
            },
            {
              title: "Grilled Buffalo Wings",
              servings: "6 to 8   |   Total: 35 minutes",
              comments: ["Crowding the wings close together on the grill is intentional — it creates steam that helps render the fat and keep the meat moist before crisping."],
              source: "Food Network, by Katie Lee Biegel, from The Kitchen",
              ingredientGroups: [
                { label: "Dry rub", ingredients: ["1 tablespoon kosher salt", "1 teaspoon freshly ground black pepper", "1 teaspoon garlic powder"] },
                { label: "Wings", ingredients: ["3 pounds whole chicken wings"] },
                { label: "Buffalo sauce", ingredients: ["6 tablespoons unsalted butter", "1/3 cup hot sauce", "1 tablespoon apple cider vinegar", "1 tablespoon honey"] }
              ],
              steps: [
                "Dry rub: In a small bowl, combine the salt, pepper, and garlic powder. In a large bowl, toss the wings with the rub to coat evenly.",
                "Preheat a gas grill to medium heat (about 350°F).",
                "Place the wings on the grill, crowding them close together so they're all touching. Grill, covered, 20 minutes, turning every 5 minutes.",
                "Meanwhile, heat the butter, hot sauce, vinegar, and honey in a saucepan over low heat, whisking to combine.",
                "In a clean large bowl, toss the wings with the sauce. Turn the grill up to medium-high. Use tongs to return the wings to the grill and cook, uncovered, turning once, until charred in spots, about 5 minutes more."
              ]
            },
            {
              title: "Skillet Chicken and Zucchini With Charred Scallion Salsa",
              servings: "4   |   Total: 40 minutes",
              comments: [
                "Any seasonal, quick-roasting vegetable can stand in for the zucchini — cherry tomatoes or asparagus both work well.",
                "If cilantro isn't your thing, basil is a good substitute, or use a mix of the two."
              ],
              source: "NYT Cooking, by Colu Henry",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["4 medium bone-in, skin-on chicken breasts (about 3 to 3 1/2 pounds), at room temperature", "Kosher salt and black pepper", "2 tablespoons canola or grapeseed oil"] },
                { label: "Zucchini", ingredients: ["1 1/2 pounds zucchini (3 to 4 medium), quartered lengthwise, then halved crosswise"] },
                { label: "Salsa", ingredients: ["1/4 cup fresh lime juice (about 2 limes)", "1 medium jalapeño, thinly sliced, seeded if you prefer", "1 bunch scallions (about 7 or 8), trimmed and halved crosswise", "1 cup roughly chopped fresh cilantro", "1/4 cup olive oil", "1/2 teaspoon light brown sugar", "Flaky sea salt (optional)"] }
              ],
              steps: [
                "Heat the oven to 400°F. Pat the chicken very dry and season generously all over with salt and pepper.",
                "Heat the oil in a 12-inch cast-iron pan or other large, ovenproof skillet over medium-high heat. Once shimmering, add the chicken skin-side down and cook undisturbed until the skin is deeply golden, about 5 minutes. Transfer skin-side up to a plate.",
                "Remove the pan from the heat. Add the zucchini and toss to coat in the chicken fat; season with salt and pepper and arrange in an even layer. Nestle the chicken, skin-side up, on top of the zucchini. Roast until the chicken is cooked through, 20 to 25 minutes.",
                { lead: "Salsa:", bullets: [
                  "In a medium bowl, stir together the lime juice and jalapeño; set aside.",
                  "Heat a large skillet over medium heat. Add the scallions and cook, tossing frequently, until they begin to brown and char slightly, about 5 minutes.",
                  "Finely chop the scallions and toss with the lime mixture.",
                  "Stir in the cilantro, olive oil, and brown sugar until the sugar dissolves. Season to taste with salt."
                ]},
                "Remove the chicken from the oven and let rest on a plate or cutting board about 5 minutes (return the zucchini to the oven to keep warm). Spoon the salsa over the chicken and zucchini."
              ]
            },
            {
              title: "Spring Chicken Paillard",
              servings: "4   |   Total: 1 hour 25 minutes (includes marinating)",
              comments: ["Inspired by the chicken paillard at Pastis in New York City."],
              source: "Food Network, by Katie Lee Biegel",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["4 small/medium boneless, skinless chicken breasts"] },
                { label: "Marinade", ingredients: ["2 tablespoons extra-virgin olive oil", "2 tablespoons balsamic vinegar", "2 teaspoons chopped fresh rosemary", "1 teaspoon garlic powder", "1 teaspoon onion powder", "1 teaspoon kosher salt", "1 teaspoon fresh thyme leaves", "1/2 teaspoon dried oregano", "Freshly ground black pepper"] },
                { label: "Green olive tapenade", ingredients: ["1 cup fresh parsley leaves", "1/2 cup pitted Castelvetrano olives", "2 tablespoons thinly sliced fresh chives, plus more for garnish", "1 teaspoon capers, drained", "1/2 teaspoon honey", "2 anchovies", "1 small shallot, roughly chopped", "1/2 lemon, zested and juiced", "Kosher salt and freshly cracked black pepper"] },
                { label: "Sautéed greens", ingredients: ["2 tablespoons extra-virgin olive oil", "1 (8-ounce) bunch Swiss chard, stems trimmed, roughly chopped", "1 (8-ounce) bunch lacinato kale, stems removed, roughly chopped", "1/2 teaspoon kosher salt", "Freshly ground black pepper", "1 tablespoon red wine vinegar"] },
                { label: "To serve", ingredients: ["Lemon wedges"] }
              ],
              steps: [
                "Chicken: Place a chicken breast on a cutting board, cover with plastic wrap, and pound with a meat mallet or rolling pin to an even 1/4-inch thickness. Repeat with remaining breasts.",
                "Whisk together the olive oil, balsamic vinegar, rosemary, garlic powder, onion powder, salt, thyme, oregano, and pepper in a shallow dish. Add the chicken and turn to coat.",
                "Cover and marinate in the fridge at least 30 minutes, up to 3 hours.",
                "Green olive tapenade: Meanwhile, in a food processor, combine the parsley, olives, chives, capers, honey, anchovies, shallot, lemon zest, and lemon juice. Pulse until finely chopped but not pureed. Season with salt and pepper.",
                "Let the chicken sit at room temperature while you preheat a grill or grill pan to medium-high heat.",
                "Grill the chicken until charred and cooked through (165°F), 3 to 4 minutes per side.",
                "Remove to a platter and immediately spread the tapenade over the chicken so it soaks in the flavors.",
                "Sautéed greens: Heat the olive oil in a large sauté pan over medium heat until shimmering. Add the Swiss chard and kale and season with salt and pepper.",
                "Cook just until wilted (still some body), 3 to 4 minutes.",
                "Remove from the heat and drizzle with the red wine vinegar. Serve warm on top of the chicken. Garnish with more chives and lemon wedges."
              ]
            },
            {
              title: "Weeknight Fancy Chicken and Rice",
              servings: "4 to 6   |   Total: 50 minutes",
              comments: ["Garnish is flexible — dried cranberries, hazelnuts, or pine nuts can stand in for or join the apricots and almonds."],
              source: "NYT Cooking, from Asha Gomez and Martha Hall Foose, adapted by Sara Bonisteel",
              ingredientGroups: [
                { label: "Aromatics", ingredients: ["1/4 cup ghee (or unsalted butter)", "1 large yellow onion, halved and thinly sliced", "6 green cardamom pods, crushed", "3 whole star anise", "1/4 teaspoon kosher salt"] },
                { label: "Garlic and spice", ingredients: ["6 garlic cloves, finely chopped", "1 1/2 teaspoons turmeric powder"] },
                { label: "Chicken", ingredients: ["1 pound boneless, skinless chicken breasts, cut into 3/4-inch pieces"] },
                { label: "Rice", ingredients: ["2 1/4 cups low-sodium chicken stock", "1 teaspoon kosher salt (remaining from the 1 1/4 teaspoons above)", "1 1/2 cups Jasmine or Basmati rice"] },
                { label: "Garnish", ingredients: ["1/4 cup chopped dried apricots", "1/4 cup sliced raw almonds, toasted", "1/4 cup chopped cilantro leaves"] }
              ],
              steps: [
                { lead: "Aromatics and chicken:", bullets: [
                  "Melt the ghee in a medium saucepan with a lid over medium-high heat.",
                  "Add the onion, cardamom pods, star anise, and 1/4 teaspoon salt. Cook, stirring frequently, until the onion is soft and golden, about 8 minutes.",
                  "Add the garlic and turmeric; cook, stirring, 1-2 minutes, until very fragrant.",
                  "Add the chicken and cook 4 minutes, stirring to coat with the onion mixture."
                ]},
                { lead: "Rice:", bullets: [
                  "Add the stock and remaining 1 teaspoon salt; increase the heat and bring to a boil.",
                  "Stir in the rice, cover, and reduce the heat to low. Simmer until the rice has absorbed the liquid, about 12 minutes.",
                  "Remove from the heat and let stand, covered, 12 minutes.",
                  "Remove the lid and fluff the rice with a fork."
                ]},
                "Transfer the chicken and rice to a bowl, removing and discarding the cardamom pods and star anise. Garnish with the apricots, almonds, and cilantro."
              ]
            },
            {
              title: "Chicken Fajita Marinade",
              servings: "4   |   Prep: 10 minutes   |   Cook: 1 minute   |   Total: 41 minutes (includes 30 minutes marinating)",
              comments: [
                "This is a marinade rather than a full dish — cook the marinated chicken and vegetables however you like (grill, skillet, or oven).",
                "Also works with other proteins, like shrimp, flank steak, or pork tenderloin."
              ],
              source: "Dinner at the Zoo, by Sara Welch",
              ingredientGroups: [
                { label: "Marinade", ingredients: ["1/4 cup olive oil", "1/3 cup lime juice", "1/4 cup water", "1 teaspoon sugar", "1 1/4 teaspoons kosher salt", "1/4 teaspoon ground cumin", "2 cloves garlic, minced", "1 1/2 teaspoons smoked paprika", "1 teaspoon onion powder", "1 to 2 tablespoons chili powder, to taste (start with 1 tablespoon if your chili powder has real heat)", "1/4 teaspoon pepper"] },
                { label: "To marinate", ingredients: ["1 pound chicken, sliced", "1 1/2 cups sliced bell peppers", "1/2 cup sliced onion"] }
              ],
              steps: [
                "In a bowl, whisk together the olive oil, lime juice, water, sugar, salt, cumin, garlic, smoked paprika, onion powder, chili powder, and pepper.",
                "Add the sliced chicken, bell peppers, and onion to the bowl and toss to coat.",
                "Marinate at least 30 minutes and up to 8 hours, then cook as desired — grilled, pan-seared, or baked — for fajitas."
              ]
            },
            {
              title: "D.L. Jardine's Fajita Marinade",
              servings: "Serves 4",
              comments: ["Works for both chicken and beef; marinate all day or overnight for best results."],
              source: "https://www.food.com/recipe/d-l-jardines-fajita-marinade-336920",
              ingredientGroups: [
                { label: "Liquids", ingredients: ["3/4 cup Worcestershire sauce", "1/4 cup light soy sauce", "2 tablespoons water", "1 tablespoon white vinegar", "2 tablespoons lime juice"] },
                { label: "Spice blend", note: "combine in a small bowl", ingredients: ["1/2 teaspoon garlic powder", "1/2 teaspoon black pepper", "1/2 teaspoon cumin", "1/2 teaspoon oregano"] }
              ],
              steps: [
                "Whisk together the liquids and spice blend until fully combined. Use immediately as a marinade, or refrigerate until ready to use."
              ]
            },
            {
              title: "Peruvian Roasted Chicken With Spicy Cilantro Sauce",
              servings: "4   |   Total: 50 minutes, plus marinating",
              comments: ["If aji amarillo/aji panca pastes aren't available, substitute a red chile paste like sriracha or sambal for the aji amarillo, and pasilla chile powder for the aji panca."],
              source: "NYT Cooking, by Melissa Clark",
              ingredientGroups: [
                { label: "Marinade", ingredients: ["6 garlic cloves, finely grated or minced", "3 tablespoons soy sauce", "1 tablespoon aji amarillo paste (or sriracha or sambal)", "1 tablespoon lime juice", "1 teaspoon aji panca paste (or 1 teaspoon ground pasilla chile powder)", "1 teaspoon Dijon mustard", "1 teaspoon ground cumin", "1 teaspoon black pepper", "1/2 teaspoon fine sea salt"] },
                { label: "Chicken", ingredients: ["1 (3 1/2 to 4 1/2 pound) chicken, halved, or 4 pounds bone-in, skin-on chicken parts", "Extra-virgin olive oil, as needed"] },
                { label: "Spicy cilantro sauce", ingredients: ["1 cup cilantro leaves and tender stems", "3 to 4 jalapeños, seeded and diced", "1/4 cup (1 ounce) crumbled feta cheese", "1 garlic clove, chopped", "1 1/2 tablespoons lime juice, more to taste", "2 teaspoons chopped fresh oregano or basil", "3/4 teaspoon fine sea salt, more to taste", "1/2 teaspoon Dijon mustard", "1/2 tablespoon aji amarillo or other chile paste", "1/2 teaspoon honey", "1/2 teaspoon ground cumin", "1/2 cup extra-virgin olive oil"] },
                { label: "To serve", ingredients: ["Lime wedges"] }
              ],
              steps: [
                "Whisk together the garlic, soy sauce, aji amarillo paste, lime juice, aji panca paste, mustard, cumin, pepper, and salt to make the marinade.",
                "Add the chicken, turning to coat all over. Cover and refrigerate at least 2 hours, up to 12.",
                "Heat the oven to 450°F. Remove the chicken from the marinade and pat dry. Arrange skin-side up on a rimmed baking sheet; drizzle with olive oil.",
                "Roast until the skin is golden and the chicken is cooked through, 35 to 45 minutes (if using parts, remove the breasts earlier if they finish before the thighs).",
                "Meanwhile, make the sauce: blend the cilantro, jalapeños, feta, garlic, lime juice, oregano, salt, mustard, aji amarillo, honey, cumin, and olive oil until smooth. Taste and adjust.",
                "Carve the chicken; serve with the sauce and lime wedges."
              ]
            },
            {
              title: "Slow-Cooker Chicken Mole",
              servings: "6   |   Prep: 15 minutes   |   Cook: 4 hours   |   Total: 4 hours 15 minutes",
              comments: ["Makes extra sauce; keeps refrigerated up to 4 days or frozen up to 3 months. Good over rice, with pinto beans, or warm corn tortillas."],
              source: "Martha Stewart",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["4 pounds boneless, skinless chicken thighs (about 12)", "Coarse salt", "2 tablespoons oil, for browning"] },
                { label: "Mole sauce (blended)", ingredients: ["1 can (28 ounces) whole tomatoes", "1 medium yellow onion, roughly chopped", "2 dried ancho chiles, stemmed", "1 large chipotle chile in adobo sauce", "1/2 cup sliced almonds, toasted", "1/4 cup raisins", "3 ounces bittersweet chocolate, finely chopped (1/2 cup)", "3 garlic cloves, smashed and peeled", "3 tablespoons extra-virgin olive oil", "3/4 teaspoon ground cumin", "1/2 teaspoon ground cinnamon"] },
                { label: "To finish", ingredients: ["Fresh cilantro leaves"] }
              ],
              steps: [
                "Season the chicken thighs with salt.",
                "Heat the oil in a large skillet over medium-high heat. Brown the chicken in batches, about 2 to 3 minutes per side, then transfer to the slow cooker.",
                "In a blender, puree the tomatoes, onion, ancho and chipotle chiles, almonds, raisins, chocolate, garlic, oil, cumin, and cinnamon until smooth.",
                "Add the tomato mixture to the slow cooker, cover, and cook until the chicken is tender: 4 hours on high (or 8 hours on low).",
                "Serve the chicken and sauce topped with cilantro."
              ]
            },
            {
              title: "Chicken Cacciatore",
              servings: "4 to 5   |   Total: 1 hour 45 minutes",
              source: "NYT Cooking, by Martha Rose Shulman",
              ingredientGroups: [
                { label: "Dried mushrooms", ingredients: ["1/2 ounce dried mushrooms, like porcini (about 1/2 cup)"] },
                { label: "Chicken", ingredients: ["2 tablespoons olive oil, divided", "Salt and freshly ground pepper", "6 to 8 skinless chicken legs and/or thighs (thighs can be boneless)"] },
                { label: "Aromatics", ingredients: ["1 small onion, minced", "1 small carrot, minced", "3 ribs celery, minced", "2 large garlic cloves, minced", "2 tablespoons fresh minced Italian parsley", "1 heaped teaspoon minced fresh rosemary, or 1/2 teaspoon crumbled dried rosemary", "1/4 teaspoon Aleppo pepper or red pepper flakes"] },
                { label: "Mushrooms and wine", ingredients: ["1/2 pound mushrooms, trimmed and sliced", "1/2 cup red wine"] },
                { label: "Tomatoes", ingredients: ["1 28-ounce can chopped tomatoes, pulsed in a food processor"] }
              ],
              steps: [
                { lead: "Soak the dried mushrooms:", bullets: [
                  "Place in a bowl or heat-proof measuring cup and pour on 2 cups boiling water. Let sit 15 to 30 minutes, until softened.",
                  "Drain through a strainer lined with cheesecloth or a paper towel, set over a bowl, reserving the liquid.",
                  "Rinse the mushrooms in several changes of water, squeeze out excess water, and chop coarsely.",
                  "Measure out 1 cup of the reserved soaking liquid; set aside."
                ]},
                "Heat 1 tablespoon of the olive oil over medium-high heat in a large, heavy nonstick skillet or Dutch oven. Season the chicken and brown on both sides; remove to a platter.",
                { lead: "Aromatics:", bullets: [
                  "Turn the heat to medium. Add the remaining oil, the onion, carrot, and celery, plus a pinch of salt. Cook, stirring, until softened, about 5 minutes.",
                  "Add the garlic, parsley, rosemary, Aleppo pepper or red pepper flakes, and salt to taste. Cover, reduce the heat to low, and cook 5 minutes."
                ]},
                "Stir in the fresh and dried mushrooms; increase the heat to medium and cook, stirring, until just tender, about 5 minutes.",
                "Stir in the wine and bring to a boil; cook, stirring, a few minutes until reduced by about half.",
                "Add the tomatoes and salt and pepper to taste. Cook over medium heat 5 to 10 minutes, stirring often, until the tomatoes have cooked down somewhat.",
                "Stir in the reserved mushroom soaking liquid.",
                "Return the chicken to the pan, submerging it in the tomato mixture. Cover and simmer over medium heat 30 minutes, until cooked through."
              ]
            },
            {
              title: "Chicken Piccata",
              servings: "4   |   Prep: 15 minutes   |   Cook: 25 minutes   |   Total: 40 minutes",
              source: "Food Network, by Giada De Laurentiis",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["2 skinless, boneless chicken breasts, butterflied and cut in half", "Sea salt and freshly ground black pepper", "All-purpose flour, for dredging"] },
                { label: "For browning", ingredients: ["6 tablespoons unsalted butter, divided", "5 tablespoons extra-virgin olive oil, divided"] },
                { label: "Sauce", ingredients: ["1/3 cup fresh lemon juice", "1/2 cup chicken stock", "1/4 cup brined capers, rinsed"] },
                { label: "To finish", ingredients: ["1/3 cup fresh parsley, chopped"] }
              ],
              steps: [
                "Season the chicken with salt and pepper. Dredge in flour and shake off the excess.",
                { lead: "Brown the chicken:", bullets: [
                  "In a large skillet over medium-high heat, melt 2 tablespoons butter with 3 tablespoons olive oil. When sizzling, add 2 pieces of chicken and cook until browned, about 3 minutes per side. Remove to a plate.",
                  "Melt 2 more tablespoons butter with 2 more tablespoons olive oil; brown the remaining 2 pieces of chicken the same way. Remove to the plate."
                ]},
                "Add the lemon juice, stock, and capers to the pan. Return to the stove and bring to a boil, scraping up the browned bits from the bottom.",
                "Remove the chicken to a platter. Add the remaining 2 tablespoons butter to the sauce and whisk vigorously. Pour the sauce over the chicken and garnish with parsley."
              ]
            },
            {
              title: "Marry Me Chicken",
              servings: "4   |   Prep: 10 minutes   |   Cook: 50 minutes   |   Total: 1 hour",
              comments: [
                "To make slicing into cutlets easier, freeze the chicken breasts for 20 minutes first.",
                "Great served over pasta, rice, or polenta, or with crusty bread and a green salad."
              ],
              source: "NYT Cooking, by Naz Deravian",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["3 large boneless, skinless chicken breasts, or 6 chicken cutlets (about 2 1/4 pounds total), patted dry", "Kosher salt and black pepper", "1/4 cup all-purpose flour"] },
                { label: "Sear", ingredients: ["3 tablespoons extra-virgin olive oil, plus more as needed", "3 tablespoons unsalted butter"] },
                { label: "Sauce", ingredients: ["3 garlic cloves, chopped", "1 tablespoon tomato paste", "1/2 teaspoon dried oregano", "Aleppo pepper or red pepper flakes, to taste", "1 cup low-sodium chicken stock", "1/2 to 3/4 cup heavy cream", "1/2 cup (1 1/2 ounces) grated Parmesan", "1/3 cup sliced sun-dried tomatoes, packed in oil"] },
                { label: "To finish", ingredients: ["Fresh basil"] }
              ],
              steps: [
                "If using chicken breasts, slice each in half horizontally starting from the thickest end, to make 6 cutlets total. Season generously with salt and pepper.",
                "Scatter the flour on a large plate and coat the cutlets, shaking off the excess. Transfer to a sheet pan or large plate and let rest 10 minutes.",
                "Heat the oil in a large pan over medium-high heat. Once hot, reduce the heat to medium and add the butter. As soon as it melts, add the cutlets and sear until golden, 3 to 4 minutes per side. Transfer to a plate.",
                "Reduce the heat to low, add the garlic, and cook, stirring often, until fragrant, 1 to 2 minutes. Add the tomato paste, oregano, and Aleppo pepper; stir to combine.",
                "Increase the heat to medium, add the stock, and bring to a simmer, scraping up any browned bits, until the liquid is reduced by half, about 3 minutes.",
                "Add 1/2 cup of the cream and warm through, stirring, until slightly thickened, about 3 minutes. Stir in the Parmesan and sun-dried tomatoes. Taste; add more cream if desired.",
                "Place the chicken back in the pan to warm through, about 4 minutes. Remove from heat and scatter basil on top."
              ]
            },
            {
              title: "Chicken Kiev",
              servings: "2   |   Prep: 30 minutes   |   Cook: 30 minutes   |   Total: 1 hour, plus 1 hour freezing",
              source: "RecipeTin Eats, by Nagi Maehashi",
              ingredientGroups: [
                { label: "Garlic butter", ingredients: ["6 tablespoons (90g) unsalted butter, softened", "2 teaspoons parsley, finely chopped", "2 garlic cloves, very finely minced", "1/4 teaspoon salt (skip if using salted butter)"] },
                { label: "Chicken", ingredients: ["2 (7 to 8 ounce) chicken breasts, skinless and boneless", "1/2 teaspoon salt", "1/4 teaspoon pepper"] },
                { label: "Crumbing", ingredients: ["1 egg, lightly whisked", "1/4 cup flour", "1 cup panko breadcrumbs"] },
                { label: "Frying", ingredients: ["Oil for frying (canola or vegetable, about 4 cups)"] },
                { label: "To finish", ingredients: ["Parsley, finely chopped"] }
              ],
              steps: [
                "Make the garlic butter: mix the butter, parsley, garlic, and salt until combined.",
                "Shape and chill: scrape the butter onto parchment paper and shape into a 4x2.4-inch rectangle. Refrigerate until firm, then cut in half lengthwise to make 2 batons.",
                "Pound the chicken: place each breast smooth-side down between two sheets of plastic. Pound to an even 1/2-inch thickness.",
                "Season the chicken with salt and pepper.",
                "Stuff and roll: place a butter baton in the center of each breast. Fold the sides in, then roll up from the bottom, finishing seam-side down. Press firmly to seal.",
                "Wrap and partially freeze: wrap tightly in cling wrap, twisting the ends. Freeze 30 minutes, until fairly firm but not solid.",
                "Crumb: set up the egg, flour, and breadcrumbs in separate bowls. Coat the chicken in flour, then egg, then breadcrumbs, pressing to adhere.",
                "Freeze again 30 minutes, until firm to handle.",
                "Preheat the oven to 350°F. Set a rack on a baking tray.",
                "Fry the chicken in oil heated to 375°F, turning once or twice, until golden, 2 to 3 minutes (it will still be raw inside).",
                "Bake on the rack 15 minutes, or until the internal temperature reaches 149°F — pierce carefully so you don't release the butter.",
                "Rest 2 minutes, sprinkle with parsley, and serve."
              ]
            },
            {
              title: "Chicken Paprikash",
              servings: "4 to 6   |   Cook: 1 hour   |   Total: 1 hour",
              comments: ["Use fresh Hungarian paprika if you can find it — it loses flavor quickly (within a few months) and turns dull and bitter with age."],
              source: "NYT Cooking, by Sam Sifton",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["3 to 4 pounds chicken thighs and drumsticks, or whole chicken legs", "Kosher salt and black pepper, to taste", "1 tablespoon neutral oil, like canola", "3 tablespoons unsalted butter, divided"] },
                { label: "Roux", ingredients: ["1 large yellow or Spanish onion, diced", "3 cloves garlic, minced", "3 tablespoons Hungarian paprika, sweet or hot", "3 tablespoons all-purpose flour"] },
                { label: "Braise", ingredients: ["1 cup canned crushed tomatoes or 1 large ripe tomato, chopped", "1 cup chicken broth"] },
                { label: "Noodles", ingredients: ["1 pound egg noodles"] },
                { label: "To finish", ingredients: ["3/4 cup sour cream"] }
              ],
              steps: [
                "Heat the oven to 400°F. Season the chicken aggressively with salt and pepper. Heat the oil and 1 tablespoon of the butter in a large Dutch oven over high heat until the butter is melted and foamy. Sear the chicken until golden brown on both sides; remove to a plate.",
                "Pour off all but 3 tablespoons of the accumulated fat in the pot. Return to medium heat and add the onion. Cook, stirring often, until soft and beginning to brown, about 8 minutes. Add the garlic, paprika, and remaining 2 tablespoons butter; cook, stirring, 1 minute. Add the flour and stir to combine.",
                "Add the tomatoes and broth, whisking until smooth. Nestle the chicken back into the pan, skin-side up. Slide into the oven and bake, uncovered, 30 minutes.",
                "Meanwhile, bring a large pot of heavily salted water to a boil. Cook the noodles until almost completely tender, 7 to 8 minutes. Drain.",
                "Place the chicken on top of the noodles. Stir the sour cream into the sauce and ladle it over everything."
              ]
            },
            {
              title: "Chicken-Zucchini Meatballs With Feta",
              servings: "4   |   Total: 45 minutes",
              comments: [
                "Made here with ground chicken; ground turkey can be substituted.",
                "Sauce is Panning the Globe's lemony yogurt-sumac sauce, with the NYT recipe's quick-pickled shallot, feta, and remaining garnishes."
              ],
              source: "Meatballs from NYT Cooking (Ali Slagle); sauce adapted from Ottolenghi's Turkey Zucchini Meatballs with Lemony Yogurt",
              ingredientGroups: [
                { label: "Yogurt-Feta Sauce", ingredients: ["1/2 cup sour cream", "2/3 cup plain Greek yogurt", "1 tablespoon lemon juice", "1 small garlic clove, pressed or finely minced", "1 1/2 tablespoons olive oil", "1 tablespoon sumac", "1/2 teaspoon salt", "1/4 teaspoon black pepper", "4 ounces feta, crumbled", "1/4 cup extra-virgin olive oil", "1/2 teaspoon Aleppo pepper or red pepper flakes"] },
                { label: "Quick-Pickled Shallot", ingredients: ["Remaining shallot half (see Meatballs), coarsely chopped", "3 tablespoons lemon juice (from 1 large lemon)", "Pinch of kosher salt"] },
                { label: "Zucchini", ingredients: ["2 of 3 large zucchini (about 1 pound total), cut into 1/2-inch-thick slices", "Kosher salt and black pepper", "About 1 tablespoon olive oil"] },
                { label: "Meatballs", ingredients: ["1 large shallot, halved (grate one half here; quick-pickle the other half for the sauce)", "1 remaining large zucchini, grated", "1/2 cup panko", "1 1/2 teaspoons ground cumin", "1/2 teaspoon Aleppo pepper or red pepper flakes", "1/2 teaspoon kosher salt", "1 pound ground chicken (turkey can be substituted)", "2 tablespoons chopped fresh mint, basil, parsley, or dill, plus more for serving", "Extra-virgin olive oil, for greasing the pan and drizzling"] }
              ],
              steps: [
                "Quick-pickled shallot: Coarsely chop half the shallot (reserve the other half for the meatballs) and combine with the 3 tablespoons lemon juice and a pinch of salt. Let sit while you make the rest.",
                "Yogurt-feta sauce: Combine the sour cream, yogurt, 1 tablespoon lemon juice, garlic, 1 1/2 tablespoons olive oil, sumac, salt, and pepper in a bowl. Fold in half the feta. Spread on a platter. Top with the remaining feta, 1/4 cup olive oil, and the Aleppo pepper.",
                "Heat the oven to 425°F. Cut 2 of the zucchini into 1/2-inch-thick slices; transfer to a plate, season with salt, and set aside.",
                "Meatballs: Working over a large bowl, grate the remaining zucchini on the large holes of a box grater. Grate the remaining shallot half; add to the bowl. Add the panko, cumin, Aleppo pepper, and salt; mix. Add the ground chicken and herbs; mix until just combined.",
                "Lightly grease a baking sheet. With wet hands, form the mixture into 16 meatballs (about 2 to 3 tablespoons each) and arrange on one half of the sheet. Drizzle with olive oil. Bake 10 minutes.",
                "Meanwhile, pat the sliced zucchini dry and lightly coat with about 1 tablespoon olive oil; season with pepper.",
                "Add the sliced zucchini to the other half of the baking sheet, moving the meatballs over if needed. Bake until the meatballs are cooked through and the zucchini is golden, about 10 minutes more.",
                "Serve the meatballs and zucchini with a drizzle of the yogurt-feta sauce and more fresh herbs."
              ]
            },
            {
              title: "Greek Chicken and Orzo Pasta Salad",
              servings: "8   |   Prep: 30 minutes   |   Total: 1 hour 15 minutes (includes marinating and cooling)",
              source: "Food Network, by Katie Lee Biegel, from The Kitchen",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["3 tablespoons olive oil", "1 teaspoon kosher salt", "1/2 teaspoon dried oregano", "1/2 teaspoon garlic powder", "1/4 teaspoon freshly ground black pepper", "Juice of 1 lemon", "1 pound boneless, skinless chicken tenderloins"] },
                { label: "Breadcrumbs", ingredients: ["2 tablespoons unsalted butter", "1 tablespoon extra-virgin olive oil", "1 clove garlic, minced", "1/2 cup panko breadcrumbs", "Pinch of kosher salt"] },
                { label: "Dressing", ingredients: ["1/2 cup extra-virgin olive oil", "1/4 cup red wine vinegar", "1 teaspoon kosher salt", "1/2 teaspoon dried oregano", "1/2 teaspoon freshly ground black pepper", "1 clove garlic, grated", "Juice of 1/2 lemon"] },
                { label: "Salad", ingredients: ["Kosher salt, for the pasta water", "1 pound orzo", "10 ounces grape tomatoes, halved", "1 English cucumber, diced", "1/4 cup minced fresh flat-leaf parsley", "1 1/2 cups crumbled feta cheese (from a block, not packaged crumbled cheese)"] }
              ],
              steps: [
                "Chicken marinade: In a medium bowl, whisk together the olive oil, salt, oregano, garlic powder, pepper, and lemon juice. Add the chicken tenderloins and toss to coat. Marinate at room temperature 30 minutes.",
                "Preheat a grill or grill pan to medium-high.",
                "Remove the chicken from the marinade and grill until cooked through, about 5 minutes per side. Slice into 1-inch-wide pieces.",
                { lead: "Breadcrumbs:", bullets: [
                  "Preheat the oven to 400°F.",
                  "In a medium ovenproof skillet, heat the butter, olive oil, and garlic over low heat until the garlic begins to sizzle. Add the panko and salt; stir to coat.",
                  "Transfer to the oven and toast until golden brown, 3 to 4 minutes."
                ]},
                "Dressing: Whisk together the olive oil, vinegar, salt, oregano, pepper, garlic, and lemon juice in a small bowl until combined.",
                "Cook the orzo: Bring a large pot of salted water to a boil. Add the orzo and cook until al dente, 7 to 8 minutes. Drain and transfer to a large bowl; toss immediately with the dressing. Let cool.",
                "When cool, stir in the tomatoes, cucumber, and parsley. Top with the feta, sliced chicken, and breadcrumbs."
              ]
            },
            {
              title: "Mediterranean Grilled Chicken Thighs with Dill Yogurt Sauce",
              servings: "8   |   Prep: 10 minutes   |   Cook: 12 minutes   |   Total: 22 minutes, plus marinating",
              source: "The Mediterranean Dish, by Suzy Karadsheh",
              ingredientGroups: [
                { label: "Dill yogurt sauce", ingredients: ["1 garlic clove, minced", "1 cup fresh dill, stems removed, chopped", "1 1/4 cups Greek yogurt", "1 tablespoon olive oil", "1/2 lemon or lime, juiced", "Pinch cayenne pepper, optional", "Kosher salt, if needed"] },
                { label: "Seasoning", ingredients: ["10 garlic cloves, minced", "1/2 teaspoon paprika", "1/2 teaspoon allspice", "1/2 teaspoon ground nutmeg", "1/4 teaspoon ground green cardamom", "Salt and pepper", "3 tablespoons olive oil"] },
                { label: "Chicken and marinade", ingredients: ["8 boneless, skinless chicken thighs", "1 red onion, halved and thinly sliced", "2 lemons, juiced", "2 tablespoons olive oil"] }
              ],
              steps: [
                "Make the dill yogurt sauce: combine the garlic, dill, yogurt, olive oil, lemon juice, and cayenne in a food processor; blend until smooth. Season with salt if needed. Refrigerate until ready to serve.",
                "Make the seasoning: mix the garlic, paprika, allspice, nutmeg, cardamom, and 3 tablespoons olive oil. Pat the chicken dry and rub with the seasoning on all sides.",
                "Make the marinade: in a large dish, add the onion, lemon juice, and remaining 2 tablespoons olive oil. Place the chicken in the marinade and turn to coat.",
                "If time allows, cover and refrigerate 2 to 4 hours (or overnight, adding the lemon juice only in the final 1 to 2 hours). Otherwise, proceed.",
                "Heat a gas grill to medium-high. Grill the chicken, covered, 5 minutes, then turn and grill covered another 3 to 5 minutes, until cooked through.",
                "Rest the chicken about 5 minutes before serving; internal temperature should reach 165°F.",
                "Serve with the dill yogurt sauce."
              ]
            },
            {
              title: "One-Pot Chicken and Rice With Caramelized Lemon",
              servings: "4   |   Prep: 10 minutes   |   Cook: 45 minutes   |   Total: 55 minutes",
              source: "NYT Cooking, by Dan Pelosi",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["4 bone-in, skin-on chicken thighs (about 1 1/2 pounds)", "Salt and black pepper", "2 teaspoons dried oregano, divided", "Aleppo pepper or red pepper flakes, to taste"] },
                { label: "For browning", ingredients: ["2 tablespoons extra-virgin olive oil"] },
                { label: "Lemon", ingredients: ["2 lemons"] },
                { label: "Rice", ingredients: ["1 cup pitted Castelvetrano or kalamata olives, smashed and roughly chopped", "6 garlic cloves, minced", "1 medium shallot or 1/2 medium onion, minced", "2 cups Jasmine or Basmati rice, rinsed", "4 cups (32 ounces) chicken broth"] },
                { label: "To serve", ingredients: ["1/4 cup roughly chopped fresh parsley"] }
              ],
              steps: [
                "Heat the oven to 400°F. Pat the chicken thighs dry. Season with 1 teaspoon each salt, pepper, and dried oregano, plus a pinch of Aleppo pepper.",
                "Heat the oil in a large Dutch oven or other heavy-bottomed pot over medium-high heat. Add the chicken skin side down and cook until deeply golden, about 5 minutes. Flip and cook 2 minutes more. Transfer to a plate.",
                "Cut 1 lemon into 1/4-inch-thick slices. Add to the pot and cook until caramelized and softened, about 2 minutes. Remove and set aside.",
                "Add the olives, garlic, shallot, and the remaining 1 teaspoon each salt, pepper, and oregano to the pot. Cook over medium heat, stirring, until fragrant, about 2 minutes. Add the rice and stir to coat. Add the broth and bring to a simmer.",
                "Remove the pot from the heat. Place the browned chicken thighs on top of the rice, skin side up, then cover with the caramelized lemon slices. Cover tightly with a lid or foil and bake until the rice is cooked and the chicken is cooked through, about 30 minutes.",
                "Serve topped with the parsley and a squeeze of juice from the remaining lemon."
              ]
            },
            {
              title: "Chicken Tagine With Olives and Preserved Lemons",
              servings: "4   |   Total: 1 hour, plus marinating",
              source: "NYT Cooking, from Shallots New York, adapted by Florence Fabricant",
              ingredientGroups: [
                { label: "Spice rub", ingredients: ["5 cloves garlic, finely chopped", "1/4 teaspoon saffron threads, pulverized", "1/2 teaspoon ground ginger", "1 teaspoon sweet paprika", "1/2 teaspoon ground cumin", "1/2 teaspoon turmeric", "Salt and freshly ground black pepper"] },
                { label: "Chicken", ingredients: ["1 chicken, cut in 8 to 10 pieces"] },
                { label: "Braise", ingredients: ["2 tablespoons extra virgin olive oil", "3 medium onions, sliced thin", "1 cinnamon stick"] },
                { label: "To finish", ingredients: ["8 kalamata olives, pitted and halved", "8 cracked green olives, pitted and halved", "1 large or 3 small preserved lemons", "1 cup chicken stock", "Juice of 1/2 lemon", "1 tablespoon chopped flat-leaf parsley"] }
              ],
              steps: [
                { lead: "Spice rub:", bullets: [
                  "Mix the garlic, saffron, ginger, paprika, cumin, and turmeric together.",
                  "If not using kosher chicken, add 1/2 teaspoon salt; add pepper to taste.",
                  "Rub the chicken with the mixture, cover, refrigerate, and marinate 3 to 4 hours."
                ]},
                "Heat the oil in a heavy skillet. Add the chicken and brown on all sides; remove to a platter. Add the onions to the skillet and cook until soft. Add the cinnamon stick.",
                { lead: "To finish:", bullets: [
                  "Put the chicken on top of the onions and scatter with the olives.",
                  "Quarter the preserved lemons, remove the pulp, and cut the skin into strips; scatter over the chicken.",
                  "Mix the stock and lemon juice and pour over the chicken.",
                  "Cover the tagine or skillet, place over low heat, and cook about 30 minutes, until the chicken is done. Scatter the parsley on top and serve."
                ]}
              ]
            },
            {
              title: "Sheet-Pan Chicken With Chickpeas, Cumin and Turmeric",
              servings: "4   |   Total: 1 hour, plus marinating",
              source: "NYT Cooking, by Alison Roman",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["1 (3 1/2 to 4 pound) chicken, cut into parts (or 3 to 3 1/2 pounds bone-in, skin-on chicken parts)", "Kosher salt and freshly ground pepper"] },
                { label: "Yogurt marinade", ingredients: ["3/4 cup full-fat Greek yogurt", "2 tablespoons fresh lemon juice", "1 teaspoon ground turmeric", "2 tablespoons water"] },
                { label: "Chickpeas", ingredients: ["2 (15-ounce) cans chickpeas, drained and rinsed", "1 tablespoon fennel seed", "1 teaspoon ground cumin", "1 teaspoon ground turmeric", "1 large red onion, thinly sliced, divided", "2 tablespoons olive oil"] },
                { label: "Lemony onions", ingredients: ["2 tablespoons fresh lemon juice"] },
                { label: "Yogurt sauce", ingredients: ["3/4 cup full-fat Greek yogurt", "1 tablespoon fresh lemon juice"] },
                { label: "To finish", ingredients: ["1/2 cup mint or cilantro leaves, torn"] }
              ],
              steps: [
                "Season the chicken with salt and pepper.",
                "Make the marinade: combine the yogurt, lemon juice, turmeric, and water in a bowl; season well with salt and pepper. Add the chicken, turning to coat. Marinate at least 1 hour (up to overnight) in the fridge.",
                "Heat the oven to 425°F, rack in the top third.",
                "Combine the chickpeas, fennel seed, cumin, turmeric, and half the onion on a rimmed baking sheet. Drizzle with olive oil and season with salt and pepper; toss to coat.",
                "Move the chickpeas to the edges of the sheet; scrape excess marinade off the chicken and place it in the center. Bake, tossing the chickpeas once, until the chicken is golden and cooked through and the chickpeas are crispy, 40 to 45 minutes.",
                "Meanwhile, toss the remaining onion with the lemon juice, salt, and pepper; set aside.",
                "Combine the remaining yogurt with the remaining lemon juice, salt, and pepper; set aside as the sauce.",
                "Scatter the chicken with the lemony onions and mint or cilantro. Serve with the yogurt sauce alongside."
              ]
            },
            {
              title: "Chicken Yassa",
              servings: "4   |   Total: 1 hour, plus marinating",
              source: "NYT Cooking, recipe from Pierre Thiam, adapted by Alexa Weibel",
              ingredientGroups: [
                { label: "Marinade", ingredients: ["4 bone-in, skin-on chicken legs (2 1/2 to 3 pounds)", "4 scallions, trimmed, whites and greens finely chopped", "2 tablespoons fresh thyme, finely chopped (or 2 teaspoons dried)", "1 tablespoon white vinegar or apple cider vinegar", "1/4 cup lime juice", "1 tablespoon peanut, vegetable, or canola oil"] },
                { label: "Searing the chicken", ingredients: ["Kosher salt and black pepper", "1 tablespoon oil"] },
                { label: "Onions", ingredients: ["3 tablespoons oil", "2 pounds yellow onions, halved and sliced 1/2-inch thick", "Kosher salt and black pepper"] },
                { label: "Aromatics", ingredients: ["1 green bell pepper, halved, seeded, and cut into thin matchsticks", "1 whole Scotch bonnet chile, poked with a fork (or 1 whole habanero, 1 to 2 minced jalapeños, or 1/2 to 1 teaspoon red pepper flakes)", "4 garlic cloves, finely chopped", "4 teaspoons finely chopped fresh ginger", "3 fresh or dried bay leaves", "2 teaspoons Dijon mustard, optional", "1/4 cup lime juice", "Kosher salt and black pepper"] },
                { label: "To finish", ingredients: ["1 cup water", "Cooked rice or fonio, for serving"] }
              ],
              steps: [
                "Combine the chicken legs with the scallions, thyme, vinegar, 1/4 cup lime juice, and 1 tablespoon oil in a large bowl. Marinate at least 1 hour (up to overnight) in the fridge. Remove the chicken; reserve the marinade.",
                "Heat a grill, grill pan, or cast-iron skillet with 1 tablespoon oil over medium-high (if cooking indoors, pat the chicken dry first). Season with salt and pepper and grill until charred, 3 to 5 minutes per side. Transfer to a plate.",
                "Meanwhile, heat the remaining 3 tablespoons oil in a large pot over medium-high. Add the onions in an even layer, season with salt and pepper, and cook, stirring occasionally, until softened and starting to brown, 15 to 20 minutes.",
                "Add the bell pepper, chile, garlic, ginger, bay leaves, and mustard (if using). Continue stirring, adding 1 to 2 tablespoons of water if needed to prevent sticking. Add the 1/4 cup lime juice and the reserved marinade; cook 2 minutes.",
                "Add the grilled chicken to the pot, tucking it under the onions, then top with 1 cup water. Stir well, smooth into an even layer, and bring to a simmer. Cover and cook over medium-low heat until the chicken is very tender, about 20 minutes.",
                "Season to taste, adding more lime juice if desired. Serve over rice or fonio, with the onion mixture and sauce drizzled over."
              ]
            },
            {
              title: "Grilled Chicken Skewers with Toum (Shish Taouk)",
              servings: "4",
              comments: ["Toum uses raw egg white in an emulsified sauce, as in the original recipe."],
              source: "Bon Appétit, by Kamal Mouzawak",
              ingredientGroups: [
                { label: "Toum", ingredients: ["6 garlic cloves", "2 large egg whites", "2 tablespoons fresh lemon juice", "1 1/2 cups vegetable oil", "Salt"] },
                { label: "Marinade", ingredients: ["3 tablespoons fresh lemon juice", "2 tablespoons tomato paste", "1 tablespoon ground coriander", "1/4 cup toum (reserved from above)", "3 tablespoons vegetable oil, plus more for the grill"] },
                { label: "Chicken", ingredients: ["1 1/4 pounds skinless, boneless chicken thighs", "Salt"] },
                { label: "To serve", ingredients: ["4 pitas, warmed", "Pickles"] }
              ],
              steps: [
                "Make the toum: pulse the garlic, egg whites, and lemon juice in a food processor until smooth. With the motor running, very slowly drizzle in the oil until fully emulsified. Season with salt. Reserve 1/4 cup for the marinade; refrigerate the rest.",
                "Make the marinade: mix the lemon juice, tomato paste, coriander, 1/4 cup of the toum, and the oil in a large bowl. Transfer to a zip-lock bag.",
                "Slice the chicken thighs in half lengthwise and season generously with salt. Add to the bag with the marinade, seal, and massage to coat. Marinate overnight in the fridge.",
                "Let the chicken sit at room temperature 1 hour before grilling.",
                "Prepare a grill for medium heat; oil the grate. Thread the chicken onto skewers, folding pieces accordion-style so they stay flat. Grill, turning occasionally, until cooked through, 12 to 15 minutes.",
                "Serve the chicken on warmed pitas, with pickles and the reserved toum alongside."
              ]
            },
            {
              title: "Spiced Green Meatballs with Pickle Rice and Salty Yogurt",
              servings: "4   |   Prep: 55 minutes   |   Total: 1 hour 15 minutes",
              comments: ["Made here with ground chicken; ground turkey, pork, lamb, or beef can be substituted."],
              source: "The Club, by Molly Baz",
              ingredientGroups: [
                { label: "Cucumber Pickle Salsa", ingredients: ["1/2 cup finely chopped mixed tender herbs (cilantro, dill, parsley, and/or mint) — from 1 1/2 cups total chopped; reserve the other 1 cup for the meatballs", "1 English cucumber, diced into 1/2-inch cubes", "8 baby dill pickles, diced into 1/2-inch cubes", "2 scallions, thinly sliced (from 4 total; reserve the other 2 for the meatballs)", "1 garlic clove, grated", "1/2 cup olive oil", "3 tablespoons pickle brine", "3/4 teaspoon Aleppo pepper or red pepper flakes", "1/2 teaspoon kosher salt, plus more to taste"] },
                { label: "Rice", ingredients: ["2 cups Jasmine or Basmati rice", "2 1/2 cups cold water", "2 teaspoons kosher salt"] },
                { label: "Meatballs", ingredients: ["1 tablespoon coriander seeds (or 2 teaspoons ground coriander), coarsely chopped", "1 tablespoon fennel seeds, coarsely chopped", "2 large eggs", "1 tablespoon olive oil", "1 cup panko", "3/4 teaspoon ground cinnamon", "2 1/4 teaspoons kosher salt", "3/4 teaspoon freshly ground black pepper", "1 1/2 pounds ground chicken", "1 cup reserved chopped herbs (from the salsa prep above)", "2 reserved chopped scallions (from the salsa prep above)", "Oil, for greasing the baking sheet"] },
                { label: "To serve", ingredients: ["1 cup whole milk yogurt", "Kosher salt, to season the yogurt", "Olive oil, for drizzling"] }
              ],
              steps: [
                "Preheat the oven to 450°F.",
                { lead: "Cucumber Pickle Salsa:", bullets: [
                  "Finely chop enough herbs to yield about 1 1/2 cups chopped (lightly packed); measure out 1/2 cup for the salsa and set the other 1 cup aside for the meatballs.",
                  "Dice the cucumber and pickles into 1/2-inch cubes.",
                  "Thinly slice the scallions, setting aside 2 for the meatballs.",
                  "In a medium bowl, combine the 1/2 cup chopped herbs, diced cucumber and pickles, 2 sliced scallions, grated garlic, olive oil, pickle brine, Aleppo pepper, and salt.",
                  "Stir, taste, and adjust with more salt or pickle brine as needed.",
                  "Refrigerate until ready to serve."
                ]},
                { lead: "Rice:", bullets: [
                  "Rinse the rice in a fine-mesh strainer under cold running water until the water runs clear; drain well.",
                  "Combine the rice, cold water, and salt in a medium saucepan with a tight-fitting lid.",
                  "Bring to a boil over medium-high heat, then cover, reduce the heat to very low, and cook 16 minutes.",
                  "Turn off the heat and let steam, covered, at least 10 minutes.",
                  "Fluff with a fork and keep covered until ready to serve."
                ]},
                { lead: "Meatballs:", bullets: [
                  "Coarsely chop the coriander and fennel seeds (or use a mortar and pestle).",
                  "In a large bowl, lightly beat the eggs with the olive oil.",
                  "Add the panko, chopped coriander and fennel, cinnamon, salt, and pepper; mix.",
                  "Add about one-third of the ground chicken along with the reserved 1 cup chopped herbs and 2 reserved scallions; mix gently.",
                  "Mix in the remaining two-thirds of the meat until just combined.",
                  "Roll the mixture into 8 equal balls (about a heaping 1/3 cup each) and arrange, evenly spaced, on a lightly greased baking sheet.",
                  "Transfer the sheet directly to the oven floor and roast, turning once halfway through, until deeply golden on the sides and cooked through, about 20 minutes."
                ]},
                "Season the yogurt with salt.",
                { lead: "Assemble:", bullets: [
                  "Stir about 2 cups of the salsa into the fluffed rice; season to taste with salt.",
                  "Divide the rice among bowls.",
                  "Top with the meatballs, a drizzle of the salty yogurt, and more salsa.",
                  "Finish with a drizzle of olive oil, if desired."
                ]}
              ]
            },
            {
              title: "Amu's Chicken Korma",
              servings: "4   |   Total: 1 1/2 hours",
              comments: [
                "Named by the author for her mother — a Bangladeshi-style korma enriched with yogurt rather than cream or nuts.",
                "Great turned into a sandwich: pull the meat off the bone, dress it in the sauce, and pile it between mayo-slathered white bread."
              ],
              source: "NYT Cooking, by Sohla El-Waylly",
              ingredientGroups: [
                { label: "Onion", ingredients: ["1 large onion, halved: one half thinly sliced from root to stem, the other half roughly chopped and pureed (add a splash of water if needed)"] },
                { label: "Marinade", ingredients: ["1 (2-inch) piece ginger, peeled and thinly sliced", "4 garlic cloves, smashed and peeled", "1/3 cup whole-milk plain or Greek-style yogurt, plus more for serving", "2 teaspoons kosher salt, plus more to taste", "1 (4-pound) chicken, cut into 10 pieces, skin removed, or 3 pounds bone-in chicken parts, skin removed"] },
                { label: "Base and spices", ingredients: ["1/4 cup ghee or neutral oil", "1 tablespoon ground coriander", "1 bay leaf", "1 (3-inch) cinnamon stick, snapped in half", "3 green cardamom pods, cracked"] },
                { label: "To finish", ingredients: ["3 small green chiles, stemmed"] },
                { label: "To serve", ingredients: ["More onion, green chile, and yogurt", "White bread and mayonnaise, paratha, or steamed rice", "Cucumber-Tomato Salad (optional)"] }
              ],
              steps: [
                "Prep the onion: Cut the onion in half; trim off the root. Thinly slice one half from root to stem; set aside. Roughly chop the other half, blend until smooth with a little water, and set aside separately.",
                "Marinade: In the same blender, puree the ginger, garlic, yogurt, and salt. Pat the chicken dry, rub with the marinade, and set aside.",
                "In a Dutch oven, pot, or karahi over medium-high heat, add the ghee and the reserved sliced onion. Cook, stirring often, until deeply caramelized and crispy, about 20 minutes. Remove about 3/4 of the fried onion; set aside for garnish.",
                "Add the onion puree, coriander, bay leaf, cinnamon stick, cardamom pods, and a big pinch of salt to the remaining ghee. Cook, stirring, until fragrant and the liquid evaporates, about 5 minutes.",
                "Add the chicken, scraping in all the yogurt marinade, and stir to coat in the onion paste. Reduce the heat to medium-low, cover, and cook until the chicken is cooked through and the oil begins to separate, about 30 minutes, stirring occasionally.",
                "Add the green chiles, three-quarters of the reserved fried onion, and more salt to taste. Stir gently and cook until fragrant, about 5 minutes.",
                "Top with the remaining fried onion and serve with paratha, rice, or as a sandwich."
              ]
            },
            {
              title: "Bhatti da Murgh (Indian Grilled Chicken With Whole Spices)",
              favorite: true,
              servings: "6 to 8   |   Total: 1 1/2 hours, plus marinating",
              comments: ["At the restaurant this is cooked in a tandoor; roasting on a preheated baking sheet in a hot oven approximates that same intense, dry heat."],
              source: "NYT Cooking, recipe from Chintan Pandya and Adda Indian Canteen, adapted by Melissa Clark",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["6 whole, bone-in chicken legs (drumsticks with thighs attached, about 4 1/2 pounds)"] },
                { label: "Spice rub (divided)", ingredients: ["2 tablespoons garlic, microplaned (about 6 large cloves)", "2 tablespoons fresh ginger, microplaned", "1 tablespoon white vinegar", "1 1/2 teaspoons ground cayenne, or to taste", "1 1/2 teaspoons garam masala", "2 teaspoons fine sea salt"] },
                { label: "Yogurt marinade", ingredients: ["1/2 cup plain whole milk yogurt", "1/2 teaspoon freshly ground black pepper", "1/2 teaspoon ground clove", "1/2 teaspoon ground mace", "1/2 teaspoon ground anise or fennel seeds", "1/2 teaspoon ground black cardamom (optional)", "1/2 teaspoon ground green cardamom"] },
                { label: "Whole spice coating", ingredients: ["2 teaspoons cumin seeds", "2 teaspoons coriander seeds", "1 1/2 teaspoons Aleppo pepper or red pepper flakes"] },
                { label: "For basting", ingredients: ["3 to 4 tablespoons melted ghee"] },
                { label: "To serve", ingredients: ["Lime wedges"] }
              ],
              steps: [
                { lead: "Prep the chicken:", bullets: [
                  "Pop the joint on each leg: grasp the drumstick in one hand and the thigh in the other, and bend the joint back until it pops.",
                  "Using a small knife, slash the meaty part of each drumstick and thigh two or three times, going all the way to the bone."
                ]},
                "Spice rub: In a large bowl, stir together the garlic, ginger, vinegar, cayenne, garam masala, and salt. Set aside half the rub in a small bowl; rub the remainder into the slashed chicken, working it into the cuts.",
                "Yogurt marinade: Stir the yogurt into the reserved ginger-garlic mixture, then stir in the black pepper, clove, mace, anise or fennel seeds, black cardamom (if using), and green cardamom. Coat the chicken all over with this yogurt marinade.",
                "Cover and refrigerate at least 6 hours, preferably overnight.",
                "When ready to cook, heat the oven to 450°F.",
                "Using a mortar and pestle, the flat side of a knife, or a spice grinder for a very brief pulse, crack the cumin, coriander seeds, and Aleppo pepper; press into the top surface of the chicken.",
                "Place a rimmed baking sheet in the oven and let it heat 15 minutes. Carefully place the chicken on the hot baking sheet skin side up; roast 25 to 30 minutes. Baste with melted ghee and roast 10 to 15 minutes more, until charred in spots.",
                "Serve chicken on a platter with lime wedges."
              ]
            },
            {
              title: "Chicken Tikka Masala",
              servings: "6   |   Prep: 20 minutes, plus 8 hours (up to 48) marinating   |   Cook: 40 minutes",
              comments: [
                "Cashew cream can stand in for the heavy cream: blend 1/3 cup raw cashews (soaked, if your blender isn't powerful) with 1/3 cup water until very smooth.",
                "Chicken thighs are more forgiving than breast here, which needs the full 8-hour marinade to avoid drying out."
              ],
              source: "Swasthi's Recipes, by Swasthi Shreekanth",
              ingredientGroups: [
                { label: "Chicken marinade", ingredients: ["1 1/2 pounds (700g) boneless chicken thighs or breasts, cut into 1 to 1 1/2-inch pieces", "1/2 to 1 teaspoon Kashmiri red chili powder (or paprika)", "1 teaspoon garam masala", "1/2 teaspoon cumin powder", "1 teaspoon coriander powder", "1/4 teaspoon turmeric", "1/2 teaspoon salt", "1 tablespoon lemon juice", "1 tablespoon oil (mustard oil if available)", "1 tablespoon ginger garlic paste (or 3/4 tablespoon each grated ginger and garlic)", "1 tablespoon kasuri methi (dried fenugreek leaves)", "1/2 cup Greek yogurt (or hung curd)"] },
                { label: "Tikka masala sauce", ingredients: ["3 tablespoons oil or ghee", "1 1/2 cups chopped onions", "1 green chile, chopped (optional)", "1 teaspoon salt", "1 tablespoon ginger garlic paste", "1/2 to 1 teaspoon Kashmiri red chili powder", "2 teaspoons garam masala", "1 tablespoon coriander powder", "1 to 1 1/2 teaspoons cumin powder", "1 pound tomatoes, pureed (or 10 oz tomato puree/passata)", "1 cup hot water"] },
                { label: "To finish", ingredients: ["1 to 2 teaspoons sugar", "1/2 cup heavy cream (or cashew cream — see comments)", "1 tablespoon kasuri methi"] },
                { label: "Garnish", ingredients: ["3 tablespoons heavy cream", "3 tablespoons chopped cilantro"] }
              ],
              steps: [
                "Chicken marinade: Cut the chicken into 1 to 1 1/2-inch pieces; pat dry. In a large bowl, combine the chicken with the chili powder, garam masala, cumin, coriander, turmeric, salt, lemon juice, oil, ginger garlic paste, kasuri methi, and yogurt. Cover and refrigerate 8 hours (up to 48).",
                { lead: "Tikka masala sauce:", bullets: [
                  "Heat the oil or ghee in a pot over medium heat. Add the onions and 1 teaspoon salt; cook, stirring, until deep golden, 15 to 20 minutes.",
                  "Add the ginger garlic paste and green chile (if using); cook until fragrant, 40 to 60 seconds.",
                  "Reduce the heat to low. Add the chili powder, coriander, garam masala, and cumin; stir well and quickly to avoid burning, about 30 seconds.",
                  "Add the tomatoes and cook over medium-high heat, stirring, until thick, 2 to 8 minutes.",
                  "Add the hot water, bring to a boil, then cover and simmer over low heat until thick and fragrant, 10 to 12 minutes."
                ]},
                "Grill the chicken tikka: Thread the marinated chicken onto skewers. Oven: Bake in a preheated 460°F oven for 9 to 10 minutes, then flip and bake 9 to 10 minutes more; broil 2 to 3 minutes if desired. Air fryer: Air fry at 400°F for 6 minutes per side. Skillet: Cook in an oiled skillet over medium-high heat, 3 to 4 minutes per side.",
                "Add the sugar and the cream (or cashew cream) to the simmered sauce. Stir well and cook a few minutes, until thick, creamy, and fragrant. Taste and adjust.",
                "Add the grilled chicken tikka and the remaining kasuri methi to the sauce. Stir and cook, covered, until the chicken is warmed through, about 5 minutes.",
                "Garnish with the remaining cream and the chopped cilantro. Serve with rice or flatbread."
              ]
            },
            {
              title: "One-Pot Chicken and Rice with Peanut Sauce",
              servings: "6   |   Prep: 15 minutes   |   Total: about 1 hour",
              comments: ["The peanut sauce can be made up to 3 days ahead; cover and chill."],
              source: "Bon Appétit",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["6 small skin-on, bone-in chicken thighs (about 3 pounds)", "3/4 teaspoon kosher salt, plus more"] },
                { label: "Aromatics and rice", ingredients: ["2 large shallots, finely chopped", "8 garlic cloves, finely chopped", "1 (2-inch) piece ginger, peeled and finely chopped", "2 cups Jasmine or Basmati rice (preferably a good-quality basmati), rinsed", "2 whole star anise", "1 tablespoon soy sauce", "3 cups water"] },
                { label: "Peanut sauce (start this while the chicken and rice cook)", ingredients: ["1/2 cup creamy peanut butter", "2 tablespoons soy sauce", "2 tablespoons unseasoned rice vinegar", "5 teaspoons Sriracha", "1 (1-inch) piece ginger, peeled and finely chopped", "1 1/2 teaspoons honey", "1/4 cup warm water, plus more as needed"] },
                { label: "To serve", ingredients: ["1 English hothouse cucumber, halved lengthwise and thinly sliced on a diagonal", "1 cup cilantro leaves with tender stems"] }
              ],
              steps: [
                "Pat the chicken dry and season all over with the 3/4 teaspoon salt. Arrange, skin side down, in a cold, dry medium Dutch oven. Set over medium-low heat and cook undisturbed until the skin is golden brown and the chicken has rendered much of its fat, about 15 minutes. Transfer to a plate, leaving the fat behind.",
                "Set the pot over medium-low heat; add the shallots, garlic, and ginger and cook, stirring constantly, until very fragrant but not browned, about 3 minutes. Add the rice and stir to coat. Add the star anise, soy sauce, and 3 cups water; bring to a simmer. Nestle the chicken skin side up on top of the rice. Cover and cook over low heat until the rice has absorbed the liquid and the chicken is cooked through, about 25 minutes.",
                "Meanwhile, make the peanut sauce: Whisk the peanut butter, soy sauce, vinegar, Sriracha, ginger, honey, and warm water in a bowl until smooth. Thin with more water as needed.",
                "Remove the lid and fluff the rice with a fork. Pluck out and discard the star anise. Serve the chicken and rice with the peanut sauce, sliced cucumber, and cilantro."
              ]
            },
            {
              title: "Pad Krapow Gai (Thai Basil Chicken)",
              servings: "2 to 4   |   Total: 15 minutes",
              comments: ["Thai seasoning sauce (such as Golden Mountain) is made from fermented soybeans, like soy sauce, and adds sweetness along with savory depth."],
              source: "NYT Cooking, recipe from Kris Yenbamroong, adapted by Alexa Weibel",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["1/4 cup vegetable oil", "1 pound ground chicken (preferably dark meat)"] },
                { label: "Aromatics", ingredients: ["2 teaspoons minced garlic (from 2 cloves)", "2 teaspoons granulated sugar", "1 teaspoon minced fresh bird's-eye chile or other fresh chile"] },
                { label: "Vegetables and sauce", ingredients: ["8 ounces green beans, trimmed and cut into 1/2-inch pieces (about 1 1/2 cups)", "3 tablespoons oyster sauce", "2 tablespoons fish sauce", "1 tablespoon Thai seasoning sauce (such as Golden Mountain)"] },
                { label: "To finish", ingredients: ["1 cup loosely packed basil leaves (preferably Thai basil or holy basil)", "Ground white pepper, to taste", "Water, if needed to loosen the sauce"] },
                { label: "Fried eggs", ingredients: ["Vegetable oil, for frying", "4 eggs"] },
                { label: "To serve", ingredients: ["Steamed jasmine rice", "Additional Thai seasoning sauce, to taste"] }
              ],
              steps: [
                "Heat a wok or large nonstick skillet over medium-high heat; swirl in the oil. Once shimmering, add the ground chicken and cook, undisturbed, until the bottom is browned, about 2 minutes. Break apart and stir, cooking until just cooked through, about 1 minute.",
                "Stir in the garlic, sugar, and chile; cook until fragrant and evenly distributed, about 2 minutes. Add the green beans, oyster sauce, fish sauce, and Thai seasoning sauce; stir-fry until the green beans are tender, about 3 minutes.",
                "Remove from the heat, add the basil and a dash of white pepper, and toss to combine. If the sauce clings too tightly, add a splash of water.",
                "Fried eggs: Heat a generous amount of oil in a small skillet over medium-high heat until shimmering. Crack in an egg and fry until the white is set and crispy at the edges but the yolk is still runny, about 2 minutes.",
                "Serve over rice, topped with a crispy fried egg, and with additional Thai seasoning sauce to taste."
              ]
            },
            {
              title: "Sticky Coconut Chicken and Rice",
              servings: "4   |   Total: 45 minutes",
              source: "NYT Cooking, by Kay Chun",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["1 1/2 pounds boneless, skinless chicken thighs, each cut into 2 equal pieces", "1 tablespoon neutral oil (of the 1/4 cup below), such as safflower or canola", "1 teaspoon kosher salt (of the 2 teaspoons below)", "1/4 teaspoon black pepper (of the 1/2 teaspoon below)"] },
                { label: "Sear", ingredients: ["2 tablespoons neutral oil (of the 1/4 cup total)"] },
                { label: "Aromatics", ingredients: ["1 tablespoon neutral oil (the remainder of the 1/4 cup total)", "2 tablespoons minced fresh ginger", "1 tablespoon minced garlic"] },
                { label: "Rice and braise", ingredients: ["1 1/2 cups short-grain white rice, rinsed until the water runs clear", "1 3/4 cups low-sodium chicken broth", "1 (13.5-ounce) can full-fat coconut milk", "1 yellow bell pepper, cored, seeded, and chopped (1/2-inch pieces)", "1/2 cup roasted cashews, coarsely chopped", "3 scallions, thinly sliced", "1 teaspoon kosher salt (the remainder of the 2 teaspoons total)", "1/4 teaspoon black pepper (the remainder of the 1/2 teaspoon total)"] },
                { label: "To finish", ingredients: ["2 tablespoons coarsely chopped cilantro", "Hot sauce, for serving"] }
              ],
              steps: [
                "Heat the oven to 375°F. Rub the chicken with 1 tablespoon of the oil and season with 1 teaspoon salt and 1/4 teaspoon pepper.",
                "In a large Dutch oven, heat 2 tablespoons of the oil over medium heat. Working in two batches, brown the chicken, turning once, about 2 minutes per side. Transfer to a plate.",
                "Add the remaining 1 tablespoon oil, the ginger, and the garlic to the empty pot; stir until fragrant, 30 seconds. Add the rice, broth, coconut milk, bell pepper, cashews, scallions, remaining salt and pepper; stir to combine. Nestle the chicken in the rice.",
                "Cover and bake until all the liquid is absorbed, the rice is tender, and the chicken is cooked through, 25 minutes. Scatter the cilantro on top and serve with hot sauce."
              ]
            },
            {
              title: "Thai Chicken Meatballs in Peanut Sauce",
              servings: "4   |   Prep: 10 minutes   |   Cook: 30 minutes   |   Total: 40 minutes",
              comments: [
                "Ground turkey, beef, or pork can be substituted for the chicken.",
                "Bok choy can be swapped for peas, edamame, bell peppers, or spinach."
              ],
              source: "Serving Dumplings, by Anna Chwistek",
              ingredientGroups: [
                { label: "Meatballs", ingredients: ["1.1 pounds ground chicken", "1 teaspoon grated ginger", "1 teaspoon grated garlic", "1 teaspoon low-sodium soy sauce", "1/2 teaspoon sambal oelek or chili paste", "1 egg yolk", "2 tablespoons corn starch", "1 tablespoon chopped cilantro"] },
                { label: "Sauce", ingredients: ["2 tablespoons vegetable oil", "1 tablespoon unsalted butter", "5 garlic cloves, grated", "2 tablespoons grated ginger", "1 bok choy, chopped", "1 tablespoon Thai red curry paste", "1 teaspoon sambal oelek or chili paste", "1/2 cup chicken broth", "1 can (14 oz) unsweetened full-fat coconut milk", "1/2 cup peanut butter", "1 teaspoon honey", "2 tablespoons low-sodium soy sauce", "1 tablespoon fish sauce", "Juice of 1/2 lime"] },
                { label: "Coconut rice", ingredients: ["1 cup unsweetened coconut milk", "1 cup chicken broth", "1 cup Jasmine rice"] },
                { label: "Toppings", ingredients: ["Toasted peanuts", "Fried onions", "Chives", "Cilantro", "Chili pepper"] }
              ],
              steps: [
                "Prep: Chop the cilantro and bok choy; grate the garlic and ginger for both the meatballs and the sauce.",
                "Meatballs: Combine the ground chicken with the ginger, garlic, soy sauce, sambal oelek, egg yolk, corn starch, and cilantro. Roll into 1-inch meatballs.",
                "Heat the vegetable oil and butter in a nonstick skillet over medium heat. Add the meatballs and brown all over, about 3 minutes; remove to a plate.",
                { lead: "Sauce:", bullets: [
                  "Add the garlic and ginger to the skillet; cook 1 minute. Add the bok choy; cook 1 minute more.",
                  "Stir in the red curry paste and sambal oelek.",
                  "Deglaze with the chicken broth and simmer 2 minutes, scraping up the browned bits from the bottom of the pan.",
                  "Add the coconut milk and stir in the peanut butter. Add the honey, lime juice, soy sauce, and fish sauce. Return the meatballs to the sauce and simmer until cooked through, about 10 minutes."
                ]},
                "Coconut rice: Meanwhile, bring the coconut milk and chicken broth to a simmer in a saucepan. Add the rice, cover, and cook over low heat until absorbed, about 18 minutes.",
                "Serve the meatballs and sauce over the rice. Top with toasted peanuts, fried onions, chives, cilantro, and chili pepper as desired."
              ]
            },
            {
              title: "Thai-Inspired Chicken Meatball Soup",
              servings: "4 to 6   |   Total: 30 minutes",
              source: "NYT Cooking, by Ali Slagle",
              ingredientGroups: [
                { label: "Aromatics (grate together, then divide in half)", ingredients: ["1 (4-inch) piece fresh ginger, peeled", "6 garlic cloves, peeled", "1 jalapeño"] },
                { label: "Meatball mix", ingredients: ["2 pounds ground chicken", "1 large bunch cilantro, leaves and stems finely chopped (reserve a few whole leaves for serving)", "2 tablespoons fish sauce", "1 teaspoon kosher salt"] },
                { label: "For browning", ingredients: ["2 tablespoons vegetable or coconut oil, plus more as needed"] },
                { label: "Broth", ingredients: ["2 cups chicken broth", "1 (14-ounce) can full-fat coconut milk", "1/2 teaspoon granulated sugar", "1 tablespoon fish sauce (remaining from the 3 tablespoons above)"] },
                { label: "To finish", ingredients: ["5 ounces baby spinach", "1 tablespoon lime juice"] },
                { label: "To serve", ingredients: ["Steamed white or brown rice", "Reserved cilantro leaves", "Lime wedges"] }
              ],
              steps: [
                "Aromatics: Grate (or finely chop) the ginger, garlic, and jalapeño together. Divide in half; set one half aside for the broth.",
                "Meatball mix: In a large bowl, combine the ground chicken, chopped cilantro, 2 tablespoons fish sauce, 1 teaspoon salt, and half the aromatics. Mix until just combined. Form into 2-inch meatballs (about 2 ounces each).",
                "Heat the oil in a large Dutch oven or pot over medium-high heat. Brown the meatballs in batches until golden on two sides, about 4 minutes total. Transfer to a plate.",
                "Broth: Reduce the heat to medium. If the oil is burnt, wipe out the pot and add a bit more oil. Add the reserved aromatics and cook, stirring, until fragrant, about 1 minute. Add the broth, coconut milk, sugar, and 1 tablespoon fish sauce; bring to a simmer.",
                "Add the meatballs and any accumulated juices to the pot; simmer until the meatballs are cooked through, 5-8 minutes.",
                "Remove from heat and stir in the spinach and lime juice.",
                "Assemble: Divide the rice among bowls; top with the soup, meatballs, and reserved cilantro leaves. Serve with lime wedges."
              ]
            },
            {
              title: "Vietnamese Caramel Ginger Chicken",
              servings: "5   |   Prep: 7 minutes   |   Cook: 15 minutes",
              comments: ["Chicken breast can be used instead of thigh, but is more prone to drying out — cook it in the caramel, remove once opaque, and return at the end to warm."],
              source: "RecipeTin Eats, by Nagi Maehashi",
              ingredientGroups: [
                { label: "Chicken (toss and set aside)", ingredients: ["1 kg / 2 lb skinless chicken thigh fillets, cut into large 2-inch pieces", "3 tablespoons fish sauce", "1 bird's eye or Thai chili, deseeded and finely minced (optional)"] },
                { label: "Caramel", ingredients: ["3 tablespoons vegetable oil", "1/4 cup brown sugar, tightly packed"] },
                { label: "Added to the caramel with the chicken", ingredients: ["1/3 cup finely julienned ginger", "2 shallots, halved and finely sliced (or substitute half a red onion)"] },
                { label: "Simmer", ingredients: ["1/2 cup boiling water"] },
                { label: "To serve", ingredients: ["Fresh cilantro or sliced green onions", "Red chili, finely sliced (optional)", "Jasmine or Basmati rice, for serving"] }
              ],
              steps: [
                "Toss the chicken with the fish sauce and chili; set aside while you prepare the rest.",
                { lead: "Caramel:", bullets: [
                  "Use a large (12-inch/30cm or bigger) non-stick pan so the sauce reduces quickly — a smaller pan will take much longer to reduce.",
                  "Combine the oil and brown sugar in the cold pan, then set over medium-high heat.",
                  "As soon as the sugar melts, remove the pan from the heat.",
                  "Carefully add the chicken (it will sizzle — don't drop it in), along with the ginger and shallots; toss briefly to coat.",
                  "Return the pan to the stove and stir just until the chicken turns from pink to white all over — not browned, and not yet cooked through."
                ]},
                { lead: "Simmer:", bullets: [
                  "Add the boiling water, stir, and bring to a simmer.",
                  "Cook rapidly over medium-high to high heat, 10-12 minutes, until the liquid reduces to a glaze that coats the chicken.",
                  "Stir occasionally while the liquid is still watery, then more frequently once it thickens, to prevent scorching."
                ]},
                "Serve over rice, garnished with the cilantro (or green onion) and sliced red chili, if using."
              ]
            },
            {
              title: "Easiest Chicken Adobo",
              servings: "4",
              source: "Bon Appétit, by Claire Saffitz",
              ingredientGroups: [
                { label: "Aromatics prep", ingredients: ["1 head of garlic", "2 green chiles (such as serrano or jalapeño), divided"] },
                { label: "Chicken", ingredients: ["4 bone-in, skin-on chicken thighs and 4 drumsticks (or 4 whole chicken legs)", "1 tablespoon vegetable oil"] },
                { label: "Braising liquid", ingredients: ["3/4 cup distilled white vinegar", "3/4 cup soy sauce (not low-sodium)", "1 tablespoon light or dark brown sugar", "5 dried bay leaves", "Freshly ground black pepper"] },
                { label: "To serve", ingredients: ["1 cup uncooked white rice, short grain"] }
              ],
              steps: [
                "Cut the garlic head in half through the \"equator\" (it's fine if some cloves detach). Thinly slice one green chile, removing the seeds; set aside for serving. Reserve the other chile whole.",
                "If using whole chicken legs, split into thighs and drumsticks.",
                "Heat the oil in a large Dutch oven over medium. Add the chicken skin-side down; cook, lifting pieces occasionally to let fat render, until skin is golden, 8 to 10 minutes. Transfer to a plate.",
                "Add the vinegar, soy sauce, brown sugar, bay leaves, reserved garlic, and sliced chile to the pot. Bring to a simmer, stirring to dissolve the sugar.",
                "Return the chicken to the pot skin-side up. Cover and cook at a bare simmer, turning once, until the meat is very tender and falling off the bone, 35 to 45 minutes.",
                "Meanwhile, cook the rice according to package directions.",
                "Transfer the chicken to a clean plate. Increase heat to medium-high and boil the braising liquid, shaking the pot often, until reduced to a glaze, 5 to 8 minutes.",
                "Serve the chicken and sauce over rice. Scatter with the remaining chile, sliced, and more pepper."
              ]
            },
            {
              title: "Coconut-Gochujang Glazed Chicken With Broccoli",
              servings: "4   |   Total: 15 minutes",
              source: "NYT Cooking, by Kay Chun",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["2 tablespoons canola oil", "1 1/2 pounds boneless, skinless chicken breasts, cut into 1 1/2-inch pieces", "Kosher salt and black pepper"] },
                { label: "Aromatics", ingredients: ["1 (2-inch) piece fresh ginger, cut into matchsticks (about 1/3 cup)"] },
                { label: "Sauce", ingredients: ["1/2 cup unsweetened coconut milk", "3 tablespoons turbinado sugar (or 2 tablespoons light brown sugar)", "2 tablespoons gochujang paste", "2 tablespoons low-sodium soy sauce"] },
                { label: "Broccoli", ingredients: ["1 pound broccoli florets, cut into 2-inch pieces"] },
                { label: "To serve", ingredients: ["Cooked rice", "Sliced scallions or chopped cilantro"] }
              ],
              steps: [
                "Heat the oil in a large nonstick skillet over medium-high. Season the chicken with salt and pepper; cook, stirring occasionally, until golden, about 5 minutes.",
                "Add the ginger; cook, stirring, until softened, about 2 minutes.",
                "Add the coconut milk, sugar, gochujang, and soy sauce; bring to a simmer, stirring until the gochujang dissolves. Simmer until the sauce thickens and coats the chicken, about 3 minutes.",
                "Meanwhile, blanch the broccoli in salted boiling water until crisp-tender, 2 minutes. Drain.",
                "Divide the chicken and broccoli among plates; spoon the sauce over. Serve with rice, garnished with scallions or cilantro."
              ]
            },
            {
              title: "Peachy Peanut & Kimchi Chicken",
              servings: "4   |   Prep: 50 minutes   |   Total: 2 hours (including marinating)",
              comments: ["Chicken needs at least 1 hour to marinate (up to 2 days ahead is fine) — factor that into timing beyond the active cook time."],
              source: "The Club, by Molly Baz",
              ingredientGroups: [
                { label: "Marinade (blended)", ingredients: ["2 peaches, roughly chopped", "1 1/2 cups kimchi, plus a good amount of its brine", "Heaping 1/3 cup smooth peanut butter", "1 tablespoon honey", "2 tablespoons olive oil", "1 tablespoon plus 1 teaspoon kosher salt"] },
                { label: "Chicken", ingredients: ["8 large boneless, skinless chicken thighs (about 2 1/2 to 3 pounds)", "2 teaspoons kosher salt"] },
                { label: "Peach dressing", ingredients: ["2 peaches, halved and pitted", "1/2 teaspoon finely grated ginger", "3 tablespoons olive oil", "2 tablespoons white wine vinegar, plus more to taste", "Kosher salt and freshly ground black pepper, to taste"] },
                { label: "Salad", ingredients: ["3 stalks celery, thinly sliced", "1/4 cup kimchi", "Large handful celery leaves", "Kosher salt, freshly ground black pepper, and more vinegar, to taste"] },
                { label: "Grill", ingredients: ["Vegetable oil, for greasing the grates"] },
                { label: "To serve", ingredients: ["Large handful roasted salted peanuts, chopped", "Flaky salt"] }
              ],
              steps: [
                "Marinade: Roughly chop 2 of the peaches and add to a blender with the kimchi (and a good amount of its brine), peanut butter, honey, olive oil, and salt. Blend until smooth.",
                "Chicken: Transfer the remaining marinade to a bowl and stir in the 2 teaspoons salt. Add the chicken thighs, turn to coat, and marinate at least 1 hour (up to 2 days) in the fridge.",
                "Peach dressing: Halve and pit the remaining 2 peaches. Squeeze one half over a large salad bowl to release its juice, then mix in the ginger, olive oil, and vinegar. Season with salt and pepper.",
                "Salad: Thinly slice the celery and the remaining peach halves (1 1/2 peaches) and add to the bowl along with the 1/4 cup kimchi and celery leaves. Toss with the dressing; season to taste.",
                { lead: "Grill:", bullets: [
                  "Preheat a grill to medium-high (500°F).",
                  "Clean the grates, then very generously grease them with vegetable oil.",
                  "Pull the chicken from the marinade (don't wipe it off), reserving any marinade left in the bowl for brushing. Grill, covered, brushing with reserved marinade, until cooked through, about 5 minutes per side."
                ]},
                "Serve: Chop the roasted peanuts and stir into the peach-celery salad. Serve alongside the chicken with a sprinkle of flaky salt."
              ]
            },
            {
              title: "Chile Crisp Chicken n' Peanuts Scoop",
              servings: "Serves 6   |   Active: 15–20 minutes",
              comments: [
                "A not-so-classic chicken salad made spicy with chile crisp and nutty with peanut butter — no cooking required. Be gentle when mixing; the acid in the dressing can break down the chicken if you overwork it. A few careful folds are all it takes."
              ],
              source: "Molly Baz",
              ingredientGroups: [
                {
                  label: "Prep",
                  ingredients: [
                    "1 pound rotisserie chicken, pulled into large but bite-sized pieces (about 2 heaping cups)",
                    "2 small Persian cucumbers (about 5–6 oz), finely chopped",
                    "1½ tsp fresh ginger, finely grated (no need to peel)",
                    "3 scallions, whites and greens thinly sliced"
                  ]
                },
                {
                  label: "Peanut dressing",
                  ingredients: [
                    "Heaping ⅓ cup crunchy peanut butter",
                    "2 tablespoons rice vinegar, plus more to taste",
                    "1 teaspoon kosher salt, plus more to taste",
                    "2–4 tablespoons chile crisp, plus more to taste",
                    "Honey, to taste (optional)",
                    "Water, added 1 teaspoon at a time to reach thick but pourable consistency"
                  ]
                },
                {
                  label: "To serve",
                  ingredients: [
                    "Fresh mint",
                    "Toasted sesame seeds",
                    "Additional grated ginger and chile crisp, if desired"
                  ]
                }
              ],
              steps: [
                {
                  lead: "Prep the components:",
                  bullets: [
                    "Pull 1 pound rotisserie chicken into large but bite-sized pieces (about 2 heaping cups).",
                    "Finely chop the cucumbers. Finely grate the ginger (no need to peel). Thinly slice the scallion whites and greens."
                  ]
                },
                {
                  lead: "Make the peanut dressing:",
                  bullets: [
                    "In a large bowl, whisk together the peanut butter, 2 tablespoons rice vinegar, grated ginger, and 1 teaspoon salt.",
                    "Add chile crisp a tablespoon at a time, stirring, until the desired spice level is reached (you'll likely use 2–4 tablespoons). Add honey to taste, if desired.",
                    "Stir in water a teaspoon at a time until the dressing is thick but pourable.",
                    "Add the pulled chicken, diced cucumber, and sliced scallions; fold gently to coat. Do not overmix — you want to retain the texture of the chicken. Season to taste with salt and additional rice vinegar."
                  ]
                },
                "Serve topped with mint, toasted sesame seeds, and additional grated ginger and chile crisp if desired."
              ]
            },
            {
              title: "Kung Pao Chicken and Broccoli",
              servings: "2   |   Prep: 30 minutes   |   Cook: 30 minutes   |   Total: 1 hour",
              source: "https://cambodiarecipe.com/kung-pao-chicken-and-broccoli/",
              ingredientGroups: [
                { label: "Broccoli", ingredients: ["1 teaspoon canola oil", "4 cups broccoli florets", "2 teaspoons ground fresh ginger", "2 tablespoons water"] },
                { label: "Chicken", ingredients: ["2 teaspoons canola oil", "1 teaspoon ground fresh ginger", "1/2 teaspoon crushed red pepper", "1 pound boneless, skinless chicken breasts, cut into 1/4-inch strips"] },
                { label: "Sauce", ingredients: ["1/2 cup low-sodium chicken broth", "2 tablespoons hoisin sauce", "2 tablespoons rice wine vinegar", "2 tablespoons low-sodium soy sauce", "1 teaspoon cornstarch", "4 cloves garlic, minced"] },
                { label: "To finish", ingredients: ["2 tablespoons coarsely chopped salted peanuts"] }
              ],
              steps: [
                "Broccoli: Heat 1 teaspoon of the oil in a large nonstick skillet over medium-high heat. Add the broccoli and 2 teaspoons ginger; stir-fry 1 minute. Add the water and cook until the broccoli is tender-crisp, about 2 minutes. Transfer to a bowl.",
                "Chicken: Heat the remaining 2 teaspoons oil in the same pan. Add the remaining 1 teaspoon ginger, the crushed red pepper, and the chicken; cook, stirring, until the chicken is cooked through, about 4 minutes. Transfer to the bowl with the broccoli.",
                "Sauce: Whisk together the chicken broth, hoisin sauce, rice wine vinegar, soy sauce, cornstarch, and garlic in a small bowl. Pour into the skillet and cook over medium heat, stirring, until thickened, about 1 minute.",
                "Return the broccoli to the pan and toss to coat. Sprinkle with the peanuts and serve."
              ]
            },
            {
              title: "Spicy Orange Sesame Chicken",
              servings: "6   |   Prep: 20 minutes   |   Cook: 20 minutes   |   Total: 40 minutes",
              source: "Half Baked Harvest, by Tieghan Gerard",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["1 1/2 pounds boneless chicken breasts, cut into cubes", "1 egg white", "1 tablespoon tamari or soy sauce", "1 tablespoon orange zest", "Black pepper"] },
                { label: "Dredging", ingredients: ["1/3 cup cornstarch"] },
                { label: "Orange sauce", ingredients: ["1/3 cup low-sodium chicken broth", "1 cup fresh orange juice, plus 2 tablespoons zest", "1/3 cup tamari or soy sauce", "2 tablespoons rice vinegar", "3 tablespoons honey"] },
                { label: "Cooking", ingredients: ["1/3 cup avocado oil", "4 cloves garlic, grated", "1 tablespoon fresh grated ginger", "1/2 to 1 teaspoon Aleppo pepper or red pepper flakes"] },
                { label: "To serve", ingredients: ["2 tablespoons toasted sesame seeds", "Green onions and sesame seeds", "Steamed rice"] }
              ],
              steps: [
                "Combine the chicken, egg white, tamari/soy sauce, orange zest, and pepper in a bowl; toss well to coat.",
                "Put the cornstarch in a separate bowl; dredge the chicken through to coat.",
                "Whisk together the broth, orange juice, tamari/soy sauce, rice vinegar, and honey in a jar for the sauce.",
                "Heat the avocado oil in a large skillet over medium heat. Add the chicken in batches; cook until golden all around, about 3 to 4 minutes per batch. Transfer to a plate.",
                "Add the garlic, ginger, and Aleppo pepper or red pepper flakes to the skillet; cook 1 to 2 minutes. Pour in the sauce, bring to a simmer, and cook until slightly thickened, about 3 minutes. Return the chicken and toss to coat.",
                "Serve over steamed rice with sesame seeds and green onions."
              ]
            },
            {
              title: "Weeknight Sticky Ginger Sesame Chicken Meatballs",
              servings: "4   |   Prep: 10 minutes   |   Cook: 20 minutes   |   Total: 30 minutes",
              comments: [
                "Ground turkey or pork can be used in place of chicken.",
                "If using winter squash instead of broccoli, roast it alone for 15 minutes before adding the meatballs to the sheet, since squash takes longer."
              ],
              source: "Half Baked Harvest, by Tieghan Gerard",
              ingredientGroups: [
                { label: "Meatballs", ingredients: ["1 pound ground chicken", "2 green onions, finely chopped, plus more for serving", "1 inch fresh ginger, grated", "1 clove garlic, minced or grated", "Black pepper", "Oil, for your hands"] },
                { label: "Broccoli", ingredients: ["1 head broccoli, cut into florets (or 1 winter squash, seeded and sliced into 1/4-inch wedges)", "1 tablespoon sesame oil or extra-virgin olive oil (of the 2 tablespoons below)", "Salt and pepper"] },
                { label: "Sticky sauce", ingredients: ["1 tablespoon sesame oil or extra-virgin olive oil (the remainder of the 2 tablespoons total)", "1/3 cup low-sodium soy sauce", "1/3 cup pomegranate juice (or apple cider or orange juice)", "3 tablespoons hoisin sauce", "3 tablespoons honey", "2 tablespoons rice vinegar or apple cider vinegar", "1 teaspoon Aleppo pepper or red pepper flakes"] },
                { label: "To serve", ingredients: ["Steamed rice, sesame seeds, and pomegranate arils"] }
              ],
              steps: [
                "Preheat the oven to 450°F. Line a baking sheet with parchment.",
                "Meatballs and broccoli: Combine the ground chicken, green onions, ginger, garlic, and a pinch of pepper in a bowl; mix until just combined. With oiled hands, roll into 16 meatballs. Toss the broccoli with 1 tablespoon oil, season with salt and pepper, and arrange on one half of the baking sheet. Add the meatballs to the other half. Roast 15 minutes.",
                "Meanwhile, combine the remaining 1 tablespoon oil, the soy sauce, pomegranate juice, hoisin sauce, honey, vinegar, and Aleppo pepper in a small saucepan; simmer over medium heat until slightly thickened, about 5 minutes.",
                "Pour about half the sauce over the meatballs, tossing to coat. Return to the oven for 2 to 3 minutes, until the sauce caramelizes.",
                "Serve the meatballs and sauce over bowls of rice, topped with additional green onions, pomegranate arils, and sesame seeds."
              ]
            },
            {
              title: "Crispy Chicken Katsu Bowls",
              servings: "4   |   Prep: 30 minutes   |   Cook: 15 minutes   |   Total: 45 minutes",
              source: "https://www.halfbakedharvest.com/chicken-katsu-bowls/",
              ingredientGroups: [
                { label: "Marinade", ingredients: ["2/3 cup tamari or soy sauce", "1 tablespoon toasted sesame oil", "1 tablespoon honey", "2 teaspoons grated ginger", "2 tablespoons chopped green onions", "1 teaspoon sesame seeds", "Chili flakes, to taste"] },
                { label: "Chicken", ingredients: ["4 chicken cutlets (or 2 boneless chicken breasts, sliced in half horizontally)"] },
                { label: "Breading", ingredients: ["2 large eggs, beaten", "1 cup panko bread crumbs", "3 tablespoons sesame seeds"] },
                { label: "For the skillet", ingredients: ["Oil, for frying (a few tablespoons, neutral)", "1 bag frozen shelled edamame", "2 tablespoons tamari or soy sauce (reserved from marinade quantity above)"] },
                { label: "Spicy Mayo", ingredients: ["1/3 cup olive oil mayo", "1-2 tablespoons sriracha", "2 teaspoons soy sauce or tamari", "1 teaspoon honey"] },
                { label: "To serve", ingredients: ["3-4 cups cooked rice", "Cucumber, avocado, pickled ginger, and nori sheets", "Green onions, for garnish"] }
              ],
              steps: [
                "Marinade: In a medium bowl, whisk together the 2/3 cup tamari, sesame oil, honey, ginger, 2 tablespoons green onions, 1 teaspoon sesame seeds, and chili flakes.",
                "Pour 3-4 tablespoons of the marinade over the chicken in a separate bowl; reserve the rest for serving. Let the chicken marinate at room temperature 15 minutes.",
                "Breading: Set up two shallow bowls — one with the beaten eggs, one with the panko and 3 tablespoons sesame seeds combined. Dip each piece of chicken in egg, then coat in the panko mixture.",
                "Heat oil in a large skillet over medium-high heat. Cook the chicken until golden brown, 3-4 minutes per side. Transfer to a cutting board.",
                "Add the edamame to the same skillet; cook until thawed, then stir in the 2 tablespoons reserved tamari/soy sauce. Cook 1 minute.",
                "Spicy Mayo: In a small bowl, combine the mayo, sriracha, 2 teaspoons soy sauce, and honey.",
                "Assemble: Slice the chicken into thin strips. Divide the rice among bowls; top with cucumber, avocado, chicken, pickled ginger, and edamame. Drizzle with the reserved marinade and spicy mayo. Garnish with green onions and nori."
              ]
            },
            {
              title: "Japanese Fried Chicken (Shio Koji Karaage)",
              servings: "4   |   Prep: 10 minutes   |   Cook: 15 minutes   |   Total: 25 minutes",
              comments: ["Shio koji is a fermented rice-malt seasoning, available at Japanese/Asian grocers."],
              source: "Hikari Miso, recipe by Namiko Hirasawa Chen (Just One Cookbook)",
              ingredientGroups: [
                { label: "Marinade", ingredients: ["1 pound (450g) boneless chicken thigh with skin, cut into 1-inch pieces", "4 tablespoons shio koji", "1 teaspoon grated ginger", "1 teaspoon grated garlic", "1 teaspoon soy sauce"] },
                { label: "Coating", ingredients: ["1/2 cup potato starch or cornstarch"] },
                { label: "Frying", ingredients: ["Vegetable or canola oil, for deep frying"] },
                { label: "To serve", ingredients: ["Lemon wedges"] }
              ],
              steps: [
                "Combine the chicken with the shio koji, ginger, garlic, and soy sauce in a bowl or large bag. Marinate at least 30 minutes (up to overnight in the fridge).",
                "Heat oil for deep-frying to about 320 to 335°F.",
                "Just before frying, add the potato starch to the bowl/bag with the chicken; mix to coat.",
                "Fry the chicken in batches until golden brown; don't overcrowd the pot or the oil temperature will drop too low. Drain on a wire rack.",
                "Serve immediately with lemon wedges."
              ]
            },
            {
              title: "One-Pot Japanese Curry Chicken and Rice",
              servings: "4   |   Total: 1 hour",
              comments: [
                "Sweet potatoes, cauliflower, or peas would be good substitutions or additions to the potato and carrots.",
                "Serve with any pickle you have on hand for a vinegary contrast to the rich curry."
              ],
              source: "NYT Cooking, by Kay Chun",
              ingredientGroups: [
                { label: "Chicken", ingredients: ["2 pounds bone-in, skin-on chicken thighs (about 4 to 6 thighs)", "2 tablespoons canola oil, divided", "Salt and black pepper"] },
                { label: "Sear", ingredients: ["1 tablespoon unsalted butter (of the 3 tablespoons below)"] },
                { label: "Aromatics and spices", ingredients: ["1/2 cup finely chopped white or yellow onion", "3 tablespoons Madras curry powder", "1 tablespoon minced garlic", "1 tablespoon minced fresh ginger", "3/4 teaspoon ground nutmeg", "2 tablespoons unsalted butter (the remainder of the 3 tablespoons)"] },
                { label: "Rice and vegetables", ingredients: ["1 1/2 cups short-grain white rice, rinsed until the water runs clear", "1 large baking potato (about 1 pound), peeled and cut into 1/2-inch cubes", "3 medium carrots, sliced 1/2-inch thick", "3 1/2 cups low-sodium chicken broth", "2 tablespoons Worcestershire sauce"] },
                { label: "To serve", ingredients: ["Chopped scallions, pickles, kimchi, and/or hot sauce"] }
              ],
              steps: [
                "Heat the oven to 375°F. Rub the chicken with 1 tablespoon of the oil and season with salt and pepper.",
                "In a large Dutch oven or heavy pot, heat the remaining 1 tablespoon oil with 1 tablespoon of the butter over medium heat until hot. Add the chicken skin side down and sear until golden, about 4 minutes. Transfer to a plate.",
                "Add the onion to the pot, season with salt and pepper, and cook, stirring, until softened, 2 minutes. Add the curry powder, garlic, ginger, nutmeg, and remaining 2 tablespoons butter; stir until fragrant, about 1 minute.",
                "Add the rinsed rice and stir until evenly coated in the spices. Add the potato, carrots, broth, and Worcestershire sauce; stir to combine. Nestle the chicken skin side up on top.",
                "Cover and bake 20 minutes. Uncover and bake until most of the liquid is absorbed and the chicken is golden and cooked through, about 20 minutes more.",
                "Divide the chicken and rice among bowls; garnish with scallions. Serve with any combination of pickles, kimchi, and hot sauce."
              ]
            }
          ]
        },
        { title: "Turkey", recipes: [] },
        { title: "Pork", recipes: [] },
        { title: "Lamb", recipes: [] },
        { title: "Beef", recipes: [] },
        { title: "Ground Beef", recipes: [] },
        { title: "Fish", recipes: [] },
        { title: "Shellfish", recipes: [] },
        { title: "Other", recipes: [] }
      ]
    },
    {
      title: "Vegetarian Mains",
      subsections: [
        { title: "Vegetables", recipes: [
          {
            title: "Eggplant Involtini",
            servings: "Serves 4   |   Total: 1 hour",
            comments: [
              "A lighter, weeknight-friendly take on eggplant parmesan — no breading, no frying. The eggplant is roasted or grilled into silky planks, rolled around a three-cheese filling, and baked in homemade tomato sauce. If you don't want to make the sauce, 3 cups of good store-bought sauce works fine."
            ],
            source: "https://smittenkitchen.com/2022/09/eggplant-involtini/",
            ingredientGroups: [
              { label: "Eggplant", ingredients: [
                "2 medium eggplants (about 1 pound each), tops trimmed",
                "Olive oil, for brushing",
                "Kosher salt and freshly ground black pepper"
              ]},
              { label: "Tomato sauce", ingredients: [
                "2 tablespoons olive oil",
                "3 garlic cloves, minced",
                "1 teaspoon kosher salt",
                "Aleppo pepper or red pepper flakes, to taste",
                "½ teaspoon dried oregano",
                "1 (28-ounce) can whole or crushed tomatoes"
              ]},
              { label: "Filling", ingredients: [
                "1 cup ricotta",
                "4 ounces mozzarella, coarsely grated",
                "¼ cup grated Parmesan (of the ½ cup total)",
                "Finely grated zest from half a lemon",
                "½ teaspoon kosher salt",
                "Freshly ground black pepper"
              ]},
              { label: "To finish", ingredients: [
                "¼ cup grated Parmesan (remaining)",
                "Juice from half a lemon",
                "Fresh basil leaves"
              ]}
            ],
            steps: [
              { lead: "Prep and cook the eggplant:", bullets: [
                "Heat the oven to 425°F. Cut the eggplants into generous ¼-inch-thick lengthwise planks. Arrange on parchment-lined baking sheets, brush both sides with olive oil, and season well with salt and pepper.",
                "To roast: Bake 10–12 minutes on the first side, flip, and roast another 8–10 minutes, until browned on each side.",
                "To grill: Grill over high heat until dark marks appear, about 8 minutes on the first side and 5 on the second.",
                "Set aside to cool."
              ]},
              { lead: "Make the sauce:", bullets: [
                "Heat 2 tablespoons olive oil in an 11- to 12-inch ovenproof pot over medium. Add the garlic, salt, Aleppo pepper, and oregano; cook 1 minute.",
                "Add the tomatoes (it will splatter — be careful) and stir. Simmer 10 minutes, stirring occasionally. Taste and adjust seasoning; blend if you prefer a smoother texture.",
                "Ladle out 1 cup sauce and set aside for serving. If your pot isn't ovenproof, transfer the remaining sauce to a 2-quart baking dish."
              ]},
              "Make the filling: In a bowl, combine the ricotta, mozzarella, ¼ cup Parmesan, lemon zest, ½ teaspoon salt, and a few grinds of pepper.",
              { lead: "Assemble the rolls:", bullets: [
                "Place about 1 tablespoon of filling at the end of each eggplant plank (a little less on smaller ones), using all the filling.",
                "Roll into a cigar and place seam-side down in the sauce."
              ]},
              "Bake: Brush the tops lightly with olive oil. Bake uncovered about 30 minutes, until bubbly at the edges and browned on top.",
              "Squeeze the lemon juice over the top and scatter with fresh basil. Serve with the reserved sauce and extra Parmesan on the side."
            ]
          },
          {
            title: "Eggplant Parmesan",
            servings: "Serves 6–8   |   Prep: 20 minutes   |   Cook: 40 minutes   |   Total: 1 hour",
            source: "https://www.loveandlemons.com/eggplant-parmesan/",
            ingredientGroups: [
              { label: "Eggplant", ingredients: [
                "2 large eggplants, cut into ¼-inch-thick rounds"
              ]},
              { label: "Egg wash", ingredients: [
                "3 large eggs, beaten"
              ]},
              { label: "Panko coating", ingredients: [
                "1½ cups panko breadcrumbs",
                "1 cup grated Parmesan cheese (of the 1¼ cups total)",
                "2 teaspoons dried oregano",
                "2 tablespoons fresh thyme leaves",
                "½ teaspoon Aleppo pepper or red pepper flakes",
                "½ teaspoon sea salt",
                "Freshly ground black pepper",
                "Extra-virgin olive oil, for drizzling"
              ]},
              { label: "Assembly", ingredients: [
                "28 ounces marinara sauce",
                "2 large fresh mozzarella balls, thinly sliced (or one package shredded mozzarella)",
                "¼ cup grated Parmesan cheese (remaining from the 1¼ cups total)",
                "Extra-virgin olive oil, for drizzling",
                "Sea salt, for sprinkling"
              ]},
              { label: "To serve", ingredients: [
                "⅓ cup fresh basil leaves"
              ]}
            ],
            steps: [
              "Preheat the oven to 400°F and line 2 baking sheets with parchment paper.",
              { lead: "Set up the breading stations:", bullets: [
                "Beat the eggs in a shallow bowl.",
                "In a second shallow bowl, combine the panko, 1 cup Parmesan, oregano, thyme, Aleppo pepper, salt, and several grinds of black pepper."
              ]},
              { lead: "Bread and bake the eggplant:", bullets: [
                "Dip each eggplant slice in the egg wash, then press into the panko mixture to coat on all sides.",
                "Arrange in a single layer on the baking sheets. Drizzle with olive oil.",
                "Bake 18–25 minutes, until tender and golden brown. (Use convection setting if available for extra crispness.)"
              ]},
              { lead: "Assemble and bake:", bullets: [
                "Spread ½ cup marinara in the bottom of a 9×13-inch baking dish.",
                "Layer half the eggplant, then 1 cup marinara, then half the mozzarella. Repeat with the remaining eggplant, remaining marinara, and remaining mozzarella.",
                "Top with the remaining ¼ cup Parmesan, a drizzle of olive oil, and a few pinches of sea salt.",
                "Bake at 400°F for 20 minutes, until the cheese is melted and bubbling."
              ]},
              "Turn the oven to broil and broil for 2–4 minutes, until the cheese is browned in spots. Remove from the oven, top with fresh basil, and serve."
            ]
          }
        ]},
        { title: "Tofu", recipes: [] },
        { title: "Mushroom", recipes: [] }
      ]
    },
    {
      title: "Vegetable Sides",
      recipes: [
        {
          title: "Charred Broccoli and Cauliflower Salad",
          servings: "6 to 8   |   Total: 30 min   |   Active: 25 min",
          source: "https://www.foodnetwork.com/recipes/ree-drummond/charred-broccoli-and-cauliflower-salad-19673188",
          comments: ["Great as a side at a barbecue with grilled seafood or meat, or to take to a potluck."],
          ingredientGroups: [
            {
              label: "Vegetables",
              ingredients: [
                "1 medium crown broccoli, broken into large florets",
                "1 medium cauliflower, broken into large florets",
                "3 tablespoons olive oil",
                "1 teaspoon kosher salt",
                "1/2 teaspoon freshly ground black pepper"
              ]
            },
            {
              label: "Dressing",
              ingredients: [
                "2/3 cup mayonnaise",
                "1/3 cup Greek yogurt",
                "2 tablespoons chopped fresh dill",
                "2 tablespoons chopped fresh parsley",
                "Zest and juice of 1 lemon",
                "Pinch kosher salt",
                "Pinch freshly ground black pepper"
              ]
            },
            {
              label: "Salad",
              ingredients: [
                "1 cup arugula",
                "1/2 cup dried blueberries, plus extra for garnish",
                "1/4 cup pickled red onions, plus extra for garnish",
                "2 tablespoons sunflower seeds, plus extra for garnish"
              ]
            }
          ],
          steps: [
            "Preheat the grill to medium-high heat.",
            "Toss the broccoli and cauliflower with the olive oil, salt, and pepper. Grill, turning as needed, until tender and well charred, 8–10 minutes. Transfer to a large bowl.",
            "Make the dressing: whisk together the mayonnaise, Greek yogurt, dill, parsley, lemon zest, and lemon juice. Season with salt and pepper.",
            "Spread the dressing onto a serving platter, leaving a well in the middle.",
            "Add the arugula, blueberries, pickled red onions, and sunflower seeds to the bowl with the charred vegetables and toss to combine.",
            "Mound the vegetable mixture into the well. Garnish with extra blueberries, pickled red onions, and sunflower seeds. Serve."
          ]
        },
        {
          title: "Joan's on Third Butter Lettuce Salad (Copycat)",
          servings: "Serves 4",
          comments: ["Original recipe uses French feta; family uses goat cheese in oil instead. Shallot is in the original but was skipped. Dressing recipe from CopyKat Recipes."],
          source: "Copycat recipe based on Joan's on Third, Los Angeles",
          ingredientGroups: [
            { label: "Dressing", ingredients: ["¼ cup white wine vinegar (or champagne vinegar)", "1 tbsp Dijon mustard", "2–3 cloves garlic, minced", "¼ tsp lemon juice", "Dried oregano, to taste", "Dried basil, to taste", "9 tbsp extra virgin olive oil", "Salt and freshly ground black pepper, to taste"] },
            { label: "Salad", ingredients: ["1–2 large heads butter lettuce, washed, dried, and torn", "½ cup goat cheese, crumbled", "⅓ cup dried cranberries"] }
          ],
          steps: [
            { lead: "Make the dressing:", bullets: [
              "Whisk together the white wine vinegar, Dijon mustard, minced garlic, lemon juice, oregano, and basil in a small bowl.",
              "Slowly drizzle in the olive oil while whisking constantly until emulsified.",
              "Season with salt and pepper to taste."
            ]},
            "Place the torn butter lettuce in a large serving bowl.",
            "Sprinkle the crumbled goat cheese and dried cranberries evenly over the lettuce.",
            "Drizzle the vinaigrette lightly over the top just before serving and toss gently to combine."
          ]
        }
      ]
    },
    {
      title: "Pickling",
      recipes: [
        {
          title: "Dill Pickles",
          servings: "Makes 4 (8-oz) or 2 (16-oz) jars   |   Prep: 10 minutes   |   Chilling: 1–5 days",
          comments: [
            "Chips are lightly pickled after 1 day; spears take 2 days. The best flavor develops around day 5 or 6 — worth the wait. Keep refrigerated for several weeks."
          ],
          source: "https://www.loveandlemons.com/dill-pickles-recipe/",
          ingredientGroups: [
            { label: "Cucumbers and aromatics", ingredients: [
              "12–14 Persian cucumbers, or 8–10 small pickling cucumbers",
              "4 garlic cloves, halved",
              "2 teaspoons mustard seeds",
              "2 teaspoons peppercorns",
              "Fresh dill sprigs, a few per jar"
            ]},
            { label: "Brine", ingredients: [
              "2 cups water",
              "2 cups distilled white vinegar",
              "¼ cup cane sugar",
              "2 tablespoons sea salt"
            ]}
          ],
          steps: [
            "Prep the cucumbers: For spears, slice lengthwise into quarters. For chips, thinly slice crosswise.",
            "Pack the jars: Divide the cucumbers among 4 (8-oz) or 2 (16-oz) jars. Divide the garlic, mustard seeds, peppercorns, and dill sprigs evenly among the jars.",
            { lead: "Make the brine and fill:", bullets: [
              "Combine the water, vinegar, sugar, and salt in a medium saucepan over medium heat. Stir until the sugar and salt dissolve, about 1 minute.",
              "Let cool slightly, then pour over the cucumbers. Set aside to cool to room temperature."
            ]},
            "Refrigerate: Chips are lightly pickled after 1 day and grow more flavorful from there. Spears are lightly pickled after 2 days; best flavor develops around day 5 or 6. Keeps in the fridge for several weeks."
          ]
        },
        {
          title: "Quick Pickled Green Onions",
          servings: "Makes about 8 servings   |   Prep: 15 minutes   |   Pickling: 2 hours minimum (best after 24–48 hours)",
          source: "https://www.forkintheroad.co/quick-pickled-green-onions/",
          comments: [
            "Ready to eat after 2 hours, but the flavor deepens significantly after 24–48 hours. Keeps refrigerated up to 1 month as long as the onions stay fully submerged in brine."
          ],
          ingredientGroups: [
            { label: "Green onions and aromatics", ingredients: [
              "1 bunch green onions (about 10), roots trimmed",
              "1-inch piece fresh ginger",
              "2 whole garlic cloves",
              "2 teaspoons ground mustard",
              "1 teaspoon Aleppo pepper or red pepper flakes (optional)"
            ]},
            { label: "Brine", ingredients: [
              "2 cups water",
              "1 cup rice vinegar (or white wine vinegar, apple cider vinegar, or plain white vinegar)",
              "1 tablespoon salt",
              "1 tablespoon sugar"
            ]}
          ],
          steps: [
            { lead: "Prep the green onions:", bullets: [
              "Cut off the roots.",
              "Either slice into thin rounds for sprinkling, or cut each green onion in half lengthwise and then into 2–4-inch spears for layering on salads, burgers, and sandwiches."
            ]},
            "Pack the jar: Add the green onions to a large jar. Add the ginger, garlic, ground mustard, and Aleppo pepper (if using).",
            { lead: "Make the brine:", bullets: [
              "Combine the water, vinegar, salt, and sugar in a small saucepan. Bring to a boil, stirring to dissolve.",
              "Pour the hot brine over the green onions until completely submerged. Close the lid tightly."
            ]},
            "Let the jar cool to room temperature on the counter, then refrigerate. Ready after 2 hours, best after 24–48 hours. Keeps up to 1 month refrigerated."
          ]
        },
        {
          title: "Quick Pickled Red Onions",
          servings: "Makes about 8 servings   |   Prep: 5 minutes   |   Total: 15 minutes",
          comments: [
            "Great on burgers, grain bowls, salads, sandwiches, or a cheese board. Ready to eat in just 15 minutes, and keeps in the fridge for up to 2 weeks."
          ],
          source: "https://www.kitchentreaty.com/quick-pickled-red-onions/",
          ingredientGroups: [
            { label: "Red onion", ingredients: [
              "1 medium red onion, peeled, halved, and sliced as thinly as possible"
            ]},
            { label: "Brine", ingredients: [
              "3/4 cup apple cider vinegar (or white vinegar)",
              "1/2 cup water",
              "2 teaspoons granulated sugar",
              "1 teaspoon kosher salt"
            ]}
          ],
          steps: [
            "Slice the onion as thinly as possible and pack into a quart-size mason jar.",
            "Make the brine: Add the vinegar, water, sugar, and salt to a small saucepan. Bring just to a boil over high heat, stirring to dissolve.",
            "Carefully pour the hot brine over the onions. Press the onions down with a spoon to make sure they are fully submerged.",
            "Let sit at room temperature for 15 minutes, then serve. Store covered in the fridge for up to 2 weeks, keeping the onions submerged in liquid."
          ]
        }
      ]
    },
    {
      title: "Rice",
      recipes: [
        {
          title: "Indian Style Rice",
          servings: "4 to 6   |   Prep: 15 minutes, plus 30 minutes soaking   |   Cook: about 25 minutes (rice cooker)",
          comments: [
            "If you don't have whole cardamom pods or a cinnamon stick, use a pinch each of ground cardamom and ground cinnamon added with the turmeric.",
            "Adapted for a rice cooker — rather than boiling the rice separately and draining it (the original stovetop method), the sautéed spice mixture is stirred into the rice cooker with the water and rice."
          ],
          source: "Simply Recipes, by Elise Bauer, adapted for a rice cooker",
          ingredientGroups: [
            { label: "Rice", ingredients: ["2 cups Jasmine or Basmati rice", "3 cups water", "2 teaspoons salt"] },
            { label: "Whole spices", ingredients: ["2 cloves", "2 green cardamom pods", "One 2-inch piece cinnamon"] },
            { label: "Sauté", ingredients: ["3 tablespoons vegetable oil (or ghee)", "1/2 teaspoon dark mustard seeds", "1/2 teaspoon cumin seeds", "1/4 teaspoon Aleppo pepper or red pepper flakes", "1 medium onion, chopped", "3 garlic cloves, chopped", "1/4 teaspoon turmeric"] }
          ],
          steps: [
            "Rinse the rice in a sieve under cool running water until the water runs clear. Soak in cool water 30 minutes, then drain well.",
            "Sauté: Heat the oil in a large skillet over medium heat. Add the mustard seeds, cumin seeds, and Aleppo pepper or red pepper flakes; cook until the seeds begin to pop, about 30 seconds.",
            "Add the onion and cook until it begins to brown, 5 to 7 minutes. Add the garlic and cook 2 to 3 minutes more. Stir in the turmeric.",
            "Rice cooker: Add the drained rice, the cloves, cardamom, cinnamon, and the sautéed onion mixture to the rice cooker. Add the water and salt; stir to combine. Cook on the regular rice cycle.",
            "Fluff the rice with a fork, picking out the whole cloves, cardamom pod, and cinnamon stick as you find them (or leave them in and warn guests)."
          ]
        }
      ]
    },
    {
      title: "Noodles",
      subsections: [
        {
          title: "Italian",
          recipes: [
            {
              title: "BIG Noods alla Gin with Sungold Tomatoes",
              servings: "4 to 6   |   Prep: 40 minutes   |   Total: 50 minutes",
              comments: [
                "Fresh lasagna sheets are called for here for their fun, floppy volume on the plate, but any pasta shape — fresh or dried — works well.",
                "Vodka can stand in for the gin."
              ],
              source: "The Club, by Molly Baz",
              ingredientGroups: [
                { label: "Prep", ingredients: ["2 pints Sungold or cherry tomatoes, halved", "1 yellow onion, finely chopped", "6 garlic cloves, sliced"] },
                { label: "Sauce", ingredients: ["3 tablespoons unsalted butter", "Kosher salt", "3 ounces double concentrated tomato paste (about 3/4 of a tube)", "1 tablespoon chopped Calabrian chilies", "1/4 cup gin or vodka", "1/4 cup heavy cream", "1 1/2 ounces (about 3/4 cup) finely grated Parmigiano-Reggiano"] },
                { label: "Pasta", ingredients: ["12 ounces fresh lasagna sheets (or any pasta shape, fresh or dried)"] },
                { label: "To finish", ingredients: ["Handful of basil", "Olive oil, for drizzling", "More grated Parmigiano-Reggiano"] }
              ],
              steps: [
                "Bring a large pot of salted water to a boil.",
                "Prep: Cut the tomatoes in half. Finely chop the onion and slice the garlic.",
                { lead: "Sungold sauce:", bullets: [
                  "Heat the butter in a large Dutch oven over medium heat. Add the onion and a big pinch of salt; cook, stirring occasionally, until soft and golden, about 10 minutes.",
                  "Add the garlic and cook 2 minutes more.",
                  "Stir in the tomato paste and Calabrian chilies. Cook, stirring occasionally, until the tomato paste starts to caramelize and turn a deeper red, about 5 minutes.",
                  "Stir in the gin and cook until fully evaporated, about 1 minute.",
                  "In a small measuring cup, stir 1/4 cup of the hot pasta water into the cream to temper it (this warms the cream so it doesn't break the sauce). Stir the tempered cream into the sauce.",
                  "Stir in the Parmesan. Remove from heat and cover to keep warm."
                ]},
                "Cook the pasta: Add the lasagna sheets to the boiling water, tearing them in half and separating them as you add them; stir to keep them from sticking. Cook about 1 minute less than the package directions. Reserve 1/2 cup pasta water, then drain.",
                "Add the noodles and the remaining tomatoes to the pot of sauce. Return to medium heat and cook, stirring gently so as not to break up the noodles, until the tomatoes just begin to wilt, 1 to 2 minutes. Loosen with pasta water as needed.",
                "Divide among bowls; top with basil, a drizzle of olive oil, and more Parmesan."
              ]
            },
            {
              title: "Artichoke Pesto Pasta with Fried Peppercorns",
              servings: "4   |   Total: 30 minutes",
              comments: ["The fried peppercorns are worth making extra of — Molly Baz notes they're a great crispy, spicy garnish on all sorts of dishes."],
              source: "The Club, by Molly Baz",
              ingredientGroups: [
                { label: "Prep", ingredients: ["2 to 3 lemons (1 1/2 for peel and juice; remaining 1/2 to 1 lemon reserved for finishing)", "1 large bunch flat-leaf parsley, leaves and tender stems picked (about 2 cups packed)", "1 large or 2 small garlic cloves", "2 ounces Parmigiano-Reggiano, finely grated (about 3/4 cup), divided", "One 14.5- to 16-ounce jar marinated artichokes (preferably Mezzetta), drained, brine reserved"] },
                { label: "Pesto", ingredients: ["1/3 cup olive oil", "3/4 cup (2 ounces) blanched almonds", "2 teaspoons kosher salt"] },
                { label: "Pasta", ingredients: ["1 pound mezzi rigatoni", "Kosher salt, for the pasta water"] },
                { label: "Fried peppercorns", ingredients: ["2 tablespoons olive oil", "2 tablespoons black peppercorns", "Kosher salt, to taste"] },
                { label: "To finish", ingredients: ["One 8-ounce ball burrata", "More grated Parmigiano-Reggiano"] }
              ],
              steps: [
                "Prep: Remove the peel from 1 1/2 lemons in long strips with a vegetable peeler; squeeze 1/4 cup juice from the lemons (reserve more lemon for finishing).",
                "Pesto: In a food processor, process the lemon peels until finely chopped. Add the parsley and process until roughly chopped. Add the garlic, artichokes, artichoke brine, olive oil, almonds, half the Parmesan, and the salt; process until a coarse pesto forms. Taste; add lemon juice if needed.",
                "Cook the pasta: Bring a large pot of heavily salted water to a boil. Add the rigatoni and cook to al dente, 1 to 2 minutes less than the package directions. Reserve 1 cup pasta water, then drain.",
                { lead: "Fried peppercorns (meanwhile, as the pasta boils):", bullets: [
                  "Add the remaining 2 tablespoons olive oil to your smallest skillet. When shimmering, add the peppercorns. Toast, swirling the pan, until fragrant and slightly darkened, about 2 minutes.",
                  "Remove from heat and let rest in the oil until they stop popping. Transfer to a paper-towel-lined plate with a slotted spoon.",
                  "Let cool, then roughly chop. Season generously with salt."
                ]},
                "Plate it up: Return the pasta to the pot and add the pesto. Set over medium-low heat. Add 1/2 cup of the reserved pasta water and the remaining Parmesan; toss vigorously until the sauce emulsifies and coats the pasta. Add more pasta water or lemon juice to loosen if needed.",
                "Divide among plates and top with torn burrata, a final grating of Parmesan, and the fried peppercorns."
              ]
            },
            {
              title: "Lemon Fusilli with Arugula",
              favorite: true,
              servings: "4 to 5   |   Prep: 10 minutes   |   Cook: 30 minutes   |   Total: 40 minutes",
              source: "Food Network, by Ina Garten, from Barefoot Contessa at Home",
              ingredientGroups: [
                { label: "Lemon cream sauce", ingredients: ["1 tablespoon good olive oil", "1 tablespoon minced garlic (2 cloves)", "2 cups heavy cream", "Zest and juice of 2 lemons", "Kosher salt and freshly ground black pepper"] },
                { label: "Broccoli", ingredients: ["1 bunch broccoli, cut into florets"] },
                { label: "Pasta", ingredients: ["1 pound dried fusilli pasta"] },
                { label: "To finish", ingredients: ["1/2 pound baby arugula (or 2 bunches common arugula, leaves cut in thirds)", "1/2 cup freshly grated Parmesan", "1 pint grape or cherry tomatoes, halved", "1 remaining lemon, sliced 1/4-inch thick"] }
              ],
              steps: [
                "Lemon cream sauce: Heat the olive oil in a medium saucepan over medium heat; add the garlic and cook 60 seconds. Add the cream and bring to a boil. Add the lemon zest and juice; simmer over low heat until thickened, about 20 minutes. Season with salt and pepper.",
                "Meanwhile, cook the broccoli florets in a pot of boiling salted water 3 to 5 minutes, until tender but still firm. Drain and set aside.",
                { lead: "Pasta:", bullets: [
                  "Bring a large pot of water to a boil; add 1 tablespoon salt and the pasta. Cook according to the package directions, about 12 minutes. Drain.",
                  "Return the pasta to the pot. Immediately add the cream mixture and cook over medium-low heat 3 minutes, until most of the sauce is absorbed."
                ]},
                "Pour the hot pasta into a large bowl; add the arugula, Parmesan, tomatoes, and cooked broccoli.",
                "Cut the remaining lemon in half lengthwise, slice 1/4-inch thick crosswise, and add to the pasta.",
                "Toss well, season to taste, and serve hot."
              ]
            },
            {
              title: "Christy's Pesto (Adapted)",
              servings: "Six 2-person servings",
              comments: ["Walnuts can be swapped for pine nuts or pecans, or a mix of the two."],
              source: "Family recipe card (\"Christy's Pesto, Adapted\")",
              ingredientGroups: [
                { ingredients: ["6 cloves garlic", "4 cups fresh basil leaves (about 2 bunches, stemmed)", "3/4 cup olive oil", "1 cup chopped walnuts", "1 teaspoon salt", "1 cup grated Parmesan cheese", "1 tablespoon warm water"] }
              ],
              steps: [
                "Mince the garlic in a food processor.",
                "Add the basil and pulse until finely chopped.",
                "With the processor running, add the olive oil, walnuts, salt, Parmesan, and warm water; process until smooth.",
                "Portion into individual packages (3 heaping tablespoons each) and freeze."
              ]
            }
          ]
        },
        {
          title: "Asian",
          recipes: []
        }
      ]
    },
    {
      title: "Baking",
      subsections: [
        { title: "Savory", recipes: [] },
        {
          title: "Sweet",
          recipes: [
            {
              title: "Eric's Chocolate Chip Cookies",
              servings: "About 3 dozen cookies",
              comments: ["Based on the classic Toll House chocolate chip cookie recipe, with a few of Eric's own touches — rolled oats and roughly chopped pecans."],
              source: "Base recipe: Nestlé Toll House (https://www.verybestbaking.com/toll-house/recipes/chocolate-chip-cookies/)",
              ingredientGroups: [
                { label: "Dry ingredients", ingredients: ["2 1/4 cups all-purpose flour", "1 cup rolled quick oats", "1 teaspoon baking soda", "1 teaspoon salt"] },
                { label: "Creamed base", ingredients: ["1 cup (2 sticks) unsalted butter, softened", "3/4 cup granulated sugar", "3/4 cup packed brown sugar"] },
                { label: "Added to the creamed base", ingredients: ["1 teaspoon vanilla extract", "2 large eggs"] },
                { label: "Folded in", ingredients: ["2 cups (12 ounces) semisweet chocolate chips", "1 cup pecans, very roughly chopped into big pieces"] }
              ],
              steps: [
                "Whisk together the flour, oats, baking soda, and salt in a medium bowl; set aside.",
                "Cream the butter and sugars: In the bowl of a stand mixer fitted with the paddle attachment, beat the butter, granulated sugar, and brown sugar on medium-high speed until pale and fluffy, about 3 to 4 minutes.",
                "Add the vanilla and eggs; continue beating on medium speed until fully incorporated and the mixture looks well emulsified.",
                "With the mixer on low speed (or by hand), add the flour mixture and mix just until no dry streaks remain — the dough should be stiff.",
                "Fold in the chocolate chips and pecans by hand.",
                "Cover and refrigerate the dough for at least 1 hour (and up to 2 days) to firm up before baking.",
                "When ready to bake, preheat the oven to 375°F (190°C) and line baking sheets with parchment.",
                "Using an ice cream scoop, portion generous mounds of dough onto the prepared sheets, spacing them a few inches apart.",
                "Bake 11-13 minutes, until the edges are golden brown and the centers still look slightly underbaked. Cool on the baking sheet for 5 minutes before transferring."
              ]
            },
            {
              title: "Chocolate \"Birthday Cake\"",
              servings: "One large sheet cake or a 2-layer 9-inch cake   |   Cook: 40-45 minutes",
              comments: [
                "For a single layer, halve the butter, sugar, chocolate, flour, baking soda, salt, vanilla, and water as noted below. For 1 1/2 eggs: whisk 2 eggs together and use 3/4 of the mixture.",
                "Don't halve the frosting, even for a single layer — a full batch is right (a half batch isn't quite enough)."
              ],
              source: "Family recipe card written by Grandmother Brenda; the single-layer/half-batch margin annotations are from Lauren",
              ingredientGroups: [
                { label: "Creamed base", ingredients: ["1 cup (2 sticks) butter [1 stick]", "2 cups sugar [1 cup]", "3 eggs [1 1/2 eggs]", "2 teaspoons vanilla [1 teaspoon]"] },
                { label: "Chocolate", ingredients: ["4 oz unsweetened chocolate [2 oz]"] },
                { label: "Dry ingredients", ingredients: ["2 2/3 cups flour [1 1/3 cups]", "2 teaspoons baking soda [1 teaspoon]", "1 teaspoon salt [1/2 teaspoon]"] },
                { label: "Liquid", ingredients: ["Up to 2 cups water, added gradually as needed [up to 1 cup]"] },
                { label: "Frosting", ingredients: ["2 cups confectioners' sugar (be generous — you may want more)", "3/4 cup butter", "1 teaspoon vanilla", "2-3 oz unsweetened chocolate, melted"] }
              ],
              steps: [
                "Cream the butter; add the sugar, then the eggs and vanilla, beating well after each addition.",
                "Melt the chocolate in the microwave (20-30 second bursts, stirring between, until smooth) and add to the creamed mixture.",
                "Sift together the flour, baking soda, and salt.",
                "Add the flour mixture to the creamed mixture alternately with the water, mixing just until combined. You likely won't need the full 2 cups of water — add enough to make a smooth, pourable batter.",
                "Bake in a large buttered pan, or two buttered 9-inch round layer pans, for 40-45 minutes at 325°F.",
                "Frost after the layer(s) are completely cool, on a baking rack.",
                "Frosting: Cream the confectioners' sugar with the butter until smooth. Add the vanilla and beat well.",
                "Melt the 2-3 oz chocolate and add to the frosting; mix until smooth. Add a bit more confectioners' sugar if needed to reach a spreadable consistency.",
                "Spread over the cooled cake."
              ]
            },
            {
              title: "Nana's Poundcake",
              favorite: true,
              servings: "1 loaf or bundt cake   |   Cook: 90 minutes",
              comments: ["A four-generation family recipe."],
              source: "Family recipe, credited to Nana, via Lauren's blog post \"Nana's Poundcake, Food, and Cultural Connection\"",
              ingredientGroups: [
                { label: "Cake", ingredients: ["1/2 pound salted butter (2 sticks), softened", "1 3/4 cups sugar", "5 eggs", "2 cups sifted flour", "2 tablespoons vanilla"] }
              ],
              steps: [
                "Cream the butter and sugar.",
                "Add the eggs one at a time, beating constantly.",
                "Add the flour and vanilla.",
                "Pour into a well-greased loaf pan or bundt pan.",
                "Bake at 350°F for 90 minutes."
              ]
            },
            {
              title: "Brenda's Noodle Kugel",
              favorite: true,
              source: "Family recipe card, credited to Brenda",
              comments: ["Can be assembled up to 2 days ahead and refrigerated — hold the topping until ready to bake."],
              ingredientGroups: [
                {
                  label: "Noodles",
                  ingredients: ["1 lb. extra-wide egg noodles"]
                },
                {
                  label: "Filling",
                  note: "mix together",
                  ingredients: [
                    "8 oz. cream cheese, softened",
                    "1 cup sour cream",
                    "1 stick (1/2 cup) butter, softened",
                    "1/2 cup sugar",
                    "1/2 teaspoon vanilla extract",
                    "3 eggs",
                    "1 package golden raisins"
                  ]
                },
                {
                  label: "Topping",
                  ingredients: [
                    "1/2 stick (1/4 cup) butter, melted",
                    "1 1/2 cups corn flakes"
                  ]
                }
              ],
              steps: [
                "Preheat oven to 350°F. Grease a large Pyrex casserole dish.",
                "Cook noodles according to package instructions. Drain thoroughly.",
                "Mix the filling ingredients together until combined, then fold in the drained noodles. Transfer to the prepared casserole.",
                "Bake uncovered at 350°F for 30–45 minutes. Remove from oven and let cool.",
                "Mix the melted butter with the corn flakes and spread over the cooled casserole.",
                "Return to the oven and bake for another 15 minutes, until the topping is golden and crisp."
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Dressings",
      recipes: [
        {
          title: "Lemon Mustard Vinaigrette",
          servings: "6   |   Prep: 5 minutes",
          comments: ["Garlic doubled from the original recipe, and microplaned rather than minced for a smoother, more evenly distributed flavor."],
          source: "https://www.theharvestkitchen.com/lemon-mustard-vinaigrette/",
          ingredientGroups: [
            { ingredients: ["1 1/2 tablespoons Dijon mustard", "1/4 cup freshly squeezed lemon juice", "1 teaspoon apple cider vinegar", "2 teaspoons honey or pure maple syrup", "4 small cloves garlic, microplaned", "1/2 teaspoon dried oregano", "1/4 teaspoon dried basil", "3/4 cup extra virgin olive oil", "1/2 teaspoon kosher salt", "1/4 teaspoon freshly ground black pepper"] }
          ],
          steps: [
            "Add all ingredients except the salt and pepper to a mason jar. Seal tightly and shake well (or whisk together in a bowl, adding the oil in a steady stream).",
            "Season with the salt and pepper to taste."
          ]
        },
        {
          title: "Greek Salad Dressing",
          servings: "6   |   Prep: 5 minutes",
          comments: ["Garlic doubled from the original recipe, and microplaned rather than minced for a smoother, more evenly distributed flavor."],
          source: "https://www.loveandlemons.com/greek-salad-dressing/",
          ingredientGroups: [
            { ingredients: ["1/4 cup extra-virgin olive oil", "3 tablespoons red wine vinegar", "2 garlic cloves, microplaned", "1/2 teaspoon dried oregano, plus more for sprinkling", "1/4 teaspoon Dijon mustard", "1/4 teaspoon sea salt", "Freshly ground black pepper, to taste"] }
          ],
          steps: [
            "In a small bowl, whisk together the olive oil, vinegar, garlic, oregano, mustard, salt, and several grinds of pepper."
          ]
        }
      ]
    },
    {
      title: "Desserts",
      recipes: []
    }
  ]
};

module.exports = data;
