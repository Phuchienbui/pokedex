# Architecture

## Stack

Plain HTML, CSS and JavaScript (ES modules). No framework and no build tool. Data comes from the
[PokéAPI](https://pokeapi.co/api/v2/). ES modules need an HTTP server, `file://` does not work.

## File structure

| Path                 | Responsibility                                                        |
| -------------------- | --------------------------------------------------------------------- |
| `index.html`         | Page skeleton: header, `main`, footer, module entry                   |
| `css/base.css`       | Design tokens (`:root` variables), reset, typography, utility classes |
| `css/layout.css`     | Page-level layout and the 1440 px content width                       |
| `css/components.css` | Reusable components (logo, later cards, dialog)                       |
| `js/main.js`         | Entry point, wires modules together                                   |
| `js/api.js`          | All requests to the PokéAPI                                           |
| `js/cache.js`        | `Map` caches for details, species and evolution chains                |
| `js/templates.js`    | Functions returning HTML strings                                      |
| `js/render.js`       | Writes templates into the DOM                                         |
| `js/search.js`       | Search input and filtering                                            |
| `js/dialog.js`       | Detail dialog                                                         |
| `assets/`            | Logo and favicon                                                      |

## Decisions

- **One module per concern.** Network, cache, templates, rendering, search and dialog are separate
  so each file stays small and each function stays within the 14-line limit.
- **Templates are separate from rendering.** Templates only build strings, `render.js` is the only
  place that touches the DOM.
- **CSS split by role.** Tokens and reset, layout and components are separate files. Colors, spacing,
  radii and the 18 type colors live in `:root` variables, so a value is changed in one place.
- **Own favicon.** `assets/favicon.svg` is an original, generic ball symbol (no third-party logo).
  It is also used as the header logo.

## Search

- **Name list instead of filtering loaded cards.** The PokéAPI has no search endpoint. The full name
  list (`/pokemon?limit=100000`, names and URLs only) is requested once, cached in `cache.js` and
  filtered by substring. This finds every Pokémon, not only the ones already on screen. The cost
  is one larger first request (around 1300 entries) on the first search.
- **Alternative that was rejected:** filtering only the already loaded cards needs no extra request,
  but a search for a Pokémon that was not loaded yet would wrongly report "No match found.".
- **Rules:** the query is trimmed and lowercased. The button is enabled from 3 characters and the
  search only runs on button click or Enter. At most `PAGE_SIZE` matches are shown. The list
  contains alternate forms such as `pikachu-gmax`, because the API lists them as separate entries.
- **No match:** `render.js` inserts `<p data-id="not-found">` and removes it on the next search or
  when the field is cleared. The text is static, user input never enters the DOM.
