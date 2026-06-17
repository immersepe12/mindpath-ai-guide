// lib/crm/cadabamsCrm.ts
// Direct-write integration with the internal Cadabams CRM (Odoo at
// crm.cadabams.com). Replaces the existing Freshsales → Zapier → Cadabams
// CRM bridge with two API calls written directly from this server.
//
// Two records per lead:
//   1. POST /restapi/1.0/object/crm.lead       — the lead itself
//   2. POST /restapi/1.0/object/lead.activities — UTM + attribution row
//
// Gated by CADABAMS_CRM_DUAL_WRITE: 'off' | 'shadow' | 'on' (default 'off').
// Never throws. Never blocks the user response — the route handler should
// fire this alongside the primary CRM write via Promise.allSettled.
//
// Server-side only — env vars are not exposed to the browser.

export interface LeadContext {
  utm?: {
    utm_source?:   string
    utm_medium?:   string
    utm_campaign?: string
    utm_term?:     string
    utm_content?:  string
  }
  firstTouchUtm?: {
    utm_source?:   string
    utm_medium?:   string
    utm_campaign?: string
    utm_term?:     string
    utm_content?:  string
    landing_page?: string
    referrer?:     string
    first_visit?:  string
  }
  pageUrl?:            string
  referrer?:           string
  ctaSource?:          string
  ctaType?:            'book' | 'call' | 'whatsapp' | 'form'
  gclid?:              string
  fbclid?:             string
  msclkid?:            string
  mixpanelDistinctId?: string
}

export interface CadabamsCrmInput {
  phone:          string       // with country code, e.g. '+919876543210'
  mobile:         string       // digits only, no +91
  countryCodeId?: number       // default 402
  name:           string
  email?:         string
  zip?:           string
  userAgent?:     string
  context?:       LeadContext
}

export interface CadabamsCrmResult {
  ok:         boolean
  leadId?:    number
  activityId?: number
  error?:     string
  skipped?:   'disabled' | 'no-auth'
  shadow?:    boolean
}

// ── Lightweight UA parser ────────────────────────────────────────────
// No npm dep. Order matters: iOS before macOS (UA can contain both),
// Android before Linux (Android UAs contain 'Linux'), Edge before Chrome,
// Chrome before Safari.

function parseOs(ua?: string): string | undefined {
  if (!ua) return undefined
  if (/iPhone|iPad|iPod/i.test(ua))    return 'iOS'
  if (/Android/i.test(ua))             return 'Android'
  if (/Windows NT/i.test(ua))          return 'Windows'
  if (/Mac OS X/i.test(ua))            return 'macOS'
  if (/Linux/i.test(ua))               return 'Linux'
  return undefined
}

