// Pure functions that return HTML strings (card, loader, messages).
const FALLBACK_IMAGE = 'assets/favicon.svg';

export function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getArtworkUrl(pokemon) {
  const artwork = pokemon.sprites.other['official-artwork'].front_default;
  return artwork ?? pokemon.sprites.front_default ?? FALLBACK_IMAGE;
}

export function getPokemonCardTemplate(pokemon) {
  const name = formatName(pokemon.name);
  return `<li>
    <button class="pokemon-card-button" data-id="card" data-pokemon-id="${pokemon.id}" type="button">
      <img data-id="card-image" src="${getArtworkUrl(pokemon)}" alt="${name}"
        width="120" height="120" loading="lazy" />
      <span class="pokemon-card-name">${name}</span>
    </button>
  </li>`;
}

export function getLoaderTemplate() {
  return '<span class="spinner" aria-hidden="true"></span> Loading Pokémon…';
}

export function getNotFoundTemplate() {
  return '<p class="list-message" data-id="not-found">No match found.</p>';
}

export function getErrorTemplate(message) {
  return `<p class="list-message" role="alert">
    ${message}
    <button class="retry-button" type="button">Try again</button>
  </p>`;
}
