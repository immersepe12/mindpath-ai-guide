import { Button } from "@/components/ui/button";
import { Download, Smartphone } from "lucide-react";

const APP_DOWNLOAD_LINK = "https://link-to.app/TMoa8H6NOL";
const IOS_PLACEHOLDER = "https://example.com/ios";
const ANDROID_PLACEHOLDER = "https://example.com/android";

const FinalCTA = () => {
  return (
    <section className="py-12 md:py-20 gradient-healing relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Start with One Step Today
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/80 mb-6">
            Download MindTalk. See what 3 minutes a day can do.
          </p>

          {/* Main CTA */}
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.open(APP_DOWNLOAD_LINK, "_blank")}
            className="gap-2 text-base px-8 py-5 bg-primary-foreground text-primary hover:bg-primary-foreground/90 mb-8"
          >
            <Download className="w-5 h-5" />
            Download the App
          </Button>

          {/* Store Buttons - Horizontal */}
          <div className="flex flex-row items-center justify-center gap-3">
            <a
              href={IOS_PLACEHOLDER}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-foreground/20 rounded-lg px-4 py-2.5 hover:bg-primary-foreground/30 transition-colors"
            >
              <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-xs font-medium text-primary-foreground">App Store</span>
            </a>
            <a
              href={ANDROID_PLACEHOLDER}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-foreground/20 rounded-lg px-4 py-2.5 hover:bg-primary-foreground/30 transition-colors"
            >
              <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 2.047a.5.5 0 0 0-.462.132l-8.5 8.5a.5.5 0 0 0 0 .707l8.5 8.5a.5.5 0 0 0 .807-.56L14.83 12.5h5.67a.5.5 0 0 0 0-1h-5.67l3.038-6.826a.5.5 0 0 0-.345-.627M5.5 3a.5.5 0 0 0-.5.5v17a.5.5 0 0 0 1 0v-17a.5.5 0 0 0-.5-.5"/>
              </svg>
              <span className="text-xs font-medium text-primary-foreground">Google Play</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
