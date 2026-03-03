
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    age: 28,
    journey: "Anxiety & Stress",
    rating: 5,
    text: "The daily micro-tasks felt so manageable, and having Dr. Riya AI guide me between sessions made all the difference. I actually completed my 90-day journey!",
    improvement: "85% reduction in anxiety"
  },
  {
    name: "Rahul Mehta",
    age: 35,
    journey: "Workplace Burnout",
    rating: 5,
    text: "I was skeptical about AI therapy, but the combination of human expertise and AI insights helped me regain my work-life balance faster than traditional therapy.",
    improvement: "Returned to work confidently"
  },
  {
    name: "Anjali Patel",
    age: 42,
    journey: "Depression Recovery",
    rating: 5,
    text: "For ₹7,799, I got more support than expensive therapy. The AI remembered everything and my therapist was always prepared. Worth every penny.",
    improvement: "Mood improved 90%"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 px-4">
            Real Stories, Real Results
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Join thousands who have transformed their mental health with our revolutionary approach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-mindtalk-orange/30 mb-3 sm:mb-4" />

                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="border-t pt-4 sm:pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.journey}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm font-semibold text-mindtalk-green">
                        {testimonial.improvement}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 px-4">
            Join 10,000+ people who have successfully completed their recovery journey
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-mindtalk-green rounded-full"></div>
              <span>4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-mindtalk-orange rounded-full"></div>
              <span>87% Complete Journey</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-mindtalk-blue rounded-full"></div>
              <span>92% Recommend</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
