// Search input handling and name filtering.
import { PAGE_SIZE, fetchPokemonDetails, fetchPokemonNames } from './api.js';
import { restoreList } from './list.js';
import {
  clearResults,
  renderCards,
  setLoadMoreVisible,
  setLoading,
  showError,
  showNotFound,
} from './render.js';

export const MIN_SEARCH_LENGTH = 3;
const SEARCH_ERROR_MESSAGE = 'The search could not be completed. Please try again.';

export function normalizeQuery(text) {
  return text.trim().toLowerCase();
}

export function filterNames(names, query) {
  return names.filter((name) => name.includes(query)).slice(0, PAGE_SIZE);
}

async function showMatches(matches) {
  if (matches.length === 0) return showNotFound();
  renderCards(await Promise.all(matches.map(fetchPokemonDetails)));
}

async function runSearch(query) {
  clearResults();
  setLoadMoreVisible(false);
  setLoading(true);
  try {
    await showMatches(filterNames(await fetchPokemonNames(), query));
  } catch {
    showError(SEARCH_ERROR_MESSAGE, () => runSearch(query));
  } finally {
    setLoading(false);
  }
}

function handleInput(input, button) {
  const query = normalizeQuery(input.value);
  button.disabled = query.length < MIN_SEARCH_LENGTH;
  if (query === '') restoreList();
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
