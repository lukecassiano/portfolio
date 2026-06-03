'use client'

import { GradientBlob } from '@/components/ui/GradientBlob'
import { SceneFadeIn } from '@/components/ui/SceneFadeIn'
import { SceneLink } from '@/components/ui/SceneLink'

export function SandbarScene() {
  return (
    <section
      aria-label="Sandbar"
      className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:px-16 lg:py-16"
    >
      <GradientBlob
        colors={['#F4A8C7', '#C4B5FD', '#93C5FD']}
        size="70vmax"
        position={{ top: '-10%', left: '50%', transform: 'translateX(-50%)' }}
        blur="100px"
      />
      <SceneFadeIn className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h2 className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
          Sandbar
        </h2>
        <p className="font-mono font-medium text-base leading-relaxed">
          Agentic surf forecasting.
        </p>
        <div className="flex flex-col items-center gap-1">
          <p className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
            87%
          </p>
          <p className="font-mono font-medium text-xs uppercase tracking-[0.08em]">
            FORECAST ACCURACY
          </p>
        </div>
        <SceneLink href="/sandbar">View case study →</SceneLink>
      </SceneFadeIn>
    </section>
  )
}
