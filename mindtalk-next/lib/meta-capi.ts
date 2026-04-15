// lib/meta-capi.ts
// Server-side Meta Conversions API helper.
// SHA-256 hashes PII before sending. Production hostname only.
// Never throws — analytics must not break business flow.

import crypto from 'crypto'

const PIXEL_ID     = process.env.META_CAPI_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
const TEST_CODE    = process.env.META_CAPI_TEST_EVENT_CODE

const ENDPOINT = (id: string) =>
  `https://graph.facebook.com/v18.0/${id}/events`

function sha256(value?: string | number | null): string | undefined {
  if (value === undefined || value === null || value === '') return undefined
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex')
}

function normPhone(raw?: string): string | undefined {
  if (!raw) return undefined
  const digits = String(raw).replace(/\D/g, '')
  if (!digits) return undefined
  if (digits.length === 10) return `91${digits}`
  return digits
}

export type MetaEventName =
  | 'ViewContent'
  | 'Lead'
  | 'Contact'
  | 'InitiateCheckout'
  | 'CompleteRegistration'
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'Subscribe'
  | 'Purchase'

export interface MetaUserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  externalId?: string | number
  dob?: string         // YYYYMMDD
  country?: string     // 2-letter, e.g. 'in'
  city?: string
  fbp?: string
  fbc?: string
  clientIp?: string
  userAgent?: string
}

export interface MetaCustomData {
  value?: number
  currency?: string         // ISO 4217, e.g. 'INR'
  content_name?: string
  content_category?: string
  content_ids?: (string | number)[]
  content_type?: string     // 'product' | 'product_group'
  num_items?: number
  order_id?: string
  subscription_id?: string
  predicted_ltv?: number
  [key: string]: unknown
}

export interface SendMetaEventInput {
  eventName: MetaEventName
  eventId: string                // required for Pixel↔CAPI dedup
  eventSourceUrl?: string
  actionSource?: 'website' | 'app' | 'system_generated' | 'other'
  userData?: MetaUserData
  customData?: MetaCustomData
}

export async function sendMetaEvent(input: SendMetaEventInput): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('[meta-capi] META_CAPI_PIXEL_ID or META_CAPI_ACCESS_TOKEN not set — skipping')
    return
  }

  const u = input.userData ?? {}
  const phone = normPhone(u.phone)

  const userData: Record<string, unknown> = {
    em:          u.email      ? [sha256(u.email)] : undefined,
    ph:          phone        ? [sha256(phone)]   : undefined,
    fn:          u.firstName  ? [sha256(u.firstName)] : undefined,
    ln:          u.lastName   ? [sha256(u.lastName)]  : undefined,
    external_id: u.externalId !== undefined ? [sha256(u.externalId)] : undefined,
    db:          u.dob        ? [sha256(u.dob)]   : undefined,
    country:     u.country    ? [sha256(u.country)] : undefined,
    ct:          u.city       ? [sha256(u.city)]  : undefined,
    fbp:         u.fbp,
    fbc:         u.fbc,
    client_ip_address:  u.clientIp,
    client_user_agent:  u.userAgent,
  }

  // Strip undefined keys
  Object.keys(userData).forEach(k => userData[k] === undefined && delete userData[k])

  const body: Record<string, unknown> = {
    data: [{
      event_name:        input.eventName,
      event_time:        Math.floor(Date.now() / 1000),
      event_id:          input.eventId,
      action_source:     input.actionSource ?? 'website',
      event_source_url:  input.eventSourceUrl,
      user_data:         userData,
      custom_data:       input.customData ?? {},
    }],
  }
  if (TEST_CODE) body.test_event_code = TEST_CODE

  try {
    const res = await fetch(`${ENDPOINT(PIXEL_ID)}?access_token=${ACCESS_TOKEN}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    const text = await res.text()
    if (!res.ok) {
      console.warn(`[meta-capi] ${input.eventName} ${res.status}: ${text.slice(0, 300)}`)
    } else if (process.env.NODE_ENV !== 'production') {
      console.log(`[meta-capi] ${input.eventName} OK: ${text.slice(0, 200)}`)
    }
  } catch (e: any) {
    console.warn('[meta-capi] fetch error:', e?.message)
  }
}

// Helper for API routes — extract IP, UA, fbp, fbc from a NextRequest
export function extractRequestUserData(req: Request): Pick<MetaUserData, 'clientIp'|'userAgent'|'fbp'|'fbc'> {
  const headers   = req.headers
  const userAgent = headers.get('user-agent') ?? undefined
  const xff       = headers.get('x-forwarded-for') ?? ''
  const clientIp  = xff.split(',')[0].trim() || headers.get('x-real-ip') || undefined
  const cookies   = headers.get('cookie') ?? ''
  const fbp = /(?:^|;\s*)_fbp=([^;]+)/.exec(cookies)?.[1]
  const fbc = /(?:^|;\s*)_fbc=([^;]+)/.exec(cookies)?.[1]
  return { clientIp: clientIp ?? undefined, userAgent, fbp, fbc }
}

export function newEventId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}
