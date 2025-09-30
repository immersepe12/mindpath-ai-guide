
import Navigation from "@/components/Navigation";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import WhatsAppFloating from "@/components/WhatsAppFloating";
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
import LeadDebugger from "@/components/LeadDebugger";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <StickyMobileCTA />
      <WhatsAppFloating />
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
      <LeadDebugger />
    </div>
  );
};

export default Index;
