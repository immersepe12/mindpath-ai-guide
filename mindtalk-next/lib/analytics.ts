import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'DEBUG_NO_TOKEN'
const FYNO_WORKSPACE = process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID
const FYNO_API_KEY   = process.env.NEXT_PUBLIC_FYNO_API_KEY

export function initAnalytics() {
  if (typeof window === 'undefined') return
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
  setTimeout(() => {
    mixpanel.track('analytics_test', { source: 'init_check' })
    console.log('[MindTalk Analytics] Test event fired')
  }, 1000)
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

function track(event: string, props?: Record<string,unknown>) {
  if (!MIXPANEL_TOKEN) return
  try { mixpanel.track(event, { ...getStoredUTMs(), ...props }) } catch {}
}

// ─── PAGE EVENTS ─────────────────────────────────────────────────────────────

export function trackPageView(pageName: string, props?: Record<string,unknown>) {
  if (typeof window === 'undefined') return
  track('page_viewed', { page: pageName, url: window.location.href, ...props })
}

export function trackScrollDepth(page: string, depth: 25 | 50 | 75 | 100) {
  track('scroll_depth_reached', { page, depth_percent: depth })
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

export function trackResultCTAClick(ctaType: 'see_programme' | 'talk_to_counsellor', vertical: string) {
  track('result_cta_clicked', { cta_type: ctaType, vertical })
}

// ─── VERTICAL PAGE EVENTS ─────────────────────────────────────────────────────

export function trackVerticalPageView(vertical: string) {
  track('vertical_page_viewed', { vertical, url: typeof window !== 'undefined' ? window.location.href : '' })
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

  if (MIXPANEL_TOKEN) {
    try {
      mixpanel.identify(data.email)
      mixpanel.people.set({
        $name:  data.name,
        $email: data.email,
        $phone: phone,
        vertical,
        readiness_score: data.readinessScore,
        duration_of_issue: data.durationOfIssue,
        prior_therapy: data.priorTherapy,
        ...utms,
      })
      track('lead_submitted', {
        vertical,
        duration_of_issue: data.durationOfIssue,
        prior_therapy:     data.priorTherapy,
        readiness_score:   data.readinessScore,
        quiz_score:        data.quizScore,
        lp_url:            LP_URLS[vertical],
      })
    } catch {}
  }

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
