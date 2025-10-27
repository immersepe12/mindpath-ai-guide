import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Home, BookOpen, MessageCircle, Calendar, Map, CheckCircle, Circle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "home" | "journal" | "ai" | "appointments" | "journey";

interface Tab {
  id: TabId;
  icon: React.ElementType;
  title: string;
  description: string;
}

const tabs: Tab[] = [
  {
    id: "home",
    icon: Home,
    title: "Home Dashboard",
    description: "Your personalized mental health hub with journey cards, quick stats, and daily prompts - all in one place."
  },
  {
    id: "journal",
    icon: BookOpen,
    title: "AI-Powered Journaling",
    description: "Express yourself through text or voice, get personalized prompts, and watch AI transform your thoughts into insights."
  },
  {
    id: "ai",
    icon: MessageCircle,
    title: "DeepAgent AI (Dr. Riya)",
    description: "Your 24/7 AI companion that understands your journey, learns from your entries, and provides empathetic support anytime."
  },
  {
    id: "appointments",
    icon: Calendar,
    title: "Therapy Sessions",
    description: "Schedule and manage sessions with expert therapists, view upcoming appointments, and access session notes."
  },
  {
    id: "journey",
    icon: Map,
    title: "Daily Journeys",
    description: "Follow your personalized 90-day roadmap with gamified tasks, progress tracking, and daily achievements."
  }
];

