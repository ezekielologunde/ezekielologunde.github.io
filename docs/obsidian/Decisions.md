---
project: ezekielologunde-github-io
type: decisions
status: active
last_updated: 2026-09-24
tags: [project/ezekielologunde-github-io]
---

# Decisions

See [[Project]] and [[Features]].

## 2026-09-24: Built page describes private work without linking it

- **Decision:** `built.html` shows software Ezekiel built, but repositories that hold private data or move money (Bagsly, the HoWz automation platform) are described by architecture and security design only, with no repo link.
- **Why:** the page is for hiring managers, and the security design is the evidence they need; the code itself is not safe to publish.
- **Rule for every entry:** Security lines state only what the project's code, migrations or docs show (for example RLS policies present in migrations, webhook signature checks in code). Live links come only from a repo's own config (site URL constants, canonical tags, README production URL). Client engagements are excluded.
- **Alternatives considered:** linking every GitHub repo (rejected: several contain operational notes not meant for a portfolio audience), and adding the page to the main nav (rejected: the homelab page set the pattern of linking from the index portal grid only).
