// The main list: first page on start, further pages on "Load more".
import { fetchPokemonDetails, fetchPokemonPage } from './api.js';
import {
  appendCards,
  clearMessages,
  clearResults,
  renderCards,
  setLoadMoreVisible,
  setLoading,
  showError,
} from './render.js';

const LOAD_ERROR_MESSAGE = 'Pokémon could not be loaded. Please try again.';
const state = { loaded: [], total: 0 };

function hasMore() {
  return state.loaded.length < state.total;
}

// Fetch-then-render: the list and all details are complete before anything is drawn.
async function fetchPageDetails(offset) {
  const page = await fetchPokemonPage(offset);
  const details = await Promise.all(page.results.map((entry) => fetchPokemonDetails(entry.name)));
  return { details, total: page.count };
}

function showPage({ details, total }) {
  state.loaded.push(...details);
  state.total = total;
  appendCards(details);
  setLoadMoreVisible(hasMore());
}

export async function loadNextPage() {
  clearMessages();
  setLoading(true);
  try {
    showPage(await fetchPageDetails(state.loaded.length));
  } catch {
    showError(LOAD_ERROR_MESSAGE, loadNextPage);
  } finally {
    setLoading(false);
  }
}

// Brings back the normal list, for example after a search is cleared.
export function restoreList() {
  clearResults();
  renderCards(state.loaded);
  setLoadMoreVisible(hasMore());
}

export function initList() {
  const button = document.querySelector('[data-id="load-more-button"]');
  button.addEventListener('click', loadNextPage);
  loadNextPage();
}
