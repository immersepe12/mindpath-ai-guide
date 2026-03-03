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
import { Zap } from "lucide-react";

const StressAnxietyPage = () => {
  return (
    <>
      <Helmet>
        <title>Stress & Anxiety Recovery Program - 90 Days to Calm | MindTalk</title>
        <meta name="description" content="Transform overwhelming stress and anxiety into calm confidence with our AI-powered 90-day program. Daily mindfulness, breathing techniques, and expert therapy support for just ₹7,799." />
        <meta name="keywords" content="stress management, anxiety treatment, panic attacks, mindfulness, breathing techniques, anxiety therapy, stress relief program" />
        <meta property="og:title" content="Stress & Anxiety Recovery Program - 90 Days to Calm | MindTalk" />
        <meta property="og:description" content="Transform overwhelming stress and anxiety into calm confidence with our AI-powered 90-day program." />
        <link rel="canonical" href={`${window.location.origin}/stress-anxiety`} />
      </Helmet>
      
      <div className="min-h-screen">
        <Navigation />
        <StickyMobileCTA />
        <div id="hero">
          <PackageHeroSection
            title="Overcome Stress &"
            subtitle="Anxiety in 90 Days"
            description="Transform overwhelming feelings into calm confidence with daily mindfulness practices, breathing techniques, and expert guidance tailored for stress and anxiety recovery."
            icon={Zap}
            gradient="from-blue-500 to-purple-600"
            features={["12 Therapy Sessions", "Breathing Techniques", "Panic Management", "Sleep Improvement"]}
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

export default StressAnxietyPage;