import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PackageHeroSection from "@/components/PackageHeroSection";
import DailyJourneySection from "@/components/DailyJourneySection";
import TherapySessionHighlight from "@/components/TherapySessionHighlight";
import AISection from "@/components/AISection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Heart } from "lucide-react";

const DepressionPage = () => {
  return (
    <>
      <Helmet>
        <title>Depression Recovery Program - Emotional Reset in 90 Days | MindTalk</title>
        <meta name="description" content="Rebuild emotional strength and rediscover joy with our structured 90-day depression recovery program. Mood tracking, behavioral activation, and professional support for ₹7,799." />
        <meta name="keywords" content="depression treatment, emotional reset, mood tracking, behavioral activation, depression therapy, mental health recovery, joy restoration" />
        <meta property="og:title" content="Depression Recovery Program - Emotional Reset in 90 Days | MindTalk" />
        <meta property="og:description" content="Rebuild emotional strength and rediscover joy with our structured 90-day depression recovery program." />
        <link rel="canonical" href={`${window.location.origin}/depression`} />
      </Helmet>
      
      <div className="min-h-screen">
        <Navigation />
        <StickyMobileCTA />
        <div id="hero">
          <PackageHeroSection
            title="Depression Recovery &"
            subtitle="Emotional Reset Program"
            description="Rebuild emotional strength and rediscover joy through structured healing, mood tracking, and professional support designed specifically for depression recovery."
            icon={Heart}
            gradient="from-pink-500 to-red-500"
            features={["12 Therapy Sessions", "Mood Tracking", "Behavioral Activation", "Energy Building"]}
            price="₹7,799"
          />
        </div>
        <LeadCaptureForm />
        <div id="daily-journey">
          <DailyJourneySection />
        </div>
        <TherapySessionHighlight variant="journeys" />
        <div id="ai-section">
          <AISection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <CTASection />
      </div>
    </>
  );
};

export default DepressionPage;