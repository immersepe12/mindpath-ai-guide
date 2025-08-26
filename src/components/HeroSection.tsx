
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
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">MindTalk</h1>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Complete
            <span className="block gradient-warm bg-clip-text text-transparent">
              90-Day Recovery Journey
            </span>
          </h2>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            World's first AI-powered mental health program that combines personalized daily micro-tasks 
            with expert therapy sessions for just ₹4,499
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <MindTalkButton variant="hero" size="hero" className="bg-white text-mindtalk-orange hover:bg-white/90">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </MindTalkButton>
            <MindTalkButton variant="outline" size="hero" className="border-white text-white hover:bg-white hover:text-mindtalk-orange">
              Watch Demo
            </MindTalkButton>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">12 Sessions</div>
              <div className="text-white/80">Expert therapy sessions worth ₹15,000</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">90 Days</div>
              <div className="text-white/80">Daily AI-guided micro-tasks</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold mb-2">₹4,499</div>
              <div className="text-white/80">Complete recovery package</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
