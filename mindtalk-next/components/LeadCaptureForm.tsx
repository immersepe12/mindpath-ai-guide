'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { trackLeadSubmitted, trackInlineFormSubmitted, trackInlineFormError } from '@/lib/analytics'
import WhatsAppGate from '@/components/WhatsAppGate'

interface LeadCaptureFormProps {
  vertical: string
  /** Button label override */
  ctaText?: string
  /** Show the pricing badge above the form */
  showPrice?: boolean
}

/**
 * Normalise phone input so only 10 local digits remain in the field, even
 * when the browser autofills a full international number like "+919876543210".
 */
function normalisePhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  // Autofill often includes country code — strip leading 91 if over 10 digits
  if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2)
  // Some users include leading 0 for local dialling
  if (digits.startsWith('0')) digits = digits.slice(1)
  return digits.slice(0, 10)
}

export default function LeadCaptureForm({
  vertical,
  ctaText = 'Get my programme match',
  showPrice = true,
}: LeadCaptureFormProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const phoneRef = useRef<HTMLInputElement>(null)

  // Safety net: Chrome autofill can bypass React's onChange synthesis. Poll
  // the raw DOM value for the first 2s after mount and re-normalise if it
  // ever contains the country code.
  useEffect(() => {
    const el = phoneRef.current
    if (!el) return
    const syncFromDOM = () => {
      const normalised = normalisePhoneInput(el.value)
      if (normalised !== el.value) {
        el.value = normalised
      }
      if (normalised !== phone) setPhone(normalised)
    }
    syncFromDOM()
    const interval = setInterval(syncFromDOM, 200)
    const stop = setTimeout(() => clearInterval(interval), 2000)
    return () => { clearInterval(interval); clearTimeout(stop) }

  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) {
      const missing: string[] = []
      if (!name.trim())  missing.push('name')
      if (!phone.trim()) missing.push('phone')
      setError('Please enter your name and mobile number.')
      // Per-field detail so Mixpanel actually tells us which field bounced
      // people, e.g. `missing_fields:phone` (autofill timing) vs
      // `missing_fields:name,phone` (tapped CTA without typing anything).
      trackInlineFormError(vertical, `missing_fields:${missing.join(',')}`)
      return
    }

    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      trackInlineFormError(vertical, 'invalid_phone')
      return
    }

    // Email is optional. Only validate format if the user typed something.
    const trimmedEmail = email.trim()
    if (trimmedEmail && (!trimmedEmail.includes('@') || !trimmedEmail.includes('.'))) {
      setError('Please enter a valid email address (or leave it blank).')
      trackInlineFormError(vertical, 'invalid_email')
      return
    }

    setError('')
    setSubmitting(true)

    let utms: Record<string, string> = {}
    try {
      utms = JSON.parse(localStorage.getItem('mindtalk_utms') || '{}')
    } catch {}

    try {
      // Submit lead to CRM + Fyno
      const leadResp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: digits,
          email: trimmedEmail,
          vertical,
          utmSource: utms.utm_source ?? '',
          utmMedium: utms.utm_medium ?? '',
          utmCampaign: utms.utm_campaign ?? '',
          utmContent: utms.utm_content ?? '',
          pageUrl: window.location.href,
        }),
      })
      const leadData = await leadResp.json().catch(() => ({}))
      if (!leadResp.ok || !leadData?.success) {
        console.warn('[lead-form] /api/lead did not succeed:', leadResp.status, leadData)
      } else {
        console.log('[lead-form] /api/lead ok:', leadData)
      }

      // Track inline form submission (distinct from quiz contact form)
      trackInlineFormSubmitted(vertical)

      // Mixpanel + Meta Lead (Pixel + CAPI)
      trackLeadSubmitted({
        name: name.trim(),
        phone: digits,
        email: email.trim(),
        verticalRaw: vertical,
      })

      // Redirect to result page with pre-filled data
      const resultParams = new URLSearchParams({
        vertical,
        name: name.trim(),
        phone: digits,
        email: email.trim(),
      })
      router.push(`/quiz/result?${resultParams.toString()}`)
    } catch {
      setError('Something went wrong. Please try again or WhatsApp us.')
      setSubmitting(false)
    }
  }

  return (
    <div id="lead-form" className="scroll-mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8"
      >
        {showPrice && (
          <div className="text-center mb-5">
            <div className="text-2xl font-bold text-gray-900">₹7,799</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Full 90-day programme · Less than ₹650/session
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <Label htmlFor="lead-name" className="sr-only">First name</Label>
            <Input
              id="lead-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name"
              autoComplete="given-name"
            />
          </div>
          <div>
            <Label htmlFor="lead-phone" className="sr-only">Mobile number</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-base pointer-events-none select-none">
                +91
              </span>
              <Input
                ref={phoneRef}
                id="lead-phone"
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(normalisePhoneInput(e.target.value))}
                onBlur={(e) => setPhone(normalisePhoneInput(e.target.value))}
                placeholder="98765 43210"
                autoComplete="tel-national"
                maxLength={10}
                className="pl-14"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="lead-email" className="sr-only">Email address (optional)</Label>
            <Input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              autoComplete="email"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}

        <Button
          type="submit"
          size="hero"
          className="w-full mt-4"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : ctaText}
        </Button>

        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-xs text-gray-400">or</span>
          <WhatsAppGate location="lead_form" vertical={vertical}>
            <button
              type="button"
              className="text-xs text-[#E8521A] font-medium hover:underline"
            >
              Talk to a counsellor on WhatsApp
            </button>
          </WhatsAppGate>
        </div>

        <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
          A Cadabams counsellor will call you within a few hours.
          <br />
          Full refund after session 1 if not right for you.
        </p>
      </form>
    </div>
  )
}
