'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initAnalytics, captureUTMs, trackPageView } from '@/lib/analytics'

export default function AnalyticsProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    initAnalytics()
    captureUTMs()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    trackPageView(pathname, {
      search: searchParams.toString(),
      url: window.location.href,
    })
  }, [pathname, searchParams])

  return null
}
