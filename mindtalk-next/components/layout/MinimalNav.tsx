'use client'
import Link from 'next/link'
import WhatsAppGate from '@/components/WhatsAppGate'

export default function MinimalNav() {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#E8521A]">MindTalk</span>
          <span className="text-xs text-gray-400 font-normal mt-0.5">by Cadabams</span>
        </Link>
        <WhatsAppGate location="nav">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-[#E8521A] transition-colors"
          >
            Questions? WhatsApp us
          </button>
        </WhatsAppGate>
      </div>
    </nav>
  )
}
