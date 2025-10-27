
import Navigation from "@/components/Navigation";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import HeroSection from "@/components/HeroSection";
import ThreePillarsSection from "@/components/ThreePillarsSection";
import JournalingFeatureSection from "@/components/JournalingFeatureSection";
import AISection from "@/components/AISection";
import DailyJourneySection from "@/components/DailyJourneySection";
import JourneysSection from "@/components/JourneysSection";
import IntegrationFlowSection from "@/components/IntegrationFlowSection";
import TherapySessionHighlight from "@/components/TherapySessionHighlight";
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
      <ThreePillarsSection />
      <div id="doctor-booking">
        <DoctorBookingSection />
      </div>
      <div id="journaling">
        <JournalingFeatureSection />
      </div>
      <div id="ai-section">
        <AISection />
      </div>
      <div id="daily-journey">
        <DailyJourneySection />
      </div>
      <TherapySessionHighlight variant="journeys" />
      <div id="journeys">
        <JourneysSection />
      </div>
      <IntegrationFlowSection />
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
