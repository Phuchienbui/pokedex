# Pokédex

A browser-based Pokédex built with plain HTML, CSS and JavaScript (ES modules), using the
[PokéAPI](https://pokeapi.co/).

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
- `npm run check` runs lint and the format check.
