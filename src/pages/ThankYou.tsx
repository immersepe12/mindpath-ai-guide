
import { useEffect } from "react";
import { MindTalkButton } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain, Phone, Mail, Calendar, ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

// Extend window object for GTM
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

const ThankYou = () => {
  useEffect(() => {
    // Extract conversion data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    const email = urlParams.get('email');
    const conversion = urlParams.get('conversion');
    const program = urlParams.get('program');
    const value = urlParams.get('value');

    console.log('ThankYou page loaded with params:', { source, email, conversion, program, value });

    // Add delay to ensure GTM is fully initialized
    const fireConversionEvent = () => {
      if (window.dataLayer && conversion) {
        const eventData = {
          event: 'conversion_complete',
          conversion_type: conversion,
          lead_source: source,
          email: email,
          program: program,
          conversion_value: value,
          currency: 'INR',
          page: '/thank-you'
        };
        
        window.dataLayer.push(eventData);
        console.log('GTM conversion event fired successfully:', eventData);
      } else {
        console.warn('GTM dataLayer not available or missing conversion data:', {
          hasDataLayer: !!window.dataLayer,
          hasConversion: !!conversion
        });
      }
    };

    // Try immediately, then retry with delay if needed
    fireConversionEvent();
    
    // Backup retry after 500ms to ensure GTM is ready
    const retryTimeout = setTimeout(() => {
      if (window.dataLayer && conversion) {
        fireConversionEvent();
      }
    }, 500);

    return () => clearTimeout(retryTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mindtalk-green/10 to-mindtalk-blue/10 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto w-full">
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="text-center p-8 sm:p-12 lg:p-16">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-mindtalk-green rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>

              {/* Main Message */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Welcome to Your Recovery Journey!
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you for taking the first step towards better mental health. 
                Your 90-day transformation starts now.
              </p>

              {/* What Happens Next */}
              <div className="bg-gradient-to-r from-mindtalk-orange/5 to-mindtalk-orange-light/5 rounded-2xl p-6 sm:p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-mindtalk-orange rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Account Setup</h3>
                    <p className="text-sm text-gray-600">We'll send you login details within 5 minutes</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-mindtalk-green rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Initial Assessment</h3>
                    <p className="text-sm text-gray-600">Complete your personalized mental health evaluation</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-mindtalk-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">First Session</h3>
                    <p className="text-sm text-gray-600">Schedule your first therapy session</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card className="border border-mindtalk-orange/20">
                  <CardContent className="p-4 text-center">
                    <Phone className="w-6 h-6 text-mindtalk-orange mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-sm text-gray-600">+91 97414 76476</p>
                  </CardContent>
                </Card>

                <Card className="border border-mindtalk-green/20">
                  <CardContent className="p-4 text-center">
                    <Mail className="w-6 h-6 text-mindtalk-green mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-sm text-gray-600">support@cadabams.org</p>
                  </CardContent>
                </Card>

                <Card className="border border-mindtalk-blue/20 sm:col-span-2 lg:col-span-1">
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-6 h-6 text-mindtalk-blue mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Available</h4>
                    <p className="text-sm text-gray-600">24/7 Support</p>
                  </CardContent>
                </Card>
              </div>

              {/* Dr. Riya Introduction */}
              <div className="bg-gradient-to-r from-mindtalk-blue/5 to-mindtalk-purple/5 rounded-2xl p-6 sm:p-8 mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-mindtalk-blue rounded-2xl flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900">Meet Dr. Riya</h3>
                    <p className="text-mindtalk-blue font-medium">Your AI Companion</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Dr. Riya is already preparing your personalized recovery plan. She'll be available 24/7 
                  to support you throughout your 90-day journey.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <MindTalkButton variant="outline" size="lg" className="w-full sm:w-auto">
                    <Home className="mr-2 w-4 h-4" />
                    Back to Home
                  </MindTalkButton>
                </Link>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium">
                  📧 Check your email for detailed next steps and login information
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThankYou;
