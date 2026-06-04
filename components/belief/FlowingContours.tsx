'use client'

import { motion, useReducedMotion } from 'framer-motion'

// A decorative topographic contour field, computed once via marching squares
// over a smooth interfering-sine surface. Rendered as faint white lines that
// slowly drift, so they flow with the card's gradient blob.
const W = 600
const H = 420
const COLS = 48
const ROWS = 34

const field = (x: number, y: number) =>
  Math.sin(x * 0.02 + y * 0.008) +
  Math.sin(y * 0.022 - x * 0.006) +
  0.6 * Math.sin((x + y) * 0.012)

const xs: number[] = []
const ys: number[] = []
for (let i = 0; i <= COLS; i++) xs.push((W * i) / COLS)
for (let j = 0; j <= ROWS; j++) ys.push((H * j) / ROWS)
const V: number[][] = []
for (let i = 0; i <= COLS; i++) {
  V[i] = []
  for (let j = 0; j <= ROWS; j++) V[i][j] = field(xs[i], ys[j])
}
let fmin = Infinity
let fmax = -Infinity
for (let i = 0; i <= COLS; i++)
  for (let j = 0; j <= ROWS; j++) {
    if (V[i][j] < fmin) fmin = V[i][j]
    if (V[i][j] > fmax) fmax = V[i][j]
  }

function contour(level: number): string {
  let d = ''
  const lerp = (a: number, b: number) => (Math.abs(b - a) < 1e-9 ? 0.5 : (level - a) / (b - a))
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const c00 = V[i][j]
      const c10 = V[i + 1][j]
      const c11 = V[i + 1][j + 1]
      const c01 = V[i][j + 1]
      const idx = (c00 > level ? 1 : 0) | (c10 > level ? 2 : 0) | (c11 > level ? 4 : 0) | (c01 > level ? 8 : 0)
      if (idx === 0 || idx === 15) continue
      const x0 = xs[i]
      const x1 = xs[i + 1]
      const y0 = ys[j]
      const y1 = ys[j + 1]
      const pB = (): [number, number] => [x0 + lerp(c00, c10) * (x1 - x0), y0]
      const pT = (): [number, number] => [x0 + lerp(c01, c11) * (x1 - x0), y1]
      const pL = (): [number, number] => [x0, y0 + lerp(c00, c01) * (y1 - y0)]
      const pR = (): [number, number] => [x1, y0 + lerp(c10, c11) * (y1 - y0)]
      const seg = (a: [number, number], b: [number, number]) => {
        d += `M${a[0].toFixed(1)},${a[1].toFixed(1)}L${b[0].toFixed(1)},${b[1].toFixed(1)}`
      }
      switch (idx) {
        case 1: seg(pL(), pB()); break
        case 2: seg(pB(), pR()); break
        case 3: seg(pL(), pR()); break
        case 4: seg(pR(), pT()); break
        case 5: seg(pL(), pB()); seg(pR(), pT()); break
        case 6: seg(pB(), pT()); break
        case 7: seg(pL(), pT()); break
        case 8: seg(pT(), pL()); break
        case 9: seg(pT(), pB()); break
        case 10: seg(pB(), pR()); seg(pT(), pL()); break
        case 11: seg(pT(), pR()); break
        case 12: seg(pL(), pR()); break
        case 13: seg(pB(), pR()); break
        case 14: seg(pL(), pB()); break
      }
    }
  }
  return d
}

const NLEV = 15
const paths = Array.from({ length: NLEV }, (_, k) => contour(fmin + ((fmax - fmin) * (k + 1)) / (NLEV + 1)))

export function FlowingContours() {
  const reduce = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-[-14%]" aria-hidden="true">
      <motion.svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        animate={reduce ? undefined : { x: ['0%', '3%', '-2%', '1%', '0%'], y: ['0%', '-2%', '2%', '-1%', '0%'] }}
        transition={reduce ? undefined : { duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      >
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(245,243,238,0.15)" strokeWidth={1} />
        ))}
      </motion.svg>
    </div>
  )
}
