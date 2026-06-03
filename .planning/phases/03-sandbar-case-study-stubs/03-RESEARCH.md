# Phase 3: Sandbar Case Study & Stubs — Research

**Researched:** 2026-06-03
**Domain:** Next.js App Router static pages, inline SVG React components, editorial prose layout, full-viewport stub scenes
**Confidence:** HIGH — all findings drawn from confirmed codebase state and Phase 1/2 summaries. No external library changes needed.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SAND-01 | Case study page at /sandbar with 5 sections: Problem, Insight, Product, Under the Hood, What's Next | App Router route structure confirmed; Server Component page; article+section semantic pattern |
| SAND-02 | Prose content constrained to max-w-2xl (~65ch) on all breakpoints | max-w-2xl mx-auto wrapper applied to ALL content, no exceptions; confirmed from UI-SPEC |
| SAND-03 | Pipeline diagram as inline SVG React component (not image) with aria-label, title, visible at all widths | Inline SVG JSX pattern with title+aria-labelledby confirmed; component at components/sandbar/PipelineDiagram.tsx |
| SAND-04 | Section headings in Fraunces; metadata/captions in IBM Plex Mono | .wordmark class confirmed in globals.css; font-mono Tailwind alias confirmed |
| SAND-05 | Hero stat(s) as large Fraunces numerals matching Sandbar visual language | Same .wordmark + clamp(36px,6vw,72px) pattern as SandbarScene.tsx stat |
| SAND-06 | Back navigation to landing page | Plain anchor href="/" confirmed; font-mono label token; no SceneLink needed |
| STUB-01 | /belief-agent — hero scene, blob, honest in-progress framing | Full scene pattern confirmed from BeliefAgentScene.tsx; same blob props |
| STUB-02 | /whitehelmet — same pattern as STUB-01 | Full scene pattern confirmed from WhiteHelmetScene.tsx; same blob props |
</phase_requirements>

---

## Summary

Phase 3 builds three new routes — a full editorial case study at `/sandbar` and two stub pages at `/belief-agent` and `/whitehelmet`. Every dependency needed is already in place from Phases 1 and 2: `GradientBlob`, `SceneFadeIn`, `Footer`, font tokens, and color tokens are all confirmed present in the codebase. No new packages are needed.

The case study page is architecturally simple: a Server Component that renders a long-scroll `article` element with a single `max-w-2xl mx-auto` prose column containing five `section` elements. The only novel component is `PipelineDiagram` — an inline SVG React component that must include a `<title>` element with `aria-labelledby` for accessibility. The stub pages are near-copies of their corresponding landing scenes, restructured as standalone full-viewport pages with a back navigation link.

