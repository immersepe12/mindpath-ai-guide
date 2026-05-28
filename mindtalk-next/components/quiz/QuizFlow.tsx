'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import { collectLeadContext } from '@/lib/leadContext'

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
  const [contact, setContact] = useState({ firstName: '', phone: '', email: '', goalText: '' })
  const [goalError, setGoalError] = useState('')
  const GOAL_MIN = 10
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')

  // Inline email validation on blur — only complains about format if the
  // user actually typed something. Email is optional, so empty stays valid.
  function handleContactEmailBlur() {
    const t = contact.email.trim()
    if (t && (!t.includes('@') || !t.includes('.'))) {
      setEmailError("That doesn't look like a valid email — or leave it blank.")
    } else {
      setEmailError('')
    }
  }

  // Auto-focus the name field when the contact step appears on desktop.
  // Mobile is intentionally skipped — popping up the keyboard the moment
  // the contact step renders is jarring on a flow the user just landed in.
  // Callback ref so it fires when the input mounts (the input is
  // conditionally rendered on the contact step).
  function focusNameOnDesktop(el: HTMLInputElement | null) {
    if (!el) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(min-width: 768px)').matches) {
      el.focus({ preventScroll: true })
    }
  }

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
    if (!contact.firstName || !contact.phone) {
      const missing: string[] = []
      if (!contact.firstName) missing.push('name')
      if (!contact.phone)     missing.push('phone')
      setError('Please enter your name and mobile number.')
      trackQuizSubmitError(`missing_fields:${missing.join(',')}`, selectedVertical)
      return
    }
    const trimmedGoal = contact.goalText.trim()
    if (trimmedGoal.length < GOAL_MIN) {
      setGoalError(`Please share a few words about what you want to change (at least ${GOAL_MIN} characters).`)
      trackQuizSubmitError('missing_goal', selectedVertical)
      return
    }
    const digits = contact.phone.replace(/\D/g, '')
    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      trackQuizSubmitError('invalid_phone', selectedVertical)
      return
    }
    // Email is optional. Only validate format if the user typed something.
    const trimmedEmail = contact.email.trim()
    if (trimmedEmail && (!trimmedEmail.includes('@') || !trimmedEmail.includes('.'))) {
      setError('Please enter a valid email address (or leave it blank).')
      trackQuizSubmitError('invalid_email', selectedVertical)
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
          email: trimmedEmail,
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
          context: collectLeadContext({ ctaSource: 'Generic Quiz', ctaType: 'form' }),
        }),
      })
      // Mixpanel + Fyno + Meta Lead (Pixel + CAPI)
      trackLeadSubmitted({
        name:            contact.firstName,
        phone:           contact.phone,
        email:           trimmedEmail,
        verticalRaw:     selectedVertical,
        durationOfIssue: answers[2] as string,
        priorTherapy:    answers[4] as string,
        readinessScore:  Number(answers[5]),
      })
      trackQuizCompleted(selectedVertical, Number(answers[5]))
      router.push(`/quiz/result?vertical=${selectedVertical}&name=${encodeURIComponent(contact.firstName)}&phone=${encodeURIComponent(digits)}&email=${encodeURIComponent(trimmedEmail)}`)
    } catch {
      trackQuizSubmitError('api_error', selectedVertical)
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
                ref={focusNameOnDesktop}
                className="mt-1.5"
                value={contact.firstName}
                onChange={e => setContact(c => ({ ...c, firstName: e.target.value }))}
                onFocus={() => trackQuizContactFieldFocused('firstName')}
                placeholder="Your first name"
              />
            </div>
            <div>
              <Label htmlFor="goal">
                What&apos;s the one thing you most want to change in the next 3 months?
              </Label>
              <Textarea
                id="goal"
                required
                rows={3}
                className={`mt-1.5 ${goalError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                value={contact.goalText}
                onChange={e => {
                  setContact(c => ({ ...c, goalText: e.target.value }))
                  if (goalError) setGoalError('')
                }}
                onFocus={() => trackQuizContactFieldFocused('goalText')}
                placeholder="Type your answer here..."
                aria-invalid={!!goalError}
              />
              {goalError && <p className="text-xs text-red-500 mt-1">{goalError}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Mobile number</Label>
              <div className="relative mt-1.5">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-base pointer-events-none select-none">
                  +91
                </span>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  className="pl-14"
                  value={contact.phone}
                  onChange={e => {
                    let digits = e.target.value.replace(/\D/g, '')
                    if (digits.startsWith('0')) digits = digits.slice(1)
                    if (digits.length > 10) digits = digits.slice(-10)
                    setContact(c => ({ ...c, phone: digits }))
                  }}
                  onFocus={() => trackQuizContactFieldFocused('phone')}
                  placeholder="98765 43210"
                  autoComplete="tel-national"
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">We'll send your match via WhatsApp</p>
            </div>
            <div>
              <Label htmlFor="email">
                Email address <span className="text-gray-400 font-normal">(optional)</span>
              </Label>
              <Input
                id="email"
                type="email"
                className={`mt-1.5 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                value={contact.email}
                onChange={e => {
                  setContact(c => ({ ...c, email: e.target.value }))
                  if (emailError) setEmailError('')
                }}
                onBlur={handleContactEmailBlur}
                onFocus={() => trackQuizContactFieldFocused('email')}
                placeholder="your@email.com"
                aria-invalid={!!emailError}
              />
              {emailError && (
                <p className="text-xs text-red-500 mt-1">{emailError}</p>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              className="w-full mt-2"
              size="lg"
              onClick={handleContactSubmit}
              // Disable until name + 10-digit phone are valid AND any
              // inline email error is cleared. Stops rage-clicking on empty
              // forms and blocks submit when the email format is wrong.
              disabled={
                submitting ||
                !contact.firstName.trim() ||
                contact.goalText.trim().length < GOAL_MIN ||
                contact.phone.replace(/\D/g, '').length !== 10 ||
                !!emailError
              }
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
