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
let mainSearchBar;

// MAIN SEARCH BUTTON
let mainSearchBtn;

// FILTER SEARCH BARS
let filterSearchBars;

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

// GET DOM ELEMENTS
const getDomElements = () => {
  // Main search bar
  mainSearchBar = document.getElementById('main-search-bar');

  // Main search button
  mainSearchBtn = document.getElementById('main-search-btn');

  // Filter search bars
  filterSearchBars = document.querySelectorAll('.filters-btn-header__textfield');
};

// INIT
const init = () => {
  // Get recipes
  recipes = RecipesModel.getRecipes();

  // Get references
  references = RecipesModel.getReferences(recipes);

  // Display page
  HomeView.displayPage(recipes, references);

  // Get all DOM elements
  getDomElements();

  // Main search bar event listener
  mainSearchBar.addEventListener('input', (event) => {
    callMainSearchHandler(event.target.value);
  });

  // Main search button event listener
  mainSearchBtn.addEventListener('click', () => {
    callMainSearchHandler(mainSearchBar.value);
  });

  // Filter search bar event listener
  filterSearchBars.forEach((filterSearchBar) => {
    filterSearchBar.addEventListener('input', () => console.log(filterSearchBar));
  });
};

init();
