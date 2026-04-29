import type { Metadata } from 'next'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import FeatureHero from '@/components/marketing/FeatureHero'
import FreeBadge from '@/components/marketing/FreeBadge'
import DownloadButtons, { DOWNLOAD_URL } from '@/components/marketing/DownloadButtons'
import AIDisclaimer from '@/components/marketing/AIDisclaimer'
import { HeroParticles, BreathingOrb } from '@/components/three/dynamic'

export const metadata: Metadata = {
  title: 'Doctor Rhea AI — Free CBT Mental Health Companion | MindTalk',
  description:
    'Doctor Rhea is a free, 24/7 AI mental health companion built on CBT protocols. Tracks mood, knows your journey, surfaces the right tool at the right moment.',
  alternates: { canonical: 'https://cadabamsmindtalk.com/features/doctor-rhea' },
}

const scenarios: { title: string; copy: string }[] = [
  { title: "It's 2am and anxiety hits", copy: "Open the app. Doctor Rhea is awake. Get a guided breathing exercise and grounding before the spiral takes over." },
  { title: 'Before a hard conversation', copy: "Five minutes with Doctor Rhea, working through the cognitive distortions you'll bring into the room." },
  { title: 'You want to track your mood', copy: 'Quick mood check-in. She remembers patterns over weeks and surfaces the trends you missed.' },
  { title: 'You need a CBT exercise now', copy: "Type how you're feeling. She picks the right CBT tool — thought record, behavioural activation, exposure ladder — and walks you through it." },
]

const differentiators: { title: string; copy: string }[] = [
  { title: 'Not a chatbot', copy: 'Doctor Rhea is a structured CBT agent, not a generic LLM with a wellness prompt. Every response is grounded in protocol.' },
  { title: 'CBT-grounded', copy: 'Cognitive restructuring, behavioural activation, exposure work — the actual evidence base, not vibes.' },
  { title: 'Always remembers you', copy: 'She knows where you are in your journey, what triggers you, and what tools have worked before.' },
]

export default function DoctorRheaPage() {
  return (
    <>
      <MinimalNav />
      <main>
        <FeatureHero
          overline="DOCTOR RHEA AI · FREE FOREVER"
          overlineTone="free"
          headline="Doctor Rhea. Free. Always on."
          subhead="The AI mental health companion that knows your journey — and gives you CBT tools the moment you need them."
          primaryScreenshot="/screenshots/MentalHealthHomeMainV11.png"
          secondaryScreenshot="/screenshots/MentalHealthHomeMain.png"
          background="cream"
          decoration={<HeroParticles className="opacity-60" />}
          badges={
            <>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <FreeBadge size="md">FREE FOREVER</FreeBadge>
                <span className="text-xs text-[#4A5260]">No payment · No expiry · No credit card</span>
              </div>
              <DownloadButtons />
            </>
          }
        />

        {/* What she does */}
        <section className="bg-white py-20 border-t border-[#ECE6DE]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-12 text-balance">
              What she does
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {scenarios.map((s) => (
                <div key={s.title} className="rounded-2xl bg-[#FAF7F4] border border-[#ECE6DE] p-6">
                  <h3 className="font-bold text-[#0E1726] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#4A5260] leading-relaxed">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How she's different */}
        <section className="bg-[#FAF7F4] py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-12 text-balance">
              How she's different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {differentiators.map((d) => (
                <div key={d.title} className="rounded-2xl bg-white p-7 shadow-[0_2px_6px_rgba(15,23,42,0.05)]">
                  <h3 className="text-xl font-bold text-[#0E1726] mb-2">{d.title}</h3>
                  <p className="text-sm text-[#4A5260] leading-relaxed">{d.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Breathing demo */}
        <section className="bg-white py-20 border-y border-[#ECE6DE]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <FreeBadge size="md" className="mb-4">TRY IT NOW</FreeBadge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-3">
                One of Doctor Rhea's most-used tools
              </h2>
              <p className="text-[#4A5260]">
                The 4-7-8 breathing technique — inhale 4, hold 7, exhale 8. Try it.
              </p>
            </div>
            <BreathingOrb />
          </div>
        </section>

        {/* Disclaimer block */}
        <section className="bg-[#FAF7F4] py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIDisclaimer variant="full" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#0E1726] text-white py-20 text-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 text-balance">
              Chat with Doctor Rhea — free.
            </h2>
            <p className="text-[#9AA0AB] mb-8">No payment. No appointment. Just open the app.</p>
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-14 px-8 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(249,115,22,0.28)] transition-all"
            >
              Chat with Doctor Rhea Free →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
