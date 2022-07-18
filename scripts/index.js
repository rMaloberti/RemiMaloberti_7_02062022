/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import RecipesModel from './models/RecipesModel.js';
import HomeView from './views/HomeView.js';
import SearchHelper from './utils/SearchHelper.js';

// Recipes array
let recipes;

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

  // Event listeners
  document
    .getElementsByClassName('main-search-bar')
    .addEventListener('input', SearchHelper.searchHandler);
};

init();
