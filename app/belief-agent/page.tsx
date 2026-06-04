import { GradientBlob } from '@/components/ui/GradientBlob'
import { BeliefLoopDiagram } from '@/components/belief/BeliefLoopDiagram'
import { CascadeLandscape } from '@/components/belief/CascadeLandscape'
import { Footer } from '@/components/ui/Footer'

export const metadata = {
  title: 'Belief Agent — Luke Cassiano',
  description:
    'A multi-agent system that reasons under uncertainty: explicit Bayesian beliefs, entropy-based trust, and precision-weighted communication between a sensor agent and a language agent.',
}

const HEADING = { fontSize: 'clamp(30px, 5vw, 56px)', lineHeight: 1.05 } as const

function NoiseTable() {
  const rows = [
    { noise: '0.10', none: '0.785', bi: '0.869', uni: '0.938' },
    { noise: '0.20', none: '0.594', bi: '0.711', uni: '0.796' },
    { noise: '0.30', none: '0.357', bi: '0.468', uni: '0.606' },
    { noise: '0.40', none: '0.183', bi: '0.269', uni: '0.415' },
    { noise: '0.50', none: '0.067', bi: '0.146', uni: '0.208' },
  ]
  return (
    <figure className="my-8 overflow-x-auto">
      <table className="w-full border-collapse font-mono text-xs md:text-sm">
        <caption className="sr-only">
          Joint accuracy (both agents correct) across noise levels, by communication topology
        </caption>
        <thead>
          <tr className="border-b border-cream/20 text-cream/55 uppercase tracking-[0.1em]">
            <th scope="col" className="py-3 pr-4 text-left font-medium">Noise</th>
            <th scope="col" className="py-3 px-4 text-right font-medium">No comm</th>
            <th scope="col" className="py-3 px-4 text-right font-medium">Bidirectional</th>
            <th scope="col" className="py-3 pl-4 text-right font-medium">Unidirectional</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.noise} className="border-b border-cream/10">
              <th scope="row" className="py-3 pr-4 text-left font-medium">{r.noise}</th>
              <td className="py-3 px-4 text-right text-cream/60">{r.none}</td>
              <td className="py-3 px-4 text-right text-cream/60">{r.bi}</td>
              <td className="py-3 pl-4 text-right text-[#4ADE80]">{r.uni}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="font-mono font-medium text-xs tracking-[0.04em] mt-4 text-cream/55">
        JOINT ACCURACY (BOTH AGENTS CORRECT) — UNIDIRECTIONAL WINS AT EVERY NOISE LEVEL ABOVE ZERO
      </figcaption>
    </figure>
  )
}

