'use client'

import { useEffect } from 'react'
import { initAnalytics, captureUTMs } from '@/lib/analytics'

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics()
    captureUTMs()
  }, [])
  return <>{children}</>
}
