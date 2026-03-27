'use client'
import { useEffect } from 'react'
import { trackPageView } from '@/lib/analytics'

export default function PageTracker({ page, vertical }: { page: string; vertical?: string }) {
  useEffect(() => {
    trackPageView(page, vertical ? { vertical } : undefined)
  }, [page, vertical])
  return null
}
