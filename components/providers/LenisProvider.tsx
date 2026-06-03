'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Accessibility gate: vestibular triggers. Respect reduced-motion.
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) {
      // Do not run smooth scroll; native scroll is preserved.
      return
    }

    const lenis = new Lenis({
      lerp: 0.08, // soft editorial guidance, not hard snap
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false, // native touch feels better on mobile
    })

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
