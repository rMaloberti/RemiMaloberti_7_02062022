/* eslint-disable import/extensions */
import Components from './views/Components.js';

const closeFilterBtn = (e) => {
  e.stopPropagation();
  e.currentTarget.removeEventListener('click', closeFilterBtn);

  const filtersBtn = e.currentTarget.parentElement.parentElement;
  filtersBtn.classList.remove('filters-btn--opened');
  filtersBtn.classList.add('filters-btn--closed');

  // eslint-disable-next-line no-use-before-define
  filtersBtn.addEventListener('click', openFilterBtn);
};

const openFilterBtn = (e) => {
  e.stopPropagation();
  e.currentTarget.removeEventListener('click', openFilterBtn);

  e.currentTarget.classList.remove('filters-btn--closed');
  e.currentTarget.classList.add('filters-btn--opened');

  const toggle = e.currentTarget.querySelector('.filters-btn-toggle');
  toggle.addEventListener('click', closeFilterBtn);
};

const init = () => {
  document
    .getElementById('filters')
    .appendChild(Components.filtersBtn({ type: 'ingredients', filters: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] }));
  document
    .getElementById('filters')
    .appendChild(Components.filtersBtn({ type: 'appliences', filters: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] }));
  document
    .getElementById('filters')
    .appendChild(Components.filtersBtn({ type: 'tools', filters: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'] }));

  const filtersButtons = document.querySelectorAll('.filters-btn');

  filtersButtons.forEach((filtersBtn) => {
    filtersBtn.addEventListener('click', openFilterBtn);
  });
};

init();
