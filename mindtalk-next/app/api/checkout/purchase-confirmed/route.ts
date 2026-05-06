// app/api/checkout/purchase-confirmed/route.ts
// Fires after Razorpay redirects back to the success page.
// Sends Purchase + Subscribe to Meta CAPI, mirrors to Mixpanel server-side,
// and forwards to the Fyno purchase-confirmation flow (preserves prior behaviour).
import { NextRequest, NextResponse } from 'next/server'
import { sendMetaEvent, extractRequestUserData, newEventId, sanitiseEventSourceUrl } from '@/lib/meta-capi'
import { trackMixpanelServer } from '@/lib/mixpanel-server'

interface Body {
  name?:        string
  phone?:       string
  email?:       string
  orderId?:     string         // booking_id
  vertical?:    string
  journeyName?: string
  appLink?:     string
  value?:       number
  currency?:    string
  eventId?:     string         // shared with browser Pixel for dedup
}

const PRICE_DEFAULT = 7799     // INR
const FYNO_WORKSPACE = process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID
const FYNO_API_KEY   = process.env.FYNO_API_KEY

export async function POST(req: NextRequest) {
  let body: Body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const value     = body.value     ?? PRICE_DEFAULT
  const currency  = body.currency  ?? 'INR'
  const eventId   = body.eventId   ?? newEventId()
  const subEventId = `${eventId}_sub`
  const reqUser   = extractRequestUserData(req)
  const nameParts = (body.name ?? '').trim().split(/\s+/)
  const firstName = nameParts[0] || undefined
  const lastName  = nameParts.slice(1).join(' ') || undefined

  const userData = {
    email:      body.email,
    phone:      body.phone,
    firstName,
    lastName,
    externalId: body.orderId,
    country:    'in',
    ...reqUser,
  }

  // Condition-neutral content fields. body.vertical / body.journeyName are
  // condition-bearing ('anxiety', 'MindTalk Anxiety Recovery Programme', …)
  // so they must not leak to Meta. Internal systems (Mixpanel, Fyno, Freshsales)
  // still receive the original vertical further down this route.
  const customData = {
    value,
    currency,
    content_name:     'MindTalk 90-Day Programme',
    content_category: 'programme',
    content_ids:      body.orderId ? [body.orderId] : undefined,
    content_type:     'product',
    order_id:         body.orderId,
    subscription_id:  body.orderId,
    num_items:        1,
  }

  const sanitisedReferer = sanitiseEventSourceUrl(req.headers.get('referer'))

  // ── Meta CAPI: Purchase + Subscribe (same trigger, separate events for funnel) ──
  await Promise.all([
    sendMetaEvent({
      eventName:      'Purchase',
      eventId,
      eventSourceUrl: sanitisedReferer,
      userData,
      customData,
    }),
    sendMetaEvent({
      eventName:      'Subscribe',
      eventId:        subEventId,
      eventSourceUrl: sanitisedReferer,
      userData,
      customData: {
        ...customData,
        predicted_ltv: value,
      },
    }),
  ])

  // ── Mixpanel server-side mirror ──
  const distinctId = body.email || body.orderId || body.phone
  await Promise.all([
    trackMixpanelServer({
      event:      'meta_purchase',
      distinctId,
      properties: {
        vertical:     body.vertical,
        order_id:     body.orderId,
        value,
        currency,
        journey_name: body.journeyName,
      },
    }),
    trackMixpanelServer({
      event:      'meta_subscribe',
      distinctId,
      properties: {
        vertical:     body.vertical,
        order_id:     body.orderId,
        value,
        currency,
        journey_name: body.journeyName,
      },
    }),
  ])

  // ── Fyno purchase-confirmation nurture (preserves prior behaviour) ──
  if (FYNO_WORKSPACE && FYNO_API_KEY) {
    try {
      await fetch(`https://api.fyno.io/v1/${FYNO_WORKSPACE}/event`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${FYNO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify((() => {
          // Same naming convention as /api/lead — Fyno templates use named
          // placeholders. Normalise issue_vertical (lower + trim) and drop
          // empty values so Meta WhatsApp doesn't reject placeholders.
          const ALLOWED = new Set(['anxiety', 'depression', 'burnout', 'relationship'])
          const verticalRaw = typeof body.vertical === 'string' ? body.vertical.trim().toLowerCase() : ''
          const issueVertical = ALLOWED.has(verticalRaw) ? verticalRaw : undefined

          const fynoBody = {
            event: 'purchase_confirmed',
            // Fyno channel keys, drop empty channels.
            to: Object.fromEntries(
              Object.entries({
                sms:      body.phone,
                whatsapp: body.phone,
                email:    body.email,
              }).filter(([, v]) => typeof v === 'string' && v.length > 0),
            ),
            data: Object.fromEntries(
              Object.entries({
                // distinct_id matches the lead_created event so the Fyno
                // workflow recognises this as the SAME user — its
                // 'End journey when purchase_confirmed is fired' rule
                // depends on user identity matching.
                distinct_id:    body.email ?? body.phone,
                first_name:     firstName,
                phone:          body.phone,
                email:          body.email,
                issue_vertical: issueVertical,
                order_id:       body.orderId,
                journey_name:   body.journeyName,
                app_link:       body.appLink,
                value:          String(value),
                currency,
              }).filter(([, v]) => v !== undefined && v !== null && v !== ''),
            ),
          }
          console.log('[purchase-confirmed] Fyno payload:', JSON.stringify(fynoBody))
          return fynoBody
        })()),
      })
    } catch (e: any) {
      console.warn('[purchase-confirmed] Fyno error:', e?.message)
    }
  }

  return NextResponse.json({ ok: true, eventId, subEventId })
}
