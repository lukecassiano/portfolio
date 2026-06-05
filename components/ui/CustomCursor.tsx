'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    window.addEventListener('mousemove', onMove)

    const interactive = document.querySelectorAll('a, button, [role="button"]')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [mouseX, mouseY, visible])

  if (!visible) return null

  return (
    <>
      {/* Dot — instant */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 10,
          height: 10,
        }}
      />
      {/* Ring — spring lag */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border-2 border-white mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 56 : 38,
          height: hovered ? 56 : 38,
          opacity: hovered ? 1 : 0.85,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  )
}
