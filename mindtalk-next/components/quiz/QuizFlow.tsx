'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  trackQuizStarted,
  trackQuizStepViewed,
  trackQuizStep,
  trackQuizAbandoned,
  trackQuizContactFormViewed,
  trackQuizContactFieldFocused,
  trackQuizSubmitAttempted,
  trackQuizSubmitError,
  trackQuizCompleted,
  trackLeadSubmitted,
  trackMetaViewContent,
} from '@/lib/analytics'

interface Option {
  label: string
  description?: string
  vertical?: string
  value?: string
  icon?: string
}

interface Question {
  id: number
  question: string
  subtext: string
  type: 'single' | 'multi' | 'scale' | 'contact'
  options?: Option[]
  optionsByVertical?: Record<string, Option[]>
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: Record<string, string>
  fields?: { name: string; label: string; type: string; required: boolean; hint?: string }[]
  disclaimer?: string
}

interface QuizFlowProps {
  questions: Question[]
}

export default function QuizFlow({ questions }: QuizFlowProps) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [contact, setContact] = useState({ firstName: '', phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const current = questions[step]
  const progress = ((step + 1) / questions.length) * 100
  const selectedVertical = (answers[1] as string) ?? 'anxiety'

  useEffect(() => {
    trackQuizStarted()
    trackQuizStepViewed(1, questions[0].question)
    // Meta ViewContent — user has entered the assessment funnel
    try { trackMetaViewContent('quiz') } catch {}
  }, [])

  useEffect(() => {
    if (step > 0) {
      trackQuizStepViewed(step + 1, questions[step].question)
    }
    if (questions[step]?.type === 'contact') {
      trackQuizContactFormViewed()
    }
  }, [step])

  useEffect(() => {
    const handleUnload = () => {
      if (step < questions.length - 1) {
        trackQuizAbandoned(step + 1, questions[step]?.question ?? '')
      }
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [step])

  function handleSingle(value: string, vertical?: string) {
    const val = vertical ?? value
    setAnswers(prev => ({ ...prev, [current.id]: val }))
    trackQuizStep(step + 1, current.question, val)
    setTimeout(() => setStep(s => s + 1), 300)
  }

  function handleMulti(value: string) {
    setAnswers(prev => {
      const existing = (prev[current.id] as string[]) ?? []
      const updated = existing.includes(value)
        ? existing.filter(v => v !== value)
        : [...existing, value]
      return { ...prev, [current.id]: updated }
    })
  }

  function handleScale(value: number) {
    setAnswers(prev => ({ ...prev, [current.id]: String(value) }))
    trackQuizStep(step + 1, current.question, String(value))
    setTimeout(() => setStep(s => s + 1), 300)
  }

  async function handleContactSubmit() {
    if (!contact.firstName || !contact.phone || !contact.email) {
      setError('Please fill in all fields.')
      trackQuizSubmitError('missing_fields')
      return
    }
    setError('')
    setSubmitting(true)
    trackQuizSubmitAttempted()

    let utms: Record<string, string> = {}
    try {
      utms = JSON.parse(localStorage.getItem('mindtalk_utms') || '{}')
    } catch {}

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.firstName,
          phone: contact.phone,
          email: contact.email,
          vertical: selectedVertical,
          durationOfIssue: answers[2] as string,
          symptoms: answers[3] as string[],
          priorTherapy: answers[4] as string,
          readinessScore: Number(answers[5]),
          utmSource: utms.utm_source ?? '',
          utmMedium: utms.utm_medium ?? '',
          utmCampaign: utms.utm_campaign ?? '',
          utmContent: utms.utm_content ?? '',
          pageUrl: window.location.href,
        }),
      })
      // Mixpanel + Fyno + Meta Lead (Pixel + CAPI)
      trackLeadSubmitted({
        name:            contact.firstName,
        phone:           contact.phone,
        email:           contact.email,
        verticalRaw:     selectedVertical,
        durationOfIssue: answers[2] as string,
        priorTherapy:    answers[4] as string,
        readinessScore:  Number(answers[5]),
      })
      trackQuizCompleted(selectedVertical, Number(answers[5]))
      router.push(`/quiz/result?vertical=${selectedVertical}&name=${encodeURIComponent(contact.firstName)}`)

      // Fire Fyno lead_created — non-blocking
      fetch('/api/lead-submitted', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        contact.firstName,
          phone:       contact.phone,
          email:       contact.email,
          verticalRaw: selectedVertical,
        }),
      }).catch(console.warn)
    } catch {
      trackQuizSubmitError('api_error')
      setError('Something went wrong. Please try again or WhatsApp us.')
      setSubmitting(false)
    }
  }

  const options = current.optionsByVertical
    ? (current.optionsByVertical[selectedVertical] ?? [])
    : (current.options ?? [])

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{current.question}</h2>
        <p className="text-gray-400 text-sm mb-8">{current.subtext}</p>

        {current.type === 'single' && (
          <div className="space-y-3">
            {options.map((opt) => (
              <button
                key={opt.value ?? opt.label}
                onClick={() => handleSingle(opt.value ?? opt.label, opt.vertical)}
                className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all text-sm ${
                  answers[current.id] === (opt.vertical ?? opt.value ?? opt.label)
                    ? 'border-[#E8521A] bg-[#FDF8F4] text-gray-900'
                    : 'border-gray-200 hover:border-[#E8521A]/40 text-gray-700'
                }`}
              >
                <div className="font-medium">{opt.label}</div>
                {opt.description && (
                  <div className="text-gray-400 text-xs mt-0.5">{opt.description}</div>
                )}
              </button>
            ))}
          </div>
        )}

        {current.type === 'multi' && (
          <>
            <div className="space-y-3 mb-6">
              {options.map((opt) => {
                const selected = ((answers[current.id] as string[]) ?? []).includes(opt.value ?? opt.label)
                return (
                  <button
                    key={opt.value ?? opt.label}
                    onClick={() => handleMulti(opt.value ?? opt.label)}
                    className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all text-sm ${
                      selected
                        ? 'border-[#E8521A] bg-[#FDF8F4] text-gray-900'
                        : 'border-gray-200 hover:border-[#E8521A]/40 text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
            <Button
              className="w-full"
              onClick={() => {
                trackQuizStep(step + 1, current.question, (answers[current.id] as string[])?.join(', ') ?? '')
                setStep(s => s + 1)
              }}
            >
              Continue
            </Button>
          </>
        )}

        {current.type === 'scale' && (
          <div className="space-y-3">
            {Array.from({ length: (current.scaleMax ?? 5) - (current.scaleMin ?? 1) + 1 }, (_, i) => {
              const val = (current.scaleMin ?? 1) + i
              const label = current.scaleLabels?.[String(val)]
              return (
                <button
                  key={val}
                  onClick={() => handleScale(val)}
                  className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all text-sm flex items-center justify-between ${
                    answers[current.id] === String(val)
                      ? 'border-[#E8521A] bg-[#FDF8F4]'
                      : 'border-gray-200 hover:border-[#E8521A]/40 text-gray-700'
                  }`}
                >
                  <span className="font-medium">{val}</span>
                  {label && <span className="text-gray-400 text-xs">{label}</span>}
                </button>
              )
            })}
          </div>
        )}

        {current.type === 'contact' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                className="mt-1.5"
                value={contact.firstName}
                onChange={e => setContact(c => ({ ...c, firstName: e.target.value }))}
                onFocus={() => trackQuizContactFieldFocused('firstName')}
                placeholder="Your first name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Mobile number</Label>
              <Input
                id="phone"
                type="tel"
                className="mt-1.5"
                value={contact.phone}
                onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                onFocus={() => trackQuizContactFieldFocused('phone')}
                placeholder="10-digit mobile number"
              />
              <p className="text-xs text-gray-400 mt-1">We'll send your match via WhatsApp</p>
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                className="mt-1.5"
                value={contact.email}
                onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                onFocus={() => trackQuizContactFieldFocused('email')}
                placeholder="your@email.com"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              className="w-full mt-2"
              size="lg"
              onClick={handleContactSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Show my programme match'}
            </Button>
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              {current.disclaimer}
            </p>
          </div>
        )}
      </div>

      {step > 0 && current.type !== 'contact' && (
        <button
          onClick={() => setStep(s => s - 1)}
          className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  )
}
