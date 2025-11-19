import { Brain, Heart, Sparkles, Smartphone } from "lucide-react";
import { MindTalkButton } from "./ui/button-variants";
import { scrollToSection } from "@/utils/scrollToSection";

const AppHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-healing">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20 animate-float hidden lg:block">
          <Brain className="w-24 h-24 text-white" />
        </div>
        <div className="absolute top-40 right-20 opacity-20 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
          <Heart className="w-20 h-20 text-white" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-20 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
          <Sparkles className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-20 right-40 opacity-20 animate-float hidden lg:block" style={{ animationDelay: "1.5s" }}>
          <Smartphone className="w-20 h-20 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/0a99fb1e-f879-44b2-bb75-a5250bb2c95a.png" 
              alt="Cadabams MindTalk Logo" 
              className="h-16 md:h-20"
            />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Your Complete Mental Health Platform
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            AI-powered journaling, 24/7 DeepAgent support, structured recovery programs, 
            and expert therapy - all seamlessly integrated in one beautiful app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <MindTalkButton 
              variant="hero" 
              size="hero"
              onClick={() => scrollToSection('app-features')}
              className="bg-white text-primary hover:bg-white/90"
            >
              Explore Features
            </MindTalkButton>
            <MindTalkButton 
              variant="outline" 
              size="hero"
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.open('https://link-to.app/TMoa8H6NOL', '_blank')}
            >
              Download App
            </MindTalkButton>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/90">AI DeepAgent Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-white/90">Guided Resources</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">12</div>
              <div className="text-white/90">Expert Sessions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppHeroSection;
