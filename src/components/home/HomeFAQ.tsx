import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is MindTalk a replacement for therapy?",
    answer: "No, MindTalk is designed to complement professional mental healthcare, not replace it. It provides tools, resources, and structured support that can help you between therapy sessions or while you're waiting to connect with a professional. If you're experiencing severe symptoms, we recommend seeking professional help.",
  },
  {
    question: "How long are daily tasks?",
    answer: "Most daily tasks take 3-4 minutes to complete. We've designed them to be quick and actionable so you can stay consistent even on busy days. The key is regular, small steps rather than occasional big efforts.",
  },
  {
    question: "What are journeys?",
    answer: "Journeys are 30-day structured programs focused on specific issues like anxiety, low mood, or stress. Each journey includes daily micro-tasks, check-ins, worksheets, audio/video tools, and AI-powered insights — all designed to help you make steady progress.",
  },
  {
    question: "How does the AI assistant work?",
    answer: "The AI assistant learns from your check-ins, completed tasks, and journey progress to provide personalized suggestions. It can recommend specific tools, help you identify patterns, and even help you prepare for therapy sessions. It's supportive and educational, not diagnostic.",
  },
  {
    question: "What if my assessment shows high concern?",
    answer: "If an assessment indicates you may need additional support, MindTalk will suggest connecting with a mental health professional. We provide resources and pathways to professional care within the app. Remember, assessments are screening tools — a professional evaluation is always recommended for diagnosis.",
  },
  {
    question: "Is my data private?",
    answer: "Yes, your privacy is our priority. All data is encrypted and stored securely. We never sell your personal information to third parties. You control what you share, and you can delete your data at any time.",
  },
  {
    question: "Can I use it without speaking to a counselor?",
    answer: "Absolutely. MindTalk offers a comprehensive self-help toolkit including assessments, journeys, breathwork, worksheets, articles, and more — all accessible without requiring counselor interaction. Professional support is available when and if you want it.",
  },
  {
    question: "What kinds of issues does it support?",
    answer: "MindTalk offers support for anxiety, low mood, stress, academic pressure, emotional regulation, motivation challenges, sleep difficulties, and more. Our library of tools and journeys continues to expand based on user needs.",
  },
];

const HomeFAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about MindTalk.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
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
