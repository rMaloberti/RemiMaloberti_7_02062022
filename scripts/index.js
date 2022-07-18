/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import RecipesModel from './models/RecipesModel.js';
import HomeView from './views/HomeView.js';
import SearchHelper from './utils/SearchHelper.js';

// BASE RECIPES ARRAY
const baseRecipes = RecipesModel.getRecipes();

// RECIPES ARRAY
let recipes;

// REFERENCES ARRAY
let references;

// ISMAINSEARCHAPPLIED TOGGLE
let isMainSearchApplied = false;

// MAIN SEARCH BAR
const mainSearchBar = document.getElementById('main-search-bar');

// MAIN SEARCH BUTTON
const mainSearchBtn = document.getElementById('main-search-btn');

// CALL THE MAIN SEARCH HANDLER
const callMainSearchHandler = (value) => {
  // Toggle to know if the recipes array is filtered after calling the seearch handler
  const { isRecipesFiltered, hasRecipesChanged, filteredRecipes } = SearchHelper.mainSearchHandler(
    value,
    isMainSearchApplied,
    baseRecipes
  );

  // Update the isMainSearchApplied toggle
  isMainSearchApplied = isRecipesFiltered;

  if (hasRecipesChanged) {
    // Update the recipes array
    recipes = filteredRecipes;

    // Update the references array
    references = RecipesModel.getReferences(recipes);

    // Reload the page
    HomeView.reloadPage(recipes, references);
  }
};

// INIT
const init = () => {
  // Get recipes
  recipes = RecipesModel.getRecipes();

  // Get references
  references = RecipesModel.getReferences(recipes);

  // Display page
  HomeView.displayPage(recipes, references);

  // Main search bar event listener
  mainSearchBar.addEventListener('input', (event) => {
    callMainSearchHandler(event.target.value);
  });

  // Mais search button event listener
  mainSearchBtn.addEventListener('click', () => {
    callMainSearchHandler(mainSearchBar.value);
  });
};

init();
