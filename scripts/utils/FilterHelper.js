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
    console.log(value);
    console.log(references);

    const hasFiltersChanged = true;
    const filteredFilters = references;

    return { hasFiltersChanged, filteredFilters };
  };
}
