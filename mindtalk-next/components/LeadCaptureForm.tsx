'use client'
// Inline lead capture form for the vertical landing pages.
// Replaces the per-vertical quiz CTAs with a 2-field + optional-email
// submit-then-redirect flow. Hits the existing /api/lead endpoint
// (Freshsales + Fyno) and lands on /quiz/result with URL params so the
// result page renders the matched-programme card and the Meta Lead pixel
// fires there (preserves the URL-rule custom conversion match).
//
// Props:
//   vertical — one of 'anxiety' | 'depression' | 'burnout' | 'relationship'
//              (the /emotional-reset LP uses 'depression' since both LPs
//              funnel into the same Cadabams package).
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { trackInlineFormSubmitted, trackInlineFormError, trackLeadSubmitted } from '@/lib/analytics'

interface LeadCaptureFormProps {
  vertical: string
}

function normalisePhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('0')) digits = digits.slice(1)
  // Take the last 10 digits so doubled-prefix autofills ('+91+91…' → 14
  // digits) don't drop real digits off the right.
  if (digits.length > 10) digits = digits.slice(-10)
  return digits
}

export default function LeadCaptureForm({ vertical }: LeadCaptureFormProps) {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const name = firstName.trim()
    const digits = phone.replace(/\D/g, '')
    if (!name) {
      setError('Please enter your first name.')
      trackInlineFormError(vertical, 'missing_name')
      return
    }
    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      trackInlineFormError(vertical, 'invalid_phone')
      return
    }
    const trimmedEmail = email.trim()
    if (trimmedEmail && (!trimmedEmail.includes('@') || !trimmedEmail.includes('.'))) {
      setError('Please enter a valid email or leave it blank.')
      trackInlineFormError(vertical, 'invalid_email')
      return
    }

    setSubmitting(true)
    trackInlineFormSubmitted(vertical)

    let utms: Record<string, string> = {}
    try { utms = JSON.parse(localStorage.getItem('mindtalk_utms') || '{}') } catch {}

    // Fire-and-forget /api/lead with keepalive so the redirect happens
    // even if Freshsales backoff stretches the request several seconds.
    // The route still completes its full retry chain in the background.
    fetch('/api/lead', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone: digits,
        email: trimmedEmail,
        vertical,
        source: `lp_inline_${vertical}`,
        utmSource:   utms.utm_source   ?? '',
        utmMedium:   utms.utm_medium   ?? '',
        utmCampaign: utms.utm_campaign ?? '',
        utmContent:  utms.utm_content  ?? '',
        pageUrl:     typeof window !== 'undefined' ? window.location.href : '',
      }),
    }).catch(() => {})

    // Client-side Mixpanel identify + people.set so the lead is recorded
    // immediately, regardless of whether the redirect lands.
    try {
      trackLeadSubmitted({
        name,
        phone: digits,
        email: trimmedEmail,
        verticalRaw: vertical,
      })
    } catch {}

    // Redirect to /quiz/result so the Lead pixel fires there (matches the
    // 'URL contains quiz/result' Meta custom-conversion rule).
    // ?source=inline signals to QuizResult that we don't have quiz answers
    // — it'll swap the 'Why this fits you' block for generic copy.
    const params = new URLSearchParams({ vertical, name, phone: digits, source: 'inline' })
    if (trimmedEmail) params.set('email', trimmedEmail)
    router.push(`/quiz/result?${params.toString()}`)
  }

  return (
    <form id="lead-form" onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-md p-7" noValidate>
      <div className="text-xs font-semibold tracking-widest text-[#E8521A] uppercase mb-3">
        Find your match
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Get matched to the right psychologist
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        Leave your details — we&apos;ll match you to a Cadabams psychologist and call you back within a few hours.
      </p>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="lf-name">First name</Label>
            <Input
              id="lf-name"
              required
              className="mt-1.5"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              autoComplete="given-name"
              disabled={submitting}
            />
          </div>
          <div>
            <Label htmlFor="lf-phone">Mobile number</Label>
            <div className="relative mt-1.5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-base pointer-events-none select-none">
                +91
              </span>
              <Input
                id="lf-phone"
                required
                type="tel"
                inputMode="numeric"
                className="pl-14"
                value={phone}
                onChange={(e) => setPhone(normalisePhoneInput(e.target.value))}
                placeholder="98765 43210"
                autoComplete="tel-national"
                maxLength={10}
                disabled={submitting}
              />
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="lf-email">
            Email <span className="text-gray-400 font-normal">(optional)</span>
          </Label>
          <Input
            id="lf-email"
            type="email"
            className="mt-1.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
            disabled={submitting}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button
          type="submit"
          size="hero"
          className="w-full mt-2"
          disabled={submitting || !firstName.trim() || phone.replace(/\D/g, '').length !== 10}
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Submitting…
            </span>
          ) : (
            'Get my free programme match →'
          )}
        </Button>
        <p className="text-xs text-gray-400 text-center mt-1">
          Free · 2-minute match · No commitment
        </p>
      </div>
    </form>
  )
}
