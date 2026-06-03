'use client'

import { GradientBlob } from '@/components/ui/GradientBlob'
import { SceneFadeIn } from '@/components/ui/SceneFadeIn'
import { SceneLink } from '@/components/ui/SceneLink'

export function WhiteHelmetScene() {
  return (
    <section
      aria-label="WhiteHelmet"
      className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:px-16 lg:py-16"
    >
      <GradientBlob
        colors={['#D97706', '#A8A29E']}
        size="60vmax"
        position={{ bottom: '-15%', left: '50%', transform: 'translateX(-50%)' }}
        blur="80px"
      />
      <SceneFadeIn className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h2 className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
          WhiteHelmet
        </h2>
        <p className="font-mono font-medium text-base leading-relaxed">
          AI workflow for construction intelligence.
        </p>
        <SceneLink href="/whitehelmet">View case study →</SceneLink>
      </SceneFadeIn>
    </section>
  )
}
