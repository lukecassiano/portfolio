'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { DOM, landscape, norm, jet, descent } from './lossLandscape'

const N = 17 // grid resolution
const W = 560
const H = 440
const CX = 280
const CY = 240
const SX = 48 // horizontal scale
const DEPTH = 30 // depth (y-axis) scale
const HEIGHT = 120 // vertical (z) scale

type Node = { x: number; y: number; t: number }

export function LossSurface3D() {
  const reduce = useReducedMotion()
  const [az, setAz] = useState(0.7)
  const drag = useRef<{ px: number; az: number } | null>(null)
  const hovering = useRef(false)
  const visible = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto slow-rotation — pauses on hover, drag, off-screen, or reduced-motion.
  useEffect(() => {
    if (reduce) return
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting }, { threshold: 0.1 })
    io.observe(el)
    let raf = 0
    let last = performance.now()
    let acc = 0
    const tick = (now: number) => {
      const dt = now - last
      last = now
      if (visible.current && !hovering.current && !drag.current) {
        acc += dt
        if (acc > 55) {
          setAz((a) => a + 0.00019 * acc) // ~one slow turn / 30s
          acc = 0
        }
      } else {
        acc = 0
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [reduce])

  // Geometry is constant; only the projection rotates.
  const { nodes, segments, path } = useMemo(() => {
    const nodes: Node[] = []
    const idx = (i: number, j: number) => i * (N + 1) + j
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        const x = -DOM + (2 * DOM * i) / N
        const y = -DOM + (2 * DOM * j) / N
        nodes.push({ x, y, t: norm(landscape(x, y)) })
      }
    }
    const segments: { a: number; b: number; color: string }[] = []
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        if (i < N) {
          const a = idx(i, j)
          const b = idx(i + 1, j)
          segments.push({ a, b, color: jet((nodes[a].t + nodes[b].t) / 2) })
        }
        if (j < N) {
          const a = idx(i, j)
          const b = idx(i, j + 1)
          segments.push({ a, b, color: jet((nodes[a].t + nodes[b].t) / 2) })
        }
      }
    }
    const path = descent({ x: 0.3, y: -0.2 }).filter((_, k) => k % 2 === 0)
    return { nodes, segments, path }
  }, [])

  const sin = Math.sin(az)
  const cos = Math.cos(az)

  const project = (x: number, y: number, t: number) => {
    const xr = x * cos - y * sin
    const yr = x * sin + y * cos
    return {
      sx: CX + xr * SX,
      sy: CY - yr * DEPTH - (t - 0.5) * HEIGHT,
      depth: yr,
    }
  }

  const proj = nodes.map((n) => project(n.x, n.y, n.t))

  const drawn = segments
    .map((s) => {
      const a = proj[s.a]
      const b = proj[s.b]
      return { ...s, x1: a.sx, y1: a.sy, x2: b.sx, y2: b.sy, depth: (a.depth + b.depth) / 2 }
    })
    .sort((p, q) => q.depth - p.depth) // far (large yr) first

  const projPath = path.map((p) => project(p.x, p.y, norm(landscape(p.x, p.y))))

  function onDown(e: React.PointerEvent) {
    drag.current = { px: e.clientX, az }
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }
  function onMove(e: React.PointerEvent) {
    if (!drag.current) return
    setAz(drag.current.az + (e.clientX - drag.current.px) * 0.01)
  }
  function onUp() {
    drag.current = null
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Interactive 3-D loss surface with a gradient-descent path falling into a basin"
        className="cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerEnter={() => { hovering.current = true }}
        onPointerLeave={() => { hovering.current = false; onUp() }}
      >
        {drawn.map((s, i) => (
          <line
            key={i}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke={s.color}
            strokeWidth={1.1}
            strokeOpacity={0.85}
          />
        ))}

        {/* descent path */}
        <polyline
          points={projPath.map((p) => `${p.sx},${p.sy}`).join(' ')}
          fill="none"
          stroke="#0D0D12"
          strokeWidth={3}
          strokeOpacity={0.8}
        />
        <polyline
          points={projPath.map((p) => `${p.sx},${p.sy}`).join(' ')}
          fill="none"
          stroke="#F5F3EE"
          strokeWidth={1.6}
        />
        {projPath.map((p, i) => (
          <circle
            key={i}
            cx={p.sx}
            cy={p.sy}
            r={i === projPath.length - 1 ? 5 : 3}
            fill={i === projPath.length - 1 ? '#FB7185' : '#F5F3EE'}
            stroke="#0D0D12"
            strokeWidth={1}
          />
        ))}
      </svg>
      <p className="font-mono font-medium text-[10px] uppercase tracking-[0.14em] text-cream/45 text-center">
        3-D loss surface · drag to rotate ⟲
      </p>
    </div>
  )
}
