# Acceptance check

Final check of the Pokédex against the project checklist, the HTML convention and the card
list. Every item was verified in the browser or with the project scripts. Open points are in
[OPEN_ITEMS.md](../OPEN_ITEMS.md).

## Requirements

| Area              | Requirement                                                       | Result                                                        |
| ----------------- | ----------------------------------------------------------------- | ------------------------------------------------------------- |
| Data              | 20 to 40 Pokémon rendered directly                                | 30 on load (`PAGE_SIZE`)                                      |
| Data              | Load more with loading state                                      | Next 30 added, button disabled and loader shown while loading |
| Data              | Caching                                                           | `Map` of promises in `js/cache.js`, no duplicate requests     |
| Search            | Minimum 3 characters, button only                                 | Button disabled below 3 characters, runs on click or Enter    |
| Search            | Message when nothing matches                                      | "No match found." inserted by JS                              |
| Card              | Name capitalized, types, image, background by type, hover         | Done, 18 type colors as CSS variables                         |
| Dialog            | Transparent overlay, close on click outside, no background scroll | Native `dialog` with `showModal()`, `.no-scroll` on `body`    |
| Dialog            | Stats and previous/next arrows                                    | All six stats, previous/next buttons and arrow keys           |
| Responsive        | No horizontal scrollbar down to 320 px                            | Checked at 320 px, `scrollWidth` 305 px on a 320 px viewport  |
| Responsive        | Content limited to 1440 px                                        | Done in `css/layout.css`                                      |
| data-id           | All 13 mandatory `data-id` attributes                             | `npm run check:data-ids` passes                               |
| HTML              | Convention (doctype, lang, charset, title, favicon, semantics)    | `html-validate` passes, see [HTML check](#html-check)         |
| Code quality      | Max 14 lines per function, camelCase, no `var`, prefer `const`    | ESLint passes                                                 |
| Accessibility     | Keyboard, focus, labels, alt texts, contrast                      | See [accessibility-check.md](accessibility-check.md)          |
| Responsive detail | Breakpoint results                                                | See [responsive-check.md](responsive-check.md)                |

## Automated checks

| Command                  | Result                                                                 |
| ------------------------ | ---------------------------------------------------------------------- |
| `npm run lint`           | Passes                                                                 |
| `npm run validate:html`  | Passes                                                                 |
| `npm run check:data-ids` | Passes, all 13 attributes present                                      |
| `npm run format:check`   | Not confirmed by the npm script, see [OPEN_ITEMS.md](../OPEN_ITEMS.md) |

Prettier was run on the project files by name (`index.html`, `css`, `js`, `scripts`, `docs`,
config files) and reports "All matched files use Prettier code style!".

## Browser check

Served over HTTP with a static server, Chrome DevTools:

- Page loads, 30 cards rendered, no console errors or warnings.
- Viewport 320 px: no horizontal overflow, dialog opens and closes, no console messages.
- Search for "pika" shows matches, search for "zzzzzz" shows "No match found.".

## HTML check

`index.html` follows the HTML convention: doctype, `lang="en"`, UTF-8, viewport, title, favicon,
one `h1`, `header`, `main`, `footer`, `nav` with a `ul` for the dialog navigation, `strong` and `em`
only, text in `p`, no inline styles.

## Extras beyond the checklist

These were built in addition to the required features. They are listed here so they can be
explained in review.

- **Keyboard navigation in the dialog.** Arrow left and right switch Pokémon, Escape closes, focus
  returns to the opening card.
- **Wrap-around.** Previous and next wrap at both ends of the shown list, which can be the full
  list or a search result.
- **Search over all Pokémon.** The full name list is loaded once and cached, so a search finds
  Pokémon that are not on screen yet.
- **Lazy evolution chain.** Species and chain are requested only when a dialog opens, then cached.
  Branching chains such as Eevee are flattened.
- **Error handling with retry.** A failed request shows a message with a "Try again" button.
- **Reduced motion.** Hover movement is switched off with `prefers-reduced-motion`.
- **data-id checker.** `scripts/check-data-ids.js` (part of `npm run check`) fails when a required
  `data-id` is missing or used twice.
