import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import FeatureHero from '@/components/marketing/FeatureHero'
import FreeBadge from '@/components/marketing/FreeBadge'
import DownloadButtons, { DOWNLOAD_URL } from '@/components/marketing/DownloadButtons'
import { JourneyPath3D } from '@/components/three/dynamic'

export const metadata: Metadata = {
  title: 'Mental Health Journeys — Free Self-Paced or Coach-Led | MindTalk',
  description:
    'Pick a journey: anxiety, depression, burnout, relationships. Self-paced and free, or coach-led with a Cadabams therapist for ₹7,799 over 90 days.',
  alternates: { canonical: 'https://cadabamsmindtalk.com/features/journeys' },
}

const coachJourneys: { name: string; copy: string; href: string }[] = [
  { name: 'Anxiety',       copy: '90-day anxiety recovery with structured CBT',         href: '/anxiety' },
  { name: 'Depression',    copy: '90-day path out of depression — 3 phases',            href: '/depression' },
  { name: 'Burnout',       copy: 'Recover from work burnout with daily CBT practice',    href: '/burnout' },
  { name: 'Relationships', copy: 'Change relational patterns with structured therapy',    href: '/relationships' },
]

export default function JourneysPage() {
  return (
    <>
      <MinimalNav />
      <main>
        <FeatureHero
          overline="JOURNEYS · FREE + COACH-LED"
          overlineTone="neutral"
          headline="Pick your path. Free or with a coach."
          subhead="Free self-paced journeys cover every topic. Upgrade to coach-led for a 90-day structured CBT programme with a real Cadabams therapist."
          primaryScreenshot="/screenshots/JourneysLanding.png"
          secondaryScreenshot="/screenshots/JourneyPath.png"
          background="cream"
          badges={<DownloadButtons />}
        />

        {/* JourneyPath 3D scene */}
        <section className="bg-[#FAF7F4] py-16 border-t border-[#ECE6DE]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-3 text-balance">
              The path you walk every day.
            </h2>
            <p className="text-[#4A5260] mb-8 max-w-2xl">
              Each journey is a sequence of CBT tasks — like Duolingo for your mental health.
              Completed nodes glow. The current node pulses. Locked nodes wait their turn.
            </p>
            <JourneyPath3D />
          </div>
        </section>

        {/* Two types side by side */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-[#FBF5EF] border border-[#ECE6DE] p-8">
              <FreeBadge size="md" className="mb-4">FREE · ALL TOPICS</FreeBadge>
              <h3 className="text-2xl font-extrabold text-[#0E1726] mb-3">Free, self-paced journeys</h3>
              <p className="text-sm text-[#4A5260] leading-relaxed mb-5">
                Every topic available. Go at your own pace. No time limit. No subscription.
              </p>
              <ul className="space-y-2 text-sm text-[#4A5260] mb-7">
                {[
                  'All 4 conditions (anxiety, depression, burnout, relationships) + others',
                  'Daily CBT micro-tasks',
                  'Doctor Riya AI in every step',
                  'Mood tracking, journaling, breathing tools',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-[#1F8B4C] mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href={DOWNLOAD_URL}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-12 px-6 hover:scale-[1.02] transition-all"
              >
                Explore Free Journeys →
              </a>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#F77268] via-[#FF9466] to-[#F97316] text-white p-8 shadow-xl">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wider mb-4">
                COACH-LED · ₹7,799
              </span>
              <h3 className="text-2xl font-extrabold mb-3">Coach-led structured journeys</h3>
              <p className="text-sm text-white/90 leading-relaxed mb-5">
                The 4 flagship programmes. 90 days. Day-by-day CBT plan. Weekly therapist.
              </p>
              <ul className="space-y-2 text-sm text-white/90 mb-7">
                {[
                  '12 weekly therapist sessions over 90 days',
                  'Personalised to your assessment',
                  'Daily structured CBT exercises',
                  'Coach progress reviews + final clinical report',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span aria-hidden>✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#0E1726] font-semibold h-12 px-6 hover:bg-[#FAF7F4] transition-colors"
              >
                Start a Coach Journey →
              </Link>
            </div>
          </div>
        </section>

        {/* Journey detail screenshot */}
        <section className="bg-[#FAF7F4] py-20 border-y border-[#ECE6DE]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-4 text-balance">
                Every step is structured.
              </h2>
              <p className="text-[#4A5260] mb-5">
                Each day you open the app, the next CBT task is waiting. Short. Clear. Trackable.
                Build a streak. Watch your mood line bend over weeks.
              </p>
              <ul className="space-y-2 text-sm text-[#4A5260]">
                {[
                  'Estimated time on each task — usually 5–8 minutes',
                  'Background reading, exercises, and reflections',
                  'Mood check-in before and after',
                  'Streaks, stars, and milestone badges',
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
                src="/screenshots/JourneyDetail.png"
                alt="Journey day-detail screen"
                width={500}
                height={1050}
                className="rounded-[36px] shadow-xl max-w-[280px]"
              />
            </div>
          </div>
        </section>

        {/* Coach journey picker */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-flex items-center rounded-full bg-[#FFE9D9] text-[#C9531A] px-3 py-1 text-xs font-bold tracking-wider mb-3">
                COACH-LED · ₹7,799
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-3 text-balance">
                The 4 flagship coach-led journeys
              </h2>
              <p className="text-sm text-[#6B7280]">
                Free self-paced versions of these (and more) are also available inside the app.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {coachJourneys.map((j) => (
                <Link
                  key={j.name}
                  href={j.href}
                  className="block rounded-2xl bg-[#FAF7F4] border border-[#ECE6DE] hover:border-[#F97316]/40 hover:shadow-md p-6 transition-all"
                >
                  <h3 className="text-lg font-bold text-[#0E1726] mb-1">{j.name}</h3>
                  <p className="text-sm text-[#4A5260]">{j.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA pair */}
        <section className="bg-[#FAF7F4] py-20 text-center border-t border-[#ECE6DE]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0E1726] mb-8 text-balance">
              Pick a path. Start today.
            </h2>
            <DownloadButtons
              theme="light"
              primaryLabel="Explore Free Journeys"
              secondaryLabel="Start a Coach Journey"
              className="justify-center"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
