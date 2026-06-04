'use client'

import { motion } from 'framer-motion'
import { ColorStreaks } from '@/components/ui/ColorStreaks'
import { ScrollHint } from '@/components/ui/ScrollHint'
import { BufferingDots } from '@/components/ui/BufferingDots'

export function IntroScene() {
  return (
    <section
      aria-label="Intro"
      className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-8 text-center"
    >
      <ColorStreaks />

      <div
        className="relative z-10 flex flex-col items-center gap-6"
        style={{ mixBlendMode: 'exclusion', color: '#FBBF24', opacity: 0.78 }}
      >
        <motion.p
          className="font-mono font-medium text-xs md:text-sm uppercase tracking-[0.22em]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Cog Sci · Neuroscience · Product
        </motion.p>

        <motion.h1
          className="name-display lowercase"
          style={{ fontSize: 'clamp(52px, 8.5vw, 124px)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          luke cassiano
        </motion.h1>

        <motion.p
          className="font-mono font-medium text-base md:text-lg max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          building<BufferingDots />
        </motion.p>
      </div>

      <ScrollHint />
    </section>
  )
}
