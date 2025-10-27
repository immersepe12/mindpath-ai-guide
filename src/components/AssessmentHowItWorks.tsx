import { CheckSquare, Edit3, BarChart, ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Select Assessment",
    description: "Choose the quiz that matches your needs",
    icon: CheckSquare,
    color: "from-blue-500 to-purple-600"
  },
  {
    number: 2,
    title: "Answer Questions",
    description: "Respond honestly in 5-10 minutes",
    icon: Edit3,
    color: "from-purple-500 to-pink-600"
  },
  {
    number: 3,
    title: "Get Results",
    description: "Receive instant, personalized insights",
    icon: BarChart,
    color: "from-pink-500 to-red-500"
  },
  {
    number: 4,
    title: "Take Action",
    description: "Get recommendations for your recovery journey",
    icon: ArrowRight,
    color: "from-orange-500 to-amber-600"
  }
];

const AssessmentHowItWorks = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Taking a mental health assessment is simple and straightforward. 
              Follow these four easy steps to get started.
            </p>
          </div>

          {/* Steps - Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-20" />
              
              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  
                  return (
                    <div key={step.number} className="relative">
                      {/* Step Number Circle */}
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-40 h-40 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl mb-6 relative z-10`}>
                          <IconComponent className="w-16 h-16 text-white" />
                        </div>
                        
                        <div className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg font-bold text-lg z-20">
                          {step.number}
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {step.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Steps - Mobile Vertical */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <div key={step.number} className="relative">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative`}>
                        <IconComponent className="w-8 h-8 text-white" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md font-bold text-sm">
                          {step.number}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="ml-8 h-8 w-1 bg-gradient-to-b from-muted to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentHowItWorks;
