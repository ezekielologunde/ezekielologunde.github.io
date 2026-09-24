---
project: ezekielologunde-github-io
type: design-spec
status: approved-for-build
last_updated: 2026-09-24
---

# Story redesign: design spec (2026-09-24)

The owner asked for a "different, intuitive, story-like design" and a new portrait. This spec is written before any site code, per the owner's standing rule (design first, security first).

## 1. Audience

1. **Hiring managers and recruiters** in security engineering, detection, GRC, IT and AI roles. They skim. Within one screen they need: who he is, what he does now, and proof that he can do the work.
2. **Education hiring committees** (community college, university). They look for the teaching record, curriculum work and degrees.
3. **Academic reviewers** (doctoral committee, editors, collaborators). They look for research areas, preprints, Scholar and ORCID links, and the doctoral timeline (D.Eng., GWU, expected September 2027).
4. **Learners** using the resource hub. They often arrive deep-linked on a guide page and need a readable page and a way back to the hub.

## 2. Narrative arc (home page)

The home page is one continuous story in numbered chapters. Each chapter opens with a number, a short title and a one-line takeaway in the display serif, followed by the evidence.

| # | Chapter | Takeaway (one line) | Evidence shown |
|---|---|---|---|
| 0 | Hero | Consultant, educator, doctoral researcher | Portrait, name, short summary, chapter contents |
| 1 | Origin | Computer science and teaching, trained together, then a decade of keeping real systems running | B.S. Computer Science and Education (Ilorin), A.S. Computer Science, early IT roles 2011 to 2022 |
| 2 | The turn | From keeping systems up to explaining what happened to them | M.S. Cyber Forensics (Baltimore, 2024), forensics focus, preprints, risk governance |
| 3 | The craft | Proof of work: the lab, the research pipeline, the software | Homelab diagram and sanitized SIEM figures, Breakwater numbers, Built case studies |
| 4 | The classroom | Teaching from high school to university, plus open materials | Lawson State, UAGC, Adrian College, Syracuse, C++ course, resource hub |
| 5 | Now and next | Consulting and doctoral research, open to new roles | Cyntraix services, GWU D.Eng. (expected September 2027), role interests |
| 6 | Contact | How to reach him | Email and profiles |

Every biographical claim traces to `Personal Assisant/profile/master-profile.json`, `doctoral-research.json`, `cyntraix-business.json`, or existing site copy. Takeaways summarize facts; they do not invent beliefs or outcomes.

## 3. Information architecture

- **Primary nav** (every page): Story (home), About, Lab, Built, Research, Writing, Education, Credentials, Resources, Contact. Collapses to a disclosure button under 1040px.
- **Chapter rail** (home only): fixed at the left edge on wide screens (1440px and up, where it clears the content column), listing 01 to 05 plus Contact, with the current chapter highlighted. Below that width a 3px reading-progress bar under the header does the orientation job.
- **Detail pages** (about, homelab, built, research, writing, education, credentials, contact) share one template: page head (mono kicker, serif title, lede), numbered content sections, then a "Continue the story" strip linking the previous and next page in story order: About, Education, Lab, Built, Research, Writing, Credentials, Contact.
- **Resource hub and guide pages** keep their body copy. They get the shared shell (header, footer, tokens, typography) and restyled content components. Two self-styled long documents (`guide.html`, `policy-framework-analysis.html`) keep their internal styles and receive the shared header and footer only.
- **URLs**: no page is renamed or removed. The five space-named redirect stubs stay as they are.

## 4. Visual system

Warm editorial paper sampled from the portrait backdrop, navy ink from the suit, burgundy accent from the tie.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f7f1e8` | page background |
| `--paper-2` | `#efe5d8` | cards, alternate bands |
| `--band` | `#e3cfbb` | decorative bands, portrait mat (never behind small muted text) |
| `--ink` | `#1c3060` | headings, brand, primary buttons |
| `--text` | `#232a3d` | body copy (12.7:1 on paper) |
| `--muted` | `#566077` | secondary copy (5.1:1 on paper-2) |
| `--accent` | `#9c3d5c` | links, chapter numbers, focus ring (5.2:1 on paper-2) |
| `--accent-2` | `#b14b6b` | rules, markers, large display accents only |
| `--rule` | `rgba(28,48,96,.16)` | hairlines |
| `--screen` | `#0f1729` | dark inset "screens" holding the dark homelab SVG figures |

