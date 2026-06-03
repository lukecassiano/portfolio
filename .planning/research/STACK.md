# Stack Research: Portfolio Site

**Project:** Luke Cassiano Portfolio
**Researched:** 2026-06-02
**Confidence:** MEDIUM — network tools unavailable; findings from training knowledge (cutoff Aug 2025). Version numbers should be verified via `npm view <pkg> version` before install.

---

## Recommended Stack

| Package | Version | Notes |
|---------|---------|-------|
| next | ^14.2.x | App Router stable; 15 exists but 14 is the locked constraint per PROJECT.md |
| react | ^18.3.x | Peer dep of Next 14; React 19 RC exists but wait for Next 14 stability |
| react-dom | ^18.3.x | Match React version exactly |
| typescript | ^5.4.x | Latest 5.x; strict mode enabled |
| tailwindcss | ^3.4.x | v3 is stable production default; v4 is alpha/beta as of Aug 2025 — avoid |
| @tailwindcss/typography | ^0.5.x | Only if MDX prose styles are needed later; skip for v1 |
| framer-motion | ^11.x | v11 is the stable App Router-compatible release; v12 may exist — verify |
| lenis | ^1.1.x | @studio-freight/lenis was renamed to plain `lenis`; 1.1.x is stable |
| @studio-freight/lenis | — | DEPRECATED — do not use, package was migrated to `lenis` |
| clsx | ^2.1.x | Conditional className utility; pairs with Tailwind |
| tailwind-merge | ^2.x | Merge Tailwind classes without conflicts; use with clsx via `cn()` helper |
| autoprefixer | ^10.4.x | PostCSS peer dep for Tailwind |
| postcss | ^8.4.x | Tailwind build toolchain |

**Dev dependencies:**
| Package | Version | Notes |
|---------|---------|-------|
| @types/node | ^20.x | Node typings for next.config |
| @types/react | ^18.x | React typings |
| @types/react-dom | ^18.x | React DOM typings |
| eslint | ^8.x | Next 14 ships its own ESLint config |
| eslint-config-next | ^14.x | Match Next version |

---

## Key Configuration Details

### Lenis + Next.js App Router

**The core problem:** Lenis must run in the browser and access `window`. In App Router, all components default to Server Components. Lenis must live in a Client Component.

**Correct pattern — dedicated SmoothScroll wrapper:**

```tsx
// components/SmoothScroll.tsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

```tsx
// app/layout.tsx
import SmoothScroll from '@/components/SmoothScroll'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
```

**Key points:**
- `'use client'` is mandatory on the wrapper; layout.tsx itself stays a Server Component
- The RAF loop is the standard Lenis tick pattern; do NOT use Lenis's deprecated `autoRaf` option from older versions
- `lenis.destroy()` in the `useEffect` cleanup prevents double-mount issues in React 18 Strict Mode
- If Framer Motion's `useScroll` is used alongside Lenis, scroll position may diverge from native scroll events. Lenis emits its own scroll events — listen via `lenis.on('scroll', handler)` rather than native `window.scroll` for synchronized animation values

**Lenis + Framer Motion scroll sync (if needed):**

```tsx
// Inside the SmoothScroll useEffect, after creating lenis:
lenis.on('scroll', () => {
  // Framer Motion's useScroll reads from the DOM scroll position,
  // which Lenis keeps in sync — no extra wiring needed for basic useScroll usage.
  // Only needed if you see jank between Lenis scroll and Framer scroll progress.
})
```

For this project's use case (blob drift + fade-ins tied to scroll position), `useScroll` from Framer Motion works correctly with Lenis because Lenis still updates the real DOM scroll position — it only intercepts the easing, not the scroll value reported by the browser.

**Soft scroll-snap feel (no mandatory snap):**

Do NOT use CSS `scroll-snap-type: mandatory`. Instead, use Lenis's `lerp` parameter to slow the approach, giving an implicit settling effect:

```tsx
const lenis = new Lenis({
  lerp: 0.08,        // lower = slower settling, stronger "snap feel" without hard snap
  smoothWheel: true,
})
```

Values between 0.06–0.10 give the taniasoraya editorial rhythm feel without locking the user to snap points.

---

### Framer Motion + App Router

**The core problem:** Framer Motion components use browser APIs and React context. They cannot be Server Components.

**Rules:**
1. Any file using `motion.*`, `useScroll`, `useTransform`, `useMotionValue`, `AnimatePresence`, or `useInView` must have `'use client'` at the top.
2. Server Components can import Client Components — the reverse is not true. Structure scene components as Client Components that receive data as props from Server Component parents.
3. `AnimatePresence` must wrap at the page/layout level if used for route transitions — but for this project (no route transitions needed beyond Next.js defaults), skip route-level AnimatePresence.

**Current stable APIs (Framer Motion v11):**

```tsx
'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

