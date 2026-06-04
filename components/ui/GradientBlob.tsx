'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientBlobProps {
  colors: string[]
  size?: string
  position?: React.CSSProperties
  blur?: string
  className?: string
  duration?: number
}

export function GradientBlob({
  colors,
  size = '60vmax',
  position,
  blur = '80px',
  className,
  duration = 12,
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
      initial={{ opacity: 0.7 }}
      animate={
        reduce
          ? { opacity: 0.7 }
          : {
              opacity: [0.6, 0.9, 0.65, 0.95, 0.6],
              x: ['0%', '10%', '-7%', '4%', '0%'],
              y: ['0%', '-10%', '8%', '-5%', '0%'],
            }
      }
      transition={
        reduce
          ? undefined
          : { duration, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  )
}
