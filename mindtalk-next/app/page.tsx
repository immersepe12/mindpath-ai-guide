import { getMDXFrontmatter } from '@/lib/mdx'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import TrustStrip from '@/components/sections/TrustStrip'
import ProblemAgitation from '@/components/sections/ProblemAgitation'
import JourneyCards from '@/components/sections/JourneyCards'
import HowItWorks from '@/components/sections/HowItWorks'
import WhatIsInside from '@/components/sections/WhatIsInside'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import PricingSection from '@/components/sections/PricingSection'
import FAQSection from '@/components/sections/FAQSection'
import FinalCTA from '@/components/sections/FinalCTA'
import { faqSchema, productSchema, breadcrumbSchema } from '@/lib/structured-data'
import PageTracker from '@/components/PageTracker'
import ScrollDepthTracker from '@/components/ScrollDepthTracker'
import type { Metadata } from 'next'

interface HomeFrontmatter {
  title: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  heroHeadline: string
  heroSubtext: string
  primaryCta: string
  primaryCtaUrl: string
  trustLine: string
  problemHeadline: string
  problems: string[]
  howItWorksHeadline: string
  steps: { title: string; description: string }[]
  whatInsideHeadline: string
  insideItems: string[]
  comparisonHeadline: string
  pricingHeadline: string
  price: string
  priceNote: string
  refundNote: string
  faqHeadline: string
  faqs: { q: string; a: string }[]
  finalCtaHeadline: string
  finalCtaSubtext: string
  finalCta: string
  finalCtaUrl: string
}

export async function generateMetadata(): Promise<Metadata> {
  const fm = getMDXFrontmatter<HomeFrontmatter>('home.mdx')
  return {
    title: fm.ogTitle,
    description: fm.metaDescription,
    openGraph: {
      title: fm.ogTitle,
      description: fm.ogDescription,
      url: 'https://cadabamsmindtalk.com',
    },
  }
}

export default function HomePage() {
  const fm = getMDXFrontmatter<HomeFrontmatter>('home.mdx')

  const faqs = fm.faqs
  const structuredData = [
    faqSchema(faqs),
    productSchema(
      'MindTalk 90-Day Mental Health Recovery Programme',
      'A structured 90-day CBT recovery journey with a licensed psychologist. 12 sessions, daily exercises, breathwork and journaling.',
      'https://cadabamsmindtalk.com'
    ),
    breadcrumbSchema([
      { name: 'Home', url: 'https://cadabamsmindtalk.com' },
    ]),
  ]

  return (
    <>
      <PageTracker page="homepage" />
      <ScrollDepthTracker page="homepage" />
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navigation ctaText={fm.primaryCta} ctaUrl={fm.primaryCtaUrl} />
      <main>
        <HeroSection
          headline={fm.heroHeadline}
          subtext={fm.heroSubtext}
          ctaText={fm.primaryCta}
          ctaUrl={fm.primaryCtaUrl}
        />
        <TrustStrip trustLine={fm.trustLine} />
        <ProblemAgitation
          headline={fm.problemHeadline}
          problems={fm.problems}
          ctaText={fm.primaryCta}
          ctaUrl={fm.primaryCtaUrl}
        />
        <JourneyCards />
        <HowItWorks
          headline={fm.howItWorksHeadline}
          steps={fm.steps}
        />
        <WhatIsInside
          headline={fm.whatInsideHeadline}
          items={fm.insideItems}
        />
        <TestimonialsSection />
        <ComparisonSection headline={fm.comparisonHeadline} />
        <PricingSection
          headline={fm.pricingHeadline}
          price={fm.price}
          priceNote={fm.priceNote}
          refundNote={fm.refundNote}
          ctaText={fm.primaryCta}
          ctaUrl={fm.primaryCtaUrl}
        />
        <FAQSection
          headline={fm.faqHeadline}
          faqs={fm.faqs}
        />
        <FinalCTA
          headline={fm.finalCtaHeadline}
          subtext={fm.finalCtaSubtext}
          ctaText={fm.finalCta}
          ctaUrl={fm.finalCtaUrl}
        />
      </main>
      <Footer />
    </>
  )
}
