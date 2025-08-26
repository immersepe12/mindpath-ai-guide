
import { Card, CardContent } from "./ui/card";
import { Calendar, BookOpen, HeadphonesIcon, FileText, Pill, TrendingUp } from "lucide-react";

const AppShowcaseSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 px-4">
            Your Personal 90-Day Recovery Companion
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Track your progress through 200+ assessments, access 150+ breathwork sessions, and stay connected 
            with your therapy journey through our intuitive mobile app
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Main App Interface Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Track Your 90-Day Journey Progress
                </h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  See your recovery journey unfold day by day. Our "90 Days Emotional Reset" program 
                  breaks down your healing into manageable daily micro-tasks with clear progress tracking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Card className="p-3 sm:p-4 border border-mindtalk-orange/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-mindtalk-orange rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base">200+ Assessments</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Daily progress tracking</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 sm:p-4 border border-mindtalk-green/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-mindtalk-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <HeadphonesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base">150+ Breathwork</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Guided sessions & visualizations</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Mobile Mockup */}
            <div className="relative order-1 lg:order-2 flex justify-center">
              <div className="w-64 h-[480px] sm:w-72 sm:h-[540px] lg:w-80 lg:h-[600px] bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="text-center">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900">Good Morning</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Let's continue your 90-day journey</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-mindtalk-orange to-mindtalk-orange-light rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white">
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">90 Days Emotional Reset</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-full bg-white/30 rounded-full h-1.5 sm:h-2">
                          <div className="bg-white h-1.5 sm:h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-xs sm:text-sm">40%</span>
                      </div>
                      <p className="text-xs sm:text-sm opacity-90">Day 36 of 90 • Keep going!</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <Card className="p-2 sm:p-3 text-center">
                        <HeadphonesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-mindtalk-blue mx-auto mb-1 sm:mb-2" />
                        <p className="text-xs font-medium">Breathworks</p>
                      </Card>
                      <Card className="p-2 sm:p-3 text-center">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-mindtalk-green mx-auto mb-1 sm:mb-2" />
                        <p className="text-xs font-medium">Assessments</p>
                      </Card>
                      <Card className="p-2 sm:p-3 text-center">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-mindtalk-purple mx-auto mb-1 sm:mb-2" />
                        <p className="text-xs font-medium">Progress</p>
                      </Card>
                      <Card className="p-2 sm:p-3 text-center">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-mindtalk-orange mx-auto mb-1 sm:mb-2" />
                        <p className="text-xs font-medium">Daily Tasks</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-4 sm:p-6 text-center border-0 shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-mindtalk-orange rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">200+ Assessments</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Comprehensive mood tracking and progress assessments designed to personalize your 90-day journey
              </p>
            </Card>

            <Card className="p-4 sm:p-6 text-center border-0 shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-mindtalk-green rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <HeadphonesIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">150+ Breathwork Sessions</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Guided meditations, breathing exercises, and visualization sessions accessible anytime
              </p>
            </Card>

            <Card className="p-4 sm:p-6 text-center border-0 shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-mindtalk-blue rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Daily Micro-Tasks</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Small, manageable tasks designed to build lasting habits throughout your 90-day program
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
