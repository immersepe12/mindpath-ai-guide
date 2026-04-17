// components/MetaPixel.tsx
// Loads Meta Pixel base script + initial PageView. Production hostname only.
'use client'

import { useEffect } from 'react'

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

export default function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID) return
    if (typeof window === 'undefined') return
    if (window.location.hostname !== 'cadabamsmindtalk.com') return
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

    ;(window as any).fbq('init', PIXEL_ID)
    ;(window as any).fbq('track', 'PageView')
  }, [])

  if (!PIXEL_ID) return null

  // noscript fallback for tracking when JS is disabled.
  // Rendered via dangerouslySetInnerHTML so React 18's <link rel="preload">
  // auto-discovery (Float) does NOT scan the <img> and emit a preload hint
  // into <head> — which was causing the PageView URL to fetch on every load
  // in JS-enabled browsers and double-counting PageView in Meta.
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1" />`,
      }}
    />
  )
}
