import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../lib/soundEngine';

interface DockSection {
  id: string;
  label: string;
}

const dockSections: DockSection[] = [
  { id: 'hero', label: 'Top / Hero' },
  { id: 'about', label: 'About Me' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'education', label: 'Education' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects & Impact' },
];

export const SectionDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = dockSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(dockSections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          if (scrollPos >= absoluteTop - 40) {
            setActiveSection(dockSections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 bg-[#121212]/80 backdrop-blur-md p-2 border border-white/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      {dockSections.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredId === sec.id;

        return (
          <div key={sec.id} className="relative flex items-center">
            {/* Tooltip on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-9 bg-[#1A1A1A] border border-white/20 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap pointer-events-none"
                >
                  {sec.label}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clickable Dot */}
            <button
              type="button"
              onClick={() => scrollTo(sec.id)}
              onMouseEnter={() => {
                setHoveredId(sec.id);
                soundEngine.playHapticHover();
              }}
              onMouseLeave={() => setHoveredId(null)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 relative flex items-center justify-center cursor-pointer ${
                isActive
                  ? 'bg-[#B600A8] scale-125 shadow-[0_0_16px_#B600A8,0_0_30px_rgba(182,0,168,0.8)]'
                  : 'bg-white/20 hover:bg-white/60 hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]'
              }`}
              aria-label={`Navigate to ${sec.label}`}
            >
              {isActive && (
                <>
                  {/* Pulsing Radial Ambient Glow */}
                  <motion.span
                    className="absolute -inset-2 rounded-full bg-[#B600A8]/50 blur-md pointer-events-none"
                    animate={{
                      scale: [1, 1.45, 1],
                      opacity: [0.5, 0.85, 0.5],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* Subtle Ping Ring */}
                  <span className="absolute -inset-1.5 rounded-full border border-[#B600A8] animate-ping pointer-events-none opacity-50" />
                </>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};
