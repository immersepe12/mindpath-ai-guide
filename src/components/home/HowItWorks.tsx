import { Search, Play, Users } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Understand",
    description: "Quick assessments + check-ins to spot patterns and understand what you're experiencing.",
    gradient: "from-primary to-mindtalk-orange-light",
  },
  {
    icon: Play,
    title: "Act",
    description: "Guided micro-tasks (3–4 minutes) inside structured journeys that build momentum day by day.",
    gradient: "from-accent to-mindtalk-green-light",
  },
  {
    icon: Users,
    title: "Get Support",
    description: "Community + counselor/psychologist support when you need guidance beyond self-help tools.",
    gradient: "from-mindtalk-blue to-mindtalk-purple",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How MindTalk Helps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple path from confusion to clarity — understand yourself, take action, and get support when needed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-0.5 bg-border" />
              )}

              <div className="flex flex-col items-center text-center">
                {/* Step Number */}
                <div className="relative mb-4">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-sm font-bold text-foreground">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
