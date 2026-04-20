import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    name, phone, email, vertical,
    durationOfIssue, symptoms, priorTherapy, readinessScore,
    utmSource, utmMedium, utmCampaign, utmContent, pageUrl,
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

  // Build cf_medium — pack as much context as possible, truncated to 230 chars
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
  const cfMedium = mediumParts.length > 230 ? mediumParts.slice(0, 227) + '...' : mediumParts

  // 1. Freshsales
  if (process.env.FRESHSALES_API_KEY) {
    try {
      await fetch('https://cadabams.myfreshworks.com/crm/sales/api/contacts', {
        method: 'POST',
        headers: {
          Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: {
            first_name: name,
            email,
            mobile_number: normalisedPhone,
            lead_source: utmSource || 'MindTalk Website',
            custom_field: {
              cf_form_source_custom: 'packages',
              cf_medium: cfMedium,
              cf_utm_id: utmMedium ?? '',
              cf_utm_term: utmCampaign ?? '',
              cf_utm_content: utmContent ?? '',
              cf_score: readinessScore ?? '',
              cf_customer_category: durationOfIssue ?? '',
              cf_relationship: Array.isArray(symptoms) ? symptoms.join(', ') : '',
              cf_gender: priorTherapy ?? '',
            },
          },
        }),
      })
    } catch (err) {
      console.error('[lead] Freshsales error:', err)
    }
  }

  // 2. Fyno — trigger lead_created nurture sequence
  if (process.env.FYNO_API_KEY && process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID) {
    try {
      await fetch(
        `https://api.fyno.io/v1/${process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID}/event`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.FYNO_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'lead_created',
            to: {
              phone_number: normalisedPhone,
              email,
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
    } catch (err) {
      console.error('[lead] Fyno error:', err)
    }
  }

  // Note: Meta Lead (Pixel + CAPI) fires from the browser via lib/analytics →
  // trackMetaLead → /api/track/meta, with keepalive: true so it survives
  // navigation. We deliberately do NOT re-fire CAPI here — that would
  // double-count in Meta because the event_ids would differ.

  return NextResponse.json({ success: true })
}
