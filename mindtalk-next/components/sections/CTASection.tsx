import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CTASectionProps {
  ctaText: string
  ctaUrl: string
}

export default function CTASection({ ctaText, ctaUrl }: CTASectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#E8521A]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to start your recovery?
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Take the 2-minute assessment. Get matched this week.
        </p>
        <Button size="hero" variant="white" asChild>
          <Link href={ctaUrl}>{ctaText}</Link>
        </Button>
        <p className="text-white/60 text-sm mt-4">
          Free assessment · No commitment · Full refund guarantee
        </p>
      </div>
    </section>
  )
}
