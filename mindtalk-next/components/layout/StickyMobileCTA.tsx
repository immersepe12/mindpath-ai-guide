'use client'
// Sticky bottom CTA bar — visible on mobile/tablet (below lg = 1024px)
// on the vertical landing pages. This is the primary CTA for paid Meta
// traffic, which lands in the Facebook/Instagram in-app WebView where
// the React lead form is unreliable.
//
// The button triggers WhatsAppGate: it captures name + phone (firing
// /api/lead → Freshsales + Fyno) BEFORE opening WhatsApp, so no lead
// reaches WhatsApp untracked. The wa.me handoff also escapes the Meta
// WebView entirely — it opens the native WhatsApp app.
//
// Dismiss × stows it for the session via sessionStorage.
import { useEffect, useState } from 'react'
import WhatsAppGate from '@/components/WhatsAppGate'

interface StickyMobileCTAProps {
  ctaText: string
  vertical: string
}

const DISMISS_KEY = 'mt_sticky_cta_dismissed'

export default function StickyMobileCTA({ ctaText, vertical }: StickyMobileCTAProps) {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') setDismissed(true)
    } catch {}
  }, [])

  function handleDismiss(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    try { sessionStorage.setItem(DISMISS_KEY, '1') } catch {}
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#EC6206] text-white rounded-t-2xl shadow-[0_-4px_16px_rgba(0,0,0,0.12)] flex items-center gap-2 px-4 pt-3"
      // Safe-area aware — pads against the iPhone notch / Android gesture bar.
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Quick contact"
    >
      <WhatsAppGate
        location="sticky_mobile"
        vertical={vertical}
        message={`Hi, I'm interested in the ${vertical} programme`}
      >
        <button
          type="button"
          className="flex-1 text-center font-semibold text-base py-2 min-h-[40px]"
        >
          {ctaText}
        </button>
      </WhatsAppGate>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="shrink-0 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}
