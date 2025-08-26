
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Check, X, Crown, Heart } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Revolutionary Value
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional therapy costs ₹1,250-1,500 per session. Get 12 sessions + AI support + daily guidance for just ₹4,499
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional Therapy */}
            <Card className="border-2 border-gray-200 shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-gray-400" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Traditional Therapy</CardTitle>
                <CardDescription className="text-gray-600">Individual sessions only</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">₹15,000</div>
                  <div className="text-gray-600">For 12 sessions</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">12 therapy sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">No daily guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">No AI support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">No progress tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">No micro-tasks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">Limited accessibility</span>
                  </div>
                </div>

                <MindTalkButton variant="outline" className="w-full" disabled>
                  Old Approach
                </MindTalkButton>
              </CardContent>
            </Card>

            {/* MindTalk Package */}
            <Card className="border-2 border-mindtalk-orange shadow-xl relative overflow-hidden">
              {/* Premium Badge */}
              <div className="absolute top-4 right-4 bg-mindtalk-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                Best Value
              </div>
              
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full gradient-healing flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">MindTalk Complete</CardTitle>
                <CardDescription className="text-gray-600">90-day recovery journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-mindtalk-orange mb-2">₹4,499</div>
                  <div className="text-gray-600">Complete 90-day program</div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mt-2 inline-block">
                    Save 70%
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">12 expert therapy sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">90 days of daily micro-tasks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">24/7 AI Deep Agent support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Real-time progress tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Personalized assessments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Breathwork & meditation</span>
                  </div>
                </div>

                <MindTalkButton variant="hero" size="lg" className="w-full animate-pulse-slow">
                  <Heart className="mr-2 w-5 h-5" />
                  Start Your Recovery
                </MindTalkButton>
              </CardContent>
            </Card>
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-12 p-6 bg-green-50 rounded-2xl border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-2">30-Day Money Back Guarantee</h3>
            <p className="text-green-700">
              Not satisfied with your progress? Get a full refund within 30 days, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
