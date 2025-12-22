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
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              A safe space to understand what you're feeling{" "}
              <span className="text-primary">— and take the next step.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Assess what's going on, learn with trusted resources, and follow 3–4 minute daily micro-tasks designed to help you feel steadier — with professional support when you need it.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                onClick={() => window.open(APP_DOWNLOAD_LINK, "_blank")}
                className="gap-2 text-lg px-8 py-6 animate-pulse-slow"
              >
                <Download className="w-5 h-5" />
                Download the App
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToAssessments}
                className="gap-2 text-lg px-8 py-6"
              >
                <ArrowDown className="w-5 h-5" />
                Take a Quick Self-Check
              </Button>
            </div>

            {/* Trust Microcopy */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Evidence-based tools
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Privacy-first
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Built on decades of clinical expertise
              </span>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[280px] sm:w-[320px]">
              {/* Phone Frame */}
              <div className="bg-card rounded-[2.5rem] p-3 shadow-2xl border border-border">
                <div className="bg-secondary rounded-[2rem] p-4 min-h-[500px]">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-6 px-2">
                    <span className="text-xs text-muted-foreground">9:41</span>
                    <div className="w-20 h-5 bg-foreground/20 rounded-full" />
                    <span className="text-xs text-muted-foreground">100%</span>
                  </div>

                  {/* App Content Preview */}
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground">Today's Journey</p>
                      <h3 className="text-lg font-semibold text-foreground">Day 5 of 30</h3>
                    </div>

                    {/* Task Cards */}
                    <div className="space-y-3">
                      <div className="bg-card rounded-xl p-4 shadow-sm border border-border animate-float">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">Mood Check-in</p>
                            <p className="text-xs text-muted-foreground">2 minutes</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card rounded-xl p-4 shadow-sm border border-border animate-float" style={{ animationDelay: "0.2s" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <Wind className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">Breathing Exercise</p>
                            <p className="text-xs text-muted-foreground">3 minutes</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card rounded-xl p-4 shadow-sm border border-border animate-float" style={{ animationDelay: "0.4s" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-mindtalk-blue/10 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-mindtalk-blue" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">Reflection Prompt</p>
                            <p className="text-xs text-muted-foreground">4 minutes</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card rounded-xl p-4 shadow-sm border border-border animate-float" style={{ animationDelay: "0.6s" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-mindtalk-purple/10 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-mindtalk-purple" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">AI Daily Summary</p>
                            <p className="text-xs text-muted-foreground">Personalized insights</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
