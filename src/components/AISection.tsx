
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Bot, MessageCircle, Brain, TrendingUp, Shield, Zap, Phone, Clock } from "lucide-react";

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
              Meet Dr. Riya - Your AI Deep Agent
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              The world's first mental health AI that learns your patterns, tracks your progress between sessions, 
              and provides personalized support 24/7
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
                    Dr. Riya remembers every conversation, assessment, and milestone in your journey. 
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
                    Whether it's 2 AM anxiety or midday stress, Dr. Riya is always available to provide 
                    immediate support and coping strategies.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                    <h3 className="text-xl font-semibold">Therapist Bridge</h3>
                  </div>
                  <p className="text-white/80">
                    All insights are shared with your therapist, making every human session more 
                    productive and focused on your specific needs.
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
                            Available 24/7
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Phone className="w-5 h-5 text-white/70" />
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
                          Hi! I noticed you completed your breathing exercise today. How are you feeling?
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <div className="bg-mindtalk-green text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Much calmer, thank you</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-mindtalk-orange flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-gray-800">
                          That's wonderful! Your consistency with daily tasks is improving. Should I share this progress with Dr. Sharma for your session tomorrow?
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <div className="bg-mindtalk-green text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Yes, please do!</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-mindtalk-orange flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-gray-800">
                          Done! I've prepared a summary for Dr. Sharma. Would you like to continue with today's mindfulness exercise?
                        </p>
                        <div className="mt-2 flex gap-2">
                          <button className="bg-mindtalk-blue text-white text-xs px-2 py-1 rounded">Continue Chat</button>
                          <button className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Voice Call</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                      <input 
                        type="text" 
                        placeholder="Chat with Dr. Riya..." 
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
              Chat with Dr. Riya Now
            </MindTalkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
