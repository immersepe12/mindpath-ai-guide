import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

interface FAQSectionProps {
  headline: string
  faqs: { q: string; a: string }[]
}

export default function FAQSection({ headline, faqs }: FAQSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FDF8F4]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          {headline}
        </h2>
        <Accordion type="single" collapsible className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6">
          {faqs.map(({ q, a }, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