function parseBrowser(ua?: string): string | undefined {
  if (!ua) return undefined
  if (/Edg\//i.test(ua))               return 'Edge'
  if (/Chrome\//i.test(ua))            return 'Chrome'
  if (/Firefox\//i.test(ua))           return 'Firefox'
  if (/Safari\//i.test(ua))            return 'Safari'
  return undefined
}

// ── utm_term_note builder ────────────────────────────────────────────
// Everything that doesn't have a dedicated column on lead.activities goes
// here, serialised as `key=value | key=value | …`, capped at ~500 chars.

function buildUtmTermNote(input: CadabamsCrmInput): string | undefined {
  const ctx = input.context
  if (!ctx) return undefined
  const parts: string[] = []
  const push = (k: string, v?: string) => {
    if (v && v.trim()) parts.push(`${k}=${v.trim()}`)
  }
  push('utm_term',    ctx.utm?.utm_term)
  push('utm_content', ctx.utm?.utm_content)
  push('gclid',       ctx.gclid)
  push('fbclid',      ctx.fbclid)
  push('msclkid',     ctx.msclkid)
  // First-touch only emitted when it diverges from last-touch.
  const lastSource   = ctx.utm?.utm_source
  const lastCampaign = ctx.utm?.utm_campaign
  const ft = ctx.firstTouchUtm
  if (ft && (ft.utm_source !== lastSource || ft.utm_campaign !== lastCampaign)) {
    push('first_touch_source',   ft.utm_source)
    push('first_touch_campaign', ft.utm_campaign)
    push('first_touch_landing',  ft.landing_page)
    push('first_touch_at',       ft.first_visit)
  }
  push('mixpanel',    ctx.mixpanelDistinctId)
  push('page',        ctx.pageUrl)
  if (parts.length === 0) return undefined
  const joined = parts.join(' | ')
  return joined.length > 500 ? joined.slice(0, 497) + '...' : joined
}

// ── Odoo response shape (varies by endpoint/version) ─────────────────

function extractOdooId(body: unknown): number | undefined {
  if (typeof body !== 'object' || body === null) return undefined
  const b = body as Record<string, unknown>
  // Shape 1: { result: <id> }
  if (typeof b.result === 'number') return b.result
  // Shape 2: { result: { id: <id> } }
  if (typeof b.result === 'object' && b.result !== null) {
    const r = b.result as Record<string, unknown>
    if (typeof r.id === 'number') return r.id
  }
  // Shape 3: { id: <id> }
  if (typeof b.id === 'number') return b.id
  return undefined
}

// ── Main export ──────────────────────────────────────────────────────

export async function createCadabamsCrmLead(
  input: CadabamsCrmInput,
): Promise<CadabamsCrmResult> {
  // Read env on every call so flag flips don't need a redeploy.
  const mode    = (process.env.CADABAMS_CRM_DUAL_WRITE ?? 'off').toLowerCase()
  const auth    = process.env.CADABAMS_CRM_AUTH
  const base    = process.env.CADABAMS_CRM_BASE ?? 'https://crm.cadabams.com'
  const headerName = process.env.CADABAMS_CRM_AUTH_HEADER_NAME ?? 'Authorization'
  const userId  = process.env.CADABAMS_CRM_USER_ID ?? '1'
  const sourceIdEnv = process.env.CADABAMS_CRM_SOURCE_ID

  if (mode !== 'shadow' && mode !== 'on') {
    return { ok: false, skipped: 'disabled' }
  }
  if (!auth) {
    return { ok: false, skipped: 'no-auth' }
  }

  const shadow = mode === 'shadow'
  const sourceId = sourceIdEnv ? parseInt(sourceIdEnv, 10) : undefined
  const countryCodeId = input.countryCodeId ?? 402

  // ── Record 1: crm.lead ─────────────────────────────────────────────
  const leadBody: Record<string, unknown> = {
    type:          'lead',
    contact_name:  input.name,
    partner_name:  input.name,
    mobile:        input.mobile,
    caller_mobile: input.mobile,
    country_code:  countryCodeId,
  }
  if (input.email)             leadBody.email_from   = input.email
  if (input.email)             leadBody.caller_email = input.email
  if (input.zip)               leadBody.caller_zip   = input.zip
  if (Number.isFinite(sourceId)) leadBody.source_id   = sourceId

  let leadId: number | undefined
  try {
    const resp = await fetch(
      `${base}/restapi/1.0/object/crm.lead?user_id=${encodeURIComponent(userId)}`,
      {
        method:  'POST',
        headers: {
          [headerName]:   auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadBody),
        signal: AbortSignal.timeout(8000),
      },
    )
    const text = await resp.text()
    if (!resp.ok) {
      const err = `crm.lead HTTP ${resp.status}: ${text.slice(0, 300)}`
      console[shadow ? 'warn' : 'error'](`[cadabams-crm] ${err}`)
      return { ok: false, error: err, shadow }
    }
    let parsed: unknown
    try { parsed = JSON.parse(text) } catch {
      const err = `crm.lead non-JSON response: ${text.slice(0, 300)}`
      console[shadow ? 'warn' : 'error'](`[cadabams-crm] ${err}`)
      return { ok: false, error: err, shadow }
    }
    leadId = extractOdooId(parsed)
    if (!leadId) {
      const err = `crm.lead response missing id: ${text.slice(0, 300)}`
      console[shadow ? 'warn' : 'error'](`[cadabams-crm] ${err}`)
      return { ok: false, error: err, shadow }
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console[shadow ? 'warn' : 'error'](`[cadabams-crm] crm.lead fetch error: ${msg}`)
    return { ok: false, error: msg, shadow }
  }

  console.log(`[cadabams-crm] crm.lead created id=${leadId}${shadow ? ' [shadow]' : ''}`)

  // ── Record 2: lead.activities ──────────────────────────────────────
  // Non-fatal: if this fails the lead still exists.
  const ctx = input.context
  const activityBody: Record<string, unknown> = {
    crm_lead_id:       leadId,
    activity:          'form_submission',
    activity_property: ctx?.ctaSource || 'Lead Form',
    source:            'mindtalk_direct',
    utm_source:        ctx?.utm?.utm_source   ?? '',
    utm_medium:        ctx?.utm?.utm_medium   ?? '',
    utm_campaign:      ctx?.utm?.utm_campaign ?? '',
    utm_term_note:     buildUtmTermNote(input) ?? '',
    referral_url:      ctx?.referrer ?? '',
    date:              new Date().toISOString().slice(0, 10),
    os:                parseOs(input.userAgent) ?? '',
    browser:           parseBrowser(input.userAgent) ?? '',
  }

  let activityId: number | undefined
  try {
    const resp = await fetch(
      `${base}/restapi/1.0/object/lead.activities?user_id=${encodeURIComponent(userId)}`,
      {
        method:  'POST',
        headers: {
          [headerName]:   auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityBody),
        signal: AbortSignal.timeout(8000),
      },
    )
    const text = await resp.text()
    if (!resp.ok) {
      // Lead exists; activity is the optional second record. Log + continue.
      const err = `lead.activities HTTP ${resp.status}: ${text.slice(0, 300)}`
      console[shadow ? 'warn' : 'error'](`[cadabams-crm] ${err}`)
      return { ok: true, leadId, error: err, shadow }
    }
    try {
      const parsed = JSON.parse(text)
      activityId = extractOdooId(parsed)
    } catch {}
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console[shadow ? 'warn' : 'error'](`[cadabams-crm] lead.activities fetch error: ${msg}`)
    return { ok: true, leadId, error: msg, shadow }
  }

  console.log(`[cadabams-crm] lead.activities created id=${activityId ?? '?'} for lead=${leadId}${shadow ? ' [shadow]' : ''}`)
  return { ok: true, leadId, activityId, shadow }
}
