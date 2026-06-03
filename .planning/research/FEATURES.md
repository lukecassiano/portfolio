# Features Research: Portfolio Site

**Project:** Luke Cassiano Portfolio
**Researched:** 2026-06-02
**Mode:** Ecosystem — what does a high-quality scroll-based portfolio need?
**Confidence:** MEDIUM overall (no web search available; based on training knowledge through Aug 2025, which is strong on this domain)

---

## Table Stakes

Must-have features. Missing any of these makes the portfolio feel unfinished or unprofessional to a hiring manager or potential collaborator.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Mobile responsiveness — full reflow | Recruiters open links on phone constantly. A broken mobile layout is an immediate disqualifier. | Medium | Scroll-scene layout is hardest to make mobile-native. 100svh instead of 100vh avoids mobile browser chrome bugs. Each scene must reflow to a vertical stack, not horizontal. |
| `<title>` + `<meta name="description">` | Google indexes portfolios. Missing description = Google writes its own (usually bad). | Low | "Luke Cassiano — AI, perception, tools for thought" style. |
| Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) | LinkedIn and iMessage unfurl previews. Without og:image, the unfurl is blank or random. | Low | og:image should be a static 1200×630 PNG. Can be the intro scene exported. |
| Twitter/X card meta tags | Same unfurl need. `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. | Low | Use `summary_large_image` card type. |
| `<link rel="canonical">` | Prevents duplicate indexing if the site is ever mirrored or served on multiple domains. | Low | Should match deployed Vercel domain. |
| Favicon + Apple touch icon | Tabs and bookmarks. Missing favicon looks unfinished. | Low | SVG favicon preferred (scales perfectly). PNG fallback at 32×32 and 180×180 for Apple. |
| `robots.txt` | Tells search crawlers what to index. Without it, crawlers still work, but explicit is better. | Low | Permissive: allow all for a portfolio. |
| `sitemap.xml` | Helps Google discover the case study page and stub pages quickly. | Low | Next.js can generate this with `next-sitemap` or App Router route handler. |
| Keyboard navigability | Tab through all interactive elements (nav links, project links, case study CTA, footer email). Focus rings must be visible. | Low | Don't remove outlines without replacing them. |
| Color contrast — WCAG AA minimum | Text on cream background, text on near-black (Belief Agent scene). IBM Plex Mono at small sizes on cream needs careful checking. | Low | AA = 4.5:1 for body text, 3:1 for large text. |
| Skip-to-content link | Screen readers and keyboard users jump over nav. Required for accessibility compliance. | Low | Hidden visually, visible on focus. Single `<a href="#main-content">`. |
| All images have `alt` text | Screen readers, crawlers, and lazy-loaded images that fail to load. | Low | Decorative blobs get `alt=""`. Project screenshots get descriptive alt. |
| Page load under 3s on mobile (3G sim) | Google's Core Web Vitals. LCP over 4s visibly hurts. Heavy Framer Motion + Lenis bundles need care. | Medium | Next.js App Router code-splits per route. Lenis is ~8KB gz. Framer Motion is ~40KB gz — tree-shake carefully. |
| Working email link in footer | The only contact mechanism. `mailto:` must be valid and clickable. | Trivial | Also make it copyable (not just a button that triggers mailto silently). |
| Case study page scrollable and readable on mobile | Long editorial scroll collapses badly if not designed mobile-first. | Medium | Single-column, generous line-length clamp (60-75ch), section anchors. |
| `lang` attribute on `<html>` | Affects screen reader language detection and browser translate prompts. | Trivial | `lang="en"`. |
| Print stylesheet or print-safe defaults | Recruiters print PDFs from browsers. Without print styles, gradients print as black blocks and blobs can cover text. | Low | `@media print` — hide blobs/animations, ensure black text on white, show full URLs for links. |
| 404 page | Broken links (to stub pages, old URLs) should return a styled 404, not Next.js default. | Low | Brief, on-brand, links back to home. |

---

## Differentiators

Things that make this portfolio memorable vs. the field of "clean Next.js portfolio" sites that all look the same.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll momentum that feels calibrated | Lenis defaults feel good but not great. Tuning `lerp` (ease factor) and `duration` to the content's pace — slower for heavy scene transitions, slightly snappier mid-scene — creates the editorial-magazine feeling that separates taniasoraya from a template. | Low | lerp: 0.08–0.12 range. Test on trackpad and touch. |
| Scene-level scroll progress indicator | A subtle dot-nav or line indicator (not the default bullet-circle style) that shows which of the 5 scenes you're in, without cluttering the scene. Reinforces the "5 stops" mental model. | Low-Medium | Must be aria-labeled: "Scene 3 of 5: WhiteHelmet". Dots should be 8–10px, minimal. |
| SVG pipeline diagram as interactive artifact | The Sandbar pipeline diagram as crisp SVG — not a screenshot — is immediately legible at any zoom. If it supports hover-to-highlight per stage, it becomes the most technically credible visual in the case study. | Medium-High | Even without interactivity, SVG > PNG. Interactivity is a differentiator. |
| Honest progression: stub pages that commit | "Coming soon" pages that include a brief honest framing ("Research phase — writing the case study now") feel more credible than empty placeholders. Adds the stub to the mental map of Luke's work without overselling. | Low | One or two sentences + the hero scene is enough. No countdown timers, no vague promises. |
| Fraunces + IBM Plex Mono as a type system | This pairing is genuinely unusual in the portfolio space (most use Inter + a geometric sans). The ball-terminal serif + humanist mono reads as both rigorous and alive. Execute it well at all sizes. | Low | Type system is already locked — complexity is in execution: size scales, weight contrast, optical sizing if font supports it. |
| Case study as argument, not project log | Most portfolio case studies are timelines: "First we did X, then Y." A case study structured as a stated problem → insight → product decision is rarer and more compelling to anyone evaluating design and product thinking. The Sandbar structure (problem → insight → product → under the hood → what's next) is already this — protect it from becoming a log. | Low | Complexity is in writing, not engineering. |
| One genuine moment of motion per scene | Not ambient animation, but one deliberate reveal: blob drifts in on scroll-enter, title fades up as the scene locks. The restraint makes each moment count. This is the robin-noguier lesson adopted without its maximalism. | Low-Medium | Framer Motion `useInView` or Lenis scroll progress for trigger timing. |
| `prefers-reduced-motion` as a first-class concern | Most animation-heavy portfolios either ignore this or disable all motion. A better pattern: reduce blob motion to a simple fade, keep layout reveals as instant state changes. Shows craft. | Low | One CSS media query + Framer Motion's `useReducedMotion()` hook. Complexity is near-zero. |

---

## Anti-Features

Things to deliberately not build. Each one is a trap that wastes time or hurts the experience.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Custom cursor | Already explicitly excluded in PROJECT.md. It signals that the site is about the site, not the work. It also universally breaks on touch devices and causes scroll jank on lower-end hardware. | Standard OS cursor. The restraint reads as confidence. |
| Contact form | Already excluded. For a portfolio at this scale, a form adds CORS configuration, spam handling, and rate limiting for zero additional benefit over a mailto link. | `mailto:` link in footer. Copyable email address visible as text. |
| Scroll hijacking (mandatory hard snap) | Full-viewport hard snap — where the browser forcibly jumps to the next scene if you scroll even 1px past a threshold — is jarring and disorienting, especially with Lenis. It removes the visitor's agency. | Soft guidance with Lenis. Let the scene occupy the viewport naturally. Gentle scroll progress cues (dot nav) help orientation without forcing movement. |
| Ambient continuous animation | A blob that rotates, pulses, and breathes constantly draws the eye away from content and causes battery drain + CPU usage on mobile. Background animations with `animation: infinite` also trigger `prefers-reduced-motion` violations. | Blob drifts in on scene enter, then settles. One moment, not a loop. |
| Loading screens / splash animations | Adds perceived wait time before content is accessible. For a portfolio, every second of loading screen is a second the visitor considers closing the tab. | Optimize LCP instead. Skeleton screens if needed. |
| Dark/light mode toggle | Adds complexity (token system, localStorage persistence, flash of wrong theme) without a compelling reason — the cream base and near-black scenes already have high visual interest across both preferences. If system preference is dark, the near-black Belief Agent scene works well; if light, the cream scenes do. | Respect `prefers-color-scheme` at the system level only, or ship one mode confidently. Don't build a toggle for a v1. |
| Blog / MDX infrastructure | Already out of scope. Substack handles distribution. Building a blog means dealing with MDX, syntax highlighting, RSS feeds, and pagination — none of which serve the core purpose. | External Substack link in the Reading the Break scene. |
| CMS | Static content for v1. A CMS means auth, webhook deploys, content modeling — engineering overhead that doesn't move the needle when content changes are rare. | Hardcoded in JSX/TSX. Easy to edit later when content actually needs to change at scale. |
| Analytics dashboards (full Mixpanel/Amplitude setup) | Overkill for a personal portfolio. Complex event schemas, consent banners (GDPR in some regions), and maintenance cost. | Vercel Analytics (zero-config, privacy-respecting, already in the platform). Optional: `<script>` for Plausible or Fathom if you want more detail. |
| Cookie consent banner | Required only if you set cookies for tracking or advertising. Vercel Analytics is cookieless. A consent banner on a portfolio is a jarring first interaction. | Don't set cookies. Don't need a banner. |
| Infinite scroll or pagination on landing | The landing is 5 scenes — fixed. Pagination implies a catalog. Infinite scroll implies a feed. Neither model fits a curated 4-project portfolio. | Fixed 5-scene sequence. Clear end (footer). |
| Skills bar charts / technology grids | "JavaScript: 87%" has become a UX anti-pattern so widely mocked that it actively undermines credibility. Visitors can't evaluate what 87% means. | Let the project work speak. The Sandbar pipeline diagram communicates technical depth better than any skill bar. |
| LinkedIn/Twitter social icons in header | Clutters the header, distracts from the work, signals that the site is a template. | Email link in footer only. Social presence exists independently. |
| Testimonials carousel | Carousel interaction is widely cited as a UX anti-pattern (low engagement, motion sickness risk, usually ignored). For a student/early-career portfolio, testimonials aren't expected and a carousel is visual noise. | If social proof is needed, a single static quote with attribution in the case study is better. |

---

## Case Study Structure

What a high-quality case study page needs structurally, beyond prose. This applies to the Sandbar full case study.

### Required Structural Elements

**Above the fold / hero section**
- Project name (Fraunces ExtraBold Italic, large)
- One-line problem statement — not a tagline, a genuine problem ("Surf forecasts are accurate but not actionable at the moment of decision")
- 1–3 hero stats if available (users, sessions, accuracy delta, time saved) — IBM Plex Mono, large, prominent
- Hero visual: the gradient blob + a representative screenshot or the pipeline diagram

**Navigation / orientation**
- Section anchors in a sticky sidebar (desktop) or sticky top progress bar (mobile). Sections: Problem, Insight, Product, Under the Hood, What's Next.
- Scroll progress indicator for long reads signals "you are here" without requiring a table of contents click.

**Problem section**
- Concrete framing: who has this problem, in what context, with what consequence.
- Avoid "the problem was that there was no solution" — name the specific failure mode.
- One supporting visual: user quote, data point, or situation diagram.

**Insight section**
- The non-obvious observation that unlocked the product direction. This is the hardest section to write and the most valuable.
- Should feel like a cognitive turn: "the real issue wasn't X, it was Y."
- No bullet lists here. Prose only. The insight needs to build.

**Product section**
- Screenshots with contextual captions (not just decorative).
- Decision rationale: why this choice and not the obvious alternative? (This is what differentiates a portfolio case study from a product changelog.)
- Before/after comparisons if available.

**Under the Hood**
- Technical architecture where it's genuinely interesting (Sandbar's pipeline diagram is exactly this).
- SVG diagram > prose description > raster image. Complexity shown visually lands better than "we used X and Y and Z."
- Honest about tradeoffs: "we chose X because Y, knowing it costs Z."

**What's Next**
- Not a features wishlist — a frame for what you learned and what would unlock the next version.
- One or two concrete directions, not a backlog dump.

**Footer / close**
- Link back to home/landing.
- Optional: link to next project stub.
- Email link if you want inbound from the case study page.

### Visual Grammar Rules for Case Studies

- Captions below images in IBM Plex Mono, 12–13px, muted color. They anchor the image to the argument.
- Pull quotes for key insights — set in Fraunces, slightly larger, with left border or indentation. Not for every quote, only the genuinely load-bearing one per section.
- Section headers should be readable as a "skim path" — someone reading only headers should understand the arc of the project.
- Code blocks (if any, for "under the hood") in IBM Plex Mono with a subtle background. Don't over-highlight if it's not the focus.
- Images should be constrained to a readable column width (max ~800px on desktop), not full-bleed for every image. Full-bleed only for the single most dramatic visual.

### What NOT to Include in a Case Study

- Timeline/Gantt-style process diagrams ("Week 1 we did research, Week 2 we did wireframes"). These show process, not thinking.
- Double-diamond diagrams used decoratively without actual content. A design process diagram that says "empathize → define → ideate → prototype" with nothing specific is filler.
- Huge galleries of wireframe iterations without selection rationale. One or two wireframes with a sentence about why this direction won is better than twelve undifferentiated iterations.
- "Team size: 3, Timeline: 6 weeks, Tools: Figma" metadata blocks at the top without connection to the work. If metadata matters, integrate it: "Six weeks was enough to validate X but not enough to address Y."

---

## Accessibility Notes

For animation-heavy, scroll-heavy sites specifically — patterns that are commonly skipped and matter.

### `prefers-reduced-motion` (CRITICAL)

**Pattern:** Use Framer Motion's `useReducedMotion()` hook as a gate on all animation variants.

```tsx
const shouldReduce = useReducedMotion();
const variants = {
  hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
  visible: { opacity: 1, y: 0 },
};
```

For blob animations specifically: when `prefers-reduced-motion` is set, skip the drift entirely — render the blob at its final position immediately. A blob that never settles is a vestibular trigger.

**What to reduce vs. what to skip:**
- Fade-ins: reduce duration (instant is fine), don't remove entirely (jarring if content just appears)
- Translate/slide reveals: reduce to 0 translate offset (fade only)
- Blob drift: skip entirely, render static
- Lenis smooth scroll: Lenis respects native scroll when reduced motion is preferred if you call `lenis.destroy()` or never initialize Lenis when `matchMedia('(prefers-reduced-motion: reduce)').matches`

### Focus Management

- `Tab` order must follow the visual reading order. In the scroll-scene layout, off-screen scenes should not receive focus until scrolled into view. Use `tabindex="-1"` on scene containers that are outside the viewport, or rely on native visibility-based focus (which most browsers handle if `visibility: hidden` or `display: none` is applied offscreen).
- Skip-to-content link: `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>`. Tailwind's `sr-only` + `focus:not-sr-only` pattern works exactly here.

### Semantic Structure

- Landmark regions: `<header>`, `<main>`, `<footer>`. Each scene is a `<section>` with an `aria-label` ("Sandbar project", "Belief Agent project"). Screen readers can then jump between landmarks.
- Heading hierarchy: the `<h1>` should appear once, on the intro scene (Luke's name or the site's positioning line). Project wordmarks in scenes are `<h2>`. Case study page: `<h1>` is the project name, sections are `<h2>`.
- Don't use heading tags for visual sizing. If something looks like a large heading but isn't structurally a heading (e.g., a decorative stat), use `<p>` or `<span>` with Tailwind sizing classes.

### Color Contrast Checklist (project-specific)

| Context | Foreground | Background | Must Pass |
|---------|------------|------------|-----------|
| Body text, cream scenes | ~#1A1A1A | #F5F3EE (cream) | AA (4.5:1) |
| IBM Plex Mono metadata, small | ~#4A4A4A | #F5F3EE | AA (4.5:1) |
| Text on near-black (Belief Agent) | #F5F3EE or white | ~#0D0D0D | AA (4.5:1) |
| Blob colors (decorative, no text on blob) | N/A | N/A | No requirement |
| Link color in footer | Must contrast with cream | #F5F3EE | AA |

Use browser DevTools or the Colour Contrast Analyser to verify before shipping. Don't trust eye-balling at design time.

### Motion and Scroll

- Lenis applies `scroll-behavior: smooth` via JS. This is distinct from CSS `scroll-behavior: smooth`, which also needs to be disabled for reduced-motion users in the CSS: `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`
- Parallax effects (if any) must be disabled for reduced-motion users. Parallax is a known vestibular trigger. The current design does not include parallax — do not add it.
- Infinite looping animations (none currently planned) must be disabled under reduced-motion.

### Image Accessibility

- The gradient blobs are decorative. `<div>` with CSS background, or `<img alt="">` (empty alt, not missing alt).
- The Sandbar pipeline SVG is informational. It needs either: (a) a `<title>` element inside the SVG + `aria-labelledby`, or (b) a visually hidden text description as a sibling element. A complex diagram with an empty alt is an accessibility failure for screen reader users.
- Project screenshots: descriptive alt text. "Sandbar app showing surf forecast for Ocean Beach with 6-foot wave height at 7am" is good. "Screenshot" is not.

### Interactive Elements

- The dot-nav scroll indicator (if implemented) must be keyboard-operable and screen-reader-accessible: `<nav aria-label="Page sections">` with `<a>` links (not `<div>` with `onClick`), `aria-current="true"` on the active section link.
- The external Substack link (Reading the Break scene) must have `target="_blank" rel="noopener noreferrer"` and an `aria-label` that includes "opens in new tab" or a visible indicator.

---

## Feature Dependencies

```
Mobile layout → Scene reflow → Scroll behavior (Lenis must be tested on touch)
SVG pipeline diagram → Case study Under the Hood section
Dot-nav → Scene scroll progress tracking → Lenis scroll position API
Skip-to-content → <main id="main-content"> landmark
og:image → Static export of a representative visual (must be created)
Favicon SVG → SVG asset created
sitemap.xml → All page routes defined first
prefers-reduced-motion → All animation components wrapped with useReducedMotion()
Print styles → @media print block in global CSS
```

---

## MVP Recommendation

**Build in this order for a shippable v1:**

1. Semantic HTML scaffold (landmarks, heading hierarchy, skip link, lang attribute) — zero visual impact, enables everything else
2. Landing 5-scene scroll with Lenis — core experience
3. Mobile reflow for all 5 scenes — don't defer; layout bugs compound
4. Sandbar case study page — the primary depth signal
5. Stub pages for Belief Agent and WhiteHelmet
6. Meta/OG tags and favicon — needed before sharing any link
7. `prefers-reduced-motion` gating on all animations — one pass after all animations are built
8. Print styles — one `@media print` block, 30 minutes of work
9. sitemap.xml and robots.txt — last, after all routes exist

**Defer to post-v1:**
- Dot-nav scroll indicator (nice to have, not blocking)
- Interactive SVG pipeline diagram (static SVG ships first, interactivity later)
- Scene-level scroll progress polish (can iterate after seeing it live)
- Dark mode (explicitly out of scope for v1)

---

*Confidence note: No web search was available during this research session. All findings derive from training knowledge (cutoff Aug 2025). The portfolio UX, a11y, SEO meta tag, and case study structure guidance is a stable, well-established domain — MEDIUM-HIGH confidence. Specific library version numbers and any ecosystem changes after Aug 2025 should be verified against official docs before implementation.*
