# Gatherkeep beta interest site

A plain static, English and Italian landing page for the Gatherkeep beta interest list. The public site is published from this repository's `main` branch through GitHub Pages at `https://gerardomaruotti.github.io/gatherkeep-site/`.

## Form

Both localized forms post `email` and `language` to a dedicated Formspree form. The public form ID is in each page's `action` attribute; no account credentials belong in this repository. Formspree sends submission notifications to `maruotti@icloud.com`.

The list is for manual beta contact only. Formspree's free tier has a monthly submission limit and short dashboard history; review notifications and export submissions regularly. Delete signups and notification emails when they are no longer needed or if the sender requests deletion. The replaceable beta conversion block is `.beta-block` in both landing pages. After release, replace that block with App Store links while keeping the feature sections.

## Graphics

- `assets/gatherkeep-icon.png` and `assets/gatherkeep-icon-dark.png` are 256 px exports of the approved Default and Dark stacked-card icons in `gatherkeep/Design/IconPreviews/StackedCards/sRGB/`.
- `assets/library-framed.png` comes from the sample-content capture `gatherkeep/build/StackedCardsIntegration-20260927/Screenshots/library-light.png`; `assets/filter-framed.png` comes from `gatherkeep/build/UnifiedOrange-20260927/Screenshots/filters-dark.png`. Both are 1206 × 2622 simulator captures and were framed as a Silver iPhone 17 Pro using [Frames CLI](https://github.com/viticci/frames-cli):

  ```sh
  frames frame --device "iPhone 17 Pro Portrait" --color Silver --output /tmp/gatherkeep-framed \
    build/StackedCardsIntegration-20260927/Screenshots/library-light.png \
    build/UnifiedOrange-20260927/Screenshots/filters-dark.png
  ```

The app repository is not published with this site. Replace screenshots only with vetted sample content.

- `assets/capture-framed.png` uses the isolated camera-capture fixture screenshot at `gatherkeep/build/CameraCaptureEvidence/Verify Native Capture Menu-16_17_36_496-screenshot.png`.
- `assets/markdown-framed.png` uses the isolated Markdown preview fixture at `gatherkeep/build/MarkdownPreviewVerification/light.png`. The feature card crops the preview before test-only content.
- `assets/voice-framed.png` uses the isolated voice fixture at `gatherkeep/build/VoiceNoteUXVerification/Voice UX Final-14_31_02_979-screenshot.png`. The wide section crops the test-only transcript line.
- These three source screenshots were enlarged from 402 × 874 to 1206 × 2622 before framing with Frames CLI, preserving the app UI rather than redrawing it.
- Six integration icons under `assets/icons/` come from [Lucide](https://lucide.dev/) ([ISC license](https://github.com/lucide-icons/lucide/blob/main/LICENSE)).

## Local preview

Run `python3 -m http.server 4173` in this directory, then open `http://127.0.0.1:4173/` and `/it/`.
