
import HeroSection from "@/components/HeroSection";
import JourneysSection from "@/components/JourneysSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import DailyJourneySection from "@/components/DailyJourneySection";
import MindfulnessSection from "@/components/MindfulnessSection";
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
      <AppShowcaseSection />
      <DailyJourneySection />
      <MindfulnessSection />
      <AISection />
      <DoctorBookingSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Index;
