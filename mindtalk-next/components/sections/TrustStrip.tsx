import { Shield, Users, Award, Clock } from 'lucide-react'

interface TrustStripProps {
  trustLine: string
}

export default function TrustStrip({ trustLine }: TrustStripProps) {
  const items = [
    { icon: Award, text: '30 years of clinical expertise' },
    { icon: Users, text: 'Licensed Cadabams psychologists' },
    { icon: Shield, text: 'Clinically validated CBT' },
    { icon: Clock, text: '90-day structured recovery' },
  ]

  return (
    <section className="bg-white border-y border-gray-100 py-6 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-5 font-medium">
          {trustLine}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-sm text-gray-600">
              <Icon className="w-4 h-4 text-[#E8521A] shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
