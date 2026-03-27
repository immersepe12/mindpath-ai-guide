import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
const FYNO_WORKSPACE = process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID
const FYNO_API_KEY   = process.env.NEXT_PUBLIC_FYNO_API_KEY
const FYNO_EVENT     = 'lead_created'

export function initAnalytics() {
  if (!MIXPANEL_TOKEN) {
    console.warn('[Analytics] NEXT_PUBLIC_MIXPANEL_TOKEN not set — tracking disabled')
    return
  }
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
    ignore_dnt: false,
  })
}

export function captureUTMs() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const stored: Record<string, string> = {}
  utmFields.forEach(k => {
    const v = params.get(k)
    if (v) stored[k] = v
  })
  if (Object.keys(stored).length > 0) {
    localStorage.setItem('mindtalk_utms', JSON.stringify(stored))
  }
}

function getStoredUTMs(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem('mindtalk_utms') || '{}')
  } catch {
    return {}
  }
}

type Vertical = 'anxiety' | 'depression' | 'relationship' | 'burnout'

function normaliseVertical(raw: string): Vertical {
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

const LP_URLS: Record<Vertical, string> = {
  anxiety:      'https://cadabamsmindtalk.com/anxiety',
  depression:   'https://cadabamsmindtalk.com/emotional-reset',
  relationship: 'https://cadabamsmindtalk.com/relationships',
  burnout:      'https://cadabamsmindtalk.com/burnout',
}

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
  const vertical = normaliseVertical(data.verticalRaw)
  const phone    = normalisePhone(data.phone)
  const utms     = getStoredUTMs()

  // 1. Mixpanel
  if (MIXPANEL_TOKEN) {
    mixpanel.identify(data.email)
    mixpanel.people.set({
      $name:  data.name,
      $email: data.email,
      $phone: phone,
      vertical,
      ...utms,
    })
    mixpanel.track('lead_submitted', {
      vertical,
      duration_of_issue: data.durationOfIssue,
      prior_therapy:     data.priorTherapy,
      readiness_score:   data.readinessScore,
      quiz_score:        data.quizScore,
      lp_url:            LP_URLS[vertical],
      ...utms,
    })
  }

  // 2. Fyno — trigger nurture sequence
  if (FYNO_WORKSPACE && FYNO_API_KEY) {
    try {
      await fetch(`https://api.fyno.io/v1/${FYNO_WORKSPACE}/event`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${FYNO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: FYNO_EVENT,
          to: {
            phone_number: phone,
            email: data.email,
          },
          data: {
            name:     data.name,
            vertical,
            lp_url:   LP_URLS[vertical],
            duration: data.durationOfIssue ?? '',
          },
        }),
      })
    } catch (err) {
      console.error('[Analytics] Fyno trigger failed:', err)
    }
  }
}

export function trackQuizStep(step: number, question: string, answer: string | string[]) {
  if (!MIXPANEL_TOKEN) return
  mixpanel.track('quiz_step_completed', {
    step,
    question,
    answer: Array.isArray(answer) ? answer.join(', ') : answer,
  })
}

export function trackCTAClick(ctaLabel: string, location: string) {
  if (!MIXPANEL_TOKEN) return
  mixpanel.track('cta_clicked', { cta_label: ctaLabel, location })
}

export function trackPageView(pageName: string, properties?: Record<string, unknown>) {
  if (!MIXPANEL_TOKEN) return
  mixpanel.track('page_viewed', { page: pageName, ...properties })
}
