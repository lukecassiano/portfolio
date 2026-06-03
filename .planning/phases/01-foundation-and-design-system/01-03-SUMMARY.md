---
phase: "01"
plan: "03"
subsystem: "shared-components"
tags: [framer-motion, animation, accessibility, 404, footer]
dependency_graph:
  requires: [01-01-scaffold, 01-02-lenis-scroll]
  provides: [GradientBlob, Footer, SkipLink, custom-404]
  affects: [app/layout.tsx, app/not-found.tsx]
tech_stack:
  added: [framer-motion@12.40.0]
  patterns: [looping-drift-animation, reduced-motion-gate, sr-only-skip-link]
key_files:
  created:
    - components/ui/GradientBlob.tsx
    - components/ui/Footer.tsx
    - components/ui/SkipLink.tsx
    - app/not-found.tsx
  modified:
    - app/layout.tsx
    - package.json
    - package-lock.json
decisions:
  - "filter:blur kept static in style prop, not in animate, to avoid layout thrash"
  - "Looping drift animation (opacity+y, 14s infinite) chosen over single settle"
  - "SkipLink as server component — no interactivity needed, pure CSS focus trick"
metrics:
  duration: "~10 minutes"
  completed: "2026-06-03"
---

# Phase 01 Plan 03: Shared Components (GradientBlob, Footer, SkipLink, 404) Summary

Installed framer-motion and built three shared UI components plus a custom 404 page. GradientBlob provides a decorative looping drift animation with full reduced-motion support. SkipLink and Footer round out the accessibility and navigation baseline. Custom 404 uses GradientBlob in context.

## framer-motion Version

`framer-motion@12.40.0` installed via npm. 3 packages added (framer-motion + 2 transitive deps).

## GradientBlob Prop Signature

```ts
interface GradientBlobProps {
  colors: string[]        // Ordered gradient color stops
  size?: string           // CSS size, default '60vmax' (square)
  position?: React.CSSProperties  // top/left/right/bottom/transform for placement
  blur?: string           // Static blur radius, default '80px'
  className?: string
}
```

**Motion choice:** Looping drift — `opacity: [0.8, 0.95, 0.8], y: ['0%', '-4%', '0%']` with `duration: 14, repeat: Infinity, ease: 'easeInOut'`. This gives a gentle breathing/floating effect indefinitely.

**`filter: blur()` is static.** It lives in the `style` prop alongside `willChange: 'transform'`. It is never referenced in `animate`, `initial`, or `transition`. This avoids expensive filter re-computation during the animation loop.

## SkipLink and #main-content

SkipLink targets `href="#main-content"`. That id is present on:
- `app/page.tsx` — `<main id="main-content">` (home page)
- `app/not-found.tsx` — `<main id="main-content">` (404 page)

SkipLink is the first child of `<body>` in `app/layout.tsx`, inserted before `LenisProvider`. It is visually hidden (`sr-only`) until it receives keyboard focus, at which point it appears at top-left with ink background and cream text for maximum contrast.

## Build Status

`npm run build` exits 0. Build output:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    142 B          87.4 kB
└ ○ /_not-found                          142 B          87.4 kB
```

Both routes prerendered as static content. `/_not-found` confirmed present.

## Deviations from Plan

None — plan executed exactly as written.

## Task Commits

| Task | Description                                  | Commit  |
| ---- | -------------------------------------------- | ------- |
| 1    | Install framer-motion, create GradientBlob   | 88808a2 |
| 2    | Footer, SkipLink, wire SkipLink into layout  | a9cca35 |
| 3    | Custom 404 page + full build verification    | 87edd46 |

## Self-Check: PASSED

- `components/ui/GradientBlob.tsx` — exists, all 4 constraint greps pass
- `components/ui/Footer.tsx` — exists, mailto grep passes
- `components/ui/SkipLink.tsx` — exists, sr-only and focus greps pass
- `app/not-found.tsx` — exists, all 4 greps pass
- `app/layout.tsx` — SkipLink imported and first body child, LenisProvider preserved
- All 3 task commits exist (88808a2, a9cca35, 87edd46)
- `npm run build` exits 0, `/_not-found` route listed
