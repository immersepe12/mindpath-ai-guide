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
  value: string
}

interface Question {
  id: string
  question: string
  subtext: string
  type: 'single' | 'multi' | 'scale'
  options?: Option[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: Record<string, string>
}

interface Props {
  vertical: 'anxiety' | 'depression' | 'burnout' | 'relationship'
  questions: Question[]
}

const therapistByVertical: Record<Props['vertical'], { name: string; specialism: string }> = {
  anxiety:      { name: 'Dr. Sakshi Chadha', specialism: 'anxiety & stress relief' },
  depression:   { name: 'Dr. Sakshi Chadha', specialism: 'depression & emotional reset' },
  burnout:      { name: 'Dr. Sakshi Chadha', specialism: 'workplace burnout' },
  relationship: { name: 'Dr. Sakshi Chadha', specialism: 'relationship therapy' },
}

type Step =
  | { kind: 'question', index: number }
  | { kind: 'match' }
  | { kind: 'contact' }

export default function VerticalQuizFlow({ vertical, questions }: Props) {
  const router = useRouter()
  const [step, setStep] = useState<Step>({ kind: 'question', index: 0 })
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [contact, setContact] = useState({ firstName: '', phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')

  const therapist = therapistByVertical[vertical]
  const totalQuestions = questions.length
  const currentIndex = step.kind === 'question' ? step.index : totalQuestions
  const progress = (currentIndex / totalQuestions) * 100

  // ── Tracking ──────────────────────────────────────────────
  useEffect(() => {
    trackQuizStarted()
    trackQuizStepViewed(1, questions[0].question)
    try { trackMetaViewContent(`quiz_${vertical}`) } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (step.kind === 'question' && step.index > 0) {
      trackQuizStepViewed(step.index + 1, questions[step.index].question)
    }
    if (step.kind === 'contact') {
      trackQuizContactFormViewed()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  useEffect(() => {
    const onUnload = () => {
      if (step.kind === 'question' && step.index < totalQuestions - 1) {
        trackQuizAbandoned(step.index + 1, questions[step.index]?.question ?? '')
      }
    }
    window.addEventListener('beforeunload', onUnload)
    return () => window.removeEventListener('beforeunload', onUnload)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // After the match reveal, transition to the contact form.
  useEffect(() => {
    if (step.kind !== 'match') return
    const t = setTimeout(() => setStep({ kind: 'contact' }), 2500)
    return () => clearTimeout(t)
  }, [step])

  // ── Handlers ──────────────────────────────────────────────
  function advance() {
    if (step.kind !== 'question') return
    if (step.index + 1 < totalQuestions) {
      setStep({ kind: 'question', index: step.index + 1 })
    } else {
      setStep({ kind: 'match' })
    }
  }

  function handleSingle(value: string) {
    if (step.kind !== 'question') return
    const q = questions[step.index]
    setAnswers(prev => ({ ...prev, [q.id]: value }))
    trackQuizStep(step.index + 1, q.question, value)
    setTimeout(advance, 300)
  }

  function handleMulti(value: string) {
    if (step.kind !== 'question') return
    const q = questions[step.index]
    setAnswers(prev => {
      const existing = (prev[q.id] as string[]) ?? []
      const updated = existing.includes(value)
        ? existing.filter(v => v !== value)
        : [...existing, value]
      return { ...prev, [q.id]: updated }
    })
  }

  function handleScale(value: number) {
    if (step.kind !== 'question') return
    const q = questions[step.index]
    setAnswers(prev => ({ ...prev, [q.id]: String(value) }))
    trackQuizStep(step.index + 1, q.question, String(value))
    setTimeout(advance, 300)
  }

  function handleEmailBlur() {
    const t = contact.email.trim()
    if (!t) {
      setEmailError('')
      return
    }
    if (!t.includes('@') || !t.includes('.')) {
      setEmailError("That doesn't look like a valid email.")
    } else {
      setEmailError('')
    }
  }

  async function handleSubmit() {
    setError('')
    const trimmedName = contact.firstName.trim()
    const digits      = contact.phone.replace(/\D/g, '')
    if (!trimmedName) {
      setError('Please enter your name.')
      trackQuizSubmitError('missing_name', vertical)
      return
    }
    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      trackQuizSubmitError('invalid_phone', vertical)
      return
    }
    const trimmedEmail = contact.email.trim()
    if (!trimmedEmail) {
      setError('Please enter your email — we send your match details there.')
      trackQuizSubmitError('missing_email', vertical)
      return
    }
    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setError('Please enter a valid email address.')
      trackQuizSubmitError('invalid_email', vertical)
      return
    }
    setSubmitting(true)
    trackQuizSubmitAttempted()

    let utms: Record<string, string> = {}
    try { utms = JSON.parse(localStorage.getItem('mindtalk_utms') || '{}') } catch {}

    // Build a readable Q&A transcript for Freshsales notes. Resolves
    // each answer's value back to its label so the sales/care team
    // sees human-readable text rather than slugs like 'racing_thoughts'.
    const labelFor = (q: Question, value: string) => {
      const opt = (q.options ?? []).find(o => o.value === value)
      return opt?.label ?? value
    }
    const quizNoteLines: string[] = [
      `MindTalk Quiz — ${vertical[0].toUpperCase()}${vertical.slice(1)}`,
      '─────────────────────',
    ]
    questions.forEach((q, i) => {
      const a = answers[q.id]
      let answerText = '—'
      if (Array.isArray(a)) {
        answerText = a.length ? a.map(v => `• ${labelFor(q, v)}`).join('\n') : '—'
      } else if (typeof a === 'string') {
        answerText = q.type === 'scale' ? `${a}/${q.scaleMax ?? 5}` : labelFor(q, a)
      }
      quizNoteLines.push('')
      quizNoteLines.push(`Q${i + 1}: ${q.question}`)
      quizNoteLines.push(answerText)
    })
    const quizNote = quizNoteLines.join('\n')

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        trimmedName,
          phone:       digits,
          email:       trimmedEmail,
          vertical,
          quizAnswers: answers,
          quizCompleted: true,
          quizNote,
          source:      `quiz_${vertical}`,
          utmSource:   utms.utm_source   ?? '',
          utmMedium:   utms.utm_medium   ?? '',
          utmCampaign: utms.utm_campaign ?? '',
          utmContent:  utms.utm_content  ?? '',
          pageUrl:     typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      trackLeadSubmitted({
        name:        trimmedName,
        phone:       digits,
        email:       trimmedEmail,
        verticalRaw: vertical,
      })
      trackQuizCompleted(vertical, 0)
      router.push(`/quiz/result?vertical=${vertical}&name=${encodeURIComponent(trimmedName)}&phone=${encodeURIComponent(digits)}&email=${encodeURIComponent(trimmedEmail)}`)
    } catch {
      trackQuizSubmitError('api_error', vertical)
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  // ── Render ────────────────────────────────────────────────
  if (step.kind === 'match') {
    return (
      <div className="max-w-md mx-auto text-center py-10">
        <div className="text-xs font-semibold tracking-widest text-[#E8521A] uppercase mb-3">
          We found your match
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Based on your answers, you&apos;re a great fit with…
        </h2>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 mx-auto max-w-sm">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#FFE4D2] to-[#F97316]/40 flex items-center justify-center text-3xl font-bold text-[#C43D0A] mb-5">
            S
          </div>
          <div className="text-lg font-bold text-gray-900">{therapist.name}</div>
          <div className="text-sm text-gray-500 mt-1">Specialises in {therapist.specialism}</div>
          <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0E1726]">
            <span aria-hidden>★</span>
            <span>4.9</span>
            <span className="text-gray-400 font-normal ml-1">· 280+ clients</span>
          </div>
          <div className="mt-5 text-xs text-gray-400">
            Loading your next step…
          </div>
        </div>
      </div>
    )
  }

  if (step.kind === 'contact') {
    return (
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Final step</span>
            <span>100% complete</span>
          </div>
          <Progress value={100} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Where should we send your match details?
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            A Cadabams counsellor will call within a few hours to confirm.
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="qz-name">First name</Label>
              <Input
                id="qz-name"
                className="mt-1.5"
                value={contact.firstName}
                onChange={e => setContact(c => ({ ...c, firstName: e.target.value }))}
                onFocus={() => trackQuizContactFieldFocused('firstName')}
                placeholder="Your first name"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="qz-phone">Mobile number</Label>
              <div className="relative mt-1.5">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-base pointer-events-none select-none">
                  +91
                </span>
                <Input
                  id="qz-phone"
                  type="tel"
                  inputMode="numeric"
                  className="pl-14"
                  value={contact.phone}
                  onChange={e => {
                    // Normalise messy autofills. Take the LAST 10 digits so
                    // doubled +91 prefixes ('+91+919196286233' → 14 digits)
                    // don't end up dropping real digits off the right.
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
              <p className="text-xs text-gray-400 mt-1">We&apos;ll send your match via WhatsApp.</p>
            </div>
            <div>
              <Label htmlFor="qz-email">Email address</Label>
              <Input
                id="qz-email"
                type="email"
                required
                className={`mt-1.5 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                value={contact.email}
                onChange={e => {
                  setContact(c => ({ ...c, email: e.target.value }))
                  if (emailError) setEmailError('')
                }}
                onBlur={handleEmailBlur}
                onFocus={() => trackQuizContactFieldFocused('email')}
                placeholder="your@email.com"
              />
              {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              className="w-full mt-2"
              size="lg"
              onClick={handleSubmit}
              disabled={
                submitting ||
                !contact.firstName.trim() ||
                contact.phone.replace(/\D/g, '').length !== 10 ||
                !contact.email.trim() ||
                !!emailError
              }
            >
              {submitting ? 'Submitting…' : 'See my programme'}
            </Button>
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              By submitting, you agree to be contacted by a Cadabams MindTalk counsellor.
              Your information is confidential.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // step.kind === 'question'
  const q = questions[step.index]
  const value = answers[q.id]
  const selectedSet = new Set(Array.isArray(value) ? value : [])

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Question {step.index + 1} of {totalQuestions}</span>
          <span>{Math.round(((step.index + 1) / totalQuestions) * 100)}%</span>
        </div>
        <Progress value={((step.index + 1) / totalQuestions) * 100} />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{q.question}</h2>
        <p className="text-gray-400 text-sm mb-8">{q.subtext}</p>

        {q.type === 'single' && (
          <div className="space-y-3">
            {(q.options ?? []).map(opt => (
              <button
                key={opt.value}
                onClick={() => handleSingle(opt.value)}
                className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all text-sm min-h-[56px] ${
                  value === opt.value
                    ? 'border-[#E8521A] bg-[#FDF8F4] text-gray-900'
                    : 'border-gray-200 hover:border-[#E8521A]/40 text-gray-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {q.type === 'multi' && (
          <>
            <div className="space-y-3 mb-6">
              {(q.options ?? []).map(opt => {
                const selected = selectedSet.has(opt.value)
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleMulti(opt.value)}
                    className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all text-sm min-h-[56px] ${
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
                trackQuizStep(step.index + 1, q.question, (value as string[])?.join(', ') ?? '')
                advance()
              }}
              disabled={selectedSet.size === 0}
            >
              Continue
            </Button>
          </>
        )}

        {q.type === 'scale' && (
          <div className="space-y-3">
            {Array.from({ length: (q.scaleMax ?? 5) - (q.scaleMin ?? 1) + 1 }, (_, i) => {
              const val  = (q.scaleMin ?? 1) + i
              const lbl  = q.scaleLabels?.[String(val)]
              const sel  = value === String(val)
              return (
                <button
                  key={val}
                  onClick={() => handleScale(val)}
                  className={`w-full rounded-xl border px-4 py-3.5 transition-all text-sm flex items-center justify-between min-h-[56px] ${
                    sel
                      ? 'border-[#E8521A] bg-[#FDF8F4]'
                      : 'border-gray-200 hover:border-[#E8521A]/40 text-gray-700'
                  }`}
                >
                  <span className="font-medium">{val}</span>
                  {lbl && <span className="text-gray-400 text-xs">{lbl}</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {step.index > 0 && (
        <button
          onClick={() => setStep({ kind: 'question', index: step.index - 1 })}
          className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  )
}
