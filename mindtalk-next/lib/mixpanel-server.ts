// lib/mixpanel-server.ts
// Tiny server-side Mixpanel HTTP API helper. EU region.
// Used by API routes that need to fire Mixpanel events when no browser is present
// (e.g. Razorpay webhook, server-side Lead/Purchase mirror).

const TOKEN = process.env.MIXPANEL_PROJECT_TOKEN ?? process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
const ENDPOINT = 'https://api-eu.mixpanel.com/track'

// All MindTalk landing-page events share this prefix so they're easy to filter
// in Mixpanel away from the main Cadabams app events (same project token).
const EVENT_PREFIX = 'CM_LP_'
function prefixed(event: string): string {
  return event.startsWith(EVENT_PREFIX) ? event : `${EVENT_PREFIX}${event}`
}

export interface MixpanelServerEvent {
  event: string
  distinctId?: string         // typically the user's email or lead_id
  properties?: Record<string, unknown>
}

export async function trackMixpanelServer(input: MixpanelServerEvent): Promise<void> {
  if (!TOKEN) {
    console.warn('[mixpanel-server] MIXPANEL_PROJECT_TOKEN not set — skipping')
    return
  }
  const eventName = prefixed(input.event)
  const payload = {
    event: eventName,
    properties: {
      token:        TOKEN,
      time:         Math.floor(Date.now() / 1000),
      distinct_id:  input.distinctId ?? `server_${Date.now()}`,
      $insert_id:   `${eventName}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
      ...(input.properties ?? {}),
    },
  }

  try {
    const body = `data=${encodeURIComponent(Buffer.from(JSON.stringify(payload)).toString('base64'))}`
    const res = await fetch(ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    if (!res.ok) {
      const text = await res.text()
      console.warn(`[mixpanel-server] ${input.event} ${res.status}: ${text.slice(0, 200)}`)
    }
  } catch (e: any) {
    console.warn('[mixpanel-server] fetch error:', e?.message)
  }
}
