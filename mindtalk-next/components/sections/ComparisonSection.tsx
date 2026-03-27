import { Check, X } from 'lucide-react'

interface ComparisonSectionProps {
  headline: string
}

const rows = [
  { feature: 'Licensed psychologist', mindtalk: true, apps: false, traditional: true },
  { feature: 'Structured 90-day plan', mindtalk: true, apps: false, traditional: false },
  { feature: 'Daily CBT exercises', mindtalk: true, apps: true, traditional: false },
  { feature: 'Available this week', mindtalk: true, apps: true, traditional: false },
  { feature: 'Under ₹1,000/session', mindtalk: true, apps: true, traditional: false },
  { feature: 'Progress tracking', mindtalk: true, apps: true, traditional: false },
  { feature: '24/7 AI support', mindtalk: true, apps: false, traditional: false },
]

export default function ComparisonSection({ headline }: ComparisonSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FDF8F4]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          {headline}
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-100">
            <div className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Feature</div>
            <div className="p-4 text-xs font-semibold text-[#E8521A] uppercase tracking-wide text-center">MindTalk</div>
            <div className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Other apps</div>
            <div className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Traditional therapy</div>
          </div>
          {rows.map(({ feature, mindtalk, apps, traditional }, i) => (
            <div
              key={feature}
              className={`grid grid-cols-4 border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}
            >
              <div className="p-4 text-sm text-gray-700">{feature}</div>
              <div className="p-4 flex justify-center">
                {mindtalk ? <Check className="w-5 h-5 text-[#E8521A]" /> : <X className="w-4 h-4 text-gray-300" />}
              </div>
              <div className="p-4 flex justify-center">
                {apps ? <Check className="w-5 h-5 text-gray-400" /> : <X className="w-4 h-4 text-gray-300" />}
              </div>
              <div className="p-4 flex justify-center">
                {traditional ? <Check className="w-5 h-5 text-gray-400" /> : <X className="w-4 h-4 text-gray-300" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
