/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import RecipesModel from './models/RecipesModel.js';
import HomeView from './views/HomeView.js';
import SearchHelper from './utils/SearchHelper.js';

// RECIPES ARRAY
let recipes;

// REFERENCES ARRAY
let references;

// ISALREADYFILTERED TOGGLE
let isAlreadyFiltered = false;

// MAIN SEARCH BAR
const mainSearchBar = document.getElementById('main-search-bar');

// MAIN SEARCH BUTTON
const mainSearchBtn = document.getElementById('main-search-btn');

// CALL THE MAIN SEARCH HANDLER
const callMainSearchHandler = (value) => {
  // Toggle to know if the recipes array is filtered after calling the seearch handler
  const isFilteredAfterHandler = SearchHelper.mainSearchHandler(value, isAlreadyFiltered);

  // Update the isAlreadyFiltered toggle
  isAlreadyFiltered = isFilteredAfterHandler;

  console.log(isAlreadyFiltered);
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
