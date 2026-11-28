---
name: learn-chinese-app
description: Use when editing, reviewing, testing, or deploying the Mandarin Learner app in magic/, its word data, image or audio assets, Capacitor iOS and Android shell, or GitHub Pages deployment.
---

# Learn Chinese app

## Overview

Mandarin Learner is a static Vue 3 proof of concept in `magic/`. Vue loads from a CDN and `magic/script.js` mounts `Vue.createApp` directly. It is not a Vite, single-file-component, TypeScript, Pinia, Nuxt, React, or backend application. Preserve that architecture unless the user explicitly asks for a migration.

Read `docs/improvements/README.md` before non-trivial product work. Pick one small slice. The improvement documents are a menu, not one project.

## Ownership

- `magic/index.html` owns the document template and most Vue template markup.
- `magic/script.js` owns state, learning modes, audio, recording, pitch comparison, quizzes, and inline component templates.
- `magic/style.css` owns styling.
- `magic/words_data.js` defines `WORDS_DATA`. Each key is a zero-padded image filename such as `word_000.jpg`. The matching audio file uses the same base name and `.mp3`.
- `magic/words_analysis.js` is auto-generated pitch analysis data. Regenerate it with `cd utils/pitch_extractor && python3 extract_pitch.py` when audio changes.
- `magic/images/` and `magic/audio/` contain paired assets. Add, rename, or delete the image, audio, and data entry together.
- `utils/extract_to_word/generate_word_doc.py` reads `WORDS_DATA` to create Word documents. It does not update word data.

## Capacitor and mobile

`magic/capacitor.config.json` points `webDir` at `www`. `magic/scripts/sync.sh` rebuilds `www` from the static app and assets, then runs Capacitor sync. Never edit `magic/www`, `android/app/src/main/assets/public`, or `ios/App/App/public` because sync overwrites them.

Use `capacitor-best-practices` for config, plugin, sync, permission, and release questions. Use `mobile-native` for touch, safe-area, viewport, scrolling, and mobile feel. Feature-detect native plugins and keep a browser fallback.

## Deployment and cost

`magic/deploy.sh` force-pushes the `gh-pages` branch. Do not run it for verification. Run it only when the user explicitly asks for deployment and confirms the force push. GitHub Pages is the web deployment target. Vercel, Neon, and backend services are not part of the current architecture.

Follow the cost rule in `docs/improvements/README.md`. Prefer local files, browser APIs, open-source software, GitHub Pages, and GitHub Actions. Require a cost-benefit analysis before a paid service without a renewable free tier.

## Verification

`magic/package.json` has a placeholder test script that exits with an error. Do not cite `npm test` as verification. Choose the narrowest real check for the change.

- For data or asset changes, count paired files, parse `WORDS_DATA`, or compare referenced assets with files on disk.
- For web behavior, serve `magic/` locally and exercise the changed flow in a browser.
- For Capacitor changes, run `cd magic && ./scripts/sync.sh`, then build or run the affected platform when native behavior can change.
- Use `accessibility` for learner-facing UI changes and `web-perf` for loading, caching, or asset-weight changes.

## Common mistakes

- Refactoring to Vite, TypeScript, single-file components, Pinia, or React during an unrelated fix.
- Editing generated `www` or native public assets instead of source files in `magic/`.
- Updating `WORDS_DATA` without the matching image and audio files.
- Running `deploy.sh` only to smoke-test the app.
- Claiming verification from `npm test`, which is a placeholder.
