/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
// IMPORTS
import Components from '../views/Components.js';

// BUTTON HELPER
export default class BtnHelper {
  // EXPAND FILTERS BUTTON
  static expandFiltersBtn = (e) => {
    /* Filters button */
    const filtersBtn = e.currentTarget;

    /* Button toggle */
    const btnToggle = filtersBtn.querySelector('.filters-btn-toggle');

    /* Event handling */
    e.stopPropagation();
    filtersBtn.removeEventListener('click', this.expandFiltersBtn);
    btnToggle.addEventListener('click', this.collapseFiltersBtn);

    /* Style updates */
    filtersBtn.classList.remove('filters-btn--closed');
    filtersBtn.classList.add('filters-btn--opened');
  };

  // COLLAPSE FILTERS BUTTON
  static collapseFiltersBtn = (e) => {
    /* Button toggle */
    const btnToggle = e.currentTarget;

    /* Filters button */
    const filtersBtn = btnToggle.parentElement.parentElement;

    /* Event handling */
    e.stopPropagation();
    btnToggle.removeEventListener('click', this.collapseFiltersBtn);
    filtersBtn.addEventListener('click', this.expandFiltersBtn);

    /* Style updates */
    filtersBtn.classList.remove('filters-btn--opened');
    filtersBtn.classList.add('filters-btn--closed');
  };

  // ADD FILTER
  static addFilter = (e) => {
    /* Filter */
    const filter = e.currentTarget;

    /* Filter text */
    const filterText = filter.textContent;

    /* Filter type */
    const filterType = filter.parentElement.parentElement.id.split('-')[0];

    /* Event handling */
    e.stopPropagation();
    filter.removeEventListener('click', this.addFilter);

    /* DOM updates */
    /* Applied filters section */
    const appliedFiltersSection = document.getElementById('applied-filters');

    /* Applied filter */
    const appliedFilter = Components.appliedFilter({ type: filterType, filter: filterText });

    if (!appliedFiltersSection.hasChildNodes()) {
      appliedFiltersSection.classList.remove('applied-filters--empty');
    }

    appliedFiltersSection.appendChild(appliedFilter);
    filter.parentElement.parentElement.removeChild(filter.parentElement);
  };

  // REMOVE FILTER
  static removeFilter = (e) => {
    /* Remove button */
    const removeBtn = e.currentTarget;

    /* Event handling */
    e.stopPropagation();
    removeBtn.removeEventListener('click', this.removeFilter);

    /* DOM updates */
    /* Applied filters section */
    const appliedFiltersSection = document.getElementById('applied-filters');

    /* Applied filter */
    const appliedFilter = removeBtn.parentElement;

    /* Applied filter text */
    const appliedFilterText = appliedFilter.querySelector('p').textContent;

    /* Filter type */
    const filterType = appliedFilter.getAttribute('class').split('--')[1];

    /* Filters button list */
    const filtersBtnList = document.getElementById(`${filterType}-filters-list`);

    /* List item */
    const listItem = document.createElement('li');
    listItem.classList.add('filters-btn-list-item');

    /* List item text */
    const listItemText = document.createElement('p');
    listItemText.classList.add('filters-btn-list-item__text');
    listItemText.textContent = appliedFilterText;

    /* Event listeners */
    listItemText.addEventListener('click', this.addFilter);

    listItem.appendChild(listItemText);
    /* END List item */

    filtersBtnList.appendChild(listItem);
    appliedFiltersSection.removeChild(appliedFilter);
  };
}
