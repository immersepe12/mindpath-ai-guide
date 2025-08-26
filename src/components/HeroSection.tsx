
import { MindTalkButton } from "./ui/button-variants";
import { ArrowRight, Brain, Heart, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-healing"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <Brain className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Cadabams MindTalk Branding */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Brain className="w-8 h-8" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold">Cadabams</h1>
              <p className="text-xl font-semibold text-white/90">MindTalk</p>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            Your Complete
            <span className="block text-white">
              90-Day Recovery Journey
            </span>
          </h2>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            World's first AI-powered mental health program with 200+ assessments, 
            150+ breathwork sessions, and expert therapy support. Complete recovery for just ₹4,499
          </p>

          <div className="flex justify-center items-center mb-12">
            <MindTalkButton variant="hero" size="hero" className="bg-white text-mindtalk-orange hover:bg-white/90 shadow-2xl">
              Start Your 90-Day Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </MindTalkButton>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">12 Sessions</div>
              <div className="text-white/80">Expert therapy sessions over 90 days</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">200+ Resources</div>
              <div className="text-white/80">Assessments, breathwork & visualizations</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">₹4,499</div>
              <div className="text-white/80">Complete 90-day recovery package</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
