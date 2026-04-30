import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    name, phone, email, vertical,
    durationOfIssue, symptoms, priorTherapy, readinessScore,
    utmSource, utmMedium, utmCampaign, utmContent, pageUrl,
    source,
  } = body

  const normalisePhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '')
    if (digits.startsWith('91') && digits.length === 12) return `+${digits}`
    if (digits.length === 10) return `+91${digits}`
    return `+${digits}`
  }

  const normalisedPhone = normalisePhone(phone)

  const lpUrls: Record<string, string> = {
    anxiety:      'https://cadabamsmindtalk.com/anxiety',
    depression:   'https://cadabamsmindtalk.com/emotional-reset',
    relationship: 'https://cadabamsmindtalk.com/relationships',
    burnout:      'https://cadabamsmindtalk.com/burnout',
  }

  // Build the breadcrumb that goes into Freshsales' standard `medium` field
  // (single-line text on the contact). Pack page URL + UTMs + quiz context
  // so the sales/care team can see the journey at a glance. Truncated to
  // 230 chars to stay under typical text-field limits.
  const mediumParts = [
    pageUrl,
    utmSource   ? `src=${utmSource}`     : '',
    utmMedium   ? `med=${utmMedium}`     : '',
    utmCampaign ? `cmp=${utmCampaign}`   : '',
    utmContent  ? `cnt=${utmContent}`    : '',
    vertical    ? `vert=${vertical}`     : '',
    durationOfIssue ? `dur=${durationOfIssue}` : '',
    priorTherapy    ? `prior=${priorTherapy}`  : '',
    readinessScore  ? `score=${readinessScore}` : '',
    Array.isArray(symptoms) && symptoms.length ? `sym=${symptoms.join('+')}` : '',
  ].filter(Boolean).join(' | ')
  const mediumValue = mediumParts.length > 230 ? mediumParts.slice(0, 227) + '...' : mediumParts

  // Email is optional on the lead capture forms. Freshsales rejects the
  // whole contact when `email: ""` is present (must be a valid address or
  // omitted). Fyno's `to` channel block likewise needs the email key absent
  // when there's no value. Normalise to either a non-empty trimmed string or
  // undefined, then conditionally include below.
  const cleanEmail = typeof email === 'string' && email.trim() ? email.trim() : undefined

  // 1. Freshsales
  let freshsalesStatus: { ok: boolean; status?: number; body?: string; error?: string } = { ok: false, error: 'no_api_key' }
  if (process.env.FRESHSALES_API_KEY) {
    // Freshsales has `medium`, `campaign`, `keyword` as STANDARD fields on
    // the contact — they live at the top level, NOT inside custom_field.
    // The previous version incorrectly nested cf_medium / cf_utm_id /
    // cf_utm_term inside custom_field, so Freshsales rejected the request,
    // and the silent retry-strip-cf_medium hid the failure while creating
    // contacts with no marketing context.
    const freshsalesPayload = {
      contact: {
        first_name: name,
        ...(cleanEmail ? { email: cleanEmail } : {}),
        mobile_number: normalisedPhone,
        lead_source: utmSource || 'MindTalk Website',
        // Standard Freshsales marketing fields (top-level)
        ...(mediumValue   ? { medium:   mediumValue }   : {}),
        ...(utmCampaign   ? { campaign: utmCampaign }   : {}),
        ...(utmContent    ? { keyword:  utmContent }    : {}),
        custom_field: {
          cf_form_source_custom: typeof source === 'string' && source ? source : 'packages',
          cf_score: readinessScore ?? '',
          cf_customer_category: durationOfIssue ?? '',
          cf_relationship: Array.isArray(symptoms) ? symptoms.join(', ') : '',
          cf_gender: priorTherapy ?? '',
        },
      },
    }
    try {
      const resp = await fetch('https://cadabams.myfreshworks.com/crm/sales/api/contacts', {
        method: 'POST',
        headers: {
          Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(freshsalesPayload),
      })
      const respBody = await resp.text()
      if (!resp.ok) {
        console.error('[lead] Freshsales HTTP', resp.status, respBody.slice(0, 500))
        // No more silent retry-strip-cf_medium. If the request fails, log
        // the actual response so the cause is debuggable rather than papered
        // over. Future schema mismatches will surface as real errors.
        freshsalesStatus = { ok: false, status: resp.status, body: respBody.slice(0, 300) }
      } else {
        freshsalesStatus = { ok: true, status: resp.status }
        console.log('[lead] Freshsales created contact', cleanEmail ?? `(phone-only ${normalisedPhone})`)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[lead] Freshsales fetch error:', msg)
      freshsalesStatus = { ok: false, error: msg }
    }
  }

  // 2. Fyno — trigger lead_created nurture sequence
  let fynoStatus: { ok: boolean; status?: number; body?: string; error?: string } = { ok: false, error: 'no_api_key' }
  if (process.env.FYNO_API_KEY && process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID) {
    try {
      const resp = await fetch(
        `https://api.fyno.io/v1/${process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID}/event`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.FYNO_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'lead_created',
            // Fyno's `to` object keys must be channel names — sms / whatsapp /
            // email / phone (voice) / push / inapp / etc. `phone_number` is
            // not a recognised channel and Fyno returns 400. Send the phone
            // on both sms and whatsapp so any workflow routing on either
            // channel can pick it up.
            to: {
              sms:      normalisedPhone,
              whatsapp: normalisedPhone,
              ...(cleanEmail ? { email: cleanEmail } : {}),
            },
            data: {
              name,
              vertical,
              lp_url: lpUrls[vertical] ?? lpUrls.anxiety,
              utm_source: utmSource ?? '',
              utm_campaign: utmCampaign ?? '',
            },
          }),
        }
      )
      const respBody = await resp.text()
      if (!resp.ok) {
        console.error('[lead] Fyno HTTP', resp.status, respBody.slice(0, 300))
      } else {
        console.log('[lead] Fyno lead_created fired for', cleanEmail ?? normalisedPhone)
      }
      fynoStatus = { ok: resp.ok, status: resp.status, body: respBody.slice(0, 300) }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[lead] Fyno fetch error:', msg)
      fynoStatus = { ok: false, error: msg }
    }
  }

  // Note: Meta Lead (Pixel + CAPI) fires from the browser via lib/analytics →
  // trackMetaLead → /api/track/meta, with keepalive: true so it survives
  // navigation. We deliberately do NOT re-fire CAPI here — that would
  // double-count in Meta because the event_ids would differ.

  return NextResponse.json({
    success:     freshsalesStatus.ok || fynoStatus.ok,
    freshsales:  freshsalesStatus,
    fyno:        fynoStatus,
  })
}
