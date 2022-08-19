/* eslint-disable import/extensions */
import Algorithms from './Algorithms.js';
import SearchHelper from './SearchHelper.js';

export default class FilterHelper {
  // FILTER TITLE
  static filterTitle = (data) => {
    /* Filter type */
    const { type } = data;

    /* Filter title */
    let title;

    /* Set the right title */
    switch (type) {
      case 'ingredients':
        title = 'Ingrédients';
        break;
      case 'appliances':
        title = 'Appareils';
        break;
      case 'tools':
        title = 'Ustensiles';
        break;
      default:
        break;
    }

    return title;
  };

  // FILTER SEARCH
  static filterSearch = (data) => {
    /* Filter type */
    const { type } = data;

    /* Filter title */
    let text;

    /* Set the right title */
    switch (type) {
      case 'ingredients':
        text = 'ingrédient';
        break;
      case 'appliances':
        text = 'appareil';
        break;
      case 'tools':
        text = 'ustensile';
        break;
      default:
        break;
    }

    return text;
  };

  // FILTER SEARCH HANDLER
  static filterSearchHandler = (value, references) => {
    // Search bar value
    const searchBarValue = SearchHelper.normalize(value);

    // HasFiltersChanged toggle
    let hasFiltersChanged = true;

    // Filtered filters array
    let filteredFilters = references;

    if (searchBarValue.length > 0) {
      filteredFilters = Array.from(Algorithms.filterAlgo(references, searchBarValue));
    } else if (searchBarValue.length === 0) {
      filteredFilters = references;
    } else {
      hasFiltersChanged = false;
    }

    return { hasFiltersChanged, filteredFilters };
  };
}
