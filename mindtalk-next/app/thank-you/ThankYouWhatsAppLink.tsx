'use client'
import WhatsAppGate from '@/components/WhatsAppGate'

export default function ThankYouWhatsAppLink() {
  return (
    <WhatsAppGate location="thank_you">
      <button
        type="button"
        className="text-[#E8521A] hover:underline"
      >
        +91 81972 68789
      </button>
    </WhatsAppGate>
  )
}
