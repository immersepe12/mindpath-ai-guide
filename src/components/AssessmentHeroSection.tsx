import { ClipboardCheck } from "lucide-react";
import { MindTalkButton } from "./ui/button-variants";
import { scrollToForm } from "@/utils/scrollToForm";

const AssessmentHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-mindtalk-blue via-mindtalk-green to-mindtalk-orange overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg">
              <ClipboardCheck className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
            Understand Your Mental Health in Minutes
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-medium mb-6 sm:mb-8">
            Free Professional Assessments to Guide Your Recovery Journey
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Take our evidence-based mental health screenings created by licensed therapists. 
            Get personalized insights and recommendations for your path to wellness.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 text-white/90">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm sm:text-base">Free & Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm sm:text-base">5-10 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm sm:text-base">Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm sm:text-base">Expert-Designed</span>
            </div>
          </div>

          {/* CTA */}
          <MindTalkButton
            variant="hero"
            size="hero"
            onClick={scrollToForm}
            className="bg-white text-mindtalk-orange hover:bg-white/90 shadow-2xl hover:shadow-3xl"
          >
            Start Free Assessment
          </MindTalkButton>
        </div>
      </div>
    </section>
  );
};

export default AssessmentHeroSection;
