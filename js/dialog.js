// Detail dialog (open, close, previous and next).
import { fetchEvolutionChain, fetchSpecies } from './api.js';
import { getShownPokemon, renderDialogInfo, renderEvolution } from './render.js';

const DIALOG_SELECTOR = '[data-id="dialog"]';
const state = { index: 0 };

function getDialog() {
  return document.querySelector(DIALOG_SELECTOR);
}

function isCurrent(pokemon) {
  return getShownPokemon()[state.index] === pokemon;
}

// Flattens the chain, including branches such as Eevee, into one list of names.
function collectEvolutionNames(node) {
  return [node.species.name, ...node.evolves_to.flatMap(collectEvolutionNames)];
}

// Lazy: species and chain are only requested when a Pokémon is shown in the dialog.
async function loadEvolution(pokemon) {
  try {
    const species = await fetchSpecies(pokemon.species.name);
    const chain = await fetchEvolutionChain(species.evolution_chain.url);
    if (isCurrent(pokemon)) renderEvolution(collectEvolutionNames(chain.chain));
  } catch {
    if (isCurrent(pokemon)) renderEvolution(null);
  }
}

// Wraps around at both ends of the shown list.
function showPokemon(index) {
  const pokemons = getShownPokemon();
  state.index = (index + pokemons.length) % pokemons.length;
  renderDialogInfo(pokemons[state.index]);
  loadEvolution(pokemons[state.index]);
}

function openDialog(index) {
  document.body.classList.add('no-scroll');
  showPokemon(index);
  getDialog().showModal();
}

function handleCardClick(event) {
  const card = event.target.closest('[data-id="card"]');
  if (!card) return;
  const id = Number(card.dataset.pokemonId);
  openDialog(getShownPokemon().findIndex((pokemon) => pokemon.id === id));
}

// A click on the dialog itself (not its content) is a click on the backdrop.
function handleDialogClick(event) {
  const action = event.target.closest('button')?.dataset.id;
  if (event.target === event.currentTarget || action === 'close-dialog-button') {
    event.currentTarget.close();
  }
  if (action === 'prev-button') showPokemon(state.index - 1);
  if (action === 'next-button') showPokemon(state.index + 1);
}

function handleKeydown(event) {
  if (event.key === 'ArrowLeft') showPokemon(state.index - 1);
  if (event.key === 'ArrowRight') showPokemon(state.index + 1);
}

export function initDialog() {
  const dialog = getDialog();
  document.querySelector('.pokemon-list').addEventListener('click', handleCardClick);
  dialog.addEventListener('click', handleDialogClick);
  dialog.addEventListener('keydown', handleKeydown);
  dialog.addEventListener('close', () => document.body.classList.remove('no-scroll'));
}
