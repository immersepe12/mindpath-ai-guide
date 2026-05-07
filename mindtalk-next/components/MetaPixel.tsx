// components/MetaPixel.tsx
// Loads Meta Pixel base script + fires PageView on initial load AND on every
// SPA route change. Production hostname only.
'use client'

import { Suspense, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Dual-pixel: keep the original pixel firing while we ramp up a new one.
// Meta's pixel base script supports multiple `fbq('init', ID)` calls — every
// subsequent `fbq('track', ...)` is dispatched to all initialised pixels with
// the same eventID, so dedup against CAPI continues to work for both.
const PIXEL_ID   = process.env.NEXT_PUBLIC_FB_PIXEL_ID
const PIXEL_ID_2 = process.env.NEXT_PUBLIC_FB_PIXEL_ID_2
const PIXEL_IDS = [PIXEL_ID, PIXEL_ID_2].filter((id): id is string => !!id)

/**
 * Re-fires fbq('track', 'PageView') on every client-side navigation.
 * Skips the first render — MetaPixel's init effect already fires the
 * initial PageView, so we'd otherwise double-count it.
 *
 * Wrapped in <Suspense> in the parent because useSearchParams() requires
 * a Suspense boundary in the App Router.
 */
function PageViewOnRouteChange() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      // The initial PageView is fired by MetaPixel's mount effect below.
      isFirstRun.current = false
      return
    }
    if (typeof window === 'undefined') return
    if (typeof (window as any).fbq !== 'function') return
    ;(window as any).fbq('track', 'PageView')
  }, [pathname, searchParams])

  return null
}

export default function MetaPixel() {
  useEffect(() => {
    if (PIXEL_IDS.length === 0) return
    if (typeof window === 'undefined') return
    if (!window.location.hostname.endsWith('cadabamsmindtalk.com')) return
    if ((window as any).fbq) return // already loaded

    // Standard Meta Pixel snippet
    ;(function (f: any, b: Document, e: string, v: string) {
      let n: any
      if (f.fbq) return
      n = f.fbq = function () {
        // eslint-disable-next-line prefer-rest-params
        n.callMethod ? n.callMethod.apply(n, arguments as any) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      const t = b.createElement(e) as HTMLScriptElement
      t.async = !0
      t.src = v
      const s = b.getElementsByTagName(e)[0]
      s.parentNode?.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

    PIXEL_IDS.forEach((id) => (window as any).fbq('init', id))
    ;(window as any).fbq('track', 'PageView')
  }, [])

  if (PIXEL_IDS.length === 0) return null

  return (
    <>
      <Suspense fallback={null}>
        <PageViewOnRouteChange />
      </Suspense>
      {/* noscript fallback for tracking when JS is disabled.
          Rendered via dangerouslySetInnerHTML so React 18's <link rel="preload">
          auto-discovery (Float) does NOT scan the <img> and emit a preload hint
          into <head> — which was causing the PageView URL to fetch on every load
          in JS-enabled browsers and double-counting PageView in Meta. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: PIXEL_IDS
            .map((id) => `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1" />`)
            .join(''),
        }}
      />
    </>
  )
}
