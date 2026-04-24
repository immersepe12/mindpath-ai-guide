'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import WhatsAppGate from '@/components/WhatsAppGate'
import { getVariant, type Variant } from '@/lib/ab-test'

interface VerticalHeroProps {
  headline: string
  subtext: string
  ctaText: string
  ctaUrl: string
  vertical: string
}

const verticalAccents: Record<string, string> = {
  anxiety: 'bg-blue-50 text-blue-600',
  depression: 'bg-rose-50 text-rose-600',
  relationship: 'bg-emerald-50 text-emerald-600',
  burnout: 'bg-amber-50 text-amber-600',
}

const verticalLabels: Record<string, string> = {
  anxiety: 'Anxiety & Stress Relief',
  depression: '90-Day Emotional Reset',
  relationship: 'Relationship Recovery',
  burnout: 'Workplace Burnout Recovery',
}

export default function VerticalHero({ headline, subtext, ctaText, ctaUrl: _ctaUrl, vertical }: VerticalHeroProps) {
  const accent = verticalAccents[vertical] ?? 'bg-orange-50 text-[#E8521A]'
  const label = verticalLabels[vertical] ?? '90-Day Recovery Programme'

  // A/B test: price_framing. Variant A (control) shows ₹7,799 and paid
  // programme language. Variant B hides the price upfront and positions
  // as a free counsellor call first. Default to A during SSR to avoid
  // hydration mismatch — the real assignment kicks in on mount.
  const [variant, setVariant] = useState<Variant>('A')
  useEffect(() => { setVariant(getVariant('price_framing')) }, [])

  const isFreeCall = variant === 'B'

  const badge = isFreeCall
    ? `${label} · Free first call`
    : `${label} · ₹7,799`

  const variantCtaText = isFreeCall ? 'Book free counsellor call' : ctaText

  const trustLine = isFreeCall
    ? 'Free 15-min call with a Cadabams counsellor · No commitment'
    : '90 days · 12 psychologist sessions · Full refund after session 1 if not right for you'

  return (
    <section className="bg-[#FDF8F4] pt-14 pb-18 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left — copy */}
          <div>
            <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-6 ${accent}`}>
              {badge}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-5 text-balance">
              {headline}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              {subtext}
            </p>
            {/* Mobile-only: scroll-to-form CTA (form is below on mobile) */}
            <div className="flex flex-col sm:flex-row gap-3 lg:hidden">
              <Button size="hero" asChild>
                <a href="#lead-form">{variantCtaText}</a>
              </Button>
              <WhatsAppGate location="vertical_hero" vertical={vertical}>
                <Button size="hero" variant="secondary">
                  Talk to us first
                </Button>
              </WhatsAppGate>
            </div>
            {/* Desktop-only: trust signals below copy */}
            <div className="hidden lg:block">
              <p className="text-sm text-gray-400">{trustLine}</p>
            </div>
          </div>

          {/* Right — inline lead form */}
          <div className="lg:pt-4">
            <LeadCaptureForm
              vertical={vertical}
              ctaText={variantCtaText}
              showPrice={!isFreeCall}
            />
          </div>
        </div>

        <p className="mt-5 text-sm text-gray-400 lg:hidden">{trustLine}</p>
      </div>
    </section>
  )
}
