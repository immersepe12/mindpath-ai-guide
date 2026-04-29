'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQItem } from '@/lib/blog'

interface FAQAccordionProps {
  items: FAQItem[]
  /** Page title — used as a label in the FAQPage JSON-LD */
  pageName?: string
}

/**
 * Renders the visible accordion AND the FAQPage JSON-LD for this list of
 * questions/answers. Co-locating both means there's a single source of
 * truth — what the user sees and what Google indexes can never drift apart.
 */
export default function FAQAccordion({ items, pageName }: FAQAccordionProps) {
  if (!items || items.length === 0) return null

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: pageName,
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <section id="faq" className="mt-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="border-t border-gray-100">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 leading-relaxed">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}
