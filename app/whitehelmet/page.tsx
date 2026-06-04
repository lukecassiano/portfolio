import { GradientBlob } from '@/components/ui/GradientBlob'
import { SceneFadeIn } from '@/components/ui/SceneFadeIn'

export default function WhiteHelmetPage() {
  return (
    <main id="main-content">
      <section
        aria-label="WhiteHelmet"
        className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:px-16 lg:py-16"
      >
        <a
          href="/"
          className="absolute top-8 left-8 lg:top-12 lg:left-12 font-mono font-medium text-xs tracking-[0.08em] uppercase hover:opacity-60 transition-opacity duration-200 z-10"
        >
          ← Back
        </a>
        <GradientBlob
          colors={['#D97706', '#A8A29E']}
          size="60vmax"
          position={{ bottom: '-15%', left: '50%', transform: 'translateX(-50%)' }}
          blur="80px"
        />
        <SceneFadeIn className="relative z-10 flex flex-col items-center gap-6 text-center">
          <h1 className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
            WhiteHelmet
          </h1>
          <p className="font-mono font-medium text-base leading-relaxed">
            This case study is in progress.
          </p>
          <p className="font-mono font-medium text-base leading-relaxed">
            The work is real — documentation coming soon.
          </p>
          <p className="font-mono font-medium text-xs uppercase tracking-[0.08em]">
            CASE STUDY IN PROGRESS
          </p>
        </SceneFadeIn>
      </section>
    </main>
  )
}
