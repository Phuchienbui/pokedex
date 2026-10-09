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

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};
const MAX_BASE_STAT = 255;

function getStatTemplate(entry) {
  const label = STAT_LABELS[entry.stat.name] ?? formatName(entry.stat.name);
  return `<li class="stat-row">
    <span class="stat-label">${label}</span>
    <progress class="stat-bar" value="${entry.base_stat}" max="${MAX_BASE_STAT}"></progress>
    <strong class="stat-value">${entry.base_stat}</strong>
  </li>`;
}

function getDialogHeadingTemplate(pokemon, types) {
  const name = formatName(pokemon.name);
  return `<header class="dialog-heading card-type-${types[0]}">
    <h2 class="dialog-title">${name} <span class="dialog-id">${formatId(pokemon.id)}</span></h2>
    <img data-id="dialog-image" src="${getArtworkUrl(pokemon)}" alt="${name}" width="200" height="200" />
    ${getTypeBadgesTemplate(types)}
  </header>`;
}

// Height is given in decimetres and weight in hectograms.
export function getDialogInfoTemplate(pokemon) {
  const stats = pokemon.stats.map(getStatTemplate).join('');
  return `${getDialogHeadingTemplate(pokemon, getTypeNames(pokemon))}
    <section class="dialog-section">
      <h3>Stats</h3>
      <ul class="stat-list">${stats}</ul>
      <p>Height: <strong>${pokemon.height / 10} m</strong>, weight: <strong>${pokemon.weight / 10} kg</strong></p>
    </section>
    <section class="dialog-section">
      <h3>Evolution</h3>
      <div class="evolution-content"><p>Loading evolution chain…</p></div>
    </section>`;
}

export function getEvolutionTemplate(names) {
  if (!names) return '<p>The evolution chain could not be loaded.</p>';
  if (names.length === 1) return '<p>This Pokémon does not evolve.</p>';
  const items = names.map((name) => `<li>${formatName(name)}</li>`).join('');
  return `<ol class="evolution-list">${items}</ol>`;
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
