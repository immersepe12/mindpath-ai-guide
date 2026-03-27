import MinimalNav from '@/components/layout/MinimalNav'
import QuizFlow from '@/components/quiz/QuizFlow'
import type { Metadata } from 'next'
import questionsData from '@/content/quiz/questions.json'

export const metadata: Metadata = {
  title: 'Find your programme — MindTalk',
  description: 'A 6-question assessment that matches you to the right 90-day recovery programme and psychologist.',
  robots: { index: false, follow: false },
}

export default function QuizPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const questions = questionsData.questions as any[]
  return (
    <>
      <MinimalNav />
      <main className="min-h-screen bg-[#FDF8F4] py-12 px-4 sm:px-6">
        <QuizFlow questions={questions} />
      </main>
    </>
  )
}
