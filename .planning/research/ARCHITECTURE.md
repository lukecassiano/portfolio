# Architecture Research: Portfolio Site

**Researched:** 2026-06-02
**Confidence:** HIGH (Next.js official docs verified June 2026, Tailwind v4 official docs verified)

---

## File Structure

The recommended layout uses route groups to keep the `app/` directory as a pure routing surface, with all shared infrastructure at the top level. No `src/` wrapper — the project is small enough that it adds friction without benefit.

```
portfolio/
├── app/
│   ├── layout.tsx                  # Root layout: fonts, Lenis provider, globals
│   ├── page.tsx                    # Landing — all 5 scroll scenes
│   ├── globals.css                 # Tailwind import + @theme tokens + :root vars
│   │
│   ├── sandbar/
│   │   └── page.tsx                # Full case study (long-scroll editorial)
│   │
│   ├── belief-agent/
│   │   └── page.tsx                # Stub: hero + "coming soon"
│   │
│   ├── whitehelmet/
│   │   └── page.tsx                # Stub: hero + "coming soon"
│   │
│   └── fonts/                      # Font files colocated inside app (Next.js recommended)
│       ├── Fraunces-Italic-VF.woff2
│       └── IBMPlexMono-Regular.woff2
│
├── components/
│   ├── ui/
│   │   ├── GradientBlob.tsx        # Reusable blob (see Blob section below)
│   │   └── Footer.tsx              # Email link only
│   │
│   ├── scenes/                     # Landing page scenes (one file each)
│   │   ├── IntroScene.tsx
│   │   ├── SandbarScene.tsx
│   │   ├── BeliefAgentScene.tsx
│   │   ├── WhiteHelmetScene.tsx
│   │   └── ReadingTheBreakScene.tsx
│   │
│   ├── sandbar/                    # Case study sections
│   │   ├── ProblemSection.tsx
│   │   ├── InsightSection.tsx
│   │   ├── ProductSection.tsx
│   │   ├── UnderTheHoodSection.tsx
│   │   ├── WhatNextSection.tsx
│   │   └── PipelineDiagram.tsx     # SVG diagram component
│   │
│   └── providers/
│       └── LenisProvider.tsx       # 'use client' smooth scroll wrapper
│
├── lib/
│   └── fonts.ts                    # Single font definition file, exported for reuse
│
├── public/
│   └── og-image.png                # OG image (static, built once)
│
├── mdx-components.tsx              # STUB: required by @next/mdx if ever added; empty for now
├── next.config.ts
├── tailwind.config.ts              # Only needed for Tailwind v3; v4 uses globals.css @theme
├── tsconfig.json
└── package.json
```

**Key decisions:**

- `components/` lives at root (not inside `app/`). Next.js supports both patterns; root-level components is cleaner for a project where components are shared across multiple routes (landing, sandbar, stubs).
- `scenes/` are not colocated inside `app/page.tsx` because they are large enough to be distinct files, and keeping them outside `app/` prevents any accidental routing confusion.
- `lib/fonts.ts` is the single source of truth for font instances. Calling `localFont()` multiple times creates duplicate font instances — one file prevents this (official Next.js docs pattern).
- No `(route-groups)` needed. The site has three real routes (`/`, `/sandbar`, `/belief-agent`, `/whitehelmet`) with no layout divergence — a single root layout handles all of them.

---

## Component Hierarchy

