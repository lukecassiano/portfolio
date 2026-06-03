---
phase: 01-foundation-and-design-system
plan: 01
subsystem: ui
tags: [next.js, tailwindcss, fonts, design-tokens, fraunces, ibm-plex-mono, typescript]

# Dependency graph
requires: []
provides:
  - Next.js 14 App Router + TypeScript + ESLint project scaffolded at root (no src/)
  - Tailwind v3.4.19 with font-serif/font-mono aliases and cream/ink color tokens
  - Fraunces variable italic woff2 loaded via next/font/local (--font-fraunces CSS var)
  - IBM Plex Mono loaded via next/font/google weights 400/500 (--font-mono CSS var)
  - :root design tokens: cream base (#F5F3EE), ink (#1A1A1A), 4 blob color-stop sets
  - .wordmark utility class with font-variation-settings 'SOFT' 0, 'WONK' 1
  - lib/fonts.ts: single font source exporting fraunces + ibmPlexMono
  - lib/utils.ts: cn() helper via twMerge(clsx())
  - mdx-components.tsx stub for future @next/mdx
  - app/blog/.gitkeep reserving blog URL namespace
affects: [02-animations-and-lenis, 03-landing-page, 04-sandbar-case-study, all-phases]

# Tech tracking
tech-stack:
  added:
    - next@14.2.35
    - react@18.3.1
    - react-dom@18.3.1
    - typescript@5.x
    - tailwindcss@3.4.19
    - postcss@8.x
    - autoprefixer (dev)
    - clsx@2.1.1
    - tailwind-merge@3.6.0
    - eslint@8.x + eslint-config-next@14
  patterns:
    - next/font/local for variable woff2 local fonts
    - next/font/google for web fonts (IBM Plex Mono)
    - Single lib/fonts.ts as the one font instance source
    - CSS vars on :root for design tokens; Tailwind extends for utility aliases
    - Blob color stops as raw CSS vars (not Tailwind tokens)

key-files:
  created:
    - lib/fonts.ts
    - lib/utils.ts
    - mdx-components.tsx
    - app/blog/.gitkeep
    - app/fonts/Fraunces-Italic-VF.woff2
    - postcss.config.js
  modified:
    - app/globals.css
    - tailwind.config.ts
    - app/layout.tsx
    - app/page.tsx
    - package.json

key-decisions:
  - "Tailwind v3.4.19 (not v4) - create-next-app@14 scaffolded v3, no downgrade needed"
  - "postcss.config.js in CommonJS form (not .mjs) for maximum compatibility"
  - "Fraunces woff2 sourced from Google Fonts CDN (latin subset, 81KB) via CSS API extraction - full variable font weight 100-900 italic"
  - "mdx-components.tsx uses Record<string, unknown> type instead of MDXComponents to avoid missing mdx/types dependency"
  - "--font-mono (not --font-ibm-plex-mono) is the CSS var name for IBM Plex Mono"
  - "Geist fonts from default scaffold removed from layout; app/fonts/ keeps the Geist woff files but they are unused"

patterns-established:
  - "Font loading: always import from @/lib/fonts — never call next/font directly in components"
  - "Design tokens: :root CSS vars for values, tailwind.config.ts extend for aliases"
  - "Blob colors: raw CSS vars only, not Tailwind tokens (too many gradients for Tailwind config)"
  - "cn() helper: always use for conditional className composition"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03, FOUND-05, FOUND-06, FOUND-07]

# Metrics
duration: 102min
completed: 2026-06-03
---

# Phase 1 Plan 1: Next.js 14 + Tailwind v3 foundation with Fraunces/IBM Plex Mono font system and design tokens

