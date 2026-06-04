# Roadmap: Luke Cassiano Portfolio

## Overview

A personal portfolio site built as a vertically-scrolled sequence of full-viewport scenes. The work moves from raw scaffold and design system through the landing experience and case study, ending with the polish and deployment pass that makes it shareable. Four phases, each delivering a coherent, verifiable capability before the next begins.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Design System** - Scaffold, fonts, Lenis, GradientBlob, and all shared components
- [ ] **Phase 2: Landing Experience** - Five full-viewport scenes with Framer Motion reveals
- [x] **Phase 3: Sandbar Case Study & Stubs** - Full /sandbar editorial page with SVG pipeline diagram, plus /belief-agent and /whitehelmet stubs (completed 2026-06-04)
- [ ] **Phase 4: Polish, Meta & Deploy** - OG image, all meta tags, print styles, a11y pass, and Vercel deploy

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: A developer opening the repo in any browser sees the correct fonts, cream background, CSS custom properties, and a working smooth-scroll scaffold — everything downstream depends on these being solid before a single page is built.
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, COMP-01, COMP-02, COMP-03, COMP-04
**Success Criteria** (what must be TRUE):
  1. The dev server runs without errors and the root layout renders Fraunces ExtraBold Italic and IBM Plex Mono at correct weights on any page
  2. Scrolling any long page feels smooth with Lenis easing; switching to prefers-reduced-motion disables Lenis animation without breaking scroll
  3. The GradientBlob component renders a blurred gradient that animates only transform/opacity — no layout shift, no repaints of blur
  4. The footer displays a copyable mailto: link; the skip-to-content link is reachable by keyboard; the 404 page matches the design system
  5. Design token CSS vars (blob color stops, font families, cream base) are available globally and Tailwind aliases resolve
**Plans**: 3 plans
- [x] 01-01-PLAN.md — Project scaffold, fonts (Fraunces local + IBM Plex Mono), Tailwind v3, design tokens, MDX stubs
- [x] 01-02-PLAN.md — Lenis install + LenisProvider (lerp 0.08, reduced-motion gate, RAF loop) wired into layout
- [ ] 01-03-PLAN.md — Shared components: GradientBlob, Footer (copyable mailto), custom 404, SkipLink

### Phase 2: Landing Experience
**Goal**: A visitor arriving at the root URL scrolls through five distinct full-viewport scenes, each immediately communicating its project's emotional register through blob color alone, with content fading in on scroll entry.
**Depends on**: Phase 1
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, LAND-05, LAND-06, LAND-07
**Success Criteria** (what must be TRUE):
  1. Five scenes stack vertically, each occupying exactly one viewport height (100svh) on mobile and desktop; Lenis provides soft guidance between them
  2. The intro scene shows "Luke Cassiano" in Fraunces ExtraBold Italic with one positioning line and nothing else — no extra elements
  3. Each project scene's blob is visually dominant before any text is read; Sandbar is pink→lavender→blue, Belief Agent is indigo→phosphor green on near-black, WhiteHelmet is ochre→dust, Reading the Break is coral→amber
  4. Clicking the Sandbar or WhiteHelmet scene link navigates to the correct route; the Reading the Break link opens Substack in a new tab
  5. Scene content fades in on scroll entry; turning on prefers-reduced-motion skips all fade animations without breaking layout
**Plans**: 4 plans
- [ ] 02-01-PLAN.md — Shared leaf components: SceneFadeIn (fade-in wrapper), ScrollHint, SceneLink
- [ ] 02-02-PLAN.md — IntroScene + SandbarScene (scene-shell pattern, h1 name, /sandbar CTA)
- [ ] 02-03-PLAN.md — BeliefAgentScene (dark inversion) + WhiteHelmetScene + ReadingTheBreakScene
- [ ] 02-04-PLAN.md — app/page.tsx assembly (five scenes + Footer) and production build verify

### Phase 3: Sandbar Case Study & Stubs
**Goal**: A recruiter clicking through from the Sandbar landing scene arrives at a full editorial case study that reads problem → insight → product → under the hood → what's next, with the pipeline diagram crisp at every viewport width; Belief Agent and WhiteHelmet routes resolve to honest in-progress pages rather than 404s.
**Depends on**: Phase 1
**Requirements**: SAND-01, SAND-02, SAND-03, SAND-04, SAND-05, SAND-06, STUB-01, STUB-02
**Success Criteria** (what must be TRUE):
  1. /sandbar loads all five sections in order; prose is constrained to ~65ch on all breakpoints; no horizontal scroll
  2. The pipeline diagram renders as an inline SVG React component at every viewport width — crisp, not pixelated, with a visible aria-label
  3. Section headings render in Fraunces; metadata and captions render in IBM Plex Mono; hero stat(s) are large Fraunces numerals
  4. A back navigation element on /sandbar returns the visitor to the landing page
  5. /belief-agent and /whitehelmet each load a hero scene with blob, wordmark, and an honest "case study in progress" message — neither returns a 404
**Plans**: 3 plans
- [x] 03-01-PLAN.md — PipelineDiagram inline SVG component (Wave 1)
- [x] 03-02-PLAN.md — /belief-agent and /whitehelmet stub pages (Wave 1)
- [ ] 03-03-PLAN.md — /sandbar editorial case study page (Wave 2, depends on 03-01)

### Phase 4: Polish, Meta & Deploy
**Goal**: Every share link for the site shows a proper OG image and title; the site passes a WCAG AA check; it builds without errors and is live at a production Vercel URL.
**Depends on**: Phases 2 and 3
**Requirements**: META-01, META-02, META-03, META-04, META-05, META-06, META-07, META-08, DEPLOY-01, DEPLOY-02
**Success Criteria** (what must be TRUE):
  1. Pasting the production URL into Twitter, Slack, or iMessage shows the OG image (1200×630), site title, and description — not a blank card
  2. All text on every route passes WCAG AA color contrast; IBM Plex Mono on cream is explicitly verified
  3. Printing any page hides all blobs, renders black text, and shows full URLs next to links
  4. A keyboard-only user can reach every interactive element (footer email, scene links, back navigation, skip-to-content) without a mouse
  5. `next build` completes without errors; the production Vercel URL returns HTTP 200 for /, /sandbar, /belief-agent, and /whitehelmet
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4
Note: Phase 3 depends on Phase 1 only (not Phase 2) — Phases 2 and 3 can be worked in parallel once Phase 1 is complete.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 1/3 | In Progress|  |
| 2. Landing Experience | 2/4 | In Progress|  |
| 3. Sandbar Case Study & Stubs | 3/3 | Complete   | 2026-06-04 |
| 4. Polish, Meta & Deploy | 0/? | Not started | - |