```
RootLayout (app/layout.tsx)          [Server Component]
  └── LenisProvider                  [Client Component — wraps all children]
        ├── page.tsx (landing)       [Server Component]
        │     ├── IntroScene
        │     ├── SandbarScene
        │     │     └── GradientBlob (pink→lavender→blue)
        │     ├── BeliefAgentScene
        │     │     └── GradientBlob (indigo→phosphor green)
        │     ├── WhiteHelmetScene
        │     │     └── GradientBlob (ochre→dust)
        │     └── ReadingTheBreakScene
        │           └── GradientBlob (coral→amber)
        │
        ├── sandbar/page.tsx         [Server Component]
        │     ├── ProblemSection
        │     ├── InsightSection
        │     ├── ProductSection
        │     ├── UnderTheHoodSection (contains PipelineDiagram)
        │     ├── WhatNextSection
        │     └── GradientBlob (sandbar colors, fixed or scroll-driven)
        │
        ├── belief-agent/page.tsx    [Server Component]
        │     └── GradientBlob (indigo→phosphor green)
        │
        ├── whitehelmet/page.tsx     [Server Component]
        │     └── GradientBlob (ochre→dust)
        │
        └── Footer                   [Server Component]
```

**Server vs Client boundary:**
- All page and section components are Server Components by default (no state, no event handlers).
- `LenisProvider` is Client Component (`'use client'`) — it needs `useEffect` to initialize Lenis.
- `GradientBlob` is a Client Component only if it uses Framer Motion animation (`useAnimation`, `useMotionValue`). If it's a pure CSS animation, it can remain a Server Component. Given the "blob drift" requirement, use Framer Motion → Client Component.
- Individual scene components that use `useInView` or scroll-triggered Framer Motion animations must also be Client Components.

---

## Design System Organization

### Font Loading (`lib/fonts.ts`)

```typescript
// lib/fonts.ts
import localFont from 'next/font/local'
import { IBM_Plex_Mono } from 'next/font/google'

export const fraunces = localFont({
  src: [
    {
      path: '../app/fonts/Fraunces-Italic-VF.woff2',
      style: 'italic',
      weight: '100 900',   // variable font range
    },
  ],
  variable: '--font-fraunces',
  display: 'swap',
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

IBM Plex Mono is available on Google Fonts, so use `next/font/google` for it — no manual download needed, zero external requests at runtime. Fraunces requires a local file since the project needs the variable font with ExtraBold Italic specifically.

### Root Layout Font Wiring (`app/layout.tsx`)

```typescript
import { fraunces, ibmPlexMono } from '@/lib/fonts'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Tailwind v4 Theme Tokens (`app/globals.css`)

```css
@import 'tailwindcss';

@theme inline {
  /* Fonts — reference the CSS vars injected by next/font */
  --font-serif: var(--font-fraunces);
  --font-mono: var(--font-mono);

  /* Brand colors */
  --color-cream: #F5F3EE;
  --color-ink: #1A1A1A;

  /* Blob palettes — defined as CSS custom properties, not Tailwind tokens */
  /* Used directly in GradientBlob via inline style or Tailwind arbitrary values */
}

:root {
  /* Blob color stops — not Tailwind tokens, just CSS vars for the blob component */
  --blob-sandbar-start: #F4A8C7;   /* pink */
  --blob-sandbar-mid:   #C4B5FD;   /* lavender */
  --blob-sandbar-end:   #93C5FD;   /* blue */

  --blob-belief-start:  #312E81;   /* deep indigo */
  --blob-belief-end:    #4ADE80;   /* phosphor green */

  --blob-white-start:   #D97706;   /* ochre */
  --blob-white-end:     #A8A29E;   /* dust */

  --blob-break-start:   #F97316;   /* coral */
  --blob-break-end:     #F59E0B;   /* amber */
}
```

`@theme inline` is used (not bare `@theme`) because the font values reference CSS variables from `next/font`. The `inline` modifier ensures Tailwind resolves the variable value directly rather than creating a cascading `var()` reference, which can produce unexpected behavior in production builds.

### Color and spacing tokens

Keep Tailwind's default palette. The design intentionally uses almost no named colors — cream background + blob gradients + ink text is the entire palette. Use `bg-[#F5F3EE]` or the `--color-cream` token rather than creating an extended color palette that will bloat the CSS.

---

## Lenis Integration Pattern

