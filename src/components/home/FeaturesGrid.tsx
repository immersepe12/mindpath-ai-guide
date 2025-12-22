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
    detail: "From preventive check-ins to serious indicator screenings — know where you stand.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Wind,
    title: "Breathwork & Grounding",
    promise: "Calm in moments",
    detail: "Visualization, meditation, and calming tools designed to bring you back to center.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FileText,
    title: "Worksheets & Reflections",
    promise: "Process and grow",
    detail: "Guided prompts and journaling exercises that help you understand yourself better.",
    color: "bg-mindtalk-blue/10 text-mindtalk-blue",
  },
  {
    icon: BookOpen,
    title: "Articles & Learning",
    promise: "Knowledge that helps",
    detail: "Simple explanations, science-backed insights, and practical tips you can use today.",
    color: "bg-mindtalk-purple/10 text-mindtalk-purple",
  },
  {
    icon: Video,
    title: "Video Lessons",
    promise: "Learn new skills",
    detail: "Mini courses and education content on coping skills, emotions, and mental wellness.",
    color: "bg-mindtalk-golden/10 text-mindtalk-golden",
  },
  {
    icon: Users,
    title: "Community Support",
    promise: "You're not alone",
    detail: "Peer support and counselor-guided spaces where you can share and connect.",
    color: "bg-mindtalk-maroon/10 text-mindtalk-maroon",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit designed to support your mental health journey — from quick check-ins to deep learning.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm font-medium text-primary mb-2">{feature.promise}</p>
              <p className="text-sm text-muted-foreground">{feature.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
