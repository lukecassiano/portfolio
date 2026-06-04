# Requirements: Luke Cassiano Portfolio

**Defined:** 2026-06-02
**Core Value:** Each project scene makes the visitor feel the rigor/improvisation tension in the first 3 seconds without reading a word.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Next.js 14 App Router project scaffolded with TypeScript, Tailwind v3, ESLint
- [x] **FOUND-02**: Fraunces ExtraBold Italic loaded via next/font/local (variable woff2) with font-variation-settings for SOFT/WONK axes
- [x] **FOUND-03**: IBM Plex Mono loaded via next/font/google with weights 400/500
- [ ] **FOUND-04**: LenisProvider client component wraps layout with lerp ~0.08, RAF loop, reduced-motion gate, and cleanup
- [x] **FOUND-05**: Design token CSS vars on :root (blob color stops, font families, cream base #F5F3EE)
- [x] **FOUND-06**: Tailwind config extended with font-serif (Fraunces) and font-mono (IBM Plex Mono) aliases
- [x] **FOUND-07**: mdx-components.tsx stub at root + app/blog/.gitkeep for future MDX support

### Shared Components

- [ ] **COMP-01**: GradientBlob component accepts colors (array of stops), size, position props; animates transform/opacity only; blur is static CSS; will-change: transform applied
- [ ] **COMP-02**: Footer component with email link (mailto:) as visible copyable text
- [ ] **COMP-03**: Custom 404 page consistent with design system
- [ ] **COMP-04**: Skip-to-content link (visually hidden, focusable)

### Landing Page

- [x] **LAND-01**: 5 full-viewport scenes using h-[100svh], vertically stacked, soft Lenis guidance
- [x] **LAND-02**: Intro scene — name "Luke Cassiano" in Fraunces ExtraBold Italic, one positioning line, nothing else
- [x] **LAND-03**: Sandbar scene — wordmark in Fraunces Italic, tagline, one hero stat, link to /sandbar; pink→lavender→blue blob
- [x] **LAND-04**: Belief Agent scene — near-black (#0D0D12) background, wordmark + tagline + entropy stat; deep indigo→phosphor green blob
- [x] **LAND-05**: WhiteHelmet scene — cream background, wordmark + tagline, link to /whitehelmet; ochre→dust blob
- [x] **LAND-06**: Reading the Break scene — warm sunset blob, 3 placeholder post titles, external Substack link
- [x] **LAND-07**: Framer Motion fade-in on scene content (one reveal per scene, triggered by scroll entry); gated behind prefers-reduced-motion

### Sandbar Case Study

- [ ] **SAND-01**: Case study page at /sandbar with sections: Problem, Insight, Product, Under the Hood, What's Next
- [ ] **SAND-02**: Prose content constrained to max-w-2xl (~65ch) on all breakpoints
- [x] **SAND-03**: Pipeline diagram as inline SVG React component (not image) with aria-label, <title>, visible at all viewport widths
- [ ] **SAND-04**: Section headings in Fraunces; metadata/captions in IBM Plex Mono
- [ ] **SAND-05**: Hero stat(s) as large Fraunces numerals matching Sandbar visual language
- [ ] **SAND-06**: Back navigation to landing page

### Stub Pages

- [x] **STUB-01**: /belief-agent — hero scene with wordmark, blob, honest "case study in progress" framing (not just "coming soon")
- [x] **STUB-02**: /whitehelmet — same pattern as STUB-01

### Meta / SEO / Accessibility

- [ ] **META-01**: Root layout metadata: title, description, canonical, og:title, og:description, og:image, twitter:card
- [ ] **META-02**: OG image (1200×630 PNG) in public/ referenced in metadata
- [ ] **META-03**: lang="en" on <html>
- [ ] **META-04**: Favicon (SVG + PNG fallback) in public/
- [ ] **META-05**: robots.txt and sitemap.xml covering all 3 routes
- [ ] **META-06**: All images have descriptive alt text; blobs have alt=""; SVG pipeline has <title> + aria-labelledby
- [ ] **META-07**: WCAG AA color contrast verified for all text (IBM Plex Mono on cream especially)
- [ ] **META-08**: Print stylesheet: blobs hidden, black text, URLs visible

### Deploy

- [ ] **DEPLOY-01**: Site builds without errors (next build passes)
- [ ] **DEPLOY-02**: Deployed to Vercel with production URL

## v2 Requirements

### Interactions

- **INT-01**: Dot-nav scroll indicator (fixed, 5 dots) for scene orientation
- **INT-02**: Interactive Sandbar pipeline SVG with hover states and staggered animation
- **INT-03**: Page transition animation (deferred — complex with App Router)

### Content

- **CONT-01**: Belief Agent full case study content and page
- **CONT-02**: WhiteHelmet full case study content and page
- **CONT-03**: Blog/MDX infrastructure (Reading the Break internalized)
- **CONT-04**: Real Reading the Break post titles (pull from Substack)

### Features

- **FEAT-01**: Dark mode toggle
- **FEAT-02**: Interactive blob (responds to cursor position)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Blog / MDX infrastructure | Substack handles it; MDX door left open via stub, not built |
| CMS | Static content only; no content update workflow needed |
| Contact form | Email link is sufficient; form adds complexity and spam |
| Custom cursor | robin-noguier interaction model adopted without its heavy choreography |
| Ambient/looping blob animation | Motion must be minimal; looping drains battery and distracts |
| Skills bar charts | Active credibility red flag; pipeline SVG communicates depth better |
| Belief Agent / WhiteHelmet full case study | Content TBD; stubs only |
| React 19 | Not compatible with Next.js 14 peer deps |
| Tailwind v4 | Alpha/beta; breaks config model; not ready |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 — Foundation & Design System | Complete |
| FOUND-02 | Phase 1 — Foundation & Design System | Complete |
| FOUND-03 | Phase 1 — Foundation & Design System | Complete |
| FOUND-04 | Phase 1 — Foundation & Design System | Pending |
| FOUND-05 | Phase 1 — Foundation & Design System | Complete |
| FOUND-06 | Phase 1 — Foundation & Design System | Complete |
| FOUND-07 | Phase 1 — Foundation & Design System | Complete |
| COMP-01 | Phase 1 — Foundation & Design System | Pending |
| COMP-02 | Phase 1 — Foundation & Design System | Pending |
| COMP-03 | Phase 1 — Foundation & Design System | Pending |
| COMP-04 | Phase 1 — Foundation & Design System | Pending |
| LAND-01 | Phase 2 — Landing Experience | Complete |
| LAND-02 | Phase 2 — Landing Experience | Complete |
| LAND-03 | Phase 2 — Landing Experience | Complete |
| LAND-04 | Phase 2 — Landing Experience | Complete |
| LAND-05 | Phase 2 — Landing Experience | Complete |
| LAND-06 | Phase 2 — Landing Experience | Complete |
| LAND-07 | Phase 2 — Landing Experience | Complete |
| SAND-01 | Phase 3 — Sandbar Case Study & Stubs | Pending |
| SAND-02 | Phase 3 — Sandbar Case Study & Stubs | Pending |
| SAND-03 | Phase 3 — Sandbar Case Study & Stubs | Complete |
| SAND-04 | Phase 3 — Sandbar Case Study & Stubs | Pending |
| SAND-05 | Phase 3 — Sandbar Case Study & Stubs | Pending |
| SAND-06 | Phase 3 — Sandbar Case Study & Stubs | Pending |
| STUB-01 | Phase 3 — Sandbar Case Study & Stubs | Complete |
| STUB-02 | Phase 3 — Sandbar Case Study & Stubs | Complete |
| META-01 | Phase 4 — Polish, Meta & Deploy | Pending |
| META-02 | Phase 4 — Polish, Meta & Deploy | Pending |
| META-03 | Phase 4 — Polish, Meta & Deploy | Pending |
| META-04 | Phase 4 — Polish, Meta & Deploy | Pending |
| META-05 | Phase 4 — Polish, Meta & Deploy | Pending |
| META-06 | Phase 4 — Polish, Meta & Deploy | Pending |
| META-07 | Phase 4 — Polish, Meta & Deploy | Pending |
| META-08 | Phase 4 — Polish, Meta & Deploy | Pending |
| DEPLOY-01 | Phase 4 — Polish, Meta & Deploy | Pending |
| DEPLOY-02 | Phase 4 — Polish, Meta & Deploy | Pending |

**Coverage:**
- v1 requirements: 33 total (FOUND: 7, COMP: 4, LAND: 7, SAND: 6, STUB: 2, META: 8, DEPLOY: 2)
- Mapped to phases: 33
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-02*
*Last updated: 2026-06-02 — traceability expanded to per-requirement rows after roadmap creation*
