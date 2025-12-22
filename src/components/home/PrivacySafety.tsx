import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";

const privacyPoints = [
  { icon: Shield, title: "Privacy-first", desc: "Encrypted & secure" },
  { icon: Lock, title: "You control", desc: "Share what you choose" },
  { icon: Eye, title: "Your data", desc: "Never sold" },
];

const PrivacySafety = () => {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Your Privacy Matters
            </h2>
          </div>

          {/* Privacy Points - Horizontal scroll on mobile */}
          <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto pb-4 md:pb-0 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mb-6">
            {privacyPoints.map((point, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[140px] md:w-auto snap-center"
              >
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border text-center h-full">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2">
                    <point.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{point.title}</h3>
                  <p className="text-xs text-muted-foreground">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Crisis Disclaimer - Compact */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
            <p className="text-xs text-muted-foreground">
              In crisis? Contact local emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySafety;
