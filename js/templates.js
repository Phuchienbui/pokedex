// Pure functions that return HTML strings (card, dialog, loader, messages).

export function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getNotFoundTemplate() {
  return '<p class="search-message" data-id="not-found">No match found.</p>';
}

export function getSearchErrorTemplate() {
  return `<p class="search-message" role="alert">
    Pokémon could not be loaded. Please try again.
  </p>`;
}

// Temporary plain list, replaced by the Pokémon cards in the list cards.
export function getSearchResultsTemplate(names) {
  const items = names.map((name) => `<li>${formatName(name)}</li>`).join('');
  return `<ul class="search-results">${items}</ul>`;
}
