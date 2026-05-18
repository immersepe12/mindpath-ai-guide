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
  const fm = getMDXFrontmatter<VerticalFrontmatter>('verticals/anxiety.mdx')
  return {
    title: 'Online Therapy for Anxiety India | 90-Day CBT Programme | MindTalk',
    description: fm.metaDescription,
    alternates: { canonical: 'https://cadabamsmindtalk.com/anxiety' },
    openGraph: {
      title: fm.ogTitle,
      description: fm.ogDescription,
      url: 'https://cadabamsmindtalk.com/anxiety',
      images: [{ url: 'https://cadabamsmindtalk.com/og/anxiety.jpg', width: 1200, height: 630, alt: 'MindTalk Anxiety & Stress Relief Programme' }],
    },
    twitter: { card: 'summary_large_image' as const, images: ['https://cadabamsmindtalk.com/og/anxiety.jpg'] },
  }
}

const TESTIMONIALS_LIVE = false

export default function AnxietyPage() {
  const fm = getMDXFrontmatter<VerticalFrontmatter>('verticals/anxiety.mdx')

  const evidenceFaqs = [
    ...fm.faqs,
    { q: 'Is CBT effective for anxiety disorders?', a: 'Yes. A meta-analysis published in Cognitive Behaviour Therapy (2012) found CBT produces large effect sizes (d = 0.73–1.01) for generalised anxiety, panic disorder, and social anxiety. MindTalk delivers 12 structured CBT sessions over 90 days with a licensed psychologist.' },
    { q: 'How much does online therapy for anxiety cost in India?', a: 'Individual therapy sessions in India typically cost ₹1,500–₹3,000 per session. MindTalk\'s 90-day programme costs ₹7,799 for 12 sessions (₹650/session) plus daily exercises, AI journaling, and breathwork — significantly more affordable than traditional therapy.' },
  ]

  const structuredData = [
    faqSchema(evidenceFaqs),
    medicalServiceSchema('Anxiety disorder', 'https://cadabamsmindtalk.com/anxiety', 'MindTalk Anxiety & Stress Relief Programme', fm.heroSubtext),
    productSchema('MindTalk Anxiety Recovery Programme', fm.heroSubtext, 'https://cadabamsmindtalk.com/anxiety'),
    breadcrumbSchema([
      { name: 'Home', url: 'https://cadabamsmindtalk.com' },
      { name: 'Anxiety & Stress Relief', url: 'https://cadabamsmindtalk.com/anxiety' },
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
