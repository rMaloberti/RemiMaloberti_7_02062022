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

  /* Filter search */
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
      case 'appliences':
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
}
