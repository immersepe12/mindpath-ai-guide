
import { Card, CardContent } from "./ui/card";
import { Play, Calendar, BookOpen, HeadphonesIcon, FileText, Pill } from "lucide-react";

const AppShowcaseSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Your Personal Recovery Companion
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your progress, access expert resources, and stay connected with your therapy journey 
            through our intuitive mobile app
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main App Interface Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Track Your Journey Progress
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  See your recovery journey unfold day by day. Our "30 Days Emotional Reset" program 
                  breaks down your healing into manageable daily micro-tasks with clear progress tracking.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border border-mindtalk-orange/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mindtalk-orange rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Daily Tasks</h4>
                      <p className="text-sm text-gray-600">Micro-tasks & assessments</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border border-mindtalk-green/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mindtalk-green rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Progress Tracking</h4>
                      <p className="text-sm text-gray-600">Visual journey completion</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Mobile Mockup Placeholder */}
            <div className="relative">
              <div className="mx-auto w-80 h-[600px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                  <div className="p-6 space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-900">Good Morning</h4>
                      <p className="text-sm text-gray-600">Let's continue your journey</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-mindtalk-orange to-mindtalk-orange-light rounded-2xl p-4 text-white">
                      <h3 className="font-semibold mb-2">30 Days Emotional Reset</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm">40%</span>
                      </div>
                      <p className="text-sm opacity-90">Day 12 of 30 • Keep going!</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Card className="p-3 text-center">
                        <HeadphonesIcon className="w-6 h-6 text-mindtalk-blue mx-auto mb-2" />
                        <p className="text-xs font-medium">Breathworks</p>
                      </Card>
                      <Card className="p-3 text-center">
                        <FileText className="w-6 h-6 text-mindtalk-green mx-auto mb-2" />
                        <p className="text-xs font-medium">Assessments</p>
                      </Card>
                      <Card className="p-3 text-center">
                        <Pill className="w-6 h-6 text-mindtalk-purple mx-auto mb-2" />
                        <p className="text-xs font-medium">Prescriptions</p>
                      </Card>
                      <Card className="p-3 text-center">
                        <Play className="w-6 h-6 text-mindtalk-orange mx-auto mb-2" />
                        <p className="text-xs font-medium">Videos</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center border-0 shadow-lg">
              <div className="w-16 h-16 bg-mindtalk-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Daily Micro-Tasks</h3>
              <p className="text-gray-600">
                Small, manageable tasks designed to build lasting habits and promote continuous healing
              </p>
            </Card>

            <Card className="p-6 text-center border-0 shadow-lg">
              <div className="w-16 h-16 bg-mindtalk-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Audio & Video Resources</h3>
              <p className="text-gray-600">
                Guided meditations, breathwork sessions, and educational content accessible anytime
              </p>
            </Card>

            <Card className="p-6 text-center border-0 shadow-lg">
              <div className="w-16 h-16 bg-mindtalk-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Assessments</h3>
              <p className="text-gray-600">
                Regular mood tracking and progress assessments that help personalize your journey
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
