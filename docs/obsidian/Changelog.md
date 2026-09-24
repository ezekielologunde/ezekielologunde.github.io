---
project: ezekielologunde-github-io
type: changelog
status: active
last_updated: 2026-09-24
tags: [project/ezekielologunde-github-io]
---

# Changelog

Git history available in this working copy contains a single commit
(the repo may be shallow-cloned or history was squashed at some point).
Recorded here for reference; extend this file going forward as real changes
land.

## 2026-09-24: Case file redesign (branch `casefile-redesign`)
- The owner said the story redesign looked machine generated and asked for an AI and cyber themed story. Spec written first: `docs/superpowers/specs/2026-09-24-casefile-redesign-design.md`. The `story-redesign` branch is kept untouched as the fallback.
- New system: `assets/css/casefile.css`, `assets/js/casefile.js` (dark forensic-lab ground, evidence-tag paper surfaces, one signal color; Archivo, Newsreader, IBM Plex Mono). `story.css` and `story.js` removed after a check found no references.
- `index.html` rebuilt as "Case file: E. Ologunde": case header with an ID-badge portrait (Exhibit A), Summary, Timeline of events (log table, 2011 to the expected D.Eng. in 2027), Evidence (B lab, C Breakwater, D AI security, E software, F written record), Findings, Chain of custody, Open lines of inquiry, Report to.
- New figures from the owner's SEAS 8414 files: discovery ledger (26 declared, 19 found, 7 missed, 1 infrastructure host, 0 phantoms), Phase 1 exposure (248 CVEs, 19 default-credential findings), a fused-triage table with a CVSS versus fused-score toggle, and `assets/img/evidence-graph.svg` (23 nodes, 22 edges). The three homelab SVGs were recolored with identical data.
- AI thread added on the owner's request: summary, timeline rows, Exhibit D (the paper's AI-assist rule, model-defense work, an illustrative LLM threat model from HoWz and lab design notes), finding F-03, and a Breakwater AI block on `homelab.html`.
- Main pages moved to sub-file headers; resource and guide pages got the shared shell only. `credentials.html` no longer shows CEH, AWS Cloud Practitioner, CISSP or OSCP (see [[Decisions]]).
- Checks: every internal href and src resolves (files and anchors), CSP on every content page, `rel="noopener noreferrer"` on every new-tab link, no em dashes on main pages.

## 2026-09-24: Story redesign and new portrait
- Wrote the design spec first: `docs/superpowers/specs/2026-09-24-story-redesign-design.md`.
- New shared system: `assets/css/story.css`, `assets/js/story.js`. Removed `future.css`, `style.css`, `future.js`, `mesh.js`, `site.js` and the old root portrait `IMG_8794.JPG` after a script confirmed nothing referenced them.
- New portrait (from LinkedIn): `assets/img/ezekiel-800.jpg` (hero), `-400.jpg` (about, contact), `-96.jpg` (header avatar, favicon).
- `index.html` rebuilt as a five-chapter story; about, homelab, built, research, writing, education, credentials and contact rebuilt in the new system with content preserved. Research gained the fuller ORCID preprint list; writing gained the other published titles; education gained the A.S. degree and professional development; credentials were corrected to the profile (see [[Decisions]]).
- All resource hub and guide pages moved onto the shared header, footer and tokens; the three directory pages' inline scripts moved to `assets/js/dir-*.js`.
- CSP and referrer meta tags on every content page; every `target="_blank"` link has `rel="noopener noreferrer"`. Link check: 587 internal references, 0 broken.

## 2026-09-24: Built page
- Added `built.html`: six case studies (Preppa marketplace, CAC North America site and admin console, two church websites, Bagsly fintech app, private HoWz automation platform, brand sites), each 90 to 140 words plus Stack, Status and Security lines. Every claim was checked against the project's own code, migrations, config or docs; unverified items were left out.
- Added portal 08 (Built) to the Explore grid in `index.html`.
- Public-safety rule for this page: no secrets, env values, project IDs, database names, internal URLs or client names; links only to live public URLs confirmed in each repo's config. See [[Decisions]].

## 2026-09-23: Homelab page (working tree, not committed)
- Added a sanitized host-based detection alerts figure (`assets/img/homelab-wazuh-alerts.svg`, rule names, levels and counts only) to `homelab.html`.
- Added a sanitized SIEM search figure (`assets/img/homelab-siem-search.svg`, real counts by source, no hosts or addresses) to `homelab.html`.
- Added a generic architecture diagram (`assets/img/homelab-architecture.svg`, roles only, no addressing) to `homelab.html`.
- Added `homelab.html` describing the homelab security monitoring lab and the Breakwater doctoral-coursework lab. Security rule for this page: no internal IP addresses, hostnames, credentials, license details, or addressing diagrams.
- Added portal 07 (Homelab) to the Explore grid in `index.html`.

## 2026 — Resource refresh
- `b5a9722` — Refresh Resource section for 2026: replaced a lapsed
  conference list and verified certification/training pricing across
  `Conferences.html` and related resource-hub pages.

---

See [[Project]] for current state and [[Tasks]] for open cleanup items.
