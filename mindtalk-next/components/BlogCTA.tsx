import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BlogCTAProps {
  journeyName: 'Anxiety' | 'Depression' | 'Burnout' | 'Relationship' | 'All'
}

/**
 * End-of-article CTA. Routes to the assessment quiz so the visitor enters
 * the lead-capture funnel with their journey already inferred from the
 * article they were reading.
 */
export default function BlogCTA({ journeyName }: BlogCTAProps) {
  const headline =
    journeyName === 'Anxiety'
      ? 'Ready to work through your anxiety with structure?'
      : journeyName === 'Depression'
        ? 'Ready to start the 90-day path out of depression?'
        : journeyName === 'Burnout'
          ? 'Ready to recover from burnout with a clear plan?'
          : journeyName === 'Relationship'
            ? 'Ready to change the patterns in your relationships?'
            : 'Ready to start a structured CBT recovery programme?'

  const subline =
    'Take the 2-minute assessment. Get matched to the right Journey, with weekly therapist sessions included.'

  return (
    <section className="my-14 rounded-2xl bg-[#FDF8F4] border border-orange-100 p-8 sm:p-10 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-balance">
        {headline}
      </h2>
      <p className="text-gray-600 mb-6 max-w-xl mx-auto">{subline}</p>
      <Button size="hero" asChild>
        <Link href="/quiz">Start your free assessment</Link>
      </Button>
      <p className="text-xs text-gray-400 mt-4">
        ₹7,799 · 12 psychologist sessions · Full refund after session 1
      </p>
    </section>
  )
}
