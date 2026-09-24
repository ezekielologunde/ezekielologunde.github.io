---
project: ezekielologunde-github-io
type: design-spec
status: approved-for-build
last_updated: 2026-09-24
builds_on: 2026-09-24-casefile-redesign-design.md
---

# Interactive story: design spec (2026-09-24)

Written before any code, per the owner's standing rule (design first, security first). Built on branch `interactive-story`, cut from `casefile-redesign`, which stays untouched as the fallback.

## 0. Why

The owner asked to "combine the AI-cyber case-file and AI model card and Attack-graph map then build as interactive moving elements, moving parts, storied". Three sources are merged:

| Source | What it brings | What is kept |
|---|---|---|
| `casefile-redesign` (index, casefile.css, casefile.js) | Identity: dark forensic ground, evidence-tag paper, red-orange signal, Archivo / Newsreader / IBM Plex Mono, exhibit tags, redaction bars, stamp, ID card, real exhibits | All of it; it is the visual system |
| `prototypes/graph/` | Career drawn as an attack graph: 22 dated nodes, typed legend, technique-labelled edges, 6-hop shortest path to "Securing AI-era systems", side panel, text list | Node and edge data, coordinates, copy, text list; re-skinned into the case-file system |
| `prototypes/modelcard/` | The subject written up as a model card: intended use, out-of-scope use with honest gaps, training data, evaluation, limitations, safety, changelog, citation, "how to get started" snippet, license: open-to-work | All sections and copy; rendered as a collapsible spec sheet |

No new facts are introduced. Every sentence comes from those files or from `Personal Assisant/profile/master-profile.json`. The D.Eng. is always "expected September 2027"; "Dr." is never used; CEH, AWS Cloud Practitioner, CISSP and OSCP are not shown.

## 1. Narrative

The home page is one investigation, read top to bottom. Each scene answers the question the previous one raises.

| Scene | Title | Question it answers | Content |
|---|---|---|---|
| 1 | The case opens | Who is this? | Case header form (subject, matter, occupation, location, status stamp), Exhibit A ID card, a three-sentence first-person hook, the margin note on conflict of interest |
| 2 | The route | How did he get here? | Pinned attack-graph stage that draws itself in date order, caption panel with each node's real story, year ticker, the red 6-hop path landing on "Securing AI-era systems"; the same graph as a text list |
| 3 | Evidence room | Can he prove it? | Exhibit B (lab, counting figures, SIEM figure), Exhibit C (Breakwater discovery tally, CVE re-rank with reorder motion, inline evidence graph with hover chains), Exhibit E (software), Exhibit F (written record), Findings |
| 4 | The AI thread | What about AI? | Exhibit D: the "AI proposes, evidence decides" rule and technique table, models as targets, an interactive LLM-app threat model (labelled illustrative), research and advisory facts |
| 5 | Model card | What is the spec, including the gaps? | Collapsible spec sheet: intended use, out-of-scope use, training data, evaluation, limitations, changelog, citation (copy button), with the "how to get started" snippet typing in; link to the full card on `about.html` |
| 6 | Report to | How do I reach him? | Email, profiles, the status stamp landing a second time |

A small scene rail (01 to 06) stays on screen and marks the current scene.

## 2. Scroll choreography, per scene

Motion only runs when JavaScript is on, `IntersectionObserver` exists and `prefers-reduced-motion` is not `reduce`. JS then sets `html.motion`; every hidden initial state in CSS is scoped under `.motion`.

1. **Case opens** (on load, about 1.4 s total, once). The case strip fades in; the name reveals left to right in character steps (typed look, `clip-path` steps, one shot); fields rise in a 60 ms stagger (`opacity`, `translateY`); the OPEN TO WORK stamp drops from 1.6x to 1x with a rotation and the form gives a 2 px thud; the ID card slides in from the right with its tilt. The hook paragraph fades in when scrolled to.
2. **The route** (scroll-scrubbed, reversible). The section is tall (about 30vh per node); inside it the stage is `position: sticky`. Scroll progress p maps to time t from 0 to 23.4. For node k (date order), local progress f = t - k: its incoming edges draw with `stroke-dashoffset` over f 0 to 0.6, the node lands (scale and opacity) at f 0.45, the edge's technique label fades in when its line is complete, the arrowhead appears only on complete edges. A vertical scan line sweeps the time axis (`translateX`) between node columns. The caption panel shows node k's kind, date, title, place, story and the technique that reached it; the year ticker shows its year and "N-07 / 22". From t 22 to 23.4 the red shortest path draws as one overlay path through the seven path nodes and the objective's ring pulses once. Scrolling up rewinds all of it.
3. **Evidence room** (enter-triggered, once). Evidence tags slide in and settle (CSS scroll-driven `animation-timeline: view()` where supported, the existing `.rv` observer otherwise). Lab figures count up from 0 to the real value over 1.1 s. The discovery ledger fills cell by cell (35 ms stagger) while a tally counts: 26 declared, 19 found, 1 infrastructure, 20 admitted, 7 missed, 0 phantom. The CVE table reorders with a FLIP animation (rows translate from their old positions over 450 ms) when switching between "CVSS only" and "Fused score".
4. **AI thread**. A token travels the LLM-app flow (input, model, proposal, validator) and stops at the approval gate; the gate stamps APPROVED and the token continues to "write". It loops only while the diagram is on screen.
5. **Model card**. The usage snippet types in once, line by line, when it enters view. Sections open with a short fade and rise of their body.
6. **Report to**. The stamp lands again when the block enters view.

