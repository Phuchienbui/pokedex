// Network access to the PokéAPI. Every request goes through the cache first.
import { evolutionCache, nameListCache, pageCache, pokemonCache, speciesCache } from './cache.js';

export const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 30;
const NAME_LIST_KEY = 'all';

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return response.json();
}

// A failed request is removed again, so a retry really sends a new request.
function fetchCached(cache, key, url) {
  if (cache.has(key)) return cache.get(key);
  const request = fetchJson(url).catch((error) => {
    cache.delete(key);
    throw error;
  });
  cache.set(key, request);
  return request;
}

// The API has no search endpoint, so the full name list is loaded once and filtered locally.
export async function fetchPokemonNames() {
  const url = `${API_BASE_URL}/pokemon?limit=100000`;
  const data = await fetchCached(nameListCache, NAME_LIST_KEY, url);
  return data.results.map((entry) => entry.name);
}

export function fetchPokemonPage(offset) {
  const url = `${API_BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
  return fetchCached(pageCache, offset, url);
}

export function fetchPokemonDetails(name) {
  return fetchCached(pokemonCache, name, `${API_BASE_URL}/pokemon/${name}`);
}

// Species and evolution chain are lazy: they are only requested when a dialog opens.
export function fetchSpecies(pokemonId) {
  return fetchCached(speciesCache, pokemonId, `${API_BASE_URL}/pokemon-species/${pokemonId}`);
}

export function fetchEvolutionChain(chainUrl) {
  return fetchCached(evolutionCache, chainUrl, chainUrl);
}
