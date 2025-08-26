
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
    <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mindfulness & Meditation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover inner peace with our guided meditation sessions designed to reduce stress and improve sleep quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {meditationSessions.map((session, index) => {
            const IconComponent = session.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${session.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                    {session.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                    {session.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{session.duration}</span>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <Play className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <MindTalkButton variant="ai" size="lg">
            Explore All Sessions
          </MindTalkButton>
        </div>
      </div>
    </section>
  );
};

export default MindfulnessSection;
