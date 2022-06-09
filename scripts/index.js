/* eslint-disable import/extensions */
import Components from './views/Components.js';

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
};

init();
