'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface StickyMobileCTAProps {
  ctaText: string
  ctaUrl: string
}

export default function StickyMobileCTA({ ctaText, ctaUrl }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 px-4 py-3 shadow-lg">
      <Button size="hero" className="w-full" asChild>
        <Link href={ctaUrl}>{ctaText}</Link>
      </Button>
    </div>
  )
}
