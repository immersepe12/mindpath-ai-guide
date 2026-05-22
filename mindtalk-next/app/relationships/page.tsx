import { getMDXFrontmatter } from '@/lib/mdx'
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
  const fm = getMDXFrontmatter<VerticalFrontmatter>('verticals/relationships.mdx')
  return {
    title: 'Online Relationship Therapy India | CBT for Breakups & Conflict | MindTalk',
    description: fm.metaDescription,
    alternates: { canonical: 'https://cadabamsmindtalk.com/relationships' },
    openGraph: {
      title: fm.ogTitle,
      description: fm.ogDescription,
      url: 'https://cadabamsmindtalk.com/relationships',
      images: [{ url: 'https://cadabamsmindtalk.com/og/relationships.jpg', width: 1200, height: 630, alt: 'MindTalk Relationship Recovery Programme' }],
    },
    twitter: { card: 'summary_large_image' as const, images: ['https://cadabamsmindtalk.com/og/relationships.jpg'] },
  }
}

const TESTIMONIALS_LIVE = false

export default function RelationshipsPage() {
  const fm = getMDXFrontmatter<VerticalFrontmatter>('verticals/relationships.mdx')

  const evidenceFaqs = [
    ...fm.faqs,
    { q: 'Can CBT help with relationship issues and breakups?', a: 'Yes. CBT is effective for relationship distress by addressing cognitive distortions (catastrophising, mind-reading) and building communication skills. Research in the Journal of Consulting and Clinical Psychology shows CBT-based interventions improve relationship satisfaction by 40–50%. MindTalk pairs you with a psychologist trained in relational CBT.' },
    { q: 'How much does relationship therapy cost online in India?', a: 'Couples or individual relationship therapy typically costs ₹2,000–₹4,000 per session in India. MindTalk\'s 90-day programme costs ₹7,799 for 12 sessions (₹650/session) plus daily exercises, AI journaling, and breathwork — a structured, affordable alternative to traditional therapy.' },
  ]

  const structuredData = [
    faqSchema(evidenceFaqs),
    medicalServiceSchema('Relationship issues', 'https://cadabamsmindtalk.com/relationships', 'MindTalk Relationship Recovery Programme', fm.heroSubtext),
    productSchema('MindTalk Relationship Recovery Programme', fm.heroSubtext, 'https://cadabamsmindtalk.com/relationships'),
    breadcrumbSchema([
      { name: 'Home', url: 'https://cadabamsmindtalk.com' },
      { name: 'Relationship Recovery', url: 'https://cadabamsmindtalk.com/relationships' },
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
      <StickyMobileCTA vertical={fm.vertical} />
            <p className="text-xs text-gray-400 mt-8 text-center pb-4">
        Clinically reviewed: March 2026 · Cadabams Group
      </p>
    </>
  )
}
