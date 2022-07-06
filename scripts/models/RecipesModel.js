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

  // STORE REFERENCE
  static storeReference = (references, subArrayIndex, referenceToStore, recipe) => {
    // Boolean toggle to check if the reference is stored
    let stored = false;

    // For each  reference
    references[subArrayIndex].forEach((reference) => {
      // If ingredient is already stored as a reference
      if (reference.value === SearchHelper.normalize(referenceToStore)) {
        // Add the id to the recipeIds
        reference.recipeIds.push(recipe.id);

        // Toggle the stored boolean
        stored = true;
      }
    });

    // If the ingredient is not in the ingredient references array
    if (!stored) {
      // Display value to store
      const displayValueToStore = `${referenceToStore
        .toLowerCase()
        .charAt(0)
        .toUpperCase()}${referenceToStore.toLowerCase().slice(1)}`;

      // Store the ingredient in the reference array
      references[subArrayIndex].push({
        value: SearchHelper.normalize(referenceToStore),
        displayValue: displayValueToStore,
        recipeIds: [recipe.id],
      });
    }
  };

  // GET REFERENCES
  static getReferences = (recipesArr) => {
    // Reference array
    const references = [[], [], [], [], []];

    // For each recipe
    recipesArr.forEach((recipe) => {
      // Store the recipe name in the reference array
      this.storeReference(references, 0, recipe.name, recipe);

      // Store the recipe description in the reference array
      this.storeReference(references, 1, recipe.description, recipe);

      // Store the appliance in the reference array
      this.storeReference(references, 2, recipe.appliance, recipe);

      // For each ingredient
      recipe.ingredients.forEach((ingr) => {
        // Store the ingredient in the reference array
        this.storeReference(references, 3, ingr.ingredient, recipe);
      });

      // For each ustensil
      recipe.ustensils.forEach((ustensil) => {
        // Store the ustensil in the reference array
        this.storeReference(references, 4, ustensil, recipe);
      });
    });

    return references;
  };
}
