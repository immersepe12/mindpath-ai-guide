import { Calendar, FileBarChart, MessageSquare } from "lucide-react";

const stages = [
  { icon: Calendar, title: "Between", desc: "Track & practice daily", color: "bg-primary/10 text-primary" },
  { icon: FileBarChart, title: "Before", desc: "Review patterns together", color: "bg-accent/10 text-accent" },
  { icon: MessageSquare, title: "During", desc: "More productive sessions", color: "bg-mindtalk-blue/10 text-mindtalk-blue" },
];

const ProfessionalSupport = () => {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Better Therapy Prep
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
            Arrive prepared, stay consistent between visits
          </p>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 max-w-3xl md:mx-auto">
          {stages.map((stage, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[180px] md:w-auto snap-center"
            >
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border text-center h-full">
                <div className={`w-12 h-12 rounded-xl ${stage.color} flex items-center justify-center mx-auto mb-3`}>
                  <stage.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">{stage.title}</h3>
                <p className="text-xs text-muted-foreground">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSupport;
