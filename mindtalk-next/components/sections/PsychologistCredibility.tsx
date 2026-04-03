export default function PsychologistCredibility() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FDF8F4]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Built by India's most experienced mental health group
        </h2>
        <p className="text-gray-500 mb-10 max-w-xl mx-auto">
          Cadabams Group has 30 years of clinical practice across psychiatry, psychology, and rehabilitation. Every MindTalk psychologist is licensed, supervised, and trained in CBT.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { stat: '30+', label: 'Years of clinical expertise' },
            { stat: '12', label: 'Sessions per programme' },
            { stat: '100%', label: 'Licensed psychologists' },
          ].map(({ stat, label }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-3xl font-bold text-[#E8521A] mb-1">{stat}</div>
              <div className="text-xs text-gray-500 leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
