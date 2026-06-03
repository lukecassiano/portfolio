'use client'

import { GradientBlob } from '@/components/ui/GradientBlob'
import { SceneFadeIn } from '@/components/ui/SceneFadeIn'
import { SceneLink } from '@/components/ui/SceneLink'

export function ReadingTheBreakScene() {
  return (
    <section
      aria-label="Reading the Break"
      className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 py-12 lg:px-16 lg:py-16"
    >
      <GradientBlob
        colors={['#F97316', '#F59E0B']}
        size="65vmax"
        position={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        blur="90px"
      />
      <SceneFadeIn className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h2 className="wordmark" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
          Reading the Break
        </h2>
        <ul className="flex flex-col items-center gap-4">
          <li className="font-mono font-medium text-xs leading-relaxed">
            On Reading the Ocean as a Bayesian Prior
          </li>
          <li className="font-mono font-medium text-xs leading-relaxed">
            Jazz, Entropy, and the Shape of a Good Guess
          </li>
          <li className="font-mono font-medium text-xs leading-relaxed">
            What Surfing Taught Me About Latent State
          </li>
        </ul>
        <SceneLink href="https://lukecassiano.substack.com" external>
          Read on Substack →
        </SceneLink>
      </SceneFadeIn>
    </section>
  )
}
