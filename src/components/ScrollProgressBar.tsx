import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-1 sm:h-1.5 z-50 pointer-events-none bg-gradient-to-r from-[#18011F] via-[#B600A8] to-[#BE4C00] shadow-[0_0_15px_rgba(182,0,168,0.8)]"
    />
  );
};
