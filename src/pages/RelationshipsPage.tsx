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
import { Users } from "lucide-react";

const RelationshipsPage = () => {
  return (
    <>
      <Helmet>
        <title>Relationships & Family Therapy Program - 90 Days to Better Bonds | MindTalk</title>
        <meta name="description" content="Strengthen relationships and improve family communication with our targeted 90-day program. Learn communication skills, boundary setting, and conflict resolution for ₹4,499." />
        <meta name="keywords" content="relationship therapy, family counseling, communication skills, boundary setting, conflict resolution, couples therapy, family bonds" />
        <meta property="og:title" content="Relationships & Family Therapy Program - 90 Days to Better Bonds | MindTalk" />
        <meta property="og:description" content="Strengthen relationships and improve family communication with our targeted 90-day program." />
        <link rel="canonical" href={`${window.location.origin}/relationships`} />
      </Helmet>
      
      <div className="min-h-screen">
        <Navigation />
        <StickyMobileCTA />
        <div id="hero">
          <PackageHeroSection
            title="Relationships &"
            subtitle="Family Strengthening Program"
            description="Strengthen bonds and improve communication with loved ones through targeted relationship skills, conflict resolution, and emotional intelligence development."
            icon={Users}
            gradient="from-green-500 to-emerald-600"
            features={["12 Therapy Sessions", "Communication Skills", "Boundary Setting", "Conflict Resolution"]}
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

export default RelationshipsPage;