export default function BeliefAgentPage() {
  return (
    <main id="main-content">
      <article className="relative min-h-screen overflow-hidden bg-[#0D0D12] text-cream px-8 py-16 lg:px-16">
        <GradientBlob
          colors={['#312E81', '#4ADE80']}
          size="60vmax"
          position={{ top: '-10%', right: '-15%' }}
          blur="120px"
          duration={20}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Back navigation */}
          <a
            href="/"
            className="font-mono font-medium text-xs tracking-[0.08em] uppercase hover:opacity-60 transition-opacity duration-200 mb-16 inline-block"
          >
            ← Back
          </a>

          <p className="font-mono font-medium text-xs uppercase tracking-[0.18em] text-cream/55">
            02 — Research
          </p>

          <h1 className="wordmark mt-4" style={HEADING}>
            Belief Agent
          </h1>

          <p className="font-mono font-medium text-base leading-relaxed mt-6 max-w-xl">
            A study in how artificial agents should reason — and communicate — when they are
            uncertain and the information they are handed might be wrong.
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">
            <a
              href="https://belief-agent.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-medium text-xs tracking-wide text-cream hover:opacity-60 transition-opacity duration-200"
            >
              Live demo →<span className="sr-only"> (opens in new tab)</span>
            </a>
            <a
              href="https://github.com/lukecassiano/belief-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-medium text-xs tracking-wide text-cream hover:opacity-60 transition-opacity duration-200"
            >
              GitHub →<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>

          {/* Premise */}
          <section aria-labelledby="s-premise" className="py-14">
            <h2 id="s-premise" className="wordmark" style={HEADING}>Premise</h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Most models output answers. Belief Agent instead gives each agent an explicit
              probability distribution over the world, a measure of its own uncertainty — Shannon
              entropy — and a channel to talk to another agent. Then it stress-tests what happens
              when two agents with different-quality evidence have to agree.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The interesting failures aren&apos;t in the inference math. They&apos;re in the
              communication: how confident-but-wrong sources, ambiguous language, and naive memory
              quietly corrupt a system that would have done fine on its own.
            </p>
          </section>

          {/* Setup */}
          <section aria-labelledby="s-setup" className="py-14">
            <h2 id="s-setup" className="wordmark" style={HEADING}>The Setup</h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Each episode hides a true goal — one of three states, A, B, or C. Two agents try to
              infer it. A <span className="text-[#4ADE80]">Sensor agent</span> reads a noisy
              observation that points at the truth roughly 70% of the time. A{' '}
              <span className="text-[#818CF8]">Language agent</span> receives natural-language clues
              — &quot;not B&quot;, &quot;either A or C&quot; — that are frequently ambiguous or
              outright misleading.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Both maintain a belief vector, update it with Bayes&apos; rule, and broadcast a message
              each step. The catch: every message is weighted by the sender&apos;s precision — how
              low-entropy, how confident, it currently is. An uncertain agent&apos;s message should
              move you less than a certain one&apos;s.
            </p>
          </section>

          {/* Branch A */}
          <section aria-labelledby="s-inference" className="py-14">
            <h2 id="s-inference" className="wordmark" style={HEADING}>
              Inference Under Uncertainty
            </h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The first version used hard logical constraints. A clue like &quot;either B or C&quot;
              drove A&apos;s probability to exactly zero — and once Bayes multiplies a hypothesis by
              zero, nothing can revive it. A single misleading clue could permanently eliminate the
              correct answer, and two agents in conversation would reinforce each other straight into
              a confident, wrong consensus — a belief-collapse attractor.
            </p>

            <CascadeLandscape />

            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The fix was epistemic humility, encoded numerically: replace hard zeros with a small
              probability floor so no hypothesis is ever truly dead, soften &quot;not&quot; messages
              so they nudge rather than veto, and weight every incoming message by the sender&apos;s
              precision. Trusting confident sources more than uncertain ones did most of the work.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              The sharpest result came from the communication topology itself. The sensor stream is
              strong and compounds evidence over time; the language stream is weak and often
              misleading. Symmetric two-way fusion dragged the strong agent down toward the weak
              one. Letting the weak agent listen to the strong one — but <em>not</em> the reverse —
              kept the sensor intact while pulling the language agent up.
            </p>

            <BeliefLoopDiagram />

            <NoiseTable />

            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Under noise, unidirectional communication delivered up to a 2–4× improvement in joint
              accuracy over bidirectional fusion, with no sign of the herding that makes two agents
              agree more often than they&apos;re right.
            </p>
          </section>

          {/* Branch B */}
          <section aria-labelledby="s-memory" className="py-14">
            <h2 id="s-memory" className="wordmark" style={HEADING}>The Memory Trap</h2>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Adding episodic memory — letting an agent recall what it did in similar past situations
              — backfired. Naive memory weighted recall by belief and cue similarity times
              confidence, so it learned the most <em>frequent</em> action, not the most{' '}
              <em>useful</em> one. Under noise it became a habit system, reflexively repeating common
              messages and ignoring current evidence. With memory on, the language agent was
              measurably <em>less</em> accurate than without it — imitation learning of its own
              behavior, which is exactly how habits form.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed mt-4">
              Three changes turned memory from a liability into a gain: label each stored step with
              whether the episode actually succeeded (so the agent imitates wins, not frequencies),
              gate retrieval on entropy (only lean on memory when genuinely uncertain), and give the
              agent a learned reliability model that tracks whether its language source has been
              truthful so far this episode — up-weighting it when consistent, down-weighting it when
              it contradicts the sensor stream.
            </p>
          </section>

          {/* Findings */}
          <section aria-labelledby="s-findings" className="py-14">
            <h2 id="s-findings" className="wordmark" style={HEADING}>What It Shows</h2>
            <ol className="flex flex-col gap-4 mt-4">
              <li className="font-mono font-medium text-base leading-relaxed">
                <span className="text-[#4ADE80]">01 ·</span> Communication isn&apos;t neutral. It can
                contaminate a high-quality evidence stream as easily as it rescues a weak one.
              </li>
              <li className="font-mono font-medium text-base leading-relaxed">
                <span className="text-[#4ADE80]">02 ·</span> Trust should scale with the sender&apos;s
                uncertainty. Adaptive, precision-weighted trust beats any fixed weight.
              </li>
              <li className="font-mono font-medium text-base leading-relaxed">
                <span className="text-[#4ADE80]">03 ·</span> Under asymmetric reliability,
                unidirectional precision-weighted communication is strictly more robust than
                symmetric fusion.
              </li>
            </ol>
            <p className="font-mono font-medium text-base leading-relaxed mt-6">
              These are the same failure modes that show up in multi-agent LLM systems, sensor
              fusion, and human committees: confident-but-wrong voices, herding, and memory that
              rewards the familiar over the correct. Belief Agent is a small, legible sandbox for
              reasoning about all three.
            </p>
          </section>

          <Footer />
        </div>
      </article>
    </main>
  )
}
