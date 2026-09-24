---
project: ezekielologunde-github-io
type: features
status: active
last_updated: 2026-09-24
tags: [project/ezekielologunde-github-io]
---

# Features

See [[Project]] for stack/purpose context.

## Main navigation (bio/credentials track)

| Page | Purpose |
|---|---|
| `index.html` | Case file: case header with the portrait as an ID badge, then Summary, Timeline of events, Evidence (Exhibits B to F, including AI security), Findings, Chain of custody, Open lines of inquiry and Report to. Includes a CVSS versus fused-score triage toggle. Rebuilt 2026-09-24 on `casefile-redesign`. |
| `about.html` | Bio — who Ezekiel is, focus, and the work behind "Cyntraix" |
| `credentials.html` | Active, certified, and in-progress cybersecurity credentials |
| `education.html` | Doctoral, graduate, and undergraduate training |
| `research.html` | Published papers on AI security, threat modeling, risk governance |
| `writing.html` | Practitioner essays on breaches, compliance, AI security |
| `homelab.html` | Self-hosted security monitoring lab (described by role, no addresses or hostnames) and the Breakwater OT/IoT lab, labeled as doctoral coursework. Added 2026-09-23; in the main nav as "Lab" since 2026-09-24 and featured in chapter 3 of the home story. |
| `built.html` | Case studies of software Ezekiel built (Preppa, CAC North America, church sites, Bagsly, the private HoWz automation platform, brand sites), each with Stack, Status and Security lines taken only from the projects' own code, migrations and docs. Private repos are described, never linked. Added 2026-09-24; in the main nav and featured in chapter 3 of the home story. See [[Decisions]]. |
| `contact.html` | Contact form for research collaboration, consulting, speaking (client-side handled in `casefile.js`, `#contactForm`; opens the visitor's mail client, nothing is sent to a server) |

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

## Shared UI behavior (`assets/js/casefile.js`)

- Main nav on every page (Case file, About, Lab, Built, Research, Writing,
  Education, Credentials, Resources, Contact); collapses to a Menu button
  under 1080px (`aria-expanded`, Escape closes). The current page gets
  `aria-current="page"`; resource pages mark Resources via
  `body[data-section]`.
- Scroll reveals on `.rv` elements, only when JS runs and motion is allowed
  (the hidden state needs the `html.js` class), so content never stays hidden.
- Home triage toggle (`[data-triage]`): reorders the Breakwater CVE table by CVSS or fused score with `aria-pressed` buttons and a polite live region; hidden without JS, when the table stays in fused order.
- Reading-progress bar under the sticky header.
- Contact form (`#contactForm`) opens a prefilled `mailto:`.
- Footer year (`[data-year]`).
- Detail pages end with a previous and next section strip (About, Education,
  Lab, Built, Research, Writing, Credentials, Contact).

Directory pages (`Tiktok.html`, `instagram.html`, `podcast.html`) load
their data and search from `assets/js/dir-*.js`.
