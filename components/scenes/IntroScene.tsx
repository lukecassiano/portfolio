'use client'

import { SceneFadeIn } from '@/components/ui/SceneFadeIn'
import { ScrollHint } from '@/components/ui/ScrollHint'

export function IntroScene() {
  return (
    <section
      aria-label="Intro"
      className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:px-16 lg:py-16"
    >
      <SceneFadeIn className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="wordmark" style={{ fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: 1.0 }}>
          Luke Cassiano
        </h1>
        <p className="font-mono font-medium text-base leading-relaxed">
          Signal into something legible.
        </p>
      </SceneFadeIn>
      <ScrollHint />
    </section>
  )
}
