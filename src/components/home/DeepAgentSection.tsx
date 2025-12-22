import { Bot, User, Shield } from "lucide-react";

const DeepAgentSection = () => {
  return (
    <section id="ai-support" className="py-16 md:py-24 gradient-calm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-4">
                Personalized AI Support
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Not Just Tools — A Guide That Remembers Your Journey
              </h2>
              
              <div className="space-y-4 text-primary-foreground/90 mb-8">
                <p>
                  Your AI assistant considers your check-ins, completed tasks, assessments, and journey progress to understand your unique situation.
                </p>
                <p>
                  It can suggest the next best action: a 2-minute grounding tool, a relevant lesson, or a recommendation to speak with a professional.
                </p>
                <p>
                  It can help you prepare for therapy by summarizing patterns and what to discuss.
                </p>
              </div>

              {/* Safety Note */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
                <Shield className="w-5 h-5 text-primary-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-primary-foreground/80">
                  AI guidance is supportive and educational — not a replacement for professional diagnosis.
                </p>
              </div>
            </div>

            {/* Right: Chat Demo */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="bg-primary px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground">MindTalk AI</p>
                    <p className="text-xs text-primary-foreground/70">Always here for you</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 bg-secondary/30">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5">
                        <p className="text-sm">I've been feeling anxious this week.</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 space-y-3">
                        <p className="text-sm text-foreground">
                          I hear you. Looking at your week, I noticed your anxiety check-ins were higher on Monday and Wednesday.
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">Suggestions for you:</p>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-primary">→</span>
                              <span className="text-foreground">Try a 2-min grounding exercise</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-primary">→</span>
                              <span className="text-foreground">Review what changed this week</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-primary">→</span>
                              <span className="text-foreground">2 patterns you noted recently</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeepAgentSection;
