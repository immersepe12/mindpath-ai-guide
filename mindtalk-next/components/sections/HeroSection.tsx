import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  headline: string
  subtext: string
  ctaText: string
  ctaUrl: string
}

export default function HeroSection({ headline, subtext, ctaText, ctaUrl }: HeroSectionProps) {
  return (
    <section className="bg-[#FDF8F4] pt-16 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#E8521A]/10 text-[#E8521A] rounded-full px-4 py-1.5 text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8521A]" />
          Built by Cadabams — 30 years of clinical expertise
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6 text-balance">
          {headline}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="hero" asChild>
            <Link href={ctaUrl}>{ctaText}</Link>
          </Button>
          <Button size="hero" variant="secondary" asChild>
            <a href="https://wa.me/918197268789" target="_blank" rel="noopener noreferrer">
              Talk to us first
            </a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-gray-400">₹7,799 · 90 days · 12 psychologist sessions</p>
      </div>
    </section>
  )
}
