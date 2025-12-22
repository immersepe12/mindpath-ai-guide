import { Calendar, FileBarChart, MessageSquare } from "lucide-react";

const stages = [
  {
    icon: Calendar,
    title: "Between Sessions",
    description: "You track, reflect, and practice with daily micro-tasks that reinforce what you learn in therapy.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileBarChart,
    title: "Before Sessions",
    description: "You and your therapist can review summaries and patterns — arrive prepared with insights.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: MessageSquare,
    title: "During Sessions",
    description: "Less time recalling what happened, more time working on what matters most to you.",
    color: "bg-mindtalk-blue/10 text-mindtalk-blue",
  },
];

const ProfessionalSupport = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Better Prepared for Professional Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            MindTalk doesn't replace therapy — it makes your sessions more impactful by helping you arrive prepared and stay consistent between visits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stages.map((stage, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-8 shadow-sm border border-border text-center hover:shadow-lg transition-shadow"
            >
              {/* Connection Line */}
              {index < stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
              
              <div className={`w-16 h-16 rounded-2xl ${stage.color} flex items-center justify-center mx-auto mb-4`}>
                <stage.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{stage.title}</h3>
              <p className="text-muted-foreground">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSupport;
