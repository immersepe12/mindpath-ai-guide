import { Building2, Users, Zap, HandHeart } from "lucide-react";

const trustPoints = [
  { icon: Building2, text: "Cadabam's legacy" },
  { icon: Users, text: "Clinician-designed" },
  { icon: Zap, text: "Simple to start" },
  { icon: HandHeart, text: "Meets you where you are" },
];

const TrustStrip = () => {
  return (
    <section className="py-8 md:py-12 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Trust Points - Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 md:grid md:grid-cols-4 md:gap-6 md:mx-0 md:px-0">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center gap-2 md:flex-col md:text-center md:gap-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <point.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <p className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">{point.text}</p>
            </div>
          ))}
        </div>

        {/* Summary - Compact */}
        <div className="max-w-xl mx-auto text-center mt-4">
          <p className="text-sm md:text-base text-muted-foreground">
            Assessments, tools, and structured journeys — never wonder what to do next.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
