interface AIDisclaimerProps {
  variant?: 'inline' | 'full'
  className?: string
}

/**
 * The Doctor Riya AI disclaimer block. Required wherever Doctor Riya is
 * mentioned — clear about what she is (CBT-based support) and isn't
 * (a licensed therapist or crisis service). Includes Indian crisis lines.
 */
export default function AIDisclaimer({ variant = 'inline', className = '' }: AIDisclaimerProps) {
  if (variant === 'inline') {
    return (
      <p className={`text-[13px] italic text-[#6B7280] leading-relaxed mt-3 ${className}`}>
        Doctor Riya AI provides CBT-based psychoeducation and support tools. She is not a
        licensed therapist and does not provide clinical diagnoses. For crisis support, call
        iCall: 9152987821.
      </p>
    )
  }

  return (
    <section
      className={`rounded-2xl border border-[#ECE6DE] bg-[#FBF5EF] p-6 sm:p-8 ${className}`}
      aria-label="AI disclaimer"
    >
      <h3 className="text-lg font-bold text-[#0E1726] mb-3">
        What Doctor Riya is — and isn't
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm leading-relaxed">
        <div>
          <div className="font-semibold text-[#1F8B4C] mb-1.5">She is</div>
          <ul className="space-y-1 text-[#4A5260] list-disc pl-5">
            <li>CBT-based support and psychoeducation</li>
            <li>Mood tracking and pattern recognition</li>
            <li>Guided breathing, grounding, journalling</li>
            <li>Available 24/7, free forever</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-[#DC4B45] mb-1.5">She is not</div>
          <ul className="space-y-1 text-[#4A5260] list-disc pl-5">
            <li>A licensed therapist or psychiatrist</li>
            <li>A diagnostic or clinical assessment tool</li>
            <li>An emergency or crisis service</li>
            <li>A replacement for in-person care when needed</li>
          </ul>
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-[#ECE6DE] text-sm text-[#4A5260]">
        <strong className="text-[#0E1726]">For crisis support in India:</strong>{' '}
        <a href="tel:9152987821" className="text-[#F97316] hover:underline">iCall 9152987821</a>{' '}
        ·{' '}
        <a href="tel:18602662345" className="text-[#F97316] hover:underline">
          Vandrevala Foundation 1860-2662-345
        </a>
      </div>
    </section>
  )
}
