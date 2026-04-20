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
  const fbp = /(?:^|;\s*)_fbp=([^;]+)/.exec(cookies)?.[1]
  const fbc = /(?:^|;\s*)_fbc=([^;]+)/.exec(cookies)?.[1]
  return { fbp, fbc }
}
