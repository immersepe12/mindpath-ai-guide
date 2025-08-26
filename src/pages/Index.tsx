
import Navigation from "@/components/Navigation";
import StickyMobileCTA from "@/components/StickyMobileCTA";
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
      <Navigation />
      <StickyMobileCTA />
      <div id="hero">
        <HeroSection />
      </div>
      <LeadCaptureForm />
      <div id="daily-journey">
        <DailyJourneySection />
      </div>
      <TherapySessionHighlight variant="journeys" />
      <div id="ai-section">
        <AISection />
      </div>
      <div id="journeys">
        <JourneysSection />
      </div>
      <div id="doctor-booking">
        <DoctorBookingSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <CTASection />
    </div>
  );
};

export default Index;