const InteractiveAppShowcase = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = tabs.findIndex(t => t.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setIsAutoPlaying(false);
  };

  return (
    <section id="app-features" className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              One Platform
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of mental health care with seamlessly integrated tools designed for your healing journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Phone Mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto" style={{ maxWidth: "320px" }}>
              {/* Phone Frame */}
              <div className="relative bg-card border-8 border-foreground/10 rounded-[3rem] shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/10 rounded-b-2xl z-10"></div>
                
                {/* Screen Content */}
                <div className="aspect-[9/19] bg-background overflow-hidden">
                  {activeTab === "home" && <HomeScreen />}
                  {activeTab === "journal" && <JournalScreen />}
                  {activeTab === "ai" && <AIScreen />}
                  {activeTab === "appointments" && <AppointmentsScreen />}
                  {activeTab === "journey" && <JourneyScreen />}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Tabs */}
          <div className="space-y-3 order-1 lg:order-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <Card
                  key={tab.id}
                  className={cn(
                    "cursor-pointer transition-all duration-300 hover:shadow-lg",
                    isActive 
                      ? "border-primary bg-primary/5 shadow-md" 
                      : "hover:border-primary/50"
                  )}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-3 rounded-xl transition-colors",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{tab.title}</h3>
                        <p className="text-sm text-muted-foreground">{tab.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Mock Screen Components
const HomeScreen = () => (
  <div className="p-4 space-y-4 h-full bg-gradient-to-b from-primary/10 to-background">
    <div className="text-center py-4">
      <h3 className="font-semibold text-sm mb-1">Good Morning, Alex!</h3>
      <p className="text-xs text-muted-foreground">Day 3 of your journey</p>
    </div>
    
    <div className="bg-card rounded-xl p-4 shadow-sm border">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-xs font-semibold mb-1">Active Journey</div>
          <div className="text-xs text-muted-foreground">Stress Recovery</div>
        </div>
        <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Day 3/10</div>
      </div>
      <div className="flex gap-1 mb-3">
        {[1,2,3,4,5,6,7,8,9,10].map(i => (
          <div key={i} className={cn("w-2 h-2 rounded-full", i <= 3 ? "bg-accent" : "bg-muted")} />
        ))}
      </div>
      <button className="w-full bg-primary text-primary-foreground text-xs py-2 rounded-lg font-medium">
        Continue Journey
      </button>
    </div>

    <div className="bg-card rounded-xl p-4 shadow-sm border">
      <div className="text-xs font-semibold mb-3">My Journal</div>
      <div className="space-y-2">
        <div className="text-xs flex items-center gap-2 p-2 bg-muted/50 rounded">✏️ Start Writing</div>
        <div className="text-xs flex items-center gap-2 p-2 bg-muted/50 rounded">🪞 Today's Prompt</div>
      </div>
    </div>
  </div>
);

const JournalScreen = () => (
  <div className="p-4 space-y-4 h-full bg-background">
    <div className="text-center py-2">
      <h3 className="font-semibold text-sm">Daily Journal</h3>
    </div>
    
    <div className="bg-card rounded-xl p-4 shadow-sm border">
      <div className="text-xs font-medium mb-2 text-primary">Today's Prompt</div>
      <div className="text-xs text-muted-foreground italic mb-4">
        "What made you feel calm today?"
      </div>
      <textarea 
        className="w-full h-24 text-xs p-2 bg-muted/30 rounded border resize-none"
        placeholder="Start writing..."
        defaultValue="Today I took a walk in the park..."
      />
      <div className="flex gap-2 mt-3">
        <button className="flex-1 bg-muted text-xs py-2 rounded">🎤 Voice</button>
        <button className="flex-1 bg-primary text-primary-foreground text-xs py-2 rounded">Go Deeper</button>
      </div>
    </div>

    <div className="bg-card rounded-xl p-3 shadow-sm border">
      <div className="text-xs font-medium mb-2">Recent Entries</div>
      <div className="space-y-2">
        <div className="flex gap-2 p-2 bg-muted/30 rounded">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded"></div>
          <div className="flex-1">
            <div className="text-xs font-medium">Yesterday</div>
            <div className="text-xs text-muted-foreground">Reflection on progress...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AIScreen = () => (
  <div className="p-4 h-full bg-gradient-to-b from-mindtalk-blue/10 to-background flex flex-col">
    <div className="text-center py-2 mb-4">
      <h3 className="font-semibold text-sm">Dr. Riya</h3>
      <p className="text-xs text-muted-foreground">Your AI Companion</p>
    </div>
    
    <div className="flex-1 space-y-3 overflow-hidden">
      <div className="bg-primary/10 rounded-xl p-3 ml-auto max-w-[80%]">
        <p className="text-xs">I'm feeling anxious today</p>
      </div>
      <div className="bg-card rounded-xl p-3 shadow-sm border max-w-[80%]">
        <p className="text-xs">I understand. I noticed in your journal you mentioned work stress. Would you like to talk about what's triggering the anxiety?</p>
      </div>
      <div className="bg-primary/10 rounded-xl p-3 ml-auto max-w-[80%]">
        <p className="text-xs">Yes, it's the upcoming presentation</p>
      </div>
      <div className="bg-card rounded-xl p-3 shadow-sm border max-w-[80%]">
        <p className="text-xs">Let's work through this together. Remember the breathing exercise from Day 2? Let me guide you...</p>
      </div>
    </div>

    <div className="mt-4 flex gap-2">
      <input className="flex-1 text-xs p-2 bg-muted/50 rounded-lg border" placeholder="Type a message..." />
      <button className="bg-primary text-primary-foreground px-4 text-xs rounded-lg">Send</button>
    </div>
  </div>
);

const AppointmentsScreen = () => (
  <div className="p-4 space-y-4 h-full bg-background">
    <div className="text-center py-2">
      <h3 className="font-semibold text-sm">Appointments</h3>
    </div>
    
    <div className="bg-card rounded-xl p-4 shadow-sm border">
      <div className="text-xs font-medium mb-3 text-accent">Upcoming</div>
      <div className="flex gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20"></div>
        <div className="flex-1">
          <div className="text-xs font-semibold">Dr. Sharma</div>
          <div className="text-xs text-muted-foreground">Clinical Psychologist</div>
          <div className="text-xs text-primary mt-1">Tomorrow, 3:00 PM</div>
        </div>
      </div>
      <button className="w-full bg-primary text-primary-foreground text-xs py-2 rounded-lg">Join Session</button>
    </div>

    <div className="bg-card rounded-xl p-4 shadow-sm border">
      <div className="text-xs font-medium mb-2">Past Sessions</div>
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
          <div className="text-xs">Session 2 - Coping Strategies</div>
          <CheckCircle className="w-3 h-3 text-accent" />
        </div>
        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
          <div className="text-xs">Session 1 - Initial Assessment</div>
          <CheckCircle className="w-3 h-3 text-accent" />
        </div>
      </div>
    </div>

    <button className="w-full bg-muted text-xs py-3 rounded-lg font-medium">Book New Appointment</button>
  </div>
);

const JourneyScreen = () => (
  <div className="p-4 h-full bg-background overflow-hidden">
    <div className="text-center py-2 mb-4">
      <h3 className="font-semibold text-sm">Stress Recovery Journey</h3>
      <p className="text-xs text-muted-foreground">Day 3 of 10 • 30% Complete</p>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-center gap-3 opacity-50">
        <Lock className="w-5 h-5 text-muted-foreground" />
        <div className="text-xs">Day 5: Managing Triggers</div>
      </div>
      
      <div className="flex items-center gap-3 opacity-50">
        <Lock className="w-5 h-5 text-muted-foreground" />
        <div className="text-xs">Day 4: Building Resilience</div>
      </div>
      
      <div className="bg-primary/10 rounded-xl p-3 border-2 border-primary">
        <div className="flex items-center gap-3 mb-2">
          <Circle className="w-5 h-5 text-primary fill-primary" />
          <div className="text-xs font-semibold">Day 3: Coping Strategies</div>
        </div>
        <div className="ml-8 space-y-1.5">
          <div className="text-xs flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-accent" />
            <span>Reflection: Understanding Stress</span>
          </div>
          <div className="text-xs flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-accent" />
            <span>Audio: 5-Min Breathing Exercise</span>
          </div>
          <div className="text-xs flex items-center gap-2">
            <Circle className="w-3 h-3 text-muted-foreground" />
            <span>Writing: Journal Your Feelings</span>
          </div>
          <div className="text-xs flex items-center gap-2">
            <Circle className="w-3 h-3 text-muted-foreground" />
            <span>Assessment: Rate Your Progress</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-accent" />
        <div className="text-xs">Day 2: Identifying Patterns</div>
      </div>
      
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-accent" />
        <div className="text-xs">Day 1: Getting Started</div>
      </div>
    </div>
  </div>
);

export default InteractiveAppShowcase;
