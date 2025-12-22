import { ClipboardCheck, FileText, Headphones, Sparkles } from "lucide-react";

const journeySteps = [
  { icon: ClipboardCheck, title: "Check-in", time: "2 min" },
  { icon: FileText, title: "Reflect", time: "3 min" },
  { icon: Headphones, title: "Audio", time: "3 min" },
  { icon: Sparkles, title: "AI Summary", time: "1 min" },
];

const availableJourneys = [
  "Anxiety", "Low Mood", "Stress", "Sleep", "Motivation", "Emotions"
];

const JourneysSpotlight = () => {
  return (
    <section id="journeys" className="py-10 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
            ⭐ Featured
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            30-Day Recovery Journeys
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Duolingo-style micro tasks. ~3–4 minutes daily.
          </p>
        </div>

        {/* Daily Steps - Horizontal Scroll */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground text-center mb-4">
            What a Day Looks Like
          </h3>
          
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:justify-center">
            {journeySteps.map((step, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-[100px] snap-center"
              >
                <div className="bg-card rounded-xl p-3 shadow-sm border border-border text-center h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-medium text-foreground text-xs mb-0.5">{step.title}</p>
                  <p className="text-[10px] text-primary font-medium">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Journeys - Horizontal Scroll */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground text-center mb-3">
            Available Journeys
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-hide -mx-4 px-4 md:justify-center md:flex-wrap">
            {availableJourneys.map((journey, index) => (
              <span
                key={index}
                className="flex-shrink-0 px-4 py-2 rounded-full bg-card border border-border text-xs font-medium text-foreground snap-center whitespace-nowrap"
              >
                {journey}
              </span>
            ))}
            <span className="flex-shrink-0 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary whitespace-nowrap">
              + More
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneysSpotlight;
