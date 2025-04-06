'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function LenisScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy() // Nettoyage de l'instance Lenis
    }
  }, [])

  return <>{children}</>
}