## 3. Interaction model

- **Graph nodes** are links (`<a href="#n-id">`) inside the SVG, so they work without JS. With JS, click, Enter or Space pins that node's full entry in the caption panel ("Pinned" state, with a Resume button); Escape or Resume unpins. Hover or focus traces the node's neighbours and edges. Focusing a node that has not been drawn yet scrubs the page to its step first, so keyboard users never land on an invisible node.
- **Scrubber**: a native range input (0 to 22) under the stage. Moving it scrolls the page to that step (instant, not smooth), so the drawing and the scroll position never disagree. Its value follows the scroll.
- **Skip link** before the stage jumps to the text list, for anyone who does not want the scroll story.
- **CVE table**: two toggle buttons with `aria-pressed`; a polite live region announces the new first row. Hovering or focusing a row highlights the same CVE's chain in the evidence graph, and hovering a chain in the graph highlights the row.
- **Evidence graph** rows are focusable groups with an accessible name (CVE, CVSS, EPSS, score).
- **Threat model**: each component is a `<button>`; hover, focus or click shows its threats and controls in the side panel (`aria-live="polite"`); the full table stays below as text.
- **Spec sheet**: native `<details>`/`<summary>`; the citation has a Copy button with a clipboard fallback (select the text) and a status message.
- **Redaction bars**: focusable (`tabindex="0"`); on hover or focus the bar slides aside to show a harmless label such as "client names withheld". Never real data.
- **Scene rail**: plain in-page links; `aria-current="step"` on the current scene.

## 4. Motion rules

- Animate only `transform`, `opacity` and `stroke-dashoffset` (plus one one-shot `clip-path` step reveal on the name). No animated layout properties, no `height` animation.
- One `requestAnimationFrame` update per scroll event, active only while the route is on screen (observer-gated); it reads one bounding rect, then writes. No reads after writes in the same frame.
- Easing: `cubic-bezier(.2,.7,.2,1)` for arrivals, linear for scrubbed values (scroll is the easing).
- Durations: micro 120 to 180 ms, arrivals 300 to 500 ms, counters 1.1 s, reorder 450 ms.
- Nothing loops except the threat-model token, and only while visible.
- No parallax on text. The only ambient motion is a faint drawing-sheet grid behind the graph stage that drifts at a fraction of scroll speed.

## 5. Accessibility

- Landmarks: header, nav (main, scenes), main, footer. Skip link to `#main`, second skip link past the route stage.
- Every interactive element is keyboard reachable, with the 3 px signal focus ring from the case-file system. Touch targets at least 40 px on buttons.
- The graph SVG has `<title>` and `<desc>`; the same content is an ordered list of all 22 nodes with their in and out edges ("the same graph, as text").
- The caption panel is `aria-live="polite"` and only changes when the step changes, not every frame.
- Counters: the real value is in the DOM for assistive tech; the counting digits are `aria-hidden`.
- The typing snippet: the full code is the accessible text; the typing is a visual layer (`aria-hidden`).
- Contrast: tokens already checked to WCAG AA in the case-file spec; new colours reuse those tokens only.
- **Narrow screens (760 px and below)**: the wide graph is swapped for a vertical layout (every node on one spine in date order, edges as arcs, labels to the right). The same scroll story runs: the stage is sticky, the camera (a `translateY` on the SVG) keeps the current node in view, the caption sits below.

## 6. Reduced motion and no-JS

- **Reduced motion**: `html.motion` is never set. The route section has normal height, the graph is shown complete with the red path drawn, the caption panel shows the objective and responds to clicks and to the scrubber (no scrolling). Counters show final values, the ledger is full, the table re-sorts instantly, the token does not move, the snippet is fully typed, sections open instantly.
- **No JS**: all scene content is static HTML. The graph is complete (default CSS state is "drawn"), nodes link to the text list, the text list is present, the CVE table sits in fused-score order with the toggle hidden, every `<details>` in the spec sheet is `open` in the markup (JS closes all but the first on load), the threat-model table is visible, the scrubber is `hidden`.

