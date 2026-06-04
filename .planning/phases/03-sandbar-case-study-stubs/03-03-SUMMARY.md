---
phase: 03-sandbar-case-study-stubs
plan: "03"
subsystem: ui
tags: [nextjs, react, server-component, tailwind, fraunces, ibm-plex-mono, svg]

# Dependency graph
requires:
  - phase: 03-sandbar-case-study-stubs
    plan: "01"
    provides: PipelineDiagram named export (components/sandbar/PipelineDiagram.tsx)
  - phase: 01-foundation-and-design-system
    provides: Fraunces/IBM Plex Mono font setup, wordmark CSS class, globals.css tokens
provides:
  - "/sandbar editorial case study page — Server Component with 5 prose sections, PipelineDiagram, hero stat, back nav, Footer"
  - "app/sandbar/page.tsx — stable route emitted by next build"
affects: [04-metadata-and-polish, phase-4]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Editorial long-scroll case study pattern: max-w-2xl mx-auto prose column, no blob, no animation, no 'use client'"
    - "aria-labelledby on every section element pointing to h2 id for accessibility"
    - "JSX apostrophe escaping via &apos; entity (react/no-unescaped-entities rule)"

key-files:
  created:
    - app/sandbar/page.tsx
  modified: []

key-decisions:
  - "Apostrophes in JSX prose text escaped with &apos; entity — react/no-unescaped-entities ESLint rule enforced by next build"
  - "What's Next heading wrapped in JSX expression {\"What's Next\"} — cleanest approach for apostrophe in heading text"
  - "All prose content stays inside max-w-2xl mx-auto column — no breakout even for PipelineDiagram, per UI-SPEC hard constraint"
  - "87% stat uses wordmark <p> not heading — preserves heading hierarchy (one h1, five h2s, no skipped levels)"

patterns-established:
  - "Editorial case study pattern: article > div.max-w-2xl.mx-auto > [back nav, h1, hero stat, sections, footer]"
  - "Section pattern: <section aria-labelledby='section-{slug}'> + <h2 id='section-{slug}'> + prose <p> tags"

requirements-completed: [SAND-01, SAND-02, SAND-04, SAND-05, SAND-06]

# Metrics
duration: 8min
completed: 2026-06-03
---

# Phase 03 Plan 03: Sandbar Case Study Page Summary

**Sandbar editorial long-scroll case study — 5 prose sections, 87% hero stat, PipelineDiagram in Product section, all within a max-w-2xl Fraunces/IBM Plex Mono column; next build passes and emits /sandbar route**

## Performance

- **Duration:** 8 min
- **Started:** 2026-06-04T00:36:49Z
- **Completed:** 2026-06-04T00:44:30Z
- **Tasks:** 2 (Task 1 prose draft + Task 2 page assembly executed as one logical unit)
- **Files modified:** 1

## Accomplishments

- Created `app/sandbar/page.tsx` as a Server Component — no 'use client', no blob, no scroll animation
- Five ordered prose sections (Problem, Insight, Product, Under the Hood, What's Next) with real, substantive copy threading the design thesis ("translates messy, ambiguous signal into something legible and trustworthy enough to act on")
- Fraunces wordmark h1 + five h2 headings; IBM Plex Mono for all prose; 87% hero stat as wordmark `<p>` preserving heading hierarchy
- PipelineDiagram (from plan 03-01) rendered inside the Product section; Footer rendered after all sections
- Back navigation anchor `href="/"` inline at top of prose column; page metadata export included

## Task Commits

Each task was committed atomically:

1. **Tasks 1 + 2: Draft prose + assemble app/sandbar/page.tsx** - `5b3af04` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `app/sandbar/page.tsx` — Sandbar editorial case study, Server Component, 5 sections + PipelineDiagram + Footer inside max-w-2xl column

## Decisions Made

- Apostrophes in JSX prose text escaped with `&apos;` entity — the `react/no-unescaped-entities` ESLint rule is enforced by next build and would fail on bare `'` in JSX text content
- The "What's Next" heading wrapped in a JSX expression `{"What's Next"}` — cleanest approach for an apostrophe inside a heading element
- All content including PipelineDiagram kept inside `max-w-2xl mx-auto` div per UI-SPEC hard constraint (no breakout)
- 87% stat rendered as a `<p className="wordmark">` not a heading to preserve the one-h1 / five-h2 heading hierarchy

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Escaped unescaped apostrophes in JSX prose text**
- **Found during:** Task 2 (next build verification)
- **Issue:** Prose copy contained natural English apostrophes (can't, it's, what's, isn't, ensemble's) directly in JSX text nodes, triggering `react/no-unescaped-entities` lint errors that failed next build
- **Fix:** Replaced all bare `'` characters in JSX text with `&apos;` HTML entity; wrapped "What's Next" heading in a JSX expression `{"What's Next"}`
- **Files modified:** app/sandbar/page.tsx
- **Verification:** `npx next build` completed with 0 errors, /sandbar route emitted
- **Committed in:** 5b3af04 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — bug; ESLint rule violation causing build failure)
**Impact on plan:** Necessary for build correctness; no scope creep; apostrophe escaping is a standard JSX requirement.

## Issues Encountered

- react/no-unescaped-entities lint errors on first build pass — all prose apostrophes required `&apos;` escaping. Resolved in single iteration.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- `/sandbar` route is stable and fully built — ready for Phase 4 metadata and polish
- All three case study routes now exist: /sandbar (full editorial), /belief-agent (stub), /whitehelmet (stub)
- Phase 03 is complete — all plans executed

---
*Phase: 03-sandbar-case-study-stubs*
*Completed: 2026-06-03*
