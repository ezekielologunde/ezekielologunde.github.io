---
project: ezekielologunde-github-io
type: features
status: active
last_updated: 2026-08-22
tags: [project/ezekielologunde-github-io]
---

# Features

See [[Project]] for stack/purpose context.

## Main navigation (bio/credentials track)

| Page | Purpose |
|---|---|
| `index.html` | Landing page — headline, focus areas (AI-powered security, digital forensics, risk governance) |
| `about.html` | Bio — who Ezekiel is, focus, and the work behind "Cyntraix" |
| `credentials.html` | Active, certified, and in-progress cybersecurity credentials |
| `education.html` | Doctoral, graduate, and undergraduate training |
| `research.html` | Published papers on AI security, threat modeling, risk governance |
| `writing.html` | Practitioner essays on breaches, compliance, AI security |
| `contact.html` | Contact form for research collaboration, consulting, speaking (client-side handled in `site.js`, `#contactForm`) |

## Resource hub track

`Resourcehub.html` is the curated index into a set of learner-facing resource
pages:

| Page | Purpose |
|---|---|
| `basics.html` | Foundational IT/cybersecurity concepts, quickstart for newcomers |
| `guide.html` | Larger combined guide (71KB — the biggest page on the site) |
| `certification-guide.html` | Training institutes, mentors, cert roadmap |
| `leading-companies.html` | Directory of leading cybersecurity companies by market category |
| `paid-trainings.html` | Paid training institutes, lab platforms, bootcamps |
| `forums-community.html` | Communities, influencers, hands-on platforms |
| `podcast.html` | Cybersecurity podcast directory |
| `instagram.html` | Cybersecurity/tech/AI creators on Instagram |
| `Tiktok.html` | Cybersecurity/tech/AI creators on TikTok |
| `policy-framework-analysis.html` | Policy framework analysis content |

## Shared UI behavior (`assets/js/site.js`)

- Responsive nav toggle (`.eo-nav__toggle` / `.eo-nav__links`) for mobile.
- Scroll-reveal animation on elements with class `.rv`, via
  `IntersectionObserver` (falls back to instant-visible when
  `prefers-reduced-motion` is set or `IntersectionObserver` is unsupported).
- Active-section highlighting in the nav for in-page anchor links, driven by
  a second `IntersectionObserver`.
- Contact form submit handler (`#contactForm`) — client-side only in the
  observed code; no backend endpoint confirmed in this repo.
- Footer year auto-fill (`#year`).

`assets/js/future.js` and `assets/js/mesh.js` provide additional
page-specific effects (not fully audited — no obvious TODOs or breakage
found).
