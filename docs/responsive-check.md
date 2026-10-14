# Responsive check

Checked in Chrome with emulated viewports, the page served over HTTP with the first 30 Pokémon
loaded. The layout has no fixed breakpoints: the card grid uses
`repeat(auto-fill, minmax(8.5rem, 1fr))`, the content is limited to 1440 px and centered, and the
header wraps by itself.

## Results

| Width   | Finding                                                                                   | Fix                                                                                                        |
| ------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 320 px  | Content was 335 px wide, so the page scrolled sideways. The search form could not shrink. | `min-width: 0` on `.search-form`. Now no horizontal scrollbar.                                             |
| 320 px  | One card per row, each almost full width.                                                 | Smaller minimum column width (8.5 rem), so two columns fit.                                                |
| 320 px  | Search field (42 px), search button (42 px) and "Load more" (40 px) were below 44 px.     | `min-height: 2.75rem` on these buttons and on the retry button. No target under 44 px left outside links.  |
| 320 px  | Card image (120 px) was wider than the card content (104 px) and would be distorted.      | Card image is 100 px, which fits the narrowest card. No global `height: auto` (it caused a DevTools hint). |
| 320 px  | Dialog: 288 px wide, taller than the screen with stats and evolution.                     | No change needed. The content scrolls inside the dialog, the page behind it does not.                      |
| 360 px  | No horizontal scroll, two columns, dialog fits.                                           | None.                                                                                                      |
| 390 px  | No horizontal scroll, two columns, dialog fits.                                           | None.                                                                                                      |
| 768 px  | Four columns, header on one row, dialog centered at 512 px.                               | None.                                                                                                      |
| 1024 px | Six columns, no horizontal scroll.                                                        | None.                                                                                                      |
| 1440 px | Nine columns, content uses the full width.                                                | None.                                                                                                      |
| 1920 px | Nine columns, content stays at 1440 px and is centered (233 px margin on each side).      | None.                                                                                                      |
| all     | Cards in one row had different heights when they had one or two type badges.              | `height: 100%` on the card button, so every card fills its grid cell.                                      |

## Notes

- Touch targets: all buttons and the search field are at least 44 px high. The inline link to
  PokéAPI in the footer is smaller because it sits inside a sentence.
- The browser window cannot be made narrower than about 500 px, so all widths were checked with
  Chrome's viewport emulation (the 320 to 768 px sizes as mobile viewports).
- Not tested on real devices.
