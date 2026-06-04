'use client'

import { motion, useReducedMotion } from 'framer-motion'

const PARTICLES = [
  { id: 0, x: '5%',  y: '10%', size: 260, color: '#F4A8C7', dur: 18, delay: 0,   dx: ['0%','12%','-8%','5%','0%'],  dy: ['0%','-8%','12%','-4%','0%']  },
  { id: 1, x: '70%', y: '5%',  size: 220, color: '#93C5FD', dur: 22, delay: 1.5, dx: ['0%','-10%','6%','-3%','0%'], dy: ['0%','10%','-6%','4%','0%']   },
  { id: 2, x: '55%', y: '55%', size: 280, color: '#C4B5FD', dur: 20, delay: 0.8, dx: ['0%','8%','-12%','4%','0%'],  dy: ['0%','-12%','8%','-3%','0%']  },
  { id: 3, x: '15%', y: '60%', size: 200, color: '#4ADE80', dur: 16, delay: 3,   dx: ['0%','-6%','10%','-4%','0%'], dy: ['0%','8%','-10%','5%','0%']   },
  { id: 4, x: '80%', y: '40%', size: 180, color: '#F59E0B', dur: 24, delay: 0.5, dx: ['0%','6%','-9%','3%','0%'],   dy: ['0%','-7%','9%','-2%','0%']   },
  { id: 5, x: '35%', y: '25%', size: 160, color: '#312E81', dur: 15, delay: 2,   dx: ['0%','-8%','5%','-3%','0%'],  dy: ['0%','6%','-8%','3%','0%']    },
  { id: 6, x: '10%', y: '40%', size: 140, color: '#F97316', dur: 19, delay: 1,   dx: ['0%','9%','-6%','2%','0%'],   dy: ['0%','-9%','6%','-4%','0%']   },
  { id: 7, x: '45%', y: '80%', size: 200, color: '#D97706', dur: 17, delay: 3.5, dx: ['0%','-5%','8%','-3%','0%'],  dy: ['0%','7%','-5%','3%','0%']    },
  { id: 8, x: '88%', y: '70%', size: 160, color: '#A8A29E', dur: 21, delay: 2.2, dx: ['0%','6%','-10%','4%','0%'],  dy: ['0%','-10%','7%','-3%','0%']  },
]

export function ParticleField() {
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            filter: 'blur(70px)',
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0.0, 0.35, 0.15, 0.45, 0.0],
            x: p.dx,
            y: p.dy,
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
