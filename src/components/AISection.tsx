
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Bot, MessageCircle, Brain, TrendingUp, Shield, Zap } from "lucide-react";

const AISection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-calm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center animate-pulse-slow">
                <Bot className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Meet Your AI Deep Agent
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              The world's first mental health AI that learns your patterns, tracks your progress, 
              and bridges the gap between therapy sessions for truly personalized care
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* AI Features */}
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Brain className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-semibold">Learns Your Patterns</h3>
                  </div>
                  <p className="text-white/80">
                    Analyzes your daily tasks, moods, and triggers to understand your unique mental health journey
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-semibold">24/7 Support</h3>
                  </div>
                  <p className="text-white/80">
                    Available anytime for guidance, assessments, and emotional support between therapy sessions
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-semibold">Therapist Integration</h3>
                  </div>
                  <p className="text-white/80">
                    Provides detailed insights to your therapist, making every session more effective and targeted
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Mock Chat Interface */}
            <div className="relative">
              <Card className="bg-white shadow-2xl max-w-md mx-auto">
                <CardContent className="p-0">
                  {/* Chat Header */}
                  <div className="bg-mindtalk-orange text-white p-4 rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Dr. Riya - AI Agent</h4>
                        <p className="text-sm text-white/80">Available 24/7</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 h-64 overflow-hidden">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-mindtalk-orange flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-gray-800">
                          Hello! I'm glad you're here. How can I assist you today?
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <div className="bg-mindtalk-green text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">What is my progress?</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-mindtalk-orange flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-gray-800">
                          You've completed 14 daily tasks this week with 85% consistency. Your mood scores show improvement!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                      <input 
                        type="text" 
                        placeholder="Type to start chatting..." 
                        className="flex-1 bg-transparent text-sm focus:outline-none"
                        disabled
                      />
                      <Zap className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating indicators */}
              <div className="absolute -top-4 -right-4 animate-bounce">
                <div className="w-12 h-12 rounded-full bg-mindtalk-green flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <MindTalkButton variant="ai" size="hero" className="bg-white text-mindtalk-blue hover:bg-white/90">
              Try AI Agent Now
            </MindTalkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
