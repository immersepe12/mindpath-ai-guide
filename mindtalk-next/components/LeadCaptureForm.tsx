'use client'
import { useState } from 'react'
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Please fill in all fields.')
      trackInlineFormError(vertical, 'missing_fields')
      return
    }

    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      trackInlineFormError(vertical, 'invalid_phone')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.')
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
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: digits,
          email: email.trim(),
          vertical,
          utmSource: utms.utm_source ?? '',
          utmMedium: utms.utm_medium ?? '',
          utmCampaign: utms.utm_campaign ?? '',
          utmContent: utms.utm_content ?? '',
          pageUrl: window.location.href,
        }),
      })

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
            <Input
              id="lead-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile number"
              autoComplete="tel"
            />
          </div>
          <div>
            <Label htmlFor="lead-email" className="sr-only">Email address</Label>
            <Input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
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
