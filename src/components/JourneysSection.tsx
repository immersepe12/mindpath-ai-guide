import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Briefcase, Users, Zap, CheckCircle, Clock, Target } from "lucide-react";
import TherapySessionHighlight from "./TherapySessionHighlight";
import { scrollToForm } from "@/utils/scrollToForm";
import { Link } from "react-router-dom";

const journeys = [
  {
    id: 1,
    title: "Stress & Anxiety",
    description: "Transform overwhelming feelings into calm confidence with daily mindfulness practices and expert guidance",
    icon: Zap,
    gradient: "from-blue-500 to-purple-600",
    features: ["Breathing techniques", "Cognitive restructuring", "Panic management", "Sleep improvement"],
    duration: "90 days",
    sessions: "12 therapy sessions",
    link: "/stress-anxiety"
  },
  {
    id: 2,
    title: "Depression/Emotional Reset",
    description: "Rebuild emotional strength and rediscover joy through structured healing and professional support",
    icon: Heart,
    gradient: "from-pink-500 to-red-500",
    features: ["Mood tracking", "Behavioral activation", "Thought patterns", "Energy building"],
    duration: "90 days",
    sessions: "12 therapy sessions",
    link: "/depression"
  },
  {
    id: 3,
    title: "Relationships & Family",
    description: "Strengthen bonds and improve communication with loved ones through targeted relationship skills",
    icon: Users,
    gradient: "from-green-500 to-emerald-600",
    features: ["Communication skills", "Boundary setting", "Conflict resolution", "Emotional intelligence"],
    duration: "90 days",
    sessions: "12 therapy sessions",
    link: "/relationships"
  },
  {
    id: 4,
    title: "Workplace/Burnout",
    description: "Regain work-life balance and professional satisfaction while preventing future burnout",
    icon: Briefcase,
    gradient: "from-orange-500 to-amber-600",
    features: ["Time management", "Stress reduction", "Career clarity", "Energy restoration"],
    duration: "90 days",
    sessions: "12 therapy sessions",
    link: "/workplace"
  }
];

const JourneysSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 px-4">
            Choose Your 90-Day Recovery Path
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Each journey includes 200+ assessments, 150+ breathwork sessions, and 12 expert therapy sessions 
            tailored to your specific mental health goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {journeys.map((journey, index) => (
            <Link key={journey.id} to={journey.link} className="block">
              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border-0 shadow-lg cursor-pointer">
              <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${journey.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300`}>
                  <journey.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {journey.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {journey.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{journey.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{journey.sessions}</span>
                    <span className="sm:hidden">12 sessions</span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-6">
                  {journey.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 sm:gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-mindtalk-green flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
            All journeys are part of your complete 90-day recovery program
          </p>
          <MindTalkButton 
            variant="hero" 
            size="lg" 
            className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8"
            onClick={scrollToForm}
          >
            <span className="hidden sm:inline">Start Your 90-Day Journey - ₹4,499</span>
            <span className="sm:hidden">Start Journey - ₹4,499</span>
          </MindTalkButton>
        </div>
      </div>
    </section>
  );
};

export default JourneysSection;
