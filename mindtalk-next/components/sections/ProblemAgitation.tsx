import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface ProblemAgitationProps {
  headline: string
  problems: string[]
  ctaText: string
  ctaUrl: string
}

export default function ProblemAgitation({ headline, problems, ctaText, ctaUrl }: ProblemAgitationProps) {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-balance">
          {headline}
        </h2>
        <ul className="space-y-4 mb-12 text-left">
          {problems.map((p) => (
            <li key={p} className="flex items-start gap-3 text-gray-700 text-lg">
              <CheckCircle className="w-5 h-5 text-[#E8521A] mt-0.5 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <Button size="lg" asChild>
          <a href={ctaUrl}>{ctaText}</a>
        </Button>
      </div>
    </section>
  )
}
