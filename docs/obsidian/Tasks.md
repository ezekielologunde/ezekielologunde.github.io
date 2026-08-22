---
project: ezekielologunde-github-io
type: tasks
status: active
last_updated: 2026-08-22
tags: [project/ezekielologunde-github-io]
---

# Tasks

No explicit `TODO`/`FIXME` markers exist in the codebase (checked all
`.html`/`.js`). The items below are gaps observed while auditing the repo,
not commitments — verify before acting on them.

## Likely cleanup

- **Duplicate/legacy pages**: the repo root has both kebab-case pages linked
  from navigation (`certification-guide.html`, `forums-community.html`,
  `leading-companies.html`, `paid-trainings.html`,
  `policy-framework-analysis.html`) and older Title-Case files with spaces
  in the name (`"Certification Guide.html"`, `"Forums & Community.html"`,
  `"Leading Cybersecurity Companies.html"`, `"Paid Trainings.html"`,
  `"Policy framework analysis.html"`, plus `Acronyms.html`,
  `Certifications.html`, `Conferences.html`, `Resources.html`) that are not
  referenced from `index.html`'s nav. These look like earlier
  export/renamed versions left in place. Worth confirming whether they're
  dead weight to delete, or intentionally kept for old inbound links.
- **`IMG_8794.JPG`** sits at the repo root (424KB) rather than under
  `assets/` — likely should be moved into `assets/img/` (or wherever the
  site's images live) for consistency, if it's still in use.
- **No CI/deploy workflow**: no `.github/workflows/` — GitHub Pages is
  presumably serving directly off `main`. Fine for a static site, but worth
  confirming Pages settings (branch/source) if changes ever stop
  publishing.

## Confirmed non-issues (do not "fix")

- The contact form's mailto: handoff (`assets/js/site.js`) is intentional,
  not a stub — there is no backend in this repo.
- Input `placeholder="..."` attributes flagged by a naive grep for
  "placeholder" are normal HTML form UX text, not TODO markers.
