
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Play, Moon, Waves, CloudSnow, Heart } from "lucide-react";

const meditationSessions = [
  {
    title: "Guided Nighttime Body Scan",
    duration: "15 min",
    icon: Moon,
    category: "Sleep",
    color: "bg-indigo-500"
  },
  {
    title: "Deep Sleep Hypnosis",
    duration: "20 min", 
    icon: CloudSnow,
    category: "Sleep",
    color: "bg-purple-500"
  },
  {
    title: "Ocean Wave Sleep Meditation",
    duration: "30 min",
    icon: Waves,
    category: "Relaxation",
    color: "bg-blue-500"
  },
  {
    title: "Weighted Blanket Visualization",
    duration: "12 min",
    icon: Heart,
    category: "Comfort",
    color: "bg-pink-500"
  }
];

const MindfulnessSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with cloud-like gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 to-indigo-100"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Choose Your Mindful Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access a library of guided meditations, breathwork sessions, and sleep stories 
            designed to support your mental wellness every step of the way
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Meditation Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Mobile Interface Mockup */}
            <div className="relative order-2 lg:order-1">
              <div className="mx-auto w-80 h-[600px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-300 rounded-[2rem] overflow-hidden relative">
                  {/* Cloud background effect */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-10 w-16 h-8 bg-white rounded-full blur-sm"></div>
                    <div className="absolute top-32 right-8 w-20 h-10 bg-white rounded-full blur-sm"></div>
                    <div className="absolute bottom-40 left-6 w-24 h-12 bg-white rounded-full blur-sm"></div>
                  </div>
                  
                  <div className="p-6 relative z-10 h-full flex flex-col">
                    <div className="text-center text-white mb-8">
                      <h3 className="text-lg font-semibold mb-2">Good Evening</h3>
                      <p className="text-sm opacity-90">Time to unwind and relax</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-6">
                      <h4 className="text-white font-semibold mb-2">Now Playing</h4>
                      <p className="text-white/90 text-sm">Deep Sleep Hypnosis</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-white/30 rounded-full h-1">
                            <div className="bg-white h-1 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-white/80 mt-1">
                            <span>12:30</span>
                            <span>20:00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-white">
                      <p className="text-sm opacity-90 mb-4">Choose your mindful journey</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Meditation & Breathwork Library
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Access professionally crafted audio sessions designed to reduce stress, 
                  improve sleep, and enhance emotional well-being. Each session is integrated 
                  with your recovery journey.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border border-mindtalk-blue/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-mindtalk-blue rounded-full flex items-center justify-center mx-auto mb-2">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm">50+ Sessions</h4>
                    <p className="text-xs text-gray-600">Audio library</p>
                  </div>
                </Card>

                <Card className="p-4 border border-mindtalk-purple/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-mindtalk-purple rounded-full flex items-center justify-center mx-auto mb-2">
                      <Moon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm">Sleep Support</h4>
                    <p className="text-xs text-gray-600">Specialized content</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Meditation Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meditationSessions.map((session, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${session.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <session.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {session.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {session.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{session.duration}</span>
                    <div className="w-8 h-8 bg-mindtalk-orange rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <MindTalkButton variant="ai" size="lg">
              Explore Full Library
            </MindTalkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MindfulnessSection;
