import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Bot, MessageCircle, Brain, TrendingUp, Shield, Calendar, Phone, Clock } from "lucide-react";
import { scrollToForm } from "@/utils/scrollToForm";

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
              Meet Dr. Riya - Your 24/7 AI Companion
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              The world's first mental health AI that learns your patterns throughout your 90-day journey, 
              tracks your progress between sessions, and provides personalized support anytime
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Dr. Riya AI Features */}
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Brain className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-semibold">Deep Learning & Memory</h3>
                  </div>
                  <p className="text-white/80">
                    Dr. Riya remembers every conversation, assessment, and milestone in your 90-day journey. 
                    She learns your patterns and provides increasingly personalized guidance.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-semibold">24/7 Emotional Support</h3>
                  </div>
                  <p className="text-white/80">
                    Whether it's 2 AM anxiety or midday stress, Dr. Riya is always available throughout 
                    your 90-day program to provide immediate support and coping strategies.
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
                    All insights are shared with your therapist, making every session more 
                    productive and focused on your specific needs throughout your recovery.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Chat Interface */}
            <div className="relative">
              <Card className="bg-white shadow-2xl max-w-md mx-auto">
                <CardContent className="p-0">
                  {/* Chat Header */}
                  <div className="bg-mindtalk-orange text-white p-4 rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Dr. Riya</h4>
                          <p className="text-sm text-white/80 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Day 36 of your 90-day journey
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Calendar className="w-5 h-5 text-white/70" />
                        <Clock className="w-5 h-5 text-white/70" />
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 h-80 overflow-hidden">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-mindtalk-orange flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-gray-800">
                          Great progress on Day 36! I noticed you completed 3 assessments today. How are you feeling?
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <div className="bg-mindtalk-green text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Much more aware of my patterns</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-mindtalk-orange flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-gray-800">
                          That's wonderful! Your consistency is building real change. I'll share this insight with your therapist for tomorrow's session.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <div className="bg-mindtalk-green text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Perfect, thank you!</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                      <input 
                        type="text" 
                        placeholder="Continue your conversation..." 
                        className="flex-1 bg-transparent text-sm focus:outline-none"
                        disabled
                      />
                      <MessageCircle className="w-4 h-4 text-gray-400" />
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

          <div className="text-center mt-16 px-4">
            <MindTalkButton 
              variant="hero" 
              size="hero" 
              className="bg-white text-mindtalk-orange hover:bg-white/90 w-full sm:w-auto text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 h-12 sm:h-14"
              onClick={scrollToForm}
            >
              <span className="hidden sm:inline">Start Your 90-Day Journey with Dr. Riya</span>
              <span className="sm:hidden">Start 90-Day Journey</span>
            </MindTalkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
