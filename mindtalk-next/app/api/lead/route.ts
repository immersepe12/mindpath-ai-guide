import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    name, phone, email, vertical,
    durationOfIssue, symptoms, priorTherapy, readinessScore,
    utmSource, utmMedium, utmCampaign, utmContent, pageUrl,
    source,
    // Quiz fields — sent by VerticalQuizFlow on each LP. quizAnswers is a
    // JSON object of {questionId: answer}; quizCompleted is a boolean flag;
    // quizNote is a pre-formatted human-readable Q&A transcript for Freshsales.
    quizAnswers, quizCompleted, quizNote,
  } = body

  const normalisePhone = (raw: string) => {
    let digits = raw.replace(/\D/g, '')
    if (digits.startsWith('0')) digits = digits.slice(1)
    // Strip leading 91s while the remainder is still longer than a 10-digit
    // local number. Catches doubled-prefix autofill ('+91+9196286233' →
    // 919196286233 → 9196286233) without truncating real digits off the
    // right via slice(0, 10).
    while (digits.length > 10 && digits.startsWith('91')) {
      digits = digits.slice(2)
    }
    if (digits.length === 10) return `+91${digits}`
    if (digits.startsWith('91') && digits.length === 12) return `+${digits}`
    return `+${digits}`
  }

  // Phone is mandatory for the Mindtalk pipeline. Freshsales has a
  // workspace rule that rejects email-only contacts ("Need to fill this
  // Mobile to submit the form."), and the business doesn't want such
  // leads. Reject early so we don't fire Fyno/Mixpanel for half-leads
  // either — let the form layer surface the error and keep nudging.
  if (typeof phone !== 'string' || phone.replace(/\D/g, '').length < 10) {
    return NextResponse.json(
      { success: false, error: 'phone_required' },
      { status: 400 },
    )
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
  // + the gate/form 'source' label (whatsapp_gate_floating, call_gate_footer,
  // packages_lp, quiz, etc.) so the sales/care team can see the journey at
  // a glance. Truncated to 230 chars to stay under typical text-field limits.
  const sourceLabel = typeof source === 'string' && source.trim() ? source.trim() : undefined
  const mediumParts = [
    pageUrl,
    sourceLabel ? `src_form=${sourceLabel}`   : '',
    utmSource   ? `src=${utmSource}`     : '',
    utmMedium   ? `med=${utmMedium}`     : '',
    utmCampaign ? `cmp=${utmCampaign}`   : '',
    utmContent  ? `cnt=${utmContent}`    : '',
    vertical    ? `vert=${vertical}`     : '',
    quizCompleted ? 'quiz=done' : '',
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
          // Hard-coded 'packages' for ALL leads regardless of which gate
          // or form they came through. The user filters Freshsales on
          // cf_form_source_custom contains "packages" to scope the
          // Mindtalk segment, and gate-specific labels like
          // 'whatsapp_gate_floating' or 'call_gate_footer' broke that
          // filter (the contact disappeared from the segment view). The
          // gate/form attribution is preserved in `medium` as
          // src_form=<source> so we don't lose that signal.
          cf_form_source_custom: 'packages',
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
      let contactId: number | null = null
      if (!resp.ok) {
        console.error('[lead] Freshsales HTTP', resp.status, respBody.slice(0, 500))
        freshsalesStatus = { ok: false, status: resp.status, body: respBody.slice(0, 300) }

        // Duplicate-mobile path. Freshsales returns 400 with error_code 3002
        // ('Contact is not unique') when the phone already exists. We do two
        // things here:
        //  1. Look up the existing contact id (so we can attach the quiz note
        //     and PATCH marketing fields).
        //  2. PUT /contacts/{id} with lead_source / campaign / keyword /
        //     medium / cf_form_source_custom — Freshsales doesn't merge these
        //     from a duplicate POST, so without this update a returning
        //     visitor's contact card stays at whatever (often empty) values
        //     the original record had, breaking the
        //     'cf_form_source_custom contains packages' Mindtalk segment.
        const duplicate = (resp.status === 400 || resp.status === 422)
          && /already exists|not unique|3002/i.test(respBody)
        if (duplicate) {
          try {
            const lookupUrl = `https://cadabams.myfreshworks.com/crm/sales/api/lookup?q=${encodeURIComponent(normalisedPhone)}&f=mobile_number&entities=contact`
            const lookupResp = await fetch(lookupUrl, {
              headers: {
                Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
                'Content-Type': 'application/json',
              },
            })
            if (lookupResp.ok) {
              const lookupBody = await lookupResp.text()
              const parsed = JSON.parse(lookupBody)
              const existing = parsed?.contacts?.contacts?.[0]
              if (existing?.id) {
                contactId = existing.id
                console.log('[lead] Freshsales duplicate; using existing contact id=', contactId)

                // PATCH the existing contact's marketing fields so the
                // Mindtalk filter (cf_form_source_custom contains 'packages')
                // picks them up. Same-shape payload as the create — but
                // wrapped in a PUT to /contacts/{id}.
                try {
                  const patchPayload = {
                    contact: {
                      lead_source: utmSource || 'MindTalk Website',
                      ...(mediumValue   ? { medium:   mediumValue }   : {}),
                      ...(utmCampaign   ? { campaign: utmCampaign }   : {}),
                      ...(utmContent    ? { keyword:  utmContent }    : {}),
                      custom_field: {
                        cf_form_source_custom: 'packages',
                        ...(readinessScore ? { cf_score: readinessScore } : {}),
                        ...(durationOfIssue ? { cf_customer_category: durationOfIssue } : {}),
                        ...(Array.isArray(symptoms) && symptoms.length ? { cf_relationship: symptoms.join(', ') } : {}),
                        ...(priorTherapy ? { cf_gender: priorTherapy } : {}),
                      },
                    },
                  }
                  const patchResp = await fetch(`https://cadabams.myfreshworks.com/crm/sales/api/contacts/${contactId}`, {
                    method: 'PUT',
                    headers: {
                      Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(patchPayload),
                  })
                  if (!patchResp.ok) {
                    const patchErr = await patchResp.text()
                    console.error('[lead] Freshsales duplicate PATCH HTTP', patchResp.status, patchErr.slice(0, 300))
                  } else {
                    console.log('[lead] Freshsales duplicate PATCHed marketing fields on contact', contactId)
                    freshsalesStatus = { ok: true, status: patchResp.status }
                  }
                } catch (err) {
                  const msg = err instanceof Error ? err.message : String(err)
                  console.error('[lead] Freshsales duplicate PATCH error:', msg)
                }
              }
            } else {
              console.error('[lead] Freshsales duplicate lookup HTTP', lookupResp.status)
            }
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err)
            console.error('[lead] Freshsales duplicate lookup error:', msg)
          }
        }
      } else {
        freshsalesStatus = { ok: true, status: resp.status }
        try {
          const parsed = JSON.parse(respBody)
          contactId = parsed?.contact?.id ?? null
        } catch {}
        console.log('[lead] Freshsales created contact', cleanEmail ?? `(phone-only ${normalisedPhone})`, 'id=', contactId)
      }

      // Attach quiz Q&A as a Freshsales note. Now runs whether the contact
      // was newly created OR found via duplicate-lookup, so repeat testers
      // and returning visitors still get their note.
      if (contactId && typeof quizNote === 'string' && quizNote.trim()) {
        try {
          const noteResp = await fetch('https://cadabams.myfreshworks.com/crm/sales/api/notes', {
            method: 'POST',
            headers: {
              Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              note: {
                description: quizNote,
                targetable_type: 'Contact',
                targetable_id: contactId,
              },
            }),
          })
          if (!noteResp.ok) {
            const noteErr = await noteResp.text()
            console.error('[lead] Freshsales note HTTP', noteResp.status, noteErr.slice(0, 300))
          } else {
            console.log('[lead] Freshsales note attached to contact', contactId)
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err)
          console.error('[lead] Freshsales note error:', msg)
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[lead] Freshsales fetch error:', msg)
      freshsalesStatus = { ok: false, error: msg }
    }
  }

  // 2. Fyno — trigger lead_created nurture sequence
  //
  // Fyno templates (email + WhatsApp utility) are the source of truth for
  // field names. All variables are NAMED (no positional {{$N}} anymore):
  //
  //   first_name         — visitor's first name
  //   issue_vertical     — anxiety | depression | burnout | relationship
  //   landing_page_url   — full https URL of the matching LP
  //   utm_*              — pass-through marketing context
  //
  // Build a normalised, cleaned payload at this layer so Fyno never has to
  // alias / coerce / fall back on its end. Emit a single log line with the
  // final payload before firing so a wrong template can be diagnosed by
  // tailing Vercel logs alone.

  // Normalise issue_vertical: lowercase + trim, default to 'anxiety' if
  // missing or unrecognised. Conditions in Fyno's workflow branch on this
  // value, so consistent casing matters more than preserving caller input.
  const ALLOWED_VERTICALS = new Set(['anxiety', 'depression', 'burnout', 'relationship'])
  const verticalRaw = typeof vertical === 'string' ? vertical.trim().toLowerCase() : ''
  const issueVertical = ALLOWED_VERTICALS.has(verticalRaw) ? verticalRaw : 'anxiety'

  // Validate landing_page_url: must be https; otherwise build a fallback
  // from the issue_vertical so the email/WhatsApp CTA always points
  // somewhere real.
  const lpFallback = lpUrls[issueVertical] ?? lpUrls.anxiety
  const landingPageUrl =
    typeof pageUrl === 'string' && /^https:\/\//.test(pageUrl) ? pageUrl : lpFallback

  // First name only — split on whitespace, trim, drop empties.
  const firstName = typeof name === 'string' ? (name.trim().split(/\s+/)[0] || undefined) : undefined

  // Quiz answers come through as a JSON object keyed by question id. Stringify
  // for Fyno so it lands as a single field templates can reference; also pass
  // quiz_completed so workflows can branch on quiz vs non-quiz leads.
  const quizAnswersJson = quizAnswers && typeof quizAnswers === 'object'
    ? JSON.stringify(quizAnswers)
    : undefined

  const fynoData = Object.fromEntries(
    Object.entries({
      first_name:        firstName,
      phone:             normalisedPhone,
      email:             cleanEmail,
      issue_vertical:    issueVertical,
      landing_page_url:  landingPageUrl,
      utm_source:        utmSource,
      utm_campaign:      utmCampaign,
      utm_medium:        utmMedium,
      utm_content:       utmContent,
      source:            typeof source === 'string' ? source : undefined,
      quiz_completed:    quizCompleted ? 'true' : undefined,
      quiz_answers:      quizAnswersJson,
    }).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  )

  let fynoStatus: { ok: boolean; status?: number; body?: string; error?: string } = { ok: false, error: 'no_api_key' }
  if (process.env.FYNO_API_KEY && process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID) {
    try {
      const fynoBody = {
        event: 'lead_created',
        // Fyno channel keys (not phone_number).
        to: {
          sms:      normalisedPhone,
          whatsapp: normalisedPhone,
          ...(cleanEmail ? { email: cleanEmail } : {}),
        },
        data: fynoData,
      }
      console.log('[lead] Fyno payload:', JSON.stringify(fynoBody))
      const resp = await fetch(
        `https://api.fyno.io/v1/${process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID}/event`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.FYNO_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fynoBody),
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
