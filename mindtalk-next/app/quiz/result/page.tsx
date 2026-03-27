import MinimalNav from '@/components/layout/MinimalNav'
import QuizResult from '@/components/quiz/QuizResult'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your programme match — MindTalk',
  description: 'Your personalised MindTalk programme recommendation.',
  robots: { index: false, follow: false },
}

export default function QuizResultPage() {
  return (
    <>
      <MinimalNav />
      <main className="min-h-screen bg-[#FDF8F4] py-12 px-4 sm:px-6">
        <QuizResult />
      </main>
    </>
  )
}
