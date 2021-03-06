/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import RecipesModel from './models/RecipesModel.js';
import HomeView from './views/HomeView.js';
import SearchHelper from './utils/SearchHelper.js';
import FilterHelper from './utils/FilterHelper.js';

// BASE RECIPES ARRAY
const baseRecipes = RecipesModel.getRecipes();

// RECIPES ARRAY
let recipes;

// BASE REFERENCES ARRAY
const baseReferences = RecipesModel.getReferences(baseRecipes);

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

// GET DOM ELEMENTS
const getDomElements = () => {
  // Main search bar
  mainSearchBar = document.getElementById('main-search-bar');

  // Main search button
  mainSearchBtn = document.getElementById('main-search-btn');

  // Filter search bars
  filterSearchBars = document.querySelectorAll('.filters-btn-header__textfield');
};

// CALL THE MAIN SEARCH HANDLER
const callMainSearchHandler = (value) => {
  // Toggle to know if the recipes array is filtered after calling the search handler
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

// CALL THE FILTER SEARCH BAR HANDLER
const callFilterSearchHandler = (value, filterType) => {
  // Filter references
  let filterReferences;

  // Filter references Id in the references array
  let filterId;

  switch (filterType) {
    case 'ingredients':
      filterId = 3;
      filterReferences = [...references[3]];
      break;
    case 'appliances':
      filterId = 2;
      break;
    case 'tools':
      filterId = 4;
      break;
    default:
      break;
  }

  // Fill the filter references array with the right filters
  filterReferences = [...baseReferences[filterId]];

  // Toggle to know if the filters array is filtered after calling the seearch handler
  const { hasFiltersChanged, filteredFilters } = FilterHelper.filterSearchHandler(
    value,
    filterReferences
  );

  if (hasFiltersChanged) {
    // Update the references array
    references[filterId] = filteredFilters;

    // Reload the filters list
    HomeView.reloadFiltersList(filterType, filteredFilters);
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
    filterSearchBar.addEventListener('input', (event) => {
      callFilterSearchHandler(event.target.value, event.target.id.split('-')[0]);
    });
  });

  console.log(references);
};

init();
