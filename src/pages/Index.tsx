import HeroSection from "@/components/HeroSection";
import JourneysSection from "@/components/JourneysSection";
import DailyJourneySection from "@/components/DailyJourneySection";
import TherapySessionHighlight from "@/components/TherapySessionHighlight";
import AISection from "@/components/AISection";
import DoctorBookingSection from "@/components/DoctorBookingSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LeadCaptureForm />
      <DailyJourneySection />
      <TherapySessionHighlight variant="journeys" />
      <AISection />
      <JourneysSection />
      <DoctorBookingSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Index;
