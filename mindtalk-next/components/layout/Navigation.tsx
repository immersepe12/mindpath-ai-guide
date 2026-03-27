'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { trackCTAClick, trackNavClick } from '@/lib/analytics'

interface NavigationProps {
  ctaText: string
  ctaUrl: string
}

export default function Navigation({ ctaText, ctaUrl }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#E8521A]">MindTalk</span>
          <span className="hidden sm:block text-xs text-gray-400 font-normal mt-0.5">by Cadabams</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/anxiety" onClick={() => trackNavClick('Anxiety', '/anxiety')} className="hover:text-[#E8521A] transition-colors">Anxiety</Link>
            <Link href="/emotional-reset" onClick={() => trackNavClick('Emotional Reset', '/emotional-reset')} className="hover:text-[#E8521A] transition-colors">Emotional Reset</Link>
            <Link href="/relationships" onClick={() => trackNavClick('Relationships', '/relationships')} className="hover:text-[#E8521A] transition-colors">Relationships</Link>
            <Link href="/burnout" onClick={() => trackNavClick('Burnout', '/burnout')} className="hover:text-[#E8521A] transition-colors">Burnout</Link>
          </div>
          <Button
            size="sm"
            onClick={() => trackCTAClick(ctaText, 'navigation')}
            asChild
          >
            <Link href={ctaUrl}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
