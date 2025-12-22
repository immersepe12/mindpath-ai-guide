import { 
  ClipboardCheck, 
  Wind, 
  FileText, 
  BookOpen, 
  Video, 
  Users 
} from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "Assessments",
    promise: "Spot patterns early",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Wind,
    title: "Breathwork",
    promise: "Calm in moments",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FileText,
    title: "Worksheets",
    promise: "Process and grow",
    color: "bg-mindtalk-blue/10 text-mindtalk-blue",
  },
  {
    icon: BookOpen,
    title: "Articles",
    promise: "Learn what helps",
    color: "bg-mindtalk-purple/10 text-mindtalk-purple",
  },
  {
    icon: Video,
    title: "Video Lessons",
    promise: "Build new skills",
    color: "bg-mindtalk-golden/10 text-mindtalk-golden",
  },
  {
    icon: Users,
    title: "Community",
    promise: "You're not alone",
    color: "bg-mindtalk-maroon/10 text-mindtalk-maroon",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-10 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Everything in One Place
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Tools to support your mental health journey
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on larger screens */}
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[140px] md:w-auto snap-center"
            >
              <div className="bg-card rounded-xl p-4 shadow-sm border border-border hover:border-primary/20 transition-all h-full text-center">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-3`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.promise}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
