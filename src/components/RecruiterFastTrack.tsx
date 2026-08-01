import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronRight, Sparkles, FileText, Mail, Bot, X } from 'lucide-react';

interface RecruiterFastTrackProps {
  onResumeClick?: () => void;
  onContactClick?: () => void;
  onProjectClick?: () => void;
}

export const RecruiterFastTrack: React.FC<RecruiterFastTrackProps> = ({
  onResumeClick,
  onContactClick,
  onProjectClick,
}) => {
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  return (
    <>
      <div className="w-full max-w-xl bg-[#121212]/90 border border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden group">
        {/* Glow ambient background */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#B600A8]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center relative z-10">
          {/* Left Column: Fast Track Buttons */}
          <div className="sm:col-span-7 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-lg bg-[#B600A8]/20 border border-[#B600A8]/50 text-[#B600A8]">
                <Zap className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-xs font-black uppercase tracking-widest text-white">
                Recruiter Fast Track
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setShowSummaryModal(true)}
              className="w-full flex items-center justify-between text-left text-xs font-semibold text-white/90 bg-[#181818] hover:bg-white/10 border border-white/10 hover:border-[#B600A8]/50 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer group/btn"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
                <span>30 Second Executive Summary</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover/btn:translate-x-1 transition-transform" />
            </button>

            {onResumeClick && (
              <button
                type="button"
                onClick={onResumeClick}
                className="w-full flex items-center justify-between text-left text-xs font-semibold text-white/90 bg-[#181818] hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer group/btn"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>View Official Resume / CV</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            )}

            {onContactClick && (
              <button
                type="button"
                onClick={onContactClick}
                className="w-full flex items-center justify-between text-left text-xs font-semibold text-white/90 bg-[#181818] hover:bg-white/10 border border-white/10 hover:border-amber-500/50 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer group/btn"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Direct Proposal / Contact</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          {/* Right Column: Animated Radar / AI Indicator */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-[#181818] border border-white/10 rounded-2xl relative">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Pulsing radar ring */}
              <div className="absolute inset-0 rounded-full border border-[#B600A8]/40 animate-ping opacity-75" />
              <div className="absolute inset-2 rounded-full border border-[#00E5FF]/30" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#121212] via-[#20112A] to-[#0A1F28] border border-white/20 flex items-center justify-center relative shadow-[0_0_20px_rgba(182,0,168,0.3)]">
                {/* Two glowing eyes */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-[#B600A8] shadow-[0_0_8px_#B600A8] animate-pulse" />
                </div>
                {/* Status Dot */}
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-[0_0_6px_#34d399]" />
              </div>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/70 mt-3 text-center font-bold">
              RUDRA S. CHAUHAN
            </span>
            <span className="text-[9px] text-emerald-400 font-mono tracking-tight flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              AVAILABLE FOR HIRE
            </span>
          </div>
        </div>
      </div>

      {/* 30 Second Summary Modal */}
      <AnimatePresence>
        {showSummaryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#121212] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl space-y-5 text-[#D7E2EA]"
            >
              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#B600A8]/20 border border-[#B600A8]/50 text-[#B600A8]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    30-Second Executive Summary
                  </h3>
                  <span className="text-xs text-[#00E5FF] font-mono">
                    Rudra Singh Chauhan — Lead AI & Mechatronics Systems Builder
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#D7E2EA]/90 leading-relaxed font-light bg-[#181818] p-4 rounded-2xl border border-white/10">
                <p>
                  ⚡ <strong className="text-white">Core Focus:</strong> Lead AI/ML Engineer and Mechatronics Systems Architect specializing in Gemini API integration, ROS/ROS2 robotics control loops, and full-stack Next.js/React platforms.
                </p>
                <p>
                  🚀 <strong className="text-white">Flagship Projects:</strong> Creator of <strong>AtlasCV</strong> (AI placement kit generator), <strong>EventFit AI</strong> (catalog outfit recommender), and <strong>ECHO-GATE Robotics</strong> (centralized autonomous platform).
                </p>
                <p>
                  🛠️ <strong className="text-white">Technical Arsenal:</strong> TypeScript, Next.js 14, Python, C++, ROS, Gemini 2.5 API, Supabase/PostgreSQL, Tailwind CSS, and SolidWorks CAD.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                {onResumeClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowSummaryModal(false);
                      onResumeClick();
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl border border-white/20 transition-all cursor-pointer"
                  >
                    View CV / Resume
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowSummaryModal(false)}
                  className="bg-[#B600A8] hover:bg-[#B600A8]/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
