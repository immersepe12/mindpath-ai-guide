
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Heart, ArrowRight, Phone, Mail, User } from "lucide-react";

// Extend window object for Freshworks CRM
declare global {
  interface Window {
    fw?: {
      createLead?: (data: any) => Promise<any>;
    };
  }
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
});

type FormData = z.infer<typeof formSchema>;

const LeadCaptureForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      mobile: ""
    }
  });

  const getLeadSource = () => {
    const path = location.pathname;
    switch (path) {
      case '/stress-anxiety':
        return 'Stress & Anxiety Recovery Program';
      case '/depression':
        return 'Depression & Emotional Reset Program';
      case '/relationships':
        return 'Relationships & Family Program';
      case '/workplace':
        return 'Workplace Burnout Recovery Program';
      default:
        return 'MindTalk Homepage';
    }
  };

  const getFullUrl = () => {
    const domain = 'cadabamsmindtalk.com';
    const path = location.pathname;
    return `${domain}${path}`;
  };

  const getUtmParameters = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || ''
    };
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    const utmParams = getUtmParameters();
    const fullUrl = getFullUrl();
    const leadSource = getLeadSource();
    
    const leadData = {
      ...data,
      leadSource,
      currentPage: location.pathname,
      fullUrl,
      timestamp: new Date().toISOString(),
      program: 'MindTalk 90-Day Recovery Journey',
      ...utmParams
    };
    
    console.log("Lead submitted:", leadData);
    
    try {
      // Freshworks lead creation (if available)
      if (window.fw && typeof window.fw.createLead === 'function') {
        await window.fw.createLead({
          first_name: data.firstName,
          email: data.email,
          mobile_number: data.mobile,
          lead_source: leadSource,
          CF_form_source_custom: fullUrl,
          CF_utm_source: utmParams.utm_source,
          CF_utm_medium: utmParams.utm_medium,
          CF_utm_campaign: utmParams.utm_campaign,
          CF_journey_type: leadSource,
          CF_program: 'MindTalk 90-Day Recovery Journey',
          CF_referrer: document.referrer || '',
          CF_timestamp: new Date().toISOString()
        });
      }
      
      // Simulate additional API call for internal tracking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to thank you page
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting lead:", error);
      // Still navigate to thank you page even if tracking fails
      navigate("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-mindtalk-orange/5 to-mindtalk-orange-light/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Start Your 90-Day Journey Today
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Get instant access to our comprehensive mental health program with AI support, 
              expert therapy sessions, and 200+ recovery resources.
            </p>
          </div>

          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left side - Form */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-mindtalk-orange rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Begin Your Recovery</h3>
                      <p className="text-sm text-gray-600">Complete program for just ₹4,499</p>
                    </div>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">First Name *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  placeholder="Enter your first name"
                                  className="pl-10 h-12 border-gray-300 focus:border-mindtalk-orange"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Email Address *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  type="email"
                                  placeholder="Enter your email address"
                                  className="pl-10 h-12 border-gray-300 focus:border-mindtalk-orange"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Mobile Number *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  type="tel"
                                  placeholder="Enter 10-digit mobile number"
                                  className="pl-10 h-12 border-gray-300 focus:border-mindtalk-orange"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <MindTalkButton
                        type="submit"
                        variant="hero"
                        size="hero"
                        className="w-full h-14 text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Start My 90-Day Journey"}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </MindTalkButton>
                    </form>
                  </Form>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By submitting, you agree to our Terms of Service and Privacy Policy. 
                    Your data is protected with end-to-end encryption.
                  </p>
                </div>

                {/* Right side - Benefits */}
                <div className="bg-gradient-to-br from-mindtalk-orange to-mindtalk-orange-light p-6 sm:p-8 lg:p-10 text-white">
                  <h3 className="text-2xl font-bold mb-6">What You Get Instantly</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold">12</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Expert Therapy Sessions</h4>
                        <p className="text-sm text-white/90">Personalized sessions with licensed professionals over 90 days</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold">AI</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">24/7 AI Companion</h4>
                        <p className="text-sm text-white/90">Dr. Riya provides round-the-clock support and guidance</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold">200+</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Recovery Resources</h4>
                        <p className="text-sm text-white/90">Assessments, breathwork sessions, and guided meditations</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold">₹</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">30-Day Money Back</h4>
                        <p className="text-sm text-white/90">Full refund if you're not satisfied with your progress</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-white/10 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">₹4,499</div>
                      <div className="text-sm text-white/90">Complete 90-day program</div>
                      <div className="text-xs text-white/70 mt-1">No hidden charges • Cancel anytime</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
