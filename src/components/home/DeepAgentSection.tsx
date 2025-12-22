import { Bot, User, Shield } from "lucide-react";

const DeepAgentSection = () => {
  return (
    <section id="ai-support" className="py-10 md:py-16 gradient-calm">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-medium mb-3">
                AI Support
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                A Guide That Remembers Your Journey
              </h2>
              
              <div className="space-y-3 text-sm text-primary-foreground/90 mb-6">
                <p>• Considers your check-ins, tasks & progress</p>
                <p>• Suggests next best actions</p>
                <p>• Helps prepare for therapy sessions</p>
              </div>

              {/* Safety Note */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20">
                <Shield className="w-4 h-4 text-primary-foreground shrink-0" />
                <p className="text-xs text-primary-foreground/80">
                  Supportive guidance — not a replacement for professional care.
                </p>
              </div>
            </div>

            {/* Right: Chat Demo - Compact */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="w-full max-w-[300px] bg-card rounded-xl shadow-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="bg-primary px-3 py-2 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <p className="text-xs font-medium text-primary-foreground">MindTalk AI</p>
                </div>

                {/* Chat Messages */}
                <div className="p-3 space-y-3 bg-secondary/30">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="flex items-end gap-1.5 max-w-[85%]">
                      <div className="bg-primary text-primary-foreground rounded-xl rounded-br-sm px-3 py-2">
                        <p className="text-xs">Feeling anxious this week.</p>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="flex items-end gap-1.5 max-w-[90%]">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="w-3 h-3 text-primary" />
                      </div>
                      <div className="bg-card border border-border rounded-xl rounded-bl-sm px-3 py-2">
                        <p className="text-xs text-foreground mb-2">
                          I noticed higher anxiety on Mon & Wed.
                        </p>
                        <div className="space-y-1 text-xs">
                          <p className="text-primary">→ 2-min grounding</p>
                          <p className="text-primary">→ Review patterns</p>
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
