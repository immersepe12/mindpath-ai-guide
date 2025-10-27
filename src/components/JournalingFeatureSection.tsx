import { Card } from "@/components/ui/card";
import { MindTalkButton } from "@/components/ui/button-variants";
import { scrollToForm } from "@/utils/scrollToForm";
import { Sparkles, Mic, MessageSquare, Image as ImageIcon, TrendingUp, Calendar } from "lucide-react";

const JournalingFeatureSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Personalized Daily Prompts",
      description: "AI analyzes your baseline assessment and past journals to suggest meaningful prompts"
    },
    {
      icon: Mic,
      title: "Voice or Type",
      description: "Speak naturally with speech-to-text or write freely - your choice"
    },
    {
      icon: MessageSquare,
      title: "AI Deep Dive",
      description: "Click 'Go Deeper' to explore your thoughts and emotions further"
    },
    {
      icon: ImageIcon,
      title: "Visual Memories",
      description: "AI-generated images created for each journal entry"
    },
    {
      icon: TrendingUp,
      title: "Smart Summaries",
      description: "Get structured bullet-point insights from your journal entries"
    },
    {
      icon: Calendar,
      title: "Progress Tracking",
      description: "View your emotional journey over time with visual timeline"
    }
  ];

  return (
    <section id="journaling" className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-mindtalk-purple/10 via-mindtalk-blue/10 to-background" />
      
      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-mindtalk-purple/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-mindtalk-purple">First-of-its-Kind</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Mental Health Journal
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform scattered thoughts into structured healing with AI that understands you. 
            Every day brings personalized prompts that guide you deeper into self-discovery.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Journal flow mockup */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-mindtalk-purple/5 to-mindtalk-blue/5 border-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Today's Journal</h3>
                  <span className="text-sm text-muted-foreground">Oct 27, 2025</span>
                </div>
                
                {/* Sample prompts */}
                <div className="space-y-3">
                  <div className="p-4 bg-background/80 rounded-lg border border-mindtalk-purple/20 hover:border-mindtalk-purple/40 transition-colors cursor-pointer">
                    <p className="text-sm font-medium">Practicing morning affirmations</p>
                  </div>
                  <div className="p-4 bg-background/80 rounded-lg border border-mindtalk-blue/20 hover:border-mindtalk-blue/40 transition-colors cursor-pointer">
                    <p className="text-sm font-medium">Exploring your passions and strengths</p>
                  </div>
                  <div className="p-4 bg-background/80 rounded-lg border border-mindtalk-green/20 hover:border-mindtalk-green/40 transition-colors cursor-pointer">
                    <p className="text-sm font-medium">Releasing stress and anxiety</p>
                  </div>
                </div>

                {/* Prompt Me button */}
                <div className="pt-4 border-t">
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-mindtalk-purple to-mindtalk-blue text-white rounded-lg font-medium hover:shadow-lg transition-all">
                    <Sparkles className="inline-block w-4 h-4 mr-2" />
                    Prompt Me
                  </button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    AI suggests based on your journey
                  </p>
                </div>
              </div>
            </Card>

            {/* Writing interface */}
            <Card className="p-6 bg-gradient-to-br from-background to-mindtalk-blue/5 border-2 border-mindtalk-blue/20">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-mindtalk-blue">
                  What does "building your future vision" mean to you right now?
                </h4>
                <div className="min-h-[120px] p-4 bg-background/80 rounded-lg border border-border">
                  <p className="text-muted-foreground italic">
                    Building a better world with accessible healthcare...
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 px-4 bg-mindtalk-blue text-white rounded-lg font-medium hover:bg-mindtalk-blue/90 transition-colors">
                    Go Deeper
                  </button>
                  <button className="flex-1 py-2 px-4 border border-border rounded-lg font-medium hover:bg-secondary transition-colors">
                    Finish Entry
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mic className="w-4 h-4" />
                  <span>Press and hold to use voice</span>
                </div>
              </div>
            </Card>

            {/* Saved entry preview */}
            <Card className="p-6 bg-gradient-to-br from-mindtalk-green/5 to-background border-2 border-mindtalk-green/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Saved Entry</h4>
                  <span className="text-xs text-muted-foreground">Oct 22, 2025</span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-mindtalk-blue/20 to-mindtalk-purple/20 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-mindtalk-blue/40" />
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-mindtalk-green mt-1">•</span>
                    <span className="text-muted-foreground">Work feeling overwhelming due to multiple facets involved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mindtalk-green mt-1">•</span>
                    <span className="text-muted-foreground">Experiencing challenges from things not working as required</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Right: Features grid */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mindtalk-purple to-mindtalk-blue flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* How it works */}
            <Card className="p-8 bg-gradient-to-br from-mindtalk-orange/5 to-mindtalk-green/5">
              <h3 className="text-xl font-bold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mindtalk-purple text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Choose Your Prompt</h4>
                    <p className="text-sm text-muted-foreground">
                      Select from daily prompts or click "Prompt Me" for AI-personalized suggestions
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mindtalk-blue text-white flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Express Yourself</h4>
                    <p className="text-sm text-muted-foreground">
                      Write or speak freely. Click "Go Deeper" to explore further with AI guidance
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mindtalk-green text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Get AI Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive a structured summary and AI-generated visual for your journal entry
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <MindTalkButton 
            variant="hero" 
            size="hero"
            onClick={scrollToForm}
            className="animate-pulse-slow"
          >
            Start Your Journaling Journey
          </MindTalkButton>
          <p className="text-sm text-muted-foreground mt-4">
            Your first journal entry awaits - personalized and ready to begin
          </p>
        </div>
      </div>
    </section>
  );
};

export default JournalingFeatureSection;
