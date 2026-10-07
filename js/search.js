// Search input handling and name filtering.
import { PAGE_SIZE, fetchPokemonNames } from './api.js';
import { clearResults, renderSearchResults, showNotFound, showSearchError } from './render.js';

export const MIN_SEARCH_LENGTH = 3;

export function normalizeQuery(text) {
  return text.trim().toLowerCase();
}

export function filterNames(names, query) {
  return names.filter((name) => name.includes(query)).slice(0, PAGE_SIZE);
}

async function runSearch(query) {
  clearResults();
  try {
    const matches = filterNames(await fetchPokemonNames(), query);
    if (matches.length === 0) showNotFound();
    else renderSearchResults(matches);
  } catch {
    showSearchError();
  }
}

function handleInput(input, button) {
  const query = normalizeQuery(input.value);
  button.disabled = query.length < MIN_SEARCH_LENGTH;
  if (query === '') clearResults();
}

function handleSubmit(event, input) {
  event.preventDefault();
  const query = normalizeQuery(input.value);
  if (query.length >= MIN_SEARCH_LENGTH) runSearch(query);
}

export function initSearch() {
  const form = document.querySelector('.search-form');
  const input = form.querySelector('[data-id="search-input"]');
  const button = form.querySelector('[data-id="search-button"]');
  input.addEventListener('input', () => handleInput(input, button));
  form.addEventListener('submit', (event) => handleSubmit(event, input));
}
