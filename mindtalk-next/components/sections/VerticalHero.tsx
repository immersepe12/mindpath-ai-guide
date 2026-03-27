import Link from 'next/link'
import { Button } from '@/components/ui/button'

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

export default function VerticalHero({ headline, subtext, ctaText, ctaUrl, vertical }: VerticalHeroProps) {
  const accent = verticalAccents[vertical] ?? 'bg-orange-50 text-[#E8521A]'
  const label = verticalLabels[vertical] ?? '90-Day Recovery Programme'

  return (
    <section className="bg-[#FDF8F4] pt-14 pb-18 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-6 ${accent}`}>
          {label} · ₹7,799
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-5 text-balance">
          {headline}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="hero" asChild>
            <Link href={ctaUrl}>{ctaText}</Link>
          </Button>
          <Button size="hero" variant="secondary" asChild>
            <a href="https://wa.me/918197268789" target="_blank" rel="noopener noreferrer">
              Talk to us first
            </a>
          </Button>
        </div>
        <p className="mt-5 text-sm text-gray-400">
          90 days · 12 psychologist sessions · Full refund after session 1 if not right for you
        </p>
      </div>
    </section>
  )
}
