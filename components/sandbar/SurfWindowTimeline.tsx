const INK = '#1A1A1A'
const MUTED = 'rgba(26,26,26,0.45)'

/**
 * The product's signature output: predicted surf quality across the morning,
 * with the best paddle-out window highlighted. A generic "4ft" forecast
 * becomes a shape with a peak.
 */
export function SurfWindowTimeline() {
  // x: 5AM→60 ... 10AM→760 (140px/hr). Lower y = higher quality.
  const topD =
    'M60,180 C130,165 270,120 340,95 C410,70 450,55 480,55 C540,55 580,95 620,120 C680,150 720,165 760,170'
  const areaD = `${topD} L760,210 L60,210 Z`
  const ticks = [
    { x: 60, label: '5a' },
    { x: 200, label: '6a' },
    { x: 340, label: '7a' },
    { x: 480, label: '8a' },
    { x: 620, label: '9a' },
    { x: 760, label: '10a' },
  ]

  return (
    <figure className="my-8">
      <svg viewBox="0 0 800 260" width="100%" role="img" aria-labelledby="surf-timeline-title">
        <title id="surf-timeline-title">
          Predicted surf quality rising from poor at dawn to a best window around 8AM, then declining
        </title>
        <defs>
          <linearGradient id="quality-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#93C5FD" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* best-window band */}
        <rect x="410" y="40" width="140" height="170" fill={INK} opacity="0.05" />
        <line x1="410" y1="40" x2="410" y2="210" stroke={MUTED} strokeWidth="1" strokeDasharray="4 5" />
        <line x1="550" y1="40" x2="550" y2="210" stroke={MUTED} strokeWidth="1" strokeDasharray="4 5" />

        {/* baseline */}
        <line x1="60" y1="210" x2="760" y2="210" stroke={INK} strokeWidth="1.5" />

        {/* quality curve */}
        <path d={areaD} fill="url(#quality-fill)" />
        <path d={topD} fill="none" stroke="#6366F1" strokeWidth="2.5" />

        {/* quality labels */}
        <text x="78" y="200" fontFamily="var(--font-mono)" fontSize="11" fill={MUTED}>Poor</text>
        <text x="210" y="138" fontFamily="var(--font-mono)" fontSize="11" fill={MUTED}>Fair</text>
        <text x="318" y="84" fontFamily="var(--font-mono)" fontSize="11" fill={INK}>Good</text>
        <text x="455" y="42" fontFamily="var(--font-mono)" fontSize="12" fill="#6366F1" fontWeight="600">Best</text>
        <text x="638" y="150" fontFamily="var(--font-mono)" fontSize="11" fill={MUTED}>Declining</text>

        {/* peak marker */}
        <circle cx="480" cy="55" r="4.5" fill="#6366F1" />

        {/* time ticks */}
        {ticks.map((t) => (
          <text
            key={t.x}
            x={t.x}
            y="234"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill={MUTED}
          >
            {t.label}
          </text>
        ))}

        {/* window caption */}
        <text x="480" y="30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={INK}>
          best window · 7:30–8:30
        </text>
      </svg>
      <figcaption className="font-mono font-medium text-xs tracking-[0.08em] mt-4 text-ink/55">
        PREDICTED SURF QUALITY ACROSS THE MORNING — THE WINDOW WORTH PADDLING OUT FOR
      </figcaption>
    </figure>
  )
}
