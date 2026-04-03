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

        {/* Desktop: 4-column table */}
        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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

        {/* Mobile: stacked cards per feature */}
        <div className="md:hidden space-y-3">
          {rows.map(({ feature, mindtalk, apps, traditional }) => (
            <div
              key={feature}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            >
              <div className="text-sm font-semibold text-gray-900 mb-3">{feature}</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="flex justify-center mb-1">
                    {mindtalk ? <Check className="w-5 h-5 text-[#E8521A]" /> : <X className="w-4 h-4 text-gray-300" />}
                  </div>
                  <div className="text-[10px] font-semibold text-[#E8521A] uppercase tracking-wide">MindTalk</div>
                </div>
                <div>
                  <div className="flex justify-center mb-1">
                    {apps ? <Check className="w-5 h-5 text-gray-400" /> : <X className="w-4 h-4 text-gray-300" />}
                  </div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Other apps</div>
                </div>
                <div>
                  <div className="flex justify-center mb-1">
                    {traditional ? <Check className="w-5 h-5 text-gray-400" /> : <X className="w-4 h-4 text-gray-300" />}
                  </div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Traditional</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
