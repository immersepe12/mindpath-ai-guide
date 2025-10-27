import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import AssessmentHeroSection from "@/components/AssessmentHeroSection";
import AssessmentsGrid from "@/components/AssessmentsGrid";
import AssessmentHowItWorks from "@/components/AssessmentHowItWorks";
import AssessmentBenefits from "@/components/AssessmentBenefits";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CTASection from "@/components/CTASection";

const AssessmentPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Free Mental Health Assessments & Quizzes | MindTalk by Cadabams</title>
        <meta
          name="description"
          content="Take our professional mental health assessments to understand your stress, anxiety, depression levels, and more. Get personalized recommendations for your recovery journey."
        />
        <meta
          name="keywords"
          content="mental health assessment, depression quiz, anxiety test, stress assessment, psychological evaluation, mental health screening"
        />
        <meta property="og:title" content="Free Mental Health Assessments | MindTalk" />
        <meta
          property="og:description"
          content="Professional mental health screenings created by licensed therapists. Get personalized insights in minutes."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourdomain.com/assessment" />
      </Helmet>

      <Navigation />
      <StickyMobileCTA />
      <WhatsAppFloating />
      
      <AssessmentHeroSection />
      <AssessmentsGrid />
      <AssessmentHowItWorks />
      <AssessmentBenefits />
      <LeadCaptureForm />
      <CTASection />
    </div>
  );
};

export default AssessmentPage;
