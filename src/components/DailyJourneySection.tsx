
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Trophy, Star, CheckCircle, Info, Calendar, Target } from "lucide-react";
import { Progress } from "./ui/progress";

const DailyJourneySection = () => {
  // Generate 90 days for the calendar
  const generateDays = () => {
    const days = [];
    for (let i = 1; i <= 90; i++) {
      let status = 'future';
      if (i <= 15) status = 'completed';
      else if (i === 16) status = 'current';
      
      days.push({
        day: i,
        status,
        hasStars: i <= 15
      });
    }
    return days;
  };

  const days = generateDays();

  const dailyTasks = [
    {
      title: "The Role of Guilt",
      subtitle: "Assessment for Building Emotional Strength and Rewriting the Script",
      type: "Assessment Required",
      buttonText: "Start",
      completed: false
    },
    {
      title: "What guilt isn't actually mine to carry?",
      subtitle: "Reflection",
      type: "Assessment Required", 
      buttonText: "Start",
      completed: false
    },
    {
      title: "Cold Water Visualization",
      subtitle: "3:55",
      type: "Audio Required",
      buttonText: "Listen",
      completed: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Experience Your Daily Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly how your 90-day recovery unfolds with daily micro-tasks, 
            progress tracking, and gamified achievements that keep you motivated
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Mobile App Interface */}
            <div className="relative">
              <div className="mx-auto w-80 h-[700px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-b from-mindtalk-orange to-mindtalk-orange rounded-[2rem] overflow-hidden relative">
                  
                  {/* Status Bar */}
                  <div className="flex justify-between items-center p-4 text-white text-sm">
                    <span>3:55</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-white rounded"></div>
                        <div className="w-1 h-3 bg-white rounded"></div>
                        <div className="w-1 h-3 bg-white rounded"></div>
                        <div className="w-1 h-3 bg-white/50 rounded"></div>
                      </div>
                      <span>📶</span>
                      <span>📶</span>
                      <span className="bg-yellow-400 text-black px-1 rounded text-xs">66</span>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="px-4 pb-4">
                    <div className="flex justify-between items-center text-white">
                      <h3 className="text-lg font-semibold">Your Journey</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">15 Stars</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Card */}
                  <div className="mx-4 mb-4">
                    <Card className="bg-white/95 border-0">
                      <CardContent className="p-4">
                        <h4 className="text-mindtalk-orange font-semibold mb-3">90 days Emotional Reset</h4>
                        <Progress value={50} className="mb-2" />
                        <p className="text-sm text-gray-600 mb-2">50% Complete</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Trophy className="w-4 h-4" />
                          <span>45/90 Days</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Current Day */}
                  <div className="mx-4 mb-4">
                    <Card className="bg-white/95 border-0">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-mindtalk-orange mb-1">Day 16 - August 20, 2025</h4>
                        <p className="text-sm text-mindtalk-green mb-3">Available now</p>
                        
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-600">Tasks Completed:</span>
                          <span className="text-sm font-medium text-mindtalk-orange">0/3</span>
                        </div>
                        <Progress value={0} className="mb-4" />

                        {/* Sample Task */}
                        <div className="space-y-3">
                          <div className="border rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-900">The Role of Guilt</h5>
                              <Info className="w-4 h-4 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-600 mb-2">Assessment for Building Emotional Strength</p>
                            <p className="text-xs text-mindtalk-orange font-medium mb-3">Assessment Required</p>
                            <button className="w-full bg-mindtalk-orange text-white py-2 rounded-lg text-sm font-medium">
                              Start
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Journey Calendar Preview */}
                  <div className="mx-4">
                    <Card className="bg-white/95 border-0">
                      <CardContent className="p-4">
                        <h4 className="text-mindtalk-orange font-semibold mb-3">Journey Calendar</h4>
                        <div className="grid grid-cols-7 gap-1">
                          {days.slice(0, 21).map((day) => (
                            <div key={day.day} className="text-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                day.status === 'completed' 
                                  ? 'bg-mindtalk-orange text-white' 
                                  : day.status === 'current'
                                  ? 'bg-mindtalk-green text-white font-bold'
                                  : 'bg-gray-300 text-gray-500'
                              }`}>
                                {day.status === 'completed' && <Star className="w-3 h-3 fill-white" />}
                                {day.status === 'current' && day.day}
                                {day.status === 'future' && day.day}
                              </div>
                              <span className="text-xs text-gray-500 mt-1 block">Day {day.day}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Your Personal Recovery Journey
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Experience a gamified 90-day journey where every day brings you closer to emotional wellness. 
                  Track your progress, earn stars, and build lasting habits through daily micro-tasks.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 border border-mindtalk-orange/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mindtalk-orange rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">90-Day Calendar</h4>
                      <p className="text-sm text-gray-600">Visual progress tracking</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-mindtalk-green/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mindtalk-green rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Earn Stars</h4>
                      <p className="text-sm text-gray-600">Daily achievements</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-mindtalk-blue/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mindtalk-blue rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Daily Tasks</h4>
                      <p className="text-sm text-gray-600">Structured micro-tasks</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-mindtalk-purple/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mindtalk-purple rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Progress Tracking</h4>
                      <p className="text-sm text-gray-600">Real-time insights</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sample Daily Tasks */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Sample Daily Tasks (Day 16)
                </h4>
                <div className="space-y-4">
                  {dailyTasks.map((task, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{task.title}</h5>
                          <Info className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.subtitle}</p>
                        <p className="text-sm text-mindtalk-orange font-medium mb-3">{task.type}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Part of your daily journey</span>
                          <button className="bg-mindtalk-orange text-white px-4 py-1 rounded-lg text-sm">
                            {task.buttonText}
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <MindTalkButton variant="hero" size="lg">
                  Start Your 90-Day Journey - ₹4,499
                </MindTalkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyJourneySection;
