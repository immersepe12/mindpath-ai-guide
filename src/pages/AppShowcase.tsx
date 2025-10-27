import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import AppHeroSection from "@/components/AppHeroSection";
import InteractiveAppShowcase from "@/components/InteractiveAppShowcase";
import JourneyRoadmapPreview from "@/components/JourneyRoadmapPreview";
import AppFeaturesGrid from "@/components/AppFeaturesGrid";
import IntegrationFlowSection from "@/components/IntegrationFlowSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const AppShowcase = () => {
  return (
    <>
      <Helmet>
        <title>MindTalk App - AI-Powered Mental Health Platform | DeepAgent AI</title>
        <meta 
          name="description" 
          content="Explore MindTalk's complete mental health platform with AI-powered journaling, DeepAgent 24/7 support, structured recovery programs, and expert therapy - all in one app." 
        />
        <meta 
          name="keywords" 
          content="mental health app, AI journaling, DeepAgent, therapy app, anxiety support, depression recovery, mental wellness platform" 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <AppHeroSection />
        <InteractiveAppShowcase />
        <JourneyRoadmapPreview />
        <IntegrationFlowSection />
        <AppFeaturesGrid />
        <TestimonialsSection />
        <CTASection />
        <WhatsAppFloating />
        <StickyMobileCTA />
      </div>
    </>
  );
};

export default AppShowcase;
