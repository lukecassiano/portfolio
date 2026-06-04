import { PipelineDiagram } from '@/components/sandbar/PipelineDiagram'
import { SurfWindowTimeline } from '@/components/sandbar/SurfWindowTimeline'
import { ScoringModules } from '@/components/sandbar/ScoringModules'
import { Footer } from '@/components/ui/Footer'

export const metadata = {
  title: 'Sandbar — Luke Cassiano',
  description: 'Agentic surf forecasting: translating buoy data and NOAA grid forecasts into actionable, break-specific surf predictions.',
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
          <h1
            className="wordmark"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              lineHeight: 1.1,
              backgroundImage: 'linear-gradient(100deg, #F4A8C7 0%, #C4B5FD 50%, #93C5FD 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            Sandbar
          </h1>

          {/* Hero positioning */}
          <p className="font-mono font-medium text-base leading-relaxed my-8 max-w-xl">
            Agentic surf forecasting that reads a break like a local — translating buoy data
            and NOAA grid forecasts into a spot-specific call on when to paddle out.
          </p>

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
              Sandbar&apos;s core output isn&apos;t a number — it&apos;s a timeline. For a given break it predicts
              how surf quality rises and falls across the morning and marks the window actually worth paddling out
              for. What a generic forecast flattens into &quot;4ft all day&quot; becomes a shape: fair at dawn,
              building to a short best window, then declining as the tide or wind turns.
            </p>
            <SurfWindowTimeline />
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Because the right wave depends on what you ride, every call is board-aware — the same morning can read
              &quot;good&quot; on a log and &quot;poor&quot; on a shortboard. You describe your quiver once, and board
              compatibility factors into the score from then on. The question Sandbar answers isn&apos;t &quot;what
              are the conditions?&quot; — it&apos;s &quot;when should I paddle out?&quot;
            </p>
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
              The agentic pipeline ingests buoy observations and NOAA grid forecasts on a rolling schedule,
              reconciles them against historical spot behavior, then scores the output for confidence.
              Low-confidence forecasts are flagged rather than hidden — if the model isn&apos;t sure, the user
              should know that.
            </p>
            <PipelineDiagram />
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              That score is a composite. Separate modules evaluate swell alignment, wind, tide, and learned break
              behavior — each contributing to a single surf-quality score, then weighted by how well the conditions
              suit the board you&apos;re on. It&apos;s the synthesis an experienced local does intuitively, made
              explicit and repeatable.
            </p>
            <ScoringModules />
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The ensemble adapts its source weighting to conditions — leaning on buoy data when swell is
              long-period and well-organized, weighting NOAA grids more heavily when a system is still offshore.
              The goal is to replicate the judgment a local surfer applies without requiring the years of
              observation it normally demands.
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
