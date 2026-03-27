import Link from 'next/link'
import { Zap, Heart, Users, Briefcase } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

const journeys = [
  {
    icon: Zap,
    label: 'Anxiety & Stress',
    description: 'Quiet the overthinking. Rebuild calm that lasts.',
    href: '/anxiety',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Heart,
    label: 'Emotional Reset',
    description: 'Reconnect with yourself after months of feeling flat.',
    href: '/emotional-reset',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: Users,
    label: 'Relationship Recovery',
    description: 'Break the pattern. Build a different way of connecting.',
    href: '/relationships',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Briefcase,
    label: 'Workplace Burnout',
    description: 'Rebuild your relationship with work — and yourself.',
    href: '/burnout',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
]

export default function JourneyCards() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FDF8F4]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-3">
          Four programmes. One platform.
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Each programme is built for a specific issue — not a one-size-fits-all approach.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {journeys.map(({ icon: Icon, label, description, href, color, bg }) => (
            <Link key={href} href={href} className="group">
              <Card className="h-full hover:shadow-md transition-shadow duration-200 hover:border-[#E8521A]/20">
                <CardHeader>
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#E8521A] transition-colors">
                    {label}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                  <p className="text-[#E8521A] text-sm font-medium mt-4">
                    Learn more →
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
