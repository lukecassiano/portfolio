# Luke Cassiano Portfolio

## What This Is

A personal portfolio site for Luke Cassiano — UC Berkeley cog sci / neuroscience student building at the intersection of AI, perception, and tools for thought. The site is a vertically-scrolled sequence of full-viewport scenes, one per project, plus an intro. Its thesis: Luke's work translates messy, ambiguous signal into something legible and trustworthy enough to act on.

## Core Value

Each project scene must make the visitor feel the design tension — rigor and entropy on one side, jazz and improvisation on the other — in the first 3 seconds without reading a word.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing scroll: 5 full-viewport scenes (intro + 4 projects) with Lenis smooth scroll and soft scroll-snap feel
- [ ] Sandbar scene: wordmark, tagline, one hero stat, link to case study
- [ ] Belief Agent scene: near-black background contrast inversion, indigo→phosphor green blob
- [ ] WhiteHelmet scene: cream background, ochre→dust blob
- [ ] Reading the Break scene: warm sunset blob, 3 placeholder post titles, external Substack link
- [ ] Intro scene: name in Fraunces ExtraBold Italic, one positioning line, nothing else
- [ ] Full Sandbar case study page: long-scroll editorial layout (problem → insight → product → under the hood → what's next)
- [ ] Sandbar pipeline diagram rebuilt as SVG (not image)
- [ ] Stub pages for Belief Agent and WhiteHelmet (hero scene + "coming soon")
- [ ] Design system: Fraunces ExtraBold Italic (serif), IBM Plex Mono (data/metadata), cream base #F5F3EE
- [ ] One gradient blob per project as sole chromatic element per scene
- [ ] Footer with email link only (no contact form)
- [ ] Deploy target: Vercel

### Out of Scope

- Blog / MDX infrastructure — not needed yet, just external link to Substack
- CMS — static content only for v1
- Belief Agent case study content — stub only
- WhiteHelmet case study content — stub only
- Contact form — email link in footer only
- Custom cursor — explicitly excluded (robin-noguier interaction model without its cursor/heavy choreography)
- Ambient animation — motion is minimal, one or two real moments per scene only

## Context

**Existing design language:** Sandbar (the app) uses Fraunces-style bold italic serif, pink→lavender→blue gradient blob as the only chromatic element, cream/off-white base, and monospace for all data. Screenshots confirm ball-terminal italic serif and clean data presentation. The portfolio extends this language across all four projects.

**Design references:**
- taniasoraya.com: editorial rhythm, modular structure, restraint, card-based project layout
- robin-noguier.com: scene-per-project scroll model, full-viewport stops — aesthetics NOT adopted

**Projects:**
1. Sandbar — agentic surf forecasting. Full case study content exists (deck in /references). Blob: pink→lavender→blue.
2. Belief Agent — multi-agent system modeling latent belief states with entropy scoring. Case study TBD. Blob: deep indigo→phosphor green, near-black field.
3. WhiteHelmet — AI workflow for construction subcontractor data. Short case study. Blob: ochre→dust.
4. Reading the Break — blog/Substack, jazz/surfing/belief modeling. External link only. Blob: warm sunset (coral→amber).

**Sandbar case study structure:** problem → insight → product → under the hood → what's next. Pipeline diagram is the strongest visual — must be SVG.

**User:** Luke Cassiano, UC Berkeley cog sci / neuroscience. Builder. Comfortable with technical depth. Resume in /references.

## Constraints

- **Tech Stack**: Next.js 14+ App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis — committed
- **Fonts**: Fraunces ExtraBold Italic (serif wordmarks + hero numerals), IBM Plex Mono (data, metadata, captions) — locked after font selection conversation
- **Scroll**: Lenis smooth scroll, soft guidance (not hard snap-mandatory) — locked
- **Motion**: Minimal — blob drift and content fade-ins only. No constant ambient animation.
- **Deploy**: Vercel
- **Blob colors**: Sandbar established. New blobs: directional specs locked, exact values to be iterated from first build.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fraunces ExtraBold Italic for serif | Matches Sandbar wordmark DNA exactly; ball terminals; variable font gives weight range | — Pending |
| IBM Plex Mono for data/metadata | Slightly humanist, editorial feel at small sizes; pairs well with Fraunces contrast | — Pending |
| Soft scroll (Lenis, no mandatory snap) | taniasoraya editorial rhythm; viewer can pause mid-scene; less aggressive than robin-noguier | — Pending |
| One gradient blob per scene, nothing else chromatic | Design constraint: blob is the emotional signal; everything else serves content | — Pending |
| SVG for Sandbar pipeline diagram | Strongest visual in the deck; must be crisp at all sizes, not a raster image | — Pending |
| No blog infrastructure | Substack handles distribution; MDX build cost not justified for v1 | — Pending |
| No custom cursor | robin-noguier scroll model adopted; heavy choreography explicitly excluded | — Pending |

---
*Last updated: 2026-06-02 after initialization*
