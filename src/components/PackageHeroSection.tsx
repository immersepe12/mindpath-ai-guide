import { MindTalkButton } from "./ui/button-variants";
import { ArrowRight, LucideIcon } from "lucide-react";
import { scrollToForm } from "@/utils/scrollToForm";

interface PackageHeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  price: string;
  heroImage?: string;
}

const PackageHeroSection = ({
  title,
  subtitle,
  description,
  icon: Icon,
  gradient,
  features,
  price,
  heroImage
}: PackageHeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-16">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}></div>
      
      {/* Floating Icon */}
      <div className="hidden lg:block absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-white/20 flex items-center justify-center">
          <Icon className="w-8 h-8 xl:w-10 xl:h-10 text-white" />
        </div>
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center text-white">
          {/* Cadabams MindTalk Logo */}
          <div className="flex justify-center mb-8 sm:mb-10 mt-6 sm:mt-8">
            <img 
              src="/lovable-uploads/848a7388-361c-46c2-b31c-c02f1f5ce9e0.png" 
              alt="Cadabams MindTalk Logo"
              className="h-16 sm:h-24 md:h-28 lg:h-36 xl:h-40 w-auto object-contain"
              loading="eager"
              width="320"
              height="213"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white px-4">
            {title}
            <span className="block text-white">
              {subtitle}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
            {description}
          </p>

          <div className="flex justify-center items-center mb-8 sm:mb-12 px-4">
            <MindTalkButton 
              variant="hero" 
              size="hero" 
              className="bg-white text-mindtalk-orange hover:bg-white/90 shadow-2xl w-full sm:w-auto text-sm sm:text-base lg:text-lg px-6 sm:px-8 h-12 sm:h-14"
              onClick={scrollToForm}
            >
              <span className="hidden sm:inline">Start Your Recovery - {price}</span>
              <span className="sm:hidden">Start Recovery - {price}</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </MindTalkButton>
          </div>

          {/* Package Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center px-4 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="p-3 sm:p-4">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageHeroSection;