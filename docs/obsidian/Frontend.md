---
project: ezekielologunde-github-io
type: frontend
status: active
last_updated: 2026-09-24
tags: [project/ezekielologunde-github-io]
---

# Frontend

Static HTML, CSS and vanilla JS on GitHub Pages; no framework, no bundler, no third-party scripts (Google Fonts only). See [[Project]], [[Features]], [[Decisions]].

## Stylesheets
- `assets/css/casefile.css`: the case-file design system (dark ground, evidence-tag paper, one signal color; Archivo, Newsreader, IBM Plex Mono). Every page.
- `assets/css/investigation.css`: the interactive layer for the six scene pages: scene rail, route stage and caption, drawing states, tally, inline evidence graph, threat model, model-card spec sheet, glossary, `.plain` lines, `abbr`, page transitions, ambient canvas. Hidden starting states exist only under `html.motion` and a component's `is-armed` class.

## Scripts
- `assets/js/motion.js` (head, not deferred): sets `html.motion` when IntersectionObserver exists and reduced motion is off.
- `assets/js/casefile.js` (every page): menu, current page, `.rv` reveals, reading progress, contact form hand-off (`mailto:ologundeomotola@gmail.com`).
- `assets/js/investigation.js` (scene pages): old-anchor forwarding, scene fade, route graph (scroll mapping, dash offsets, camera on phones, pinning, scrubber, keyboard scrubbing), counters, discovery tally, CVE re-rank (FLIP), evidence-graph tracing, threat model, spec sheet, copy, typing snippet.
- `assets/js/ambient.js` (scene pages): one fixed, `aria-hidden` canvas per page; theme from `body[data-ambient]` (drones, circuits, scan, qubits, waves).

## Scene pages and how they are built
The six scene pages are generated from fragments by a local build script (kept outside the repo, in the session scratchpad): the graph SVGs and text list come from the attack-graph prototype data, the model card from a Python module, and a pass wraps the first use of glossary terms in `<abbr title>`. Edit the generated HTML directly for small changes; the fragments are not needed to maintain the site.

## Accessibility and fallbacks
- Without JS: every scene is static and complete (graph drawn, details open, table in fused order).
- Reduced motion: no scroll drawing, no ambient animation (one still frame), instant sorting and section opening.
- Keyboard: every node, toggle, step and summary is focusable; tabbing into an undrawn node scrubs the story to it.
- CSP meta on every page: `script-src 'self'`, `connect-src 'none'`.
