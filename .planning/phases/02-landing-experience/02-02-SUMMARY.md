---
phase: 02-landing-experience
plan: "02"
subsystem: ui
tags: [react, framer-motion, fraunces, tailwind, next.js, scenes]

# Dependency graph
requires:
  - phase: 02-landing-experience plan 01
    provides: SceneFadeIn, ScrollHint, SceneLink, GradientBlob UI primitives
  - phase: 01-foundation-and-design-system
    provides: Fraunces font, .wordmark class, globals.css CSS vars, Tailwind config
provides:
  - IntroScene: h1 "Luke Cassiano" with Fraunces display, positioning line, ScrollHint
  - SandbarScene: pink-lavender-blue blob, h2 wordmark, tagline, 87% stat, /sandbar CTA
  - components/scenes/ directory establishing the scene module pattern
affects: [02-landing-experience remaining scenes, homepage composition]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - scene-shell: section with relative min-h-[100svh] overflow-hidden, blob sibling + SceneFadeIn content
    - blob-placement: GradientBlob rendered before SceneFadeIn, never nested inside it
    - display-token: inline fontSize clamp() + lineHeight — not Tailwind text-size tokens

key-files:
  created:
    - components/scenes/IntroScene.tsx
    - components/scenes/SandbarScene.tsx
  modified: []

key-decisions:
  - "IntroScene: no GradientBlob — name-only scene stays chromatic-free per LAND-02 spec"
  - "SandbarScene blob position uses transform: translateX(-50%) inline only — no Tailwind -translate-x-1/2 to avoid double-transform (Pitfall 5)"
  - "Stat 87% uses wordmark <p> not a heading — semantic correctness, heading hierarchy preserved"

patterns-established:
  - "Scene shell: section[aria-label][min-h-100svh][relative overflow-hidden] + blob sibling + SceneFadeIn children"
  - "Display token: always inline style with clamp(), never Tailwind text-* size tokens for hero text"
  - "Blob-before-content: GradientBlob JSX order before SceneFadeIn ensures z-index stacking without extra classes"

requirements-completed: [LAND-01, LAND-02, LAND-03]

# Metrics
duration: 2min
completed: 2026-06-03
---

# Phase 02 Plan 02: Scene Components Summary

**IntroScene (h1 Fraunces display + scroll hint) and SandbarScene (pink-lavender-blue blob + wordmark + 87% stat + /sandbar CTA) establishing the scene-shell composition contract**

## Performance

- **Duration:** 2 min
- **Started:** 2026-06-03T22:36:07Z
- **Completed:** 2026-06-03T22:37:34Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created IntroScene: sole h1 on the page with "Luke Cassiano" in Fraunces ExtraBold Italic at clamp(56px, 10vw, 120px), positioning line "Signal into something legible.", and ScrollHint as a sibling (no blob)
- Created SandbarScene: pink-lavender-blue GradientBlob as visual anchor, h2 wordmark, tagline "Agentic surf forecasting.", 87% stat with FORECAST ACCURACY label, and SceneLink to /sandbar
- Established the scene-shell pattern (min-h-[100svh], blob sibling, SceneFadeIn content) reused by all remaining landing scenes

## Task Commits

Each task was committed atomically:

1. **Task 1: Create IntroScene** - `5d3b185` (feat)
2. **Task 2: Create SandbarScene** - `3075e43` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified
- `components/scenes/IntroScene.tsx` - Intro scene: h1 name, positioning line, ScrollHint, no blob
- `components/scenes/SandbarScene.tsx` - Sandbar scene: blob, h2 wordmark, stat, CTA to /sandbar

## Decisions Made
- IntroScene has no GradientBlob — the intro is name-only per LAND-02 spec; chromatic elements would dilute the contrast with subsequent project scenes
- SandbarScene blob position uses only `transform: 'translateX(-50%)'` inline (not also Tailwind `-translate-x-1/2`) to avoid the double-transform pitfall that causes horizontal drift
- The 87% stat uses a `<p>` with the wordmark class rather than a heading element — preserves heading hierarchy (only one h1, h2 per scene)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Scene shell pattern is proven end-to-end with IntroScene and SandbarScene
- Remaining scenes (BeliefScene, WhiteScene, BreakScene, ClosingScene) can follow the same blob-sibling + SceneFadeIn pattern
- Homepage can compose all scenes in a single page file using these named exports

---
*Phase: 02-landing-experience*
*Completed: 2026-06-03*
