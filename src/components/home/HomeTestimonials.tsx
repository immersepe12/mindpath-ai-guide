import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I finally knew what to do on hard days. The daily tasks gave me a clear path forward when everything felt overwhelming.",
    initials: "AK",
    color: "bg-primary",
  },
  {
    quote: "The 3-minute tasks made it easy to stay consistent. I never thought small steps could make such a difference.",
    initials: "RP",
    color: "bg-accent",
  },
  {
    quote: "Preparing for therapy felt simpler. Having my patterns and insights ready made our sessions so much more productive.",
    initials: "SM",
    color: "bg-mindtalk-blue",
  },
];

const HomeTestimonials = () => {
  return (
    <section id="community" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories from Our Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people using MindTalk on their mental health journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center`}>
                  <span className="text-sm font-semibold text-primary-foreground">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">MindTalk User</p>
                  <p className="text-xs text-muted-foreground">Verified user</p>
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
