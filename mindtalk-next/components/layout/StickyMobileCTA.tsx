'use client'
// Sticky bottom CTA bar — visible on mobile/tablet (below lg breakpoint
// = 1024px) on the vertical landing pages. Hero on those pages stacks
// the inline LeadCaptureForm below the headline on mobile, so 87% of
// visitors bounce before scrolling far enough to see it. This bar gives
// them an immediate single-tap path to the form.
//
// Hides when #lead-form is intersecting the viewport (no point showing
// a sticky CTA while the form is already visible) and reappears when
// the user scrolls back away from it. Dismiss × stows it for the rest
// of the session via sessionStorage so it doesn't nag repeat tappers.
import { useEffect, useRef, useState } from 'react'

interface StickyMobileCTAProps {
  ctaText: string
}

const DISMISS_KEY = 'mt_sticky_cta_dismissed'

export default function StickyMobileCTA({ ctaText }: StickyMobileCTAProps) {
  const [dismissed, setDismissed] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Initial mount: check sessionStorage for the dismiss flag and start
  // observing #lead-form for viewport intersection.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') {
        setDismissed(true)
        return
      }
    } catch {}

    const form = document.getElementById('lead-form')
    if (!form) return

    observerRef.current = new IntersectionObserver(
      (entries) => setFormVisible(entries[0]?.isIntersecting ?? false),
      // Trigger as soon as any part of the form enters / leaves the viewport.
      { threshold: 0.01 },
    )
    observerRef.current.observe(form)

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [])

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const form = document.getElementById('lead-form')
    if (!form) return
    form.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Focus the first input after the scroll animation has had a moment
    // to land. 400ms is enough for the typical smooth-scroll distance on
    // mobile without being noticeably laggy.
    window.setTimeout(() => {
      document.getElementById('lf-name')?.focus({ preventScroll: true })
    }, 400)
  }

  function handleDismiss(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    try { sessionStorage.setItem(DISMISS_KEY, '1') } catch {}
    setDismissed(true)
  }

  if (dismissed || formVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#EC6206] text-white rounded-t-2xl shadow-[0_-4px_16px_rgba(0,0,0,0.12)] flex items-center gap-2 px-4 pt-3"
      // Safe-area aware — pads against the iPhone notch / Android gesture bar.
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Quick form access"
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex-1 text-center font-semibold text-base py-2 min-h-[40px]"
      >
        {ctaText}
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
  )
}
