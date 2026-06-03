'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface SceneFadeInProps {
  children: React.ReactNode
  className?: string
}

export function SceneFadeIn({ children, className }: SceneFadeInProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
