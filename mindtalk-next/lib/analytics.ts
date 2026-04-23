import mixpanel from 'mixpanel-browser'
import { trackMetaPixel, newClientEventId, readFbCookies, type MetaPixelEvent } from '@/lib/meta-pixel'

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
const FYNO_WORKSPACE = process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID
const FYNO_API_KEY   = process.env.NEXT_PUBLIC_FYNO_API_KEY

export function initAnalytics() {
  if (typeof window === 'undefined') return
  if (!window.location.hostname.endsWith('cadabamsmindtalk.com')) {
    return
  }
  if (!MIXPANEL_TOKEN) {
    console.warn('[Analytics] NEXT_PUBLIC_MIXPANEL_TOKEN not set')
    return
  }
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    persistence: 'localStorage',
    ignore_dnt: false,
    api_host: 'https://api-eu.mixpanel.com',
  })
  console.log('[MindTalk Analytics] token value:',
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ? 'present' : 'MISSING - check Vercel env vars')
}

export function captureUTMs() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const utmFields = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']
  const stored: Record<string,string> = {}
  utmFields.forEach(k => {
    const v = params.get(k)
    if (v) stored[k] = v
  })
  if (Object.keys(stored).length > 0) {
    localStorage.setItem('mindtalk_utms', JSON.stringify(stored))
  }
}

export function getStoredUTMs(): Record<string,string> {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem('mindtalk_utms') || '{}') } catch { return {} }
}

export type Vertical = 'anxiety' | 'depression' | 'relationship' | 'burnout'

export function normaliseVertical(raw: string): Vertical {
  const v = raw.toLowerCase()
  if (v.includes('anxiety') || v.includes('stress')) return 'anxiety'
  if (v.includes('depress') || v.includes('emotion') || v.includes('mood') || v.includes('reset')) return 'depression'
  if (v.includes('relation') || v.includes('break') || v.includes('grief')) return 'relationship'
  if (v.includes('burn') || v.includes('work') || v.includes('exhaust')) return 'burnout'
  return 'anxiety'
}

function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('91') && digits.length === 12) return `+${digits}`
  if (digits.length === 10) return `+91${digits}`
  return `+${digits}`
}

const LP_URLS: Record<Vertical,string> = {
  anxiety:      'https://cadabamsmindtalk.com/anxiety',
  depression:   'https://cadabamsmindtalk.com/depression',
  relationship: 'https://cadabamsmindtalk.com/relationships',
  burnout:      'https://cadabamsmindtalk.com/burnout',
}

// All MindTalk landing-page events share this prefix so they're easy to filter
// in Mixpanel away from the main Cadabams app events (same project token).
const EVENT_PREFIX = 'CM_LP_'

function prefixed(event: string): string {
  return event.startsWith(EVENT_PREFIX) ? event : `${EVENT_PREFIX}${event}`
}

function track(event: string, props?: Record<string,unknown>) {
  if (!MIXPANEL_TOKEN) return
  try { mixpanel.track(prefixed(event), { ...getStoredUTMs(), ...props }) } catch {}
}

// ─── PAGE EVENTS ─────────────────────────────────────────────────────────────

export function trackPageView(pageName: string, props?: Record<string,unknown>) {
  if (typeof window === 'undefined') return
  track('page_viewed', { page: pageName, url: window.location.href, ...props })
}

export function trackScrollDepth(page: string, depth: 25 | 50 | 75 | 100) {
  track('scroll_depth_reached', { page, depth_percent: depth })
}

// ─── INLINE LEAD FORM EVENTS (landing page, not quiz) ────────────────────────

export function trackInlineFormSubmitted(vertical: string) {
  track('inline_form_submitted', { vertical, url: typeof window !== 'undefined' ? window.location.href : '' })
}

export function trackInlineFormError(vertical: string, error: string) {
  track('inline_form_error', { vertical, error })
}

// ─── NAVIGATION / CTA EVENTS ─────────────────────────────────────────────────

export function trackCTAClick(ctaLabel: string, location: string, destination?: string) {
  if (typeof window === 'undefined') return
  track('cta_clicked', { cta_label: ctaLabel, location, destination })
}

export function trackNavClick(label: string, destination: string) {
  track('nav_clicked', { label, destination })
}

