# Pokédex

A browser-based Pokédex built with plain HTML, CSS and JavaScript (ES modules), using the
[PokéAPI](https://pokeapi.co/).

## Features

- List of the first 30 Pokémon, with "Load more" for the next 30.
- Search by name: at least 3 characters, started with the button or Enter, searches all Pokémon.
- Detail dialog with image, types, stats, height, weight and evolution chain.
- Previous and next Pokémon with buttons or arrow keys.
- Responsive layout from 320 px, content limited to 1440 px.

## Getting started

ES modules do not run from `file://`, so serve the folder over HTTP:

```bash
npx serve .
```

Then open the printed local address in your browser. Alternatively, use the Live Server
extension of your editor.

## Scripts

- `npm install` installs the development tools.
- `npm run lint` runs ESLint.
- `npm run format` formats all files with Prettier.
- `npm run format:check` checks the formatting without changing files.
- `npm run validate:html` validates `index.html` with html-validate.
- `npm run check:data-ids` verifies the 13 required `data-id` attributes.
- `npm run check` runs all of the above.

## Project structure

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the file structure and the main decisions.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Accessibility check](docs/accessibility-check.md)
- [Responsive check](docs/responsive-check.md)
- [Acceptance check](docs/ACCEPTANCE.md)
- [Open items](OPEN_ITEMS.md)
- [Interview cheat sheet](INTERVIEW_CHEATSHEET.md)
