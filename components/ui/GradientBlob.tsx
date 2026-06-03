'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientBlobProps {
  /** Ordered gradient color stops, e.g. ['#F4A8C7', '#C4B5FD', '#93C5FD'] */
  colors: string[]
  /** CSS size for blob width & height. Square. */
  size?: string
  /** Inline positioning styles (top/left/right/bottom/transform) */
  position?: React.CSSProperties
  /** Static blur radius. Never animated. */
  blur?: string
  className?: string
}

export function GradientBlob({
  colors,
  size = '60vmax',
  position,
  blur = '80px',
  className,
}: GradientBlobProps) {
  const reduce = useReducedMotion()

  const gradient = `radial-gradient(circle at 50% 50%, ${colors.join(', ')})`

  return (
    <motion.div
      aria-hidden="true"
      className={cn('pointer-events-none absolute rounded-full', className)}
      style={{
        width: size,
        height: size,
        background: gradient,
        filter: `blur(${blur})`,
        willChange: 'transform',
        ...position,
      }}
      initial={{ opacity: 0.85, y: 0 }}
      animate={
        reduce
          ? { opacity: 0.85, y: 0 }
          : { opacity: [0.8, 0.95, 0.8], y: ['0%', '-4%', '0%'] }
      }
      transition={
        reduce
          ? undefined
          : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  )
}
