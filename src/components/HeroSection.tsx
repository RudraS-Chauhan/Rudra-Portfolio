import React from 'react';
import { motion } from 'framer-motion';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { SEO } from './SEO';

interface HeroSectionProps {
  onContactClick?: () => void;
  onAiClick?: () => void;
  onResumeClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick, onAiClick, onResumeClick }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] sm:min-h-[700px] w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none px-5 sm:px-8 md:px-10">
      {/* 1. Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full flex justify-between items-center pt-5 md:pt-8 z-30 relative flex-wrap gap-2 sm:gap-4"
      >
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); scrollTo('about'); }}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base lg:text-[1.3rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          About
        </button>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); scrollTo('services'); }}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base lg:text-[1.3rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Services
        </button>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base lg:text-[1.3rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Projects
        </button>
        {onResumeClick && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onResumeClick(); }}
            className="text-white font-bold uppercase tracking-wider text-[11px] sm:text-base lg:text-[1.3rem] bg-white/10 hover:bg-white/20 px-3 py-1 sm:px-3.5 rounded-full border border-white/20 transition-all cursor-pointer flex items-center gap-1 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            CV / Resume
          </button>
        )}
        {onAiClick && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onAiClick(); }}
            className="text-[#B600A8] font-semibold uppercase tracking-wider text-[11px] sm:text-base lg:text-[1.3rem] transition-all duration-200 hover:opacity-80 hover:scale-105 cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-ping inline-block" />
            Ask AI
          </button>
        )}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onContactClick ? onContactClick() : scrollTo('contact'); }}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-base lg:text-[1.3rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Contact
        </button>
      </motion.nav>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-visible flex justify-center z-0 relative px-1 sm:px-2">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap w-full text-center text-[9.5vw] sm:text-[11vw] md:text-[12.5vw] lg:text-[13.5vw] xl:text-[14vw] mt-6 sm:mt-4 md:-mt-5 select-none"
        >
          Hi, i&apos;m rudra
        </motion.h1>
      </div>

      {/* Hero Portrait with Magnet */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Rudra -- Lead Engineer Portrait"
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] h-auto object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />
        </Magnet>
      </motion.div>

      {/* 3. Bottom bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-0 z-20 relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[170px] sm:max-w-[240px] md:max-w-[280px] text-[clamp(0.75rem,1.4vw,1.5rem)]"
        >
          a lead engineer & full-stack builder driven by crafting striking AI & robotic systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton onClick={onContactClick || (() => scrollTo('contact'))} />
        </motion.div>
      </div>
    </section>
  );
};
