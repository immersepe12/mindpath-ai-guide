import { Button } from "@/components/ui/button";
import { Download, ArrowDown, Smartphone } from "lucide-react";

const APP_DOWNLOAD_LINK = "https://link-to.app/TMoa8H6NOL";
const IOS_PLACEHOLDER = "https://example.com/ios";
const ANDROID_PLACEHOLDER = "https://example.com/android";

const FinalCTA = () => {
  const scrollToAssessments = () => {
    const element = document.querySelector("#features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-28 gradient-healing relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Start with One Small Step Today
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            Your journey to feeling steadier begins with a single tap. Download MindTalk and discover what 3 minutes a day can do.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => window.open(APP_DOWNLOAD_LINK, "_blank")}
              className="gap-2 text-lg px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Download className="w-5 h-5" />
              Download the App
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToAssessments}
              className="gap-2 text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowDown className="w-5 h-5" />
              Take a Quick Self-Check
            </Button>
          </div>

          {/* QR Code & Store Buttons */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 inline-block">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* QR Placeholder */}
              <div className="text-center">
                <div className="w-32 h-32 bg-primary-foreground rounded-xl flex items-center justify-center mb-2">
                  <Smartphone className="w-12 h-12 text-primary" />
                </div>
                <p className="text-xs text-primary-foreground/70">Scan to download</p>
              </div>

              <div className="hidden md:block w-px h-24 bg-primary-foreground/20" />

              {/* App Store Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={IOS_PLACEHOLDER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-primary-foreground rounded-xl px-5 py-3 hover:bg-primary-foreground/90 transition-colors"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-muted-foreground">Download on the</p>
                    <p className="text-sm font-semibold text-foreground">App Store</p>
                  </div>
                </a>
                <a
                  href={ANDROID_PLACEHOLDER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-primary-foreground rounded-xl px-5 py-3 hover:bg-primary-foreground/90 transition-colors"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.67.44 1.58.2 2.02-.46l1.67-2.5c.14-.21.43-.27.64-.13l5.99 3.96c.53.35 1.22.35 1.75 0l6-3.97c.21-.14.5-.08.64.13l1.66 2.5c.44.67 1.35.91 2.02.47.67-.44.91-1.35.47-2.02l-1.68-2.52c-.3-.45-.21-1.05.2-1.39l3.04-2.53c.52-.43.52-1.22 0-1.65l-3.04-2.53c-.41-.34-.5-.94-.2-1.39l1.68-2.52c.44-.67.2-1.58-.47-2.02-.67-.44-1.58-.2-2.02.47l-1.66 2.5c-.14.21-.43.27-.64.13l-6-3.97c-.53-.35-1.22-.35-1.75 0l-5.99 3.96c-.21.14-.5.08-.64-.13l-1.67-2.5c-.44-.67-1.35-.91-2.02-.47-.67.44-.91 1.35-.47 2.02l1.68 2.52c.3.45.21 1.05-.2 1.39l-3.04 2.53c-.52.43-.52 1.22 0 1.65l3.04 2.53c.41.34.5.94.2 1.39l-1.68 2.52c-.44.67-.2 1.58.47 2.02zm8.82-4.5l-4.5-2.98c-.21-.14-.21-.45 0-.59l4.5-2.98c.21-.14.5-.14.71 0l4.5 2.98c.21.14.21.45 0 .59l-4.5 2.98c-.21.14-.5.14-.71 0z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-muted-foreground">Get it on</p>
                    <p className="text-sm font-semibold text-foreground">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
