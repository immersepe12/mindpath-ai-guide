import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import FeatureHero from '@/components/marketing/FeatureHero'

export const metadata: Metadata = {
  title: 'Therapy with Cadabams — Coach-Led 90-Day CBT Programme | MindTalk',
  description:
    'Twelve weekly therapy sessions with a Cadabams therapist. Included in the coach-led journey at ₹7,799 — structured CBT for anxiety, depression, burnout, relationships.',
  alternates: { canonical: 'https://cadabamsmindtalk.com/features/therapy' },
}

const sessionStructure: { title: string; copy: string }[] = [
  { title: 'Check-in', copy: 'How has the week been? What was your mood pattern?' },
  { title: 'Homework review', copy: 'What worked from your daily CBT practice. What did not.' },
  { title: 'Skill work', copy: 'Cognitive restructuring, exposure planning, behavioural activation, problem-solving.' },
  { title: 'Plan ahead', copy: 'Concrete homework for the next 7 days, tied to your journey path.' },
]

export default function TherapyPage() {
  return (
    <>
      <MinimalNav />
      <main>
        <FeatureHero
          overline="INCLUDED IN COACH-LED JOURNEYS · ₹7,799"
          overlineTone="paid"
          headline="A real therapist. Every week."
          subhead="The coach-led journey includes 12 weekly sessions with a licensed Cadabams therapist over 90 days. Therapy is the upgrade — the free app gives you everything else."
          primaryScreenshot="/app-screenshots/screen_find_therapist.png"
          secondaryScreenshot="/app-screenshots/screen_find_therapist.png"
          background="cream"
          badges={
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-14 px-7 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(249,115,22,0.28)] transition-all"
            >
              Start with a Free Assessment →
            </Link>
          }
        />

        {/* Matching */}
        <section className="bg-white py-20 border-t border-[#ECE6DE]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-4 text-balance">
                Matched, not assigned.
              </h2>
              <p className="text-[#4A5260] mb-5 leading-relaxed">
                Take the free in-app assessment. We use your responses — vertical, severity, prior
                therapy, language preference — to match you to the right Cadabams therapist for
                your journey.
              </p>
              <ul className="space-y-2 text-sm text-[#4A5260]">
                {[
                  'Trained in evidence-based CBT protocols',
                  'Specialised by condition (anxiety, depression, burnout, relationships)',
                  'Cadabams Group — NABH-accredited',
                  'Switch therapist any time, no questions asked',
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
                src="/app-screenshots/screen_find_therapist.png"
                alt="Find your therapist screen"
                width={500}
                height={1050}
                className="rounded-[36px] shadow-xl max-w-[280px]"
              />
            </div>
          </div>
        </section>

        {/* Session structure */}
        <section className="bg-[#FAF7F4] py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-3 text-balance">
              What every session looks like
            </h2>
            <p className="text-[#4A5260] mb-10">
              Sessions are 50 minutes, structured CBT — not free-form chat. Your therapist sees your
              between-session CBT progress before each call.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sessionStructure.map((s, i) => (
                <div key={s.title} className="rounded-2xl bg-white p-6 shadow-[0_2px_6px_rgba(15,23,42,0.05)]">
                  <div className="text-xs font-bold text-[#F97316] tracking-wider mb-2">
                    PART {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#0E1726] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#4A5260] leading-relaxed">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12-session breakdown */}
        <section className="bg-white py-20 border-y border-[#ECE6DE]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-10 text-balance">
              The 12-session arc
            </h2>
            <div className="space-y-3">
              {[
                ['Sessions 1–2',  'Assessment + goal setting. Map your specific patterns.'],
                ['Sessions 3–6',  'Stabilisation. Cognitive restructuring. Foundation habits.'],
                ['Sessions 7–10', 'Active change. Exposure work. Behavioural activation.'],
                ['Sessions 11–12','Relapse prevention. Maintenance plan. Final clinical report.'],
              ].map(([when, what]) => (
                <div key={when} className="flex flex-col sm:flex-row gap-2 sm:gap-6 rounded-xl bg-[#FAF7F4] border border-[#ECE6DE] p-5">
                  <div className="font-bold text-[#0E1726] sm:min-w-[140px]">{when}</div>
                  <div className="text-sm text-[#4A5260]">{what}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cadabams credentials */}
        <section className="bg-[#FAF7F4] py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-5 text-balance">
              Therapy by Cadabams Group
            </h2>
            <p className="text-[#4A5260] mb-7 leading-relaxed">
              India's largest private mental health organisation since 1991. NABH-accredited
              facilities in Bengaluru, Hyderabad, and Chennai. The same clinical team that has
              treated hundreds of thousands of patients now powers MindTalk.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['NABH Accredited', '30+ years', 'Licensed therapists', 'CBT-certified'].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-white border border-[#ECE6DE] px-4 py-1.5 text-[#4A5260] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-[#F77268] via-[#FF9466] to-[#F97316] text-white py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 text-balance">
              Start with a free assessment.
            </h2>
            <p className="text-white/90 mb-8">
              The assessment is free. The match is free. The first call confirms your fit. ₹7,799
              for 90 days only after you choose to start.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#0E1726] font-semibold h-14 px-8 hover:bg-[#FAF7F4] transition-colors"
            >
              Start with a Free Assessment →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
