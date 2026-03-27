'use client'
import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

export default function ScrollDepthTracker({ page }: { page: string }) {
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    const checkDepth = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      const pct = Math.round((scrolled / total) * 100)

      const milestones = [25, 50, 75, 100] as const
      milestones.forEach(m => {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m)
          trackScrollDepth(page, m)
        }
      })
    }

    window.addEventListener('scroll', checkDepth, { passive: true })
    return () => window.removeEventListener('scroll', checkDepth)
  }, [page])

  return null
}
