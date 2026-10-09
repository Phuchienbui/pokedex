// Pure functions that return HTML strings (card, loader, messages).
const FALLBACK_IMAGE = 'assets/favicon.svg';

export function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getArtworkUrl(pokemon) {
  const artwork = pokemon.sprites.other['official-artwork'].front_default;
  return artwork ?? pokemon.sprites.front_default ?? FALLBACK_IMAGE;
}

export function formatId(id) {
  return `#${String(id).padStart(3, '0')}`;
}

function getTypeNames(pokemon) {
  return pokemon.types.map((entry) => entry.type.name);
}

function getTypeBadgesTemplate(typeNames) {
  const badges = typeNames.map((type) => `<span class="type-badge">${formatName(type)}</span>`);
  return `<span class="type-badges">${badges.join('')}</span>`;
}

// The first type decides the card color (class card-type-<name>).
export function getPokemonCardTemplate(pokemon) {
  const name = formatName(pokemon.name);
  const types = getTypeNames(pokemon);
  return `<li>
    <button class="pokemon-card-button card-type-${types[0]}" data-id="card" data-pokemon-id="${pokemon.id}" type="button">
      <span class="pokemon-card-id">${formatId(pokemon.id)}</span>
      <img data-id="card-image" src="${getArtworkUrl(pokemon)}" alt="${name}" width="120" height="120" loading="lazy" />
      <span class="pokemon-card-name">${name}</span>
      ${getTypeBadgesTemplate(types)}
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
