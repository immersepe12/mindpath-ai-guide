'use client'
// Sticky bottom CTA bar — visible on mobile/tablet (below lg = 1024px)
// on the vertical landing pages. Primary CTA for paid Meta traffic,
// which lands in the Facebook/Instagram in-app WebView.
//
// Tapping the bar opens a bottom-sheet phone gate. On submit it creates
// a Freshsales lead via sendBeacon → /api/lead (survives the WebView →
// WhatsApp app switch), fires the Meta Lead pixel, then hands off to
// WhatsApp. The gate keeps every sticky-CTA lead attributable before
// the conversation even starts.
//
// No <form> element — submit is a plain button onClick. Form submission
// inside the Meta WebView is unreliable; a controlled input + onClick
// sidesteps it.
import { useEffect, useState } from 'react'
import { collectLeadContext } from '@/lib/leadContext'

// MindTalk's WhatsApp Business number — international format (91 + 10).
const WABA_NUMBER = '918197268789'
const DISMISS_KEY = 'mt_sticky_cta_dismissed'

interface StickyMobileCTAProps {
  vertical: string
}

export default function StickyMobileCTA({ vertical }: StickyMobileCTAProps) {
  const [dismissed, setDismissed] = useState(false)
  const [open, setOpen]           = useState(false)
  const [phone, setPhone]         = useState('')
  const [error, setError]         = useState('')

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

  function handleSubmit() {
    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit number')
      return
    }
    setError('')

    // Meta Lead pixel — best-effort (may not complete in WebView).
    try {
      const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', { content_name: 'cbt_programme', currency: 'INR', value: 7799 })
      }
    } catch {}

    // mindtalk_utms stores snake_case keys; /api/lead expects camelCase —
    // map explicitly (same as LeadCaptureForm / WhatsAppGate / CallGate).
    let utms: Record<string, string> = {}
    try { utms = JSON.parse(localStorage.getItem('mindtalk_utms') || '{}') } catch {}

    // sendBeacon survives the WebView → WhatsApp app switch (an in-flight
    // fetch would be killed). /api/lead reads the body via req.json(),
    // which parses the beacon's text/plain payload fine.
    try {
      navigator.sendBeacon(
        '/api/lead',
        JSON.stringify({
          name:        '',
          phone:       digits,
          vertical,
          source:      'sticky_gate',
          utmSource:   utms.utm_source   ?? '',
          utmMedium:   utms.utm_medium   ?? '',
          utmCampaign: utms.utm_campaign ?? '',
          utmContent:  utms.utm_content  ?? '',
          gclid:       utms.gclid        ?? '',
          context:     collectLeadContext({ ctaSource: 'Phone Gate Book', ctaType: 'book' }),
        }),
      )
    } catch {}

    // Hand off to WhatsApp immediately — do not await the beacon.
    const text = `Hi, I want to book a free counsellor call for the ${vertical} programme`
    window.location.href = `https://wa.me/${WABA_NUMBER}?text=${encodeURIComponent(text)}`
  }

  if (dismissed) return null

  return (
    <>
      {/* Sticky bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#EC6206] text-white rounded-t-2xl shadow-[0_-4px_16px_rgba(0,0,0,0.12)] flex items-center gap-2 px-4 pt-3"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        role="region"
        aria-label="Quick contact"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex-1 text-center font-semibold text-base py-2 min-h-[40px]"
        >
          Book a free call with a counsellor →
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="shrink-0 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>

      {/* Bottom-sheet phone gate */}
      {open && (
        <div
          className="fixed inset-0 z-[9998] lg:hidden flex items-end bg-black/50"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div
            className="w-full bg-white rounded-t-2xl p-6"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
            role="dialog"
            aria-modal="true"
            aria-label="Book your free call"
          >
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-lg font-bold text-gray-900">Book your free call</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="shrink-0 -mt-1 -mr-1 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              A counsellor will reach out within 2 hours
            </p>
            <input
              type="tel"
              inputMode="numeric"
              autoFocus
              value={phone}
              onChange={(e) => { setPhone(e.target.value); if (error) setError('') }}
              placeholder="Your WhatsApp number"
              className="w-full h-12 rounded-xl border border-gray-200 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EC6206] focus:border-transparent"
            />
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full mt-4 h-12 rounded-xl bg-[#EC6206] text-white font-semibold text-base"
            >
              Connect me on WhatsApp →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
