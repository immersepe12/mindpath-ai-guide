import { Building2, Users, Zap, HandHeart } from "lucide-react";

const trustPoints = [
  {
    icon: Building2,
    text: "Built on Cadabam's legacy of mental healthcare",
  },
  {
    icon: Users,
    text: "Designed with clinicians",
  },
  {
    icon: Zap,
    text: "Tools that are simple to start",
  },
  {
    icon: HandHeart,
    text: "Support that meets you where you are",
  },
];

const TrustStrip = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Trust Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{point.text}</p>
            </div>
          ))}
        </div>

        {/* Summary Paragraph */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            MindTalk brings together assessments, self-help tools, and structured recovery journeys so you're never left wondering what to do next.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
