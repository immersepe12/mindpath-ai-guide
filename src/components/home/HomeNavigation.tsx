import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Download, Heart } from "lucide-react";

const APP_DOWNLOAD_LINK = "https://link-to.app/TMoa8H6NOL";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Journeys", href: "#journeys" },
  { label: "AI Support", href: "#ai-support" },
  { label: "Community", href: "#community" },
  { label: "FAQ", href: "#faq" },
];

const HomeNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-healing flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">MindTalk</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => window.open(APP_DOWNLOAD_LINK, "_blank")}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download the App
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-lg font-medium text-foreground text-left"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => {
                    window.open(APP_DOWNLOAD_LINK, "_blank");
                    setIsOpen(false);
                  }}
                  className="gap-2 mt-4"
                >
                  <Download className="w-4 h-4" />
                  Download the App
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default HomeNavigation;
