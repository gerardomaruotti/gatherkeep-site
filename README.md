# OrbKeep beta interest site

A plain static, English and Italian landing page for the OrbKeep beta interest list. The public site is published from this repository's `main` branch through GitHub Pages at `https://gerardomaruotti.github.io/orbkeep/`.

## Form

Both localized forms post the same three fields (`name`, `email`, and `language`) to a dedicated Formspree form. The public form ID is in each page's `action` attribute; no account credentials belong in this repository. Formspree sends submission notifications to `maruotti@icloud.com`.

The list is for manual beta contact only. Formspree's free tier has a monthly submission limit and short dashboard history; review notifications and export submissions regularly. Delete signups and notification emails when they are no longer needed or if the sender requests deletion.

## Graphics

- `assets/orbkeep-icon.png` and `assets/orbkeep-icon-dark.png` are 256 px versions of the approved Default and Dark icons in `gatherkeep/Design/IconPreviews/Orb/sRGB/`.
- `assets/library-framed.png` comes from the sample-content capture `gatherkeep/build/TagVisibilityEvidence/light.png` (1206 × 2622). It was framed as a Silver iPhone 17 Pro using [Frames CLI](https://github.com/viticci/frames-cli):

  ```sh
  frames frame --device "iPhone 17 Pro Portrait" --color Silver --output /tmp/orbkeep-framed light.png
  ```

The app repository is not published with this site. Replace screenshots only with vetted sample content.

## Local preview

Run `python3 -m http.server 4173` in this directory, then open `http://127.0.0.1:4173/` and `/it/`.
