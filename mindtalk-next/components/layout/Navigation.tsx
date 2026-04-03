'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { trackCTAClick, trackNavClick } from '@/lib/analytics'

interface NavigationProps {
  ctaText: string
  ctaUrl: string
}

const NAV_LINKS = [
  { label: 'Anxiety', href: '/anxiety' },
  { label: 'Emotional Reset', href: '/emotional-reset' },
  { label: 'Relationships', href: '/relationships' },
  { label: 'Burnout', href: '/burnout' },
  { label: 'Our Psychologists', href: '/team' },
]

export default function Navigation({ ctaText, ctaUrl }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#E8521A]">MindTalk</span>
          <span className="hidden sm:block text-xs text-gray-400 font-normal mt-0.5">by Cadabams</span>
        </Link>
        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => trackNavClick(label, href)}
                className="hover:text-[#E8521A] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <Button
            size="sm"
            onClick={() => trackCTAClick(ctaText, 'navigation')}
            asChild
          >
            <Link href={ctaUrl}>{ctaText}</Link>
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-600 transition-transform ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => { trackNavClick(label, href); setMobileOpen(false) }}
                className="py-3 px-2 text-sm text-gray-700 hover:text-[#E8521A] hover:bg-gray-50 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
