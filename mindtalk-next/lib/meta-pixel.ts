// lib/meta-pixel.ts
// Client-side Meta Pixel wrapper. Fires fbq('track', ...) with eventID for
// deduplication against the matching server-side CAPI event.
// Production hostname only.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: (...args: unknown[]) => void
  }
}

export type MetaPixelEvent =
  | 'ViewContent'
  | 'Lead'
  | 'Contact'
  | 'InitiateCheckout'
  | 'CompleteRegistration'
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'Subscribe'
  | 'Purchase'

export function newClientEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function isProdHost(): boolean {
  if (typeof window === 'undefined') return false
  return window.location.hostname.endsWith('cadabamsmindtalk.com')
}

export function trackMetaPixel(
  eventName: MetaPixelEvent,
  customData: Record<string, unknown> = {},
  eventId?: string,
): string {
  const id = eventId ?? newClientEventId()
  if (!isProdHost()) return id
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return id
  try {
    window.fbq('track', eventName, customData, { eventID: id })
  } catch {
    // never break business flow
  }
  return id
}

export function readFbCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === 'undefined') return {}
  const cookies = document.cookie
  const rawFbp = /(?:^|;\s*)_fbp=([^;]+)/.exec(cookies)?.[1]
  const rawFbc = /(?:^|;\s*)_fbc=([^;]+)/.exec(cookies)?.[1]
  // URL-decode — Meta flags "modified fbclid in fbc" when we forward the
  // browser-encoded form instead of the raw fbclid.
  const decode = (v?: string) => {
    if (!v) return undefined
    try { return decodeURIComponent(v.trim()) } catch { return v.trim() }
  }

  let fbc = decode(rawFbc)

  // Fallback: construct fbc from ?fbclid=... if the Pixel cookie hasn't
  // landed yet (first pageview race). Meta's required format is
  // "fb.1.{timestamp_ms}.{fbclid}" — the 1 is the subdomainIndex for a
  // second-level domain like cadabamsmindtalk.com.
  if (!fbc && typeof window !== 'undefined') {
    const fbclid = new URLSearchParams(window.location.search).get('fbclid')
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`
  }

  return { fbp: decode(rawFbp), fbc }
}
