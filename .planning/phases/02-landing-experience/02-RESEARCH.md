# Phase 2: Landing Experience - Research

**Researched:** 2026-06-03
**Domain:** Next.js 14 App Router + Framer Motion v12 + Lenis scroll-driven scene assembly
**Confidence:** HIGH (all findings verified against installed packages, live codebase, and official type definitions)

---

## Summary

Phase 2 builds the five full-viewport landing scenes on top of a fully-completed Phase 1 foundation. The design contract is locked in 02-UI-SPEC.md. Every library, token, component API, and copy string has been pinned. The primary work is structural: create `components/scenes/` and `components/ui/SceneFadeIn.tsx`, then replace the placeholder `app/page.tsx` with the five scene imports.

The Framer Motion `whileInView` prop is confirmed in v12.40.0. `useScroll` returns `MotionValue<number>` (no `useSpring` needed or wanted — Lenis already eases). The `useReducedMotion` hook is confirmed exported. All three framer-motion APIs required for this phase are present in the installed version.

The Belief Agent scene's color inversion (near-black `#0D0D12` background, cream text) is handled entirely with Tailwind utility classes scoped to that one scene component — no theme change, no CSS variable override needed.

**Primary recommendation:** Build in five atomic wave-aligned tasks: (1) `SceneFadeIn` + `SceneLink` shared components, (2) `IntroScene` + `ScrollHint`, (3) `SandbarScene` + `BeliefAgentScene`, (4) `WhiteHelmetScene` + `ReadingTheBreakScene`, (5) `app/page.tsx` assembly + Footer placement. Each wave is independently committable and testable in the browser.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LAND-01 | 5 full-viewport scenes using min-h-[100svh], vertically stacked, soft Lenis guidance | Lenis already live in layout; `min-h-[100svh]` confirmed correct class; scene container pattern documented below |
| LAND-02 | Intro scene — "Luke Cassiano" in Fraunces ExtraBold Italic, one positioning line, nothing else | `.wordmark` class confirmed in globals.css; `display` type token clamp pattern documented; copy locked in UI-SPEC |
| LAND-03 | Sandbar scene — wordmark, tagline, hero stat (87%), link to /sandbar; pink→lavender→blue blob | GradientBlob API confirmed; colors array confirmed in globals.css; `wordmark` token for stat numerals documented |
| LAND-04 | Belief Agent scene — near-black bg #0D0D12, wordmark + tagline + entropy stat (0.31); deep indigo→phosphor green blob | Color inversion pattern (scoped Tailwind classes) documented; blob hex values confirmed in globals.css |
| LAND-05 | WhiteHelmet scene — cream background, wordmark + tagline, link to /whitehelmet; ochre→dust blob | Same cream-on-ink default; blob colors confirmed; no case study page yet so link resolves to stub (Phase 3) |
| LAND-06 | Reading the Break scene — warm sunset blob, 3 placeholder post titles, external Substack link | External link pattern (target/_blank, sr-only text) documented; all copy locked in UI-SPEC |
| LAND-07 | Framer Motion fade-in on scene content triggered by scroll entry; gated by prefers-reduced-motion | `whileInView` confirmed in v12.40.0; `useReducedMotion` confirmed exported; full pattern documented below |

</phase_requirements>

---

## Standard Stack

### Core (all already installed — no new installs needed for this phase)

| Library | Installed Version | Purpose | Status |
|---------|-------------------|---------|--------|
| next | 14.2.35 | App Router, RSC, page assembly | Installed |
| react | 18.3.1 | Component model | Installed |
| framer-motion | 12.40.0 | `motion.div`, `whileInView`, `useScroll`, `useTransform`, `useReducedMotion` | Installed |
| lenis | 1.3.23 | Smooth scroll (LenisProvider already active in layout) | Installed |
| tailwindcss | 3.4.19 | Utility classes, `bg-[#0D0D12]`, `font-serif`, `font-mono`, `text-cream` | Installed |
| clsx + tailwind-merge | 2.1.1 / 3.6.0 | `cn()` helper for conditional classNames | Installed |

