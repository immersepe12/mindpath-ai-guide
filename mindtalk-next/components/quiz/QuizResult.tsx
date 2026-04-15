'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { trackResultPageViewed, trackResultCTAClick, trackMetaViewContent, trackWhatsAppClick } from '@/lib/analytics'

const verticalData: Record<string, {
  label: string
  headline: string
  reasons: string[]
  href: string
}> = {
  anxiety: {
    label: 'Anxiety & Stress Relief',
    headline: 'The 90-Day Anxiety Recovery Programme',
    reasons: [
      'Your responses indicate an anxiety pattern — not a one-off stress response',
      'CBT is the most evidence-backed approach for anxiety and overthinking',
      'The structured daily practice is what makes the difference — not just weekly sessions',
    ],
    href: '/anxiety',
  },
  depression: {
    label: '90-Day Emotional Reset',
    headline: 'The 90-Day Emotional Reset Programme',
    reasons: [
      'Your responses indicate low mood and disconnection — the Emotional Reset is built for exactly this',
      'Behavioural activation combined with CBT is the evidence-backed first-line treatment',
      'Daily structured engagement is what breaks the withdrawal cycle',
    ],
    href: '/emotional-reset',
  },
  relationship: {
    label: 'Relationship Recovery',
    headline: 'The Relationship Recovery Programme',
    reasons: [
      'Your responses point to relational patterns — not just a single difficult situation',
      'Individual CBT is more effective than couples work when the goal is changing your own patterns',
      'The programme addresses what you bring to relationships — the part you can actually change',
    ],
    href: '/relationships',
  },
  burnout: {
    label: 'Workplace Burnout Recovery',
    headline: 'The Burnout Recovery Programme',
    reasons: [
      'Your responses indicate depletion wired into how you relate to work — not just a busy period',
      'CBT for burnout addresses identity and boundaries, not just stress management techniques',
      'The programme is designed to run alongside a full-time job — 50-min sessions, 5-min daily tasks',
    ],
    href: '/burnout',
  },
}

function QuizResultInner() {
  const params = useSearchParams()
  const vertical = params.get('vertical') ?? 'anxiety'
  const name = params.get('name') ?? ''
  const data = verticalData[vertical] ?? verticalData.anxiety

  useEffect(() => {
    trackResultPageViewed(vertical, name)
    // Meta ViewContent — user is being shown a specific recommended programme
    try { trackMetaViewContent(vertical, 7799) } catch {}
  }, [vertical, name])

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
        <div className="text-xs font-semibold text-[#E8521A] uppercase tracking-wide mb-3">
          Your programme match
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {name ? `${name}, we recommend:` : 'We recommend:'}
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{data.headline}</h2>
        <div className="space-y-3 mb-8">
          <p className="text-sm font-medium text-gray-700">Why this programme fits you:</p>
          {data.reasons.map((r) => (
            <div key={r} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#E8521A] mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">{r}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-6 mb-6">
          <div className="text-3xl font-bold text-gray-900 mb-1">₹7,799</div>
          <div className="text-sm text-gray-500">Full 90-day programme · Less than ₹650/session</div>
          <div className="text-sm text-[#E8521A] mt-1">Full refund if not right after session 1</div>
        </div>
        <div className="flex flex-col gap-3">
          <Button size="hero" className="w-full" onClick={() => trackResultCTAClick('see_programme', vertical)} asChild>
            <Link href={data.href}>See full programme details</Link>
          </Button>
          <Button
            size="hero"
            variant="secondary"
            className="w-full"
            onClick={() => {
              trackResultCTAClick('talk_to_counsellor', vertical)
              // Meta Contact — user has chosen to reach out via WhatsApp
              trackWhatsAppClick('quiz_result', vertical)
            }}
            asChild
          >
            <a href="https://wa.me/918197268789" target="_blank" rel="noopener noreferrer">
              Talk to a counsellor first
            </a>
          </Button>
        </div>
      </div>
      <p className="text-center text-xs text-gray-400">
        A Cadabams counsellor will also call you within a few hours to answer any questions.
      </p>
    </div>
  )
}

export default function QuizResult() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">Loading your match...</div>}>
      <QuizResultInner />
    </Suspense>
  )
}
