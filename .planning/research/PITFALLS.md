# Pitfalls Research: Portfolio Site

*Compiled from stack, features, and architecture research outputs + known patterns.*

## Lenis + Next.js Pitfalls

### Wrong package name
- **Pitfall:** Installing `@studio-freight/lenis` gets an outdated version.
- **Prevention:** Use `lenis` (the renamed package). Verify with `npm view lenis version` before installing.
- **Phase:** Foundation setup.

### Wrong Lenis tick pattern
- **Pitfall:** Using `autoRaf: true` can conflict with React 18 Strict Mode double-mount, causing duplicate RAF loops.
- **Prevention:** Use manual RAF loop in `useEffect`: `const animate = (time) => lenis.raf(time); const rafId = requestAnimationFrame(animate)`. Return `cancelAnimationFrame(rafId); lenis.destroy()` for cleanup.
- **Phase:** LenisProvider implementation.

### Verify `lenis/react` export
- **Pitfall:** The `ReactLenis` named export from `lenis/react` may differ across versions.
- **Prevention:** After install, run `node -e "const l = require('lenis/react'); console.log(Object.keys(l))"` to confirm `ReactLenis` is exported before writing the provider.
- **Phase:** Foundation setup.

### Double-easing jank
- **Pitfall:** Wrapping `useScroll` output in `useSpring` when Lenis is active creates double-eased motion that feels wrong.
- **Prevention:** Never add `useSpring` to scroll-derived values when Lenis is active. Lenis already eases; use raw `scrollY` motionValue.
- **Phase:** Any scene with scroll-driven animation.

### Lenis + prefers-reduced-motion
- **Pitfall:** Smooth scroll momentum is a vestibular trigger. Not disabling it is an accessibility failure.
- **Prevention:** Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before initializing Lenis. If true, skip smooth scroll or call `lenis.destroy()` immediately.
- **Phase:** LenisProvider implementation.

## Framer Motion + App Router Pitfalls

### Hydration mismatch from motion values
- **Pitfall:** Framer Motion components that read window/scroll state on the server produce different markup than on client, causing hydration errors.
- **Prevention:** Keep all motion components as `'use client'`. Never use `useScroll`, `useMotionValue`, or `useTransform` in Server Components.
- **Phase:** All scene components.

### Over-broad `'use client'` boundaries
- **Pitfall:** Marking a large section component `'use client'` pulls its entire subtree out of the RSC tree, increasing JS bundle.
- **Prevention:** Push `'use client'` down to the smallest animated leaf. Page-level components should be Server Components; only `GradientBlob` and motion wrappers need to be client.
- **Phase:** All phases.

### AnimatePresence with App Router navigation
- **Pitfall:** Page exit animations don't work out of the box with App Router — the new page renders before the old one unmounts.
- **Prevention:** Don't build page transition animations. Stick to within-scene fade-ins only. If needed later, use a layout-level AnimatePresence wrapper (complex, defer to then).
- **Phase:** N/A for this project's scope.

## Mobile / Viewport Pitfalls

### `100vh` on mobile
- **Pitfall:** Mobile browser chrome (address bar, bottom nav) eats into `100vh`, causing scenes to overflow or be truncated. This is the most common layout bug on scroll-scene portfolios.
- **Prevention:** Use `100svh` (small viewport height). Supported in all modern browsers as of 2024+. Apply via Tailwind with `h-screen` override or `h-[100svh]`.
- **Phase:** Landing scene layout.

### Touch scroll momentum on iOS
- **Pitfall:** iOS Safari has its own momentum scrolling that can fight or stack with Lenis, producing stuttery scroll on scenes.
- **Prevention:** Add `-webkit-overflow-scrolling: touch` is deprecated — instead ensure Lenis `smoothTouch: false` (default) is not overridden. Lenis's `touchMultiplier` defaults are tuned for mobile.
- **Phase:** LenisProvider config.

### Blob visibility on small screens
- **Pitfall:** Gradient blobs sized for desktop viewport (e.g., 60vw) look wrong on mobile — either too small to read or extending outside visible area.
- **Prevention:** Size blobs in `vmax` or combine viewport units. Test at 390px width early. The blob is the scene's only emotional element; it must read on mobile.
- **Phase:** GradientBlob component.

## Blob / CSS Performance Pitfalls

### Triggering layout on blob animation
- **Pitfall:** Animating `width`, `height`, `margin`, or `padding` on the blob forces layout/paint, causing jank during drift.
- **Prevention:** Only animate `transform` (translate, scale) and `opacity`. Use `will-change: transform` on the blob element to promote to GPU layer. Don't use `filter: blur()` inside the animation loop (blur is expensive); apply it as a static CSS value.
- **Phase:** GradientBlob component.

### Too many blurs
- **Pitfall:** Applying `filter: blur(80px)` to multiple elements simultaneously causes GPU overdraw and paint lag, especially on mobile.
- **Prevention:** One blob per scene. No nested blurs. The blur value on the blob should be static and high enough to read as ambient, not animated.
- **Phase:** GradientBlob component.

## Vercel Deploy Pitfalls

### Font files not in `public/` or `app/fonts/`
- **Pitfall:** Fonts loaded via relative path outside Next.js's expected locations don't get proper cache headers on Vercel.
- **Prevention:** Use `next/font/google` (fetches at build time, zero runtime request) or place local font files in `app/fonts/` and use `next/font/local`.
- **Phase:** Foundation setup.

### Missing `og:image` asset
- **Pitfall:** Every LinkedIn/iMessage/Slack share of the portfolio URL shows a blank card without a real 1200×630 PNG OG image.
- **Prevention:** Plan this as a deliberate deliverable. Export the intro scene at 1200×630. Place in `public/og-image.png`. Wire in root layout metadata.
- **Phase:** Polish / deploy phase.

## Mobile Impression Pitfalls

### No mobile nav / footer affordance
- **Pitfall:** If the only navigation is scene-based scroll on desktop, mobile users have no orientation cue and can't jump to specific projects.
- **Prevention:** Add a dot-nav (fixed, right side, 5 dots) visible from the landing. Each dot links to its scene section via `lenis.scrollTo()`. Minimal, non-intrusive.
- **Phase:** Landing polish.

### Type size collapses on small screens
- **Pitfall:** Hero type set at `clamp(80px, 12vw, 160px)` is unreadable at 320px.
- **Prevention:** Use `clamp()` with a sensible minimum: `clamp(48px, 10vw, 120px)`. Test the intro scene at 375px before calling the type system done.
- **Phase:** Design system / foundation.

### Case study body text line length on desktop
- **Pitfall:** Full-width text on widescreen is unreadable (120+ characters per line).
- **Prevention:** Constrain prose content to `max-w-2xl` (65ch equivalent). Headers can break out wider. This is the single most commonly missed typographic detail on case study pages.
- **Phase:** Sandbar case study layout.