**No new packages required.** All dependencies for Phase 2 are already installed.

**Installation:** None needed. Run `npm run dev` to start.

### Design Tokens Already in globals.css

```css
/* Confirmed present — DO NOT re-declare */
--color-cream: #F5F3EE;
--color-ink: #1A1A1A;
--blob-sandbar-start: #F4A8C7; --blob-sandbar-mid: #C4B5FD; --blob-sandbar-end: #93C5FD;
--blob-belief-start: #312E81; --blob-belief-end: #4ADE80;
--blob-white-start: #D97706;  --blob-white-end: #A8A29E;
--blob-break-start: #F97316;  --blob-break-end: #F59E0B;
```

### Tailwind Config Already Extended

```ts
/* tailwind.config.ts — confirmed */
fontFamily: { serif: ['var(--font-fraunces)', ...], mono: ['var(--font-mono)', ...] }
colors: { cream: '#F5F3EE', ink: '#1A1A1A' }
```

---

## Architecture Patterns

### Recommended Project Structure (post-Phase 2)

```
components/
├── providers/
│   └── LenisProvider.tsx        # Already exists — do NOT modify
├── scenes/
│   ├── IntroScene.tsx            # NEW: 'use client' (motion + useScroll)
│   ├── SandbarScene.tsx          # NEW: 'use client' (motion)
│   ├── BeliefAgentScene.tsx      # NEW: 'use client' (motion)
│   ├── WhiteHelmetScene.tsx      # NEW: 'use client' (motion)
│   └── ReadingTheBreakScene.tsx  # NEW: 'use client' (motion)
└── ui/
    ├── Footer.tsx                # Already exists
    ├── GradientBlob.tsx          # Already exists
    ├── SceneFadeIn.tsx           # NEW: 'use client' (motion.div wrapper)
    ├── SceneLink.tsx             # NEW: Server Component (plain <a>)
    ├── ScrollHint.tsx            # NEW: 'use client' (useScroll + useTransform)
    └── SkipLink.tsx              # Already exists
app/
└── page.tsx                     # REPLACE placeholder — stays Server Component
```

### Pattern 1: `app/page.tsx` as Server Component (never 'use client')

**What:** `app/page.tsx` imports all five scene components and renders them in order. It remains a Server Component because none of its direct logic requires browser APIs.

**When to use:** Always. The `'use client'` boundary lives inside individual scene components (or better, inside `SceneFadeIn` and `ScrollHint`).

```tsx
// app/page.tsx — Server Component (no 'use client' directive)
// Source: UI-SPEC.md Page Assembly section + RESEARCH.md SUMMARY.md architecture pattern
import { IntroScene } from '@/components/scenes/IntroScene'
import { SandbarScene } from '@/components/scenes/SandbarScene'
import { BeliefAgentScene } from '@/components/scenes/BeliefAgentScene'
import { WhiteHelmetScene } from '@/components/scenes/WhiteHelmetScene'
import { ReadingTheBreakScene } from '@/components/scenes/ReadingTheBreakScene'
import { Footer } from '@/components/ui/Footer'

export default function Home() {
  return (
    <main id="main-content">
      <IntroScene />
      <SandbarScene />
      <BeliefAgentScene />
      <WhiteHelmetScene />
      <ReadingTheBreakScene />
      <Footer />
    </main>
  )
}
```

**Footer is in page.tsx, not layout.tsx** — Footer is landing-page-specific content, not a global shell element. Case study pages in Phase 3 will add their own Footer import.

### Pattern 2: Scene Container HTML

Every scene uses the same container className. This is the locked contract from UI-SPEC.md:

```tsx
<section
  aria-label="[Project Name]"
  className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:px-16 lg:py-16"
>
```