// Scroll-linked blob drift
function BlobScene() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative h-screen">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 blob-gradient"
      />
    </section>
  )
}

// Fade-in on entry
function FadeInContent({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
```

**What NOT to use from Framer Motion for this project:**
- `LayoutGroup` / `layout` prop — not needed, no shared-layout transitions
- `drag` — not needed
- `AnimatePresence` at route level — Next.js App Router handles route transitions natively; AnimatePresence for route changes requires additional page wrapper complexity not worth it for this project
- `useSpring` for scroll values — Lenis already handles easing; double-easing creates sluggish feel
- `LazyMotion` / `domAnimation` — worth considering only if bundle size becomes a concern; for a portfolio the full Framer bundle (~50KB gzipped) is acceptable

---

### Font Loading

**Use `next/font/google` — do not use `<link>` tags or `@import` in CSS.**

`next/font/google` downloads fonts at build time, self-hosts them on Vercel's CDN, and generates zero-CLS font-display behavior automatically.

**Fraunces** is a variable font. Use the `axes` parameter to expose the weight axis:

```tsx
// app/layout.tsx
import { Fraunces, IBM_Plex_Mono } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],  // include optical size and quirk axes
  weight: 'variable',               // Fraunces is fully variable
  style: ['normal', 'italic'],      // need italic for ExtraBold Italic
  variable: '--font-fraunces',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],    // IBM Plex Mono is NOT variable — specify weights
  style: ['normal'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
```

**Tailwind config wiring:**

```js
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      mono: ['var(--font-ibm-plex-mono)', 'ui-monospace', 'monospace'],
    },
  },
}
```

**Using Fraunces ExtraBold Italic in Tailwind:**

```tsx
<h1 className="font-serif font-extrabold italic">Luke Cassiano</h1>
```

This resolves to weight 800 italic of Fraunces via the variable font axis.

**Important:** Fraunces `axes` — the SOFT and WONK axes control the roundness and quirk of letterforms. For maximum ball-terminal character (matching the Sandbar wordmark DNA), set SOFT=0 and WONK=1 in CSS when using the font:

```css
.wordmark {
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 800;
  font-style: italic;
}
```

This is not expressible through Tailwind alone — use a CSS class or inline style for the variation settings.

---

### Tailwind Config

**Use Tailwind v3.4.x — do NOT use v4.**

Tailwind v4 (in alpha/beta as of mid-2025) breaks the `tailwind.config.ts` file-based configuration model in favor of CSS-first config. It also has incomplete ecosystem support (many plugins not yet migrated). For a production portfolio deploying to Vercel now, v3 is the correct choice.

**Configuration file:**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-ibm-plex-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        cream: '#F5F3EE',
        // Add project-specific palette here
      },
      // Blob gradients are complex — define in CSS classes, not Tailwind utilities
    },
  },
  plugins: [],
}

export default config
```

**PostCSS config (required for Tailwind v3):**

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Utility pattern for className merging:**

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

This is the standard shadcn/ui pattern and is correct for any Tailwind project.

---

### MDX — Future-Proofing Without Installing Now

PROJECT.md explicitly excludes MDX for v1. However, to make it easy to add later:

**Do NOT do now:**
- Install `@next/mdx`, `contentlayer`, `next-mdx-remote`
- Create `mdx-components.tsx`
- Add MDX to `next.config.js`

**Do this now to avoid retrofit pain:**
- Keep `app/` routes clean — when MDX is added, it will live at `app/blog/[slug]/page.tsx` or similar. Don't pollute that namespace with other things.
- Keep the `@tailwindcss/typography` plugin installation ready but not yet installed — the `prose` class will be needed for MDX content.
- The `content: []` array in `tailwind.config.ts` should already include `'./app/**/*.{js,ts,jsx,tsx,mdx}'` — include `mdx` in the glob even now, it's a no-op until MDX files exist.

