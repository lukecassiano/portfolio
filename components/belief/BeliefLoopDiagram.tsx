const CREAM = '#F5F3EE'
const GREEN = '#4ADE80'
const INDIGO = '#818CF8'
const MUTED = 'rgba(245,243,238,0.45)'

/**
 * Communication topology: a strong Sensor agent feeds a weak Language agent
 * through a single precision-weighted channel. S does not listen back — the
 * arrangement that out-performed symmetric fusion under noise.
 */
export function BeliefLoopDiagram() {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 800 260"
        width="100%"
        role="img"
        aria-labelledby="belief-loop-title"
      >
        <title id="belief-loop-title">
          Sensor agent sends a precision-weighted message to the Language agent in one direction only
        </title>
        <defs>
          <marker id="bl-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={GREEN} />
          </marker>
        </defs>

        {/* Sensor agent */}
        <rect x="40" y="70" width="240" height="120" rx="10" fill="none" stroke={GREEN} strokeWidth="2" />
        <text x="60" y="104" fontFamily="var(--font-mono)" fontSize="15" fill={CREAM}>Sensor agent (S)</text>
        <text x="60" y="130" fontFamily="var(--font-mono)" fontSize="12" fill={MUTED}>obs → truth ~70%</text>
        {/* belief bars */}
        <rect x="60" y="146" width="78" height="10" fill={GREEN} />
        <rect x="142" y="146" width="20" height="10" fill={MUTED} />
        <rect x="166" y="146" width="14" height="10" fill={MUTED} />
        <text x="60" y="176" fontFamily="var(--font-mono)" fontSize="12" fill={MUTED}>low entropy · high precision</text>

        {/* Language agent */}
        <rect x="520" y="70" width="240" height="120" rx="10" fill="none" stroke={INDIGO} strokeWidth="2" />
        <text x="540" y="104" fontFamily="var(--font-mono)" fontSize="15" fill={CREAM}>Language agent (L)</text>
        <text x="540" y="130" fontFamily="var(--font-mono)" fontSize="12" fill={MUTED}>noisy / ambiguous clues</text>
        {/* belief bars */}
        <rect x="540" y="146" width="34" height="10" fill={INDIGO} />
        <rect x="578" y="146" width="40" height="10" fill={MUTED} />
        <rect x="622" y="146" width="30" height="10" fill={MUTED} />
        <text x="540" y="176" fontFamily="var(--font-mono)" fontSize="12" fill={MUTED}>high entropy · listens to S</text>

        {/* Unidirectional channel */}
        <line x1="280" y1="120" x2="516" y2="120" stroke={GREEN} strokeWidth="2" markerEnd="url(#bl-arrow)" />
        <text x="398" y="108" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill={CREAM}>
          precision-weighted message
        </text>
        {/* Severed back-channel */}
        <line x1="516" y1="150" x2="284" y2="150" stroke={MUTED} strokeWidth="1.5" strokeDasharray="5 6" />
        <text x="398" y="170" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill={MUTED}>
          S ignores L  ✕
        </text>
      </svg>
      <figcaption className="font-mono font-medium text-xs tracking-[0.04em] mt-4 text-cream/55">
        STRONG → WEAK, ONE WAY · THE TOPOLOGY THAT AVOIDS CONTAMINATING THE SENSOR STREAM
      </figcaption>
    </figure>
  )
}
