/* eslint-disable import/extensions */
import recipes from '../../data/recipes.js';
import SearchHelper from '../utils/SearchHelper.js';

// RECIPES MODEL
export default class RecipesModel {
  // GET RECIPES
  static getRecipes = () => {
    // Get the recipes
    const recipesArr = recipes;

    return recipesArr;
  };

  // GET FILTER REFERENCES
  static getFilterReferences = (recipesArr) => {
    // Filters array
    const filters = [[], [], []];

    // For each recipe
    recipesArr.forEach((recipe) => {
      // For each ingredient
      recipe.ingredients.forEach((ingr) => {
        // Add the ingredient to the filters array
        filters[0].push(SearchHelper.normalize(ingr.ingredient));
      });
      // Add the applience to the filters array
      filters[1].push(SearchHelper.normalize(recipe.appliance));
      // For each ustensil
      recipe.ustensils.forEach((ustensil) => {
        // Add the ustensil to the filters array
        filters[2].push(SearchHelper.normalize(ustensil));
      });
    });

    // Filters set == Filters array without repetition
    const filtersSet = [
      [...new Set(filters[0])],
      [...new Set(filters[1])],
      [...new Set(filters[2])],
    ];

    return filtersSet;
  };
}