- **Type**: Fraunces (display serif) for titles and takeaways; Source Sans 3 for body; JetBrains Mono for small labels, numbers and technical tags. Google Fonts with `display=swap` and preconnect. Body 18px on desktop, 17px on mobile, line height 1.65, measure capped near 68ch.
- **Layout**: 1160px max content width, generous vertical rhythm, thin rules instead of boxes, numbered chapters and sections. Cards only where the content is a set (case studies, resources).
- **Figures**: the homelab SVGs are dark-themed, so they sit in a navy "screen" frame with a mono caption bar, which reads as a deliberate device rather than a mismatch.
- **Portrait**: 800px file in the hero (eager, `fetchpriority="high"`), 400px file for small placements (about, contact), 96px file for the header avatar.

## 5. Motion rules

- Only restrained scroll reveals: fade and 14px rise, 600ms, once per element, via IntersectionObserver.
- `prefers-reduced-motion: reduce` disables reveals, smooth scrolling and transitions.
- Content is visible without JavaScript: the hidden state applies only after the script adds a class to `html`, so a script failure never hides content.
- No autoplay media, no parallax, no cursor effects, no loaders, no canvas animation. The old mesh canvas, intro loader and cycling role text are retired.

## 6. Accessibility

- Skip link to `#main`, landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, ordered headings.
- Visible focus: 3px accent outline with offset on every interactive element.
- WCAG AA contrast for all text (ratios above), checked with a script.
- Menu button uses `aria-expanded` and `aria-controls`; current page marked with `aria-current="page"`; chapter rail marks the active chapter with `aria-current="true"`.
- Meaningful alt text on the portrait and figures; the header avatar uses empty alt because the name sits beside it.
- Tables keep header cells with `scope`; wide tables scroll inside their own container.
- Layout works from 360px wide with no horizontal page scroll.

## 7. Performance budget

- Home page under 200 KB excluding web fonts (hero image about 79 KB, CSS under 45 KB, JS under 6 KB).
- One stylesheet (`assets/css/story.css`) and one deferred script (`assets/js/story.js`) per page, plus small data scripts for the three directory pages.
- Every image carries `width` and `height`; everything below the fold uses `loading="lazy"` and `decoding="async"`.
- No frameworks, no build step.

## 8. Security posture (static site on GitHub Pages)

GitHub Pages cannot set custom response headers, so policy is delivered in meta tags where browsers honor them.

- **Content-Security-Policy (meta)**: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; object-src 'none'; frame-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests`.
  - `script-src 'self'` with no inline script: the three inline directory scripts move to `assets/js/dir-*.js`, and the inline `onerror` handlers on the old portrait go away.
  - `'unsafe-inline'` is allowed for styles only, because the preserved resource pages carry inline style attributes and two self-styled documents. No user input is ever rendered into a page, so the residual risk is low.
  - `frame-ancestors` and reporting are not supported in a meta CSP; clickjacking protection is not available on GitHub Pages and is accepted as a residual risk for a brochure site.
- **Referrer policy**: `<meta name="referrer" content="strict-origin-when-cross-origin">`.
- **External links**: every `target="_blank"` link carries `rel="noopener noreferrer"`.
- **No trackers or third-party scripts**: only Google Fonts CSS and font files.
- **No secrets**: no keys, tokens, internal IPs, hostnames or client names. Homelab figures remain the sanitized, role-only versions.
- **Contact form** keeps the existing design: nothing is sent to a server; it opens the visitor's own mail client.

## 9. Migration plan for existing URLs

- Every existing `.html` path keeps working at the same URL: no renames, no page deletions.
- The five space-named files are already redirect stubs (meta refresh plus canonical) and stay untouched.
- Old assets are retired only after all references are gone: `assets/css/future.css`, `assets/css/style.css`, `assets/js/future.js`, `assets/js/mesh.js`, `assets/js/site.js`, and `IMG_8794.JPG`. A link checker confirms nothing references them before deletion.
- In-page anchors that other pages link to are preserved.
- No sitemap, robots file or README exists today; none is added in this change.

## 10. Verification

- Headless Chrome screenshots at 1300px and about 400px for index, about, homelab, built and one resource page, inspected by eye.
- A script checks that every internal `href` and `src` resolves to a file (and anchor), and that no page references a removed asset.
- A contrast check on the token pairs used for text.
