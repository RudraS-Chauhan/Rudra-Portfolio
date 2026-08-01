import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Cpu,
  ShieldCheck,
  BarChart3,
  Share2,
  FileText,
  Layers,
  Zap,
  CheckCircle2,
  ArrowDown,
  ExternalLink,
  Github,
  Star,
  Sparkles,
  Terminal,
  Database,
  Globe,
  Lock,
  Code2,
  Workflow,
  Target,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { ProjectData } from './ProjectsSection';

export interface CaseStudyDetail {
  badges: Array<{ iconName: string; label: string }>;
  features: Array<{ title: string; description: string }>;
  architectureLayers: Array<{ name: string; layer: string; accentColor?: string }>;
  problem: string;
  solution: string;
  architectureText: string;
  algorithmTitle?: string;
  howItWorksSteps: Array<{ step: number; title: string; description: string }>;
  challengesAndSolutions: Array<{ challenge: string; solution: string }>;
  keyLearnings: string;
  builtWith: {
    frontend?: string[];
    backend?: string[];
    auth?: string[];
    database?: string[];
    deploy?: string[];
    hardware?: string[];
  };
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCaseStudyProps {
  project: ProjectData;
  caseStudy: CaseStudyDetail;
  onLiveClick: () => void;
  onFeedbackClick: () => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({
  project,
  caseStudy,
  onLiveClick,
  onFeedbackClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to render dynamic badge icon
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'cpu':
        return <Cpu className="w-3.5 h-3.5 text-[#B600A8]" />;
      case 'lock':
        return <Lock className="w-3.5 h-3.5 text-[#00E5FF]" />;
      case 'barchart':
        return <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'share':
        return <Share2 className="w-3.5 h-3.5 text-amber-400" />;
      case 'file':
        return <FileText className="w-3.5 h-3.5 text-purple-400" />;
      case 'shield':
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />;
      case 'terminal':
        return <Terminal className="w-3.5 h-3.5 text-green-400" />;
      case 'globe':
        return <Globe className="w-3.5 h-3.5 text-sky-400" />;
      case 'workflow':
        return <Workflow className="w-3.5 h-3.5 text-pink-400" />;
      default:
        return <Zap className="w-3.5 h-3.5 text-[#B600A8]" />;
    }
  };

  return (
    <div className="w-full mt-6 pt-6 border-t border-white/10 flex flex-col gap-6 text-[#D7E2EA]">
      {/* 1. Header Bar with Expand / Hide Case Study Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#B600A8]/10 border border-[#B600A8]/30 text-[#B600A8]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              Engineering Case Study
              <span className="text-[10px] font-semibold bg-white/10 text-white/80 px-2 py-0.5 rounded-full border border-white/10">
                {isExpanded ? 'Full Deep Dive' : 'Overview'}
              </span>
            </h4>
            <p className="text-xs text-[#D7E2EA]/60">
              Architecture, algorithms, trade-offs, and platform features.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/15 text-white border border-white/20 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md hover:border-[#B600A8]/50"
        >
          {isExpanded ? (
            <>
              <span>[ - Hide Engineering Case Study ]</span>
              <ChevronUp className="w-4 h-4 text-[#B600A8]" />
            </>
          ) : (
            <>
              <span>[ + Read Engineering Case Study ]</span>
              <ChevronDown className="w-4 h-4 text-[#B600A8]" />
            </>
          )}
        </button>
      </div>

      {/* 2. Platform Capability Badges Bar (Screenshot 1 top) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {caseStudy.badges.map((b, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-[#121212] hover:bg-[#181818] border border-white/10 hover:border-white/20 rounded-xl px-3 py-2.5 transition-all text-xs"
          >
            {renderBadgeIcon(b.iconName)}
            <span className="font-medium text-xs text-white/90 truncate">
              {b.label}
            </span>
          </div>
        ))}
      </div>

      {/* 3. PLATFORM FEATURES & PRODUCT ARCHITECTURE LAYER DIAGRAM (Screenshot 1 bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Platform Features (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3 bg-[#111111] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Sparkles className="w-4 h-4 text-[#B600A8]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/70">
              Platform Features
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {caseStudy.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-[#181818] border border-white/10 hover:border-[#B600A8]/40 rounded-xl p-3.5 transition-all group"
              >
                <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#B600A8] transition-colors mb-1">
                  {feat.title}
                </h5>
                <p className="text-xs text-[#D7E2EA]/70 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Product Architecture Diagram (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-3 bg-[#111111] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Layers className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/70">
              Product Architecture
            </span>
          </div>

          <div className="flex flex-col gap-2 py-1">
            {caseStudy.architectureLayers.map((layer, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center justify-between bg-[#181818] border border-white/10 hover:border-[#00E5FF]/40 rounded-xl px-3.5 py-2.5 text-xs transition-all shadow-sm group">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF] group-hover:scale-125 transition-transform" />
                    <span className="font-semibold text-white tracking-wide">
                      {layer.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#D7E2EA]/50 uppercase bg-black/40 px-2 py-0.5 rounded border border-white/5">
                    {layer.layer}
                  </span>
                </div>
                {idx < caseStudy.architectureLayers.length - 1 && (
                  <div className="flex justify-center -my-1">
                    <ArrowDown className="w-3.5 h-3.5 text-white/30" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Expanded Full Case Study Deep Dive (Screenshot 2 & 3) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden flex flex-col gap-6 pt-2"
          >
            {/* Main Narrative Blocks: Problem, Solution, Architecture */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6">
              {/* PROBLEM */}
              <div className="space-y-1.5 border-b border-white/10 pb-5">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#B600A8] flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" /> Problem Statement
                </span>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/90 leading-relaxed font-light">
                  {caseStudy.problem}
                </p>
              </div>

              {/* SOLUTION */}
              <div className="space-y-1.5 border-b border-white/10 pb-5">
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Engineering Solution
                </span>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/90 leading-relaxed font-light">
                  {caseStudy.solution}
                </p>
              </div>

              {/* ARCHITECTURE */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#00E5FF] flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" /> Architecture Rationale
                </span>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/90 leading-relaxed font-light">
                  {caseStudy.architectureText}
                </p>
              </div>
            </div>

            {/* ALGORITHM / HOW IT WORKS STEP-BY-STEP (Screenshot 3 top) */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Cpu className="w-4 h-4 text-[#B600A8]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  {caseStudy.algorithmTitle || 'ENGINEERING PIPELINE — HOW IT WORKS'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {caseStudy.howItWorksSteps.map((s) => (
                  <div
                    key={s.step}
                    className="bg-[#181818] border border-white/10 rounded-xl p-3.5 flex flex-col gap-2 hover:border-[#B600A8]/40 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#B600A8]/20 border border-[#B600A8]/50 text-[#B600A8] text-xs font-bold flex items-center justify-center font-mono">
                        {s.step}
                      </span>
                      <span className="text-xs font-bold text-white uppercase tracking-tight">
                        {s.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#D7E2EA]/70 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CHALLENGES & SOLUTIONS + KEY LEARNINGS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Challenges & Solutions (7 cols) */}
              <div className="md:col-span-7 bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2 border-b border-white/10 pb-3">
                  <Target className="w-4 h-4" /> Hard Challenges & Solutions
                </span>

                <div className="space-y-3">
                  {caseStudy.challengesAndSolutions.map((cs, idx) => (
                    <div
                      key={idx}
                      className="bg-[#181818] border border-white/10 rounded-xl p-3.5 space-y-1.5 text-xs"
                    >
                      <p className="text-[#D7E2EA] font-semibold">
                        <strong className="text-amber-400 font-bold uppercase mr-1">
                          Challenge:
                        </strong>{' '}
                        {cs.challenge}
                      </p>
                      <p className="text-[#D7E2EA]/80 font-light">
                        <strong className="text-emerald-400 font-bold uppercase mr-1">
                          Solution:
                        </strong>{' '}
                        {cs.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Learnings (5 cols) */}
              <div className="md:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF] flex items-center gap-2 border-b border-white/10 pb-3 mb-3">
                    <Sparkles className="w-4 h-4" /> Key Learnings
                  </span>
                  <p className="text-xs text-[#D7E2EA]/80 leading-relaxed font-light">
                    {caseStudy.keyLearnings}
                  </p>
                </div>

                <div className="p-3 bg-[#181818] rounded-xl border border-white/10 text-[11px] text-[#D7E2EA]/60 italic">
                  &quot;Production reliability stems from clear boundary validation, deterministic execution, and seamless UX feedback.&quot;
                </div>
              </div>
            </div>

            {/* BUILT WITH BREAKDOWN (Screenshot 3 middle) */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Code2 className="w-4 h-4 text-[#B600A8]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  Built With — Technical Stack
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {caseStudy.builtWith.frontend && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="w-28 text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/50 shrink-0">
                      FRONTEND
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.builtWith.frontend.map((t) => (
                        <span
                          key={t}
                          className="bg-[#1A1A1A] text-white border border-white/15 text-[11px] font-mono px-3 py-1 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.builtWith.backend && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="w-28 text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/50 shrink-0">
                      BACKEND / AI
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.builtWith.backend.map((t) => (
                        <span
                          key={t}
                          className="bg-[#1A1A1A] text-[#00E5FF] border border-[#00E5FF]/30 text-[11px] font-mono px-3 py-1 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.builtWith.auth && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="w-28 text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/50 shrink-0">
                      AUTH & DB
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.builtWith.auth.map((t) => (
                        <span
                          key={t}
                          className="bg-[#1A1A1A] text-purple-300 border border-purple-500/30 text-[11px] font-mono px-3 py-1 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.builtWith.deploy && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="w-28 text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/50 shrink-0">
                      DEPLOY
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.builtWith.deploy.map((t) => (
                        <span
                          key={t}
                          className="bg-[#1A1A1A] text-emerald-300 border border-emerald-500/30 text-[11px] font-mono px-3 py-1 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {caseStudy.builtWith.hardware && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="w-28 text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/50 shrink-0">
                      HARDWARE / ROS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.builtWith.hardware.map((t) => (
                        <span
                          key={t}
                          className="bg-[#1A1A1A] text-amber-300 border border-amber-500/30 text-[11px] font-mono px-3 py-1 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION LINKS BAR (Screenshot 3 bottom) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onLiveClick}
                className="bg-[#B600A8] hover:bg-[#B600A8]/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(182,0,168,0.4)] cursor-pointer"
              >
                <span>Live Project Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                Collapse Case Study
              </button>

              <button
                type="button"
                onClick={onFeedbackClick}
                className="bg-white/5 hover:bg-white/15 text-[#D7E2EA] font-semibold text-xs uppercase tracking-wider px-4 py-3 rounded-xl border border-white/10 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Rate Project</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
