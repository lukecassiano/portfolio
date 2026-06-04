import { PipelineDiagram } from '@/components/sandbar/PipelineDiagram'
import { Footer } from '@/components/ui/Footer'

export const metadata = {
  title: 'Sandbar — Luke Cassiano',
  description: 'Agentic surf forecasting: translating buoy data and NOAA grid forecasts into actionable surf predictions with 87% accuracy.',
}

export default function SandbarPage() {
  return (
    <main id="main-content">
      <article className="min-h-screen bg-[#F5F3EE] px-8 py-16 lg:px-16">
        <div className="max-w-2xl mx-auto">

          {/* Back navigation */}
          <a
            href="/"
            className="font-mono font-medium text-xs tracking-[0.08em] uppercase hover:opacity-60 transition-opacity duration-200 mb-16 inline-block"
          >
            ← Back
          </a>

          {/* Page h1 */}
          <h1 className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
            Sandbar
          </h1>

          {/* Hero stat block */}
          <div className="flex flex-col gap-1 my-8">
            <p className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>87%</p>
            <p className="font-mono font-medium text-xs uppercase tracking-[0.08em]">FORECAST ACCURACY</p>
          </div>

          {/* Section: Problem */}
          <section aria-labelledby="section-problem" className="py-16">
            <h2
              id="section-problem"
              className="wordmark"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}
            >
              Problem
            </h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Surf forecasting is broken for people who actually surf. Generic swell forecasts report open-ocean
              numbers — wave height, period, direction — but can&apos;t account for how local bathymetry, wind timing,
              and tide phase interact at a specific break. What reads as a solid 4-foot swell at the buoy might
              arrive as closeout slop or a perfect A-frame depending on dozens of variables the forecast ignores.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The result is forecasts that are technically accurate and practically useless. Surfers learn to
              distrust them and develop their own mental models from experience — which works, but only for breaks
              they know well and only if they have the time to triangulate multiple sources by hand.
            </p>
          </section>

          {/* Section: Insight */}
          <section aria-labelledby="section-insight" className="py-16">
            <h2
              id="section-insight"
              className="wordmark"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}
            >
              Insight
            </h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The forecast signal lives in the combination of sources, not any single one. Buoy data is ground
              truth — it tells you what the ocean is actually doing right now. NOAA grid forecasts are context —
              they tell you what&apos;s coming and from where. The ensemble logic that reconciles them against
              historical spot behavior is the differentiator — it&apos;s where ambiguous signal becomes something
              legible and trustworthy enough to act on.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Good surfers already do this synthesis intuitively. They check the buoy, glance at the swell chart,
              factor in the tide, and make a call based on how all of it has played out at that break before.
              Sandbar makes that process systematic — and available to anyone, for any break, without years of
              local experience.
            </p>
          </section>

          {/* Section: Product */}
          <section aria-labelledby="section-product" className="py-16">
            <h2
              id="section-product"
              className="wordmark"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}
            >
              Product
            </h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Sandbar is a forecast agent that thinks like a local. It ingests live buoy observations and NOAA
              grid forecasts, runs them through an ensemble model calibrated against historical spot behavior, and
              returns a spot-specific call — wave height range, quality rating, and a confidence score. The
              pipeline below traces that flow.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The result is 87% forecast accuracy against observed conditions — measured against surfer reports
              from the same sessions. That number isn&apos;t just a benchmark; it&apos;s a signal that the synthesis
              is working, that the model has learned to weight sources the way an experienced local would.
            </p>
            <PipelineDiagram />
          </section>

          {/* Section: Under the Hood */}
          <section aria-labelledby="section-under-the-hood" className="py-16">
            <h2
              id="section-under-the-hood"
              className="wordmark"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}
            >
              Under the Hood
            </h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The agentic pipeline ingests buoy observations and NOAA grid forecasts on a rolling schedule, runs
              them through an ensemble model that weighs each source against historical spot behavior, then scores
              the output for confidence. Low-confidence forecasts are flagged rather than hidden — if the model
              isn&apos;t sure, the user should know that.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The ensemble layer is where the intelligence lives. Rather than applying a single model uniformly,
              it adapts its source weighting based on conditions — leaning on buoy data when swell is long-period
              and well-organized, weighting NOAA grids more heavily when a system is still offshore. The goal is
              to replicate the judgment a local surfer applies without requiring the years of observation that
              judgment normally demands.
            </p>
          </section>

          {/* Section: What's Next */}
          <section aria-labelledby="section-whats-next" className="py-16">
            <h2
              id="section-whats-next"
              className="wordmark"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}
            >
              {"What's Next"}
            </h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Real-time buoy webhooks will replace the current polling schedule — bringing latency down from
              minutes to seconds when a swell event arrives. Coverage is expanding to more breaks, with each new
              spot improving the ensemble&apos;s generalization. The longer-term goal is a community validation loop
              that lets local surfers correct the model and sharpen it over time — turning accumulated local
              knowledge into a shared, machine-readable resource.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Sandbar is in private beta. If you surf and want early access, reach out.
            </p>
          </section>

          <Footer />

        </div>
      </article>
    </main>
  )
}
