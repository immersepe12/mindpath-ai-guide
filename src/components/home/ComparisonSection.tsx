import { Check, X } from "lucide-react";

const comparisons = [
  { typical: "Scattered tools", mindtalk: "Structured 30-day journeys" },
  { typical: "Generic advice", mindtalk: "Personalized guidance" },
  { typical: "No continuity", mindtalk: "Daily + weekly summaries" },
  { typical: "Limited support", mindtalk: "Community + professionals" },
];

const ComparisonSection = () => {
  return (
    <section className="py-10 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            MindTalk Goes Further
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            More than isolated tools
          </p>
        </div>

        {/* Horizontal scroll comparison on mobile */}
        <div className="flex md:hidden gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {comparisons.map((row, index) => (
            <div key={index} className="flex-shrink-0 w-[260px] snap-center">
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden h-full">
                <div className="p-3 bg-muted/50 flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive shrink-0" />
                  <p className="text-xs text-muted-foreground">{row.typical}</p>
                </div>
                <div className="p-3 bg-primary/5 flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <p className="text-xs text-foreground font-medium">{row.mindtalk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block max-w-3xl mx-auto">
          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="grid grid-cols-2 bg-muted">
              <div className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border">
                Other Apps
              </div>
              <div className="p-3 text-center text-sm font-semibold text-primary">
                MindTalk
              </div>
            </div>
            {comparisons.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 ${index < comparisons.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="p-3 flex items-center gap-2 border-r border-border">
                  <X className="w-4 h-4 text-destructive shrink-0" />
                  <span className="text-sm text-muted-foreground">{row.typical}</span>
                </div>
                <div className="p-3 flex items-center gap-2 bg-primary/5">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-foreground font-medium">{row.mindtalk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