The primary planning risk is the prose content for the five case study sections (Problem, Insight, Product, Under the Hood, What's Next). The UI-SPEC delegates this to the executor. The planner must allocate a task for drafting this copy with enough Sandbar project context to write credibly. All structural and styling decisions are fully locked.

**Primary recommendation:** Build in two parallel waves. Wave 1: `/sandbar` case study page (requires writing prose content + PipelineDiagram SVG). Wave 2: `/belief-agent` and `/whitehelmet` stubs (trivially parallel, no inter-dependency). Both waves can start simultaneously.

---

## Standard Stack

### Core (confirmed installed — no new packages needed)

| Library | Confirmed Version | Purpose | Confirmed Via |
|---------|-------------------|---------|---------------|
| next | 14.x | App Router routing, Server Components | Phase 1 scaffold |
| react | 18.x | Component rendering | Phase 1 scaffold |
| typescript | 5.x | Type safety | Phase 1 scaffold |
| tailwindcss | 3.4.19 | Styling | Phase 1 confirmed |
| framer-motion | 12.40.0 | SceneFadeIn, GradientBlob animation | 01-03-SUMMARY.md |

### No New Installations

Phase 3 requires zero new npm packages. All needed libraries are already present.

---

## Architecture Patterns

### Route Structure

App Router convention: one directory per route under `app/`, each containing `page.tsx`.

```
app/
├── sandbar/
│   └── page.tsx          # Server Component — editorial case study
├── belief-agent/
│   └── page.tsx          # Server Component — stub (full-viewport scene)
└── whitehelmet/
    └── page.tsx          # Server Component — stub (full-viewport scene)
```

All three pages are **Server Components** (no `'use client'`). The `'use client'` boundary is already embedded inside `GradientBlob` and `SceneFadeIn` — the page files import those components without needing their own client directive.

### Component File Structure

```
components/
└── sandbar/
    ├── PipelineDiagram.tsx     # Inline SVG, Server Component, no browser APIs
    └── CaseStudySection.tsx    # Optional: h2 + prose wrapper (DRY if helpful)
```

`CaseStudySection` is optional. If all five sections have meaningfully different content structures, just write them inline in `page.tsx`. The planner should evaluate: if each section is structurally identical (h2 + paragraphs), a `CaseStudySection` component reduces duplication. If the Product section diverges significantly (it includes the diagram), inline is simpler.

### Pattern 1: Server Component Case Study Page

The `/sandbar` page has no client-side interactivity in Phase 3. The page renders immediately as static HTML.

```tsx
// app/sandbar/page.tsx
// NO 'use client' — Server Component
import { Footer } from '@/components/ui/Footer'
import { PipelineDiagram } from '@/components/sandbar/PipelineDiagram'

export default function SandbarPage() {
  return (
    <main id="main-content">
      <article className="min-h-screen bg-[#F5F3EE] px-8 py-16 lg:px-16">
        <div className="max-w-2xl mx-auto">
          {/* back nav, h1, hero stat, 5 sections, footer */}
        </div>
      </article>
    </main>
  )
}
```

Source: UI-SPEC page layout contract (03-UI-SPEC.md lines 139–165).

### Pattern 2: Stub Page (full-viewport scene + back nav)

Stub pages are structurally identical to landing scenes but live at their own routes. The key difference: back navigation is added, and the page has `id="main-content"` on the `<main>` element.

```tsx
// app/belief-agent/page.tsx
// NO 'use client' — Server Component
import { GradientBlob } from '@/components/ui/GradientBlob'
import { SceneFadeIn } from '@/components/ui/SceneFadeIn'

export default function BeliefAgentPage() {
  return (
    <main id="main-content">
      <section
        aria-label="Belief Agent"
        className="relative min-h-[100svh] overflow-hidden flex flex-col
                   items-center justify-center px-8 py-12 lg:px-16 lg:py-16
                   bg-[#0D0D12] text-[#F5F3EE]"
      >
        <GradientBlob
          colors={['#312E81', '#4ADE80']}
          size="65vmax"
          position={{ top: '5%', right: '-10%' }}
          blur="120px"
        />
        {/* back nav + SceneFadeIn content block */}
      </section>
    </main>
  )
}
```

Note: `text-cream` is a Tailwind alias for `#F5F3EE` (set up in Phase 1). On BeliefAgentScene in the landing, `text-cream` was used. On the stub page use `text-[#F5F3EE]` OR `text-cream` — both work because the Tailwind alias is confirmed. Use `text-cream` for consistency with the landing scene.

Source: BeliefAgentScene.tsx (confirmed codebase), UI-SPEC lines 169–184.

### Pattern 3: Inline SVG PipelineDiagram Component

The PipelineDiagram must be a React component that renders an inline `<svg>` — not an `<img>` tag, not SVGR import.

Key accessibility requirements confirmed in UI-SPEC:
- `<title id="pipeline-title">` as first child of `<svg>`
- `aria-labelledby="pipeline-title"` on the `<svg>` element
- `role="img"` on the `<svg>` element
- `width="100%"` on the svg element (responsive within max-w-2xl parent)
- `viewBox` set (no fixed pixel dimensions on the svg itself)

```tsx
// components/sandbar/PipelineDiagram.tsx
// NO 'use client' — pure SVG markup, no browser APIs

export function PipelineDiagram() {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 800 200"
        width="100%"
        aria-labelledby="pipeline-title"
        role="img"
      >
        <title id="pipeline-title">
          Sandbar data pipeline: buoy data to NOAA grid to ensemble model to surf forecast output
        </title>
        {/* nodes, arrows, labels — see Code Examples section */}
      </svg>
      <figcaption className="font-mono font-medium text-xs tracking-[0.08em] mt-4 text-center">
        BUOY DATA → NOAA GRID → ENSEMBLE MODEL → SURF FORECAST
      </figcaption>
    </figure>
  )
}
```

Source: UI-SPEC lines 255–288 (pipeline diagram contract).

### Pattern 4: Back Navigation

Identical on all three pages. Plain `<a>` element — NOT SceneLink.

```tsx
<a
  href="/"
  className="font-mono font-medium text-xs tracking-[0.08em] uppercase
             hover:opacity-60 transition-opacity duration-200"
>
  ← Back
</a>
```

Position on `/sandbar`: inline at top of prose column, `mb-16` spacing before the h1.
Position on stubs: `absolute top-8 left-8 lg:top-12 lg:left-12` (overlaid on scene).

Arrow: Unicode `←` (U+2190). Same pattern as Phase 2 `→` CTAs in SceneLink.

Source: UI-SPEC lines 213–228.

### Pattern 5: Hero Stat Block on /sandbar

The "87%" stat uses the same `.wordmark` class and `clamp(36px, 6vw, 72px)` sizing already used in `SandbarScene.tsx`. The stat appears at the top of the prose column, below the h1, above the first section.

```tsx
<div className="flex flex-col gap-1 my-8">
  <p className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
    87%
  </p>
  <p className="font-mono font-medium text-xs uppercase tracking-[0.08em]">
    FORECAST ACCURACY
  </p>
</div>
```

Source: SandbarScene.tsx (confirmed codebase), UI-SPEC lines 298–300.

### Pattern 6: Section Headings and Prose

Each of the five case study sections gets semantic structure:

```tsx
<section aria-labelledby="section-problem">
  <h2
    id="section-problem"
    className="wordmark"
    style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}
  >
    Problem
  </h2>
  <p className="font-mono font-medium text-base leading-relaxed mt-4">
    {/* prose content */}
  </p>
</section>
```

The `aria-labelledby` on each `<section>` pointing to its `<h2>` id is required per the UI-SPEC accessibility contract.

Source: UI-SPEC lines 141–165 (layout), lines 375–376 (accessibility contract).

### Anti-Patterns to Avoid

- **Using SceneLink for back navigation.** SceneLink is a CTA "forward" component (`→` pattern). Back navigation is a plain anchor with a `←` prefix.
- **Adding `'use client'` to page files.** The client boundary is already embedded in GradientBlob and SceneFadeIn. Page files stay as Server Components.
- **Breaking content out of max-w-2xl.** ALL content on /sandbar stays within the prose column — no wide breakouts for the diagram or headings.
- **Fixed pixel width/height on the SVG element.** Use `viewBox` + `width="100%"` only. Fixed pixel dimensions break responsiveness.
- **Adding `<img>` for the pipeline.** It must be inline SVG — accessibility attributes, Tailwind styling on the wrapper, future Framer animation (v2 feature) all require it inline.
- **Using `whileInView` on the case study page.** Per UI-SPEC, the case study has NO scroll animation. Content is immediately visible.
- **Using `text-cream` vs `text-[#F5F3EE]`:** On stub pages `text-cream` works (it is an alias in the Tailwind config); `bg-[#0D0D12]` is inline because it is not a named token. Follow the BeliefAgentScene.tsx pattern exactly.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Reduced-motion for SceneFadeIn | Custom useReducedMotion hook | Existing SceneFadeIn component | Already handles it; re-implementing creates inconsistency |
| Blob animation with reduced-motion | Re-implement in stub pages | Existing GradientBlob component | Already handles useReducedMotion internally |
| SVG responsive scaling | JS resize observer | viewBox + width="100%" | SVG scales natively via viewBox — no JS needed |
| Font token application on Fraunces | Inline font-family | .wordmark CSS class | The .wordmark class sets font-family, font-style, font-weight, and font-variation-settings together — separating them creates drift |

**Key insight:** Every UI primitive needed is already built. The only net-new work is the SVG content of PipelineDiagram and the prose copy for the five case study sections.

---

## Common Pitfalls

### Pitfall 1: `id="main-content"` omission on new pages

**What goes wrong:** SkipLink targets `href="#main-content"`. If a new page's `<main>` element lacks `id="main-content"`, keyboard users who activate the skip link land nowhere.
**Why it happens:** The id is present on `app/page.tsx` and `app/not-found.tsx` but easy to forget on new route pages.
**How to avoid:** Every new `page.tsx` file wraps its output in `<main id="main-content">`.
**Confirmed by:** 01-03-SUMMARY.md (SkipLink targets `#main-content`).

### Pitfall 2: `<title>` element id conflicts

**What goes wrong:** Two `<title id="pipeline-title">` elements on the same page would conflict. On `/sandbar` the SVG is the only one, so no conflict exists. But if two PipelineDiagram instances were added, both would have the same id.
**How to avoid:** Only one PipelineDiagram instance per page (spec requires it). Document this constraint.

### Pitfall 3: Back nav position on stubs — z-index below blob

**What goes wrong:** Back navigation uses `absolute` positioning on stub pages. GradientBlob is also `absolute`. If z-index is not managed, the blob can render over the back link.
**Why it happens:** GradientBlob has `pointer-events-none` so click events pass through, but z-stacking can still obscure text visually.
**How to avoid:** Back navigation sits outside SceneFadeIn but inside the section. Apply `relative z-10` to the content wrapper and ensure the back link also has `relative z-10` or is inside a z-10 container. Follow the BeliefAgentScene pattern where `SceneFadeIn` has `className="relative z-10"`.

### Pitfall 4: `wordmark` class on `<p>` vs `<h1>` / `<h2>`

**What goes wrong:** The hero stat "87%" uses `.wordmark` on a `<p>` element (not a heading) in SandbarScene.tsx. On the case study page, section headings use `.wordmark` on `<h2>`. Don't upgrade the stat numeral to a heading to "use the right element" — that breaks the heading hierarchy.
**How to avoid:** Stat block is `<p className="wordmark">`. Section headings are `<h2 className="wordmark">`. Page title is `<h1 className="wordmark">`.

### Pitfall 5: Prose sections missing `py-16` rhythm

**What goes wrong:** Without `py-16` on each `<section>`, the editorial white space between sections collapses and the reading rhythm feels compressed.
**How to avoid:** Per UI-SPEC: each `<section>` gets `py-16` (64px). The gap between section end and next section heading is intentionally 128px total.

### Pitfall 6: SVG `<title>` not the first child

**What goes wrong:** Screen readers may not announce the accessible name if `<title>` is not the first child of `<svg>`.
**How to avoid:** Always put `<title id="pipeline-title">` as the very first element inside the `<svg>` tag, before any graphical elements.

---

## Pipeline Diagram Content

The UI-SPEC locks the pipeline structure as four stages with a linear left-to-right flow. The `<figcaption>` text is the canonical reference:

```
BUOY DATA → NOAA GRID → ENSEMBLE MODEL → SURF FORECAST
```

This maps to the Sandbar agentic forecasting pipeline:
1. **Buoy Data** — raw oceanographic sensor readings (wave height, period, direction, water temp)
2. **NOAA Grid** — gridded swell/wind forecast data from NOAA models (GFS, WaveWatch III)
3. **Ensemble Model** — the agentic layer that combines buoy observations + NOAA grid forecasts to generate spot-specific predictions
4. **Surf Forecast** — human-readable output: wave height range, quality rating, confidence score

**SVG node design** (executor fills exact coordinates): Four labeled rectangles in a horizontal row, connected by arrows. The "Ensemble Model" node is the focal point — it can be slightly larger/emphasized since that's where the agentic intelligence lives.

**Recommended viewBox:** `0 0 800 200` (landscape, allows 4 nodes with space for arrows). Each node approximately 140px wide, 60px tall, with 40px gaps for arrows.

**Accessibility title:** "Sandbar data pipeline: buoy data to NOAA grid to ensemble model to surf forecast output" (locked in UI-SPEC).

---

## Prose Content Guidance (SAND-01)

The UI-SPEC delegates prose copy to the executor. The planner must allocate a task that includes content direction. Based on PROJECT.md and the case study structure:

| Section | Focus | Tone |
|---------|-------|------|
| Problem | Surf forecasting is broken — generic swell forecasts can't account for how local bathymetry, wind, and tides interact at a specific break | Technical problem framing, 1–2 paragraphs |
| Insight | The forecast signal exists in the combination of sources, not any one source — buoy data is ground truth, NOAA grids are context, ensemble logic is the differentiator | Intellectual framing, the "aha" moment |
| Product | Sandbar the app — what it does, 87% accuracy stat, the user experience of getting a forecast | Brief and concrete, the product's value |
| Under the Hood | The agentic pipeline: data ingestion → ensemble model → confidence scoring; reference the diagram | Technical depth, confident but accessible |
| What's Next | Real-time buoy webhooks, more breaks, community validation loop | Forward-looking, 1 paragraph |

**Design thesis** (from PROJECT.md): "translates messy, ambiguous signal into something legible and trustworthy enough to act on" — this should be threaded through the prose as the conceptual spine.

---

## Metadata Guidance (SAND-01 supporting)

Per REQUIREMENTS.md, full metadata (META-01 through META-08) is Phase 4. Phase 3 does NOT need to add metadata exports to the new pages beyond what the root layout provides (`title: 'Luke Cassiano'`). However, adding page-level metadata is trivially easy and not harmful if included early.

Optional but low-cost addition (not required, planner's call):

```tsx
// app/sandbar/page.tsx
export const metadata = {
  title: 'Sandbar — Luke Cassiano',
  description: 'Agentic surf forecasting: how I built a system that translates buoy data and NOAA grid forecasts into actionable surf predictions with 87% accuracy.',
}
```

---

## Code Examples

### Complete back navigation — /sandbar (inline)

```tsx
{/* Source: UI-SPEC lines 213-228 */}
<a
  href="/"
  className="font-mono font-medium text-xs tracking-[0.08em] uppercase
             hover:opacity-60 transition-opacity duration-200 mb-16 inline-block"
>
  ← Back
</a>
```

### Complete back navigation — stub pages (absolute)

```tsx
{/* Source: UI-SPEC lines 213-228 */}
<a
  href="/"
  className="absolute top-8 left-8 lg:top-12 lg:left-12
             font-mono font-medium text-xs tracking-[0.08em] uppercase
             hover:opacity-60 transition-opacity duration-200 z-10"
>
  ← Back
</a>
```

### Section with aria-labelledby

```tsx
{/* Source: UI-SPEC lines 375-376 */}
<section aria-labelledby="section-problem" className="py-16">
  <h2
    id="section-problem"
    className="wordmark"
    style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}
  >
    Problem
  </h2>
  <p className="font-mono font-medium text-base leading-relaxed mt-4">
    {/* prose */}
  </p>
</section>
```

### Minimal valid PipelineDiagram SVG structure

```tsx
{/* Source: UI-SPEC lines 269-287 */}
export function PipelineDiagram() {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 800 200"
        width="100%"
        aria-labelledby="pipeline-title"
        role="img"
      >
        <title id="pipeline-title">
          Sandbar data pipeline: buoy data to NOAA grid to ensemble model to surf forecast output
        </title>
        {/* Stage 1: Buoy Data */}
        <rect x="20" y="70" width="140" height="60" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
        <text x="90" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#1A1A1A">Buoy Data</text>
        {/* Arrow 1→2 */}
        <line x1="160" y1="100" x2="200" y2="100" stroke="#1A1A1A" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* Stage 2: NOAA Grid */}
        <rect x="200" y="70" width="140" height="60" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
        <text x="270" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#1A1A1A">NOAA Grid</text>
        {/* Arrow 2→3 */}
        <line x1="340" y1="100" x2="380" y2="100" stroke="#1A1A1A" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* Stage 3: Ensemble Model (emphasized) */}
        <rect x="380" y="60" width="160" height="80" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="2" />
        <text x="460" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#1A1A1A">Ensemble Model</text>
        {/* Arrow 3→4 */}
        <line x1="540" y1="100" x2="580" y2="100" stroke="#1A1A1A" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* Stage 4: Surf Forecast */}
        <rect x="580" y="70" width="160" height="60" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
        <text x="660" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#1A1A1A">Surf Forecast</text>
        {/* Arrow marker def */}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#1A1A1A" />
          </marker>
        </defs>
      </svg>
      <figcaption className="font-mono font-medium text-xs tracking-[0.08em] mt-4 text-center">
        BUOY DATA → NOAA GRID → ENSEMBLE MODEL → SURF FORECAST
      </figcaption>
    </figure>
  )
}
```

Note: The executor should refine exact coordinates for visual balance. The structural pattern (title first, role="img", aria-labelledby, width="100%", fontFamily using CSS var) is what matters.

---

## Wave Structure

Stubs and case study page are fully independent. Both waves can begin simultaneously.

| Wave | Pages | Components | Dependency | Parallel? |
|------|-------|-----------|-----------|-----------|
| Wave 1 | `/sandbar` | `PipelineDiagram`, optional `CaseStudySection` | None (all deps from P1/P2) | Yes — start immediately |
| Wave 2 | `/belief-agent`, `/whitehelmet` | None new (reuse GradientBlob + SceneFadeIn) | None | Yes — start simultaneously with Wave 1 |

Wave 2 pages are simpler (no new components, pure reuse) — they can be completed faster and should be flagged as potentially bundleable into a single task.

---

## Open Questions

1. **CaseStudySection component — inline vs extracted?**
   - What we know: Five sections all use h2 + paragraph(s). Product section also contains PipelineDiagram.
   - What's unclear: Whether the executor benefits from a `CaseStudySection` wrapper or finds it over-abstracted.
   - Recommendation: Plan the component as optional. Write sections inline in page.tsx first; extract to CaseStudySection only if the planner wants strict DRY enforcement.

2. **Belief Agent stub — `text-cream` vs `text-[#F5F3EE]`?**
   - What we know: `text-cream` is a Tailwind alias (confirmed in Phase 1). BeliefAgentScene.tsx uses `text-cream`. The stub page is standalone and uses the same class.
   - Recommendation: Use `text-cream` to match the landing scene exactly. If the Tailwind alias is ever removed, both break together — consistent failure mode.

3. **Optional page-level metadata on Phase 3 pages?**
   - What we know: Full META requirements are Phase 4. Adding a `metadata` export to `/sandbar` early is low-cost and adds value if the page is shared before Phase 4.
   - Recommendation: Add page-level title + description to `/sandbar` only. Stubs can wait for Phase 4.

---

## Sources

### Primary (HIGH confidence — confirmed against live codebase)
- `components/ui/GradientBlob.tsx` — prop signature, animation pattern, aria-hidden
- `components/scenes/BeliefAgentScene.tsx` — dark scene layout, blob props, z-10 pattern
- `components/scenes/SandbarScene.tsx` — hero stat pattern, blob props
- `components/ui/SceneFadeIn.tsx` — animation contract, reduced-motion gate
- `components/ui/SceneLink.tsx` — CTA link pattern (NOT used for back nav)
- `app/globals.css` — .wordmark class, CSS vars, confirmed font aliases
- `app/layout.tsx` — Server Component pattern, font variable injection
- `.planning/phases/03-sandbar-case-study-stubs/03-UI-SPEC.md` — all layout contracts, copy, a11y, blob specs
- `.planning/phases/01-foundation-and-design-system/01-03-SUMMARY.md` — GradientBlob API, framer-motion version
- `.planning/phases/02-landing-experience/02-01-SUMMARY.md` — SceneFadeIn, SceneLink API
- `.planning/research/SUMMARY.md` — stack versions, architecture decisions

### Secondary (MEDIUM confidence)
- Next.js App Router Server Component convention — consistent with confirmed page.tsx patterns in codebase

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages confirmed installed, versions confirmed
- Architecture (route structure, component boundaries): HIGH — confirmed from live codebase
- SVG accessibility pattern: HIGH — confirmed from UI-SPEC, consistent with WCAG and ARIA specs
- Prose content guidance: MEDIUM — based on PROJECT.md context, executor must write final copy
- Pipeline SVG coordinate sketch: MEDIUM — structural pattern is HIGH, exact coordinates are for executor to refine

**Research date:** 2026-06-03
**Valid until:** 2026-06-30 (stable stack, no external dependencies changing)
