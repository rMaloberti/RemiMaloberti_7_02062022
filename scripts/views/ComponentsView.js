/* eslint-disable comma-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
// IMPORTS
import FilterHelper from '../utils/FilterHelper.js';
import BtnHelper from '../utils/BtnHelper.js';

// COMPONENTS VIEW
export default class ComponentsView {
  // APPLIED FILTER
  static appliedFilter = (data) => {
    /* Component datas */
    const { type, filter } = data;

    /* Component wrapper */
    const appliedFilter = document.createElement('div');
    appliedFilter.classList.add('applied-filter');
    appliedFilter.classList.add(`applied-filter--${type}`);

    /* Text */
    const filterText = document.createElement('p');
    filterText.classList.add('applied-filter__text');
    filterText.textContent = filter;
    /* END Text */

    /* Remove button */
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-filter');
    removeBtn.setAttribute('type', 'button');

    /* Remove icon */
    const removeIcon = document.createElement('i');
    removeIcon.classList.add('remove-filter__icon');
    /* END Remove icon */

    removeBtn.addEventListener('click', BtnHelper.removeFilter);

    removeBtn.appendChild(removeIcon);
    /* END Remove button */

    appliedFilter.appendChild(filterText);
    appliedFilter.appendChild(removeBtn);
    /* END Component wrapper */

    return appliedFilter;
  };

  static filter = (data) => {
    /* Component datas */
    const { filter } = data;

    /* List item */
    const listItem = document.createElement('li');
    listItem.classList.add('filters-btn-list-item');

    /* List item text */
    const listItemText = document.createElement('p');
    listItemText.classList.add('filters-btn-list-item__text');
    listItemText.textContent = filter;

    listItem.appendChild(listItemText);

    return listItem;
  };

  // FILTERS BUTTON
  static filtersBtn = (data) => {
    /* Component datas */
    const { type, filters } = data;

    /* Component wrapper */
    const filtersBtn = document.createElement('button');
    filtersBtn.id = `${type}-filters-btn`;
    filtersBtn.classList.add('filters-btn');
    filtersBtn.classList.add('filters-btn--closed');
    filtersBtn.classList.add(`filters-btn--${type}`);
    filtersBtn.setAttribute('type', 'button');

    /* Component header */
    const btnHeader = document.createElement('div');
    btnHeader.classList.add('filters-btn-header');

    /* Header text */
    const headerText = document.createElement('p');
    headerText.classList.add('filters-btn-header__text');
    headerText.textContent = FilterHelper.filterTitle({ type });
    /* END Header text */

    /* Filters search */
    const filtersSearch = document.createElement('input');
    filtersSearch.id = `${type}-filters-search`;
    filtersSearch.classList.add('filters-btn-header__textfield');
    filtersSearch.setAttribute('type', 'search');
    filtersSearch.setAttribute(
      'placeholder',
      `Rechercher un ${FilterHelper.filterSearch({ type })}`
    );
    /* END Button textfield */

    /* Button toggle */
    const btnToggle = document.createElement('div');
    btnToggle.id = `${type}-filters-toggle`;
    btnToggle.classList.add('filters-btn-toggle');

    /* Toggle icon */
    const toggleIcon = document.createElement('i');
    toggleIcon.classList.add('filters-btn-toggle__icon');
    /* END Toggle icon */

    btnToggle.appendChild(toggleIcon);
    /* END Button toggle */

    btnHeader.appendChild(headerText);
    btnHeader.appendChild(filtersSearch);
    btnHeader.appendChild(btnToggle);
    /* END Component header */

    /* Filters list */
    const filtersList = document.createElement('ul');
    filtersList.id = `${type}-filters-list`;
    filtersList.classList.add('filters-btn-list');

    filters.forEach((filter) => {
      /* List filter */
      const listFilter = this.filter({ filter });

      filtersList.append(listFilter);
    });
    /* END Filters list */

    filtersBtn.appendChild(btnHeader);
    filtersBtn.appendChild(filtersList);
    /* END Component wrapper */

    /* Event listeners */
    filtersBtn.addEventListener('click', BtnHelper.expandFiltersBtn);

    return filtersBtn;
  };

  // RECIPE CARD
  static recipeCard = (data) => {
    /* Component datas */
    // eslint-disable-next-line object-curly-newline
    const { recipeId, recipeTitle, recipeTime, recipeIngredients, recipeDesc } = data;

    /* Recipe card */
    const recipeCard = document.createElement('div');
    recipeCard.id = `recipe-${recipeId}`;
    recipeCard.classList.add('recipe-card');

    /* Card thumbnail */
    const cardThumb = document.createElement('div');
    cardThumb.classList.add('recipe-card-thumbnail');

    /* Thumbnail image */
    const thumbImg = document.createElement('img');
    thumbImg.classList.add('recipe-card-thumbnail__img');
    thumbImg.setAttribute('alt', '');
    thumbImg.setAttribute('src', '');
    /* END Thumbnail image */

    cardThumb.appendChild(thumbImg);
    /* END Card thumbnail */

    /* Card description */
    const cardDesc = document.createElement('div');
    cardDesc.classList.add('recipe-card-desc');

    /* Description header */
    const descHeader = document.createElement('div');
    descHeader.classList.add('card-desc-header');

    /* Description heading */
    const descHeading = document.createElement('h2');
    descHeading.classList.add('card-desc-header__heading');
    descHeading.textContent = recipeTitle;
    /* END Description heading */

    /* Description cooking time */
    const descCookTime = document.createElement('div');
    descCookTime.classList.add('desc-header-cooking-time');

    /* Cooking time icon */
    const cookTimeIcon = document.createElement('i');
    cookTimeIcon.classList.add('desc-header-cooking-time__icon');
    /* END Cooking time icon */

    /* Cooking time text */
    const cookTimeTxt = document.createElement('p');
    cookTimeTxt.classList.add('desc-header-cooking-time__text');
    cookTimeTxt.textContent = `${recipeTime} min`;

    descCookTime.appendChild(cookTimeIcon);
    descCookTime.appendChild(cookTimeTxt);
    /* END Description cooking time */

    descHeader.appendChild(descHeading);
    descHeader.appendChild(descCookTime);
    /* END Description header */

    /* Description body */
    const descBody = document.createElement('div');
    descBody.classList.add('card-desc-body');

    /* Description ingredients */
    const descIngredients = document.createElement('ul');
    descIngredients.classList.add('desc-body-ingredients');

    recipeIngredients.forEach((ingredient) => {
      /* List ingredient */
      const listIngredient = document.createElement('li');
      listIngredient.classList.add('desc-body-ingredient');
      listIngredient.textContent = `${ingredient.ingredient}${
        ingredient.quantity || ingredient.quantite ? ': ' : ''
      }`;

      if (ingredient.quantity || ingredient.quantite) {
        /* Ingredient quantity */
        const ingredientQty = document.createElement('span');
        ingredientQty.classList.add('desc-body-ingredient__qty');
        ingredientQty.textContent = `${ingredient.quantity || ingredient.quantite}${
          ingredient.unit ? ` ${ingredient.unit}` : ''
        }`;
        /* END Ingredient quantity */

        listIngredient.appendChild(ingredientQty);
      }
      /* END List ingredient */

      descIngredients.appendChild(listIngredient);
    });
    /* END Description ingredients */

    /* Description instructions */
    const descInstructions = document.createElement('p');
    descInstructions.classList.add('card-desc-body__instructions');
    descInstructions.textContent = recipeDesc;
    /* END Description instructions */

    descBody.appendChild(descIngredients);
    descBody.appendChild(descInstructions);
    /* END Description body */

    cardDesc.appendChild(descHeader);
    cardDesc.appendChild(descBody);
    /* END Card description */

    recipeCard.appendChild(cardThumb);
    recipeCard.appendChild(cardDesc);
    /* END Component wrapper */

    return recipeCard;
  };
}
