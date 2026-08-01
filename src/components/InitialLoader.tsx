import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../lib/soundEngine';

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Fast loading simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            soundEngine.playChime(600, 1000, 0.2);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#0C0C0C] flex flex-col items-center justify-center p-6 text-[#D7E2EA] selection:bg-[#B600A8] selection:text-white overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[300px] h-[300px] bg-[#B600A8]/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
            {/* Logo initials reveal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B600A8] via-[#7621B0] to-[#BE4C00] p-[2px] mb-6 shadow-[0_0_30px_rgba(182,0,168,0.5)]"
            >
              <div className="w-full h-full bg-[#0C0C0C] rounded-[14px] flex items-center justify-center">
                <span className="text-2xl font-black tracking-tighter text-white">RSC</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-lg font-bold uppercase tracking-wider text-white mb-1"
            >
              Rudra Singh Chauhan
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-xs text-[#D7E2EA]/60 uppercase tracking-widest mb-8"
            >
              Architecting AI & Systems
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] shadow-[0_0_15px_#B600A8]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Percentage Indicator */}
            <div className="flex items-center justify-between w-full text-[11px] font-mono font-bold text-[#D7E2EA]/70">
              <span className="uppercase tracking-widest text-[#B600A8]">System Initializing...</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
