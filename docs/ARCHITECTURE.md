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
| `js/list.js`         | Main list: first page, "Load more", restoring the list after a search |
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

## Data loading

- **Fetch-then-render.** `list.js` requests a page of 30 entries (`PAGE_SIZE`), then all details with
  `Promise.all`, and only then draws the cards in one step. The user never sees half-filled cards.
  The trade-off is a short wait with a loader instead of cards that appear one by one.
- **Cache as `Map` of promises.** Every request goes through `fetchCached` in `api.js`. The Map
  stores the promise, so two callers asking for the same entry share one request. A failed request
  is removed from the Map, otherwise a retry would get the same rejected promise.
- **Lazy evolution chain.** `fetchSpecies` and `fetchEvolutionChain` exist but are only called
  when a dialog opens, never while the list is built. Species and chain are cached as well.
- **Load more.** The offset is the number of loaded Pokémon. While a request runs, the button is
  disabled and a spinner is shown in a `role="status"` region. At the end of the list (`count`
  reached) the button is hidden.
- **Errors.** A failed request shows a plain message with a "Try again" button, which repeats the
  same action. Messages carry the class `list-message` so they are removed together.
- **Search and list.** A search replaces the list and hides "Load more". Clearing the field
  restores the already loaded Pokémon from memory, without new requests.

## Cards

- **Type color table in CSS variables.** The 18 type colors are --type-* variables in ase.css. A card gets the class card-type-<first type>, which only sets --card-color. The card reads that one variable, so the template needs no inline style and a color is changed in one place.
- **Badges are spans.** A utton may only contain inline content, so the type badges are span elements and not a list.
- **Hover and keyboard.** Hover and :focus-visible share one raised look with a shadow, plus a clear outline for keyboard focus. With prefers-reduced-motion the movement is switched off.
- **Contrast.** Dark text on the saturated type colors is still to be checked and documented in the accessibility step.

## Dialog

- **Native `<dialog>` with `showModal()`.** The browser provides the backdrop, the focus trap and Escape to close, so no custom overlay code is needed. The alternative (a positioned `div` overlay) needs all of that written and tested by hand.
- **Backdrop click.** The dialog has no padding, so a click on the dimmed area has the dialog itself as target. Clicks inside the content never have that target.
- **No background scroll.** `.no-scroll` is added to `body` on open and removed in the `close` event, which fires for every way of closing (button, backdrop, Escape).
- **Static frame, replaced content.** The close and arrow buttons stay in `index.html`; only `.dialog-info` is re-rendered. This keeps keyboard focus on a button while switching Pokémon.
- **Previous and next.** They walk through `getShownPokemon()` in `render.js`, which is whatever is on screen (list or search result), and wrap around at both ends. The arrow keys do the same.
- **Lazy evolution chain.** The species and chain are requested only after the dialog content is drawn, then cached. If the user switches Pokémon meanwhile, the late answer is dropped (`isCurrent`). Branching chains such as Eevee are flattened into one list.
- **Reset margin.** The global reset removes the default `margin: auto` of the dialog, so `.pokemon-dialog` sets it again for centering.
