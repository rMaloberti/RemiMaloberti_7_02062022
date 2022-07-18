// STRING HELPER
export default class StringHelper {
  // NORMALIZE
  static normalize = (string) => {
    // Normalized string
    let normalizedString = '';

    // Lower case the string
    normalizedString = string.toLowerCase();

    // Remove accents
    normalizedString = normalizedString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Remove spaces and special characters
    normalizedString = normalizedString.replace(/([^\w^%]+|\s+)/g, '-');

    // Remove hyphens at the start and at the end of the string
    normalizedString = normalizedString.replace(/(^-+|-+$)/g, '');

    return normalizedString;
  };

  // GET RECIPE BY ID
  static getRecipeById = (recipes, id) => {
    // Recipe to return
    let returnRecipe;

    // Get the right recipe depending on the id
    recipes.forEach((recipe) => {
      if (recipe.id === id) {
        returnRecipe = recipe;
      }
    });

    return returnRecipe;
  };

  // SEARCH HANDLER
  static searchHandler = (event) => {
    // Search bar
    const searchBar = event.target;

    // Search bar type
    let searchBarType;

    switch (searchBar.id) {
      case 'main-search-bar':
        searchBarType = 'main';
        break;
      case 'ingredients-filters-search':
        searchBarType = 'ingredients';
        break;
      case 'appliances-filters-search':
        searchBarType = 'appliances';
        break;
      case 'tools-filters-search':
        searchBarType = 'tools';
        break;
      default:
        break;
    }

    // Search bar value
    const searchBarValue = this.normalize(searchBar.value);

    if (searchBarValue.length > 2) {
      console.log(searchBar);
      console.log(searchBarType);
      console.log(searchBarValue);
    }
  };
}
