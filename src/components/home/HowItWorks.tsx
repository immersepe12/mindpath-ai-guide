import { Search, Play, Users } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Understand",
    description: "Quick assessments to spot patterns",
    gradient: "from-primary to-mindtalk-orange-light",
  },
  {
    icon: Play,
    title: "Act",
    description: "3-4 min micro-tasks daily",
    gradient: "from-accent to-mindtalk-green-light",
  },
  {
    icon: Users,
    title: "Support",
    description: "Community + professional help",
    gradient: "from-mindtalk-blue to-mindtalk-purple",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            How MindTalk Helps
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            A simple path from confusion to clarity
          </p>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 max-w-4xl md:mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[75vw] sm:w-[280px] md:w-auto snap-center"
            >
              <div className="flex flex-col items-center text-center bg-card rounded-2xl p-5 md:p-6 border border-border h-full">
                <div className="relative mb-3">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold text-foreground">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
