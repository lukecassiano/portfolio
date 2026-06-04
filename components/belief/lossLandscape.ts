// Shared math for the belief "energy landscape" diagrams.
// A 2-D surface with two minima (a deep "wrong attractor" and a shallower
// "true goal") and two maxima — the terrain belief descends over.

export type Pt = { x: number; y: number }

export const DOM = 3 // domain is [-DOM, DOM] in both axes

const g = (x: number, y: number, cx: number, cy: number, s: number) =>
  Math.exp(-(((x - cx) ** 2) + ((y - cy) ** 2)) / (2 * s * s))

export function landscape(x: number, y: number): number {
  return (
    -2.2 * g(x, y, -1.3, -1.0, 1.0) + // deep minimum — wrong attractor
    -1.2 * g(x, y, 1.4, 1.2, 1.1) + //  shallow minimum — true goal
    1.8 * g(x, y, 1.2, -1.4, 0.9) + //  maximum
    1.5 * g(x, y, -1.4, 1.5, 1.0) //    maximum
  )
}

export function gradient(x: number, y: number, e = 1e-3): Pt {
  return {
    x: (landscape(x + e, y) - landscape(x - e, y)) / (2 * e),
    y: (landscape(x, y + e) - landscape(x, y - e)) / (2 * e),
  }
}

/** Gradient descent trajectory from a start point. */
export function descent(start: Pt, steps = 46, lr = 0.12): Pt[] {
  const path: Pt[] = [{ ...start }]
  let x = start.x
  let y = start.y
  for (let i = 0; i < steps; i++) {
    const gr = gradient(x, y)
    x = Math.max(-DOM, Math.min(DOM, x - lr * gr.x))
    y = Math.max(-DOM, Math.min(DOM, y - lr * gr.y))
    path.push({ x, y })
  }
  return path
}

// Approximate locations of the two minima (for labels/markers).
export const WRONG_MIN: Pt = { x: -1.3, y: -1.0 }
export const TRUE_MIN: Pt = { x: 1.4, y: 1.2 }

// z-range, sampled once at module load for consistent normalization.
let zmin = Infinity
let zmax = -Infinity
for (let i = 0; i <= 60; i++) {
  for (let j = 0; j <= 60; j++) {
    const x = -DOM + (2 * DOM * i) / 60
    const y = -DOM + (2 * DOM * j) / 60
    const z = landscape(x, y)
    if (z < zmin) zmin = z
    if (z > zmax) zmax = z
  }
}
export const ZMIN = zmin
export const ZMAX = zmax
export const norm = (z: number) => (z - ZMIN) / (ZMAX - ZMIN)

/** Jet colormap: 0 → blue (low), 1 → red (high). */
export function jet(t: number): string {
  const cl = (v: number) => Math.round(255 * Math.max(0, Math.min(1, v)))
  const r = 1.5 - Math.abs(4 * t - 3)
  const g2 = 1.5 - Math.abs(4 * t - 2)
  const b = 1.5 - Math.abs(4 * t - 1)
  return `rgb(${cl(r)},${cl(g2)},${cl(b)})`
}
