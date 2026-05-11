'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getVariant, type Variant } from '@/lib/ab-test'
import LeadCaptureForm from '@/components/LeadCaptureForm'

interface VerticalHeroProps {
  headline: string
  subtext: string
  ctaText: string
  /** Where the primary CTA points. Use '#lead-form' to scroll to the
   * inline form rendered on the right of this hero. */
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

export default function VerticalHero({ headline, subtext, ctaText, ctaUrl, vertical }: VerticalHeroProps) {
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

  // The CTA scrolls to the inline lead-capture form on the same page now,
  // so the A/B price-framing variant B ('Book free counsellor call') is
  // no longer accurate copy. Both variants use the page-level ctaText
  // (set to 'Find my programme match →' in the MDX frontmatter).
  const variantCtaText = ctaText

  const trustLine = isFreeCall
    ? 'Free 15-min call with a Cadabams counsellor · No commitment'
    : '90 days · 12 psychologist sessions · Full refund after session 1 if not right for you'

  return (
    <section className="bg-[#FDF8F4] pt-14 pb-18 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left — copy + primary CTA */}
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
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button size="hero" asChild>
                <a href={ctaUrl}>{variantCtaText}</a>
              </Button>
            </div>
            <p className="text-sm text-gray-400">{trustLine}</p>
          </div>

          {/* Right — inline lead capture form. Replaces the legacy
              '7-question assessment' card. All page CTAs scroll to this
              form via '#lead-form'. */}
          <div>
            <LeadCaptureForm vertical={vertical} />
          </div>
        </div>
      </div>
    </section>
  )
}
