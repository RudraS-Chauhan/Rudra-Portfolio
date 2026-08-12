import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero section (~600px or 70% of viewport height)
      const heroEl = document.getElementById('hero');
      const threshold = heroEl ? heroEl.offsetHeight * 0.75 : 500;

      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          onMouseEnter={() => soundEngine.playHover()}
          initial={{ opacity: 0, y: 25, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Scroll to top of page"
          title="Scroll to Top"
          className="fixed bottom-6 right-6 sm:right-8 z-40 p-3.5 sm:p-4 rounded-full bg-[#121218]/90 border border-white/20 text-[#00E5FF] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,229,255,0.2)] backdrop-blur-xl hover:border-[#00E5FF]/60 hover:text-white hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all cursor-pointer flex items-center justify-center group"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
          
          {/* Subtle Outer Ring Glow */}
          <span className="absolute -inset-1 rounded-full border border-[#00E5FF]/30 pointer-events-none animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
