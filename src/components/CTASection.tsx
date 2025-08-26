
import { MindTalkButton } from "./ui/button-variants";
import { ArrowRight, Clock, Shield, Heart } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-healing"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Mental Health Journey
            <span className="block">Starts Today</span>
          </h2>
          
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Don't wait for tomorrow. Take the first step towards better mental health with 
            our proven 90-day recovery program.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <MindTalkButton 
              variant="hero" 
              size="hero" 
              className="bg-white text-mindtalk-orange hover:bg-white/90 shadow-2xl"
            >
              <Heart className="mr-2 w-5 h-5" />
              Start Recovery Journey - ₹4,499
              <ArrowRight className="ml-2 w-5 h-5" />
            </MindTalkButton>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-white/80" />
              <span className="text-white/90">Start immediately</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-6 h-6 text-white/80" />
              <span className="text-white/90">30-day money back</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-6 h-6 text-white/80" />
              <span className="text-white/90">Expert support 24/7</span>
            </div>
          </div>

          <p className="text-sm text-white/70">
            By clicking "Start Recovery Journey", you agree to our Terms of Service and Privacy Policy. 
            Your mental health data is protected with end-to-end encryption.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