export function trackWhatsAppClick(location: string, vertical?: string) {
  track('whatsapp_clicked', { location, vertical })
  // Meta Contact (Pixel + CAPI + Mixpanel mirror as `meta_contact`)
  try { trackMetaContact(location, vertical) } catch {}
}

// ─── QUIZ EVENTS ─────────────────────────────────────────────────────────────

export function trackQuizStarted() {
  track('quiz_started', { url: typeof window !== 'undefined' ? window.location.href : '' })
}

export function trackQuizStepViewed(step: number, questionText: string) {
  track('quiz_step_viewed', { step, question: questionText })
}

export function trackQuizStep(step: number, question: string, answer: string | string[]) {
  if (typeof window === 'undefined') return
  track('quiz_step_completed', {
    step,
    question,
    answer: Array.isArray(answer) ? answer.join(', ') : answer,
  })
}

export function trackQuizAbandoned(step: number, lastQuestion: string) {
  track('quiz_abandoned', { abandoned_at_step: step, last_question: lastQuestion })
}

export function trackQuizContactFormViewed() {
  track('quiz_contact_form_viewed', { step: 6 })
}

export function trackQuizContactFieldFocused(fieldName: string) {
  track('quiz_contact_field_focused', { field: fieldName })
}

export function trackQuizSubmitAttempted() {
  track('quiz_submit_attempted')
}

export function trackQuizSubmitError(errorMessage: string) {
  track('quiz_submit_error', { error: errorMessage })
}

export function trackQuizCompleted(vertical: string, readinessScore: number) {
  track('quiz_completed', { vertical, readiness_score: readinessScore })
}

// ─── RESULT PAGE EVENTS ───────────────────────────────────────────────────────

export function trackResultPageViewed(vertical: string, name: string) {
  track('result_page_viewed', { vertical, has_name: !!name })
}

export function trackResultCTAClick(ctaType: 'start_programme' | 'see_programme' | 'talk_to_counsellor', vertical: string) {
  track('result_cta_clicked', { cta_type: ctaType, vertical })
}

// ─── VERTICAL PAGE EVENTS ─────────────────────────────────────────────────────

export function trackVerticalPageView(vertical: string) {
  track('vertical_page_viewed', { vertical, url: typeof window !== 'undefined' ? window.location.href : '' })
  // Also fire Meta ViewContent (Pixel + CAPI + Mixpanel mirror)
  try { trackMetaViewContent(vertical) } catch {}
}

export function trackVerticalCTAClick(vertical: string, ctaLabel: string, location: string) {
  track('vertical_cta_clicked', { vertical, cta_label: ctaLabel, location })
}

// ─── LEAD SUBMITTED ───────────────────────────────────────────────────────────

export interface LeadData {
  name: string
  phone: string
  email: string
  verticalRaw: string
  quizScore?: number
  durationOfIssue?: string
  priorTherapy?: string
  readinessScore?: number
}

export async function trackLeadSubmitted(data: LeadData): Promise<void> {
  if (typeof window === 'undefined') return
  const vertical = normaliseVertical(data.verticalRaw)
  const phone    = normalisePhone(data.phone)
  const utms     = getStoredUTMs()

  if (MIXPANEL_TOKEN && data.email) {
    try {
      // Alias before identify: in "Original" identity mode Mixpanel
      // needs this to link the anonymous $device profile to the email
      // canonical ID. Without it people.set() can silently no-op.
      try { mixpanel.alias(data.email) } catch {}
      mixpanel.identify(data.email)

      // Strip undefined/empty values — some SDK versions reject the
      // whole batch when undefined keys are present, which was
      // preventing the profile from being created.
      const profile: Record<string, unknown> = {
        $name:  data.name,
        $email: data.email,
        $phone: phone,
        vertical,
        readiness_score:   data.readinessScore,
        duration_of_issue: data.durationOfIssue,
        prior_therapy:     data.priorTherapy,
        ...utms,
      }
      Object.keys(profile).forEach(k => {
        if (profile[k] === undefined || profile[k] === '') delete profile[k]
      })
      mixpanel.people.set(profile)
      console.log('[Analytics] Mixpanel profile upserted for', data.email)

      track('lead_submitted', {
        // Contact details embedded on the event itself so leads can be
        // debugged from the event feed even when the anonymous $device
        // profile is separate from the identified one.
        name:              data.name,
        email:             data.email,
        phone,
        vertical,
        duration_of_issue: data.durationOfIssue,
        prior_therapy:     data.priorTherapy,
        readiness_score:   data.readinessScore,
        quiz_score:        data.quizScore,
        lp_url:            LP_URLS[vertical],
      })
    } catch (err) {
      console.error('[Analytics] Mixpanel identify/people.set failed:', err)
    }
  }

  // Meta Lead (Pixel + CAPI + Mixpanel mirror as `meta_lead`)
  try {
    trackMetaLead({
      vertical,
      phone:  data.phone,
      email:  data.email,
      name:   data.name,
      value:  0,
    })
  } catch {}

  if (FYNO_WORKSPACE && FYNO_API_KEY) {
    try {
      await fetch(`https://api.fyno.io/v1/${FYNO_WORKSPACE}/event`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${FYNO_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'lead_created',
          to: { phone_number: phone, email: data.email },
          data: { name: data.name, vertical, lp_url: LP_URLS[vertical], duration: data.durationOfIssue ?? '' },
        }),
      })
    } catch (err) {
      console.error('[Analytics] Fyno trigger failed:', err)
    }
  }
}

