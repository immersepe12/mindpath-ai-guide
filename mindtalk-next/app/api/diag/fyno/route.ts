import { NextRequest, NextResponse } from 'next/server'

/**
 * GET  /api/diag/fyno  → reports env-var presence (no values leaked)
 * POST /api/diag/fyno  → also fires a live test event to Fyno using the
 *                        configured creds and returns the upstream response.
 *                        Auth-gated by the DIAG_TOKEN header so it can't be
 *                        abused publicly.
 *
 * Use POST in prod with: curl -X POST https://cadabamsmindtalk.com/api/diag/fyno \
 *   -H "x-diag-token: $DIAG_TOKEN"
 */

function presence() {
  const FYNO_WORKSPACE = process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID
  const FYNO_API_KEY = process.env.FYNO_API_KEY
  const FYNO_API_KEY_PUBLIC_LEGACY = process.env.NEXT_PUBLIC_FYNO_API_KEY
  const FRESHSALES = process.env.FRESHSALES_API_KEY

  return {
    NEXT_PUBLIC_FYNO_WORKSPACE_ID: {
      present: !!FYNO_WORKSPACE,
      length: FYNO_WORKSPACE?.length ?? 0,
      preview: FYNO_WORKSPACE ? `${FYNO_WORKSPACE.slice(0, 4)}…${FYNO_WORKSPACE.slice(-2)}` : null,
    },
    FYNO_API_KEY: {
      present: !!FYNO_API_KEY,
      length: FYNO_API_KEY?.length ?? 0,
    },
    NEXT_PUBLIC_FYNO_API_KEY: {
      present: !!FYNO_API_KEY_PUBLIC_LEGACY,
      length: FYNO_API_KEY_PUBLIC_LEGACY?.length ?? 0,
      note: 'unused at runtime — server uses FYNO_API_KEY (no NEXT_PUBLIC_ prefix). If only this is set, server-side Fyno will silently no-op.',
    },
    FRESHSALES_API_KEY: {
      present: !!FRESHSALES,
      length: FRESHSALES?.length ?? 0,
    },
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

  const env = presence()
  const FYNO_WORKSPACE = process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID
  const FYNO_API_KEY = process.env.FYNO_API_KEY

  if (!FYNO_WORKSPACE || !FYNO_API_KEY) {
    return NextResponse.json(
      { ok: false, reason: 'missing_env', env },
      { status: 412 },
    )
  }

  // Fire a live test event. Use a clearly-fake phone so it can be filtered
  // out of any downstream audience.
  const testEventId = `diag-${Date.now()}`
  const url = `https://api.fyno.io/v1/${FYNO_WORKSPACE}/event`
  const payload = {
    event: 'lead_created',
    to: { phone_number: '+919999900099', email: 'diag@cadabamsmindtalk.com' },
    data: {
      name: 'Diag Test',
      vertical: 'anxiety',
      lp_url: 'https://cadabamsmindtalk.com/anxiety',
      utm_source: 'diag',
      utm_campaign: testEventId,
      _diag: true,
    },
  }

  let upstreamStatus: number | null = null
  let upstreamBody = ''
  let fetchError: string | null = null

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FYNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    upstreamStatus = resp.status
    upstreamBody = (await resp.text()).slice(0, 800)
  } catch (err) {
    fetchError = err instanceof Error ? err.message : String(err)
  }

  return NextResponse.json({
    ok: !fetchError && upstreamStatus !== null && upstreamStatus < 400,
    request: { url, event: payload.event, eventId: testEventId },
    upstream: { status: upstreamStatus, body: upstreamBody, error: fetchError },
    env,
  })
}
