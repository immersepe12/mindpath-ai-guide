
import { MindTalkButton } from "./ui/button-variants";
import { ArrowRight, Brain, Heart, Sparkles } from "lucide-react";
import { scrollToForm } from "@/utils/scrollToForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-healing"></div>
      
      {/* Floating Elements - Hidden on mobile for better performance */}
      <div className="hidden lg:block absolute top-20 left-10 animate-float">
        <div className="w-12 h-12 xl:w-16 xl:h-16 rounded-full bg-white/20 flex items-center justify-center">
          <Brain className="w-6 h-6 xl:w-8 xl:h-8 text-white" />
        </div>
      </div>
      <div className="hidden lg:block absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-white/20 flex items-center justify-center">
          <Heart className="w-5 h-5 xl:w-6 xl:h-6 text-white" />
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles className="w-8 h-8 xl:w-10 xl:h-10 text-white" />
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center text-white">
          {/* Cadabams MindTalk Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <img 
              src="/lovable-uploads/9fc56fae-65b1-47d5-a395-30bc7c73d5b1.png" 
              alt="Cadabams MindTalk Logo"
              className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white px-4">
            Your Complete
            <span className="block text-white">
              90-Day Recovery Journey
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
            World's first AI-powered mental health program with expert therapy support. Complete recovery for just ₹4,499
          </p>

          <div className="flex justify-center items-center mb-8 sm:mb-12 px-4">
            <MindTalkButton 
              variant="hero" 
              size="hero" 
              className="bg-white text-mindtalk-orange hover:bg-white/90 shadow-2xl w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 h-12 sm:h-14"
              onClick={scrollToForm}
            >
              <span className="hidden sm:inline">Start Your 90-Day Journey</span>
              <span className="sm:hidden">Start Journey</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </MindTalkButton>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center px-4 max-w-4xl mx-auto">
            <div className="p-3 sm:p-4">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">12 Sessions</div>
              <div className="text-sm sm:text-base text-white/80">Expert therapy sessions over 90 days</div>
            </div>
            <div className="p-3 sm:p-4">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">200+ Resources</div>
              <div className="text-sm sm:text-base text-white/80">Assessments, breathwork & visualizations</div>
            </div>
            <div className="p-3 sm:p-4">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">₹4,499</div>
              <div className="text-sm sm:text-base text-white/80">Complete 90-day recovery package</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
