
import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Star, Users, Clock, Award } from "lucide-react";

const doctors = [
  {
    name: "Dr. Nishmita T J",
    specialization: "Adult Cases & Anxiety Disorders",
    experience: "8+ years",
    rating: 4.9,
    sessions: 1200,
    availability: "Available Today"
  },
  {
    name: "Dr. Priya Raghvan",
    specialization: "Geriatric Cases & Depression",
    experience: "12+ years", 
    rating: 4.8,
    sessions: 2100,
    availability: "Next Available: Tomorrow"
  },
  {
    name: "Dr. B.R. Madhukar",
    specialization: "Corporate Mental Health",
    experience: "15+ years",
    rating: 4.9,
    sessions: 1800,
    availability: "Available Today"
  }
];

const DoctorBookingSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 px-4">
            Expert Therapists in Your 90-Day Journey
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Your program includes 12 sessions with India's leading mental health professionals
            over your complete 90-day recovery journey.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-mindtalk-orange mb-1 sm:mb-2">15+</div>
              <div className="text-sm sm:text-base text-gray-600">Expert Doctors</div>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-mindtalk-green mb-1 sm:mb-2">5000+</div>
              <div className="text-sm sm:text-base text-gray-600">Sessions Completed</div>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-mindtalk-blue mb-1 sm:mb-2">4.9★</div>
              <div className="text-sm sm:text-base text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold text-mindtalk-purple mb-1 sm:mb-2">90 Days</div>
              <div className="text-sm sm:text-base text-gray-600">Complete Program</div>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {doctors.map((doctor, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-3 sm:mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-mindtalk-orange to-mindtalk-orange-light rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <span className="text-lg sm:text-2xl font-bold text-white">
                        {doctor.name.split('.')[1]?.charAt(0) || 'D'}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm sm:text-base text-mindtalk-blue font-medium">{doctor.specialization}</p>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 text-mindtalk-green" />
                        <span className="text-xs sm:text-sm text-gray-600">{doctor.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs sm:text-sm font-medium">{doctor.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-mindtalk-orange" />
                        <span className="text-xs sm:text-sm text-gray-600">{doctor.sessions}+ sessions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-mindtalk-green" />
                        <span className="text-xs text-green-600 font-medium">{doctor.availability}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-orange-50 rounded-lg text-center">
                    <p className="text-xs sm:text-sm text-mindtalk-orange font-medium">
                      Included in your 90-day program
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              12 Expert Therapy Sessions Included
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Your 90-day journey includes comprehensive assessment and personalized therapy with these expert professionals
            </p>
            <MindTalkButton 
              variant="hero" 
              size="lg" 
              className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8"
            >
              <span className="hidden sm:inline">Start Your 90-Day Journey - ₹4,499</span>
              <span className="sm:hidden">Start Journey - ₹4,499</span>
            </MindTalkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorBookingSection;
