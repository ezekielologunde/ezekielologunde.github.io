---
project: ezekielologunde-github-io
type: design-spec
status: approved-for-build
last_updated: 2026-09-24
supersedes: 2026-09-24-story-redesign-design.md (visual system and home narrative only)
---

# Case file redesign: design spec (2026-09-24)

Written before any code, per the owner's standing rule (design first, security first). Built on branch `casefile-redesign`, cut from `story-redesign`, which stays untouched as the fallback.

## 0. Why

The owner reviewed the story redesign (cream page, italic burgundy surname, big italic numbered chapters, mono micro-labels, timeline dots, pill buttons, uniform card rhythm) and said it looks machine generated. He asked for a "more AI cyber themed story". The fault was genericness, so the new version is built on something only he has: he is a forensics person (M.S. Cyber Forensics), so the story is told as a case file.

## 1. Concept

**"Case file: E. Ologunde."** The home page is an investigation report, written in the first person by the subject, about how a systems kid from Ilorin, Nigeria ended up in security engineering, research and teaching. The joke is light and stated once: the subject filed his own report, so bias is noted in the margin. Everything else is plain, specific and readable.

Report parts on the home page:

| Part | Name | Content | Source of facts |
|---|---|---|---|
| Header | Case header block | Name, occupation, last known location, file opened (June 2011), status stamp "Open to work", ID badge with the portrait as Exhibit A | master-profile.json, existing site |
| 1 | Summary | Three plain sentences: who, what now, what next | story-redesign copy |
| 2 | Timeline of events | Dated log rows, June 2011 to the expected D.Eng. in September 2027 (marked pending) | master-profile.json experience, education, certifications |
| 3 | Evidence | Exhibit B security monitoring lab, Exhibit C Breakwater (doctoral coursework), Exhibit D software built, Exhibit E the written record | homelab.html, GWU project files, built.html, research.html |
| 4 | Findings | Five findings, each stated plainly with the exhibits that support it | derived only from the exhibits |
| 5 | Chain of custody | Every institution that has held the subject, in order, with capacity and dates; client names redacted | master-profile.json experience |
| 6 | Report to | Email, profiles, case status | existing contact page |

Credential rules carried over from the story redesign: Security+ May 2026; CMMC 2.0 is a LinkedIn Learning course; the AI engineering certificate is from App Academy. CEH, AWS Cloud Practitioner, CISSP and OSCP are not shown anywhere until the owner confirms them (they are removed from credentials.html). The D.Eng. is always "expected September 2027"; the title "Dr." is never used.

## 2. Figures generated for this redesign (real data, sanitized)

All from the owner's own SEAS 8414 doctoral coursework files under `Projects/GWU`, labeled "doctoral coursework" wherever shown. The Breakwater devices are simulated containers; no address of any kind (IP, MAC, hostname, subnet) appears on the site.

1. **Discovery ledger** (HTML): 26 declared devices, 19 found by type, 7 missed (the Nest camera, the Echo Dot and a five-endpoint cloud range, none with a local listening port), plus the MQTT broker that ground truth lists as infrastructure, for 20 admitted hosts and 0 phantoms. Source: `lab-results/week-01/evidence/discovery-quality-vs-groundtruth.txt`, `ex02-final-results.json`, and the coverage table in `overleaf-paper/main.tex`.
2. **Phase 1 exposure numbers**: 248 NVD CVEs matched (60 critical, 76 high, 107 medium, 5 low) and 19 default-credential findings. Source: `vulnerability_summary` and per-host `default_creds` in `ex02-final-results.json`.
3. **Fused triage re-rank** (HTML table plus a small sort toggle): the 10 highest-scoring OpenSSH 8.4p1 CVEs from the Phase 3 notebook run, with CVSS, EPSS, KEV and the fused score `CVSS + 10*EPSS + 5*KEV + 2*ransomware`. It shows the paper's point in real numbers: CVE-2025-26465 (CVSS 6.8) outranks CVE-2008-3844 (CVSS 9.3) because its EPSS is 0.62 against 0.03. Source: triage output cells in `phase03-in-class-notebook.ipynb.txt`.
4. **Evidence graph** (`assets/img/evidence-graph.svg`): the notebook's directed graph, 23 nodes and 22 edges: lab asset, SSH service, CPE, the top 10 CVEs by fused score and one patch action per CVE. No CVE was in CISA KEV, so no KEV node exists; the figure says so. Source: the graph-building cell and its printed output in the same notebook.

Homelab figures keep their content (about 304,700 events in 24 hours from five sources; about 3,700 host-based alerts over 7 days). The three homelab SVGs are recolored into the new palette with identical data and text, because their neon pink, purple and cyan clash with the anti-template rules.

## 3. Anti-template rules (the owner's complaint, enforced)

No purple, pink or blue gradients or glow. No mesh or particle backgrounds. No glassmorphism (the header is opaque). No italic serif accent on the name. No oversized numbered chapter numerals. No pill buttons (square corners everywhere). No timeline dot-and-line layouts (the timeline is a ruled log table). No centered symmetric hero (the case header is a left-weighted form with an offset badge). No identical rounded cards in uniform grids (resource cards become ruled index cells with no radius and no shadow). No emoji, no stock icons.

