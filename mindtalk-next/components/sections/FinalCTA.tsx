import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface FinalCTAProps {
  headline: string
  subtext: string
  ctaText: string
  ctaUrl: string
}

export default function FinalCTA({ headline, subtext, ctaText, ctaUrl }: FinalCTAProps) {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#E8521A]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
          {headline}
        </h2>
        <p className="text-white/80 text-lg mb-10">{subtext}</p>
        <Button size="hero" variant="white" asChild>
          <Link href={ctaUrl}>{ctaText}</Link>
        </Button>
        <p className="text-white/60 text-sm mt-5">
          2-minute assessment · Free · No commitment required
        </p>
      </div>
    </section>
  )
}
