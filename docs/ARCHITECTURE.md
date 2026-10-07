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
