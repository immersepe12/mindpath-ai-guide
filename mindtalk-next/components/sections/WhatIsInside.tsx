import { Check } from 'lucide-react'

interface WhatIsInsideProps {
  headline: string
  items: string[]
}

export default function WhatIsInside({ headline, items }: WhatIsInsideProps) {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FDF8F4]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          {headline}
        </h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm">
              <Check className="w-5 h-5 text-[#E8521A] mt-0.5 shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
