/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import RecipesModel from './models/RecipesModel.js';
import HomeView from './views/HomeView.js';
import SearchHelper from './utils/SearchHelper.js';
import FilterHelper from './utils/FilterHelper.js';

// BASE RECIPES ARRAY
const baseRecipes = RecipesModel.getRecipes();

// BASE REFERENCES ARRAY
const baseReferences = RecipesModel.getReferences(baseRecipes);

// SEARCH STATE
const searchState = {
  isMainSearchApplied: false,
  references: [],
  recipes: [],
};

// COMPONENTS
const components = {
  mainSearchBar: null,
  mainSearchBtn: null,
  filterSearchBars: null,
  filters: null,
};

// CALL THE FILTER SEARCH BAR HANDLER
const callFilterSearchHandler = (value, filterType) => {
  // Filter references Id in the references array
  let filterId;

  switch (filterType) {
    case 'ingredients':
      filterId = 3;
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
  const filterReferences = [...searchState.references[filterId]];

  // Toggle to know if the filters array is filtered after calling the seearch handler
  const { hasFiltersChanged, filteredFilters } = FilterHelper.filterSearchHandler(
    value,
    filterReferences
  );

  if (hasFiltersChanged) {
    // Reload the filters list
    HomeView.reloadFiltersList(filterType, filteredFilters);
  }
};

// CALL THE MAIN SEARCH HANDLER
const callMainSearchHandler = (value) => {
  // Main search references
  const mainSearchReferences = [
    ...baseReferences[0],
    ...baseReferences[1],
    ...baseReferences[2],
    ...baseReferences[3],
    ...baseReferences[4],
  ];

  // Toggle to know if the recipes array is filtered after calling the search handler
  const { isRecipesFiltered, hasRecipesChanged, filteredRecipes } = SearchHelper.mainSearchHandler(
    value,
    searchState.isMainSearchApplied,
    mainSearchReferences,
    baseRecipes
  );

  // Update the isMainSearchApplied toggle
  searchState.isMainSearchApplied = isRecipesFiltered;

  if (hasRecipesChanged) {
    // Update the recipes array
    searchState.recipes = filteredRecipes;

    // Update the references array
    searchState.references = RecipesModel.getReferences(searchState.recipes);

    // Reload the page
    HomeView.reloadPage(searchState.recipes, searchState.references);

    // Get the new filter search bars
    components.filterSearchBars = document.querySelectorAll('.filters-btn-header__textfield');

    // Filter search bar event listener
    components.filterSearchBars.forEach((filterSearchBar) => {
      filterSearchBar.addEventListener('input', (event) => {
        callFilterSearchHandler(event.target.value, event.target.id.split('-')[0]);
      });
    });
  }
};

// GET DOM ELEMENTS
const getDomElements = () => {
  // Main search bar
  components.mainSearchBar = document.getElementById('main-search-bar');

  // Main search button
  components.mainSearchBtn = document.getElementById('main-search-btn');

  // Filter search bars
  components.filterSearchBars = document.querySelectorAll('.filters-btn-header__textfield');

  // Filters
  components.filters = document.querySelectorAll('filters-btn-list-item__text');
};

// SET EVENT LISTENERS
const setEventListeners = () => {
  // Main search bar event listener
  components.mainSearchBar.addEventListener('input', (event) => {
    callMainSearchHandler(event.target.value);
  });

  // Main search button event listener
  components.mainSearchBtn.addEventListener('click', () => {
    callMainSearchHandler(components.mainSearchBar.value);
  });

  // Filter search bar event listener
  components.filterSearchBars.forEach((filterSearchBar) => {
    filterSearchBar.addEventListener('input', (event) => {
      callFilterSearchHandler(event.target.value, event.target.id.split('-')[0]);
    });
  });
};

// INIT
const init = () => {
  // Get recipes
  searchState.recipes = RecipesModel.getRecipes();

  // Get references
  searchState.references = RecipesModel.getReferences(searchState.recipes);

  // Display page
  HomeView.displayPage(searchState.recipes, searchState.references);

  // Get all DOM elements
  getDomElements();

  // Set event listeners
  setEventListeners();
};

init();
