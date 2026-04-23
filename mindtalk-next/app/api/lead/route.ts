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
  let freshsalesStatus: { ok: boolean; status?: number; body?: string; error?: string } = { ok: false, error: 'no_api_key' }
  if (process.env.FRESHSALES_API_KEY) {
    const freshsalesPayload = {
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
          cf_caller_name: pageUrl ?? '',
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

        // Retry WITHOUT cf_medium in case the field doesn't exist on the
        // Freshsales contact schema. Any 400/422 is most likely a field
        // validation problem, so strip the new field and try again.
        if (resp.status === 400 || resp.status === 422) {
          const retry = await fetch('https://cadabams.myfreshworks.com/crm/sales/api/contacts', {
            method: 'POST',
            headers: {
              Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contact: {
                ...freshsalesPayload.contact,
                custom_field: {
                  ...freshsalesPayload.contact.custom_field,
                  cf_medium: undefined,
                },
              },
            }),
          })
          const retryBody = await retry.text()
          freshsalesStatus = { ok: retry.ok, status: retry.status, body: retryBody.slice(0, 300) }
          if (!retry.ok) {
            console.error('[lead] Freshsales retry HTTP', retry.status, retryBody.slice(0, 500))
          } else {
            console.log('[lead] Freshsales succeeded on retry (cf_medium likely missing from schema)')
          }
        } else {
          freshsalesStatus = { ok: false, status: resp.status, body: respBody.slice(0, 300) }
        }
      } else {
        freshsalesStatus = { ok: true, status: resp.status }
        console.log('[lead] Freshsales created contact', email)
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
      const respBody = await resp.text()
      if (!resp.ok) {
        console.error('[lead] Fyno HTTP', resp.status, respBody.slice(0, 300))
      } else {
        console.log('[lead] Fyno lead_created fired for', email)
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