## 7. Performance budget

- JS: `casefile.js` (shared, about 6 KB) plus `investigation.js` (home and model card, target under 30 KB unminified; combined under 40 KB). No libraries.
- CSS: `casefile.css` plus `investigation.css` (target under 30 KB).
- Images: unchanged; the evidence graph is inlined as SVG (about 8 KB) so it can react to hover.
- 60 fps target on a mid laptop: at most 22 edge writes and a few transforms per frame during the route; everything else is event driven.
- Fonts: the existing Google Fonts request, `display=swap`, preconnect.

## 8. CSP and security

- Every page keeps the strict CSP meta: `default-src 'self'; script-src 'self'` (no inline scripts, no `eval`, no inline event handlers), styles `'self' 'unsafe-inline' https://fonts.googleapis.com` (inline `style` attributes on preserved resource pages), fonts from `fonts.gstatic.com`, `connect-src 'none'`, `object-src 'none'`, `frame-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`.
- No third-party scripts, no trackers, no storage. The clipboard write is user-initiated and only copies the BibTeX block.
- The inline evidence-graph SVG loses its internal `<style>`; its classes are namespaced (`eg-`) and styled from the stylesheet.
- External links keep `target="_blank" rel="noopener noreferrer"`.
- Redaction bars only ever cover the word "withheld" plus a harmless label.

## 9. Site changes

- Nav on every page: Case file, Graph (`index.html#route`), Evidence (`index.html#evidence`), Model card (`about.html`), Lab, Built, Research, Writing, Resources, Contact. Education and Credentials move to the footer, which every page carries.
- `about.html` keeps its URL and becomes the full model card in the case-file system: header with license and tags, the usage snippet, summary, model details, intended use, out-of-scope use, training data, evaluation, limitations, safety and security, changelog, citation, contact.
- Every existing URL keeps working; `index.html#exhibit-d` is preserved.
- `prototypes/` is deleted after its content is merged (it was never tracked).
- Obsidian notes updated: Features, Changelog, Decisions, Frontend.

## 10. Verification plan

1. Script: every internal `href` and `src` on every page resolves (files and anchors); CSP present; `rel` on new-tab links; no em dashes in new text; no banned credentials; no "Dr.".
2. Browser (real Chromium): scroll the route at several points and screenshot to confirm the graph draws progressively; click a node; toggle the CVE sort; expand a spec-sheet section; tab through; resize to mobile and back; console clean.
3. Stills saved for the owner at `%TEMP%/story_1.png` to `story_4.png`.

## 11. Addendum (same day): scene pages, ambient layers, plain English

Owner's added requirements, designed before the second build pass.

- **Scene pages.** The one long page becomes six pages that share the header, nav and a scene rail (01 to 06, `aria-current="page"`): `index.html` (case opens, plain-English hook, key findings, a scene index linking onward), `route.html` (the pinned self-drawing graph), `evidence.html` (Exhibits B, C, E, F), `ai.html` (Exhibit D and the threat model), `about.html` (the full model card plus a glossary; URL kept) and `contact.html` (report to, with the mail-app form). Each page ends with previous and next scene links. Old one-page anchors on `index.html` (`#route`, `#exhibit-c`, `#n-ubalt`, `#card`, `#report` and so on) are forwarded by script to the new page. All other URLs are unchanged.
- **Page transition.** Opacity only: CSS cross-document view transitions (`@view-transition`) where supported, otherwise a 150 ms fade out on scene links; none under reduced motion.
- **Ambient layers** (`assets/js/ambient.js`, one fixed canvas per scene page, `aria-hidden`, `pointer-events: none`, behind content): home and contact, patrolling robot drones over a faint grid; route, pulses running along circuit traces; evidence, a laser line sweeping a dot lattice; AI, a Bloch sphere with a moving state vector, qubit rings and one drone; model card, entangled particle pairs emitting wavefunction rings. Strokes stay at 4 to 16 percent opacity (signal accents up to about 50 percent on 2 to 3 px dots) so text contrast is unchanged. Capped at about 30 fps, paused when the tab is hidden, a single still frame under reduced motion, on low-power devices (2 cores or 2 GB) or when the first 45 frames average over 8 ms.
- **Plain English.** An "In plain English" line opens each major section on the main pages; resource pages get one line under the page title. The first body-copy use of each glossary term on a page is wrapped in `<abbr title>` by the build script; the model card carries the full glossary. The home hook and the six key findings are rewritten for readers without a security background, with the same numbers.
- **Email.** The public address on every page, in the form hand-off and in the model card is ologundeomotola@gmail.com.
