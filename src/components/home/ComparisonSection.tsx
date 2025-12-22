import { Check, X } from "lucide-react";

const comparisons = [
  {
    typical: "Standalone tools scattered in one app",
    mindtalk: "Structured 30-day journeys with micro tasks",
  },
  {
    typical: "Generic advice for everyone",
    mindtalk: "Personalized guidance based on your progress",
  },
  {
    typical: "No continuity between uses",
    mindtalk: "Daily + weekly summaries and pattern tracking",
  },
  {
    typical: "Limited or no professional support",
    mindtalk: "Community + professional support pathways",
  },
  {
    typical: "Learning resources scattered or absent",
    mindtalk: "One integrated library + action plan",
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Where Other Apps Stop — MindTalk Goes Further
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Most mental health apps offer isolated tools. MindTalk connects everything into a cohesive journey.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 bg-muted">
              <div className="p-4 text-center font-medium text-muted-foreground border-r border-border">
                Typical Mental Health Apps
              </div>
              <div className="p-4 text-center font-semibold text-primary">
                Cadabam's MindTalk
              </div>
            </div>
            
            {/* Rows */}
            {comparisons.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 ${index < comparisons.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="p-4 flex items-center gap-3 border-r border-border">
                  <X className="w-5 h-5 text-destructive shrink-0" />
                  <span className="text-muted-foreground">{row.typical}</span>
                </div>
                <div className="p-4 flex items-center gap-3 bg-primary/5">
                  <Check className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground font-medium">{row.mindtalk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {comparisons.map((row, index) => (
            <div key={index} className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-4 bg-muted/50 flex items-start gap-3">
                <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Typical apps</p>
                  <p className="text-sm text-muted-foreground">{row.typical}</p>
                </div>
              </div>
              <div className="p-4 bg-primary/5 flex items-start gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-primary mb-1">MindTalk</p>
                  <p className="text-sm text-foreground font-medium">{row.mindtalk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
