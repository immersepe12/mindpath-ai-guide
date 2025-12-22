import { Helmet } from "react-helmet-async";
import HomeNavigation from "@/components/home/HomeNavigation";
import HomeHero from "@/components/home/HomeHero";
import TrustStrip from "@/components/home/TrustStrip";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import JourneysSpotlight from "@/components/home/JourneysSpotlight";
import DeepAgentSection from "@/components/home/DeepAgentSection";
import ProfessionalSupport from "@/components/home/ProfessionalSupport";
import ComparisonSection from "@/components/home/ComparisonSection";
import PrivacySafety from "@/components/home/PrivacySafety";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeFAQ from "@/components/home/HomeFAQ";
import FinalCTA from "@/components/home/FinalCTA";
import HomeFooter from "@/components/home/HomeFooter";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is MindTalk a replacement for therapy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, MindTalk is designed to complement professional mental healthcare, not replace it. It provides tools, resources, and structured support that can help you between therapy sessions or while you're waiting to connect with a professional."
      }
    },
    {
      "@type": "Question",
      "name": "How long are daily tasks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most daily tasks take 3-4 minutes to complete. We've designed them to be quick and actionable so you can stay consistent even on busy days."
      }
    },
    {
      "@type": "Question",
      "name": "What are journeys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Journeys are 30-day structured programs focused on specific issues like anxiety, low mood, or stress. Each journey includes daily micro-tasks, check-ins, worksheets, audio/video tools, and AI-powered insights."
      }
    },
    {
      "@type": "Question",
      "name": "How does the AI assistant work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI assistant learns from your check-ins, completed tasks, and journey progress to provide personalized suggestions. It can recommend specific tools, help you identify patterns, and even help you prepare for therapy sessions."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, your privacy is our priority. All data is encrypted and stored securely. We never sell your personal information to third parties. You control what you share."
      }
    }
  ]
};

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Cadabam's MindTalk — Your Mental Health Heartbeat</title>
        <meta 
          name="description" 
          content="Assess what's going on, learn with trusted resources, and follow 3-4 minute daily micro-tasks designed to help you feel steadier — with professional support when you need it." 
        />
        <meta property="og:title" content="Cadabam's MindTalk — Your Mental Health Heartbeat" />
        <meta 
          property="og:description" 
          content="A safe space to understand what you're feeling — and take the next step. Evidence-based tools, structured journeys, and professional support in one app." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mindtalk.cadabams.com/home" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cadabam's MindTalk — Your Mental Health Heartbeat" />
        <meta 
          name="twitter:description" 
          content="A safe space to understand what you're feeling — and take the next step." 
        />
        <link rel="canonical" href="https://mindtalk.cadabams.com/home" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <HomeNavigation />
        <main>
          <HomeHero />
          <TrustStrip />
          <HowItWorks />
          <FeaturesGrid />
          <JourneysSpotlight />
          <DeepAgentSection />
          <ProfessionalSupport />
          <ComparisonSection />
          <PrivacySafety />
          <HomeTestimonials />
          <HomeFAQ />
          <FinalCTA />
        </main>
        <HomeFooter />
      </div>
    </>
  );
};

export default HomePage;
