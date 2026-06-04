const INK = '#1A1A1A'
const MUTED = 'rgba(26,26,26,0.45)'

/**
 * Many mismatched subcontractor sheets → an AI-as-compiler step that emits
 * structured operations → a deterministic engine → one master dataset.
 */
export function ConsolidationDiagram() {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 800 240"
        width="100%"
        role="img"
        aria-labelledby="consolidation-title"
      >
        <title id="consolidation-title">
          Inconsistent subcontractor sheets are compiled into structured operations and executed into one master dataset
        </title>
        <defs>
          <marker id="wh-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={INK} />
          </marker>
        </defs>

        {/* Stacked source sheets */}
        <rect x="36" y="58" width="120" height="120" rx="6" fill="none" stroke={MUTED} strokeWidth="1.5" />
        <rect x="26" y="48" width="120" height="120" rx="6" fill="none" stroke={MUTED} strokeWidth="1.5" />
        <rect x="16" y="38" width="120" height="120" rx="6" fill="#F5F3EE" stroke={INK} strokeWidth="1.5" />
        <text x="76" y="92" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill={INK}>Subcontractor</text>
        <text x="76" y="110" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill={INK}>sheets</text>
        <text x="76" y="128" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={MUTED}>mixed schemas</text>

        <line x1="156" y1="98" x2="216" y2="98" stroke={INK} strokeWidth="1.5" markerEnd="url(#wh-arrow)" />

        {/* AI compiler */}
        <rect x="216" y="48" width="180" height="100" rx="6" fill="none" stroke={INK} strokeWidth="2" />
        <text x="306" y="92" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill={INK}>AI compiler</text>
        <text x="306" y="110" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={MUTED}>intent → operations</text>

        <line x1="396" y1="98" x2="456" y2="98" stroke={INK} strokeWidth="1.5" markerEnd="url(#wh-arrow)" />

        {/* Engine */}
        <rect x="456" y="48" width="160" height="100" rx="6" fill="none" stroke={INK} strokeWidth="1.5" />
        <text x="536" y="92" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill={INK}>Spreadsheet</text>
        <text x="536" y="110" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill={INK}>engine</text>

        <line x1="616" y1="98" x2="660" y2="98" stroke={INK} strokeWidth="1.5" markerEnd="url(#wh-arrow)" />

        {/* Master sheet */}
        <rect x="660" y="38" width="120" height="120" rx="6" fill={INK} stroke={INK} strokeWidth="1.5" />
        <text x="720" y="92" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#F5F3EE">Master</text>
        <text x="720" y="110" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="#F5F3EE">dataset</text>

        <text x="306" y="186" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={MUTED}>
          AI never edits source files
        </text>
      </svg>
      <figcaption className="font-mono font-medium text-xs tracking-[0.08em] mt-4 text-ink/55">
        SHEETS → AI COMPILER → ENGINE → MASTER DATASET
      </figcaption>
    </figure>
  )
}
