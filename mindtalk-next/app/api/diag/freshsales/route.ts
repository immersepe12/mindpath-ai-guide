import { NextRequest, NextResponse } from 'next/server'

/**
 * GET  /api/diag/freshsales        → env presence (no values leaked)
 * POST /api/diag/freshsales        → fires a phone-ONLY test contact and
 *                                    returns the raw Freshsales response.
 *                                    Auth: x-diag-token: $DIAG_TOKEN.
 *
 * Why this exists: 56 of 80 leads in the CSV are phone-only and only 4 of
 * the 80 made it to Freshsales. The /api/lead route already logs Freshsales
 * errors but the body is truncated and only visible in Vercel logs. This
 * endpoint reproduces the phone-only path on demand so we can see the
 * exact upstream rejection (most likely "email required" or "duplicate
 * mobile_number" or a custom-field validation failure).
 */

function presence() {
  const FRESHSALES_API_KEY = process.env.FRESHSALES_API_KEY
  return {
    FRESHSALES_API_KEY: {
      present: !!FRESHSALES_API_KEY,
      length: FRESHSALES_API_KEY?.length ?? 0,
    },
    DIAG_TOKEN: { present: !!process.env.DIAG_TOKEN },
    runtime: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV ?? null,
      VERCEL_REGION: process.env.VERCEL_REGION ?? null,
    },
  }
}

function authorized(req: NextRequest): boolean {
  const expected = process.env.DIAG_TOKEN
  if (!expected) return false
  const got = req.headers.get('x-diag-token')
  return !!got && got === expected
}

export async function GET() {
  return NextResponse.json({ env: presence() })
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json(
      {
        error: 'unauthorized',
        hint: 'Set DIAG_TOKEN in Vercel env vars, then call with header x-diag-token: <token>',
        env: presence(),
      },
      { status: 401 },
    )
  }

  const FRESHSALES = process.env.FRESHSALES_API_KEY
  if (!FRESHSALES) {
    return NextResponse.json({ ok: false, reason: 'missing_FRESHSALES_API_KEY' }, { status: 412 })
  }

  // Optional overrides via JSON body — defaults to a clearly-fake phone-only
  // contact so the user can mark it as junk in Freshsales after the test.
  let bodyOverrides: Record<string, unknown> = {}
  try {
    bodyOverrides = await req.json()
  } catch {
    // body is optional; ignore parse errors
  }

  const stamp = Date.now()
  const phone = (bodyOverrides.phone as string) ?? `+9199999${String(stamp).slice(-5)}`
  const name  = (bodyOverrides.name  as string) ?? `Diag PhoneOnly ${stamp}`
  const sendEmail = bodyOverrides.email === undefined ? false : !!bodyOverrides.email

  // Mirror the production lead-route shape exactly so we test the same path
  // that real form submissions hit. Difference: no email by default.
  const freshsalesPayload: Record<string, unknown> = {
    contact: {
      first_name: name,
      mobile_number: phone,
      lead_source: 'diag',
      ...(sendEmail ? { email: bodyOverrides.email } : {}),
      medium: `diag-${stamp}`,
      campaign: 'diag',
      keyword: 'phone-only',
      custom_field: {
        cf_form_source_custom: 'diag',
        cf_score: '',
        cf_customer_category: '',
        cf_relationship: '',
        cf_gender: '',
      },
    },
  }

  let upstreamStatus: number | null = null
  let upstreamBody = ''
  let fetchError: string | null = null

  try {
    const resp = await fetch('https://cadabams.myfreshworks.com/crm/sales/api/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Token token=${FRESHSALES}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(freshsalesPayload),
    })
    upstreamStatus = resp.status
    upstreamBody = (await resp.text()).slice(0, 1500)
  } catch (err) {
    fetchError = err instanceof Error ? err.message : String(err)
  }

  return NextResponse.json({
    ok: !fetchError && upstreamStatus !== null && upstreamStatus < 400,
    request: { phone, name, withEmail: sendEmail },
    payload: freshsalesPayload,
    upstream: { status: upstreamStatus, body: upstreamBody, error: fetchError },
    env: presence(),
  })
}
