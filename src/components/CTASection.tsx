
import { MindTalkButton } from "./ui/button-variants";
import { ArrowRight, Clock, Shield, Heart, Download } from "lucide-react";
import { scrollToForm } from "@/utils/scrollToForm";

const CTASection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-healing"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
            Your 90-Day Mental Health Journey
            <span className="block">Starts Today</span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto px-4">
            Don't wait for tomorrow. Take the first step towards better mental health with 
            our proven 90-day recovery program with AI support and expert therapy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <MindTalkButton 
              variant="hero" 
              size="hero" 
              className="bg-white text-mindtalk-orange hover:bg-white/90 shadow-2xl w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 h-12 sm:h-14"
              onClick={scrollToForm}
            >
              <Heart className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline"><span className="hidden sm:inline">Start Your 90-Day Journey - ₹7,799</span></span>
              <span className="sm:hidden"><span className="sm:hidden">Start Journey - ₹7,799</span></span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </MindTalkButton>
            <MindTalkButton 
              variant="outline" 
              size="hero"
              className="border-white bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 h-12 sm:h-14"
              onClick={() => window.open('https://link-to.app/TMoa8H6NOL', '_blank')}
            >
              <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Download App
            </MindTalkButton>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-3 sm:p-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 flex-shrink-0" />
              <span className="text-sm sm:text-base text-white/90">Start immediately</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-3 sm:p-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 flex-shrink-0" />
              <span className="text-sm sm:text-base text-white/90">30-day money back</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-3 sm:p-0">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 flex-shrink-0" />
              <span className="text-sm sm:text-base text-white/90">200+ assessments included</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/70 px-4 max-w-2xl mx-auto">
            By clicking "Start Your 90-Day Journey", you agree to our Terms of Service and Privacy Policy. 
            Your mental health data is protected with end-to-end encryption.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
