
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Play, Moon, Waves, CloudSnow, Heart } from "lucide-react";

const meditationSessions = [{
  title: "Guided Nighttime Body Scan",
  duration: "15 min",
  icon: Moon,
  category: "Sleep",
  color: "bg-indigo-500"
}, {
  title: "Deep Sleep Hypnosis",
  duration: "20 min",
  icon: CloudSnow,
  category: "Sleep",
  color: "bg-purple-500"
}, {
  title: "Ocean Wave Sleep Meditation",
  duration: "30 min",
  icon: Waves,
  category: "Relaxation",
  color: "bg-blue-500"
}, {
  title: "Weighted Blanket Visualization",
  duration: "12 min",
  icon: Heart,
  category: "Comfort",
  color: "bg-pink-500"
}];

const MindfulnessSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mindfulness & Meditation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover inner peace with our curated meditation sessions designed to reduce anxiety, improve sleep, and enhance overall well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {meditationSessions.map((session, index) => {
            const IconComponent = session.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full ${session.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {session.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
                      {session.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {session.duration}
                    </p>
                  </div>

                  <MindTalkButton 
                    variant="outline" 
                    className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Session
                  </MindTalkButton>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <MindTalkButton variant="ai" size="lg">
            Explore All Sessions
          </MindTalkButton>
        </div>
      </div>
    </section>
  );
};

export default MindfulnessSection;
