'use client'
// Meta in-app browser escape overlay.
//
// Paid Meta ad traffic opens inside the Facebook / Instagram in-app
// WebView, which breaks the React lead form: 385 Meta Android visitors
// over 5 days, 0 submissions, while organic traffic on real browsers
// converts at ~3.5%. This component detects the in-app browser and shows
// a non-dismissible full-screen overlay pushing the user to a real
// browser. The backdrop blocks interaction with the (broken) form
// behind it — there's no point letting them try it in the WebView.
//
// Android: 'Open in Chrome' button → Android intent URL.
// iOS: instructions to use the in-app browser's ··· menu (iOS has no
//      intent-URL equivalent, so we can't open Safari programmatically).
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type Platform = 'android' | 'ios' | null

function WebViewBannerInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [platform, setPlatform] = useState<Platform>(null)

  useEffect(() => {
    const ua = navigator.userAgent || ''
    // FBAN/FBAV → Facebook app WebView, FB_IAB → Facebook in-app browser,
    // FBIOS → Facebook iOS WebView, Instagram → Instagram app WebView.
    const isMetaWebView = /FBAN|FBAV|FB_IAB|FBIOS|Instagram/i.test(ua)
    if (!isMetaWebView) return
    if (/Android/i.test(ua)) setPlatform('android')
    else if (/iPhone|iPad|iPod/i.test(ua)) setPlatform('ios')
  }, [])

  if (!platform) return null

  const search = searchParams.toString()
  const path = `${pathname}${search ? `?${search}` : ''}`
  const httpsUrl = `https://cadabamsmindtalk.com${path}`
  // Android intent URL — opens the current page in Chrome. If Chrome
  // isn't installed, S.browser_fallback_url sends the user to the plain
  // https URL (the system opens it in the default browser).
  const intentUrl =
    `intent://cadabamsmindtalk.com${path}` +
    `#Intent;scheme=https;package=com.android.chrome;` +
    `S.browser_fallback_url=${encodeURIComponent(httpsUrl)};end`

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Open in a real browser"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-[#EC6206]/10 text-[#EC6206] flex items-center justify-center text-2xl mx-auto mb-4">
          ⚠
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Open this page in {platform === 'android' ? 'Chrome' : 'Safari'}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          You&apos;re viewing this inside the {platform === 'android' ? 'Facebook/Instagram' : 'in-app'} browser,
          which can stop the form working. Open it in a real browser to continue.
        </p>

        {platform === 'android' ? (
          <a
            href={intentUrl}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#EC6206] text-white font-semibold text-base py-3"
          >
            Open in Chrome →
          </a>
        ) : (
          <div className="rounded-xl bg-[#FDF8F4] border border-[#EC6206]/20 p-4 text-left">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Tap the ··· menu, then &ldquo;Open in Safari&rdquo;
            </p>
            <p className="text-xs text-gray-500">
              The ··· button is in the corner of this in-app browser.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// useSearchParams() requires a Suspense boundary in the App Router.
export default function WebViewBanner() {
  return (
    <Suspense fallback={null}>
      <WebViewBannerInner />
    </Suspense>
  )
}
