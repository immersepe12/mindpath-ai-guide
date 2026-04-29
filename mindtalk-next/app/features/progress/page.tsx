import Image from 'next/image'
import type { Metadata } from 'next'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import FeatureHero from '@/components/marketing/FeatureHero'
import FreeBadge from '@/components/marketing/FreeBadge'
import DownloadButtons from '@/components/marketing/DownloadButtons'

export const metadata: Metadata = {
  title: 'Progress & Reports — Mood Tracking + Clinical Reports | MindTalk',
  description:
    'Free mood tracking and weekly trends. Coach-led journey adds clinical progress reports, therapist session notes, and a final 90-day report.',
  alternates: { canonical: 'https://cadabamsmindtalk.com/features/progress' },
}

export default function ProgressPage() {
  return (
    <>
      <MinimalNav />
      <main>
        <FeatureHero
          overline="PROGRESS · FREE + COACH-LED"
          overlineTone="neutral"
          headline="See yourself change."
          subhead="Daily mood, weekly trends, streak rings — all free. Add a coach for clinical progress reports and final 90-day reviews."
          primaryScreenshot="/screenshots/AssessmentReport.png"
          secondaryScreenshot="/screenshots/JournalActiveDashboard.png"
          background="cream"
          badges={<DownloadButtons />}
        />

        {/* Free vs Coach */}
        <section className="bg-white py-20 border-t border-[#ECE6DE]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-[#FBF5EF] border border-[#ECE6DE] p-8">
              <FreeBadge size="md" className="mb-4">FREE TIER</FreeBadge>
              <h3 className="text-xl font-bold text-[#0E1726] mb-3">What's free</h3>
              <ul className="space-y-2 text-sm text-[#4A5260]">
                {[
                  'Daily mood check-in (10 seconds)',
                  'Weekly mood trends and patterns',
                  'Self-assessment results and re-tests',
                  'Journey streaks, badges, milestones',
                  'Personal mood history graphs',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-[#1F8B4C] mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#F77268] via-[#FF9466] to-[#F97316] text-white p-8">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wider mb-4">
                COACH-LED · ₹7,799
              </span>
              <h3 className="text-xl font-bold mb-3">What you get with a coach</h3>
              <ul className="space-y-2 text-sm text-white/90">
                {[
                  'Pre-session clinical notes from your therapist',
                  'Weekly progress reviews tied to your CBT plan',
                  'Mid-programme reassessment (Day 45)',
                  'Final 90-day clinical report — for your records',
                  'Optional shareable summary for ongoing care',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span aria-hidden>✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Assessment screenshot */}
        <section className="bg-[#FAF7F4] py-20 border-y border-[#ECE6DE]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <FreeBadge size="md" className="mb-4">CLINICAL ASSESSMENTS · FREE</FreeBadge>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0E1726] mb-3 text-balance">
                Validated assessments. In your pocket.
              </h2>
              <p className="text-[#4A5260] mb-5 leading-relaxed">
                Take the same clinical assessments used by Cadabams therapists — completely free in
                the app. Re-test every few weeks to see your line bend.
              </p>
              <ul className="space-y-2 text-sm text-[#4A5260]">
                {[
                  'PHQ-9 (depression), GAD-7 (anxiety), and more',
                  'Severity scoring with plain-English explanation',
                  'Suggested next steps and tools',
                  'Re-test reminders to track change over time',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-[#F97316] mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/screenshots/AssessmentReport.png"
                alt="Clinical assessment report screen"
                width={500}
                height={1050}
                className="rounded-[36px] shadow-xl max-w-[280px]"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#0E1726] text-white py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-8 text-balance">
              Track yourself. Free.
            </h2>
            <DownloadButtons theme="dark" className="justify-center" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
