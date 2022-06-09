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

    /* Applied filter */
    const appliedFilter = Components.appliedFilter({ type: filterType, filter: filterText });

    /* DOM updates */
    /* Applied filters section */
    const appliedFiltersSection = document.getElementById('applied-filters');

    if (!appliedFiltersSection.hasChildNodes()) {
      appliedFiltersSection.classList.remove('applied-filters--empty');
    }

    appliedFiltersSection.appendChild(appliedFilter);
    filter.parentElement.parentElement.removeChild(filter.parentElement);
  };
}
