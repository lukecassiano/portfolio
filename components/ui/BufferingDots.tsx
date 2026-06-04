'use client'

import { motion, useReducedMotion } from 'framer-motion'

/** Animated buffering ellipsis — three dots pulsing in sequence. */
export function BufferingDots() {
  const reduce = useReducedMotion()

  if (reduce) return <span aria-hidden="true">…</span>

  return (
    <span aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  )
}
