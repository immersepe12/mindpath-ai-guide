'use client'
// Meta in-app browser escape banner.
//
// Paid Meta ad traffic on Android lands inside the Facebook / Instagram
// in-app WebView. That WebView breaks the React lead form — 368 paid
// Android visitors over 5 days, 0 submissions, while organic traffic on
// real browsers converts at 3.5%. This banner detects the in-app browser
// and pushes the user to open the page in Chrome instead.
//
// Non-dismissible by design: conversion depends on getting the user out
// of the WebView, so there is intentionally no close button.
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function WebViewBanner() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent || ''
    const isAndroid = /Android/i.test(ua)
    // FBAN / FBAV → Facebook app WebView. FB_IAB → Facebook in-app browser.
    // Instagram → Instagram app WebView. Any of these on Android means the
    // user is NOT in a real browser.
    const isMetaWebView = /FBAN|FBAV|FB_IAB|Instagram/i.test(ua)
    setShow(isAndroid && isMetaWebView)
  }, [])

  if (!show) return null

  const httpsUrl = `https://cadabamsmindtalk.com${pathname}`
  // Android intent URL — opens the current page in Chrome. If Chrome isn't
  // installed, S.browser_fallback_url sends the user to the plain https URL
  // (which the system then opens in whatever the default browser is).
  const intentUrl =
    `intent://cadabamsmindtalk.com${pathname}` +
    `#Intent;scheme=https;package=com.android.chrome;` +
    `S.browser_fallback_url=${encodeURIComponent(httpsUrl)};end`

  return (
    <div className="w-full bg-[#EC6206] text-white px-4 py-2.5 flex items-center justify-between gap-3">
      <span className="text-sm font-medium leading-snug">
        Open in Chrome for the best experience
      </span>
      <a
        href={intentUrl}
        className="shrink-0 inline-flex items-center justify-center rounded-full bg-white text-[#EC6206] font-semibold text-sm px-4 py-1.5 whitespace-nowrap"
      >
        Open in Chrome →
      </a>
    </div>
  )
}
