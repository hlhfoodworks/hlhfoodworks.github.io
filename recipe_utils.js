function displayTitle(recipe) {
  return (recipe.favorite ? '★ ' : '') + recipe.title;
}

function buildHeadingsList(data) {
  const headings = [];
  for (const section of data.sections) {
    headings.push({ level: 1, text: section.title });
    if (section.subsections) {
      for (const sub of section.subsections) {
        headings.push({ level: 2, text: sub.title });
        for (const recipe of (sub.recipes || [])) {
          headings.push({ level: 3, text: displayTitle(recipe) });
        }
      }
    } else {
      for (const recipe of (section.recipes || [])) {
        headings.push({ level: 2, text: displayTitle(recipe) });
      }
    }
  }
  return headings;
}

module.exports = { displayTitle, buildHeadingsList };
