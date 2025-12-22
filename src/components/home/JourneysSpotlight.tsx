import { ClipboardCheck, FileText, Headphones, Sparkles, ChevronRight } from "lucide-react";

const journeySteps = [
  {
    icon: ClipboardCheck,
    title: "Quick Check-in",
    time: "2 min",
    description: "Daily mood & assessment",
  },
  {
    icon: FileText,
    title: "Reflection Task",
    time: "3 min",
    description: "Guided worksheet or prompt",
  },
  {
    icon: Headphones,
    title: "Audio/Video Tool",
    time: "3 min",
    description: "Breathwork or lesson",
  },
  {
    icon: Sparkles,
    title: "AI Summary",
    time: "1 min",
    description: "Daily + weekly insights",
  },
];

const availableJourneys = [
  "Anxiety",
  "Low Mood",
  "Academic Stress",
  "Emotional Regulation",
  "Motivation",
  "Sleep Support",
];

const JourneysSpotlight = () => {
  return (
    <section id="journeys" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            ⭐ Featured
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Journeys that Turn Overwhelm into Daily Progress
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Issue-based 30-day recovery journeys with Duolingo-style micro tasks. Everything takes ~3–4 minutes, making it easy to stay consistent.
          </p>
        </div>

        {/* What a Day Looks Like */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            What a Day Looks Like
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {journeySteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-card rounded-2xl p-5 shadow-sm border border-border hover:border-primary/30 transition-colors w-full md:w-48">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-primary font-medium mb-1">{step.time}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < journeySteps.length - 1 && (
                  <ChevronRight className="hidden md:block w-6 h-6 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Journeys */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-muted-foreground mb-4">
            Journeys Available
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {availableJourneys.map((journey, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-default"
              >
                {journey}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              + More coming
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneysSpotlight;
