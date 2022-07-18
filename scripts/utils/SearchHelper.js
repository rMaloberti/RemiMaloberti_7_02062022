// STRING HELPER
export default class StringHelper {
  // NORMALIZE
  static normalize = (string) => {
    // Normalized string
    let normalizedString = '';

    // Lower case the string
    normalizedString = string.toLowerCase();

    // Remove accents
    normalizedString = normalizedString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Remove spaces and special characters
    normalizedString = normalizedString.replace(/([^\w^%]+|\s+)/g, '-');

    // Remove hyphens at the start and at the end of the string
    normalizedString = normalizedString.replace(/(^-+|-+$)/g, '');

    return normalizedString;
  };

  // GET RECIPE BY ID
  static getRecipeById = (recipes, id) => {
    // Recipe to return
    let returnRecipe;

    // Get the right recipe depending on the id
    recipes.forEach((recipe) => {
      if (recipe.id === id) {
        returnRecipe = recipe;
      }
    });

    return returnRecipe;
  };

  // SEARCH HANDLER
  static mainSearchHandler = (event, isAlreadyFiltered) => {
    // Search bar
    const searchBar = event.target;

    // Search bar value
    const searchBarValue = this.normalize(searchBar.value);

    // isRecipesFiltered toggle
    let isRecipesFiltered = isAlreadyFiltered;

    if (searchBarValue.length > 2) {
      console.log(searchBarValue);
      isRecipesFiltered = true;
    } else if (isAlreadyFiltered) {
      console.log(searchBarValue);
      isRecipesFiltered = false;
    }

    return isRecipesFiltered;
  };
}
