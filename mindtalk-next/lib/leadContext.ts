// lib/leadContext.ts
// Client-side context collector for the Cadabams CRM direct-write
// integration. Bundles last-touch UTM, first-touch UTM (persisted via
// 30-day cookie), click IDs, page URL, scrubbed referrer, and Mixpanel
// distinct_id into a single LeadContext object that the route can
// forward to createCadabamsCrmLead().
//
// Pure browser code — guarded with typeof window checks so accidental
// server-side import returns sensible defaults.

import type { LeadContext } from '@/lib/crm/cadabamsCrm'
import { getDistinctId } from '@/lib/analytics'
export type { LeadContext } from '@/lib/crm/cadabamsCrm'

const FIRST_TOUCH_COOKIE = 'mt_first_touch'
const COOKIE_MAX_AGE_DAYS = 30

interface FirstTouchPayload {
  utm_source?:   string
  utm_medium?:   string
  utm_campaign?: string
  utm_term?:     string
  utm_content?:  string
  landing_page?: string
  referrer?:     string
  first_visit?:  string
}

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const re = new RegExp(`(?:^|; )${name}=([^;]*)`)
  const m = re.exec(document.cookie)
  return m ? decodeURIComponent(m[1]) : undefined
}

function writeCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`
}

// Reads first-touch from cookie. Sets it on the first visit that has any
// utm_* in the URL. Never overwrites — first touch is the FIRST touch.
function getFirstTouch(currentUtms: NonNullable<LeadContext['utm']>): FirstTouchPayload | undefined {
  const existing = readCookie(FIRST_TOUCH_COOKIE)
  if (existing) {
    try { return JSON.parse(existing) as FirstTouchPayload } catch {}
  }
  // No cookie yet — set one IF we have a marketing source on this URL.
  const hasUtm = !!(currentUtms.utm_source || currentUtms.utm_campaign || currentUtms.utm_medium)
  if (!hasUtm) return undefined
  const payload: FirstTouchPayload = {
    ...currentUtms,
    landing_page: typeof window !== 'undefined' ? window.location.pathname : undefined,
    referrer:     typeof document !== 'undefined' ? (document.referrer || undefined) : undefined,
    first_visit:  new Date().toISOString(),
  }
  try { writeCookie(FIRST_TOUCH_COOKIE, JSON.stringify(payload), COOKIE_MAX_AGE_DAYS) } catch {}
  return payload
}

// Mixpanel distinct_id via the typed helper in lib/analytics.ts.
// Returns undefined when the snippet isn't loaded (e.g. dev hostname
// gate, or initAnalytics hasn't run yet) — that's fine, the column
// just stays empty on the CRM activity row.
function getMixpanelDistinctId(): string | undefined {
  return getDistinctId() ?? undefined
}

export function collectLeadContext(opts?: {
  ctaSource?: string
  ctaType?:   LeadContext['ctaType']
}): LeadContext {
  if (typeof window === 'undefined') {
    return { ctaSource: opts?.ctaSource, ctaType: opts?.ctaType }
  }

  const params = new URLSearchParams(window.location.search)
  const utm: NonNullable<LeadContext['utm']> = {
    utm_source:   params.get('utm_source')   ?? undefined,
    utm_medium:   params.get('utm_medium')   ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_term:     params.get('utm_term')     ?? undefined,
    utm_content:  params.get('utm_content')  ?? undefined,
  }

  // Scrub same-host referrer.
  let referrer: string | undefined
  if (document.referrer) {
    try {
      const u = new URL(document.referrer)
      if (u.host !== window.location.host) referrer = document.referrer
    } catch {}
  }

  const firstTouch = getFirstTouch(utm)

  return {
    utm,
    firstTouchUtm:      firstTouch,
    pageUrl:            window.location.href,
    referrer,
    ctaSource:          opts?.ctaSource,
    ctaType:            opts?.ctaType,
    gclid:              params.get('gclid')   ?? undefined,
    fbclid:             params.get('fbclid')  ?? undefined,
    msclkid:            params.get('msclkid') ?? undefined,
    mixpanelDistinctId: getMixpanelDistinctId(),
  }
}
