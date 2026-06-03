'use client'

import { GradientBlob } from '@/components/ui/GradientBlob'
import { SceneFadeIn } from '@/components/ui/SceneFadeIn'

export function BeliefAgentScene() {
  return (
    <section
      aria-label="Belief Agent"
      className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:px-16 lg:py-16 bg-[#0D0D12] text-cream"
    >
      <GradientBlob
        colors={['#312E81', '#4ADE80']}
        size="65vmax"
        position={{ top: '5%', right: '-10%' }}
        blur="120px"
      />
      <SceneFadeIn className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h2 className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
          Belief Agent
        </h2>
        <p className="font-mono font-medium text-base leading-relaxed">
          Modeling latent belief states.
        </p>
        <div className="flex flex-col items-center gap-1">
          <p className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
            0.31
          </p>
          <p className="font-mono font-medium text-xs uppercase tracking-[0.08em]">
            MEAN ENTROPY AT CONVERGENCE
          </p>
        </div>
      </SceneFadeIn>
    </section>
  )
}