Lenis v2+ ships a `lenis/react` export that provides a `ReactLenis` component. The correct pattern for App Router is:

**`components/providers/LenisProvider.tsx`**

```typescript
'use client'

import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,          // smoothing factor — lower = slower/smoother
        duration: 1.2,       // scroll duration in seconds
        smoothWheel: true,
        syncTouch: false,    // disable on mobile touch (native feels better)
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

**`app/layout.tsx`** — wrap children at root layout level:

```typescript
import { LenisProvider } from '@/components/providers/LenisProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexMono.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

**Why this placement is correct:**
- `LenisProvider` must be a Client Component because Lenis uses `useEffect` internally to attach to the window.
- Root layout is a Server Component — it can render Client Components as children. This is the correct App Router boundary pattern.
- `root` prop on `ReactLenis` tells it to attach to the document scroll instead of a scrollable div — correct for a full-page vertical scroll site.
- Placing it at layout level means it persists across client-side navigations without re-initializing.

**Framer Motion scroll integration:** Framer Motion's `useScroll` hook works with Lenis because Lenis dispatches synthetic scroll events on `window`. No additional bridging needed in v2+.

**Soft snap feel without hard snap:** Do not use CSS `scroll-snap`. Instead, use Framer Motion's `useInView` with `whileInView` on each scene to create entrance animations. The "soft guidance" feel comes from Lenis's lerp easing, not from snap constraints.

---

## SVG Diagram Pattern

The Sandbar pipeline diagram should be an **inline SVG React component**, not a file import or `<img>` tag.

**`components/sandbar/PipelineDiagram.tsx`**

```typescript
// Server Component — no 'use client' needed for static SVG
export function PipelineDiagram() {
  return (
    <svg
      viewBox="0 0 900 400"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sandbar data pipeline: buoy data → processing → forecast model → UI"
      className="w-full max-w-3xl mx-auto"
    >
      {/* nodes, arrows, labels as SVG elements */}
    </svg>
  )
}
```

**Why inline SVG component, not a file:**

| Option | Verdict | Reason |
|--------|---------|--------|
| Inline SVG component | **USE THIS** | Styled with Tailwind/CSS vars, animated with Framer Motion, no separate network request, accessible via `aria-label`, text nodes are selectable/copyable |
| `public/diagram.svg` + `<img>` | Avoid | Can't style with CSS vars, can't animate, raster-level accessibility |
| `import DiagramSVG from './diagram.svg'` | Avoid | Requires svgr webpack plugin config, extra build complexity, still hard to animate |
| `next/image` with SVG | Avoid | Loses all SVG interactivity and CSS styling capability |

**Tailwind integration:** SVG elements accept `className` in React. Use Tailwind for `stroke`, `fill`, `text-[var(--font-mono)]` on text labels. The monochrome SVG (ink on cream) with selective use of the Sandbar blob colors for highlighted nodes will look correct without complex CSS.

**Animation:** If nodes need to appear sequentially (e.g., each pipeline stage fades in), wrap individual `<g>` groups in `<motion.g>` from Framer Motion. Keep this minimal — one stagger animation on scroll entry is sufficient.

---

## Build Order

Dependencies define the order. Build bottom-up.

