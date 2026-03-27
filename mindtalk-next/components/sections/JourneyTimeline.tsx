interface JourneyTimelineProps {
  headline: string
  items: { phase: string; title: string; description: string }[]
}

export default function JourneyTimeline({ headline, items }: JourneyTimelineProps) {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-14">
          {headline}
        </h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-100 hidden sm:block" />
          <div className="space-y-10">
            {items.map(({ phase, title, description }) => (
              <div key={phase} className="relative flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#E8521A]/10 border-2 border-[#E8521A]/20 flex items-center justify-center z-10">
                  <span className="text-[#E8521A] text-xs font-bold text-center leading-tight px-1">{phase.split(' ')[0]}</span>
                </div>
                <div className="pt-2">
                  <div className="text-xs font-semibold text-[#E8521A] uppercase tracking-wide mb-1">{phase}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
