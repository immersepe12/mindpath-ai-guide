// app/api/track/meta-diag/route.ts
// Diagnostic endpoint — fires a synthetic Meta CAPI event using the same
// pipeline real events use, then returns Meta's raw response.
//
//   curl -s "https://cadabamsmindtalk.com/api/track/meta-diag?key=<KEY>"
//
// Returns the env-var presence, Meta API status, and Meta's response body.
// Add ?event_name=Lead etc. to test specific events.
//
// Locked behind a key so it's not publicly fireable. Set DIAG_KEY in env.

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url        = new URL(req.url)
  const providedKey = url.searchParams.get('key') ?? ''
  const expectedKey = process.env.DIAG_KEY

  if (!expectedKey || providedKey !== expectedKey) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const PIXEL_ID     = process.env.META_CAPI_PIXEL_ID
  const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
  const TEST_CODE    = process.env.META_CAPI_TEST_EVENT_CODE

  const envState = {
    META_CAPI_PIXEL_ID_present:        !!PIXEL_ID,
    META_CAPI_PIXEL_ID_preview:        PIXEL_ID ? PIXEL_ID.slice(0, 6) + '…' : null,
    META_CAPI_ACCESS_TOKEN_present:    !!ACCESS_TOKEN,
    META_CAPI_ACCESS_TOKEN_length:     ACCESS_TOKEN?.length ?? 0,
    META_CAPI_TEST_EVENT_CODE_present: !!TEST_CODE,
    NEXT_PUBLIC_FB_PIXEL_ID_present:   !!process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    NEXT_PUBLIC_FB_PIXEL_ID_matches_capi:
      !!PIXEL_ID && process.env.NEXT_PUBLIC_FB_PIXEL_ID === PIXEL_ID,
  }

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({
      ok: false,
      reason: 'env_missing',
      env: envState,
    }, { status: 500 })
  }

  const eventName = url.searchParams.get('event_name') ?? 'Lead'
  const eventId   = `diag_${Date.now()}`
  const body = {
    data: [{
      event_name:    eventName,
      event_time:    Math.floor(Date.now() / 1000),
      event_id:      eventId,
      action_source: 'website',
      event_source_url: 'https://cadabamsmindtalk.com/api/track/meta-diag',
      user_data: {
        client_ip_address: req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1',
        client_user_agent: req.headers.get('user-agent') ?? 'meta-capi-diag/1.0',
      },
      custom_data: { diagnostic: true, currency: 'INR', value: 0 },
    }],
    ...(TEST_CODE ? { test_event_code: TEST_CODE } : {}),
  }

  const start = Date.now()
  let status = 0
  let respBody = ''
  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      },
    )
    status = res.status
    respBody = await res.text()
  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      reason: 'fetch_error',
      error: e?.message,
      env: envState,
    }, { status: 500 })
  }

  return NextResponse.json({
    ok: status >= 200 && status < 300,
    elapsedMs: Date.now() - start,
    metaStatus: status,
    metaBody: respBody,
    eventId,
    eventName,
    env: envState,
    note: TEST_CODE
      ? 'TEST_EVENT_CODE is set — events will appear in Meta\'s Test Events tab, not in production aggregates.'
      : 'No TEST_EVENT_CODE — events will appear in production aggregates within a few minutes.',
  })
}
