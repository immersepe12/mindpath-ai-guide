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
import { Briefcase } from "lucide-react";

const WorkplacePage = () => {
  return (
    <>
      <Helmet>
        <title>Workplace Burnout Recovery Program - 90 Days to Work-Life Balance | MindTalk</title>
        <meta name="description" content="Regain work-life balance and prevent burnout with our comprehensive 90-day program. Time management, stress reduction, and career clarity for ₹4,499." />
        <meta name="keywords" content="burnout recovery, work-life balance, workplace stress, time management, career counseling, professional burnout, stress reduction" />
        <meta property="og:title" content="Workplace Burnout Recovery Program - 90 Days to Work-Life Balance | MindTalk" />
        <meta property="og:description" content="Regain work-life balance and prevent burnout with our comprehensive 90-day program." />
        <link rel="canonical" href={`${window.location.origin}/workplace`} />
      </Helmet>
      
      <div className="min-h-screen">
        <Navigation />
        <StickyMobileCTA />
        <div id="hero">
          <PackageHeroSection
            title="Workplace Burnout"
            subtitle="Recovery Program"
            description="Regain work-life balance and professional satisfaction while preventing future burnout through time management, stress reduction, and career clarity strategies."
            icon={Briefcase}
            gradient="from-orange-500 to-amber-600"
            features={["12 Therapy Sessions", "Time Management", "Stress Reduction", "Career Clarity"]}
            price="₹4,499"
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

export default WorkplacePage;