/* eslint-disable no-use-before-define */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import RecipesModel from './models/RecipesModel.js';
import HomeView from './views/HomeView.js';
import SearchHelper from './utils/SearchHelper.js';
import FilterHelper from './utils/FilterHelper.js';
import BtnHelper from './utils/BtnHelper.js';

// BASE RECIPES ARRAY
const baseRecipes = RecipesModel.getRecipes();

// BASE REFERENCES ARRAY
const baseReferences = RecipesModel.getReferences(baseRecipes);

// SEARCH STATE
const searchState = {
  isMainSearchApplied: false,
  references: [],
  recipes: [],
  appliedFilters: [],
};

// SEARCH IDS
const searchIds = {
  mainSearchRecipeIds: new Set(),
  ingredientsRecipeIds: new Set(),
  appliancesRecipeIds: new Set(),
  toolsRecipeIds: new Set(),
};

// COMPONENTS
const components = {
  mainSearchBar: null,
  mainSearchBtn: null,
  filterSearchBars: null,
  filters: null,
};

// COMPUTE SEARCH
const computeSearch = (isFilterRemoved) => {
  if (isFilterRemoved) {
    callMainSearchHandler(components.mainSearchBar.value);
  }

  // Reset the searchIds object
  searchIds.mainSearchRecipeIds = new Set();
  searchIds.ingredientsRecipeIds = new Set();
  searchIds.appliancesRecipeIds = new Set();
  searchIds.toolsRecipeIds = new Set();

  // Fill the main search recipe ids Set
  searchState.recipes.forEach((recipe) => {
    searchIds.mainSearchRecipeIds.add(recipe.id);
  });

  // Fill the ingredients recipe ids Set
  searchState.appliedFilters.forEach((appliedFilter) => {
    if (appliedFilter.referencesSubArr === 3) {
      appliedFilter.recipeIds.forEach((recipeId) => {
        searchIds.ingredientsRecipeIds.add(recipeId);
      });
    }
  });

  // Fill the appliances recipe ids Set
  searchState.appliedFilters.forEach((appliedFilter) => {
    if (appliedFilter.referencesSubArr === 2) {
      appliedFilter.recipeIds.forEach((recipeId) => {
        searchIds.appliancesRecipeIds.add(recipeId);
      });
    }
  });

  // Fill the tools recipe ids Set
  searchState.appliedFilters.forEach((appliedFilter) => {
    if (appliedFilter.referencesSubArr === 4) {
      appliedFilter.recipeIds.forEach((recipeId) => {
        searchIds.toolsRecipeIds.add(recipeId);
      });
    }
  });

  // Recipe Ids
  const recipeIds = [];

  baseRecipes.forEach((recipe) => {
    recipeIds.unshift(recipe.id);
  });

  // Computed recipeIds Arr
  const computedRecipeIds = recipeIds.filter(
    (value) =>
      (Array.from(searchIds.mainSearchRecipeIds).includes(value) ||
        Array.from(searchIds.mainSearchRecipeIds).length === 0) &&
      (Array.from(searchIds.ingredientsRecipeIds).includes(value) ||
        Array.from(searchIds.ingredientsRecipeIds).length === 0) &&
      (Array.from(searchIds.appliancesRecipeIds).includes(value) ||
        Array.from(searchIds.appliancesRecipeIds).length === 0) &&
      (Array.from(searchIds.toolsRecipeIds).includes(value) ||
        Array.from(searchIds.toolsRecipeIds).length === 0)
  );

  // Apply the search in the recipes Array
  searchState.recipes = SearchHelper.filterRecipes(baseRecipes, computedRecipeIds);

  // Update the references array
  searchState.references = RecipesModel.getReferences(searchState.recipes);

  // Reload the page
  HomeView.reloadPage(searchState.recipes, searchState.references);

  setEventListenersOnFilters();
};

// ADD FILTER HANDLER
const addFilter = (event) => {
  // Filter text
  const filterText = event.currentTarget.textContent;

  // Filter type
  const filterType = event.currentTarget.parentElement.parentElement.id.split('-')[0];

  // Filter references id in the references array
  let filterReferencesId;

  switch (filterType) {
    case 'ingredients':
      filterReferencesId = 3;
      break;
    case 'appliances':
      filterReferencesId = 2;
      break;
    case 'tools':
      filterReferencesId = 4;
      break;
    default:
      break;
  }

  baseReferences[filterReferencesId].forEach((reference, index) => {
    if (reference.displayValue === filterText) {
      searchState.references[filterReferencesId].splice(index, 1);
      searchState.appliedFilters.push({
        value: filterText,
        referencesSubArr: filterReferencesId,
        recipeIds: reference.recipeIds,
      });
    }
  });

  BtnHelper.addFilter(event);

  computeSearch(false);
};

// REMOVE FILTER HANDLER
const removeFilter = (event) => {
  // Filter text
  const filterText = event.currentTarget.parentElement.querySelector('p').textContent;

  searchState.appliedFilters.forEach((appliedFilter, index) => {
    if (appliedFilter.value === filterText) {
      searchState.appliedFilters.splice(index, 1);
    }
  });

  BtnHelper.removeFilter(event);

  computeSearch(true);
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

    searchState.appliedFilters.forEach((appliedFilter) => {
      const filterId = appliedFilter.referenceId;
      const subArrId = appliedFilter.referencesSubArr;

      searchState.references[subArrId].splice(filterId, 1);
    });

    computeSearch(false);
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
  components.filters = document.querySelectorAll('.filters-btn-list-item__text');

  // AppliedFilters
  components.appliedFilters = document.querySelectorAll('.remove-filter');
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

  // Filters event listener
  components.filters.forEach((filter) => {
    filter.addEventListener('click', addFilter);
  });

  // Applied filters envent listener
  components.appliedFilters.forEach((appliedFilter) => {
    appliedFilter.addEventListener('click', removeFilter);
  });
};

// SET EVENT LISTENERS ON FILTERS
const setEventListenersOnFilters = () => {
  // Get the new filter search bars
  components.filterSearchBars = document.querySelectorAll('.filters-btn-header__textfield');

  // Filters
  components.filters = document.querySelectorAll('.filters-btn-list-item__text');

  // AppliedFilters
  components.appliedFilters = document.querySelectorAll('.remove-filter');

  // Filter search bar event listener
  components.filterSearchBars.forEach((filterSearchBar) => {
    filterSearchBar.addEventListener('input', (event) => {
      callFilterSearchHandler(event.target.value, event.target.id.split('-')[0]);
    });
  });

  // Filters event listener
  components.filters.forEach((filter) => {
    filter.addEventListener('click', addFilter);
  });

  // Applied filters envent listener
  components.appliedFilters.forEach((appliedFilter) => {
    appliedFilter.addEventListener('click', removeFilter);
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
