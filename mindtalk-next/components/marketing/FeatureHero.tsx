import Image from 'next/image'
import type { ReactNode } from 'react'

interface FeatureHeroProps {
  overline: string
  /** Whether the overline pill should use the orange/free or peach/paid styling */
  overlineTone?: 'free' | 'paid' | 'neutral'
  headline: string
  subhead: string
  primaryScreenshot: string
  secondaryScreenshot?: string
  badges?: ReactNode
  background?: 'cream' | 'dark'
  decoration?: ReactNode
}

/**
 * Shared hero for the feature pages. Two-column layout with primary/secondary
 * phone screenshots on the right (or behind), headline + subhead on the left.
 */
export default function FeatureHero({
  overline,
  overlineTone = 'free',
  headline,
  subhead,
  primaryScreenshot,
  secondaryScreenshot,
  badges,
  background = 'cream',
  decoration,
}: FeatureHeroProps) {
  const isDark = background === 'dark'
  const sectionBg = isDark ? 'bg-[#1C2433] text-white' : 'bg-[#FAF7F4] text-[#0E1726]'
  const overlineCls =
    overlineTone === 'paid'
      ? 'bg-[#FFE9D9] text-[#C9531A]'
      : overlineTone === 'neutral'
        ? 'bg-white border border-[#ECE6DE] text-[#4A5260]'
        : 'bg-[#F97316]/10 text-[#F97316]'
  const subheadCls = isDark ? 'text-[#9AA0AB]' : 'text-[#4A5260]'

  return (
    <section className={`relative overflow-hidden ${sectionBg} pt-16 sm:pt-24 pb-20`}>
      {decoration}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div>
          <div className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-wider mb-5 ${overlineCls}`}>
            {overline}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5 text-balance">
            {headline}
          </h1>
          <p className={`text-lg leading-relaxed mb-8 max-w-xl ${subheadCls}`}>
            {subhead}
          </p>
          {badges}
        </div>
        <div className="relative h-[500px] hidden md:block">
          {secondaryScreenshot && (
            <div className="absolute -left-2 top-12 w-[60%] -rotate-6 z-0">
              <Image
                src={secondaryScreenshot}
                alt=""
                width={1206}
                height={2622}
                quality={95}
                sizes="320px"
                className="rounded-[36px] shadow-2xl opacity-90"
              />
            </div>
          )}
          <div className="absolute right-0 top-0 w-[68%] z-10">
            <Image
              src={primaryScreenshot}
              alt={headline}
              width={1206}
              height={2622}
              quality={95}
              sizes="(max-width: 1024px) 360px, 400px"
              className="rounded-[44px] shadow-2xl"
              priority
            />
          </div>
        </div>
        {/* Mobile screenshot */}
        <div className="md:hidden flex justify-center">
          <Image
            src={primaryScreenshot}
            alt={headline}
            width={1206}
            height={2622}
            quality={95}
            sizes="260px"
            className="rounded-[36px] shadow-xl max-w-[260px] w-full"
          />
        </div>
      </div>
    </section>
  )
}
