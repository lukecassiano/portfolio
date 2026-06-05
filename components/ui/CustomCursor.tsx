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
    const root = document.documentElement
    let activated = false

    // The first real mouse movement is the most reliable proof that a
    // precise pointer exists — no media queries to misreport it.
    const activate = () => {
      if (activated) return
      activated = true
      root.classList.add('has-custom-cursor')
      setVisible(true)
    }

    const onMove = (e: MouseEvent) => {
      activate()
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    window.addEventListener('mousemove', onMove)
    // Show the instant the pointer is over the page (e.g. right after
    // navigating into a case study) — not only on deliberate movement.
    window.addEventListener('mouseover', activate)

    const interactive = document.querySelectorAll('a, button, [role="button"]')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', activate)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [mouseX, mouseY])

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
          width: 8,
          height: 8,
        }}
      />
      {/* Ring — spring lag */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border border-white mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
          opacity: hovered ? 0.8 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  )
}