export function trackPurchaseConfirmed(email: string, vertical: string, price: number) {
  if (!MIXPANEL_TOKEN) return
  try {
    mixpanel.identify(email)
    mixpanel.people.track_charge(price)
    track('purchase_confirmed', { vertical, price, currency: 'INR' })
  } catch {}
}

// ─── META STANDARD EVENTS ────────────────────────────────────────────────────
// Each helper:
//   1. Fires Mixpanel (snake_case mirror, prefixed `meta_*`)
//   2. Fires Meta Pixel with a shared event_id
//   3. POSTs to /api/track/meta so server-side CAPI fires with the same id
// All gated by production hostname check inside trackMetaPixel and the API route.

interface MetaUserPii {
  email?:      string
  phone?:      string
  firstName?:  string
  lastName?:   string
  externalId?: string | number
  dob?:        string
  country?:    string
  city?:       string
}

interface MetaCustom {
  value?:           number
  currency?:        string
  content_name?:    string
  content_category?: string
  content_ids?:     (string | number)[]
  content_type?:    string
  num_items?:       number
  order_id?:        string
  subscription_id?: string
  predicted_ltv?:   number
  [key: string]:    unknown
}

function postCapi(eventName: MetaPixelEvent, eventId: string, customData?: MetaCustom, userData?: MetaUserPii) {
  if (typeof window === 'undefined') return
  if (!window.location.hostname.endsWith('cadabamsmindtalk.com')) return
  const fb = readFbCookies()
  // fire-and-forget; never break business flow
  fetch('/api/track/meta', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      eventName,
      eventId,
      eventSourceUrl: window.location.href,
      customData,
      userData: { ...(userData ?? {}), ...fb },
    }),
  }).catch(() => {})
}

function fireMetaEvent(
  eventName: MetaPixelEvent,
  mixpanelEvent: string,
  customData?: MetaCustom,
  userData?: MetaUserPii,
  opts?: { eventId?: string; skipCapiRelay?: boolean },
): string {
  // If caller passed an eventId, the server has already (or will) fire CAPI with
  // that same id — fire only Pixel + Mixpanel here so we don't duplicate on CAPI.
  const eventId      = opts?.eventId ?? newClientEventId()
  const skipRelay    = opts?.skipCapiRelay ?? !!opts?.eventId
  // 1. Mixpanel mirror
  track(mixpanelEvent, { ...customData, event_id: eventId })
  // 2. Meta Pixel (browser)
  trackMetaPixel(eventName, customData ?? {}, eventId)
  // 3. CAPI server relay (browser → /api/track/meta) unless skipped
  if (!skipRelay) postCapi(eventName, eventId, customData, userData)
  return eventId
}

export function trackMetaViewContent(vertical: string, value?: number) {
  return fireMetaEvent('ViewContent', 'meta_view_content', {
    content_category: vertical,
    content_name:     vertical,
    content_type:     'product',
    value,
    currency:         value !== undefined ? 'INR' : undefined,
  })
}

