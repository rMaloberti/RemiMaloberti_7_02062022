/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import ComponentsView from './ComponentsView.js';

// HOME VIEW
export default class HomeView {
  // DISPLAY FILTERS
  static displayFilters = (references) => {
    // Filter references
    const filterReferences = [[], [], []];

    // Fill and display the ingredients button
    references[3].forEach((reference) => {
      filterReferences[0].push(reference.displayValue);
    });

    document.getElementById('filters').appendChild(
      ComponentsView.filtersBtn({
        type: 'ingredients',
        filters: filterReferences[0],
      })
    );

    // Fill and display the appliances button
    references[2].forEach((reference) => {
      filterReferences[1].push(reference.displayValue);
    });

    document.getElementById('filters').appendChild(
      ComponentsView.filtersBtn({
        type: 'appliances',
        filters: filterReferences[1],
      })
    );

    // Fill and display the ustensils button
    references[4].forEach((reference) => {
      filterReferences[2].push(reference.displayValue);
    });

    document.getElementById('filters').appendChild(
      ComponentsView.filtersBtn({
        type: 'tools',
        filters: filterReferences[2],
      })
    );
  };

  // DISPLAY RECIPES
  static displayRecipes = (recipes) => {
    // For each recipe
    recipes.forEach((recipe) => {
      // Add a recipe card in the DOM
      document.getElementById('recipes').appendChild(
        ComponentsView.recipeCard({
          recipeId: recipe.id,
          recipeTitle: recipe.name,
          recipeTime: recipe.time,
          recipeIngredients: recipe.ingredients,
          recipeDesc: recipe.description,
        })
      );
    });
  };

  // DISPLAY PAGE
  static displayPage = (recipes, references) => {
    // Display filters
    this.displayFilters(references);

    // Display recipes
    this.displayRecipes(recipes);
  };

  // RELOAD FILTERS
  static reloadFilters = (references) => {
    // Clear the filters container
    document.getElementById('filters').innerHTML = '';

    // Display filters
    this.displayFilters(references);
  };

  // RELOAS FILTERS LIST
  static reloadFiltersList = (filterType, filters) => {
    // Filters list element
    const filtersListElem = document.getElementById(`${filterType}-filters-list`);

    // Clear filters list element
    filtersListElem.innerHTML = '';

    // Display filters in filters list element
    filters.forEach((filter) => {
      // Filter element
      const filterItem = ComponentsView.filter({ filter: filter.displayValue });

      filtersListElem.append(filterItem);
    });
  };

  // RELOAD RECIPES
  static reloadRecipes = (recipes) => {
    // Clear the recipes container
    document.getElementById('recipes').innerHTML = '';

    // Display recipes
    this.displayRecipes(recipes);
  };

  // RELOAD PAGE
  static reloadPage = (recipes, references) => {
    // Reload filters
    this.reloadFilters(references);

    // Reload recipes
    this.reloadRecipes(recipes);
  };
}
