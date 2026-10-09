// Writes templates into the DOM.
import {
  getDialogInfoTemplate,
  getErrorTemplate,
  getEvolutionTemplate,
  getLoaderTemplate,
  getNotFoundTemplate,
  getPokemonCardTemplate,
} from './templates.js';

export const CONTENT_SELECTOR = '[data-id="content"]';
const LIST_SELECTOR = '.pokemon-list';
const LOAD_MORE_SELECTOR = '[data-id="load-more-button"]';

// Pokémon currently shown as cards (list or search result), in display order.
// The dialog uses this order for its previous and next buttons.
let shownPokemon = [];

export function getShownPokemon() {
  return shownPokemon;
}

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
  shownPokemon = [];
  document.querySelector(LIST_SELECTOR).replaceChildren();
}

export function renderCards(pokemons) {
  shownPokemon = [...pokemons];
  document.querySelector(LIST_SELECTOR).innerHTML = getCardsHtml(pokemons);
}

export function appendCards(pokemons) {
  shownPokemon.push(...pokemons);
  document.querySelector(LIST_SELECTOR).insertAdjacentHTML('beforeend', getCardsHtml(pokemons));
}

export function renderDialogInfo(pokemon) {
  document.querySelector('.dialog-info').innerHTML = getDialogInfoTemplate(pokemon);
}

// names is null when the evolution chain could not be loaded.
export function renderEvolution(names) {
  document.querySelector('.evolution-content').innerHTML = getEvolutionTemplate(names);
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
