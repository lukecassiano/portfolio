'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Flowing color ribbons drifting across a light base — inspired by the
 * aurora-streak hero on taniasoraya.com. Each streak is a wide, rotated,
 * heavily blurred gradient band that slowly translates and pulses.
 *
 * Palettes are intentionally cohesive (single color family, not rainbow).
 * Swap ACTIVE to change the whole hero mood.
 */
const SCHEMES = {
  // Cool indigo → periwinkle. Calm, technical, white reads strongly.
  dusk: {
    base: 'linear-gradient(160deg, #F7F6FB 0%, #EEF0FA 50%, #EAF0FB 100%)',
    colors: ['#312E81', '#4338CA', '#6366F1', '#818CF8', '#A5B4FC'],
  },
  // Teal → cyan → sky. Maritime, on-theme for surf forecasting.
  ocean: {
    base: 'linear-gradient(160deg, #F4FAFB 0%, #EAF6F8 50%, #E8F4FB 100%)',
    colors: ['#0F766E', '#0E7490', '#06B6D4', '#22D3EE', '#7DD3FC'],
  },
  // Crimson → coral → amber. Warm, editorial, high energy.
  ember: {
    base: 'linear-gradient(160deg, #FBF7F4 0%, #FBF0EC 50%, #FBF3EA 100%)',
    colors: ['#9F1239', '#E11D48', '#FB7185', '#FB923C', '#FBBF24'],
  },
  // Single-hue violet, light → deep. Quiet and monochromatic.
  violet: {
    base: 'linear-gradient(160deg, #F8F6FC 0%, #F2ECFA 50%, #EFE9FB 100%)',
    colors: ['#4C1D95', '#6D28D9', '#7C3AED', '#A78BFA', '#C4B5FD'],
  },
} as const

const ACTIVE = SCHEMES.ocean

const LAYOUT = [
  { top: '6%', height: 300, rotate: -14, blur: 70, dur: 28, x: ['-18%', '12%', '-8%', '-18%'], y: ['0%', '6%', '-4%', '0%'], opacity: [0.55, 0.8, 0.6, 0.55] },
  { top: '24%', height: 340, rotate: -20, blur: 80, dur: 34, x: ['10%', '-14%', '6%', '10%'], y: ['0%', '-6%', '5%', '0%'], opacity: [0.6, 0.45, 0.75, 0.6] },
  { top: '42%', height: 380, rotate: -10, blur: 90, dur: 30, x: ['-12%', '14%', '-6%', '-12%'], y: ['0%', '8%', '-5%', '0%'], opacity: [0.5, 0.72, 0.5, 0.5] },
  { top: '58%', height: 340, rotate: -18, blur: 75, dur: 26, x: ['14%', '-10%', '8%', '14%'], y: ['0%', '-5%', '6%', '0%'], opacity: [0.6, 0.45, 0.78, 0.6] },
  { top: '72%', height: 300, rotate: -12, blur: 85, dur: 32, x: ['-16%', '10%', '-6%', '-16%'], y: ['0%', '5%', '-6%', '0%'], opacity: [0.5, 0.68, 0.5, 0.5] },
  { top: '84%', height: 320, rotate: -16, blur: 80, dur: 24, x: ['8%', '-12%', '6%', '8%'], y: ['0%', '-6%', '4%', '0%'], opacity: [0.55, 0.4, 0.72, 0.55] },
]

export function ColorStreaks() {
  const reduce = useReducedMotion()
  const palette = ACTIVE.colors

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ background: ACTIVE.base }}
    >
      {LAYOUT.map((s, i) => {
        const c1 = palette[i % palette.length]
        const c2 = palette[(i + 1) % palette.length]
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 rounded-full"
            style={{
              top: s.top,
              width: '170%',
              height: s.height,
              marginLeft: '-85%',
              background: `linear-gradient(90deg, transparent, ${c1} 30%, ${c2} 55%, transparent)`,
              filter: `blur(${s.blur}px)`,
              rotate: `${s.rotate}deg`,
              willChange: 'transform, opacity',
            }}
            animate={
              reduce
                ? { opacity: s.opacity[0] }
                : { x: s.x, y: s.y, opacity: s.opacity }
            }
            transition={
              reduce
                ? undefined
                : { duration: s.dur, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        )
      })}

      {/* Soft top wash so the field reads light and airy near the nav. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}
