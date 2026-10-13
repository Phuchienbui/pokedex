// Checks the 13 required data-id attributes: each one must appear exactly once,
// on the expected tag. Static ones are read from index.html, dynamic ones from the
// templates (rendered with a sample Pokémon). Run from the project root: npm run check:data-ids
import { readFileSync } from 'node:fs';
import {
  getDialogInfoTemplate,
  getNotFoundTemplate,
  getPokemonCardTemplate,
} from '../js/templates.js';

const EXPECTED_TAGS = {
  content: 'main',
  'search-input': 'input',
  'not-found': 'p',
  'load-more-button': 'button',
  dialog: 'dialog',
  card: 'button',
  'card-image': 'img',
  'overlay-pokemon-name': 'div',
  'close-dialog-button': 'button',
  'dialog-image': 'img',
  'prev-button': 'button',
  'next-button': 'button',
  'search-button': 'button',
};

// Written as JSON text because the API field names use snake_case.
const SAMPLE_POKEMON = JSON.parse(`{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "species": { "name": "pikachu" },
  "types": [{ "type": { "name": "electric" } }],
  "stats": [{ "base_stat": 35, "stat": { "name": "hp" } }],
  "sprites": { "front_default": null, "other": { "official-artwork": { "front_default": "a.png" } } }
}`);

function collectDataIds(html) {
  const found = [];
  for (const match of html.matchAll(/<(\w+)[^>]*?\sdata-id="([^"]+)"/g)) {
    found.push({ tag: match[1], id: match[2] });
  }
  return found;
}

function getAllMarkup() {
  return [
    readFileSync('index.html', 'utf8'),
    getPokemonCardTemplate(SAMPLE_POKEMON),
    getDialogInfoTemplate(SAMPLE_POKEMON),
    getNotFoundTemplate(),
  ].join('\n');
}

function checkExpected(found) {
  const problems = [];
  for (const [id, tag] of Object.entries(EXPECTED_TAGS)) {
    const hits = found.filter((entry) => entry.id === id);
    if (hits.length !== 1) problems.push(`${id}: found ${hits.length} times, expected 1`);
    else if (hits[0].tag !== tag) problems.push(`${id}: on <${hits[0].tag}>, expected <${tag}>`);
  }
  return problems;
}

function checkUnknown(found) {
  return found
    .filter((entry) => !(entry.id in EXPECTED_TAGS))
    .map((entry) => `${entry.id}: not in the required list`);
}

const found = collectDataIds(getAllMarkup());
const problems = [...checkExpected(found), ...checkUnknown(found)];
if (problems.length > 0) throw new Error(`data-id check failed:\n${problems.join('\n')}`);
console.log(`All ${Object.keys(EXPECTED_TAGS).length} data-id attributes are present and correct.`);
