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
import WhatsAppFloating from '@/components/layout/WhatsAppFloating'
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
    title: fm.ogTitle,
    description: fm.metaDescription,
    openGraph: {
      title: fm.ogTitle,
      description: fm.ogDescription,
      url: 'https://cadabamsmindtalk.com/anxiety',
    },
  }
}

export default function AnxietyPage() {
  const fm = getMDXFrontmatter<VerticalFrontmatter>('verticals/anxiety.mdx')

  const structuredData = [
    faqSchema(fm.faqs),
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
      <MinimalNav />
      <main>
        <VerticalHero
          headline={fm.heroHeadline}
          subtext={fm.heroSubtext}
          ctaText={fm.ctaText}
          ctaUrl={fm.ctaUrl}
          vertical={fm.vertical}
        />
        <ProblemAgitation
          headline={fm.problemHeadline}
          problems={fm.problems}
          ctaText={fm.ctaText}
          ctaUrl={fm.ctaUrl}
        />
        <JourneyTimeline
          headline={fm.timelineHeadline}
          items={fm.timelineItems}
        />
        <WhatIsInside
          headline={fm.whatsIncludedHeadline}
          items={fm.included}
        />
        <TestimonialsSection />
        <PricingSection
          headline={fm.pricingHeadline}
          price={fm.price}
          priceNote={fm.priceNote}
          refundNote={fm.refundNote}
          ctaText={fm.ctaText}
          ctaUrl={fm.ctaUrl}
        />
        <FAQSection
          headline={fm.faqHeadline}
          faqs={fm.faqs}
        />
        <CTASection
          ctaText={fm.ctaText}
          ctaUrl={fm.ctaUrl}
        />
      </main>
      <Footer />
      <StickyMobileCTA ctaText={fm.stickyCtaText} ctaUrl={fm.ctaUrl} />
      <WhatsAppFloating message={fm.whatsappMessage} />
    </>
  )
}
