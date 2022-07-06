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
    references[3].forEach((reference) => {
      filterReferences[2].push(reference.displayPage);
    });

    document.getElementById('filters').appendChild(
      ComponentsView.filtersBtn({
        type: 'tools',
        filters: filterReferences[2],
      })
    );
  };

  // DISPLAY PAGE
  static displayPage = (recipes, references) => {
    this.displayFilters(references);
  };
}