Forensic details, used with restraint and only where they carry meaning: case header block, evidence tag labels on exhibits, redaction bars over client names and other private details, ruled report forms, margin notes. Decorative hashes appear only as small metadata marked `aria-hidden`.

## 4. Visual system

Dark forensic-lab ground, off-white evidence-tag surfaces, one signal color (evidence-tag red-orange).

| Token | Value | Use |
|---|---|---|
| `--cf-ground` | `#15171a` | page background |
| `--cf-ground-2` | `#1c1f23` | alternate bands |
| `--cf-ground-3` | `#24282d` | raised panels, figure frames |
| `--cf-text` | `#e6e1d6` | body copy on ground |
| `--cf-muted` | `#a39f96` | secondary copy on ground and ground-2 |
| `--cf-tag` | `#ebe5d8` | evidence-tag paper (case header, exhibit tags, forms) |
| `--cf-tag-2` | `#ddd5c4` | ruled lines and fills on tag paper |
| `--cf-ink` | `#18191b` | text on tag paper |
| `--cf-ink-muted` | `#55514a` | secondary text on tag paper |
| `--cf-signal` | `#f0714f` | signal on ground: links, focus ring, markers |
| `--cf-stamp` | `#a8321c` | signal on tag paper (stamps, tag labels) |
| `--cf-redact` | `#0b0c0d` | redaction bars |

Contrast targets (checked by script): text, muted and signal on every ground at least 4.5:1; ink, ink-muted and stamp on tag paper at least 4.5:1.

**Type**: Archivo (variable width and weight; condensed widths for headings and labels, normal width for UI) as the technical grotesque; Newsreader for prose (a humane text face, roman only, no italics on names or headings); IBM Plex Mono only for real data (dates in the log, CVE IDs, scores, counts, file references). Google Fonts with `display=swap` and preconnect. Body 18px desktop, 17px mobile, line height 1.6, measure about 66ch.

**Grid**: 12 columns, 1200px max, 16px side gutter on phones. Density changes on purpose: sparse summary, dense log table, mixed exhibits (one large figure plus a narrow notes column, then a two-up pair), dense custody table, sparse report-to block.

**Components**: case header form, ID badge, part header (thick top rule, "Part n" label in condensed caps, heading in Archivo), log table, exhibit tag, figure frame, evidence ledger cells, findings list, custody table, redaction bar, stamp, square buttons, ruled index cells.

**Portrait**: original colors, square crop, inside the ID badge (clip slot, tag paper frame, slight tilt on wide screens only, none on phones or with reduced motion). 800px file on the home page with `fetchpriority="high"`, 400px on about and contact, 96px for the header mark. Descriptive alt text, width and height always set.

## 5. Motion

- Reveals: 400ms fade only, once per element, via IntersectionObserver; hidden state only after the script adds a class to `html`, so a script failure never hides content.
- The status stamp settles once (scale 1.08 to 1, 300ms).
- `prefers-reduced-motion: reduce` removes reveals, the stamp motion, smooth scrolling and the badge tilt.
- No autoplay, parallax, cursor effects, canvas or loaders.

## 6. Interaction: the triage toggle

A two-button toggle above the triage table: "Rank by CVSS" and "Rank by fused score". Buttons use `aria-pressed`; the table body is reordered in place; a polite live region announces the new order's first entry. Without JavaScript the table is shown in fused-score order and the buttons are hidden. Plain JS, no network, no dependencies.

## 7. Information architecture and URLs

- Primary nav targets unchanged: Case file (home), About, Lab, Built, Research, Writing, Education, Credentials, Resources, Contact. Collapses to a square "Menu" button under 1040px.
- Detail pages share one template: sub-file header (file reference line, title, lede), sections with part headers, and a ruled "previous / next section" strip.
- Resource hub and guide pages keep their body copy and get the shared shell (header, footer, tokens). `guide.html` and `policy-framework-analysis.html` keep their own internal styles and receive the shared header and footer only.
- No page is renamed or removed; the five space-named redirect stubs are untouched; in-page anchors other pages link to (`homelab.html#breakwater`, `#monitoring`, `#lessons`) are preserved.
- `assets/css/story.css` and `assets/js/story.js` are removed only after a link check shows nothing references them.

## 8. Accessibility

Skip link, landmarks, one h1 per page, ordered headings, visible 3px focus ring in the signal color, `aria-current="page"` in the nav, menu button with `aria-expanded` and `aria-controls`, tables with `scope` and captions, wide tables scroll inside their own focusable region, redaction bars carry visually hidden text saying what was withheld and why, the stamp is real text. Works from 360px with no horizontal page scroll.

## 9. Security posture (unchanged from the story spec)

Meta CSP on every page: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; object-src 'none'; frame-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests`. Referrer policy meta. Every `target="_blank"` link carries `rel="noopener noreferrer"`. No third-party scripts; only Google Fonts. No secrets, addresses, hostnames or client names. The contact form still only opens the visitor's own mail client.

## 10. Verification

- Headless Chrome screenshots of index, about, homelab, built and one resource page at 1300px and 400px, inspected by eye against section 3.
- Script: every internal `href` and `src` resolves (files and anchors); no page references story.css or story.js; every `target="_blank"` has `rel="noopener noreferrer"`; every page has the CSP meta; no em dashes in new copy; no CEH, AWS Cloud Practitioner, CISSP or OSCP on any main page.
- Contrast script over the token pairs above.
