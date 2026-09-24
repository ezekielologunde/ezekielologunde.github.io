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
| `index.html` | Scene 01, the case opens: case header with the portrait as Exhibit A, a plain-English hook (what he does, why it matters, the roles he wants), six key findings with real numbers, and an index of the other five scenes. Ambient layer: robot drones over a grid. Rebuilt 2026-09-24 on `interactive-story`. |
| `route.html` | Scene 02: the career as an attack graph (22 nodes) pinned while the page scrolls; it draws itself in date order, a caption panel tells each step, a year ticker counts, and the red six-hop path lands on "Securing AI-era systems". Nodes are clickable and focusable, a range input scrubs, the same graph is listed as text. Vertical layout under 760px. Ambient: circuit traces. Added 2026-09-24. |
| `evidence.html` | Scene 03: Exhibits B (lab, counting figures), C (Breakwater: discovery tally, inline evidence graph linked to the CVE table, CVSS versus fused-score re-rank with reorder motion), E (software) and F (writing). Ambient: laser scan over a lattice. Added 2026-09-24. |
| `ai.html` | Scene 04: Exhibit D, the AI thread, with an interactive, illustrative threat model of an AI assistant near real systems (hover, focus or click a step to see threats and controls). Ambient: Bloch sphere, qubit rings, one drone. Added 2026-09-24. |
| `about.html` | Scene 05: the subject as an AI model card, a collapsible spec sheet of 12 sections (summary, details, intended use, out-of-scope use with honest gaps, training data, evaluation, limitations, safety, changelog, citation with copy button, glossary, contact) with a typing "how to get started" snippet. Ambient: entangled particle pairs and wavefunction rings. URL kept. |
| `credentials.html` | Active, certified, and in-progress cybersecurity credentials |
| `education.html` | Doctoral, graduate, and undergraduate training |
| `research.html` | Published papers on AI security, threat modeling, risk governance |
| `writing.html` | Practitioner essays on breaches, compliance, AI security |
| `homelab.html` | Self-hosted security monitoring lab (described by role, no addresses or hostnames) and the Breakwater OT/IoT lab, labeled as doctoral coursework. Added 2026-09-23; in the main nav as "Lab" since 2026-09-24 and featured in chapter 3 of the home story. |
| `built.html` | Case studies of software Ezekiel built (Preppa, CAC North America, church sites, Bagsly, the private HoWz automation platform, brand sites), each with Stack, Status and Security lines taken only from the projects' own code, migrations and docs. Private repos are described, never linked. Added 2026-09-24; in the main nav and featured in chapter 3 of the home story. See [[Decisions]]. |
| `contact.html` | Scene 06, report to: email (ologundeomotola@gmail.com), profiles, and a form that opens the visitor's mail app (`casefile.js`, `#contactForm`); nothing is sent to a server. Ambient: robot drones. |

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

- Main nav on every page (Case file, Route, Evidence, AI thread, Model card,
  Lab, Built, Research, Resources, Contact; Writing, Education and Credentials
  are in the footer); collapses to a Menu button
  under 1080px (`aria-expanded`, Escape closes). The current page gets
  `aria-current="page"`; resource pages mark Resources via
  `body[data-section]`.
- Scroll reveals on `.rv` elements, only when JS runs and motion is allowed
  (the hidden state needs the `html.js` class), so content never stays hidden.
- Scene behavior lives in `assets/js/investigation.js` (route graph, counters, tally, triage re-rank with FLIP motion, evidence-graph tracing, threat model, spec sheet, copy, typing, old-anchor forwarding, scene fade) and `assets/js/ambient.js` (background canvas); `assets/js/motion.js` sets `html.motion` in the head when motion is allowed.
- Plain-English layer: an "In plain English" line (`.plain`) at the top of each major section, and `<abbr title>` on the first use of glossary terms (build script, see [[Frontend]]).
- Reading-progress bar under the sticky header.
- Contact form (`#contactForm`) opens a prefilled `mailto:`.
- Footer year (`[data-year]`).
- Detail pages end with a previous and next section strip (About, Education,
  Lab, Built, Research, Writing, Credentials, Contact).

Directory pages (`Tiktok.html`, `instagram.html`, `podcast.html`) load
their data and search from `assets/js/dir-*.js`.
