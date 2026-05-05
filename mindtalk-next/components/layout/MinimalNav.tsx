'use client'
import { useState } from 'react'
import Link from 'next/link'
import { DOWNLOAD_URL, WEB_APP_URL } from '@/components/marketing/DownloadButtons'

const FEATURE_LINKS: { label: string; href: string; meta?: string; tone?: 'free' | 'paid' | 'mixed' }[] = [
  { label: 'Doctor Riya AI',     href: '/features/doctor-riya', meta: 'Free 24/7 AI companion',         tone: 'free' },
  { label: 'Journeys',           href: '/features/journeys',    meta: 'Free + coach-led',                tone: 'mixed' },
  { label: 'Self-Care Toolkit',  href: '/features/self-care',   meta: 'Breathing, journal, audio',       tone: 'free' },
  { label: 'Therapy',            href: '/features/therapy',     meta: 'Coach-led · ₹7,799',              tone: 'paid' },
  { label: 'Progress & Reports', href: '/features/progress',    meta: 'Mood + clinical reports',         tone: 'mixed' },
]

export default function MinimalNav() {
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="relative bg-white border-b border-gray-100 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#E8521A]">MindTalk</span>
          <span className="text-xs text-gray-400 font-normal mt-0.5 hidden sm:inline">by Cadabams</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* The App dropdown — desktop only */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              onBlur={() => setTimeout(() => setOpen(false), 120)}
              className="text-sm font-medium text-[#4A5260] hover:text-[#E8521A] transition-colors"
              aria-expanded={open}
              aria-haspopup="true"
            >
              The App ▾
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-gray-100 shadow-xl py-2 z-50">
                <Link
                  href="/app"
                  className="block px-4 py-2.5 hover:bg-[#FAF7F4]"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="text-sm font-bold text-[#0E1726]">Overview</div>
                  <div className="text-xs text-[#6B7280]">All features in one page</div>
                </Link>
                <div className="my-1 h-px bg-gray-100" />
                {FEATURE_LINKS.map((f) => (
                  <Link
                    key={f.href}
                    href={f.href}
                    className="block px-4 py-2.5 hover:bg-[#FAF7F4]"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#0E1726]">{f.label}</span>
                      {f.tone === 'free' && (
                        <span className="inline-flex items-center rounded-full bg-[#E6F4EA] text-[#1F8B4C] text-[10px] font-bold tracking-wider px-1.5 py-0.5">
                          FREE
                        </span>
                      )}
                      {f.tone === 'paid' && (
                        <span className="inline-flex items-center rounded-full bg-[#FFE9D9] text-[#C9531A] text-[10px] font-bold tracking-wider px-1.5 py-0.5">
                          COACH-LED
                        </span>
                      )}
                    </div>
                    {f.meta && <div className="text-xs text-[#6B7280] mt-0.5">{f.meta}</div>}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href={WEB_APP_URL}
            className="hidden sm:inline text-sm text-[#4A5260] hover:text-[#E8521A] transition-colors"
          >
            Log in
          </a>

          <a
            href={DOWNLOAD_URL}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#F77268] to-[#F97316] text-white font-semibold h-9 px-4 text-sm hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(249,115,22,0.28)] transition-all"
          >
            Download Free
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#0E1726] hover:bg-[#FAF7F4] transition-colors"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6L18 18M6 18L18 6" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-14 left-0 right-0 bg-white border-b border-gray-100 shadow-xl z-40 max-h-[calc(100vh-3.5rem)] overflow-y-auto"
        >
          <div className="px-4 py-3">
            <p className="text-[11px] font-bold tracking-widest text-[#9C8A7A] uppercase mb-2 px-1">The App</p>
            <Link
              href="/app"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-xl hover:bg-[#FAF7F4]"
            >
              <div className="text-sm font-bold text-[#0E1726]">Overview</div>
              <div className="text-xs text-[#6B7280]">All features in one page</div>
            </Link>
            {FEATURE_LINKS.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl hover:bg-[#FAF7F4]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0E1726]">{f.label}</span>
                  {f.tone === 'free' && (
                    <span className="inline-flex items-center rounded-full bg-[#E6F4EA] text-[#1F8B4C] text-[10px] font-bold tracking-wider px-1.5 py-0.5">
                      FREE
                    </span>
                  )}
                  {f.tone === 'paid' && (
                    <span className="inline-flex items-center rounded-full bg-[#FFE9D9] text-[#C9531A] text-[10px] font-bold tracking-wider px-1.5 py-0.5">
                      COACH-LED
                    </span>
                  )}
                </div>
                {f.meta && <div className="text-xs text-[#6B7280] mt-0.5">{f.meta}</div>}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-100 px-4 py-3 space-y-1">
            <a
              href={WEB_APP_URL}
              className="block px-3 py-2.5 rounded-xl text-sm text-[#0E1726] hover:bg-[#FAF7F4]"
            >
              Log in
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
