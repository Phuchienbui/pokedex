# Interview cheat sheet

Short answers to the questions this project should be able to answer. Each answer points to the
code or document that shows it.

## Architecture

- **Why no framework?** The task is plain HTML, CSS and ES modules. Without a build step, the
  code runs as written and each module is easy to read. See [ARCHITECTURE.md](docs/ARCHITECTURE.md).
- **Why separate templates and rendering?** Templates only return strings, `js/render.js` is the
  only place that writes to the DOM. Strings can be checked without a browser.
- **Why one module per concern?** Network (`api.js`), cache, templates, list, search and dialog
  are separate, so each function stays within 14 lines and each file has one reason to change.

## Data and performance

- **Fetch, then render.** A page of 30 is requested, all details come in with `Promise.all`, and
  the cards are drawn in one step. Trade-off: a short wait with a loader instead of cards that
  appear one by one.
- **Map of promises as cache.** Two callers asking for the same Pokémon share one request. A failed
  request is removed, so retry works.
- **Lazy evolution chain.** Species and chain are requested only when the dialog opens.

## Search

- **Why load all names?** The PokéAPI has no search endpoint. One request for the name list lets
  the search find Pokémon that are not on screen. Trade-off: one larger first request.
- **Why a button and not live search?** The task asks for a button, with at least 3 characters
  and a message on no match.

## Dialog

- **Why `<dialog>` and `showModal()`?** The browser provides the backdrop, focus trap and Escape.
  A custom overlay would need all of that written and tested by hand.
- **How is background scrolling prevented?** `.no-scroll` on `body`, removed in the `close` event,
  which fires for every way of closing.

## Accessibility and responsive design

- **Cards as buttons in a list.** The list is a `ul`, each card is a `button`, so keyboard and
  screen readers get the right roles. See [accessibility-check.md](docs/accessibility-check.md).
- **Contrast.** Five type colors failed with dark text, so they use white text. The button red was
  darkened to reach 4.5:1 with white text.
- **320 px without scrolling.** A search form that could not shrink caused a 15 px overflow. Fixed
  in the layout. See [responsive-check.md](docs/responsive-check.md).

## Quality and checks

- **What runs on every change?** `npm run check`: ESLint, Prettier check, html-validate and the
  data-id check.
- **Why a script for data-ids?** It catches a missing or duplicated required attribute before the
  page is used.