**When ready to add MDX later, the path is:**

Next.js App Router with `@next/mdx` (official, zero external deps) is simpler than `contentlayer` (unmaintained as of 2024) or `next-mdx-remote` (useful for remote sources, overkill for local files). Use `@next/mdx` when the time comes.

---

## What NOT to Use

| Package / Pattern | Why to Avoid |
|-------------------|--------------|
| `@studio-freight/lenis` | Deprecated namespace — migrated to plain `lenis`. Installing the old name gets an outdated version. |
| `contentlayer` | Unmaintained since late 2024; community forks exist but not stable. Use `@next/mdx` instead when needed. |
| Tailwind CSS v4 | CSS-first config model is a breaking change; ecosystem (plugins, tooling) not ready. Stick to v3.4.x. |
| `useSpring` wrapping `useScroll` | Lenis already applies easing. Double-easing makes scroll animations feel laggy and disconnected from actual scroll position. |
| CSS `scroll-snap-type: mandatory` | Prevents the editorial pause-mid-scene behavior explicitly desired. Use Lenis `lerp` for soft guidance instead. |
| `AnimatePresence` for route transitions | App Router doesn't expose a clean exit-animation hook. Page transitions require complex workarounds (custom layout, shared layout animation) that are out of scope and would conflict with Lenis. |
| `next/image` with external URLs without domain config | Will throw in production. Sandbar screenshots should be local `/public` assets or have domains added to `next.config.js`. |
| Framer Motion `LazyMotion` in early dev | Premature optimization. Add only if Lighthouse shows bundle size as an issue after the site is built. |
| React 19 / Next.js 15 | Project is locked to Next 14 per PROJECT.md. React 19 is the peer dep for Next 15. Don't upgrade the React version independently — it will break. |

---

## Installation Commands

```bash
# Initialize
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# After scaffolding, add animation and scroll:
npm install framer-motion lenis

# Utility helpers:
npm install clsx tailwind-merge
```

Note: `create-next-app@14` will scaffold with Tailwind v3 and the correct PostCSS setup. Do not run `npm install tailwindcss` separately unless upgrading — it will pull v4.

---

## Confidence Notes

| Area | Confidence | Basis | Verification Needed |
|------|------------|-------|---------------------|
| Next.js 14 App Router patterns | HIGH | Stable, well-documented before cutoff | None — patterns are stable |
| Lenis 1.x API (`new Lenis()`, RAF loop, `destroy()`) | HIGH | Confirmed in training data through mid-2025 | Run `npm view lenis version` to confirm 1.1.x is still latest |
| `@studio-freight/lenis` deprecation | HIGH | Explicit migration happened; plain `lenis` is the current package | None |
| Framer Motion v11 APIs (`useScroll`, `useTransform`, `useInView`) | HIGH | Stable API surface through Aug 2025 | Run `npm view framer-motion version` — if v12 exists, check changelog for breaking changes |
| Tailwind v3 vs v4 recommendation | MEDIUM | v4 was alpha/beta as of Aug 2025 | Run `npm view tailwindcss dist-tags` — if v4 is now `latest`, re-evaluate |
| `next/font/google` Fraunces `axes` parameter | MEDIUM | API correct; specific axis names (SOFT, WONK) based on Fraunces spec known at cutoff | Verify axis names at fonts.google.com/specimen/Fraunces |
| IBM Plex Mono not being variable | HIGH | IBM Plex Mono is a static font family, not a variable font — weights must be enumerated | None |
| contentlayer unmaintained status | MEDIUM | Known community concern as of mid-2025; may have resolved | Check GitHub status before using |
| Lenis + Framer Motion `useScroll` compatibility | MEDIUM | Lenis updates DOM scroll position so Framer reads it correctly; no wiring needed | Test in dev — if jank appears, add `lenis.on('scroll', ScrollTrigger.update)` pattern |

**Bottom line:** The version numbers in the table above use the `^x.x` semver range intentionally — run `npm view <package> version` on each before your first install to pin exact versions. The integration patterns are stable and should not have changed materially since the training cutoff.