```
1. Foundation
   ├── app/fonts/ — download and place font files
   ├── lib/fonts.ts — font definitions
   ├── app/globals.css — Tailwind @theme tokens + blob CSS vars
   └── app/layout.tsx — root layout with fonts + LenisProvider

   No dependencies on anything else. Must exist before any component.

2. Shared UI primitives
   ├── components/ui/GradientBlob.tsx — used by every scene and stub
   └── components/ui/Footer.tsx — used by root layout or every page

   Depends on: design tokens from globals.css.

3. Landing page scenes
   ├── components/scenes/IntroScene.tsx
   ├── components/scenes/SandbarScene.tsx
   ├── components/scenes/BeliefAgentScene.tsx
   ├── components/scenes/WhiteHelmetScene.tsx
   └── components/scenes/ReadingTheBreakScene.tsx

   Depends on: GradientBlob.

4. Landing page assembly
   └── app/page.tsx — composes all 5 scenes

   Depends on: all scenes.

5. Sandbar case study
   ├── components/sandbar/PipelineDiagram.tsx — build SVG first (content-driven)
   ├── components/sandbar/ProblemSection.tsx
   ├── components/sandbar/InsightSection.tsx
   ├── components/sandbar/ProductSection.tsx
   ├── components/sandbar/UnderTheHoodSection.tsx
   ├── components/sandbar/WhatNextSection.tsx
   └── app/sandbar/page.tsx

   Depends on: GradientBlob, fonts, PipelineDiagram.

6. Stub pages
   ├── app/belief-agent/page.tsx
   └── app/whitehelmet/page.tsx

   Depends on: GradientBlob only. Build last — least content.

7. Polish pass
   ├── Framer Motion entrance animations on scenes
   ├── Lenis lerp tuning
   └── OG image (public/og-image.png)
```

**Parallel work possible:** Steps 3 and 5 can overlap if working across files simultaneously. Step 2 (GradientBlob) is the single most-depended-on component — get it right before moving to scenes.

---

## Future-Proofing: MDX Door

The correct way to leave the MDX door open without building anything is a two-item preparation that costs ~10 minutes and zero runtime overhead:

**1. Create a stub `mdx-components.tsx` at root (required by `@next/mdx`)**

```typescript
// mdx-components.tsx — place at project root, next to package.json
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
```

This file is the App Router's MDX hook point. `@next/mdx` will not work without it, per official docs. Having it present now means adding MDX later requires only `npm install @next/mdx` and a `next.config.ts` change — no file structure changes.

**2. Reserve the `app/blog/` path**

Create `app/blog/` as an empty directory with a `.gitkeep`. This reserves the URL namespace and signals architectural intent. When ready:
- Add `app/blog/page.tsx` (index)
- Add `app/blog/[slug]/page.tsx` (individual posts)
- Add `content/` directory at root for `.mdx` files

**What NOT to do now:**
- Do not install `@next/mdx`, `@mdx-js/loader`, or `@mdx-js/react` — not needed until there is content to render
- Do not add `pageExtensions` to `next.config.ts` — adds build overhead with no benefit
- Do not add `remark-gfm` or any remark/rehype plugins — configure when needed

**The pattern that will work when ready:**

```typescript
// app/blog/[slug]/page.tsx (future)
export default async function Page({ params }) {
  const { slug } = await params
  const { default: Post } = await import(`@/content/${slug}.mdx`)
  return <Post />
}

export function generateStaticParams() {
  // read content/ directory and return slugs
  return [{ slug: 'first-post' }]
}

export const dynamicParams = false
```

This pattern — dynamic import from `content/` with `generateStaticParams` — is the official Next.js recommendation for MDX blogs (confirmed in current docs). It produces fully static pages at build time with no server runtime.

**Reading the Break scene:** Currently renders 3 placeholder post titles and an external Substack link. When MDX is added, these titles can be replaced with real post metadata read from `content/` at build time. No component changes needed — only the data source changes.

---

## Sources

- Next.js App Router project structure: https://nextjs.org/docs/app/getting-started/project-structure (verified 2026-06-01, version 16.2.7)
- Next.js font optimization + variable option: https://nextjs.org/docs/app/api-reference/components/font (verified 2026-06-01)
- Next.js MDX guide: https://nextjs.org/docs/app/guides/mdx (verified 2026-06-01)
- Tailwind v4 @theme configuration: https://tailwindcss.com/docs/configuration (verified 2026-06-02)
- Lenis integration: training data (Lenis v2 ReactLenis pattern) — MEDIUM confidence, verify `lenis/react` export exists in installed version
