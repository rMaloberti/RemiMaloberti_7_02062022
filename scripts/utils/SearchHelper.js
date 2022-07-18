/* eslint-disable array-callback-return */

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

  // FILTER RECIPES
  static filterRecipes = (recipes, recipesIds) => {
    // Filtered recipes
    const filteredRecipes = recipes.filter((recipe) => recipesIds.includes(recipe.id));

    return filteredRecipes;
  };

  // SEARCH HANDLER
  static mainSearchHandler = (value, isMainSearchApplied, recipes) => {
    // Search bar value
    const searchBarValue = this.normalize(value);

    // isRecipesFiltered toggle
    let isRecipesFiltered = isMainSearchApplied;

    // hasRecipesChanged toggle
    let hasRecipesChanged = true;

    // Filtered recipes array
    let filteredRecipes;

    if (searchBarValue.length > 2) {
      filteredRecipes = this.filterRecipes(recipes, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      isRecipesFiltered = true;
    } else if (isMainSearchApplied) {
      filteredRecipes = this.filterRecipes(recipes, [1, 2, 4]);
      isRecipesFiltered = false;
    } else {
      hasRecipesChanged = false;
    }

    return { isRecipesFiltered, hasRecipesChanged, filteredRecipes };
  };
}
