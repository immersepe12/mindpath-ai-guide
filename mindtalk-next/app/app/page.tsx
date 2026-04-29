import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import FreeBadge from '@/components/marketing/FreeBadge'
import DownloadButtons, { DOWNLOAD_URL, WEB_APP_URL } from '@/components/marketing/DownloadButtons'
import AIDisclaimer from '@/components/marketing/AIDisclaimer'
import {
  HeroParticles,
  FloatingPhones,
  JourneyPath3D,
  MorphingGradientBg,
} from '@/components/three/dynamic'

export const metadata: Metadata = {
  title: 'MindTalk App | Free CBT Mental Health Companion · Doctor Rhea AI',
  description:
    "MindTalk is a free mental health app — Doctor Rhea AI, daily CBT tools, guided journeys, and mood tracking. Upgrade to a coach-led 90-day programme when you're ready. Built by Cadabams Group.",
  alternates: { canonical: 'https://cadabamsmindtalk.com/app' },
  openGraph: {
    title: 'MindTalk — Free CBT Mental Health App',
    description:
      "Doctor Rhea AI, daily CBT tools, journeys, and mood tracking — all free. Upgrade to a coach-led programme when you're ready.",
    url: 'https://cadabamsmindtalk.com/app',
    type: 'website',
  },
}

const featurePills = ['AI Agent Free', 'Toolkit Free', 'Journal Free', 'Journeys Free']

const freeFeatures: {
  title: string
  copy: string
  iconBg: string
  iconFg: string
  emoji: string
}[] = [
  {
    title: 'Doctor Rhea AI',
    copy: 'Your 24/7 CBT-guided AI companion. Free forever.',
    iconBg: 'bg-[#F1EBFF]',
    iconFg: 'text-[#6C5CE7]',
    emoji: '✨',
  },
  {
    title: 'Self-Paced Journeys',
    copy: 'Guided mental health journeys. Go at your own pace. No time limit.',
    iconBg: 'bg-[#E8F1FF]',
    iconFg: 'text-[#2C7BE5]',
    emoji: '⛰',
  },
  {
    title: 'CBT Journal',
    copy: 'Daily guided prompts. Mood tracking. Progress streaks.',
    iconBg: 'bg-[#FFE9D9]',
    iconFg: 'text-[#C9531A]',
    emoji: '✎',
  },
  {
    title: 'Self-Care Toolkit',
    copy: 'Breathing exercises. Grounding tools. Quick relief audio.',
    iconBg: 'bg-[#E6F4EA]',
    iconFg: 'text-[#1F8B4C]',
    emoji: '🌿',
  },
  {
    title: 'Mental Health Assessments',
    copy: 'Clinically validated check-ins. Know where you stand.',
    iconBg: 'bg-[#FFE9D9]',
    iconFg: 'text-[#C9531A]',
    emoji: '📋',
  },
  {
    title: 'Audio & Content Library',
    copy: 'Guided visualisations, reflections, and educational content.',
    iconBg: 'bg-[#E8F1FF]',
    iconFg: 'text-[#2C7BE5]',
    emoji: '▶',
  },
]

const upgradeRows: { label: string; free: string; coach: string }[] = [
  { label: 'Doctor Rhea AI',          free: '✓ Free',   coach: '✓ Included' },
  { label: 'Self-paced journeys',     free: '✓ Free',   coach: '✓ Included' },
  { label: 'CBT toolkit & journal',   free: '✓ Free',   coach: '✓ Included' },
  { label: 'Assessments',             free: '✓ Free',   coach: '✓ Included' },
  { label: 'Structured 90-day path',  free: '—',         coach: '✓ Day-by-day CBT plan' },
  { label: 'Weekly therapist session',free: '—',         coach: '✓ 12 sessions included' },
  { label: 'Coach progress reviews',  free: '—',         coach: '✓ Pre-session notes' },
  { label: 'Clinical progress report',free: '—',         coach: '✓ Full 90-day report' },
]

