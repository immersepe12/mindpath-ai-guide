
import HeroSection from "@/components/HeroSection";
import JourneysSection from "@/components/JourneysSection";
import DailyJourneySection from "@/components/DailyJourneySection";
import AISection from "@/components/AISection";
import DoctorBookingSection from "@/components/DoctorBookingSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <JourneysSection />
      <DailyJourneySection />
      <AISection />
      <DoctorBookingSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Index;
