import { Lock, CheckCircle, Zap, Target, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

const benefits = [
  {
    icon: Lock,
    title: "Confidential & Private",
    description: "Your responses are completely secure and never shared without your consent",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: CheckCircle,
    title: "Professionally Designed",
    description: "Created by licensed mental health experts using evidence-based methods",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get immediate feedback and insights about your mental health status",
    gradient: "from-pink-500 to-red-500"
  },
  {
    icon: Target,
    title: "Personalized Recommendations",
    description: "Receive tailored next steps and journey recommendations for your needs",
    gradient: "from-orange-500 to-amber-600"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your mental health over time by retaking assessments periodically",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: DollarSign,
    title: "Completely Free",
    description: "No credit card required, no hidden fees - just free professional assessments",
    gradient: "from-indigo-500 to-blue-600"
  }
];

const AssessmentBenefits = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Take Our Assessments?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Our mental health assessments are designed with your wellbeing in mind, 
              providing professional insights in a safe and supportive environment.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border hover:border-mindtalk-orange/20"
                >
                  <CardHeader>
                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <CardTitle className="text-lg sm:text-xl mb-2">
                      {benefit.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentBenefits;
