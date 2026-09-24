---
project: ezekielologunde-github-io
type: project-overview
status: active
last_updated: 2026-09-24
tags: [project/ezekielologunde-github-io]
---

# Project

## What it is

`ezekielologunde.github.io` is Ezekiel Ologunde's personal website, published via
**GitHub Pages** from this repository (username.github.io repos are served
directly as static sites, no build step). The site positions Ezekiel as a
"Cybersecurity Leader & Educator" — bio/credentials, published research and
writing, and a large curated resource hub for people entering or growing in
cybersecurity (certifications, training providers, conferences, communities,
creators to follow on social platforms).

## Stack

- **Static HTML/CSS/JS** — no framework, no bundler, no package.json. Every
  page is a hand-authored `.html` file at the repo root.
- **Styling**: one shared stylesheet, `assets/css/story.css` (story design
  system, added 2026-09-24: warm paper, navy ink, burgundy accent, Fraunces,
  Source Sans 3 and JetBrains Mono). Tokens are prefixed `--eo-`; legacy
  aliases (`--signal`, `--muted`, and so on) keep the preserved resource
  pages' inline styles working. See [[Decisions]].
- **Behavior**: `assets/js/story.js` (menu toggle, current page, scroll
  reveals, home chapter rail, reading progress bar, mailto contact form),
  plus `assets/js/dir-tiktok.js`, `dir-instagram.js` and `dir-podcast.js`
  holding the directory data and search that used to be inline scripts.
- **Fonts**: Google Fonts, loaded via `<link rel="preconnect">` in each page
  head.
- **Hosting**: GitHub Pages, deployed straight from the repo (no CI/build
  pipeline observed — no `.github/workflows/`).

## Purpose

A personal/professional site serving two audiences:
1. Visitors evaluating Ezekiel's background — bio, credentials, education,
   research, and writing (`about.html`, `credentials.html`, `education.html`,
   `research.html`, `writing.html`, `contact.html`).
2. Cybersecurity learners looking for curated resources — certifications,
   training programs, conferences, forums/communities, and creators to
   follow on TikTok/Instagram/podcasts (`Resourcehub.html` and its
   linked sub-pages).

See [[Features]] for the page-by-page breakdown, [[Tasks]] for known
cleanup items, and [[Changelog]] for project history.

## Repo layout

```
/index.html                 landing page
/about.html, contact.html,
/credentials.html, education.html,
/research.html, writing.html      bio/credential pages, linked from main nav
/Resourcehub.html                 curated-resources index
/basics.html, guide.html,
/certification-guide.html,
/leading-companies.html,
/paid-trainings.html,
/forums-community.html,
/podcast.html, instagram.html,
/Tiktok.html,
/policy-framework-analysis.html   resource-hub sub-pages
/Acronyms.html, Certifications.html,
/Conferences.html, Resources.html,
"Certification Guide.html", "Forums & Community.html",
"Leading Cybersecurity Companies.html",
"Paid Trainings.html",
"Policy framework analysis.html"  older/legacy copies (see [[Tasks]])
/assets/css/story.css
/assets/js/story.js, dir-*.js
/assets/img/ezekiel-{800,400,96}.jpg  portrait (hero, small placements, header avatar)
/assets/img/homelab-*.svg         sanitized homelab figures
/docs/superpowers/specs/          design specs (story redesign, 2026-09-24)
```

No `Architecture.md` — the layout above is the entire architecture; there is
no client/server split, no data layer, and no build pipeline to document
separately.