**Next.js 14 App Router scaffolded with Tailwind v3, Fraunces variable italic loaded via next/font/local, IBM Plex Mono via next/font/google, and :root design tokens (cream #F5F3EE, 4 blob color-stop sets, .wordmark variation class)**

## Performance

- **Duration:** ~102 min
- **Started:** 2026-06-03T18:10:07Z
- **Completed:** 2026-06-03T19:52:15Z
- **Tasks:** 3
- **Files modified:** 12

## Accomplishments

- Scaffolded Next.js 14 project at repo root with Tailwind v3.4.19, React 18.3.1, TypeScript, ESLint — no src/ directory
- Fraunces-Italic-VF.woff2 (81KB) downloaded from Google Fonts CDN and loaded via next/font/local; IBM Plex Mono loaded via next/font/google (weights 400/500); single source in lib/fonts.ts
- Complete :root design token system: cream/ink base colors, 4 blob color-stop sets, .wordmark class with SOFT/WONK variation axes; Tailwind extends font-serif/font-mono aliases; npm run build exits 0

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 14 project and force Tailwind v3** - `f5fb0d3` (chore)
2. **Task 2: Download Fraunces variable woff2 and create lib/fonts.ts + lib/utils.ts** - `a8bb6e8` (feat)
3. **Task 3: Wire globals.css design tokens, tailwind.config.ts aliases, layout.tsx fonts, and MDX stubs** - `a0177d5` (feat)

## Files Created/Modified

- `app/fonts/Fraunces-Italic-VF.woff2` - Fraunces italic variable font, latin subset, 81KB, weights 100-900
- `lib/fonts.ts` - Single font instance source: fraunces (localFont, --font-fraunces) + ibmPlexMono (google, --font-mono)
- `lib/utils.ts` - cn() helper using twMerge(clsx(inputs))
- `app/globals.css` - Tailwind v3 directives + :root cream/ink/blob vars + .wordmark variation class
- `tailwind.config.ts` - fontFamily.serif (Fraunces) + fontFamily.mono (IBM Plex Mono) + cream/ink colors
- `app/layout.tsx` - lang=en, font variables on html, font-serif bg-cream on body
- `app/page.tsx` - Minimal proof-of-fonts page with .wordmark h1 and font-mono subtitle
- `mdx-components.tsx` - useMDXComponents stub (Record<string, unknown> type, no mdx/types dep)
- `app/blog/.gitkeep` - Reserved blog URL namespace
- `postcss.config.js` - CommonJS v3 form: tailwindcss + autoprefixer plugins

## Decisions Made

- Fraunces woff2 sourced by calling Google Fonts CSS API with modern User-Agent, extracting the latin-subset woff2 URL, downloading directly. The plan mentioned GitHub TTF as alternative — the CSS API approach yields an already-optimized woff2.
- `mdx-components.tsx` uses `Record<string, unknown>` instead of `MDXComponents` from `mdx/types` because `@next/mdx` is not installed. The plan explicitly provided this fallback to keep `next build` clean.
- `--font-mono` is the CSS var name (not `--font-ibm-plex-mono`). Downstream code must use `var(--font-mono)` in CSS and `font-mono` in Tailwind.
- `postcss.config.js` replaces the scaffolded `postcss.config.mjs` for CommonJS compatibility.

## Deviations from Plan

None - plan executed exactly as written. The Tailwind v3 check passed without needing to force downgrade (create-next-app@14 already installs v3.4.19). PostCSS was converted from .mjs to .js as a cleanup (no behavioral change).

## Issues Encountered

None. The scaffolded project had Tailwind v3 already, so no forced downgrade was needed. The Google Fonts CSS API approach for Fraunces woff2 worked on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All font variables and design tokens are available globally. Any component can use `font-serif`, `font-mono`, `bg-cream`, `text-ink`, and the blob CSS vars without any additional setup.
- Phase 2 (Animations + Lenis) depends only on this phase being complete — ready to proceed.
- Phase 3 (Landing page scenes) can start in parallel with Phase 2 once Phase 1 is confirmed.
- One open item: verify `lenis/react` export after install before writing LenisProvider (documented in STATE.md blockers).

---
*Phase: 01-foundation-and-design-system*
*Completed: 2026-06-03*
