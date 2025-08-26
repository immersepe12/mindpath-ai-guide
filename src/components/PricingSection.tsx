
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Check, X, Crown, Heart } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 px-4">
            Revolutionary Value
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Traditional therapy costs ₹1,250-1,500 per session. Get 12 sessions + AI support + daily guidance for just ₹4,499
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Traditional Therapy */}
            <Card className="border-2 border-gray-200 shadow-md">
              <CardHeader className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <X className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-gray-900">Traditional Therapy</CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600">Individual sessions only</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">₹15,000</div>
                  <div className="text-sm sm:text-base text-gray-600">For 12 sessions</div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">12 therapy sessions</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">No daily guidance</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">No AI support</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">No progress tracking</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">No micro-tasks</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Limited accessibility</span>
                  </div>
                </div>

                <MindTalkButton variant="outline" className="w-full mt-4 sm:mt-6 text-sm sm:text-base" disabled>
                  Old Approach
                </MindTalkButton>
              </CardContent>
            </Card>

            {/* MindTalk Package */}
            <Card className="border-2 border-mindtalk-orange shadow-xl relative overflow-hidden">
              {/* Premium Badge */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-mindtalk-orange text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                Best Value
              </div>
              
              <CardHeader className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full gradient-healing flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-gray-900">MindTalk Complete</CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600">90-day recovery journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-mindtalk-orange mb-1 sm:mb-2">₹4,499</div>
                  <div className="text-sm sm:text-base text-gray-600">Complete 90-day program</div>
                  <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mt-2 inline-block">
                    Save 70%
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">12 expert therapy sessions</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">90 days of daily micro-tasks</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">24/7 AI Deep Agent support</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Real-time progress tracking</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Personalized assessments</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Breathwork & meditation</span>
                  </div>
                </div>

                <MindTalkButton variant="hero" size="lg" className="w-full animate-pulse-slow mt-4 sm:mt-6 text-sm sm:text-base">
                  <Heart className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Start Your Recovery
                </MindTalkButton>
              </CardContent>
            </Card>
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-8 sm:mt-12 p-4 sm:p-6 bg-green-50 rounded-xl sm:rounded-2xl border border-green-200">
            <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">30-Day Money Back Guarantee</h3>
            <p className="text-sm sm:text-base text-green-700">
              Not satisfied with your progress? Get a full refund within 30 days, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
