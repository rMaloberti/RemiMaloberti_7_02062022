export default class FilterTypes {
  /* Filter title */
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
      case 'appliences':
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
}
