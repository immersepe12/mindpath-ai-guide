
import { useState, useEffect } from "react";
import { Heart, ArrowRight, Download } from "lucide-react";
import { MindTalkButton } from "./ui/button-variants";
import { scrollToForm } from "@/utils/scrollToForm";

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button after scrolling 200px
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 200);
    };

    // Add a small delay before showing the button
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    scrollToForm();
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-t from-white via-white/95 to-transparent pt-4 pb-4 px-4">
        <div className="flex gap-2">
          <MindTalkButton
            variant="hero"
            size="lg"
            onClick={handleClick}
            className="flex-1 h-12 text-sm font-semibold shadow-lg hover:shadow-xl"
          >
            <Heart className="mr-1 w-4 h-4" />
            Start Journey
            <ArrowRight className="ml-1 w-4 h-4" />
          </MindTalkButton>
          <MindTalkButton
            variant="outline"
            size="lg"
            onClick={() => window.open('https://link-to.app/TMoa8H6NOL', '_blank')}
            className="h-12 px-4 text-sm font-semibold shadow-lg hover:shadow-xl border-mindtalk-orange text-mindtalk-orange hover:bg-mindtalk-orange hover:text-white"
          >
            <Download className="w-4 h-4" />
          </MindTalkButton>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
