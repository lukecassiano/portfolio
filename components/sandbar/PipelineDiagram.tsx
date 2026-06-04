export function PipelineDiagram() {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 800 200"
        width="100%"
        role="img"
        aria-labelledby="pipeline-title"
        aria-label="Data pipeline diagram showing the flow from buoy data through NOAA grid to ensemble model to surf forecast output"
      >
        <title id="pipeline-title">Sandbar data pipeline: buoy data to NOAA grid to ensemble model to surf forecast</title>
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#1A1A1A" />
          </marker>
        </defs>
        {/* Stage 1: Buoy Data */}
        <rect x="20" y="70" width="140" height="60" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
        <text x="90" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#1A1A1A">Buoy Data</text>
        {/* Arrow 1→2 */}
        <line x1="160" y1="100" x2="200" y2="100" stroke="#1A1A1A" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* Stage 2: NOAA Grid */}
        <rect x="200" y="70" width="140" height="60" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
        <text x="270" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#1A1A1A">NOAA Grid</text>
        {/* Arrow 2→3 */}
        <line x1="340" y1="100" x2="380" y2="100" stroke="#1A1A1A" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* Stage 3: Ensemble Model (emphasized) */}
        <rect x="380" y="60" width="160" height="80" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="2" />
        <text x="460" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#1A1A1A">Ensemble Model</text>
        {/* Arrow 3→4 */}
        <line x1="540" y1="100" x2="580" y2="100" stroke="#1A1A1A" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* Stage 4: Surf Forecast */}
        <rect x="580" y="70" width="160" height="60" rx="4" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
        <text x="660" y="105" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#1A1A1A">Surf Forecast</text>
      </svg>
      <figcaption className="font-mono font-medium text-xs tracking-[0.08em] mt-4 text-center">
        BUOY DATA → NOAA GRID → ENSEMBLE MODEL → SURF FORECAST
      </figcaption>
    </figure>
  )
}
