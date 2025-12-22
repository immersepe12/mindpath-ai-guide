import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I finally knew what to do on hard days. The daily tasks gave me a clear path forward.",
    initials: "AK",
    color: "bg-primary",
  },
  {
    quote: "The 3-minute tasks made it easy to stay consistent. Small steps make a difference.",
    initials: "RP",
    color: "bg-accent",
  },
  {
    quote: "Preparing for therapy felt simpler. My patterns and insights were ready.",
    initials: "SM",
    color: "bg-mindtalk-blue",
  },
];

const HomeTestimonials = () => {
  return (
    <section id="community" className="py-10 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Community Stories
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Real experiences from MindTalk users
          </p>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 max-w-4xl md:mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-auto snap-center"
            >
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border h-full">
                <Quote className="w-6 h-6 text-primary/30 mb-3" />
                <p className="text-sm text-foreground mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${testimonial.color} flex items-center justify-center`}>
                    <span className="text-xs font-semibold text-primary-foreground">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">MindTalk User</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
