interface HowItWorksProps {
  headline: string
  steps: { title: string; description: string }[]
}

export default function HowItWorks({ headline, steps }: HowItWorksProps) {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-14">
          {headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="w-12 h-12 rounded-full bg-[#E8521A] text-white text-lg font-bold flex items-center justify-center mx-auto mb-5">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
