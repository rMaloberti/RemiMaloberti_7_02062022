/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable array-callback-return */
import Algorithms from './Algorithms.js';

// STRING HELPER
export default class SearchHelper {
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
    const idsArray = Array.from(recipesIds);

    // Filtered recipes
    const filteredRecipes = recipes.filter((recipe) => idsArray.includes(recipe.id));

    return filteredRecipes;
  };

  // SEARCH HANDLER
  static mainSearchHandler = (value, isMainSearchApplied, references, baseRecipeIds) => {
    // Search bar value
    const searchBarValue = this.normalize(value);

    // isRecipesFiltered toggle
    let isRecipesFiltered = isMainSearchApplied;

    // hasRecipesChanged toggle
    let hasRecipesChanged = true;

    // Filtered recipes array
    let filteredRecipeIds;

    if (searchBarValue.length > 2) {
      filteredRecipeIds = Algorithms.algo2(references, searchBarValue);
      isRecipesFiltered = true;
    } else if (isMainSearchApplied) {
      filteredRecipeIds = baseRecipeIds;
      isRecipesFiltered = false;
    } else {
      filteredRecipeIds = baseRecipeIds;
      hasRecipesChanged = false;
    }

    return { isRecipesFiltered, hasRecipesChanged, filteredRecipeIds };
  };
}
