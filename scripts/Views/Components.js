/* eslint-disable import/extensions */
// IMPORTS
import FilterTypes from '../utils/FilterTypes.js';
import BtnHelper from '../utils/BtnHelper.js';

// COMPONENTS
export default class Components {
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

    removeBtn.appendChild(removeIcon);
    /* END Remove button */

    appliedFilter.appendChild(filterText);
    appliedFilter.appendChild(removeBtn);
    /* END Component wrapper */

    return appliedFilter;
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
    headerText.textContent = FilterTypes.filterTitle({ type });
    /* END Header text */

    /* Filters search */
    const filtersSearch = document.createElement('input');
    filtersSearch.id = `${type}-filters-search`;
    filtersSearch.classList.add('filters-btn-header__textfield');
    filtersSearch.setAttribute('type', 'text');
    filtersSearch.setAttribute('placeholder', `Rechercher un ${FilterTypes.filterSearch({ type })}`);
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
      /* List item */
      const listItem = document.createElement('li');
      listItem.classList.add('filters-btn-list__item');
      listItem.textContent = filter;
      /* END List item */

      filtersList.append(listItem);
    });
    /* END Filters list */

    filtersBtn.appendChild(btnHeader);
    filtersBtn.appendChild(filtersList);
    /* END Component wrapper */

    /* Event listeners */
    filtersBtn.addEventListener('click', BtnHelper.expandFiltersBtn);

    return filtersBtn;
  };
}
