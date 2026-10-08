// Writes templates into the DOM.
import {
  getErrorTemplate,
  getLoaderTemplate,
  getNotFoundTemplate,
  getPokemonCardTemplate,
} from './templates.js';

export const CONTENT_SELECTOR = '[data-id="content"]';
const LIST_SELECTOR = '.pokemon-list';
const LOAD_MORE_SELECTOR = '[data-id="load-more-button"]';

function getContent() {
  return document.querySelector(CONTENT_SELECTOR);
}

function getCardsHtml(pokemons) {
  return pokemons.map(getPokemonCardTemplate).join('');
}

export function clearMessages() {
  document.querySelectorAll('.list-message').forEach((message) => message.remove());
}

export function clearResults() {
  clearMessages();
  document.querySelector(LIST_SELECTOR).replaceChildren();
}

export function renderCards(pokemons) {
  document.querySelector(LIST_SELECTOR).innerHTML = getCardsHtml(pokemons);
}

export function appendCards(pokemons) {
  document.querySelector(LIST_SELECTOR).insertAdjacentHTML('beforeend', getCardsHtml(pokemons));
}

export function showNotFound() {
  clearMessages();
  getContent().insertAdjacentHTML('afterbegin', getNotFoundTemplate());
}

export function showError(message, onRetry) {
  clearMessages();
  getContent().insertAdjacentHTML('afterbegin', getErrorTemplate(message));
  document.querySelector('.retry-button').addEventListener('click', onRetry, { once: true });
}

// The loader text lives in a status region, so screen readers announce it.
export function setLoading(isLoading) {
  document.querySelector('.status-area').innerHTML = isLoading ? getLoaderTemplate() : '';
  document.querySelector(LOAD_MORE_SELECTOR).disabled = isLoading;
}

export function setLoadMoreVisible(isVisible) {
  document.querySelector(LOAD_MORE_SELECTOR).hidden = !isVisible;
}
