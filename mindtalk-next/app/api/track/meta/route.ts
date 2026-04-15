// app/api/track/meta/route.ts
// Generic browser → CAPI relay. Browser fires Pixel + posts here so the
// matching server-side event lands too (with shared event_id for dedup).
import { NextRequest, NextResponse } from 'next/server'
import { sendMetaEvent, extractRequestUserData, type MetaEventName, type MetaCustomData, type MetaUserData } from '@/lib/meta-capi'

interface Body {
  eventName:        MetaEventName
  eventId:          string
  eventSourceUrl?:  string
  customData?:      MetaCustomData
  userData?:        MetaUserData
}

export async function POST(req: NextRequest) {
  let body: Body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  if (!body?.eventName || !body?.eventId) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  const reqUser = extractRequestUserData(req)
  const userData: MetaUserData = {
    ...(body.userData ?? {}),
    clientIp:  reqUser.clientIp,
    userAgent: reqUser.userAgent,
    fbp:       body.userData?.fbp ?? reqUser.fbp,
    fbc:       body.userData?.fbc ?? reqUser.fbc,
  }

  await sendMetaEvent({
    eventName:       body.eventName,
    eventId:         body.eventId,
    eventSourceUrl:  body.eventSourceUrl,
    customData:      body.customData,
    userData,
  })

  return NextResponse.json({ ok: true })
}
