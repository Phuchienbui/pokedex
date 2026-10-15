# Accessibility check

## Structure and labels

| Element        | Solution                                                                        |
| -------------- | ------------------------------------------------------------------------------- |
| Pokémon list   | `ul` with `li`, each item holds one `button` (card)                             |
| Card           | `aria-label="Open details for <Name>"`, image `alt` is the name                 |
| Search         | `form role="search"`, hidden `label`, button `aria-label="Search Pokémon"`      |
| Load more      | `aria-label="Load more Pokémon"`, loader text in a `role="status"` region       |
| Messages       | Errors use `role="alert"`                                                       |
| Dialog         | `aria-labelledby` points to the title (name and ID), `aria-label` as a fallback |
| Dialog buttons | "Close details", "Show previous Pokémon", "Show next Pokémon"                   |
| Images         | Every image has an `alt`. The header logo is decorative, so its `alt` is empty. |

## Keyboard and focus

- Everything is reachable with Tab: search field, search button, cards, load more.
- Enter or Space on a card opens the dialog. Focus moves to the dialog, which is announced with the
  Pokémon's name. Tab stays inside the dialog (native modal behaviour).
- Arrow left and right switch between Pokémon, Escape closes the dialog.
- When the dialog closes, focus returns to the card that opened it, also after stepping to other
  Pokémon with the arrows.
- Every focusable element shows a visible outline (`:focus-visible`, 3 px, dark). The dialog
  itself gets no outline because it is only a container.

## Contrast

Ratios follow WCAG (4.5:1 for normal text). Dark text is `#1d2433`.

| Type     | Dark text | White text | Result                       |
| -------- | --------- | ---------- | ---------------------------- |
| normal   | 6.27      | 2.48       | dark text                    |
| fire     | 5.78      | 2.69       | dark text                    |
| water    | 5.01      | 3.10       | dark text                    |
| electric | 10.36     | 1.50       | dark text                    |
| grass    | 7.47      | 2.08       | dark text                    |
| ice      | 9.76      | 1.59       | dark text                    |
| fighting | 2.75      | 5.65       | **white text** (was failing) |
| poison   | 2.78      | 5.58       | **white text** (was failing) |
| ground   | 8.78      | 1.77       | dark text                    |
| flying   | 5.85      | 2.65       | dark text                    |
| psychic  | 4.94      | 3.15       | dark text                    |
| bug      | 7.08      | 2.19       | dark text                    |
| rock     | 6.02      | 2.58       | dark text                    |
| ghost    | 2.62      | 5.93       | **white text** (was failing) |
| dragon   | 2.66      | 5.85       | **white text** (was failing) |
| dark     | 2.32      | 6.69       | **white text** (was failing) |
| steel    | 7.90      | 1.97       | dark text                    |
| fairy    | 5.78      | 2.69       | dark text                    |

- Cards of the five failing types set `--card-text: #ffffff`. The dialog heading uses the same
  variable.
- Type badges have their own light background (70% white) with dark text. This gives at least 9.5:1
  on every type color, so badges are the same on all cards.
- The red of buttons was `#e63946` (4.17:1 with white text) and is now `#c92a35` (5.43:1).
  The hover color `#b3202c` has 6.65:1.
- Muted text `#5a6478` has 5.36:1 on the page background and 5.95:1 on white. The link color
  `#b3202c` has 5.99:1 on the page background.
- Disabled buttons use muted text on a gray background. This is allowed to be below 4.5:1 because
  disabled controls are exempt.

## Not covered

- No test with a real screen reader (NVDA, VoiceOver). Labels and focus order were checked in the
  browser only.
- Contrast was calculated, not measured with a tool on the rendered page.
