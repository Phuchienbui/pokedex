# Open items

Points that are known and do not block the project. Each one names what is missing and how it
would be closed.

## Testing

- **Real devices.** The layout was checked with viewport emulation at 320, 360, 390, 768, 1024,
  1440 and 1920 px. Screenshots exist only for 1440 and 1920 px. Test on a real phone.
- **Screen reader.** Labels and focus order were checked in the browser only. Test with NVDA or
  VoiceOver.
- **Contrast on the rendered page.** Ratios were calculated from the color values, not measured
  with a tool on the page. Measure with a contrast checker in the browser.

## Tooling

- **Prettier directory check.** `npm run format:check` runs `prettier --check .`. In this
  environment Prettier reports "No supported files were found in the directory" for `.`, so the
  npm script exits with an error. Prettier passes when the project files are listed by name.
  Run `npm run format:check` on the development machine to confirm, and fix the script or the
  ignore setup if it fails there too.

## Documentation

- **card-image position.** The checklist says the image is in the dialog, the table says it is
  inside the card. It is set on the image inside the card. Documented in the card 08 comment.

## Git

- **Branch name.** The work is on `feature/project-setup`. The card convention is
  `feature/NN-<slug>` per card. Keep the existing history as it is; use the convention for new
  branches only.
