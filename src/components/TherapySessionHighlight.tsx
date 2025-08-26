
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Video, Calendar, MessageCircle, User, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface TherapySessionHighlightProps {
  variant?: 'journeys' | 'daily';
}

const TherapySessionHighlight = ({ variant = 'journeys' }: TherapySessionHighlightProps) => {
  const therapySchedule = [
    { week: "Week 2", session: "Initial Assessment", status: "completed" },
    { week: "Week 4", session: "Progress Review", status: "completed" },
    { week: "Week 6", session: "Strategy Adjustment", status: "current" },
    { week: "Week 8", session: "Breakthrough Session", status: "upcoming" },
    { week: "Week 10", session: "Integration", status: "upcoming" },
    { week: "Week 12", session: "Completion Review", status: "upcoming" }
  ];

  if (variant === 'daily') {
    return (
      <div className="mx-3 md:mx-4 mb-3 md:mb-4">
        <Card className="bg-gradient-to-r from-mindtalk-blue/10 to-mindtalk-purple/10 border-mindtalk-blue/20">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-mindtalk-blue rounded-full flex items-center justify-center">
                <Video className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <h4 className="text-mindtalk-blue font-semibold text-sm md:text-base">Therapy Session</h4>
            </div>
            
            <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3">
              Your Week 6 session with Dr. Priya is scheduled for tomorrow at 4:00 PM
            </p>
            
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-mindtalk-green" />
              <span className="text-xs md:text-sm text-gray-600">Based on your daily progress</span>
            </div>
            
            <button className="w-full bg-mindtalk-blue text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center justify-center gap-1">
              <Video className="w-3 h-3 md:w-4 md:h-4" />
              Join Session Tomorrow
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-r from-mindtalk-blue/5 to-mindtalk-purple/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Content Side */}
            <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Talk to Your Dedicated Therapist
                </h3>
                <p className="text-lg sm:text-xl text-mindtalk-blue font-semibold mb-2 sm:mb-3">
                  12 Personalized Sessions Over 90 Days
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Your journey isn't just about daily tasks. Connect with expert therapists who analyze your progress and provide personalized insights to accelerate your recovery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-3 sm:p-4 border border-mindtalk-blue/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-mindtalk-blue rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">Personalized Insights</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Based on your daily progress</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 sm:p-4 border border-mindtalk-purple/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-mindtalk-purple rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">Flexible Scheduling</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Sessions that fit your life</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 sm:p-4 border border-mindtalk-green/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-mindtalk-green rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">Expert Guidance</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Licensed professionals</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 sm:p-4 border border-mindtalk-orange/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-mindtalk-orange rounded-lg flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">Adaptive Journey</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Plans adjust to your needs</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="text-center sm:text-left">
                <MindTalkButton 
                  variant="ai" 
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Schedule Your First Session
                </MindTalkButton>
              </div>
            </div>

            {/* Visual Side - Mock Video Call Interface */}
            <div className="order-1 lg:order-2">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                
                {/* Video Call Interface */}
                <Card className="bg-gray-900 border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    {/* Video Call Header */}
                    <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-white text-sm">Therapy Session - Week 6</span>
                      <div className="flex items-center gap-1 text-white text-sm">
                        <Clock className="w-3 h-3" />
                        <span>45:12</span>
                      </div>
                    </div>

                    {/* Therapist Video */}
                    <div className="relative aspect-video bg-gradient-to-br from-mindtalk-blue/20 to-mindtalk-purple/20 p-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-mindtalk-blue rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                        </div>
                        <h4 className="text-gray-800 font-semibold mb-1">Dr. Priya Raghvan</h4>
                        <p className="text-sm text-gray-600">Clinical Psychologist</p>
                      </div>
                      
                      {/* Chat bubbles showing insights */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg">
                          <p className="text-sm text-gray-800">
                            "Your mindfulness scores have improved 40% since our last session. Let's explore what's working..."
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Video Call Controls */}
                    <div className="bg-gray-800 px-4 py-3 flex items-center justify-center gap-4">
                      <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Video className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="w-4 h-4 bg-white rounded-sm"></span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Therapy Schedule Timeline */}
                <Card className="mt-4 sm:mt-6">
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Your Therapy Timeline</h4>
                    <div className="space-y-2">
                      {therapySchedule.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            item.status === 'completed' ? 'bg-mindtalk-green' :
                            item.status === 'current' ? 'bg-mindtalk-blue' :
                            'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm font-medium text-gray-900">{item.week}</span>
                              <span className="text-xs text-gray-600">{item.session}</span>
                            </div>
                          </div>
                          {item.status === 'completed' && (
                            <CheckCircle className="w-3 h-3 text-mindtalk-green" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapySessionHighlight;
