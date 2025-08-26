
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Briefcase, Users, Zap, CheckCircle, Clock, Target } from "lucide-react";

const journeys = [
  {
    id: 1,
    title: "Stress & Anxiety",
    description: "Transform overwhelming feelings into calm confidence with daily mindfulness practices and expert guidance",
    icon: Zap,
    gradient: "from-blue-500 to-purple-600",
    features: ["Breathing techniques", "Cognitive restructuring", "Panic management", "Sleep improvement"],
    duration: "30 days",
    sessions: "Weekly check-ins"
  },
  {
    id: 2,
    title: "Depression/Emotional Reset",
    description: "Rebuild emotional strength and rediscover joy through structured healing and professional support",
    icon: Heart,
    gradient: "from-pink-500 to-red-500",
    features: ["Mood tracking", "Behavioral activation", "Thought patterns", "Energy building"],
    duration: "30 days",
    sessions: "Bi-weekly sessions"
  },
  {
    id: 3,
    title: "Relationships & Family",
    description: "Strengthen bonds and improve communication with loved ones through targeted relationship skills",
    icon: Users,
    gradient: "from-green-500 to-emerald-600",
    features: ["Communication skills", "Boundary setting", "Conflict resolution", "Emotional intelligence"],
    duration: "30 days",
    sessions: "Weekly coaching"
  },
  {
    id: 4,
    title: "Workplace/Burnout",
    description: "Regain work-life balance and professional satisfaction while preventing future burnout",
    icon: Briefcase,
    gradient: "from-orange-500 to-amber-600",
    features: ["Time management", "Stress reduction", "Career clarity", "Energy restoration"],
    duration: "30 days",
    sessions: "Weekly mentoring"
  }
];

const JourneysSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Choose Your Recovery Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each journey is carefully crafted with daily micro-tasks, assessments, and expert sessions 
            tailored to your specific mental health goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {journeys.map((journey, index) => (
            <Card key={journey.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${journey.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <journey.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {journey.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {journey.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {journey.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {journey.sessions}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {journey.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-mindtalk-green flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <MindTalkButton 
                  variant="journey" 
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                >
                  Start This Journey
                </MindTalkButton>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Can't decide? Our AI will recommend the perfect journey combination for you
          </p>
          <MindTalkButton variant="outline" size="lg">
            Get AI Recommendation
          </MindTalkButton>
        </div>
      </div>
    </section>
  );
};

export default JourneysSection;
