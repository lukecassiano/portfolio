const INK = '#1A1A1A'
const MUTED = 'rgba(26,26,26,0.45)'

/**
 * Inside the model: independent scoring modules — swell, wind, tide, learned
 * break behavior — combine (weighted by board compatibility) into a single
 * surf-quality score.
 */
export function ScoringModules() {
  const modules = [
    { y: 24, label: 'Swell alignment' },
    { y: 80, label: 'Wind' },
    { y: 136, label: 'Tide' },
    { y: 192, label: 'Break behavior' },
  ]
  const scoreCenter = { x: 660, y: 143 }

  return (
    <figure className="my-8">
      <svg viewBox="0 0 800 260" width="100%" role="img" aria-labelledby="scoring-title">
        <title id="scoring-title">
          Swell, wind, tide, and break-behavior modules combine into one surf-quality score
        </title>
        <defs>
          <marker id="sc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={MUTED} />
          </marker>
        </defs>

        {modules.map((m) => {
          const cy = m.y + 22
          return (
            <g key={m.label}>
              <rect x="30" y={m.y} width="190" height="44" rx="6" fill="none" stroke={INK} strokeWidth="1.5" />
              <text x="125" y={cy + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill={INK}>
                {m.label}
              </text>
              <line
                x1="220"
                y1={cy}
                x2="540"
                y2={scoreCenter.y}
                stroke={MUTED}
                strokeWidth="1.5"
                markerEnd="url(#sc-arrow)"
              />
            </g>
          )
        })}

        {/* score node */}
        <rect x="540" y="108" width="230" height="70" rx="8" fill={INK} />
        <text x="655" y="138" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="#F5F3EE">
          Surf quality score
        </text>
        <text x="655" y="159" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="rgba(245,243,238,0.55)">
          × board compatibility
        </text>
      </svg>
      <figcaption className="font-mono font-medium text-xs tracking-[0.08em] mt-4 text-ink/55">
        SWELL · WIND · TIDE · BREAK BEHAVIOR → ONE SCORE, TUNED TO YOUR BOARD
      </figcaption>
    </figure>
  )
}