Key properties:
- `relative` — required for `absolute` positioned GradientBlob
- `overflow-hidden` — contains blob bleed without clip at unusual aspect ratios
- `min-h-[100svh]` — NOT `h-screen` or `100vh` (mobile chrome safety)
- `aria-label` — accessibility landmark, value is the project name

### Pattern 3: `SceneFadeIn` Shared Wrapper Component

**What:** A thin `'use client'` component that wraps scene content in a `motion.div` with the standard fade-in contract. All five scene components use it. This keeps `'use client'` scoped to the animated wrapper, not spread across scene markup.

**Confirmed API:** `whileInView` is present in framer-motion v12.40.0 types. `useReducedMotion` is exported. Both verified against installed `node_modules/framer-motion/dist/index.d.ts`.

```tsx
// components/ui/SceneFadeIn.tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface SceneFadeInProps {
  children: React.ReactNode
  className?: string
}

export function SceneFadeIn({ children, className }: SceneFadeInProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

**One wrapper per scene** — wraps the entire content group (wordmark + tagline + stat + CTA) as a single unit. No per-element stagger. GradientBlob is NOT inside SceneFadeIn (blob has its own independent drift animation).

### Pattern 4: Belief Agent Color Inversion

**What:** The Belief Agent scene has a near-black background (#0D0D12) and cream text. All other scenes use the cream/ink default from `<html>` and `<body>`.

**How to implement:** Scoped Tailwind classes on the scene `<section>`. No CSS variable override, no theme switch, no context.

```tsx
// BeliefAgentScene.tsx
<section
  aria-label="Belief Agent"
  className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:px-16 lg:py-16 bg-[#0D0D12] text-cream"
>
```

- `bg-[#0D0D12]` — arbitrary Tailwind value, overrides the body's `bg-cream`
- `text-cream` — overrides `text-ink` from body for all children of this section
- No other scene is affected

**GradientBlob on dark background:** The blob's `radial-gradient` with `#312E81` → `#4ADE80` will glow against the near-black field. The blob's default `opacity: 0.85` is correct — do not increase it.

### Pattern 5: Scroll Hint with `useScroll` (No `useSpring`)

**What:** The intro scene's "scroll ↓" hint fades to opacity 0 once the user scrolls 80px. Uses Framer Motion `useScroll` on `window` (default behavior — no `container` ref needed), then `useTransform` to map scroll position to opacity.

**Critical:** Do NOT wrap in `useSpring`. Lenis already eases scroll. Double-easing creates wrong feel. Use raw `MotionValue` directly.

```tsx
// components/ui/ScrollHint.tsx
'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export function ScrollHint() {
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()  // tracks window scroll — no container ref needed
  const opacity = useTransform(scrollY, [0, 80], [1, 0])

  if (prefersReduced) return null  // conditional render, not animate

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3"
    >
      <span className="font-mono font-medium text-xs tracking-widest uppercase text-ink">
        scroll ↓
      </span>
    </motion.div>
  )
}
```

`useScroll` with no arguments tracks the window scroll position. Confirmed return type: `{ scrollY: MotionValue<number>, scrollX: ..., scrollYProgress: ..., scrollXProgress: ... }` (verified from installed types).

### Pattern 6: `SceneLink` Component (Server Component)

**What:** The CTA links ("View case study →", "Read on Substack →") are plain anchor tags. No motion needed. Server Component keeps bundle lean.

```tsx
// components/ui/SceneLink.tsx — Server Component (no 'use client')
interface SceneLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

export function SceneLink({ href, children, external }: SceneLinkProps) {
  return (
    <a
      href={href}
      className="font-mono font-medium text-xs tracking-wide text-ink hover:opacity-60 transition-opacity duration-200"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external && (
        <span className="sr-only"> (opens in new tab)</span>
      )}
    </a>
  )
}
```

The arrow `→` is part of the `children` string (Unicode U+2192), not a separate component.

### Pattern 7: Typography — Fraunces `display` and `wordmark` Tokens

Both tokens use the `.wordmark` CSS class from `globals.css`. The only difference is `fontSize` via inline style:

```tsx
// display token — "Luke Cassiano" (intro scene only)
<h1 className="wordmark" style={{ fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: 1.0 }}>
  Luke Cassiano
</h1>

// wordmark token — all project names + hero stats
<h2 className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
  Sandbar
</h2>

// wordmark token — hero numerals (same size as wordmark)
<p className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
  87%
</p>
```

**IBM Plex Mono is loaded with `weights: ['400', '500']`** (confirmed in `lib/fonts.ts`). The UI-SPEC says weight 500 only in this phase. Use `font-medium` (500) class. Never `font-normal` (400) on `font-mono` in this phase.

```tsx
// body token (16px/500) — taglines
<p className="font-mono font-medium text-base leading-relaxed">
  Agentic surf forecasting.
</p>

// label token (12px/500) — stat labels, CTAs, post titles, scroll hint
<p className="font-mono font-medium text-xs leading-normal tracking-[0.08em] uppercase">
  FORECAST ACCURACY
</p>
```

### Pattern 8: GradientBlob Usage in Scenes

GradientBlob is already built (Phase 1). Props are confirmed:

```tsx
// Source: components/ui/GradientBlob.tsx (inspected 2026-06-03)
<GradientBlob
  colors={['#F4A8C7', '#C4B5FD', '#93C5FD']}
  size="70vmax"
  position={{ top: '-10%', left: '50%', transform: 'translateX(-50%)' }}
  blur="100px"
/>
```

The blob's `position` prop is a `React.CSSProperties` object spread onto the element's `style`. Coordinates from UI-SPEC are ready to use as-is. Blob goes BEFORE the SceneFadeIn wrapper in the JSX so it renders behind content.

### Pattern 9: Heading Hierarchy (h1 → h2)

| Scene | Heading | Level |
|-------|---------|-------|
| Intro | "Luke Cassiano" | `<h1>` — only h1 on the page |
| Sandbar | "Sandbar" | `<h2>` |
| Belief Agent | "Belief Agent" | `<h2>` |
| WhiteHelmet | "WhiteHelmet" | `<h2>` |
| Reading the Break | "Reading the Break" | `<h2>` |

Single `<h1>` on the page. All project wordmarks are `<h2>`. This is the correct document outline for a single-page portfolio.

### Anti-Patterns to Avoid

- **DO NOT** add `'use client'` to any scene component's entire export — only `SceneFadeIn` and `ScrollHint` need it within a scene's inner structure. Scene components themselves can be `'use client'` since they compose client children, but minimize the surface.
- **DO NOT** put GradientBlob inside SceneFadeIn — the blob has its own animation loop and should not fade in with content.
- **DO NOT** use `animate` prop instead of `whileInView` — `animate` triggers immediately on mount, not on scroll entry.
- **DO NOT** use `useSpring` on `scrollY` — Lenis already eases the scroll value.
- **DO NOT** use `h-[100svh]` (exact height) — use `min-h-[100svh]` (minimum height) so tall content can still expand.
- **DO NOT** put Footer in `app/layout.tsx` — Footer is page-specific content, not a global shell wrapper.
- **DO NOT** use `text-6xl` Tailwind size tokens for display/wordmark type — use `fontSize` inline style with `clamp()` for responsive behavior.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-driven opacity fade | Custom scroll event listener + state | `useScroll` + `useTransform` from framer-motion | MotionValue doesn't trigger re-renders; scroll listeners + setState cause per-scroll re-renders |
| Reduced-motion detection | `window.matchMedia()` call in component | `useReducedMotion()` from framer-motion | Handles SSR (returns `false` on server), syncs with system changes, consistent with GradientBlob's pattern |
| Conditional className composition | Template literals | `cn()` from `@/lib/utils` | Already established pattern in Phase 1; handles conflict merging |
| Gradient background on blob | Tailwind `from-/to-` gradient classes | `background: radial-gradient(circle, ...)` in `GradientBlob`'s style prop | Already built; radial gradients aren't expressible in Tailwind's linear gradient utilities |

**Key insight:** All animation primitives are in framer-motion. All style utilities are in Tailwind + the existing design token system. This phase is component assembly, not new infrastructure.

---

## Common Pitfalls

### Pitfall 1: `animate` Instead of `whileInView`

**What goes wrong:** Using `<motion.div initial={...} animate={...}>` causes content to animate on page mount, not on scroll entry. First scene fades in correctly (it's already visible), but subsequent scenes are invisible until they animate — then animate immediately even when far off-screen during page load.

**Why it happens:** `animate` fires when the component mounts; `whileInView` fires when the element enters the viewport.

**How to avoid:** Use `whileInView` prop with `viewport={{ once: true, amount: 0.3 }}`. `SceneFadeIn` encapsulates this pattern — use it everywhere.

**Warning signs:** All content visible at page load has already faded in; content scrolled to seems to animate "backwards" from already-visible state.

### Pitfall 2: GradientBlob Inside SceneFadeIn

**What goes wrong:** If GradientBlob is wrapped by SceneFadeIn, it fades in alongside the content. The blob has its own `initial={{ opacity: 0.85 }}` state and a looping drift animation. Wrapping it in SceneFadeIn creates a fade-in conflict: the blob starts at `opacity: 0` (SceneFadeIn initial) then jumps to `0.85` (blob's own initial) creating a flash.

**How to avoid:** Position GradientBlob as an absolute-positioned sibling of SceneFadeIn, not a child.

```tsx
// CORRECT structure inside scene:
<section className="relative min-h-[100svh] ...">
  <GradientBlob colors={...} size={...} position={...} blur={...} />  {/* sibling */}
  <SceneFadeIn className="relative z-10 flex flex-col items-center gap-6">
    {/* content */}
  </SceneFadeIn>
</section>
```

### Pitfall 3: `bg-[#0D0D12]` Doesn't Override Body Text Color

**What goes wrong:** The `<body>` in layout.tsx has `text-ink`. Applying `bg-[#0D0D12]` to the Belief Agent section changes the background but leaves text color as dark ink — invisible on near-black.

**How to avoid:** Always pair the dark background with `text-cream` on the same `<section>` element. Both must be present.

```tsx
// CORRECT
<section className="... bg-[#0D0D12] text-cream">
```

**Warning signs:** Text disappears or is very difficult to read in the Belief Agent scene.

### Pitfall 4: `useScroll` Hydration Mismatch in `ScrollHint`

**What goes wrong:** `ScrollHint` uses `useScroll` which reads from the browser. If `ScrollHint` is rendered in a Server Component parent without `'use client'`, Next.js throws a hydration error.

**How to avoid:** `ScrollHint` must have `'use client'` at the top of its file. `IntroScene` that imports it must also be `'use client'` (or be a Server Component that imports a client component — which is valid in Next.js 14 App Router).

### Pitfall 5: Double `transform: translateX(-50%)` on Blobs

**What goes wrong:** Some blob positions from UI-SPEC include `transform: 'translateX(-50%)'` in the `position` prop. If you also add Tailwind `-translate-x-1/2` or a wrapping `className`, the transforms stack and the blob is positioned incorrectly.

**How to avoid:** Pass all positioning as the `position` prop (a `React.CSSProperties` object). Do not add transform-related Tailwind classes to the GradientBlob component — it spreads `position` into its style prop.

### Pitfall 6: `min-h-[100svh]` vs `h-[100svh]`

**What goes wrong:** `h-[100svh]` creates a fixed height. If Tailwind's JIT purge doesn't see `h-[100svh]` in the codebase, or if content is slightly taller on some devices, the scene clips or overflows badly.

**How to avoid:** Use `min-h-[100svh]` everywhere. Content can make a scene taller if needed without breaking layout.

### Pitfall 7: Belief Agent Blob Visibility

**What goes wrong:** The Belief Agent blob uses `#312E81` (very dark indigo) against `#0D0D12` (near-black). The start color may be nearly invisible, making the blob appear as only a green smear.

**How to avoid:** This is an expected visual effect — the indigo-to-green gradient is the design intent. The blob opacity at 0.85 and 120px blur will create an ambient glow, not a literal gradient ring. Verify in browser against the dark background before flagging as a bug.

### Pitfall 8: `whileInView` with `initial` vs Without

**What goes wrong:** If `useReducedMotion` returns `true` and you still pass `whileInView` with an `initial={{ opacity: 0 }}`, the element remains invisible for users who have reduced motion enabled (because `whileInView` never fires if you set `initial: undefined` — the animation is skipped but the hidden initial state persists).

**How to avoid:** The `SceneFadeIn` pattern sets BOTH `initial` AND removes `whileInView` when `prefersReduced`:

```tsx
initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
```

This ensures content is always visible regardless of whether the animation runs.

---

## Code Examples

Verified patterns from installed package and locked UI-SPEC:

### Scene Shell (all 5 scenes)

```tsx
// Source: UI-SPEC.md Scene Layout Contract, confirmed min-h-[100svh] from PITFALLS.md
<section
  aria-label="Sandbar"
  className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:px-16 lg:py-16"
>
  <GradientBlob
    colors={['#F4A8C7', '#C4B5FD', '#93C5FD']}
    size="70vmax"
    position={{ top: '-10%', left: '50%', transform: 'translateX(-50%)' }}
    blur="100px"
  />
  <SceneFadeIn className="relative z-10 flex flex-col items-center gap-6 text-center">
    {/* content */}
  </SceneFadeIn>
</section>
```

### useScroll + useTransform (ScrollHint)

```tsx
// Source: framer-motion v12.40.0 installed types — useScroll returns MotionValue<number>
// No useSpring — Lenis already eases the scroll
const { scrollY } = useScroll()
const opacity = useTransform(scrollY, [0, 80], [1, 0])
// Usage: <motion.div style={{ opacity }}>
```

### Blob Color Arrays (confirmed from globals.css)

```tsx
// Source: app/globals.css (inspected 2026-06-03)
const BLOB_COLORS = {
  sandbar:     ['#F4A8C7', '#C4B5FD', '#93C5FD'],
  beliefAgent: ['#312E81', '#4ADE80'],
  whiteHelmet: ['#D97706', '#A8A29E'],
  readingBreak: ['#F97316', '#F59E0B'],
}
```

### Fraunces Display Type (Intro)

```tsx
// Source: UI-SPEC.md Typography section — display token
<h1 className="wordmark" style={{ fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: 1.0 }}>
  Luke Cassiano
</h1>
```

### Fraunces Wordmark Type (Project names + Stats)

```tsx
// Source: UI-SPEC.md Typography section — wordmark token
<h2 className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
  Sandbar
</h2>
<p className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
  87%
</p>
```

### IBM Plex Mono Tokens

```tsx
// body token (16px, weight 500) — taglines
<p className="font-mono font-medium text-base leading-relaxed">
  Agentic surf forecasting.
</p>

// label token (12px, weight 500, tracked) — stat labels
<p className="font-mono font-medium text-xs uppercase tracking-[0.08em]">
  FORECAST ACCURACY
</p>

// scroll hint
<span className="font-mono font-medium text-xs tracking-[0.1em] uppercase">
  scroll ↓
</span>
```

---

## Key Questions — Answered

### 1. How to structure page.tsx

**Answer:** One `app/page.tsx` (Server Component) imports and renders all five named scene components. Scenes live in `components/scenes/`. page.tsx stays thin — no logic, no state. (See Pattern 1 above.)

### 2. Where does SceneFadeIn wrapper live

**Answer:** `components/ui/SceneFadeIn.tsx` — a shared `'use client'` wrapper used by all five scenes. This is the single place where `whileInView` / `useReducedMotion` is configured, preventing five copies of the same animation logic.

### 3. How to handle Belief Agent dark scene

**Answer:** `bg-[#0D0D12] text-cream` scoped to that `<section>`. No theme changes. No CSS variable overrides. The `<body>` stays `bg-cream text-ink`. Only the one section overrides it. (See Pattern 4 above.)

### 4. How to wire scroll hint fade-out

**Answer:** `useScroll()` (no args = window scroll) returns `scrollY: MotionValue<number>`. Pass to `useTransform(scrollY, [0, 80], [1, 0])` for raw `opacity` MotionValue. Set as `style={{ opacity }}` on the hint `motion.div`. No `useSpring`. (See Pattern 5 above.)

### 5. Framer Motion import pattern for App Router

**Answer:** All imports from `'framer-motion'` (not from `'framer-motion/dist/*'`). Confirmed exports: `motion`, `useInView`, `useScroll`, `useTransform`, `useReducedMotion`, `whileInView` (prop, not import). Files using these must have `'use client'` directive.

### 6. Footer placement

**Answer:** Footer is imported in `app/page.tsx` after `<ReadingTheBreakScene />`. It is NOT in `app/layout.tsx`. It is not inside any scene. Footer is a global landing-page-level element, not a layout-level shell.

### 7. External link ("Read on Substack →")

**Answer:** `href="https://lukecassiano.substack.com"`, `target="_blank"`, `rel="noopener noreferrer"`, with `<span className="sr-only"> (opens in new tab)</span>` as the last child. This is encapsulated in `SceneLink` with `external={true}`.

### 8. Belief Agent blob hex values

**Answer:** Confirmed in `app/globals.css` (inspected 2026-06-03): `#312E81` (deep indigo) → `#4ADE80` (phosphor green). Colors prop: `['#312E81', '#4ADE80']`.

### 9. Accessibility (landmark roles, heading hierarchy)

**Answer:** Each `<section>` has `aria-label` matching the project name. Heading hierarchy is `<h1>` for "Luke Cassiano" in IntroScene only; `<h2>` for all project wordmarks. GradientBlob has `aria-hidden="true"` (already built in). ScrollHint has `aria-hidden="true"`. External links include sr-only "(opens in new tab)" text. (See Pattern 9 above.)

### 10. Wave structure — parallel vs sequential

**Answer:** Scenes are visually independent but share the `SceneFadeIn` and `GradientBlob` components. Build order:

| Wave | Tasks | Dependency |
|------|-------|------------|
| Wave A | `SceneFadeIn`, `ScrollHint`, `SceneLink` (shared components) | None — pure new files |
| Wave B | `IntroScene`, `SandbarScene` | Requires Wave A |
| Wave C | `BeliefAgentScene`, `WhiteHelmetScene`, `ReadingTheBreakScene` | Requires Wave A (can parallel with Wave B) |
| Wave D | `app/page.tsx` assembly | Requires Waves B + C |

Wave B and Wave C can be built in parallel after Wave A. page.tsx assembly is the final integration step.

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `100vh` scene height | `min-h-[100svh]` — mobile small viewport height | Prevents scenes from being obscured by mobile browser chrome |
| `@studio-freight/lenis` | `lenis` (renamed package) — already installed @1.3.23 | Correct package already installed |
| `useSpring(scrollY)` for smooth scroll | Raw `MotionValue` from `useScroll` | No double-easing; Lenis already provides the easing |
| `useViewportScroll` (old framer-motion) | `useScroll` — renamed in framer-motion v6+ | `useViewportScroll` is a legacy alias; `useScroll` is confirmed present in v12.40.0 |
| Page-level `'use client'` | Scene-level `'use client'` on leaf components only | Keeps RSC tree intact; page.tsx and scene components without animation can stay Server Components |

**Deprecated/outdated in this stack:**
- `useViewportScroll`: Legacy alias — use `useScroll` instead (confirmed available)
- `@studio-freight/lenis`: Deprecated package name — correct package `lenis@1.3.23` already installed
- `h-screen` (Tailwind): Maps to `100vh` — do not use for scene heights in this project

---

## Open Questions

1. **WhiteHelmet and BeliefAgent links in v1**
   - What we know: WhiteHelmet links to `/whitehelmet` (see LAND-05), but the stub page is built in Phase 3, not Phase 2
   - What's unclear: Should the "View case study →" CTA on WhiteHelmetScene link to `/whitehelmet` even though the page doesn't exist yet? Or should it be omitted?
   - Recommendation: Include the link to `/whitehelmet` — Next.js renders a 404 (which already has a custom 404 from Phase 1) until Phase 3 builds the stub. This is preferable to a broken UI. BeliefAgentScene has NO CTA link in v1 per UI-SPEC (noted explicitly: "No CTA link in v1 — no page to link to yet").

2. **`z-index` on SceneFadeIn content vs blob**
   - What we know: GradientBlob is `pointer-events-none absolute` and behind content visually because it's rendered first in DOM order
   - What's unclear: Whether `relative z-10` is needed on SceneFadeIn content or whether DOM order alone is sufficient for all browsers
   - Recommendation: Add `relative z-10` to SceneFadeIn wrapper as a defensive measure. `relative` also re-establishes stacking context within the scene.

3. **Font weight 400 in `lib/fonts.ts`**
   - What we know: `ibmPlexMono` is loaded with `weight: ['400', '500']` in `lib/fonts.ts`, but UI-SPEC says weight 500 only for this phase
   - What's unclear: Whether removing 400 from the font loading would break anything already built
   - Recommendation: Leave `lib/fonts.ts` as-is (with both 400 and 500 loaded). The 400 weight does not cause a bundle error; it just loads an extra woff2 subset that won't be used this phase. Changing `lib/fonts.ts` is a Phase 4 optimization.

---

## Sources

### Primary (HIGH confidence)

- `node_modules/framer-motion/dist/index.d.ts` — Confirmed: `whileInView` enum, `useScroll`, `useTransform`, `useReducedMotion`, `useInView` all present in v12.40.0
- `components/ui/GradientBlob.tsx` — Inspected directly; prop signature, animation pattern, and aria-hidden confirmed
- `app/globals.css` — Inspected directly; all blob color hex values confirmed exact
- `tailwind.config.ts` — Inspected directly; `cream`, `ink`, `font-serif`, `font-mono` aliases confirmed
- `app/layout.tsx` — Inspected directly; LenisProvider and SkipLink placement confirmed
- `components/providers/LenisProvider.tsx` — Inspected directly; manual RAF pattern, lerp 0.08 confirmed
- `lib/fonts.ts` — Inspected directly; CSS var names `--font-fraunces` and `--font-mono` confirmed
- `.planning/phases/02-landing-experience/02-UI-SPEC.md` — Design contract source of truth for all copy, colors, sizes, and interaction specs

### Secondary (MEDIUM confidence)

- `.planning/research/SUMMARY.md` — Architecture decisions (no src/, server/client boundary, font loading pattern)
- `.planning/research/PITFALLS.md` — Known pitfalls cross-referenced against codebase state

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages inspected in node_modules, versions confirmed
- Architecture: HIGH — patterns derived from existing codebase, not hypothetical
- Blob colors: HIGH — read directly from globals.css
- Framer Motion API: HIGH — verified in installed package types
- Pitfalls: HIGH — derived from inspected code + established project pitfalls document
- Copy: HIGH — locked in UI-SPEC.md

**Research date:** 2026-06-03
**Valid until:** Stable stack; valid until any of these change: framer-motion major version bump, lenis API change, or UI-SPEC revision.
