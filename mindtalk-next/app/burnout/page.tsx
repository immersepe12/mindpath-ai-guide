import { getMDXFrontmatter } from '@/lib/mdx'
import WebViewBanner from '@/components/layout/WebViewBanner'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import VerticalHero from '@/components/sections/VerticalHero'
import ProblemAgitation from '@/components/sections/ProblemAgitation'
import JourneyTimeline from '@/components/sections/JourneyTimeline'
import WhatIsInside from '@/components/sections/WhatIsInside'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PricingSection from '@/components/sections/PricingSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import StickyMobileCTA from '@/components/layout/StickyMobileCTA'
import { faqSchema, medicalServiceSchema, productSchema, breadcrumbSchema } from '@/lib/structured-data'
import PageTracker from '@/components/PageTracker'
import ScrollDepthTracker from '@/components/ScrollDepthTracker'
import type { Metadata } from 'next'

interface VerticalFrontmatter {
  title: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  vertical: string
  heroHeadline: string
  heroSubtext: string
  ctaText: string
  ctaUrl: string
  problemHeadline: string
  problems: string[]
  timelineHeadline: string
  timelineItems: { phase: string; title: string; description: string }[]
  whatsIncludedHeadline: string
  included: string[]
  pricingHeadline: string
  price: string
  priceNote: string
  refundNote: string
  faqHeadline: string
  faqs: { q: string; a: string }[]
  stickyCtaText: string
  whatsappMessage: string
}

export async function generateMetadata(): Promise<Metadata> {
  const fm = getMDXFrontmatter<VerticalFrontmatter>('verticals/burnout.mdx')
  return {
    title: 'Burnout Recovery Programme Online India | CBT | MindTalk by Cadabams',
    description: fm.metaDescription,
    alternates: { canonical: 'https://cadabamsmindtalk.com/burnout' },
    openGraph: {
      title: fm.ogTitle,
      description: fm.ogDescription,
      url: 'https://cadabamsmindtalk.com/burnout',
      images: [{ url: 'https://cadabamsmindtalk.com/og/burnout.jpg', width: 1200, height: 630, alt: 'MindTalk Workplace Burnout Recovery Programme' }],
    },
    twitter: { card: 'summary_large_image' as const, images: ['https://cadabamsmindtalk.com/og/burnout.jpg'] },
  }
}

const TESTIMONIALS_LIVE = false

export default function BurnoutPage() {
  const fm = getMDXFrontmatter<VerticalFrontmatter>('verticals/burnout.mdx')

  const evidenceFaqs = [
    ...fm.faqs,
    { q: 'Is CBT effective for workplace burnout?', a: 'Yes. A systematic review in PLOS ONE (2020) found CBT-based interventions reduce burnout symptoms by 25–30% and improve emotional exhaustion scores significantly. MindTalk\'s 90-day programme delivers 12 structured CBT sessions with a licensed psychologist, specifically designed for occupational burnout recovery.' },
    { q: 'How much does burnout therapy cost online in India?', a: 'Individual therapy for burnout costs ₹1,500–₹3,000 per session in Indian metros. MindTalk\'s 90-day programme costs ₹7,799 for 12 sessions (₹650/session) plus daily exercises, AI journaling, and breathwork — structured specifically for workplace burnout recovery.' },
  ]

  const structuredData = [
    faqSchema(evidenceFaqs),
    medicalServiceSchema('Burnout', 'https://cadabamsmindtalk.com/burnout', 'MindTalk Workplace Burnout Recovery Programme', fm.heroSubtext),
    productSchema('MindTalk Burnout Recovery Programme', fm.heroSubtext, 'https://cadabamsmindtalk.com/burnout'),
    breadcrumbSchema([
      { name: 'Home', url: 'https://cadabamsmindtalk.com' },
      { name: 'Burnout Recovery', url: 'https://cadabamsmindtalk.com/burnout' },
    ]),
  ]

  return (
    <>
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PageTracker page="vertical" vertical={fm.vertical} />
      <ScrollDepthTracker page={fm.vertical} />
      <WebViewBanner />
      <MinimalNav />
      <main>
        <VerticalHero
          headline={fm.heroHeadline}
          subtext={fm.heroSubtext}
          ctaText={fm.ctaText}
          ctaUrl="#lead-form"
          vertical={fm.vertical}
        />
        <ProblemAgitation
          headline={fm.problemHeadline}
          problems={fm.problems}
          ctaText={fm.ctaText}
          ctaUrl="#lead-form"
        />
        <JourneyTimeline
          headline={fm.timelineHeadline}
          items={fm.timelineItems}
        />
        <WhatIsInside
          headline={fm.whatsIncludedHeadline}
          items={fm.included}
        />
        {TESTIMONIALS_LIVE && <TestimonialsSection />}
        <PricingSection
          headline={fm.pricingHeadline}
          price={fm.price}
          priceNote={fm.priceNote}
          refundNote={fm.refundNote}
          ctaText={fm.ctaText}
          ctaUrl="#lead-form"
        />
        <FAQSection
          headline={fm.faqHeadline}
          faqs={fm.faqs}
        />
        <CTASection
          ctaText={fm.ctaText}
          ctaUrl="#lead-form"
        />
      </main>
      <Footer />
      <StickyMobileCTA ctaText={fm.ctaText} />
            <p className="text-xs text-gray-400 mt-8 text-center pb-4">
        Clinically reviewed: March 2026 · Cadabams Group
      </p>
    </>
  )
}
