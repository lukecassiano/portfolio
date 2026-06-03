---
phase: 01-foundation-and-design-system
plan: 02
subsystem: ui
tags: [lenis, smooth-scroll, next.js, react, accessibility, reduced-motion]

# Dependency graph
requires:
  - phase: 01-foundation-and-design-system/01-01
    provides: Root layout with font variables, globals.css, Tailwind tokens — this plan wraps into that layout

provides:
  - LenisProvider client component with lerp 0.08, manual RAF loop, reduced-motion gate, and cleanup
  - Root layout wired with LenisProvider as outermost client wrapper inside <body>
  - Multi-section page for smooth scroll verification

affects:
  - phase-02-scene-components (depends on LenisProvider being stable before building scroll-driven scenes)
  - phase-03-animations (Lenis scroll sync; do NOT add useSpring to scroll-derived values)

# Tech tracking
tech-stack:
  added: [lenis@1.3.23]
  patterns: [manual-RAF-loop, reduced-motion-gate, client-leaf-provider]

key-files:
  created:
    - components/providers/LenisProvider.tsx
  modified:
    - app/layout.tsx
    - app/page.tsx
    - package.json

key-decisions:
  - "lenis@1.3.23 installed — not @studio-freight/lenis (deprecated). lenis/react exports: ReactLenis, Lenis, LenisContext, useLenis"
  - "Manual RAF pattern used (not autoRaf) for Strict Mode safety — cancelAnimationFrame + lenis.destroy() cleanup"
  - "lenis/dist/lenis.css kept — file confirmed present in dist/ for lenis@1.3.23"
  - "syncTouch: false — native touch scroll feels better on mobile; Lenis easing on wheel/trackpad only"

patterns-established:
  - "Client leaf provider: 'use client' is pushed down to the smallest wrapper; root layout stays a Server Component"
  - "Reduced-motion gate: matchMedia check before any Lenis init — if reduce is set, return early (native scroll preserved)"
  - "Manual RAF loop: let rafId = requestAnimationFrame(raf) with return () => { cancelAnimationFrame(rafId); lenis.destroy() }"

requirements-completed: [FOUND-04]

# Metrics
duration: 15min
completed: 2026-06-03
---

# Phase 1 Plan 02: Lenis Smooth Scroll Summary

**Lenis@1.3.23 smooth scroll installed with manual RAF loop (lerp 0.08), reduced-motion accessibility gate, and Strict-Mode-safe cleanup wired as the outermost client provider in the root layout**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-06-03T21:02:00Z
- **Completed:** 2026-06-03T21:17:31Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Installed `lenis@1.3.23` (not the deprecated `@studio-freight/lenis`); verified both core and `lenis/react` export surfaces
- Created `LenisProvider` as a `'use client'` leaf with lerp 0.08, manual RAF loop, prefers-reduced-motion gate, and `cancelAnimationFrame` + `lenis.destroy()` cleanup
- Wired `LenisProvider` as outermost wrapper in `app/layout.tsx` (layout stays a Server Component); `npm run build` exits 0

## Task Commits

Each task was committed atomically:

1. **Task 1: Install lenis and verify export surface** - `52c3916` (chore)
2. **Task 2: Create LenisProvider with manual RAF loop** - `b8b9973` (feat)
3. **Task 3: Wire LenisProvider into root layout** - `6ec6202` (feat)

## lenis/react Export Keys (recorded per plan requirement)

Running `node -e "const l = require('lenis/react'); console.log(Object.keys(l))"` returned:
```
[ 'Lenis', 'LenisContext', 'ReactLenis', '__esModule', 'default', 'useLenis' ]
```

Core lenis export type: `function` (the Lenis class).

Decision: Used the manual RAF pattern with core `Lenis` import (not `ReactLenis`) for explicit reduced-motion gate and Strict-Mode-safe control, as specified in the plan.

## lenis/dist/lenis.css Status

The import `'lenis/dist/lenis.css'` was **kept** — `ls node_modules/lenis/dist/` confirmed `lenis.css` is present in lenis@1.3.23. It sets `html.lenis` overflow helpers.

## Files Created/Modified

- `components/providers/LenisProvider.tsx` - 'use client' Lenis wrapper; lerp 0.08, manual RAF, reduced-motion gate, destroy cleanup
- `app/layout.tsx` - Added LenisProvider import; wraps {children} in <LenisProvider> inside <body>
- `app/page.tsx` - Updated to 3x min-h-[100svh] sections for scroll verification
- `package.json` + `package-lock.json` - Added lenis@1.3.23 dependency

## Decisions Made

- Manual RAF pattern over `ReactLenis` component: gives explicit control over cleanup order (`cancelAnimationFrame` before `lenis.destroy()`) which is safer under React 18 Strict Mode double-mount
- `syncTouch: false`: native mobile touch scroll is more natural; Lenis easing only applies to wheel/trackpad
- `lenis/dist/lenis.css` import kept: file confirmed present in dist/, sets html.lenis overflow helpers
- `duration: 1.2` alongside `lerp: 0.08`: duration is a fallback for non-lerp easing; lerp 0.08 dominates the feel

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — build compiled successfully on first attempt, all exports matched expected signatures.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- LenisProvider is live and wrapping all routes — Phase 2 scroll-driven scenes can now depend on Lenis being active
- Reduced-motion gate confirmed: `if (prefersReduced) return` before any Lenis init preserves native scroll
- No duplicate RAF risk: Strict-Mode double-mount produces two effect cycles; cleanup runs `cancelAnimationFrame + lenis.destroy()` on unmount, so the second mount starts clean
- Do NOT add `useSpring` to scroll-derived values in Phase 3 — Lenis already eases; double-easing creates jank

---
*Phase: 01-foundation-and-design-system*
*Completed: 2026-06-03*
