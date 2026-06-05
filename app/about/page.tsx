import { GradientBlob } from '@/components/ui/GradientBlob'
import { Footer } from '@/components/ui/Footer'

export const metadata = {
  title: 'About — Luke Cassiano',
  description:
    'Luke Cassiano — cognitive science and neuroscience at UC Berkeley, building at the surface where physics, mind, and music meet.',
}

const HEADING = { fontSize: 'clamp(30px, 5vw, 56px)', lineHeight: 1.05 } as const

export default function AboutPage() {
  return (
    <main id="main-content">
      <article className="relative min-h-screen overflow-hidden bg-[#F5F3EE] text-ink px-8 py-16 lg:px-16">
        <GradientBlob
          colors={['#C4B5FD', '#93C5FD', '#F4A8C7']}
          size="55vmax"
          position={{ top: '-12%', right: '-12%' }}
          blur="110px"
          duration={19}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <a
            href="/"
            className="font-mono font-medium text-xs tracking-[0.08em] uppercase hover:opacity-60 transition-opacity duration-200 mb-16 inline-block"
          >
            ← Back
          </a>

          <p className="font-mono font-medium text-xs uppercase tracking-[0.18em] text-ink/50">
            About
          </p>

          <h1 className="wordmark mt-4 lowercase" style={HEADING}>
            luke cassiano
          </h1>

          <p className="font-mono font-medium text-xs uppercase tracking-[0.14em] text-ink/55 mt-5">
            UC Berkeley · Cog Sci + Neuroscience · est. 2028 · bassist · surfer
          </p>

          <div className="mt-10 flex flex-col gap-5">
            <p className="font-mono font-medium text-base leading-relaxed">
              I study cognitive science and neuroscience at Berkeley, and I build things — surf
              forecasting, multi-agent inference systems, AI tooling, the occasional overbuilt
              website. Most people file the science and the building into separate drawers. I never
              have; for me they’re the same drawer.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed">
              The thing I keep circling — in papers, at 2am, probably more than is healthy — is the
              seam where physics, neuroscience, and philosophy of mind run into each other. Not as
              rival answers to the big questions (free will, uncertainty, consciousness), but as
              different angles on the same one. I’ve spent a while convinced that consciousness is
              basically an estimator — a model the brain runs to guess at what’s actually out there,
              under a fog of noisy signal. Once you look at perception that way, it stops being a
              philosophy problem and starts being an engineering one.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed">
              There’s a funny tension in that: I more or less build inference systems for a living,
              and I still don’t think the ones we have are “thinking.” Mimicry isn’t qualia — a model
              regurgitating a dataset isn’t having an experience. They’re estimators, not minds. The
              distinction matters to me more than it probably should.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed">
              Which is conveniently the engineering I like. Surf conditions, subcontractor
              spreadsheets, an agent’s latent belief state — it’s all the same move: take messy,
              ambiguous, half-legible signal and turn it into something clear enough to actually act
              on. I don’t buy that rigor and feel are opposites, either. Reading a forecast, comping
              over a chord change, calling a hidden state — honestly, same instinct, different
              instrument.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed">
              Speaking of instruments: I’ve played bass for going on a decade (jazz, mostly), I surf,
              I snowboard, I make music, and I once spent ten weeks teaching a course on free will —
              which is about as on-brand as it gets. Improvisation, it turns out, is just inference
              you can hear.
            </p>
            <p className="font-mono font-medium text-base leading-relaxed">
              That’s the short version. If any of it resonates — or you just want to argue about
              determinism — I’m around.
            </p>
          </div>

          {/* Elsewhere */}
          <section aria-labelledby="elsewhere" className="mt-14">
            <h2
              id="elsewhere"
              className="font-mono font-medium text-xs uppercase tracking-[0.16em] text-ink/50 mb-4"
            >
              Elsewhere
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {[
                { label: 'Résumé ↗', href: '/resume.pdf', primary: true, external: true },
                { label: 'Email', href: 'mailto:lukecassiano7@gmail.com' },
                { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/lukecassiano/', external: true },
                { label: 'GitHub ↗', href: 'https://github.com/lukecassiano', external: true },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`inline-flex items-center rounded-full px-4 py-2 font-mono font-medium text-xs uppercase tracking-[0.1em] transition-colors duration-200 ${
                    l.primary
                      ? 'bg-ink text-cream hover:bg-ink/85'
                      : 'border border-ink/30 text-ink hover:bg-ink/[0.06]'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </section>

          <Footer />
        </div>
      </article>
    </main>
  )
}