const pillars: {
  title: string
  copy: string
  bullets: string[]
  badge: 'free' | 'paid' | 'mixed'
  badgeText?: string
  screenshot: string
  alt: string
}[] = [
  {
    title: 'Doctor Rhea AI — your free 24/7 companion',
    copy: 'A real CBT-grounded AI agent that knows your journey. Not a chatbot — an actual companion.',
    bullets: [
      'Available 24/7, no wait, no appointment',
      'CBT-grounded conversation, not generic LLM chat',
      'Tracks your mood and surfaces the right tool at the right moment',
      'Free forever — no payment, no expiry',
    ],
    badge: 'free',
    badgeText: 'FREE · ALWAYS',
    screenshot: '/screenshots/MentalHealthHomeMainV11.png',
    alt: 'MindTalk home with Doctor Rhea AI chat',
  },
  {
    title: 'Journeys — free or coach-led',
    copy: 'All journeys are available. Start free and self-paced; upgrade to coach-led when you want a real Cadabams therapist guiding you.',
    bullets: [
      'FREE — self-paced journeys, all topics, no time limit',
      'PAID — Anxiety / Depression / Burnout / Relationships, structured 90-day with weekly therapist',
      'Daily CBT micro-tasks with progress tracking',
      'Doctor Rhea AI weaves into both paths',
    ],
    badge: 'mixed',
    screenshot: '/screenshots/JourneyPath.png',
    alt: 'Duolingo-style journey path with progress nodes',
  },
  {
    title: 'Self-Care Toolkit — free',
    copy: 'Breathing exercises, grounding techniques, quick relief audio — all in your pocket.',
    bullets: [
      '4-7-8 breathing & box breathing',
      '5-4-3-2-1 grounding for panic moments',
      'Audio library: guided meditations, sleep stories',
      'Use as much as you want — entirely free',
    ],
    badge: 'free',
    badgeText: 'FREE',
    screenshot: '/screenshots/BreathingExercise.png',
    alt: 'Guided breathing exercise screen',
  },
  {
    title: 'Therapy — included with coach-led journeys',
    copy: 'Weekly video sessions with a Cadabams therapist. Twelve sessions over 90 days. Real clinical care.',
    bullets: [
      '12 therapist sessions over 90 days',
      'Matched to your assessment and journey',
      'Cadabams Group — 30+ years of clinical experience',
      'Coach reviews your daily CBT progress before each session',
    ],
    badge: 'paid',
    badgeText: 'COACH-LED · ₹7,799',
    screenshot: '/screenshots/TherapistBookingRedesign.png',
    alt: 'Therapist booking screen with available slots',
  },
  {
    title: 'Journal — daily CBT prompts, free',
    copy: 'Guided journal entries that train cognitive restructuring while you write.',
    bullets: [
      'Daily CBT-guided prompts',
      'Mood tracking with weekly trends',
      'Progress streaks like Duolingo for mental health',
      'Privacy-first — your entries stay yours',
    ],
    badge: 'free',
    badgeText: 'FREE',
    screenshot: '/screenshots/JournalActiveDashboard.png',
    alt: 'Journal dashboard with mood tracking',
  },
]

