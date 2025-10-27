import { Card, CardContent } from "./ui/card";
import { 
  Calendar, 
  TrendingUp, 
  Bell, 
  Users, 
  Video, 
  FileText, 
  BookOpen, 
  GraduationCap,
  Shield,
  Lock,
  MessageSquare,
  Zap
} from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  category: "support" | "care" | "growth" | "platform";
}

const features: Feature[] = [
  // Daily Support
  {
    icon: Calendar,
    title: "Daily Check-ins",
    description: "Track your mood and progress with daily prompts",
    category: "support"
  },
  {
    icon: TrendingUp,
    title: "Mood Tracking",
    description: "Visualize patterns and trends in your mental health",
    category: "support"
  },
  {
    icon: Zap,
    title: "Habit Building",
    description: "Develop healthy routines with guided activities",
    category: "support"
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Never miss a task, session, or self-care moment",
    category: "support"
  },

  // Professional Care
  {
    icon: Users,
    title: "Expert Therapists",
    description: "Connect with licensed mental health professionals",
    category: "care"
  },
  {
    icon: Video,
    title: "Video Sessions",
    description: "Secure, HIPAA-compliant therapy from anywhere",
    category: "care"
  },
  {
    icon: FileText,
    title: "Session Notes",
    description: "Access summaries and action items after each session",
    category: "care"
  },
  {
    icon: TrendingUp,
    title: "Progress Reports",
    description: "Share comprehensive insights with your therapist",
    category: "care"
  },

  // Personal Growth
  {
    icon: BookOpen,
    title: "Journaling Tools",
    description: "Express yourself with text, voice, and AI prompts",
    category: "growth"
  },
  {
    icon: MessageSquare,
    title: "Reflection Prompts",
    description: "Personalized questions to deepen self-awareness",
    category: "growth"
  },
  {
    icon: GraduationCap,
    title: "Resource Library",
    description: "200+ guided exercises, meditations, and tools",
    category: "growth"
  },
  {
    icon: BookOpen,
    title: "Educational Content",
    description: "Learn evidence-based mental health strategies",
    category: "growth"
  },

  // Platform Features
  {
    icon: MessageSquare,
    title: "24/7 AI Companion",
    description: "DeepAgent is always available when you need support",
    category: "platform"
  },
  {
    icon: Bell,
    title: "Crisis Support",
    description: "Immediate access to emergency resources",
    category: "platform"
  },
  {
    icon: Shield,
    title: "Privacy-First Design",
    description: "Your data is encrypted and never shared",
    category: "platform"
  },
  {
    icon: Lock,
    title: "Secure & Confidential",
    description: "Bank-level security for all your personal data",
    category: "platform"
  }
];

const categoryConfig = {
  support: {
    title: "Daily Support",
    gradient: "from-primary/10 to-primary/5"
  },
  care: {
    title: "Professional Care",
    gradient: "from-accent/10 to-accent/5"
  },
  growth: {
    title: "Personal Growth",
    gradient: "from-mindtalk-blue/10 to-mindtalk-blue/5"
  },
  platform: {
    title: "Platform Features",
    gradient: "from-mindtalk-purple/10 to-mindtalk-purple/5"
  }
};

const AppFeaturesGrid = () => {
  const categories = ["support", "care", "growth", "platform"] as const;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-mindtalk-blue to-mindtalk-purple bg-clip-text text-transparent">
              Mental Health Tools
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for your mental wellness journey, thoughtfully designed and expertly curated.
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-12">
          {categories.map((category) => {
            const categoryFeatures = features.filter(f => f.category === category);
            const config = categoryConfig[category];

            return (
              <div key={category}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${config.gradient.replace('/10', '').replace('/5', '')}`}></div>
                  {config.title}
                </h3>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryFeatures.map((feature) => {
                    const Icon = feature.icon;
                    
                    return (
                      <Card 
                        key={feature.title}
                        className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80"
                      >
                        <CardContent className="p-6">
                          <div className={`bg-gradient-to-br ${config.gradient} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-foreground" />
                          </div>
                          <h4 className="font-semibold mb-2">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-card rounded-2xl border shadow-sm">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              200+
            </div>
            <div className="text-sm text-muted-foreground">Guided Resources</div>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl border shadow-sm">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              12
            </div>
            <div className="text-sm text-muted-foreground">Expert Sessions</div>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl border shadow-sm">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              90
            </div>
            <div className="text-sm text-muted-foreground">Day Programs</div>
          </div>
          <div className="text-center p-6 bg-card rounded-2xl border shadow-sm">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-sm text-muted-foreground">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeaturesGrid;
