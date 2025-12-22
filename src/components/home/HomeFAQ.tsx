import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this a replacement for therapy?",
    answer: "No, MindTalk complements professional care. It helps between sessions or while waiting to connect with a professional.",
  },
  {
    question: "How long are daily tasks?",
    answer: "3-4 minutes. Quick, actionable steps you can do even on busy days.",
  },
  {
    question: "What are journeys?",
    answer: "30-day programs with daily micro-tasks, check-ins, and AI insights for issues like anxiety, stress, or low mood.",
  },
  {
    question: "How does the AI work?",
    answer: "It learns from your check-ins and progress to suggest personalized next steps and help prepare for therapy.",
  },
  {
    question: "Is my data private?",
    answer: "Yes. Encrypted, never sold, and you control what you share.",
  },
  {
    question: "Can I use it without a counselor?",
    answer: "Absolutely. Full self-help toolkit available. Professional support is optional.",
  },
];

const HomeFAQ = () => {
  return (
    <section id="faq" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            FAQ
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border px-4 data-[state=open]:shadow-sm transition-shadow"
              >
                <AccordionTrigger className="text-left text-sm text-foreground hover:no-underline py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
