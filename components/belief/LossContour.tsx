import {
  DOM,
  landscape,
  norm,
  jet,
  descent,
  ZMIN,
  ZMAX,
  WRONG_MIN,
  TRUE_MIN,
  type Pt,
} from './lossLandscape'

const SIZE = 460
const PAD = 6
const INNER = SIZE - 2 * PAD

const sx = (x: number) => PAD + ((x + DOM) / (2 * DOM)) * INNER
const sy = (y: number) => PAD + ((DOM - y) / (2 * DOM)) * INNER // +y up

// ---- heatmap ----
const NC = 40
const cell = INNER / NC
const heat: { x: number; y: number; fill: string }[] = []
for (let ci = 0; ci < NC; ci++) {
  for (let cj = 0; cj < NC; cj++) {
    const x = -DOM + (2 * DOM * (ci + 0.5)) / NC
    const y = -DOM + (2 * DOM * (cj + 0.5)) / NC
    heat.push({
      x: PAD + (ci / NC) * INNER,
      y: PAD + ((NC - 1 - cj) / NC) * INNER,
      fill: jet(norm(landscape(x, y))),
    })
  }
}

// ---- contour lines via marching squares ----
const R = 80
const V: number[][] = []
const xs: number[] = []
const ys: number[] = []
for (let i = 0; i <= R; i++) xs.push(-DOM + (2 * DOM * i) / R)
for (let j = 0; j <= R; j++) ys.push(-DOM + (2 * DOM * j) / R)
for (let i = 0; i <= R; i++) {
  V[i] = []
  for (let j = 0; j <= R; j++) V[i][j] = landscape(xs[i], ys[j])
}

function contourPath(level: number): string {
  let d = ''
  const lerp = (a: number, b: number) => (Math.abs(b - a) < 1e-9 ? 0.5 : (level - a) / (b - a))
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < R; j++) {
      const c00 = V[i][j] // BL
      const c10 = V[i + 1][j] // BR
      const c11 = V[i + 1][j + 1] // TR
      const c01 = V[i][j + 1] // TL
      const idx =
        (c00 > level ? 1 : 0) |
        (c10 > level ? 2 : 0) |
        (c11 > level ? 4 : 0) |
        (c01 > level ? 8 : 0)
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
        d += `M${sx(a[0]).toFixed(1)},${sy(a[1]).toFixed(1)}L${sx(b[0]).toFixed(1)},${sy(b[1]).toFixed(1)}`
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

const NLEV = 12
const levels = Array.from({ length: NLEV }, (_, k) => ZMIN + ((ZMAX - ZMIN) * (k + 1)) / (NLEV + 1))
const contours = levels.map(contourPath)

const trajPoints = (path: Pt[]) => path.map((p) => `${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' ')
const wrongPath = descent({ x: 0.3, y: -0.2 })
const goalPath = descent({ x: 1.9, y: 2.3 })

export function LossContour() {
  return (
    <div className="flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        role="img"
        aria-label="Top-down contour map of the loss surface with gradient-descent trajectories converging on minima"
        className="rounded-lg overflow-hidden"
      >
        {/* heatmap */}
        {heat.map((h, i) => (
          <rect
            key={i}
            x={h.x}
            y={h.y}
            width={cell + 0.6}
            height={cell + 0.6}
            fill={h.fill}
            shapeRendering="crispEdges"
          />
        ))}

        {/* contour lines */}
        {contours.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(13,13,18,0.4)" strokeWidth={0.8} />
        ))}

        {/* descent into the true goal (secondary) */}
        <polyline points={trajPoints(goalPath)} fill="none" stroke="#0D0D12" strokeWidth={3.5} strokeOpacity={0.5} />
        <polyline points={trajPoints(goalPath)} fill="none" stroke="#4ADE80" strokeWidth={2} />

        {/* descent into the wrong attractor (primary) */}
        <polyline points={trajPoints(wrongPath)} fill="none" stroke="#0D0D12" strokeWidth={4} strokeOpacity={0.5} />
        <polyline points={trajPoints(wrongPath)} fill="none" stroke="#FB7185" strokeWidth={2.4} />
        {wrongPath.filter((_, k) => k % 4 === 0).map((p, i) => (
          <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={3} fill="#FB7185" stroke="#0D0D12" strokeWidth={0.8} />
        ))}

        {/* minima markers */}
        <circle cx={sx(WRONG_MIN.x)} cy={sy(WRONG_MIN.y)} r={5} fill="#FB7185" stroke="#0D0D12" strokeWidth={1.5} />
        <circle cx={sx(TRUE_MIN.x)} cy={sy(TRUE_MIN.y)} r={5} fill="none" stroke="#4ADE80" strokeWidth={2} />

        <text
          x={sx(WRONG_MIN.x)}
          y={sy(WRONG_MIN.y) + 22}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="12"
          fill="#fff"
          style={{ paintOrder: 'stroke', stroke: 'rgba(13,13,18,0.65)', strokeWidth: 3 }}
        >
          wrong attractor
        </text>
        <text
          x={sx(TRUE_MIN.x)}
          y={sy(TRUE_MIN.y) - 14}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="12"
          fill="#fff"
          style={{ paintOrder: 'stroke', stroke: 'rgba(13,13,18,0.65)', strokeWidth: 3 }}
        >
          true goal (A)
        </text>
      </svg>
      <p className="font-mono font-medium text-[10px] uppercase tracking-[0.14em] text-cream/45 text-center">
        top-down contour · trajectories descend into the basins
      </p>
    </div>
  )
}
