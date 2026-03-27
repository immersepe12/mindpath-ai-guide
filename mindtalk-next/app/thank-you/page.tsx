import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'You\'re in — MindTalk',
  description: 'Your assessment has been received. A Cadabams counsellor will call you within a few hours.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F4] flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8521A]/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[#E8521A]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          You're in.
        </h1>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          A Cadabams counsellor will call you within a few hours to answer any questions and confirm your psychologist match.
        </p>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left space-y-4">
          <h2 className="font-semibold text-gray-900">What happens next</h2>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#E8521A] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
            <div>
              <div className="font-medium text-gray-800 text-sm">Counsellor call</div>
              <div className="text-gray-500 text-sm">Within a few hours — they'll answer any questions and confirm your match.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#E8521A] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
            <div>
              <div className="font-medium text-gray-800 text-sm">Psychologist match</div>
              <div className="text-gray-500 text-sm">You'll be matched to a Cadabams psychologist specialised in your issue.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#E8521A] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
            <div>
              <div className="font-medium text-gray-800 text-sm">Day 1 begins</div>
              <div className="text-gray-500 text-sm">Your 90-day journey starts. First session scheduled in your first week.</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Questions? WhatsApp us at{' '}
          <a href="https://wa.me/918197268789" className="text-[#E8521A] hover:underline">
            +91 81972 68789
          </a>
        </p>
        <Button variant="ghost" asChild>
          <Link href="/">← Back to MindTalk</Link>
        </Button>
      </div>
    </div>
  )
}
