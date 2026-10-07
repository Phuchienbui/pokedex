// Writes templates into the DOM.
import {
  getNotFoundTemplate,
  getSearchErrorTemplate,
  getSearchResultsTemplate,
} from './templates.js';

export const CONTENT_SELECTOR = '[data-id="content"]';
const NOT_FOUND_SELECTOR = '[data-id="not-found"]';

function getContent() {
  return document.querySelector(CONTENT_SELECTOR);
}

export function clearResults() {
  document.querySelector(NOT_FOUND_SELECTOR)?.remove();
  getContent().replaceChildren();
}

export function showNotFound() {
  getContent().insertAdjacentHTML('afterbegin', getNotFoundTemplate());
}

export function showSearchError() {
  getContent().insertAdjacentHTML('afterbegin', getSearchErrorTemplate());
}

export function renderSearchResults(names) {
  getContent().innerHTML = getSearchResultsTemplate(names);
}
