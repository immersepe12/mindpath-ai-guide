const testimonials = [
  {
    quote: "By session 3, I finally understood what was driving my overthinking. Nothing gave me this clarity before.",
    name: "Priya S.",
    label: "Software professional, Bengaluru",
    vertical: "Anxiety",
  },
  {
    quote: "I didn't believe it would work. By week 6, I felt like myself again for the first time in years.",
    name: "Rohan M.",
    label: "Marketing professional, Mumbai",
    vertical: "Emotional Reset",
  },
  {
    quote: "I'd taken two vacations and still came back exhausted. The programme helped me understand why.",
    name: "Ananya K.",
    label: "Product manager, Bengaluru",
    vertical: "Burnout",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-3">
          From people who've been where you are
        </h2>
        <p className="text-center text-gray-400 text-sm mb-12">
          Replace with verified quotes before launch — see customer_quotes.md
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, label, vertical }) => (
            <div key={name} className="bg-[#FDF8F4] rounded-2xl p-6 border border-orange-100">
              <div className="text-xs font-medium text-[#E8521A] mb-3 uppercase tracking-wide">
                {vertical} programme
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-5 text-sm">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <div>
                <div className="text-sm font-semibold text-gray-900">{name}</div>
                <div className="text-xs text-gray-400">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
