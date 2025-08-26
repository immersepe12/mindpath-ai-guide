
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { MindTalkButton } from "./ui/button-variants";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { scrollToSection } from "@/utils/scrollToSection";
import { scrollToForm } from "@/utils/scrollToForm";

const navigationItems = [
  { label: "Home", id: "hero" },
  { label: "Daily Journey", id: "daily-journey" },
  { label: "AI Features", id: "ai-section" },
  { label: "Recovery Paths", id: "journeys" },
  { label: "Book Session", id: "doctor-booking" },
  { label: "Pricing", id: "pricing" },
  { label: "Reviews", id: "testimonials" }
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  const handleGetStartedClick = () => {
    scrollToForm();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 lg:bg-white/95 bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo - Hidden on mobile */}
          <div className="flex-shrink-0 hidden lg:block">
            <img 
              src="/lovable-uploads/0a99fb1e-f879-44b2-bb75-a5250bb2c95a.png" 
              alt="Cadabams MindTalk"
              className="h-10 w-auto cursor-pointer"
              onClick={() => handleNavClick("hero")}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-mindtalk-orange"
                    : "text-gray-700 hover:text-mindtalk-orange"
                }`}
              >
                {item.label}
              </button>
            ))}
            <MindTalkButton
              variant="hero"
              size="sm"
              onClick={handleGetStartedClick}
              className="ml-4"
            >
              Get Started
            </MindTalkButton>
          </div>

          {/* Mobile Menu Button - Centered */}
          <div className="lg:hidden flex-1 flex justify-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-gray-700 hover:text-mindtalk-orange">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>
                    <img 
                      src="/lovable-uploads/0a99fb1e-f879-44b2-bb75-a5250bb2c95a.png" 
                      alt="Cadabams MindTalk"
                      className="h-10 w-auto"
                    />
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-4">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        activeSection === item.id
                          ? "bg-orange-50 text-mindtalk-orange"
                          : "text-gray-700 hover:bg-gray-50 hover:text-mindtalk-orange"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <MindTalkButton
                      variant="hero"
                      size="lg"
                      onClick={handleGetStartedClick}
                      className="w-full"
                    >
                      Get Started
                    </MindTalkButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
