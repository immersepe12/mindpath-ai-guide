import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import FreeBadge from '@/components/marketing/FreeBadge'
import DownloadButtons, { DOWNLOAD_URL, WEB_APP_URL } from '@/components/marketing/DownloadButtons'
import AIDisclaimer from '@/components/marketing/AIDisclaimer'

export const metadata: Metadata = {
  title: 'MindTalk App | Free CBT Mental Health Companion · Doctor Riya AI',
  description:
    "MindTalk is a free mental health app — Doctor Riya AI, daily CBT tools, guided journeys, and mood tracking. Upgrade to a coach-led 90-day programme when you're ready. Built by Cadabams Group.",
  alternates: { canonical: 'https://cadabamsmindtalk.com/app' },
  openGraph: {
    title: 'MindTalk — Free CBT Mental Health App',
    description:
      "Doctor Riya AI, daily CBT tools, journeys, and mood tracking — all free. Upgrade to a coach-led programme when you're ready.",
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
    title: 'Doctor Riya AI',
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
  { label: 'Doctor Riya AI',          free: '✓ Free',   coach: '✓ Included' },
  { label: 'Self-paced journeys',     free: '✓ Free',   coach: '✓ Included' },
  { label: 'CBT toolkit & journal',   free: '✓ Free',   coach: '✓ Included' },
  { label: 'Assessments',             free: '✓ Free',   coach: '✓ Included' },
  { label: 'Structured 90-day path',  free: '—',         coach: '✓ Day-by-day CBT plan' },
  { label: 'Weekly therapist session',free: '—',         coach: '✓ 12 sessions included' },
  { label: 'Coach progress reviews',  free: '—',         coach: '✓ Pre-session notes' },
  { label: 'Clinical progress report',free: '—',         coach: '✓ Full 90-day report' },
]

const appScreens: {
  label: string
  sublabel: string
  bg: string
  badge: string
  badgeColor: string
  src: string
  alt: string
}[] = [
  {
    label: 'Home',
    sublabel: 'Everything starts here',
    bg: 'from-[#FFF4EC] to-[#FFE8D6]',
    badge: 'FREE',
    badgeColor: 'bg-[#FEF3C7] text-[#92400E]',
    src: '/app-screenshots/screen_home.png',
    alt: 'MindTalk home screen showing mood check-in and Doctor Riya ask bar',
  },
  {
    label: 'Journeys',
    sublabel: 'Free self-paced · Coach-led paid',
    bg: 'from-[#FFF1E8] to-[#FFE4D0]',
    badge: 'FREE + PAID',
    badgeColor: 'bg-[#FFF4EC] text-[#C9531A]',
    src: '/app-screenshots/screen_journey_path.png',
    alt: 'MindTalk journey path — Duolingo-style milestones for 90-day programme',
  },
  {
    label: 'Doctor Riya AI',
    sublabel: 'Free · Always on · CBT-grounded',
    bg: 'from-[#FEF9F0] to-[#FDF3E3]',
    badge: 'FREE FOREVER',
    badgeColor: 'bg-[#FEF3C7] text-[#92400E]',
    src: '/app-screenshots/screen_doctor_riya_chat.png',
    alt: 'Doctor Riya AI chat screen showing supportive conversation',
  },
  {
    label: 'CBT Journal',
    sublabel: 'Daily prompts · Mood streaks',
    bg: 'from-[#F9F5FF] to-[#F1EBFF]',
    badge: 'FREE',
    badgeColor: 'bg-[#FEF3C7] text-[#92400E]',
    src: '/app-screenshots/screen_journal_home.png',
    alt: 'MindTalk journal screen showing Free Flow and guided reflection',
  },
  {
    label: 'Progress',
    sublabel: 'Mood trends · Weekly insights',
    bg: 'from-[#F0FDF4] to-[#DCFCE7]',
    badge: 'FREE',
    badgeColor: 'bg-[#FEF3C7] text-[#92400E]',
    src: '/app-screenshots/screen_mood_report.png',
    alt: 'MindTalk mood report showing 30-day trends and top feelings',
  },
  {
    label: 'Self-Care',
    sublabel: 'Audio · Breathing · Quick relief',
    bg: 'from-[#FFF8F0] to-[#FEF3E8]',
    badge: 'FREE',
    badgeColor: 'bg-[#FEF3C7] text-[#92400E]',
    src: '/app-screenshots/screen_quick_relief.png',
    alt: 'MindTalk quick relief screen showing audio and visualisation sessions',
  },
]

const pillars: {
  title: string
  copy: string
  bullets: string[]
  badge: 'free' | 'paid' | 'mixed'
  badgeText?: string
  screenshot: string
  alt: string
  showDisclaimer?: boolean
}[] = [
  {
    title: 'Doctor Riya AI — your free 24/7 companion',
    copy: 'A real CBT-grounded AI agent that knows your journey. Not a chatbot — an actual companion.',
    bullets: [
      'Available 24/7, no wait, no appointment',
      'CBT-grounded conversation, not generic LLM chat',
      'Tracks your mood and surfaces the right tool at the right moment',
      'Free forever — no payment, no expiry',
    ],
    badge: 'free',
    badgeText: 'FREE · ALWAYS',
    screenshot: '/app-screenshots/screen_doctor_riya_chat.png',
    alt: 'Doctor Riya AI chat showing supportive CBT conversation',
    showDisclaimer: true,
  },
  {
    title: 'Journeys — free or coach-led',
    copy: 'All journeys are available. Start free and self-paced; upgrade to coach-led when you want a real Cadabams therapist guiding you.',
    bullets: [
      'FREE — self-paced journeys, all topics, no time limit',
      'PAID — Anxiety / Depression / Burnout / Relationships, structured 90-day with weekly therapist',
      'Daily CBT micro-tasks with progress tracking',
      'Doctor Riya AI weaves into both paths',
    ],
    badge: 'mixed',
    screenshot: '/app-screenshots/screen_journey_path.png',
    alt: 'MindTalk journeys screen showing recovery programmes',
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
    screenshot: '/app-screenshots/screen_quick_relief.png',
    alt: 'MindTalk quick relief screen with audio and visualisation sessions',
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
    screenshot: '/app-screenshots/screen_find_therapist.png',
    alt: 'Find your therapist screen with filter chips and 69 specialists',
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
    screenshot: '/app-screenshots/screen_journal_home.png',
    alt: 'MindTalk journal screen with Free Flow and guided reflection',
  },
]

export default function AppPage() {
  return (
    <>
      <MinimalNav />
      <main>
        {/* ─── HERO — light cream + animated aurora blobs ───────────────── */}
        <section className="relative overflow-hidden bg-[#FAF7F4] pt-24 pb-20 min-h-[88vh] flex items-center">
          {/* Blob 1 — orange aurora, top right */}
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 animate-blob-1 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #F97316 0%, #FF9466 40%, transparent 70%)' }}
          />
          {/* Blob 2 — peach aurora, bottom left */}
          <div
            aria-hidden
            className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20 animate-blob-2 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #FFB347 0%, #FFCBA4 50%, transparent 70%)' }}
          />
          {/* Blob 3 — soft pink, center-ish */}
          <div
            aria-hidden
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-20 animate-blob-3 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #FCD6C0 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#ECE6DE] text-[11px] font-bold tracking-widest text-[#6B5E4E] mb-8 shadow-sm">
              FREE TO DOWNLOAD · BY CADABAMS GROUP
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#0E1726] leading-[0.95] tracking-tight mb-6 text-balance">
              Your mental health<br />
              support is{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(120deg, #F77268 0%, #FF9466 45%, #F97316 100%)' }}
              >
                free.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#4A3F35] max-w-2xl mx-auto mb-8 leading-relaxed">
              Doctor Riya AI, daily CBT tools, guided journeys, and mood tracking — completely free.
              Upgrade to a coach-led programme when you&apos;re ready.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {featurePills.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 rounded-full bg-white border border-[#ECE6DE] text-sm font-medium text-[#0E1726] shadow-sm"
                >
                  ✓ {p}
                </span>
              ))}
            </div>
            <DownloadButtons theme="light" className="justify-center" />
            <p className="text-xs text-[#9C8A7A] mt-5">
              iOS &amp; Android · Backed by Cadabams Group · 30+ years · NABH Accredited
            </p>
          </div>
        </section>

        {/* ─── APP SCREEN STRIP — horizontal scroll ─────────────────────── */}
        <section className="py-16 bg-[#FAF7F4] overflow-hidden border-t border-[#ECE6DE]">
          <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
            <p className="text-xs font-bold tracking-widest text-[#E8620A] uppercase mb-3">
              Everything in one app
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E1726] tracking-tight">
              See what&apos;s inside.
            </h2>
          </div>

          <div
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 pb-6 scrollbar-hide"
            style={{ scrollPaddingLeft: '24px' }}
          >
            {appScreens.map((s) => (
              <div
                key={s.label}
                className={`snap-start shrink-0 w-[260px] rounded-3xl bg-gradient-to-br ${s.bg} p-4 border border-white/70 shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0">
                    <p className="font-bold text-[#0E1726] text-sm leading-tight">{s.label}</p>
                    <p className="text-xs text-[#9AA0AB] mt-0.5">{s.sublabel}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={1206}
                    height={2622}
                    quality={95}
                    sizes="260px"
                    className="w-full h-[380px] object-cover object-top"
                  />
                </div>
              </div>
            ))}
            <div className="shrink-0 w-6" aria-hidden />
          </div>

          <p className="text-center text-xs text-[#9AA0AB] mt-4 tracking-wide">Scroll to explore →</p>
        </section>

        {/* ─── DOCTOR RIYA — HERO FEATURE (light) ──────────────────────── */}
        <section className="bg-white py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-12 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0)_70%)] pointer-events-none" />
              <div className="relative mx-auto max-w-[280px]">
                <Image
                  src="/app-screenshots/screen_doctor_riya_chat.png"
                  alt="Doctor Riya AI chat in MindTalk app"
                  width={1206}
                  height={2622}
                  quality={95}
                  sizes="(max-width: 1024px) 280px, 560px"
                  className="rounded-[44px] shadow-2xl"
                />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center rounded-full bg-[#F1EBFF] text-[#6C5CE7] px-3 py-1 text-[11px] font-bold tracking-wider mb-5">
                DOCTOR RIYA AI · FREE
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0E1726] mb-5 text-balance">
                An AI that actually<br />understands you.
              </h2>
              <p className="text-lg text-[#4A5260] leading-relaxed mb-8 max-w-xl">
                Doctor Riya is MindTalk&apos;s AI mental health companion — built on CBT protocols, free
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
                  <div key={t} className="rounded-2xl border border-[#ECE6DE] bg-[#FAF7F4] p-4">
                    <div className="font-semibold text-sm text-[#0E1726] mb-1">{t}</div>
                    <div className="text-xs text-[#6B5E4E] leading-relaxed">{c}</div>
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
                  Chat with Doctor Riya →
                </a>
              </div>
              <AIDisclaimer variant="inline" />
            </div>
          </div>
        </section>

        {/* ─── EVERYTHING FREE — FEATURES GRID ─────────────────────────── */}
        <section className="bg-[#FAF7F4] py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <div className="text-xs font-bold tracking-wider text-[#E8620A] mb-3">
              WHAT&apos;S FREE
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
                <div className="flex items-start gap-2 mb-2">
                  <h3 className="text-lg font-bold text-[#0E1726] leading-snug">{f.title}</h3>
                  <span className="shrink-0 mt-0.5">
                    <FreeBadge />
                  </span>
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

        {/* ─── COACH-LED COMPARISON (light) ────────────────────────────── */}
        <section className="bg-white py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-wider text-[#E8620A] mb-3">
                WHEN YOU&apos;RE READY TO GO FURTHER
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0E1726] mb-4 text-balance">
                Add a coach. Transform the journey.
              </h2>
              <p className="text-lg text-[#4A5260] max-w-2xl mx-auto">
                The free app gives you tools. The coach-led programme gives you a structured 90-day
                recovery — with a real Cadabams therapist guiding every step.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Comparison */}
              <div className="rounded-3xl border border-[#ECE6DE] bg-[#FAF7F4] p-6 sm:p-8">
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-3 text-sm">
                  <div className="font-bold text-[#6B5E4E] text-xs uppercase tracking-wider">Feature</div>
                  <div className="font-bold text-[#0E1726] text-xs uppercase tracking-wider text-right">Free App</div>
                  <div className="font-bold bg-gradient-to-r from-[#F77268] to-[#F97316] bg-clip-text text-transparent text-xs uppercase tracking-wider text-right">Coach-Led</div>
                  {upgradeRows.map((r) => (
                    <div key={r.label} className="contents">
                      <div className="text-[#0E1726] py-2 border-t border-[#ECE6DE]">{r.label}</div>
                      <div className="text-right py-2 border-t border-[#ECE6DE] text-[#6B5E4E] tabular-nums">{r.free}</div>
                      <div className="text-right py-2 border-t border-[#ECE6DE] text-[#C9531A] tabular-nums">{r.coach}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Pricing card — keep gradient */}
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

        {/* ─── 5 PILLARS — centred, alternating cream/white ────────────── */}
        {pillars.map((p, i) => (
          <section
            key={p.title}
            className={`${i % 2 === 0 ? 'bg-[#FAF7F4]' : 'bg-white'} py-20`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto text-center mb-10">
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
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
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0E1726] mb-4 text-balance">
                  {p.title}
                </h2>
                <p className="text-[#4A5260] text-lg leading-relaxed">{p.copy}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
                {p.bullets.map((b) => (
                  <div key={b} className="flex gap-2 items-start">
                    <span className="text-[#F97316] font-bold mt-0.5" aria-hidden>✓</span>
                    <span className="text-sm text-[#4A3F35] leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mb-10">
                <a
                  href={DOWNLOAD_URL}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-12 px-7 text-sm hover:scale-[1.02] transition-all"
                >
                  Download Free →
                </a>
              </div>

              <div className="max-w-sm mx-auto rounded-3xl overflow-hidden shadow-xl border border-[#ECE6DE] bg-white">
                <Image
                  src={p.screenshot}
                  alt={p.alt}
                  width={1206}
                  height={2622}
                  quality={95}
                  sizes="384px"
                  className="w-full h-auto"
                />
              </div>

              {p.showDisclaimer && (
                <p className="text-center text-xs text-[#9C8A7A] mt-6 max-w-lg mx-auto leading-relaxed">
                  Doctor Riya AI provides CBT-based psychoeducation and support tools. She is not a
                  licensed therapist and does not provide clinical diagnoses. For crisis support,
                  call iCall: 9152987821.
                </p>
              )}
            </div>
          </section>
        ))}

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
                  <li>Chat with Doctor Riya AI</li>
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
              MindTalk is built by Cadabams — India&apos;s largest private mental health organisation,
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

        {/* ─── FINAL CTA — kept dark as intentional end-cap ───────────── */}
        <section className="relative overflow-hidden bg-[#0E1726] text-white py-24 sm:py-32">
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5 text-balance">
              Free to start.<br />
              <span className="bg-gradient-to-r from-[#F77268] to-[#F97316] bg-clip-text text-transparent">
                Life-changing to finish.
              </span>
            </h2>
            <p className="text-lg text-[#9AA0AB] mb-8 max-w-xl mx-auto">
              Download the app. Chat with Doctor Riya. Start your journey today.
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
