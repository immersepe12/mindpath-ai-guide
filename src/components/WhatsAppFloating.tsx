import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppFloating = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button after scrolling 300px
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300);
    };

    // Add a small delay before showing the button
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "918197268789";
    const message = "I am interested in Cadabam's mindtalk Packages";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-30 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <button
        onClick={handleWhatsAppClick}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-slow group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </div>
  );
};

export default WhatsAppFloating;