import { Card } from "@/components/ui/card";
import { BookOpen, Bot, Calendar } from "lucide-react";
import { scrollToSection } from "@/utils/scrollToSection";

const ThreePillarsSection = () => {
  const pillars = [
    {
      icon: BookOpen,
      title: "AI-Powered Journaling",
      description: "Transform thoughts into healing with personalized prompts and AI insights",
      gradient: "from-mindtalk-purple to-mindtalk-blue",
      sectionId: "journaling"
    },
    {
      icon: Bot,
      title: "DeepAgent AI Companion",
      description: "24/7 emotional support that learns and grows with your journey",
      gradient: "from-mindtalk-blue to-mindtalk-green",
      sectionId: "ai-section"
    },
    {
      icon: Calendar,
      title: "Structured Recovery Programs",
      description: "90-day pathways with daily tasks, assessments, and expert guidance",
      gradient: "from-mindtalk-orange to-mindtalk-green",
      sectionId: "journeys"
    }
  ];

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Three Powerful Tools, One Healing Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience comprehensive mental health support through our integrated ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={index}
                className="relative overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:-translate-y-2 duration-300"
                onClick={() => scrollToSection(pillar.sectionId)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <div className="relative p-6 space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                  <div className="pt-2">
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      Explore →
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreePillarsSection;
