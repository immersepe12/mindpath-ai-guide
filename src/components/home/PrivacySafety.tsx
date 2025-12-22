import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";

const privacyPoints = [
  {
    icon: Shield,
    title: "Privacy-first design",
    description: "Your data is encrypted and protected with industry-standard security.",
  },
  {
    icon: Lock,
    title: "You control what you share",
    description: "Decide what information to include and what to keep private.",
  },
  {
    icon: Eye,
    title: "Data used to support your experience",
    description: "Your information helps personalize your journey — never sold to third parties.",
  },
];

const PrivacySafety = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Privacy & Safety Matter
            </h2>
            <p className="text-lg text-muted-foreground">
              We take your trust seriously. Here's how we protect you.
            </p>
          </div>

          {/* Privacy Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {privacyPoints.map((point, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-sm border border-border text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </div>
            ))}
          </div>

          {/* Crisis Disclaimer */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Important Note</h4>
              <p className="text-sm text-muted-foreground">
                If you feel unsafe or are in crisis, please contact local emergency services immediately. 
                MindTalk is a supportive tool but is not designed for emergency situations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySafety;
