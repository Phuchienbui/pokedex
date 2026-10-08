// Entry point: wires the modules together once the DOM is ready.
import { initList } from './list.js';
import { initSearch } from './search.js';

function init() {
  document.documentElement.classList.add('js-ready');
  initSearch();
  initList();
}

document.addEventListener('DOMContentLoaded', init);
