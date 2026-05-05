import MinimalNav from '@/components/layout/MinimalNav'
import VerticalQuizFlow from '@/components/quiz/VerticalQuizFlow'
import questionsData from '@/content/quiz/verticals/relationship.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find your relationship programme — MindTalk',
  description: 'A short, warm assessment that matches you to the right psychologist for relationship and connection work.',
  robots: { index: false, follow: false },
}

export default function RelationshipsQuizPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const questions = questionsData.questions as any[]
  return (
    <>
      <MinimalNav />
      <main className="min-h-screen bg-[#FDF8F4] py-12 px-4 sm:px-6">
        <VerticalQuizFlow vertical="relationship" questions={questions} />
      </main>
    </>
  )
}
