# Research Summary: Luke Cassiano Portfolio

**Researched:** 2026-06-02
**Confidence:** MEDIUM-HIGH (architecture confirmed against live Next.js docs; stack versions unverified since training cutoff Aug 2025)

---

## Recommended Stack

| Package | Version | Role |
|---------|---------|------|
| next | ^14.2.x | Framework |
| react | ^18.3.x | Do NOT upgrade to 19 |
| react-dom | ^18.3.x | Match React exactly |
| typescript | ^5.4.x | Strict mode |
| tailwindcss | ^3.4.x | v3 only — v4 breaks config model |
| framer-motion | ^11.x | Animations, useInView, useScroll |
| lenis | ^1.1.x | Smooth scroll (NOT @studio-freight/lenis) |
| clsx | ^2.1.x | Conditional className composition |
| tailwind-merge | ^2.x | Prevents Tailwind class conflicts |

**Do NOT install:** `@studio-freight/lenis` (deprecated), Tailwind v4, `contentlayer` (unmaintained).

---

## Table Stakes

Ordered by risk of being missed:

1. `h-[100svh]` not `100vh` for scenes — mobile browser chrome eats viewport
2. `prefers-reduced-motion` gating on Lenis + all Framer Motion variants
3. OG image (1200×630 PNG) — every share link shows blank without it
4. `<title>`, `<meta description>`, canonical, OG + Twitter card meta tags
5. Keyboard navigability + skip-to-content link
6. WCAG AA color contrast (IBM Plex Mono at small sizes on cream is most likely failure)
7. Working `mailto:` link in footer (copyable text, not just a button)
8. Custom 404 page
9. Print stylesheet — hide blobs, black text, show URLs
10. All images have alt text; SVG pipeline has `<title>` + `aria-labelledby`
11. `robots.txt` + `sitemap.xml`
12. `lang="en"` on `<html>`
13. Favicon (SVG + PNG fallback)

---

## Architecture Decisions

- **No `src/` wrapper.** Root-level `components/`. App is a pure routing surface.
- **Routes:** `/`, `/sandbar`, `/belief-agent`, `/whitehelmet`
- **Server/Client boundary:** Root layout is Server. `LenisProvider` is outermost Client Component. Push `'use client'` down to smallest animated leaf — only `GradientBlob` and motion wrappers need it.
- **Font loading:** `lib/fonts.ts` as single source. Fraunces via `next/font/local` (variable woff2). IBM Plex Mono via `next/font/google`.
- **Blob CSS vars:** On `:root` in `globals.css`, not Tailwind tokens. Animate `transform`/`opacity` only; `filter: blur()` as static CSS.
- **SVG pipeline:** Inline React component — enables Tailwind styling + Framer animation + aria labeling. No `<img>` or SVGR import.
- **MDX door:** Stub `mdx-components.tsx` at root + `app/blog/.gitkeep`. Zero runtime cost.

---

## Watch Out For

1. **`100vh` on mobile** — Use `h-[100svh]` everywhere. Fix in foundation; cascades everywhere.
2. **Wrong Lenis package/API** — Use `lenis`. Verify `lenis/react` export after install before writing provider.
3. **`'use client'` boundary too high** — Only `GradientBlob` and motion wrappers need it. Pages stay Server Components.
4. **Double-easing** — Lenis already eases. Never add `useSpring` to `useScroll` values.
5. **Blob animation triggering layout** — Animate `transform` + `opacity` only. Blur is static CSS. Add `will-change: transform`.
6. **Hero type collapsing on mobile** — Use `clamp(48px, 10vw, 120px)`. Test at 375px before finalizing type.
7. **Case study prose line length** — Constrain all prose to `max-w-2xl` (~65ch). Most missed typographic detail.

---

## Build Order

1. **Foundation** — Fonts, globals.css, layout.tsx, LenisProvider
2. **Shared UI** — GradientBlob, Footer (everything depends on these)
3. **Landing page** — 5 scene components assembled in page.tsx
4. **Sandbar case study** — PipelineDiagram SVG first, then 5 section components
5. **Stub pages** — belief-agent, whitehelmet
6. **Polish + ship** — Animations, reduced-motion pass, OG image, meta tags, sitemap, print, a11y

Phases 3 and 4 can overlap once GradientBlob is solid.

---

## Open Questions (verify at install time)

1. **Which Lenis API?** Run `node -e "const l = require('lenis/react'); console.log(Object.keys(l))"` — if `ReactLenis` exported, use `lenis/react` pattern. If not, use manual RAF useEffect.
2. **Framer Motion version?** `npm view framer-motion version` — check for breaking changes if v12 exists.
3. **Tailwind v4 as latest?** `npm view tailwindcss dist-tags` — if create-next-app scaffolds v4, config approach changes.
4. **Fraunces axis names** — Confirm `SOFT` and `WONK` at fonts.google.com/specimen/Fraunces before using `font-variation-settings`.
