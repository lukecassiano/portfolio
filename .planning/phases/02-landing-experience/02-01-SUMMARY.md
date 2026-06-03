---
phase: 02-landing-experience
plan: 01
subsystem: ui
tags: [framer-motion, react, nextjs, animation, accessibility, reduced-motion, scroll]

# Dependency graph
requires:
  - phase: 01-foundation-and-design-system
    provides: GradientBlob (useReducedMotion pattern), cn() util, Tailwind tokens (cream/ink/font-mono/font-serif)
provides:
  - SceneFadeIn: motion.div wrapper with whileInView fade + reduced-motion gate
  - ScrollHint: scroll-driven opacity fade using useScroll + useTransform
  - SceneLink: Server Component CTA anchor with external link accessibility
affects: [02-02, 02-03, 02-04, 02-05, 02-06, scene-components]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SceneFadeIn: whileInView with reduced-motion gate (initial visible, whileInView omitted)"
    - "ScrollHint: useScroll on window + useTransform, no useSpring (Lenis already eases)"
    - "SceneLink: Server Component plain anchor, external prop gates target/rel + sr-only span"

key-files:
  created:
    - components/ui/SceneFadeIn.tsx
    - components/ui/ScrollHint.tsx
    - components/ui/SceneLink.tsx
  modified: []

key-decisions:
  - "SceneFadeIn uses initial={visible} + omits whileInView (not undefined animate) when reduced-motion — prevents invisible content (Pitfall 8)"
  - "ScrollHint uses raw MotionValue from useTransform, no useSpring — Lenis already provides easing"
  - "SceneLink is a Server Component (no 'use client') — plain anchor with no browser APIs"
  - "tracking-[0.1em] used in ScrollHint per UI-SPEC exact spec (0.1em letter-spacing)"

patterns-established:
  - "Reduced-motion gate: set initial to visible state AND omit whileInView — never leave opacity:0 with animation skipped"
  - "Client boundary discipline: 'use client' only on leaf components that use browser APIs (SceneFadeIn, ScrollHint); Server Components remain clean (SceneLink)"
  - "External link accessibility: target=_blank + rel=noopener noreferrer + sr-only '(opens in new tab)' span gated on external prop"

requirements-completed: [LAND-07]

# Metrics
duration: 6min
completed: 2026-06-03
---

# Phase 2 Plan 01: Shared Leaf Components Summary

**Three shared UI primitives — SceneFadeIn (LAND-07 fade contract), ScrollHint (scroll-driven opacity fade), SceneLink (accessible CTA anchor) — built as pure new files that unblock all five scene components in later waves.**

## Performance

- **Duration:** 6 min
- **Started:** 2026-06-03T22:32:19Z
- **Completed:** 2026-06-03T22:38:00Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- SceneFadeIn encapsulates the LAND-07 fade contract: whileInView opacity 0→1 / y 12→0 over 600ms easeOut, once at 30% viewport, with full reduced-motion safety (initial set to visible, whileInView omitted)
- ScrollHint renders a scroll affordance using raw MotionValue from useScroll + useTransform mapping scrollY [0,80] to opacity [1,0] — no useSpring double-easing
- SceneLink is a zero-JS Server Component anchor covering both internal and external CTAs with proper rel attributes and screen-reader "(opens in new tab)" text

## Task Commits

Each task was committed atomically:

1. **Task 1: Create SceneFadeIn wrapper component** - `2d68859` (feat)
2. **Task 2: Create ScrollHint scroll affordance component** - `ff6e382` (feat)
3. **Task 3: Create SceneLink CTA anchor component** - `cf0660a` (feat)

## Files Created/Modified
- `components/ui/SceneFadeIn.tsx` - 'use client' motion.div wrapper with whileInView fade and reduced-motion gate; used by all five scene components
- `components/ui/ScrollHint.tsx` - 'use client' scroll-driven opacity hint using useScroll + useTransform; returns null when reduced-motion is set
- `components/ui/SceneLink.tsx` - Server Component CTA anchor with external prop gating target/rel and sr-only accessibility span

## Decisions Made
- tracking-[0.1em] used in ScrollHint per UI-SPEC exact spec (0.1em), not Tailwind's tracking-widest preset (which is 0.1em but ambiguous)
- SceneLink has no 'use client' directive — it is a Server Component as specified; callers pass children including arrow unicode character
- SceneFadeIn exports named function (not default) as required for tree-shaking and explicit import contracts

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All three shared leaf components are ready for import in scene components (02-02 through 02-06)
- SceneFadeIn unblocks all five scene fade-in wrappers
- ScrollHint is ready for use inside IntroScene
- SceneLink is ready for use in SandbarScene, WhiteHelmetScene, and ReadingTheBreakScene
- npm run build passes (static prerender confirmed)

---
*Phase: 02-landing-experience*
*Completed: 2026-06-03*
