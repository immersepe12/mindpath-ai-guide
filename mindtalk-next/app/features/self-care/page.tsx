import Image from 'next/image'
import type { Metadata } from 'next'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import FeatureHero from '@/components/marketing/FeatureHero'
import FreeBadge from '@/components/marketing/FreeBadge'
import DownloadButtons, { DOWNLOAD_URL } from '@/components/marketing/DownloadButtons'
import { BreathingOrb } from '@/components/three/dynamic'

export const metadata: Metadata = {
  title: 'Self-Care Toolkit — Free CBT Tools, Breathing, Audio | MindTalk',
  description:
    'Free, in-pocket mental health tools: 4-7-8 breathing, 5-4-3-2-1 grounding, quick relief audio, daily CBT journal. Built into MindTalk.',
  alternates: { canonical: 'https://cadabamsmindtalk.com/features/self-care' },
}

const tools: { title: string; copy: string; emoji: string; bg: string; fg: string }[] = [
  { title: 'CBT Journal',     copy: 'Daily guided prompts. Mood tracking. Streaks.',           emoji: '✎', bg: 'bg-[#FFE9D9]', fg: 'text-[#C9531A]' },
  { title: 'Breathing',       copy: '4-7-8, box breathing, calming exhale exercises.',         emoji: '🌬', bg: 'bg-[#E6F4EA]', fg: 'text-[#1F8B4C]' },
  { title: 'Quick Relief Audio', copy: 'Guided meditations, body scans, sleep stories.',       emoji: '▶', bg: 'bg-[#E8F1FF]', fg: 'text-[#2C7BE5]' },
  { title: 'Mood Tracking',   copy: '10-second daily check-in, weekly trends, pattern alerts.', emoji: '📈', bg: 'bg-[#F1EBFF]', fg: 'text-[#6C5CE7]' },
]

export default function SelfCarePage() {
  return (
    <>
      <MinimalNav />
      <main>
        <FeatureHero
          overline="SELF-CARE TOOLKIT · FREE"
          overlineTone="free"
          headline="Tools in your pocket. Always free."
          subhead="Breathing, grounding, journaling, audio, mood — the building blocks of mental health, all free."
          primaryScreenshot="/screenshots/BreathingExercise.png"
          secondaryScreenshot="/screenshots/QuickReliefAudioList.png"
          background="cream"
          badges={
            <>
              <div className="flex items-center gap-2 mb-6">
                <FreeBadge size="md">FREE FOREVER</FreeBadge>
              </div>
              <DownloadButtons />
            </>
          }
        />

        {/* Interactive breathing orb */}
        <section className="bg-white py-20 border-t border-[#ECE6DE]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-3 text-balance">
                Try the 4-7-8 right now.
              </h2>
              <p className="text-[#4A5260] max-w-xl mx-auto">
                Inhale 4. Hold 7. Exhale 8. The orb will guide you. This same exercise lives inside
                the MindTalk app — and it's one of Doctor Riya's most-recommended tools.
              </p>
            </div>
            <BreathingOrb />
          </div>
        </section>

        {/* Tools grid */}
        <section className="bg-[#FAF7F4] py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-3 text-balance">
              Everything in the toolkit.
            </h2>
            <p className="text-[#4A5260] mb-10">All free. No paywall. No expiry.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {tools.map((t) => (
                <div key={t.title} className="rounded-2xl bg-white p-6 shadow-[0_2px_6px_rgba(15,23,42,0.05)]">
                  <div className={`w-12 h-12 rounded-2xl ${t.bg} ${t.fg} flex items-center justify-center text-xl mb-4`}>
                    {t.emoji}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#0E1726]">{t.title}</h3>
                    <FreeBadge />
                  </div>
                  <p className="text-sm text-[#4A5260] leading-relaxed">{t.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journal screenshot block */}
        <section className="bg-white py-20 border-y border-[#ECE6DE]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <FreeBadge size="md" className="mb-4">FREE</FreeBadge>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0E1726] mb-3 text-balance">
                Daily CBT prompts. Pattern over time.
              </h2>
              <p className="text-[#4A5260] mb-5">
                The journal isn't a blank page — it's a CBT-trained companion that asks the right
                questions, tracks your mood, and surfaces what's working over weeks.
              </p>
              <ul className="space-y-2 text-sm text-[#4A5260]">
                {['Daily guided prompts', 'Mood tracking', 'Progress streaks', 'Privacy-first'].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-[#F97316] mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/screenshots/JournalActiveDashboard.png"
                alt="Journal dashboard with mood tracking"
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
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 text-balance">
              Free to download. Free to use.
            </h2>
            <p className="text-[#9AA0AB] mb-8">No payment. No subscription. No expiry.</p>
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-14 px-8 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(249,115,22,0.28)] transition-all"
            >
              Download Free →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
