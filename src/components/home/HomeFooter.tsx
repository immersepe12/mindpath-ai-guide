import { Heart } from "lucide-react";

const HomeFooter = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-background">Cadabam's MindTalk</span>
              <p className="text-xs text-background/60">Your Mental Health Heartbeat</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              Contact Us
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Cadabam's MindTalk
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
