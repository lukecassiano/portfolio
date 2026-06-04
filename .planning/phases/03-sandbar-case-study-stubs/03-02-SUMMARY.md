---
phase: 03-sandbar-case-study-stubs
plan: "02"
subsystem: ui
tags: [nextjs, react, tailwind, server-component, routing]

# Dependency graph
requires:
  - phase: 02-landing-experience
    provides: GradientBlob and SceneFadeIn components; section className and blob prop patterns from BeliefAgentScene and WhiteHelmetScene
provides:
  - /belief-agent stub route — Server Component full-viewport hero with indigo→green blob, h1 wordmark, in-progress message, back nav
  - /whitehelmet stub route — Server Component full-viewport hero with ochre→dust blob, h1 wordmark, in-progress message, back nav
affects: [case-study-completion, seo, accessibility]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Stub route pattern: Server Component wrapping main#main-content, section with full-viewport min-h-[100svh], GradientBlob, SceneFadeIn z-10, absolute back-nav anchor

key-files:
  created:
    - app/belief-agent/page.tsx
    - app/whitehelmet/page.tsx
  modified: []

key-decisions:
  - "Stub pages are Server Components (no 'use client') — client boundary lives inside GradientBlob and SceneFadeIn"
  - "h1 used for wordmark on standalone stub pages (not h2 as in landing scenes) — each stub is its own page with single top-level heading"
  - "No SceneLink forward CTA on stubs — no case study to link to yet"
  - "WhiteHelmet stub inherits cream/ink global defaults — no bg-[#] or text- overrides on section, matching WhiteHelmetScene.tsx exactly"
  - "translateX(-50%) inline on WhiteHelmet blob position — no Tailwind -translate-x-1/2 to avoid double-transform (consistent with SandbarScene decision)"

patterns-established:
  - "Stub route pattern: main#main-content > section[aria-label][min-h-100svh] + absolute back-nav anchor + GradientBlob + SceneFadeIn z-10 content"

requirements-completed: [STUB-01, STUB-02]

# Metrics
duration: 5min
completed: 2026-06-03
---

# Phase 3 Plan 02: Sandbar Case Study Stubs Summary

**Two honest stub routes (/belief-agent, /whitehelmet) as Server Component full-viewport hero scenes reusing existing GradientBlob and SceneFadeIn with back navigation and in-progress messaging**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-06-04T00:28:00Z
- **Completed:** 2026-06-04T00:33:55Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created `/belief-agent` route resolving 404 — dark hero with indigo→green blob, Belief Agent h1 wordmark, honest case study in-progress message and status label
- Created `/whitehelmet` route resolving 404 — cream hero with ochre→dust bottom-centered blob, WhiteHelmet h1 wordmark, honest case study in-progress message and status label
- Both routes have keyboard-accessible absolute back-nav anchor returning to `/`

## Task Commits

Each task was committed atomically:

1. **Task 1: Create /belief-agent stub page** - `2e553f1` (feat)
2. **Task 2: Create /whitehelmet stub page** - `f7e1ecc` (feat)

## Files Created/Modified
- `app/belief-agent/page.tsx` - Belief Agent stub — Server Component full-viewport scene with indigo→green blob
- `app/whitehelmet/page.tsx` - WhiteHelmet stub — Server Component full-viewport scene with ochre→dust blob

## Decisions Made
- h1 used as wordmark on standalone route pages (not h2 as in landing scenes) — each stub is its own page requiring a single top-level heading
- No SceneLink imported or rendered — stubs have no forward destination yet
- WhiteHelmet section carries no bg-[#] or text- overrides, inheriting cream/ink global defaults (mirrors WhiteHelmetScene.tsx exactly)
- inline `transform: 'translateX(-50%)'` on WhiteHelmet blob position (not Tailwind -translate-x-1/2) — consistent with established SandbarScene double-transform avoidance decision

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Both stub routes are live and resolve without 404
- WhiteHelmet CTA from landing page now lands on a real page with an honest message
- Ready for case study content to replace in-progress stubs when work is documented

---
*Phase: 03-sandbar-case-study-stubs*
*Completed: 2026-06-03*
