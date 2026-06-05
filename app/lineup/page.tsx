import { GradientBlob } from '@/components/ui/GradientBlob'
import { SceneFadeIn } from '@/components/ui/SceneFadeIn'
import { Footer } from '@/components/ui/Footer'

export const metadata = {
  title: 'Lineup — Luke Cassiano',
  description:
    'Lineup — a community surf journal built around private crews. Case study in progress.',
}

export default function LineupPage() {
  return (
    <main id="main-content">
      <section
        aria-label="Lineup"
        className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-16 lg:px-16 text-ink"
        style={{ backgroundColor: '#F6EFE2' }}
      >
        <a
          href="/"
          className="absolute top-8 left-8 lg:top-12 lg:left-12 font-mono font-medium text-xs tracking-[0.08em] uppercase hover:opacity-60 transition-opacity duration-200 z-10"
        >
          ← Back
        </a>

        <GradientBlob
          colors={['#f2e0c4', '#d9a847', '#c54f2d', '#e6336d']}
          size="58vmax"
          position={{ bottom: '-18%', left: '50%', transform: 'translateX(-50%)' }}
          blur="90px"
        />

        <SceneFadeIn className="relative z-10 flex flex-col items-center gap-6 text-center max-w-xl">
          <p className="font-mono font-medium text-xs uppercase tracking-[0.18em] text-ink/50">
            Product · Mobile — work in progress
          </p>

          <h1
            className="wordmark-bagel"
            style={{ fontSize: 'clamp(44px, 9vw, 88px)', color: '#c54f2d', lineHeight: 1.0 }}
          >
            lineup.
          </h1>

          <p className="font-mono font-medium text-base leading-relaxed">
            Strava for surfing — a community surf journal built around private crews. Session logs,
            secret-spot coordinates, and clips, shared with the four-to-eight friends you actually surf
            with rather than broadcast to forty thousand strangers.
          </p>

          <p className="font-mono font-medium text-sm leading-relaxed text-ink/70">
            Still early: a working MVP on the web, headed for the iOS App Store. This case study is
            tentative and in progress — the full write-up is coming.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://lineup-app.up.railway.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-mono font-medium text-xs uppercase tracking-[0.1em] bg-ink text-cream hover:bg-ink/85 transition-colors duration-200"
            >
              Live demo →<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>

          <p className="font-mono font-medium text-xs uppercase tracking-[0.14em] text-ink/45 pt-2">
            Case study in progress
          </p>
        </SceneFadeIn>
      </section>

      <Footer />
    </main>
  )
}
