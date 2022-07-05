/* eslint-disable import/extensions */
import recipes from '../../data/recipes.js';

// RECIPES MODEL
export default class RecipesModel {
  // GET RECIPES
  static getRecipes = () => {
    // Get the recipes
    const recipesArr = recipes;

    return recipesArr;
  };
}