export default function AppPage() {
  return (
    <>
      <MinimalNav />
      <main>
        {/* ─── HERO ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#1C2433] text-white">
          <HeroParticles />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left — copy */}
            <div className="relative z-10">
              <div className="inline-flex items-center rounded-full border border-[#F97316]/40 px-3 py-1 text-[11px] font-bold tracking-wider text-[#F97316] mb-6">
                FREE TO DOWNLOAD · BY CADABAMS GROUP
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6 text-balance">
                Your mental health<br />
                support is free.<br />
                <span className="bg-gradient-to-r from-[#F77268] to-[#F97316] bg-clip-text text-transparent">
                  Starts today.
                </span>
              </h1>
              <p className="text-lg text-[#9AA0AB] leading-relaxed mb-7 max-w-xl">
                Doctor Rhea AI, daily CBT tools, guided journeys, and mood tracking — completely free.
                Upgrade to a coach-led programme when you're ready.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {featurePills.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center rounded-full bg-[#F97316]/10 text-[#F97316] text-[13px] font-medium px-3 py-1"
                  >
                    ✓ {p}
                  </span>
                ))}
              </div>
              <DownloadButtons theme="dark" />
              <p className="text-xs text-[#6B7280] mt-4">
                ↓ iOS &amp; Android · Backed by Cadabams Group · 30+ years · NABH Accredited
              </p>
            </div>
            {/* Right — floating phones (desktop only) */}
            <div className="relative h-[460px] hidden lg:block">
              <FloatingPhones className="absolute inset-0" />
            </div>
          </div>
        </section>

        {/* ─── DOCTOR RHEA — HERO FEATURE ──────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0E1726] text-white py-20 sm:py-24">
          <MorphingGradientBg opacity={0.35} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-12 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(249,115,22,0.4)_0%,rgba(249,115,22,0)_70%)] pointer-events-none" />
              <div className="relative mx-auto max-w-[280px]">
                <Image
                  src="/screenshots/MentalHealthHomeMainV11.png"
                  alt="Doctor Rhea AI chat in MindTalk app"
                  width={560}
                  height={1180}
                  className="rounded-[44px] shadow-2xl"
                />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center rounded-full bg-[#F1EBFF] text-[#6C5CE7] px-3 py-1 text-[11px] font-bold tracking-wider mb-5">
                DOCTOR RHEA AI · FREE
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight mb-5 text-balance">
                An AI that actually<br />understands you.
              </h2>
              <p className="text-lg text-[#9AA0AB] leading-relaxed mb-8 max-w-xl">
                Doctor Rhea is MindTalk's AI mental health companion — built on CBT protocols, free
                to use, available 24/7. She knows your journey, tracks your mood over time, and gives
                you the right tool at the right moment. Not a chatbot. A companion.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8 max-w-xl">
                {[
                  ['24/7 Available',  'No waiting. No appointments. Always on.'],
                  ['CBT-Guided',      'Every response is grounded in cognitive behavioural therapy.'],
                  ['Journey-Aware',   'She knows where you are in your programme.'],
                  ['Mood-Tracking',   'Learns your patterns. Gets better over time.'],
                ].map(([t, c]) => (
                  <div key={t} className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="font-semibold text-sm mb-1">{t}</div>
                    <div className="text-xs text-[#9AA0AB] leading-relaxed">{c}</div>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white px-4 py-1.5 text-sm font-bold mb-5">
                Completely Free
              </div>
              <div>
                <a
                  href={DOWNLOAD_URL}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-13 px-7 text-base hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(249,115,22,0.28)] transition-all"
                >
                  Chat with Doctor Rhea →
                </a>
              </div>
              <AIDisclaimer variant="inline" className="text-[#6B7280]" />
            </div>
          </div>
        </section>

        {/* ─── EVERYTHING FREE — FEATURES GRID ─────────────────────────── */}
        <section className="bg-[#FAF7F4] py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <div className="text-xs font-bold tracking-wider text-[#E8620A] mb-3">
              WHAT'S FREE
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0E1726] mb-4 text-balance">
              Start with everything.<br className="sm:hidden" /> Pay only for a coach.
            </h2>
            <p className="text-lg text-[#4A5260] max-w-2xl mx-auto">
              No trials. No expiry. These features are free forever.
            </p>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {freeFeatures.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl shadow-[0_2px_6px_rgba(15,23,42,0.05),0_6px_16px_rgba(15,23,42,0.04)] p-6 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08),0_2px_6px_rgba(15,23,42,0.04)] transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl ${f.iconBg} ${f.iconFg} flex items-center justify-center text-xl mb-4`}>
                  {f.emoji}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-[#0E1726]">{f.title}</h3>
                  <FreeBadge />
                </div>
                <p className="text-sm text-[#4A5260] leading-relaxed">{f.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-14 px-8 text-base hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(249,115,22,0.28)] transition-all"
            >
              Download Free →
            </a>
          </div>
        </section>

        {/* ─── THE UPGRADE — COACH-LED COMPARISON ──────────────────────── */}
        <section className="relative overflow-hidden bg-[#1C2433] text-white py-20 sm:py-24">
          <MorphingGradientBg opacity={0.4} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-wider text-[#F97316] mb-3">
                WHEN YOU'RE READY TO GO FURTHER
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-balance">
                Add a coach. Transform the journey.
              </h2>
              <p className="text-lg text-[#9AA0AB] max-w-2xl mx-auto">
                The free app gives you tools. The coach-led programme gives you a structured 90-day
                recovery — with a real Cadabams therapist guiding every step.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Comparison */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 sm:p-8">
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-3 text-sm">
                  <div className="font-bold text-[#9AA0AB] text-xs uppercase tracking-wider">Feature</div>
                  <div className="font-bold text-white text-xs uppercase tracking-wider text-right">Free App</div>
                  <div className="font-bold bg-gradient-to-r from-[#F77268] to-[#F97316] bg-clip-text text-transparent text-xs uppercase tracking-wider text-right">Coach-Led</div>
                  {upgradeRows.map((r) => (
                    <div key={r.label} className="contents">
                      <div className="text-white/90 py-2 border-t border-white/5">{r.label}</div>
                      <div className="text-right py-2 border-t border-white/5 text-[#9AA0AB] tabular-nums">{r.free}</div>
                      <div className="text-right py-2 border-t border-white/5 text-[#FFA875] tabular-nums">{r.coach}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Pricing card */}
              <div className="rounded-3xl bg-gradient-to-br from-[#F77268] via-[#FF9466] to-[#F97316] text-white p-8 shadow-2xl">
                <div className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wider mb-5">
                  COACH-LED JOURNEY
                </div>
                <div className="text-5xl font-extrabold mb-1">₹7,799</div>
                <div className="text-white/90 text-sm mb-6">for 90 days · all 4 conditions available</div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Anxiety', 'Depression', 'Burnout', 'Relationships'].map((j) => (
                    <span
                      key={j}
                      className="inline-flex items-center rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold"
                    >
                      {j}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2 text-sm mb-7">
                  {[
                    '90-day structured CBT programme',
                    '12 weekly therapist sessions',
                    'Personalised to your assessment',
                    'Everything in the free app, plus your coach',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span aria-hidden>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center w-full rounded-full bg-white text-[#0E1726] font-semibold h-13 px-7 hover:bg-[#FAF7F4] transition-colors"
                >
                  Start with a Free Assessment
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5 PILLARS — alternating ─────────────────────────────────── */}
        <section className="bg-[#FAF7F4] py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
            {pillars.map((p, i) => {
              const isJourneys = p.title.startsWith('Journeys')
              return (
                <div
                  key={p.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* Visual */}
                  <div>
                    {isJourneys ? (
                      <JourneyPath3D />
                    ) : (
                      <div className="relative mx-auto max-w-[300px]">
                        <div className="absolute -inset-6 bg-gradient-to-br from-[#FFE4D2]/60 to-transparent rounded-[60px] blur-2xl" />
                        <Image
                          src={p.screenshot}
                          alt={p.alt}
                          width={600}
                          height={1260}
                          className="relative rounded-[44px] shadow-xl"
                        />
                      </div>
                    )}
                  </div>
                  {/* Copy */}
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      {p.badge === 'free' && <FreeBadge size="md">{p.badgeText ?? 'FREE'}</FreeBadge>}
                      {p.badge === 'paid' && (
                        <span className="inline-flex items-center rounded-full bg-[#FFE9D9] text-[#C9531A] px-3 py-1 text-xs font-bold tracking-wider">
                          {p.badgeText}
                        </span>
                      )}
                      {p.badge === 'mixed' && (
                        <>
                          <FreeBadge size="md">FREE TIER</FreeBadge>
                          <span className="inline-flex items-center rounded-full bg-[#FFE9D9] text-[#C9531A] px-3 py-1 text-xs font-bold tracking-wider">
                            COACH-LED · ₹7,799
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0E1726] mb-3 text-balance">
                      {p.title}
                    </h3>
                    <p className="text-[#4A5260] leading-relaxed mb-5">{p.copy}</p>
                    <ul className="space-y-2 text-sm text-[#4A5260]">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="text-[#F97316] mt-0.5">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─── HOW IT WORKS ─ TWO PATHS ─────────────────────────────── */}
        <section className="bg-[#FAF7F4] py-20 sm:py-24 border-t border-[#ECE6DE]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0E1726] mb-4 text-balance">
                Two paths. You pick.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free path */}
              <div className="rounded-3xl bg-[#FBF5EF] border border-[#ECE6DE] p-8">
                <FreeBadge size="md" className="mb-4">FREE FOREVER</FreeBadge>
                <h3 className="text-2xl font-extrabold text-[#0E1726] mb-5">Start free, today.</h3>
                <ol className="space-y-3 text-sm text-[#4A5260] mb-7 list-decimal list-inside">
                  <li>Download the app (or open on web)</li>
                  <li>Take the free mental health assessment</li>
                  <li>Chat with Doctor Rhea AI</li>
                  <li>Start a self-paced journey</li>
                  <li>Use the toolkit, journal, explore</li>
                </ol>
                <a
                  href={DOWNLOAD_URL}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-12 px-6 text-sm hover:scale-[1.02] transition-all"
                >
                  Download Free →
                </a>
              </div>
              {/* Coach path */}
              <div className="rounded-3xl bg-gradient-to-br from-[#F77268] via-[#FF9466] to-[#F97316] text-white p-8 shadow-xl">
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wider mb-4">
                  COACH-LED · ₹7,799
                </span>
                <h3 className="text-2xl font-extrabold mb-5">Ready for a coach?</h3>
                <ol className="space-y-3 text-sm text-white/90 mb-7 list-decimal list-inside">
                  <li>Take the free assessment in the app</li>
                  <li>Choose your journey: Anxiety / Depression / Burnout / Relationships</li>
                  <li>Get matched with a Cadabams therapist</li>
                  <li>Follow your 90-day structured programme</li>
                  <li>Weekly sessions + daily CBT practice</li>
                </ol>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-full bg-white text-[#0E1726] font-semibold h-12 px-6 text-sm hover:bg-[#FAF7F4] transition-colors"
                >
                  Explore Coach Journeys →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRUST — CADABAMS ───────────────────────────────────────── */}
        <section className="bg-white py-20 border-y border-[#ECE6DE]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-xs font-bold tracking-wider text-[#E8620A] mb-3">
              BUILT BY CADABAMS GROUP
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-5 text-balance">
              30+ years of clinical mental health care.
            </h2>
            <p className="text-lg text-[#4A5260] leading-relaxed max-w-2xl mx-auto mb-8">
              MindTalk is built by Cadabams — India's largest private mental health organisation,
              with NABH-accredited facilities in Bengaluru, Hyderabad, and Chennai. Hundreds of
              thousands of patients treated since 1991.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['NABH Accredited', 'CBT-Based', 'Licensed Therapists', '197M+ Indians eligible'].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-[#FAF7F4] border border-[#ECE6DE] px-4 py-1.5 text-[#4A5260] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0E1726] text-white py-24 sm:py-32">
          <MorphingGradientBg opacity={0.5} />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5 text-balance">
              Free to start.<br />
              <span className="bg-gradient-to-r from-[#F77268] to-[#F97316] bg-clip-text text-transparent">
                Life-changing to finish.
              </span>
            </h2>
            <p className="text-lg text-[#9AA0AB] mb-8 max-w-xl mx-auto">
              Download the app. Chat with Doctor Rhea. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={DOWNLOAD_URL}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-14 px-8 text-base hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(249,115,22,0.28)] transition-all"
              >
                Download Free →
              </a>
              <a
                href={WEB_APP_URL}
                className="inline-flex items-center justify-center rounded-full border-2 border-white/20 hover:border-white/40 text-white font-semibold h-14 px-8 text-base transition-colors"
              >
                Try on Web
              </a>
            </div>
            <p className="text-xs text-[#6B7280] mt-5">
              Available on iOS &amp; Android · Free forever · No credit card
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
