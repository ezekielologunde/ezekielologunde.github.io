---
project: ezekielologunde-github-io
type: decisions
status: active
last_updated: 2026-09-24
tags: [project/ezekielologunde-github-io]
---

# Decisions

See [[Project]] and [[Features]].

## 2026-09-24: Story redesign replaces the dark neural-mesh look

- **Decision:** the home page became one scrolling story in five numbered chapters, and every page moved to one light editorial system (`assets/css/story.css`) drawn from the new portrait. Spec: `docs/superpowers/specs/2026-09-24-story-redesign-design.md`.
- **Why:** the owner asked for a "different, intuitive, story-like design"; hiring managers skim, and a narrative with proof of work in chapter 3 answers "can he do the job" faster than a grid of portal tiles.
- **Security posture:** GitHub Pages cannot send headers, so each content page carries a CSP meta tag (`script-src 'self'`, no inline scripts; `'unsafe-inline'` for styles only, because preserved resource pages use inline style attributes) and `referrer: strict-origin-when-cross-origin`. `frame-ancestors` cannot be set in a meta tag, accepted as a residual risk. No trackers; Google Fonts is the only third party.
- **Resource pages:** body copy kept as is; they received the shared shell and restyled `eo-*` components rather than a rewrite. `guide.html` and `policy-framework-analysis.html` keep their own internal styles with the shared header and footer.
- **URLs:** nothing renamed or removed; the five space-named redirect stubs stay.
- **Credentials corrected to the profile:** Security+ dated May 2026 (the old 2024 date was known to be wrong), CMMC 2.0 listed as a LinkedIn Learning course rather than a DoD certification, the AI engineering certificate credited to App Academy. CEH, AWS Cloud Practitioner, CISSP (studying) and OSCP (studying) are kept from the previous site but are not in the profile files; confirm with the owner.
- **Alternatives considered:** keeping the dark theme with a new portrait (rejected: not a clear break), and rewriting every resource page (rejected: large content risk for little gain).

## 2026-09-24: Built page describes private work without linking it

- **Decision:** `built.html` shows software Ezekiel built, but repositories that hold private data or move money (Bagsly, the HoWz automation platform) are described by architecture and security design only, with no repo link.
- **Why:** the page is for hiring managers, and the security design is the evidence they need; the code itself is not safe to publish.
- **Rule for every entry:** Security lines state only what the project's code, migrations or docs show (for example RLS policies present in migrations, webhook signature checks in code). Live links come only from a repo's own config (site URL constants, canonical tags, README production URL). Client engagements are excluded.
- **Alternatives considered:** linking every GitHub repo (rejected: several contain operational notes not meant for a portfolio audience), and adding the page to the main nav (rejected: the homelab page set the pattern of linking from the index portal grid only).
