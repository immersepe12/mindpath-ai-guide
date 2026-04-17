'use client'
import { useEffect } from 'react'
import { trackPageView, trackVerticalPageView } from '@/lib/analytics'

export default function PageTracker({ page, vertical }: { page: string; vertical?: string }) {
  useEffect(() => {
    trackPageView(page, vertical ? { vertical } : undefined)
    // Vertical landing pages fire Meta ViewContent (Pixel + CAPI) so Meta's
    // optimisation for "viewed content" audiences works on the ad LPs.
    if (vertical) {
      try { trackVerticalPageView(vertical) } catch {}
    }
  }, [page, vertical])
  return null
}
