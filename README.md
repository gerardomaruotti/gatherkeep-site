# Gatherkeep beta interest site

A plain static, English and Italian landing page for the Gatherkeep beta interest list. The public site is published from this repository's `main` branch through GitHub Pages at `https://gerardomaruotti.github.io/gatherkeep-site/`.

## Form

Both localized forms post `email` and `language` to a dedicated Formspree form. The public form ID is in each page's `action` attribute; no account credentials belong in this repository. Formspree sends submission notifications to `maruotti@icloud.com`.

The list is for manual beta contact only. Formspree's free tier has a monthly submission limit and short dashboard history; review notifications and export submissions regularly. Delete signups and notification emails when they are no longer needed or if the sender requests deletion.

## Graphics

- `assets/gatherkeep-icon.png` and `assets/gatherkeep-icon-dark.png` are 256 px exports of the approved Default and Dark stacked-card icons in `gatherkeep/Design/IconPreviews/StackedCards/sRGB/`.
- `assets/library-framed.png` comes from the sample-content capture `gatherkeep/build/StackedCardsIntegration-20260927/Screenshots/library-light.png`; `assets/filter-framed.png` comes from `gatherkeep/build/UnifiedOrange-20260927/Screenshots/filters-dark.png`. Both are 1206 × 2622 simulator captures and were framed as a Silver iPhone 17 Pro using [Frames CLI](https://github.com/viticci/frames-cli):

  ```sh
  frames frame --device "iPhone 17 Pro Portrait" --color Silver --output /tmp/gatherkeep-framed \
    build/StackedCardsIntegration-20260927/Screenshots/library-light.png \
    build/UnifiedOrange-20260927/Screenshots/filters-dark.png
  ```

The app repository is not published with this site. Replace screenshots only with vetted sample content.

## Local preview

Run `python3 -m http.server 4173` in this directory, then open `http://127.0.0.1:4173/` and `/it/`.
