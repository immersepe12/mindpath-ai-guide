import { Zap, Heart, Briefcase, Users, Brain, Moon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { MindTalkButton } from "./ui/button-variants";
import { Badge } from "./ui/badge";

const assessments = [
  {
    id: 1,
    title: "Stress & Anxiety Assessment",
    description: "Evaluate your current stress and anxiety levels with our comprehensive screening tool",
    icon: Zap,
    gradient: "from-blue-500 to-purple-600",
    duration: "5 minutes",
    questions: "15 questions",
    link: "/stress-anxiety",
    badges: ["Most Popular"]
  },
  {
    id: 2,
    title: "Depression Screening",
    description: "Understand your emotional state and identify signs of depression",
    icon: Heart,
    gradient: "from-pink-500 to-red-500",
    duration: "7 minutes",
    questions: "20 questions",
    link: "/depression"
  },
  {
    id: 3,
    title: "Burnout Assessment",
    description: "Assess your workplace stress and burnout risk factors",
    icon: Briefcase,
    gradient: "from-orange-500 to-amber-600",
    duration: "6 minutes",
    questions: "18 questions",
    link: "/workplace"
  },
  {
    id: 4,
    title: "Relationship Health Check",
    description: "Evaluate the health of your personal relationships and communication patterns",
    icon: Users,
    gradient: "from-green-500 to-emerald-600",
    duration: "8 minutes",
    questions: "22 questions",
    link: "/relationships"
  },
  {
    id: 5,
    title: "General Mental Wellness",
    description: "Comprehensive assessment of your overall mental health and wellbeing",
    icon: Brain,
    gradient: "from-indigo-500 to-blue-600",
    duration: "10 minutes",
    questions: "30 questions",
    link: "/"
  },
  {
    id: 6,
    title: "Sleep Quality Assessment",
    description: "Analyze your sleep patterns and identify potential sleep disorders",
    icon: Moon,
    gradient: "from-purple-500 to-pink-600",
    duration: "5 minutes",
    questions: "12 questions",
    link: "/"
  }
];

const AssessmentsGrid = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Choose Your Assessment
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the assessment that best matches your current needs. All assessments are free, 
              confidential, and provide instant personalized results.
            </p>
          </div>

          {/* Assessments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {assessments.map((assessment) => {
              const IconComponent = assessment.icon;
              
              return (
                <Card 
                  key={assessment.id}
                  className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-mindtalk-orange/20"
                >
                  <CardHeader>
                    {/* Icon with Gradient */}
                    <div className="mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${assessment.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Badges */}
                    {assessment.badges && assessment.badges.length > 0 && (
                      <div className="flex gap-2 mb-2">
                        {assessment.badges.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="bg-mindtalk-orange/10 text-mindtalk-orange">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <CardTitle className="text-xl sm:text-2xl mb-2">
                      {assessment.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm sm:text-base">
                      {assessment.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <span className="text-mindtalk-blue">⏱</span>
                        <span>{assessment.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-mindtalk-green">📋</span>
                        <span>{assessment.questions}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <MindTalkButton
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = assessment.link}
                    >
                      Start Assessment
                    </MindTalkButton>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-10 sm:mt-12 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl mx-auto">
              <strong>Disclaimer:</strong> These assessments are screening tools and not diagnostic instruments. 
              Results should not replace professional medical advice. Consult with a licensed mental health 
              professional for accurate diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentsGrid;
