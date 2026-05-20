// app/api/track/sticky-lead/route.ts
//
// CAPI-only Lead event for the mobile sticky WhatsApp CTA. The browser
// pixel fbq('track', 'Lead', …) on the anchor's onClick may not complete
// before the Meta WebView hands off to the WhatsApp app, so this
// server-side fire is the attribution-safety net. The client side uses
// navigator.sendBeacon() to POST here, which survives the navigation.
//
// No Freshsales, no Fyno: the sticky tap has no phone, and our policy
// is phone-required for CRM. The Freshsales contact gets created later
// when the visitor provides their phone inside the WhatsApp conversation.
import { NextRequest, NextResponse } from 'next/server'
import { sendMetaEvent, extractRequestUserData, newEventId } from '@/lib/meta-capi'

const ALLOWED_VERTICALS = new Set(['anxiety', 'depression', 'burnout', 'relationship'])

interface Body {
  vertical?:    string
  utm_source?:  string
  utm_medium?:  string
  utm_campaign?: string
  gclid?:       string
}

export async function POST(req: NextRequest) {
  let body: Body = {}
  try {
    body = await req.json()
  } catch {
    // sendBeacon may send as text/plain; req.json() still parses JSON.
    // If parsing fails we still fire CAPI with defaults so the event
    // isn't lost. Vertical falls back to 'anxiety'.
  }

  const raw = typeof body.vertical === 'string' ? body.vertical.trim().toLowerCase() : ''
  const vertical = ALLOWED_VERTICALS.has(raw) ? raw : 'anxiety'

  const reqUser = extractRequestUserData(req)
  const eventId = newEventId()

  await sendMetaEvent({
    eventName:      'Lead',
    eventId,
    // H&W-neutral source URL — the LP path is already condition-named
    // (/anxiety etc.); sendMetaEvent's caller (this) decides what to
    // send. Keeping the path so Meta has accurate page attribution.
    eventSourceUrl: `https://cadabamsmindtalk.com/${vertical}`,
    userData: reqUser,
    customData: {
      // Match the sticky-tap browser pixel call (b843407) — same
      // content_name so Pixel ↔ CAPI dedupe consistently. value/currency
      // mirror what the inline-form Lead carries elsewhere.
      content_name: 'cbt_programme',
      currency:     'INR',
      value:        7799,
    },
  })

  return NextResponse.json({ ok: true, eventId, vertical })
}
