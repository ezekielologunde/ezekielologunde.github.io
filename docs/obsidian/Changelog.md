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
