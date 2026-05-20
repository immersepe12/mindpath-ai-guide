'use client'
// Sticky bottom CTA bar — visible on mobile/tablet (below lg = 1024px)
// on the vertical landing pages. Primary CTA for paid Meta traffic,
// which lands in the Facebook/Instagram in-app WebView where the React
// lead form (and the React phone-gate modal) is unreliable.
//
// Tapping the button opens WhatsApp directly via wa.me — no React modal
// in between, so the handoff works even inside the Meta WebView. The
// trade-off is that no Freshsales/Fyno lead is created at this step —
// the team captures the contact's details inside the WhatsApp chat.
//
// Dismiss × stows it for the session via sessionStorage.
import { useEffect, useState } from 'react'

// MindTalk's WhatsApp Business number — already in international format
// (country code 91 + 10-digit mobile). Used verbatim in the wa.me link.
const WABA_NUMBER = '918197268789'

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

  // Fire a Meta Lead pixel event before the wa.me handoff. fbq dispatches
  // to every initialised pixel automatically (both 2063667027512797 and
  // 4251984441783471 are init'd in components/MetaPixel.tsx), so one call
  // hits both. We don't preventDefault — the click continues to the
  // wa.me URL. Browser-only by design (no CAPI mirror here); the user is
  // leaving the page, so the helper that POSTs to /api/track/meta might
  // race the navigation.
  function handleCtaClick() {
    try {
      const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', { content_name: 'cbt_programme' })
      }
    } catch {}
  }

  if (dismissed) return null

  const waUrl =
    `https://wa.me/${WABA_NUMBER}` +
    `?text=${encodeURIComponent(`Hi, I'm interested in the ${vertical} programme`)}`

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#EC6206] text-white rounded-t-2xl shadow-[0_-4px_16px_rgba(0,0,0,0.12)] flex items-center gap-2 px-4 pt-3"
      // Safe-area aware — pads against the iPhone notch / Android gesture bar.
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Quick contact"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCtaClick}
        className="flex-1 text-center font-semibold text-base py-2 min-h-[40px] flex items-center justify-center"
      >
        {ctaText}
      </a>
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
