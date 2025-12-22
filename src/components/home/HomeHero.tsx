import { Button } from "@/components/ui/button";
import { Download, ArrowDown, Clock, Brain, Wind, Sparkles } from "lucide-react";

const APP_DOWNLOAD_LINK = "https://link-to.app/TMoa8H6NOL";

const HomeHero = () => {
  const scrollToAssessments = () => {
    const element = document.querySelector("#features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 pb-8 md:pt-20 md:pb-16 overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 md:w-40 md:h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 md:mb-6">
              A safe space to understand what you're feeling{" "}
              <span className="text-primary">— and take the next step.</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0">
              Follow 3–4 minute daily micro-tasks designed to help you feel steadier — with professional support when you need it.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <Button
                size="lg"
                onClick={() => window.open(APP_DOWNLOAD_LINK, "_blank")}
                className="gap-2 text-base px-6 py-5 animate-pulse-slow"
              >
                <Download className="w-5 h-5" />
                Download the App
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToAssessments}
                className="gap-2 text-base px-6 py-5"
              >
                <ArrowDown className="w-5 h-5" />
                Quick Self-Check
              </Button>
            </div>

            {/* Trust Microcopy - horizontal scroll on mobile */}
            <div className="flex gap-4 text-xs md:text-sm text-muted-foreground overflow-x-auto pb-2 justify-start lg:justify-start scrollbar-hide">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Evidence-based
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Privacy-first
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Clinical expertise
              </span>
            </div>
          </div>

          {/* Right: Phone Mockup - smaller on mobile */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-[200px] sm:w-[260px] md:w-[300px]">
              {/* Phone Frame */}
              <div className="bg-card rounded-[2rem] p-2 sm:p-3 shadow-2xl border border-border">
                <div className="bg-secondary rounded-[1.5rem] p-3 sm:p-4 min-h-[320px] sm:min-h-[420px]">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-4 px-1">
                    <span className="text-[10px] text-muted-foreground">9:41</span>
                    <div className="w-14 h-4 bg-foreground/20 rounded-full" />
                    <span className="text-[10px] text-muted-foreground">100%</span>
                  </div>

                  {/* App Content Preview */}
                  <div className="space-y-3">
                    <div className="text-center mb-4">
                      <p className="text-xs text-muted-foreground">Today's Journey</p>
                      <h3 className="text-sm sm:text-base font-semibold text-foreground">Day 5 of 30</h3>
                    </div>

                    {/* Task Cards - Compact */}
                    <div className="space-y-2">
                      {[
                        { icon: Clock, label: "Mood Check-in", time: "2 min", color: "bg-primary/10 text-primary" },
                        { icon: Wind, label: "Breathing", time: "3 min", color: "bg-accent/10 text-accent" },
                        { icon: Brain, label: "Reflection", time: "4 min", color: "bg-mindtalk-blue/10 text-mindtalk-blue" },
                        { icon: Sparkles, label: "AI Summary", time: "1 min", color: "bg-mindtalk-purple/10 text-mindtalk-purple" },
                      ].map((task, i) => (
                        <div 
                          key={i}
                          className="bg-card rounded-lg p-2.5 sm:p-3 shadow-sm border border-border animate-float"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full ${task.color} flex items-center justify-center`}>
                              <task.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-xs truncate">{task.label}</p>
                              <p className="text-[10px] text-muted-foreground">{task.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
