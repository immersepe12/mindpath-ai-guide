import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface PricingSectionProps {
  headline: string
  price: string
  priceNote: string
  refundNote: string
  ctaText: string
  ctaUrl: string
}

const included = [
  '12 psychologist-led CBT sessions',
  'Daily structured exercises — 3 to 5 minutes',
  'Guided breathwork library',
  'AI-powered journaling with smart prompts',
  'Dr. Riya — 24/7 AI companion',
  'Progress tracking and session notes',
  'Gamified milestones — streaks, stars, XP',
]

export default function PricingSection({ headline, price, priceNote, refundNote, ctaText, ctaUrl }: PricingSectionProps) {
  const formatted = new Intl.NumberFormat('en-IN').format(Number(price))

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10">
          {headline}
        </h2>
        <div className="bg-[#FDF8F4] rounded-2xl border border-orange-100 p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-gray-900">
              ₹{formatted}
            </div>
            <div className="text-gray-500 mt-2 text-sm">One payment. Full 90-day programme.</div>
            <div className="text-[#E8521A] text-sm font-medium mt-1">{priceNote}</div>
          </div>
          <ul className="space-y-3 mb-8">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                <Check className="w-4 h-4 text-[#E8521A] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Button size="hero" className="w-full" asChild>
            <a href={ctaUrl}>{ctaText}</a>
          </Button>
          <p className="text-center text-xs text-gray-400 mt-4">{refundNote}</p>
        </div>
      </div>
    </section>
  )
}
