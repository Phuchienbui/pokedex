// Entry point: wires the modules together once the DOM is ready.
import { initSearch } from './search.js';

function init() {
  document.documentElement.classList.add('js-ready');
  initSearch();
}

document.addEventListener('DOMContentLoaded', init);
