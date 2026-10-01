'use strict';
const fs = require('fs');
const path = require('path');
const data = require('./cookbook_data.js');
const { displayTitle } = require('./recipe_utils.js');

// ── Cluster assignments ────────────────────────────────────────────────────
// Recipes not in this map are rendered without a cluster level in the nav.
// Add entries here whenever a subsection grows large enough to need grouping.
const CLUSTER_MAP = {
  // Chicken — General (American/contemporary)
  'Baked Crunchy Hot Honey Chicken':                      'General',
  'Brown Butter Sage Skillet Chicken':                    'General',
  'Company Baked Chicken':                                'General',
  'Creamy Spinach-Artichoke Chicken Stew':                'General',
  'Deep Fried BBQ Chicken Stuffed Pizzadilla':            'General',
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
  // Vegetables — General
  'Lentil Chili':                                        'General',
  // Vegetables — Italian
  'Eggplant Involtini':                                   'Italian',
  'Eggplant Involtini alla Siciliana':                    'Italian',
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
  // Pork — General
  'Sloppy Moes':                                         'General',
  // Pork — Latin/South American
  'Slow Cooker Pork Mole':                               'Latin/South American',
  'Haitian Pork Griot':                                  'Latin/South American',
  'Carnitas':                                            'Latin/South American',
  // Pork — Korean-inspired
  'Crispy Pork Lettuce Wraps With Spicy Cucumbers':      'Korean-inspired',
  // Pork — Chinese
  'Moo Shu Mushrooms':                                   'Chinese',
  // Noodles — General
  'Creamy Baked Mac and Cheese':                         'General',
  'Spinach Lasagna':                                     'Italian',
  // Noodles — Italian
  'Brie Linguine':                                       'Italian',
  'Crisp Gnocchi with Sausage and Peas':                 'Italian',
  'Crispy-Crackly Minty-Pea Lasagna':                   'Italian',
  'Lisa\'s Angel Hair Tomato Basil Toss':                'Italian',
  'Nuala\'s Riccota Penne':                              'Italian',
  'Pasta with Sausage, Basil, and Mustard':              'Italian',
  'Pasta (or Ravioli) with Brown Butter and Crispy Sage':  'Italian',
  'Pasta with Spicy Sausages, Tomatoes, Rosemary and Olives': 'Italian',
  'Tagliatelle with Mushrooms, Sage Butter and Toasted Hazelnuts': 'Italian',
  'Three Cheese Manicotti':                              'Italian',
  'Browned Garlic Butter Creamed Corn Ravioli':         'Italian',
  'Caramelized Shallot Pasta':                          'Italian',
  'Homemade Butternut Squash Ravioli':                  'Italian',
  'Linguine with Chickpeas, Broccoli and Ricotta':      'Italian',
  'Linguine with White Clam Sauce':                     'Italian',
  'Pasta Alla Norma':                                   'Italian',
  'Pasta with Gorgonzola and Arugula':                  'Italian',
  'Quick Ragu with Ricotta and Lemon':                  'Italian',
  'Sheet-Pan Gnocchi with Asparagus, Leeks and Peas':   'Italian',
  'Spaghetti Carbonara':                                'Italian',
  'Spaghetti with Burrata and Garlic-Chili Oil':        'Italian',
  'Spaghetti with Fresh Tomato and Basil Sauce':        'Italian',
  // Noodles — Mediterranean/Greek
  '"Finnish" Baked Feta Pasta':                         'Mediterranean/Greek',
  // Noodles — Middle Eastern/Persian
  'Preserved Lemon Za\'atar Pasta':                     'Middle Eastern/Persian',
  'Classic Stuffed Shells':                             'Italian',
  // Noodles — General
  'Four-Cheese Truffled Macaroni and Cheese':           'General',
  'Pasta with Corn, Mint and Red Onions':               'General',
  'Smoked Gouda Mac and Cheese':                        'General',
  '30 Minute Artichoke and Pea Rigatoni':               'Italian',
  'Artichoke Pesto Pasta with Fried Peppercorns':       'Italian',
  'BIG Noods alla Gin with Sungold Tomatoes':           'Italian',
  "Christy's Pesto (Adapted)":                          'Italian',
  'Lemon Fusilli with Arugula':                         'Italian',
  'Burst Tomato Burrata Pasta':                         'Italian',
  'Ravioli with Sage Brown Butter Sauce':               'Italian',
  'Rigatoni with Easy Vodka Sauce':                     'Italian',
  'Chili Crisp Fettuccine Alfredo with Spinach':        'General',
  // Noodles — Thai
  'Fried Drunken Noodles with Chicken (Phad Kii Maw Gai)': 'Thai',
  // Noodles — Korean-inspired
  'Kimchi Udon with Scallions':                          'Korean-inspired',
  // Noodles — Chinese
  'Biang Biang Noodles with Chili Oil (You Po Mian)':   'Chinese',
  'Ginger-Orange Broccoli and Noodles':                 'Chinese',
  'Sesame Peanut Noodles':                              'Chinese',
  'Spicy Sichuan Noodles':                              'Chinese',
  // Noodles — Japanese
  'Sesame-Brown Butter Udon Noodles':                   'Japanese',
  'Stir-Fried Udon Noodles With Pork and Scallions':    'Japanese',
  // Lamb — Mediterranean/Greek
  'Garlic & Rosemary Grilled Lamb Chops':                'Mediterranean/Greek',
  // Lamb — Middle Eastern/Persian
  'Lula Kebabs':                                         'Middle Eastern/Persian',
  // Lamb — Indian
  'Luscious Tandoori Lamb Chops':                        'Indian',
  // Beef — General
  'Four Peppercorn Crusted Rotisserie Rib Roast':        'General',
  'The Best Passover Brisket':                           'General',
  "Brenda's Brisket":                                    'General',
  'Cranberry-Chili Brisket':                             'General',
  'Sous Vide Beef Back Ribs':                            'General',
  'Hearty Beef Stew With Red Onions and Ale':            'General',
  // Beef — French/Continental
  'Dijon and Cognac Beef Stew':                          'French/Continental',
  // Beef — Italian
  'Beef Involtini':                                       'Italian',
  'Asian Braised Short Ribs':                            'Chinese',
  // Shellfish — General
  'Stuffed Eggplant Creole':                             'General',
  'Shrimp with Orzo and Peas':                           'General',
  'Spicy Grilled Shrimp':                                'General',
  'Bacon-Wrapped Scallops with Chili Butter':            'General',
  // Shellfish — French/Continental
  'Moules Marinières':                                   'French/Continental',
  // Shellfish — Italian
  'Shrimp Scampi with Linguini':                         'Italian',
  // Shellfish — Chinese
  'Yang Chow Slippery Shrimp':                           'Chinese',
  // Fish — General
  'Dry-Brined Salmon':                                   'General',
  'Baked Lemon Salmon with Creamy Dill Sauce':           'General',
  'Sriracha Maple Salmon':                               'General',
  'Fish and Chips with Malt Vinegar Mayonnaise':         'General',
  // Fish — French/Continental
  'Smoked Salmon Niçoise Salad':                         'French/Continental',
  // Fish — Italian
  'Sole with Lemon-Caper Sauce':                         'Italian',
  // Fish — Vietnamese
  'Fast Vietnamese Caramel Bluefish':                    'Vietnamese',
  // Fish — Japanese
  'Spicy Tuna Salad with Crispy Rice':                   'Japanese',
  // Ground Beef — General
  'Taco Night!!':                                        'General',
  'Sweet Potato Shepherd\'s Pie':                        'General',
  'Taco Soup':                                           'General',
  // Ground Beef — Korean-inspired
  'Korean Beef Bowl':                                    'Korean-inspired',
  // Noodles: Italian — Middle Eastern/Persian
  'Spiced Meatballs with Pappardelle':                   'Middle Eastern/Persian',
  // Noodles: Italian — Mediterranean/Greek
  'One-Pan Orzo with Spinach and Feta':                  'Mediterranean/Greek',
  // Sauces — Italian
  'Fresh Tomato Pizza Sauce':                            'Italian',
  // Sauces — Middle Eastern/Persian
  'Yemenite Green Hot Sauce (Zhug)':                     'Middle Eastern/Persian',
  // Vegetable Sides — General
  'Tomato Cobbler With Ricotta Biscuits':                'General',
  // Dairy — General
  'Homemade Mozzarella':                                 'General',
  // Dressings — General
  'Christy\'s Dressing':                                 'General',
  'Horseradish Sauce':                                   'General',
  'Steak Seasoning Rub':                                 'General',
  // Sauces — General
  'Bo\'s Barbeque Sauce':                                'General',
  'Cherry Barbecue Sauce':                               'General',
  // Sauces — Moroccan/North African
  'Moroccan Preserved Lemon Yogurt Sauce':              'Moroccan/North African',
  // Sauces — Middle Eastern/Persian
  'Tahini Sauce With Garlic and Lemon':                 'Middle Eastern/Persian',
  // Sauces — Indian
  'Authentic Raita':                                    'Indian',
  // Sauces — Italian
  'Garlic and Oregano Pesto':                            'Italian',
  'Sun-Dried Tomato Cream Sauce':                        'Italian',
  // Dressings — Latin/South American
  'Authentic Chimichurri':                               'Latin/South American',
  // Preserves & Pickles — General
  'Dill Pickles':                                        'General',
  'Quick Pickled Green Onions':                          'General',
  'Quick Pickled Red Onions':                            'General',
  // Preserves & Pickles — Latin/South American
  'Pikliz':                                              'Latin/South American',
  // Preserves & Pickles — Moroccan/North African
  'Preserved Lemons':                                    'Moroccan/North African',
  // Desserts — General
  'Christy\'s Easy Lemon Icebox Pie':                    'General',
  'Fresh Cranberry Mold':                                'General',
  'Lauren\'s Banana Pudding':                            'General',
  'Millie\'s Cobbler':                                   'General',
  'Summer Pudding':                                      'General',
  'Bonfire Night Cake':                                  'General',
  'Fresh Southern Peach Cobbler':                        'General',
  // Desserts — Italian
  'Classic Tiramisu':                                    'Italian',
  'Cassata Siciliana':                                    'Italian',
  'Mango with Sticky Rice (Khao Neow Mamuang)':         'Thai',
  // Drinks — General
  'Apple Pie a la Mode Shake':                           'General',
  'Christy\'s Iced Tea':                                 'General',
  'Melon Ball':                                          'General',
  'Aperitivo Numero Uno':                                'Italian',
  'Peanut Butter-Chocolate Shake':                       'General',
  'Very Berry Shake':                                    'General',
  // Turkey — General
  'Expertly Spiced and Glazed Roast Turkey':             'General',
  'Turkey and Quinoa Meatloaf':                          'General',
  // Turkey — Indian
  'Turkey Tikka Masala':                                 'Indian',
  // Other (Meat Mains) — General
  "Christy's Jambalaya":                                 'General',
  // Other (Meat Mains) — French/Continental
  'Peppered Duck Breast With Red Wine Sauce':            'French/Continental',
  // Other (Meat Mains) — Italian
  'Sheet-Pan Italian Sub Dinner':                        'Italian',
  // Other (Meat Mains) — Japanese
  "Naomi's Nabe (Japanese Hot Pot)":                     'Japanese',
  // Tofu — General
  'Tofu Stir Fry':                                       'General',
  'Sesame Ginger Tofu and Veggie Stir Fry':              'General',
  // Tofu — West African
  'Baked Tofu With Peanut Sauce and Coconut-Lime Rice':  'West African',
  // Mushroom — Italian
  'Oven Polenta with Roasted Mushrooms and Thyme':       'Italian',
  'Stuffed Portobello Mushrooms with Crispy Goat Cheese': 'Italian',
  'Truffle Mushroom Risotto':                            'Italian',
  'Roasted Portobellos With Pesto':                      'Italian',
  // Vegetables — General
  'Smoky Chickpeas With Spinach':                       'General',
  // Vegetables — Italian
  'Roasted Tomatoes With White Beans and Basil':        'Italian',
  // Vegetables — Latin/South American
  'Slow Cooker Vegan Mole Chili':                        'Latin/South American',
  // Vegetables — Moroccan/North African
  'Moroccan Eggplant with Couscous':                     'Moroccan/North African',
  // Vegetables — Middle Eastern/Persian
  'Red Lentil Soup':                                     'Middle Eastern/Persian',
  'Vegan Stuffed Cabbage':                              'Middle Eastern/Persian',
  // Vegetables — Indian
  'Quick Chana Masala':                                  'Indian',
  'Curry Tomatoes and Chickpeas with Cucumber Yogurt':   'Indian',
  'Masoor Dal (Spiced Red Lentils)':                     'Indian',
  'Mattar Paneer (Peas and Paneer in Spiced Tomato Gravy)': 'Indian',
  // Vegetables — Thai
  'Thai Basil Eggplant':                                 'Thai',
  // Vegetables — Chinese
  'Kung Pao Eggplant':                                   'Chinese',
  'Sticky Sesame Cauliflower':                          'Chinese',
  // Tofu — Chinese
  'Silken Tofu With Spicy Soy Dressing':                 'Chinese',
  // Salads > Greens — General
  'Pear, Gorgonzola and Walnut Salad':                  'General',
  'Barbecue Bacon Wedge Salad with Grilled Corn':        'General',
  'Broccoli Salad':                                      'General',
  'Crunchy Romaine Toss':                                'General',
  'Boston Lettuce and Endives Salad':                   'General',
  'Shaved Brussels Sprouts Salad With Lemon and Pecorino': 'General',
  "Wood Ranch's Peanut Coleslaw":                       'General',
  'Yellow Mustard Potato Salad':                        'General',
  "Nechamie's Coleslaw Salad":                          'General',
  "Nechamie's Summer Salad":                            'General',
  "Nechamie's Popped Rice Salad":                                  'General',
  "Nechamie's Poppy Seed Salad":                                   'General',
  "Nechamie's Spinach and Egg Salad":                              'General',
  // Vegetables — Latin/South American
  'Chickpea Tacos':                                      'Latin/South American',
  'Sweet Potato and Black Bean Enchiladas':              'Latin/South American',
  // Salads > Greens — Italian
  'Roasted Cauliflower Salad':                           'Italian',
  // Salads > Greens — Mediterranean/Greek
  "Dad's Greek Salad":                                   'Mediterranean/Greek',
  // Salads > Greens — Indian
  'Indian Slaw':                                         'Indian',
  // Salads > Greens — Moroccan/North African
  'Moroccan-Style Carrot Salad':                        'Moroccan/North African',
  // Salads > Greens — Middle Eastern/Persian
  'Parsley Salad':                                      'Middle Eastern/Persian',
  'Chilled Cucumber Salad (Din Tai Fung Style)':         'Chinese',
  'Cucumber Salad with Sesame and Rice Vinegar':         'Chinese',
  // Salads > Pasta Salads — General
  'Chuck Wagon Barbecued Pasta Salad':                   'General',
  // Salads > Pasta Salads — Chinese
  'Asian Pasta Salad':                                   'Chinese',
  "Holly's Spicy Noodle Salad with Peanut Dressing":    'Chinese',
  // Vegetable Sides — General
  'Sautéed Mushrooms':                                   'General',
  'Western River Curry Chicken Salad':                   'General',
  'Brown Butter Mashed Potatoes':                        'General',
  'Crispy Smashed Potatoes':                             'General',
  'Herby Roasted Carrots and Radishes':                  'General',
  'Over-the-Top Scalloped Potatoes':                     'General',
  'Perfect Twice Fried French Fries':                    'General',
  'Baked Zucchini Fries':                              'General',
  'Beets With Horseradish and Pumpkin Seeds':           'General',
  'Brussels Sprouts With Pistachios and Lime':          'General',
  'Classic Potato Gratin':                              'General',
  'Classic Steakhouse Creamed Spinach':                 'General',
  'Crack Broccoli':                                     'General',
  "Kickin' Collard Greens":                             'General',
  // Vegetable Sides — Mediterranean/Greek
  // Vegetable Sides — Latin/South American
  'Eggplant Caponata':                                    'Italian',
  'Zucchini Involtini':                                   'Italian',
  'Mexican Street Corn (Elotes)':                       'Latin/South American',

  'Potatoes Gratin (Low Calorie)':                       'Mediterranean/Greek',
  'Red Cabbage With Walnuts and Feta':                  'Mediterranean/Greek',
  // Vegetable Sides — Chinese
  'Broccoli with Garlic Sauce':                          'Chinese',
  'Garlicky Broccoli Stir-Fry':                        'Chinese',
  'Stir-Fried Spinach With Garlic':                    'Chinese',
  // Vegetable Sides — Central/Eastern European
  // Vegetable Sides — Korean-inspired
  'Gochujang Stir-Fried Brussels Sprouts':              'Korean-inspired',

  'Potato Latkes':                                       'Central/Eastern European',
  // Baking: Sweet — General
  'All-Shortening Pie Crust':                            'General',
  'Blueberry Coffee Cake (Blueberry Boy Bait)':          'General',
  'Jumbo Banana-Nut Muffins':                            'General',
  'Mom’s Zucchini Bread':                          'General',
  'Pumpkin Gut Bread':                                   'General',
  'Kitchen Sink Cookies':                                'General',
  'Marble Brownies':                                     'General',
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
  'Passover Cake':                                       'Central/Eastern European',
  "Renee's Blintz Souffle":                              'Central/Eastern European',
  // Turkey — General
  'Bristol Farms Turkey Salad (Copycat)':                'General',
  // Dressings and Sauces — French/Continental
  'Béarnaise Sauce':                                     'French/Continental',
  // Appetizers — General
  "Artichoke Hors D'oeuvre":                             'General',
  'Shrimp Mold':                                         'General',
  "Barbara Glabman's Cheese Ball":                       'General',
  // Appetizers — Italian
  'Burrata Bruschetta Toasts':                           'Italian',
  'Marinated Anchovies and Prawns':                      'Italian',
  'Shrimp Dip':                                          'General',
  'Blooming Onions':                                     'General',
  'Fried Dill Pickles':                                  'General',
  'Jalapeño Poppers':                                   'General',
  // Appetizers — Central/Eastern European
  'Chopped Eggplant':                                    'Central/Eastern European',
  'Charoset (Ashkenazic Style)':                         'Central/Eastern European',
  'Eggplant Pkhali':                                     'Central/Eastern European',
  // Appetizers — Mediterranean/Greek
  'Gazpacho':                                            'Mediterranean/Greek',
  // Appetizers — Middle Eastern/Persian
  'Baba Ganoush':                                        'Middle Eastern/Persian',
  'Israeli Hummus':                                      'Middle Eastern/Persian',
  'Muhammara':                                           'Middle Eastern/Persian',
  // Appetizers — Korean-inspired
  'Kimchijeon (Korean Kimchi Pancake)':                                          'Korean-inspired',
  // Appetizers — Chinese
  'Creamy Ginger-Soy Dip':                              'Chinese',
  // Mushroom — Italian
  'Mushrooms Florentine':                                'Italian',
  // Baking Savory — General
  'Buttermilk Cornbread':                                'General',
  'Buttermilk Cheddar Jalapeno Cornbread':               'General',
  // Baking Savory — Italian
  "Susan's Calzones":                                    'Italian',
  'Eggplant Parm Pizza':                                 'Italian',
  'Grandma-Style Pizza Dough':                           'Italian',
  'Hot and Sweet Soppressata and Fennel Grandma Pie':   'Italian',
  // Baking Savory — French/Continental
  'Gruyere Quiche':                                      'French/Continental',
  'Mushroom and Gruyere Bread Pudding':                  'French/Continental',
  // Baking Savory — Central/Eastern European
  'Khachapuri Adjaruli (Georgian Cheese Bread Boat)':    'Central/Eastern European',
  // Baking Savory — Chinese
  'Scallion Pancakes':                                   'Chinese',
  // Baking: Bread — General
  'Ultra-Fluffy Milk Bread Rolls':                       'General',
  // Baking: Bread — Italian
  'Overnight Focaccia':                                  'Italian',
  'Same-Day Focaccia':                                   'Italian',
  // Baking: Bread — Central/Eastern European
  "Nechamie's Challah":                                  'Central/Eastern European',
  // Baking: Bread — Indian
  'Homemade Naan Bread':                                 'Indian',
  'Onion Kulcha (Whole Wheat)':                          'Indian',
  // Baking: Bread — Middle Eastern/Persian
  'Flaky Bread (Malawah)':                               'Middle Eastern/Persian',
  // Baking Sweet — General
  'Butter Pecan Coffee Cake':                            'General',
  // Breakfast — General
  'Baked Stuffed French Toast':                          'General',
  'Glazed Cinnamon Rolls (Tangzhong Version)':           'General',
  'Homemade Biscuits':                                   'General',
  'Raised Waffles':                                      'General',
  'Baked German Pancake (or Dutch Babies)':              'General',
  'Double Chocolate Muffins':                            'General',
  'Egg Strata':                                          'General',
  'Broiled Cod in Miso Sauce':                            'Japanese',
  'Grilled Shrimp and Green Onion Skewers':               'General',
  'Sea Scallops with Red Peppers and Tomatoes':           'Italian',
  'Mussels with Thai Broth':                             'Thai',
  'Linguine with Mussels':                               'Italian',
  'Eggplant Rolls in Spaghettini':                       'Italian',
  'Pasta con le Sarde':                                  'Italian',
  'Busiate (Sicilian Spiral Pasta)':                     'Italian',
  'Sage Pesto':                                          'Italian',
  'Linguine with Clams and Wild Mushrooms':               'Italian',
  'Baked Trout St. Helena':                              'Italian',
  'Tuna alla Siciliana':                                  'Italian',
  'Swordfish Involtini':                                  'Italian',
  'Soy-Salmon with Cilantro-Coconut Chutney':            'General',
  'Chicken with 40 Cloves of Garlic and Garlic Bread':   'Italian',
  'Lemon-Rubbed Chicken Legs with Garlic and Rosemary':  'General',
  'Stir-Fry Shrimp':                                     'Chinese',
  "Christy's Stir-Fry (Adapted)":                        'Chinese',
  'Rice with Dill':                                      'General',
  'Wild Mushroom Risotto':                               'Italian',
  'Creamy Louisiana Marinade':                           'General',
  "Nancy's Flank Steak":                                 'General',
  'Coq au Vin':                                          'French/Continental',
  'Chicken Breasts and Garlic Balsamic Vinegar':         'Italian',
  "Regina's Coffee Cake":                                'General',
  "Brenda's Chocolate Chip Cookies":                     'General',
  "Susan's Apple Pie":                                   'General',
  'Chinese Tomato Egg Stir-fry':                         'Chinese',
  // New recipes added 2026-09-28
  'Green Shakshuka with Feta':                           'Middle Eastern/Persian',
  'Spring Roll Salad with Peanut Dressing':              'Vietnamese',
  'Dumpling Tomato Salad with Chile Crisp Vinaigrette':  'Chinese',
  'Extra-Stuffed Veggie Burritos':                       'Latin/South American',
  'Aloo Gobi':                                           'Indian',
  'Baked Rajma (Punjabi-Style Red Beans With Cream)':    'Indian',
  'Cauliflower Curry':                                   'Indian',
  'Chickpea Tikka Masala':                               'Indian',
  'Gobhi Masaledaar':                                    'Indian',
  'Indian Spiced Zucchini and Tomatoes':                 'Indian',
  'Authentic Saag Paneer':                               'Indian',
  'Spicy Roasted Cauliflower with Sriracha and Sesame':  'General',
  'Shakshuka With Feta':                                 'Middle Eastern/Persian',
  // New recipes added 2026-09-30
  'Tom Kha Gai Soup':                                    'Thai',
  'Creamy Tortellini Soup':                              'Italian',
  'Blackberry Brie Grilled Cheese':                      'General',
  "Viral Trader Joe's Dumpling Bake":                    'Thai',
  'Saag Paneer Lasagna':                                 'Indian',
  'Burst Cherry Tomato Orzotto':                         'Italian',
  'Black Pepper Beef and Cabbage Stir-Fry':              'Chinese',
  // New recipes added 2026-10-01
  // Soups & Stews
  'Creamy Tomato Soup':                                  'General',
  'Pumpkin Soup':                                        'General',
  'Locro de Zapallo (Peruvian Pumpkin Stew)':                                    'Latin/South American',
  'French Onion Soup':                                   'French/Continental',
  'Lentil and Orzo Stew With Roasted Eggplant':          'Mediterranean/Greek',
  'West African Peanut Soup':                            'West African',
  'Spiced Chickpea Stew With Coconut and Turmeric':      'Indian',
  'Spicy Thai Kale Soup':                                'Thai',
  'Spring Hot-and-Sour Soup':                            'Chinese',
  // Vegetable Sides
  'Cornbread Dressing With Sausage and Corn Nuts':       'General',
  // Rice
  'Spanish Rice':                                        'Latin/South American',
  'Pink Risotto With Beet Greens and Roasted Beets':     'Italian',
  'Tomato Risotto':                                      'Italian',
  'Saffron Rice':                                        'Indian',
  'Cornbread Stuffing Fried Rice':                       'General',
  // Dairy
  'Clotted Cream':                                       'General',
  'Coconut Ice Cream':                                   'General',
  'Paneer':                                              'Indian',
  'Ghee':                                                'Indian',
  // Preserves & Pickles
  'Fig Jam':                                             'General',
  'Slow Cooker Apple Butter':                            'General',
  // Desserts
  'Old-Fashioned Butterscotch Pudding':                  'General',
  // Drinks
  'Sweet and Sour Mix':                                  'General',
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
  'French/Continental',
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

// Alphabetical sort key: strip leading "The" / "A" / "An" and lowercase.
function titleSortKey(t) {
  return t.replace(/^(the|an?)\s+/i, '').toLowerCase();
}

// Group recipes by CLUSTER_MAP entry; sort clusters by CLUSTER_ORDER; sort
// recipes alphabetically (ignoring leading article) within each cluster.
// Always returns [{cluster, recipes}] — never null.
function groupByCluster(recipes) {
  const clusterMap = new Map();
  for (const recipe of recipes) {
    const c = CLUSTER_MAP[recipe.title] || 'General';
    if (!clusterMap.has(c)) clusterMap.set(c, []);
    clusterMap.get(c).push(recipe);
  }
  // Sort clusters by CLUSTER_ORDER; unknown clusters go at the end.
  const sorted = [...clusterMap.entries()].sort(([a], [b]) => {
    const ai = CLUSTER_ORDER.indexOf(a);
    const bi = CLUSTER_ORDER.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
  // Sort recipes alphabetically within each cluster.
  return sorted.map(([cluster, recipes]) => ({
    cluster,
    recipes: [...recipes].sort((a, b) =>
      titleSortKey(a.title).localeCompare(titleSortKey(b.title))),
  }));
}

// ── Sub-subsection layout helper ─────────────────────────────────────────────
// Returns the nonEmpty list, the showSubSubs flag, and effectiveRecipes for the
// collapsed (single non-empty sub-subsection) case.  Used by buildNav and
// buildSectionContent to avoid repeating the same three-line derivation.
function getSubSubsectionLayout(sub) {
  const nonEmpty = sub.subsections.filter(ss => ss.recipes && ss.recipes.length > 0);
  const showSubSubs = nonEmpty.length > 1;
  const effectiveRecipes = showSubSubs ? null : (nonEmpty[0] ? nonEmpty[0].recipes : []);
  const hasAny = nonEmpty.length > 0;
  return { nonEmpty, showSubSubs, effectiveRecipes, hasAny };
}

// ── Content rendering ──────────────────────────────────────────────────────

function renderStep(step) {
  if (typeof step === 'string') return `<li>${esc(step)}</li>`;
  if (step.html) return `<li>${step.html}</li>`;
  const bullets = step.bullets.map(b => `<li>${esc(b)}</li>`).join('\n');
  return `<li><strong>${esc(step.lead)}</strong><ul class="sub-steps">${bullets}</ul></li>`;
}

function renderIngredientGroups(ingredientGroups) {
  return (ingredientGroups || []).map(g => {
    const note = g.note ? ` <span class="group-note">(${esc(g.note)})</span>` : '';
    const items = g.ingredients.map(i => typeof i === 'object' && i.html ? `<li>${i.html}</li>` : `<li>${esc(i)}</li>`).join('\n');
    const label = g.label ? `<h4>${esc(g.label)}${note}</h4>` : '';
    return `<div class="ing-group">${label}<ul class="ingredients">${items}</ul></div>`;
  }).join('\n');
}

function renderRecipe(recipe, idPrefix) {
  const id = recipe.id || `${idPrefix}-${slug(recipe.title)}`;
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
      <a class="link-btn" href="?recipe=${esc(id)}" target="_blank" rel="noopener" title="Open recipe in new tab" aria-label="Open ${esc(recipe.title)} in new tab">🔗 Link</a>
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

// Render a list of recipes grouped by cluster.
// clusterGroups: [{cluster, recipes}] from groupByCluster().
// suppressedClusters: additional cluster names to render without a heading
//   (always includes 'General'; also pass the parent subsection/section title
//   to prevent a cluster header that repeats its parent's name).
function renderRecipeList(recipes, idPrefix, clusterGroups, suppressedClusters = []) {
  const noHeader = new Set(['General', ...suppressedClusters]);
  const showHeaders = clusterGroups.length > 1;
  let html = '';
  for (const { cluster, recipes: cr } of clusterGroups) {
    if (!showHeaders || noHeader.has(cluster)) {
      html += cr.map(r => renderRecipe(r, idPrefix)).join('\n') + '\n';
    } else {
      const cid = `${idPrefix}--${slug(cluster)}`;
      html += `<div class="cluster-group" id="${esc(cid)}">
  <h4 class="cluster-heading">${esc(cluster)}</h4>
  ${cr.map(r => renderRecipe(r, idPrefix)).join('\n')}
</div>\n`;
    }
  }
  return html;
}


// ── Section filename ─────────────────────────────────────────────────────
function sectionFilename(sectionTitle) {
  return slug(sectionTitle) + '.html';
}

// ── Nav building ───────────────────────────────────────────────────────────
// currentSection: title of the section whose page is being built (pre-expanded).
// Non-current sections appear as plain links; current section shows full tree.

function buildNav(data, currentSection) {
  let nav = '<ul class="nav-l1">\n';

  for (const section of data.sections) {
    const sl = slug(section.title);
    const secId = `sec-${sl}`;
    const filename = sectionFilename(section.title);
    const isCurrent = section.title === currentSection;

    const hasContent = section.recipes
      ? section.recipes.length > 0
      : section.subsections
        ? section.subsections.some(s =>
            (s.recipes && s.recipes.length > 0) ||
            (s.subsections && s.subsections.some(ss => ss.recipes && ss.recipes.length > 0))
          )
        : false;

    nav += `<li class="nav-section${isCurrent ? ' current' : ''}${hasContent ? '' : ' empty'}" data-sec="${secId}">`;

    // Section heading row: expand/collapse arrow + navigation link (or span for current)
    nav += `<div class="nav-sec-row">`;
    if (hasContent) {
      nav += `<button class="nav-sec-arrow" data-toggle="${secId}-children" aria-label="Toggle section">▶</button>`;
    }
    if (isCurrent) {
      nav += `<span class="nav-hd section-hd current-section">${esc(section.title)}</span>`;
    } else {
      nav += `<a class="nav-hd section-hd" href="${esc(filename)}">${esc(section.title)}</a>`;
    }
    nav += `</div>`;

    // Full collapsible tree for all sections
    if (hasContent) {
      nav += `<ul class="nav-l2 collapsed" id="${secId}-children">`;

      if (section.recipes) {
        const clusterGroups = groupByCluster(section.recipes);
        const showClusterHeaders = clusterGroups.length > 1;
        for (const { cluster, recipes: cr } of clusterGroups) {
          const cid = `${sl}--${slug(cluster)}`;
          if (!showClusterHeaders || cluster === 'General') {
            cr.forEach(r => {
              const rid = r.id || `${sl}-${slug(r.title)}`;
              nav += navRecipeItem(rid, r, filename);
            });
          } else {
            nav += navClusterItem(cid, cluster, cr, sl, filename);
          }
        }
      } else if (section.subsections) {
        for (const sub of section.subsections) {
          const subsl = `${sl}-${slug(sub.title)}`;
          const subSecId = `sub-${subsl}`;

          if (sub.subsections) {
            // ── Sub-subsection case (e.g. With Meat / Meatless within Stovetop) ──
            // Dynamic suppression: only show the intermediate level when >1 sub-subsection is non-empty.
            const { nonEmpty, showSubSubs, effectiveRecipes, hasAny } = getSubSubsectionLayout(sub);

            nav += `<li class="nav-sub${hasAny ? '' : ' empty'}">`;
            nav += `<a class="nav-hd sub-hd" href="#${subSecId}" data-toggle="${subSecId}-children">${hasAny ? '<span class="arrow">▶</span>' : ''}${esc(sub.title)}</a>`;

            if (hasAny) {
              nav += `<ul class="nav-l3 collapsed" id="${subSecId}-children">`;
              if (showSubSubs) {
                // Render each sub-subsection as a collapsible item
                for (const ss of sub.subsections) {
                  if (!ss.recipes || ss.recipes.length === 0) continue;
                  const sssl = `${subsl}-${slug(ss.title)}`;
                  const ssId = `subsub-${sssl}`;
                  const ssGroups = groupByCluster(ss.recipes);
                  const showClusters = ssGroups.length > 1;
                  nav += `<li class="nav-subsub">`;
                  nav += `<a class="nav-hd subsub-hd" href="#${ssId}" data-toggle="${ssId}-children"><span class="arrow">▶</span>${esc(ss.title)}</a>`;
                  nav += `<ul class="nav-l3b collapsed" id="${ssId}-children">`;
                  const ssNoHeader = new Set(['General', ss.title]);
                  for (const { cluster, recipes: cr } of ssGroups) {
                    const cid = `${sssl}--${slug(cluster)}`;
                    if (!showClusters || ssNoHeader.has(cluster)) {
                      cr.forEach(r => {
                        const rid = r.id || `${sssl}-${slug(r.title)}`;
                        nav += navRecipeItem(rid, r, filename);
                      });
                    } else {
                      nav += navClusterItem(cid, cluster, cr, sssl, filename);
                    }
                  }
                  nav += '</ul></li>\n';
                }
              } else {
                // Collapsed: render the single non-empty sub-subsection's recipes directly
                const clusterGroups = groupByCluster(effectiveRecipes);
                const showClusterHeaders = clusterGroups.length > 1;
                const flattenSub = CLUSTER_ORDER.includes(sub.title);
                const subNoHeader = flattenSub ? new Set(CLUSTER_ORDER) : new Set(['General', sub.title]);
                for (const { cluster, recipes: cr } of clusterGroups) {
                  const cid = `${subsl}--${slug(cluster)}`;
                  if (!showClusterHeaders || subNoHeader.has(cluster)) {
                    cr.forEach(r => {
                      const rid = r.id || `${subsl}-${slug(r.title)}`;
                      nav += navRecipeItem(rid, r, filename);
                    });
                  } else {
                    nav += navClusterItem(cid, cluster, cr, subsl, filename);
                  }
                }
              }
              nav += '</ul>';
            }
            nav += '</li>\n';

          } else {
            // ── Original flat-recipes subsection ──
            const hasRecipes = sub.recipes && sub.recipes.length > 0;
            const clusterGroups = hasRecipes ? groupByCluster(sub.recipes) : null;
            const flattenSub = CLUSTER_ORDER.includes(sub.title);
            const subNoHeader = flattenSub
              ? new Set(CLUSTER_ORDER)
              : new Set(['General', sub.title]);

            if (sub.title === 'General') {
              // ── "General" subsection: render recipes directly, no nav header ──
              if (clusterGroups) {
                for (const { cluster, recipes: cr } of clusterGroups) {
                  cr.forEach(r => {
                    const rid = r.id || `${subsl}-${slug(r.title)}`;
                    nav += navRecipeItem(rid, r, filename);
                  });
                }
              }
            } else {
              const subArrow = hasRecipes ? '<span class="arrow">▶</span>' : '';
              nav += `<li class="nav-sub${hasRecipes ? '' : ' empty'}">`;
              nav += `<a class="nav-hd sub-hd" href="#${subSecId}" data-toggle="${subSecId}-children">${subArrow}${esc(sub.title)}</a>`;
              if (hasRecipes) {
                nav += `<ul class="nav-l3 collapsed" id="${subSecId}-children">`;
                const showClusterHeaders = clusterGroups && clusterGroups.length > 1;
                if (clusterGroups) {
                  for (const { cluster, recipes: cr } of clusterGroups) {
                    const cid = `${subsl}--${slug(cluster)}`;
                    if (!showClusterHeaders || subNoHeader.has(cluster)) {
                      cr.forEach(r => {
                        const rid = r.id || `${subsl}-${slug(r.title)}`;
                        nav += navRecipeItem(rid, r, filename);
                      });
                    } else {
                      nav += navClusterItem(cid, cluster, cr, subsl, filename);
                    }
                  }
                }
                nav += '</ul>';
              }
              nav += '</li>\n';
            }
          }
        }
      }

      nav += '</ul>';
    }
    nav += '</li>\n';
  }
  nav += '</ul>';
  return nav;
}

function navClusterItem(cid, cluster, recipes, idPrefix, pageFile) {
  let html = `<li class="nav-cluster">`;
  html += `<a class="nav-hd cluster-hd" href="${esc(pageFile)}#${esc(cid)}" data-toggle="${esc(cid)}-children"><span class="arrow">▶</span>${esc(cluster)}</a>`;
  html += `<ul class="nav-l4 collapsed" id="${esc(cid)}-children">`;
  recipes.forEach(r => {
    const rid = r.id || `${idPrefix}-${slug(r.title)}`;
    html += navRecipeItem(rid, r, pageFile);
  });
  html += '</ul></li>\n';
  return html;
}

function navRecipeItem(domId, recipe, pageFile) {
  const starHtml = recipe.favorite
    ? `<span class="nav-star">★</span>`
    : `<span class="nav-star"></span>`;
  return `<li class="nav-recipe"><a class="nav-recipe-link" data-recipe-title="${esc(recipe.title)}" href="${esc(pageFile)}#${esc(domId)}">${starHtml}<span class="nav-title">${esc(recipe.title)}</span></a></li>\n`;
}

// ── Single-section content HTML ────────────────────────────────────────────

function buildSectionContent(section) {
  const sl = slug(section.title);
  const secId = `sec-${sl}`;
  let html = '';

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

      if (sub.subsections) {
        // ── Sub-subsection case: dynamic suppression ──
        const { nonEmpty, showSubSubs } = getSubSubsectionLayout(sub);

        html += `<section id="${subSecId}" class="subsection">\n  ${sub.title !== 'General' ? `<h3 class="subsection-heading">${esc(sub.title)}</h3>` : ''}\n`;

        if (nonEmpty.length === 0) {
          html += `  <p class="empty"><em>No recipes yet.</em></p>\n`;
        } else if (showSubSubs) {
          // Render each sub-subsection with its own h4 heading
          for (const ss of sub.subsections) {
            if (!ss.recipes || ss.recipes.length === 0) continue;
            const sssl = `${subsl}-${slug(ss.title)}`;
            const ssId = `subsub-${sssl}`;
            const ssGroups = groupByCluster(ss.recipes);
            html += `<section id="${ssId}" class="sub-subsection">\n  <h4 class="sub-subsection-heading">${esc(ss.title)}</h4>\n`;
            html += renderRecipeList(ss.recipes, sssl, ssGroups, [ss.title]);
            html += `</section>\n`;
          }
        } else {
          // Collapsed: render the single non-empty sub-subsection's recipes directly (no h4)
          const flattenSub = CLUSTER_ORDER.includes(sub.title);
          const clusterGroups = groupByCluster(nonEmpty[0].recipes);
          html += renderRecipeList(nonEmpty[0].recipes, subsl, clusterGroups, flattenSub ? [...CLUSTER_ORDER] : [sub.title]);
        }

        html += `</section>\n`;

      } else {
        // ── Original flat-recipes subsection ──
        const hasSubRecipes = sub.recipes && sub.recipes.length > 0;
        const clusterGroups = hasSubRecipes ? groupByCluster(sub.recipes) : null;
        const flattenSub = CLUSTER_ORDER.includes(sub.title);
        html += `<section id="${subSecId}" class="subsection">
  ${sub.title !== 'General' ? `<h3 class="subsection-heading">${esc(sub.title)}</h3>` : ''}
  ${hasSubRecipes
    ? renderRecipeList(sub.recipes, subsl, clusterGroups, flattenSub ? [...CLUSTER_ORDER] : [sub.title])
    : '<p class="empty"><em>No recipes yet.</em></p>'}
</section>\n`;
      }
    }
    html += `</section>\n`;
  }
  return html;
}

// ── Search index (all recipes, all sections) ───────────────────────────────

function buildSearchIndex(data) {
  const index = [];
  for (const section of data.sections) {
    const filename = sectionFilename(section.title);
    const sl = slug(section.title);

    const addRecipes = (recipes, idPrefix) => {
      const clusterGroups = groupByCluster(recipes);
      const flat = clusterGroups.flatMap(g => g.recipes);
      flat.forEach(r => {
        const id = r.id || `${idPrefix}-${slug(r.title)}`;
        index.push({ title: r.title, page: filename, id, fav: r.favorite ? 1 : 0, section: section.title });
      });
    };

    if (section.recipes) {
      addRecipes(section.recipes, sl);
    } else if (section.subsections) {
      for (const sub of section.subsections) {
        const subsl = `${sl}-${slug(sub.title)}`;
        if (sub.subsections) {
          for (const ss of sub.subsections) {
            const sssl = `${subsl}-${slug(ss.title)}`;
            addRecipes(ss.recipes || [], sssl);
          }
        } else {
          addRecipes(sub.recipes || [], subsl);
        }
      }
    }
  }
  return index;
}

// ── Per-section cookbook data (for clipboard copy) ─────────────────────────

function buildSectionCookbookData(section) {
  const map = {};
  if (section.recipes) {
    for (const r of section.recipes) map[r.title] = r;
  } else if (section.subsections) {
    for (const sub of section.subsections) {
      if (sub.subsections) {
        for (const ss of sub.subsections) {
          for (const r of (ss.recipes || [])) map[r.title] = r;
        }
      } else {
        for (const r of (sub.recipes || [])) map[r.title] = r;
      }
    }
  }
  return map;
}

// ── Page template ─────────────────────────────────────────────────────────

function buildPage(section, navHtml, contentHtml, cookbookData) {
  const filename = sectionFilename(section.title);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(section.title)} — Muhlheim Family Cookbook</title>
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
    scroll-behavior: smooth;
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
    font-weight: bold;
    color: var(--nav-text);
    letter-spacing: 0.03em;
  }
  #nav-header a { text-decoration: none; color: inherit; }
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
    text-decoration: none;
  }
  .sr-item:hover { color: var(--nav-hover); background: #4e3522; }
  .sr-item .sr-star { flex-shrink: 0; width: 1.1em; color: var(--fav); }
  .sr-item .sr-title { flex: 1; padding-left: 0.55em; text-indent: -0.55em; }
  .sr-item .sr-section {
    font-size: 0.68rem; color: #7a6040; margin-left: 6px;
    flex-shrink: 0; padding-top: 0.1em; font-style: italic;
  }
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
  #expand-collapse-row {
    display: flex; width: 100%; border-bottom: 1px solid #5a3e28;
  }
  #expand-all, #collapse-all {
    flex: 1; display: flex; align-items: center; gap: 6px;
    padding: 7px 10px;
    font-size: 0.82rem; cursor: pointer;
    color: var(--nav-text);
    background: none; border: none;
    text-align: left;
  }
  #expand-all { border-right: 1px solid #5a3e28; }
  #expand-all:hover, #collapse-all:hover { background: #4e3522; }
  #expand-all .expand-icon { font-size: 0.85rem; color: #a8906e; }
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
  .nav-l1, .nav-l2, .nav-l3, .nav-l3b, .nav-l4 { list-style: none; }

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
  .nav-sec-row { display: flex; align-items: center; }
  .nav-sec-arrow {
    flex-shrink: 0;
    background: none;
    border: none;
    color: #a8906e;
    cursor: pointer;
    font-size: 0.65em;
    padding: 7px 4px 7px 14px;
    line-height: 1;
    transition: transform 0.15s;
  }
  .nav-sec-arrow.open { transform: rotate(90deg); }
  .nav-sec-arrow:hover { color: var(--nav-hover); }
  .section-hd {
    padding: 7px 14px 7px 4px;
    color: var(--nav-text);
    font-size: 0.88rem;
    font-weight: bold;
    flex: 1;
  }
  .nav-section.empty .nav-sec-row { padding-left: 14px; }
  .nav-section.empty .section-hd { padding-left: 0; }
  /* Non-current sections are <a> links */
  a.section-hd { color: #c4b09a; font-weight: normal; }
  a.section-hd:hover { color: var(--nav-hover); background: #4e3522; }
  /* Current section marker */
  .current-section { color: var(--nav-hover) !important; }
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

  /* Level 3 — clusters (or sub-subsections when present) */
  .nav-l3 { padding-left: 0; }
  .cluster-hd {
    padding: 4px 14px 4px 32px;
    font-size: 0.8rem;
    color: #c4ad90;
    font-style: italic;
  }

  /* Sub-subsection level (With Meat / Meatless beneath a subsection) */
  .nav-subsub { list-style: none; }
  .subsub-hd {
    display: block;
    padding: 4px 14px 4px 30px;
    font-size: 0.79rem;
    color: #b8a080;
    font-style: italic;
    text-decoration: none;
  }
  .subsub-hd:hover { color: var(--nav-hover); }
  /* nav-l3b: cluster list inside a sub-subsection */
  .nav-l3b { padding-left: 0; list-style: none; }
  .nav-l3b .cluster-hd { padding-left: 44px; }
  .nav-l3b .nav-l4 .nav-recipe-link { padding-left: 58px; }
  /* Direct recipe links under a sub-subsection (no cluster header) */
  .nav-l3b > li.nav-recipe > .nav-recipe-link { padding-left: 44px; font-size: 0.76rem; }

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
  /* Fixed-width star column */
  .nav-star {
    flex-shrink: 0;
    width: 1.1em;
    color: var(--fav);
    font-size: 0.85em;
    padding-top: 0.05em;
  }
  /* Title column — hanging indent on wrap */
  .nav-title {
    flex: 1;
    padding-left: 0.55em;
    text-indent: -0.55em;
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
  /* Cluster children (nav-l4) inside nav-l2: indent past cluster heading at 32px */
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
  .sub-subsection { margin-bottom: 24px; }
  .sub-subsection-heading {
    font-size: 1rem; color: var(--muted);
    font-style: italic;
    padding-bottom: 3px; margin-bottom: 12px;
    border-bottom: 1px dashed var(--border);
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
  .recipe.focused-hidden { display: none; }
  .cluster-group.all-hidden { display: none; }
  .sub-subsection.all-hidden { display: none; }
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
  .link-btn,
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
  .link-btn { text-decoration: none; }
  .link-btn:hover,
  .copy-btn:hover,
  .print-btn:hover { background: var(--border); color: var(--text); }
  .copy-btn.copied { background: #e6f4ea; border-color: #4caf50; color: #2e7d32; }

  /* ── Print media ── */
  @media print {
    @page { margin: 0.75in; }
    body { display: block !important; background: white !important; min-height: 0 !important; }
    #nav, #mobile-header, #cookbook-title, .print-btn, .copy-btn, .link-btn, .recipe-btns { display: none !important; }
    #main { padding: 0 !important; max-width: none !important; flex: none !important; }
    .section, .subsection, .cluster-group {
      margin: 0 !important; padding: 0 !important; border: none !important;
    }
    .section > h2, .subsection-heading, .cluster-heading { display: none !important; }
    .recipe:not(.printing) { display: none !important; }
    .recipe.printing {
      display: block !important;
      border: none !important; box-shadow: none !important;
      padding: 0 !important; margin: 0 !important;
      font-size: 0.88rem;
    }
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
  #mobile-header { display: none; }
  @media (max-width: 480px) {
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
    #nav {
      display: none;
      width: 100%;
      min-width: unset;
      position: static;
      height: auto;
    }
    #nav.nav-open {
      display: flex;
      position: fixed;
      top: 47px;
      left: 0;
      right: 0;
      z-index: 99;
      max-height: calc(80vh - 47px);
      overflow-y: auto;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }
    #nav-header { display: none; }
    #main { padding: 14px 12px; }
    .section-hd { padding: 10px 14px; }
    .sub-hd { padding: 8px 14px 8px 22px; }
    .cluster-hd { padding: 7px 14px 7px 32px; }
    .nav-recipe-link { padding-top: 6px; padding-bottom: 6px; }
    .recipe { padding: 14px 16px; }
    .recipe { scroll-margin-top: 57px; }
    #search { font-size: 16px; }
    #search-results { max-height: none; overflow-y: auto; flex-shrink: 0; }
    #search-results .sr-item { padding-top: 5px; padding-bottom: 5px; }
    #search-results .sr-label { padding-top: 5px; padding-bottom: 3px; }
  }
</style>
</head>
<body>

<div id="mobile-header">
  <span id="mobile-header-title"><a href="breakfast.html" style="color:inherit;text-decoration:none;">Muhlheim Family Cookbook</a></span>
  <button id="hamburger" aria-label="Toggle navigation" aria-expanded="false">☰</button>
</div>

<div id="nav">
  <div id="nav-header"><h1><a href="breakfast.html" id="cookbook-logo-link">Muhlheim Family Cookbook</a></h1></div>
  <div id="search-wrap">
    <div id="search-box-wrap">
      <input id="search" type="text" placeholder="Search recipes…" autocomplete="off">
      <button id="search-clear" title="Clear search">✕</button>
    </div>
  </div>
  <div id="search-results"></div>
  <button id="fav-toggle"><span class="star">★</span> Favorites only</button>
  <button id="alt-toggle"><span class="alt-icon">&#9650;</span> High Altitude</button>
  <div id="expand-collapse-row">
    <button id="expand-all"><span class="expand-icon">⊞</span> Expand all</button>
    <button id="collapse-all"><span class="collapse-icon">⊟</span> Collapse all</button>
  </div>
  <div id="nav-tree">
    ${navHtml}
  </div>
</div>

<div id="main">
  <h1 id="cookbook-title">Muhlheim Family Cookbook</h1>
  ${contentHtml}
</div>

<script>
(function () {
  const COOKBOOK_DATA = ${JSON.stringify(cookbookData, null, 2)};
  const CURRENT_PAGE = '${filename}';

  // ── Hamburger toggle (mobile) ─────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.textContent = isOpen ? '✕' : '☰';
    });
    nav.addEventListener('click', function (e) {
      if ((e.target.closest('.nav-recipe-link') || e.target.closest('.sr-item')) && window.innerWidth <= 480) {
        nav.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      }
    });
  }

  // ── Collapsible nav ───────────────────────────────────────────────────

  function saveNavState(listId, isOpen) {
    try {
      var state = JSON.parse(localStorage.getItem('navState') || '{}');
      state[listId] = isOpen;
      localStorage.setItem('navState', JSON.stringify(state));
    } catch (e) {}
  }

  function toggleList(listId, headingEl) {
    const list = document.getElementById(listId);
    if (!list) return;
    const isOpen = !list.classList.contains('collapsed');
    list.classList.toggle('collapsed', isOpen);
    headingEl.classList.toggle('open', !isOpen);
    saveNavState(listId, !isOpen);
  }

  // Expand every collapsed ancestor <ul> in the nav that leads to a given
  // recipe anchor ID, then scroll that nav item into view.
  // Only opens branches — never collapses anything already open.
  function expandNavToRecipe(recipeId) {
    if (!recipeId) return;
    var navLink = document.querySelector('.nav-recipe-link[href$="#' + recipeId + '"]');
    if (!navLink) return;
    // Walk up the DOM, opening any collapsed ancestor lists
    var el = navLink.parentElement;
    while (el && el !== nav) {
      if (el.tagName === 'UL' && el.id && el.classList.contains('collapsed')) {
        el.classList.remove('collapsed');
        var hd = document.querySelector('[data-toggle="' + el.id + '"]');
        if (hd) hd.classList.add('open');
        saveNavState(el.id, true);
      }
      el = el.parentElement;
    }
    // Scroll the nav item into view with minimal movement
    navLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Section expand/collapse arrow buttons
  document.querySelectorAll('.nav-sec-arrow[data-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      toggleList(btn.dataset.toggle, btn);
    });
  });

  // Subsection, sub-subsection and cluster headings — toggle only (always preventDefault).
  document.querySelectorAll('.sub-hd[data-toggle], .subsub-hd[data-toggle], .cluster-hd[data-toggle]').forEach(function (hd) {
    hd.addEventListener('click', function (e) {
      e.preventDefault();
      const href = hd.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.getElementById(href.slice(1));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      toggleList(hd.dataset.toggle, hd);
    });
  });

  // Recipe links in nav — smooth scroll for same-page anchors (current page or #-only).
  document.querySelectorAll('.nav-recipe-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href) return;
      const isSamePage = href.startsWith('#') || href.startsWith(CURRENT_PAGE + '#') || href === CURRENT_PAGE;
      if (isSamePage) {
        e.preventDefault();
        const hashIdx = href.indexOf('#');
        const id = hashIdx >= 0 ? href.slice(hashIdx + 1) : null;
        if (id) {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      // Cross-page: let browser navigate normally
    });
  });

  // Restore nav expand/collapse state from localStorage
  (function () {
    var navState = {};
    try { navState = JSON.parse(localStorage.getItem('navState') || '{}'); } catch (e) {}
    // Default: expand current section if not explicitly stored
    var currentL2Id = 'sec-${slug(section.title)}-children';
    var logoNav = false;
    try { logoNav = sessionStorage.getItem('logoNav') === '1'; sessionStorage.removeItem('logoNav'); } catch (ex) {}
    if (!logoNav && navState[currentL2Id] === undefined) navState[currentL2Id] = true;
    Object.keys(navState).forEach(function (listId) {
      if (!navState[listId]) return; // leave collapsed
      var list = document.getElementById(listId);
      if (!list) return;
      list.classList.remove('collapsed');
      var hd = document.querySelector('[data-toggle="' + listId + '"]');
      if (hd) hd.classList.add('open');
    });
  }());

  // ── Scroll to hash on page load ───────────────────────────────────────
  if (location.hash) {
    const hashId = location.hash.slice(1);
    const el = document.getElementById(hashId);
    if (el) requestAnimationFrame(function () {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    // Expand the nav path to this recipe (e.g. after a cross-page search click)
    expandNavToRecipe(hashId);
  }

  // ── Single-recipe focused view (?recipe=ID) ───────────────────────────
  (function () {
    var focusId = new URLSearchParams(location.search).get('recipe');
    if (!focusId) return;
    var target = document.getElementById(focusId);
    if (!target) return;

    // Update tab title to the recipe name
    var recipeTitle = target.dataset.title;
    if (recipeTitle) document.title = recipeTitle + ' — Muhlheim Family Cookbook';

    // Hide nav sidebar
    var nav = document.getElementById('nav');
    if (nav) nav.style.display = 'none';

    // Hide all recipe articles except the target, using a class
    document.querySelectorAll('.recipe').forEach(function (el) {
      if (el.id !== focusId) el.classList.add('focused-hidden');
    });

    // Hide cluster groups, subsections, and sections that became empty
    ['cluster-group', 'subsection', 'section'].forEach(function (cls) {
      document.querySelectorAll('.' + cls).forEach(function (el) {
        if (!el.querySelector('.recipe:not(.focused-hidden)')) {
          el.style.display = 'none';
        }
      });
    });

    // Scroll to top
    requestAnimationFrame(function () { window.scrollTo(0, 0); });
  }());

  // ── Search (cross-section via search-index.json, lazy-loaded) ───────────
  const search = document.getElementById('search');
  const searchClear = document.getElementById('search-clear');
  const searchResults = document.getElementById('search-results');

  // Lazy-load the search index on first need.  The JSON is fetched once and
  // cached; all callers queued during the in-flight request are flushed when
  // the data arrives.
  var _searchIndex = null;
  var _searchLoading = false;
  var _searchQueue = [];
  function loadSearchIndex(cb) {
    if (_searchIndex) { cb(_searchIndex); return; }
    _searchQueue.push(cb);
    if (_searchLoading) return;
    _searchLoading = true;
    fetch('search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        _searchIndex = data;
        _searchLoading = false;
        var q = _searchQueue.splice(0);
        q.forEach(function (fn) { fn(_searchIndex); });
      })
      .catch(function () {
        _searchIndex = [];   // don't retry on error; search just returns nothing
        _searchLoading = false;
        var q = _searchQueue.splice(0);
        q.forEach(function (fn) { fn([]); });
      });
  }

  // Preload on first focus so results appear instantly when the user types.
  search.addEventListener('focus', function () { loadSearchIndex(function () {}); }, { once: true });

  search.addEventListener('input', function () {
    searchClear.style.display = search.value ? 'block' : 'none';
  });

  search.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); runSearch(); }
  });

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

    loadSearchIndex(function (index) {
      const matches = index.filter(function (r) {
        return r.title.toLowerCase().includes(q);
      });

      if (matches.length === 0) {
        searchResults.innerHTML = '<div class="sr-empty">No recipes found.</div>';
      } else {
        const label = document.createElement('div');
        label.className = 'sr-label';
        label.textContent = matches.length + ' recipe' + (matches.length !== 1 ? 's' : '');
        searchResults.appendChild(label);

        matches.forEach(function (r) {
          const isSamePage = r.page === CURRENT_PAGE;
          const a = document.createElement('a');
          a.className = 'sr-item';
          a.href = isSamePage ? (r.page + '#' + r.id) : (r.page + '?q=' + encodeURIComponent(search.value.trim()) + '#' + r.id);
          a.innerHTML = '<span class="sr-star">' + (r.fav ? '★' : '') + '</span>' +
                        '<span class="sr-title">' + r.title.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</span>' +
                        (!isSamePage ? '<span class="sr-section">' + r.section.replace(/&/g,'&amp;') + '</span>' : '');
          if (isSamePage) {
            a.addEventListener('click', function (e) {
              e.preventDefault();
              const el = document.getElementById(r.id);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              expandNavToRecipe(r.id);
              // Leave search results panel open so query state is preserved
            });
          }
          // Cross-page: let browser navigate (search restored via ?q= param)
          searchResults.appendChild(a);
        });
      }
      searchResults.style.display = 'block';

      if (window.innerWidth <= 480) {
        searchResults.style.maxHeight = '';
        requestAnimationFrame(function () {
          const children = searchResults.children;
          if (children.length === 0) return;
          const maxVisible = Math.min(children.length, 5);
          let h = 0;
          for (let i = 0; i < maxVisible; i++) h += children[i].offsetHeight;
          h += 8;
          searchResults.style.maxHeight = h + 'px';
        });
      }
    });
  }

  // ── Restore search from ?q= parameter (cross-page navigation) ───────────
  var urlQ = new URLSearchParams(location.search).get('q');
  if (urlQ) {
    search.value = urlQ;
    searchClear.style.display = 'block';
    runSearch();
  }

  // ── Favorites toggle (localStorage-persisted) ─────────────────────────
  const favBtn = document.getElementById('fav-toggle');
  const allRecipes = Array.from(document.querySelectorAll('.recipe'));
  let favOnly = false;
  try { favOnly = localStorage.getItem('favOnly') === 'true'; } catch (e) {}
  if (favOnly) { favBtn.classList.add('active'); applyFilters(); }

  // If the page was loaded with a hash pointing to a hidden (non-favorite) recipe,
  // quietly clear Favorites Only so the target is visible.
  if (favOnly && window.location.hash) {
    var hashTarget = document.getElementById(window.location.hash.slice(1));
    if (hashTarget && hashTarget.classList.contains('hidden')) {
      favOnly = false;
      try { localStorage.setItem('favOnly', 'false'); } catch (e) {}
      favBtn.classList.remove('active');
      applyFilters();
    }
  }

  favBtn.addEventListener('click', function () {
    favOnly = !favOnly;
    try { localStorage.setItem('favOnly', favOnly); } catch (e) {}
    favBtn.classList.toggle('active', favOnly);
    applyFilters();
  });

  // Same-page cross-recipe links: if the target is hidden by Favorites Only, clear the filter.
  document.addEventListener('click', function (e) {
    if (!favOnly) return;
    var anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    var targetEl = document.getElementById(anchor.getAttribute('href').slice(1));
    if (targetEl && targetEl.classList.contains('hidden')) {
      favOnly = false;
      try { localStorage.setItem('favOnly', 'false'); } catch (e) {}
      favBtn.classList.remove('active');
      applyFilters();
    }
  });

  // ── High Altitude toggle (localStorage-persisted) ─────────────────────
  const altBtn = document.getElementById('alt-toggle');
  try {
    if (localStorage.getItem('highAlt') === 'true') {
      altBtn.classList.add('active');
      document.body.classList.add('high-altitude-mode');
    }
  } catch (e) {}
  altBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    const isHA = document.body.classList.toggle('high-altitude-mode');
    try { localStorage.setItem('highAlt', isHA); } catch (e) {}
  });

  // ── Print single recipe ───────────────────────────────────────────────
  document.querySelectorAll('.print-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const recipe = btn.closest('.recipe');
      if (!recipe) return;
      recipe.classList.add('printing');
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
    var heading = recipe.title;
    if (recipe.favorite) heading = '★ ' + heading;
    if (recipe.source && !recipe.source.startsWith('http')) heading += ' (' + recipe.source + ')';
    lines.push(heading);
    lines.push('');
    if (recipe.servings) { lines.push(recipe.servings); lines.push(''); }
    if (recipe.comments && recipe.comments.length) {
      lines.push('NOTES');
      recipe.comments.forEach(function (c) {
        var text = (typeof c === 'object' && c.html) ? c.html.replace(/<[^>]+>/g, '') : c;
        lines.push(text);
      });
      lines.push('');
    }
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
        setTimeout(function () { btn.textContent = '📋 Copy Recipe'; btn.classList.remove('copied'); }, 2000);
      }
      function fallbackCopy() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;width:2em;height:2em;opacity:0;';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        try { ta.setSelectionRange(0, 99999); } catch (e) {}
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        showSuccess();
      }
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
          navigator.clipboard.writeText(text).then(showSuccess).catch(fallbackCopy);
        } catch (e) { fallbackCopy(); }
      } else { fallbackCopy(); }
    });
  });

  window.addEventListener('afterprint', function () {
    var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    function cleanup() {
      document.querySelectorAll('.recipe.printing').forEach(function (r) { r.classList.remove('printing'); });
      document.removeEventListener('touchstart', cleanup, true);
      document.removeEventListener('click', cleanup, true);
    }
    if (isIOS) {
      document.addEventListener('touchstart', cleanup, { once: true, capture: true });
      document.addEventListener('click', cleanup, { once: true, capture: true });
      setTimeout(cleanup, 30000);
    } else { cleanup(); }
  });

  // ── Logo: navigate to breakfast and collapse all ──────────────────────
  document.getElementById('cookbook-logo-link').addEventListener('click', function (e) {
    e.preventDefault(); // always prevent default — we handle navigation ourselves
    // Clear navState so breakfast.html won't restore previously open sections
    try { localStorage.removeItem('navState'); } catch (ex) {}
    // Signal nav restore to suppress default Breakfast expansion (works across reloads too)
    try { sessionStorage.setItem('logoNav', '1'); } catch (ex) {}
    var page = window.location.pathname.split('/').pop();
    var isBreakfast = page === 'breakfast.html' || page === '' || page === 'index.html';
    if (isBreakfast) {
      // Already here — collapse in place without reloading
      document.querySelectorAll('.nav-hd.open, .nav-sec-arrow.open').forEach(function (el) { el.classList.remove('open'); });
      document.querySelectorAll('.nav-l2, .nav-l3, .nav-l3b, .nav-l4').forEach(function (list) { list.classList.add('collapsed'); });
      window.scrollTo(0, 0);
      return;
    }
    // else: navigate to breakfast.html fully collapsed
    window.location.href = 'breakfast.html';
  });

  // ── Expand all nav menus ─────────────────────────────────────────────
  document.getElementById('expand-all').addEventListener('click', function () {
    var navState = {};
    document.querySelectorAll('.nav-l2, .nav-l3, .nav-l3b, .nav-l4').forEach(function (list) {
      list.classList.remove('collapsed');
      var hd = document.querySelector('[data-toggle="' + list.id + '"]');
      if (hd) hd.classList.add('open');
      navState[list.id] = true;
    });
    try { localStorage.setItem('navState', JSON.stringify(navState)); } catch (e) {}
  });

  // ── Collapse all open nav menus ───────────────────────────────────────
  document.getElementById('collapse-all').addEventListener('click', function () {
    document.querySelectorAll('.nav-hd.open, .nav-sec-arrow.open').forEach(function (el) { el.classList.remove('open'); });
    document.querySelectorAll('.nav-l2, .nav-l3, .nav-l3b, .nav-l4').forEach(function (list) { list.classList.add('collapsed'); });
    try { localStorage.removeItem('navState'); } catch (e) {}
  });

  // ── Apply filters (favorites — current page only) ─────────────────────
  function applyFilters() {
    allRecipes.forEach(function (r) {
      var favMatch = !favOnly || r.dataset.fav === '1';
      r.classList.toggle('hidden', !favMatch);
    });
    document.querySelectorAll('.cluster-group').forEach(function (g) {
      var visible = g.querySelectorAll('.recipe:not(.hidden)').length > 0;
      g.classList.toggle('all-hidden', !visible && favOnly);
    });
    document.querySelectorAll('.sub-subsection').forEach(function (s) {
      var visible = s.querySelectorAll('.recipe:not(.hidden)').length > 0;
      s.classList.toggle('all-hidden', !visible && favOnly);
    });
    document.querySelectorAll('.subsection').forEach(function (s) {
      var visible = s.querySelectorAll('.recipe:not(.hidden)').length > 0;
      s.classList.toggle('all-hidden', !visible && favOnly);
    });
    document.querySelectorAll('.section').forEach(function (s) {
      var visible = s.querySelectorAll('.recipe:not(.hidden)').length > 0;
      s.classList.toggle('all-hidden', !visible && favOnly);
    });
    var favTitles = new Set();
    allRecipes.forEach(function (r) { if (r.dataset.fav === '1') favTitles.add(r.dataset.title); });
    document.querySelectorAll('.nav-recipe').forEach(function (li) {
      var link = li.querySelector('.nav-recipe-link');
      var title = link ? link.dataset.recipeTitle : '';
      // For current-page recipes, favTitles is authoritative.
      // For other-page recipes, read the star span stamped at build time.
      var starEl = link ? link.querySelector('.nav-star') : null;
      var isFavInNav = starEl ? starEl.textContent.trim() === '★' : false;
      var show = !favOnly || favTitles.has(title) || isFavInNav;
      li.classList.toggle('nav-hidden', !show);
    });
    document.querySelectorAll('.nav-cluster').forEach(function (li) {
      var anyVisible = li.querySelectorAll('.nav-recipe:not(.nav-hidden)').length > 0;
      li.classList.toggle('nav-hidden', !anyVisible && favOnly);
    });
    document.querySelectorAll('.nav-sub').forEach(function (li) {
      var anyVisible = li.querySelectorAll('.nav-recipe:not(.nav-hidden)').length > 0;
      li.classList.toggle('nav-hidden', !anyVisible && favOnly);
    });
  }
})();
</script>

</body>
</html>`;
}

// ── Assemble ───────────────────────────────────────────────────────────────

// Write search-index.json
const searchIndex = buildSearchIndex(data);
fs.writeFileSync(path.join(__dirname, 'search-index.json'), JSON.stringify(searchIndex), 'utf8');
console.log('Written: search-index.json (' + searchIndex.length + ' recipes)');

// Write index.html redirect to breakfast.html
const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=breakfast.html">
<title>Muhlheim Family Cookbook</title>
</head>
<body>
<script>location.replace('breakfast.html');<\/script>
<a href="breakfast.html">Go to Muhlheim Family Cookbook</a>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'index.html'), redirectHtml, 'utf8');
console.log('Written: index.html (redirect)');

// Write per-section pages
for (const section of data.sections) {
  const filename = sectionFilename(section.title);
  const navHtml    = buildNav(data, section.title);
  const contentHtml = buildSectionContent(section);
  const cookbookData = buildSectionCookbookData(section);
  const html = buildPage(section, navHtml, contentHtml, cookbookData);
  fs.writeFileSync(path.join(__dirname, filename), html, 'utf8');
  console.log('Written: ' + filename);
}