export function trackMetaLead(payload: { vertical?: string; phone?: string; email?: string; name?: string; value?: number }) {
  const [firstName, ...rest] = (payload.name ?? '').trim().split(/\s+/)
  return fireMetaEvent('Lead', 'meta_lead',
    {
      content_category: payload.vertical,
      value:            payload.value ?? 0,
      currency:         'INR',
    },
    {
      email:     payload.email,
      phone:     payload.phone,
      firstName: firstName || undefined,
      lastName:  rest.join(' ') || undefined,
      country:   'in',
    },
  )
}

export function trackMetaContact(location: string, vertical?: string) {
  return fireMetaEvent('Contact', 'meta_contact', {
    content_category: vertical,
    content_name:     `whatsapp_${location}`,
  })
}

export function trackMetaInitiateCheckout(payload: { vertical: string; value: number; contentName?: string }) {
  return fireMetaEvent('InitiateCheckout', 'meta_initiate_checkout', {
    content_category: payload.vertical,
    content_name:     payload.contentName,
    content_type:     'product',
    value:            payload.value,
    currency:         'INR',
    num_items:        1,
  })
}

export function trackMetaAddToCart(payload: { vertical: string; value: number; contentName?: string; packageId?: string | number }) {
  return fireMetaEvent('AddToCart', 'meta_add_to_cart', {
    content_category: payload.vertical,
    content_name:     payload.contentName,
    content_ids:      payload.packageId ? [payload.packageId] : undefined,
    content_type:     'product',
    value:            payload.value,
    currency:         'INR',
    num_items:        1,
  })
}

export function trackMetaCompleteRegistration(payload: { phone?: string; email?: string; name?: string; method?: string; eventId?: string }) {
  const [firstName, ...rest] = (payload.name ?? '').trim().split(/\s+/)
  return fireMetaEvent('CompleteRegistration', 'meta_complete_registration',
    { content_name: payload.method ?? 'otp_signup', currency: 'INR', value: 0 },
    {
      email:     payload.email,
      phone:     payload.phone,
      firstName: firstName || undefined,
      lastName:  rest.join(' ') || undefined,
      country:   'in',
    },
    { eventId: payload.eventId },        // dedup with server CAPI in /api/checkout/send-otp
  )
}

export function trackMetaAddPaymentInfo(payload: { vertical: string; value: number; phone?: string; email?: string; leadId?: string | number; eventId?: string }) {
  return fireMetaEvent('AddPaymentInfo', 'meta_add_payment_info',
    {
      content_category: payload.vertical,
      value:            payload.value,
      currency:         'INR',
    },
    {
      email:      payload.email,
      phone:      payload.phone,
      externalId: payload.leadId,
      country:    'in',
    },
    { eventId: payload.eventId },        // dedup with server CAPI in /api/checkout/verify-otp
  )
}

export function trackMetaPurchase(payload: {
  vertical:     string
  value:        number
  orderId:      string | number
  email?:       string
  phone?:       string
  name?:        string
  contentName?: string
}) {
  const [firstName, ...rest] = (payload.name ?? '').trim().split(/\s+/)
  return fireMetaEvent('Purchase', 'meta_purchase',
    {
      content_category: payload.vertical,
      content_name:     payload.contentName,
      content_ids:      [payload.orderId],
      content_type:     'product',
      value:            payload.value,
      currency:         'INR',
      num_items:        1,
      order_id:         String(payload.orderId),
    },
    {
      email:      payload.email,
      phone:      payload.phone,
      firstName:  firstName || undefined,
      lastName:   rest.join(' ') || undefined,
      externalId: payload.orderId,
      country:    'in',
    },
  )
}

export function trackMetaSubscribe(payload: {
  vertical:        string
  value:           number
  orderId:         string | number
  email?:          string
  phone?:          string
  contentName?:    string
}) {
  return fireMetaEvent('Subscribe', 'meta_subscribe',
    {
      content_category: payload.vertical,
      content_name:     payload.contentName,
      content_ids:      [payload.orderId],
      content_type:     'product',
      value:            payload.value,
      currency:         'INR',
      predicted_ltv:    payload.value,
      subscription_id:  String(payload.orderId),
    },
    {
      email:      payload.email,
      phone:      payload.phone,
      externalId: payload.orderId,
      country:    'in',
    },
  )
}
