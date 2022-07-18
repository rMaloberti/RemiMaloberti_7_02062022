/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import RecipesModel from './models/RecipesModel.js';
import HomeView from './views/HomeView.js';
import SearchHelper from './utils/SearchHelper.js';

// Recipes array
let recipes;

// isAlreayFiltered toggle
let isAlreadyFiltered = false;

// References array
let references;

// INIT
const init = () => {
  // Get recipes
  recipes = RecipesModel.getRecipes();

  // Get references
  references = RecipesModel.getReferences(recipes);

  // Display page
  HomeView.displayPage(recipes, references);

  // Main search bar event listener
  document.getElementById('main-search-bar').addEventListener('input', (event) => {
    // Toggle to know if the recipes array is filtered after calling the seearch handler
    const isFilteredAfterHandler = SearchHelper.mainSearchHandler(event, isAlreadyFiltered);

    // Update the isAlreadyFiltered toggle
    isAlreadyFiltered = isFilteredAfterHandler;

    console.log(isAlreadyFiltered);
  });
};

init();
