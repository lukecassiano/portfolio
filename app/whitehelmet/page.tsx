import { GradientBlob } from '@/components/ui/GradientBlob'
import { ConsolidationDiagram } from '@/components/whitehelmet/ConsolidationDiagram'
import { Footer } from '@/components/ui/Footer'

export const metadata = {
  title: 'WhiteHelmet — Luke Cassiano',
  description:
    'AI consolidation and master-template generation for WhiteHelmet (Salama): turning inconsistent subcontractor spreadsheets into one trustworthy master dataset.',
}

const HEADING = { fontSize: 'clamp(30px, 5vw, 56px)', lineHeight: 1.05 } as const

const FLOW = [
  { n: '01', label: 'Submissions', body: 'Heterogeneous sheets from many subcontractors — inconsistent columns, formats, and schemas, each ingested as a structured snapshot.' },
  { n: '02', label: 'Intent → Operations', body: 'Plain-language commands are parsed into structured operations. The AI acts as a compiler, mapping intent to functions — it never edits the source files.' },
  { n: '03', label: 'PM Review', body: 'A deterministic spreadsheet engine executes the operations. PMs review only flagged conflicts; commands apply iteratively until the output is clean.' },
  { n: '04', label: 'Master Dataset', body: 'A unified, structured master sheet built from confirmed transformations — exportable and ready for leadership, lenders, and auditors.' },
]

export default function WhiteHelmetPage() {
  return (
    <main id="main-content">
      <article className="relative min-h-screen overflow-hidden bg-[#F5F3EE] text-ink px-8 py-16 lg:px-16">
        <GradientBlob
          colors={['#D97706', '#A8A29E']}
          size="55vmax"
          position={{ bottom: '-20%', right: '-12%' }}
          blur="100px"
          duration={18}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Back navigation */}
          <a
            href="/"
            className="font-mono font-medium text-xs tracking-[0.08em] uppercase hover:opacity-60 transition-opacity duration-200 mb-16 inline-block"
          >
            ← Back
          </a>

          <p className="font-mono font-medium text-xs uppercase tracking-[0.18em] text-ink/50">
            03 — Product · Team
          </p>

          <h1 className="wordmark mt-4" style={HEADING}>
            WhiteHelmet
          </h1>

          <p className="font-mono font-medium text-base leading-relaxed mt-6 max-w-xl">
            AI that turns a mess of subcontractor spreadsheets into one master report a project
            manager can actually trust. Built with a Product Space team for WhiteHelmet, a
            construction-intelligence platform.
          </p>

          {/* Context */}
          <section aria-labelledby="s-context" className="py-14">
            <h2 id="s-context" className="wordmark" style={HEADING}>Context</h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              On a large construction project, progress data lives in dozens of disconnected
              subcontractor spreadsheets — every one with its own columns, formats, and conventions.
              Directors of operations describe wasting hours chasing files from every system and
              fixing them by hand just to get one clear picture. The product, Salama, exists to
              collapse that chaos into a single source of truth.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The recurring complaint across the people we interviewed — finance directors, project
              directors, and the PMs in the middle — wasn&apos;t missing data. It was reconciliation:
              no single view, stale reports, and hours lost to inconsistent column naming that quietly
              breaks every aggregation.
            </p>
          </section>

          {/* My role */}
          <section aria-labelledby="s-role" className="py-14">
            <h2 id="s-role" className="wordmark" style={HEADING}>My Role</h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              I owned <span className="font-bold">AI consolidation and master-template generation</span>
              {' '}— the two pieces that turn raw, mismatched submissions into a governed output.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              For <span className="font-bold">master-template generation</span>, the system supports two
              paths: a PM can ideate a template conversationally — defining structure, required fields,
              and validation rules in plain language until the draft matches their needs — or upload an
              existing Excel template that the system parses and converts into a managed master sheet,
              preserving the original structure while making it editable and version-controlled.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              For <span className="font-bold">consolidation</span>, the key design decision was treating
              the language model as a <span className="font-bold">compiler, not a data editor</span>. PMs
              describe what they want in natural language; the model translates that intent into
              structured operations, which a deterministic spreadsheet engine then executes. The AI never
              touches the source files directly — so the output is reliable, auditable, and reproducible
              rather than a black-box rewrite.
            </p>
          </section>

          {/* How it works */}
          <section aria-labelledby="s-flow" className="py-14">
            <h2 id="s-flow" className="wordmark" style={HEADING}>How Consolidation Works</h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4 mb-8">
              One click ingests every subcontractor submission into a single master sheet, normalizing
              varying formats into a unified output while keeping all logic configurable and
              PM-controlled.
            </p>

            <ConsolidationDiagram />

            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
              {FLOW.map((step) => (
                <li key={step.n} className="bg-[#F5F3EE] p-6 flex flex-col gap-3">
                  <span className="font-mono font-medium text-xs uppercase tracking-[0.14em] text-ink/45">
                    {step.n}
                  </span>
                  <span className="wordmark" style={{ fontSize: 'clamp(18px, 2.4vw, 24px)', lineHeight: 1.1 }}>
                    {step.label}
                  </span>
                  <span className="font-mono font-medium text-sm leading-relaxed text-ink/80">
                    {step.body}
                  </span>
                </li>
              ))}
            </ol>

            <p className="font-mono font-medium text-base leading-relaxed mt-8">
              On top of consolidation sits a reusable formula library — formulas authored in plain
              language, applied to any column, row, cell, or range, and saved to reuse across templates
              and reporting cycles. The whole lifecycle, from template creation to final export, lives in
              one dashboard.
            </p>
          </section>

          {/* What's next */}
          <section aria-labelledby="s-next" className="py-14">
            <h2 id="s-next" className="wordmark" style={HEADING}>{"What's Next"}</h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The MVP&apos;s next steps are integrating with WhiteHelmet&apos;s own authentication and
              database, expanding the generative feature set beyond consolidation and formulas, and
              tightening the UI for the day-to-day PM workflow. The throughline stays the same: take the
              interpretation burden off the human and hand back a clean, trustworthy master record.
            </p>
          </section>

          <Footer />
        </div>
      </article>
    </main>
  )
}
