// Network access to the PokéAPI.
import { nameListCache } from './cache.js';

export const API_BASE_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 30;
const NAME_LIST_KEY = 'all';

// The API has no search endpoint, so the full name list is loaded once and cached.
export async function fetchPokemonNames() {
  if (nameListCache.has(NAME_LIST_KEY)) return nameListCache.get(NAME_LIST_KEY);
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=100000`);
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  const data = await response.json();
  const names = data.results.map((entry) => entry.name);
  nameListCache.set(NAME_LIST_KEY, names);
  return names;
}
