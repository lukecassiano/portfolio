'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export function ScrollHint() {
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 80], [1, 0])

  if (prefersReduced) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3"
    >
      <span className="font-mono font-medium text-xs uppercase tracking-[0.1em] text-ink">
        scroll ↓
      </span>
    </motion.div>
  )
}
