import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import {
  X,
  ExternalLink,
  Box,
  Sparkles,
  Layers,
  MessageSquareHeart,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from 'lucide-react';
import { ProjectData, projectsData } from './ProjectsSection';
import { soundEngine } from '../lib/soundEngine';

interface ProjectModalProps {
  project: ProjectData | null;
  projects?: ProjectData[];
  onClose: () => void;
  onSelectProject?: (project: ProjectData) => void;
  onOpenFeedback?: (projectTitle: string) => void;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 100 : dir < 0 ? -100 : 0,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 100 : dir > 0 ? -100 : 0,
    opacity: 0,
    scale: 0.96,
  }),
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  projects,
  onClose,
  onSelectProject,
  onOpenFeedback,
}) => {
  const [direction, setDirection] = useState(0);

  const allProjects = projects && projects.length > 0 ? projects : projectsData;
  const currentIndex = project
    ? allProjects.findIndex((p) => p.number === project.number)
    : -1;

  const handleNext = () => {
    if (allProjects.length <= 1 || currentIndex === -1) return;
    setDirection(1);
    soundEngine.playChime(480, 780, 0.1);
    const nextIdx = (currentIndex + 1) % allProjects.length;
    if (onSelectProject) {
      onSelectProject(allProjects[nextIdx]);
    }
  };

  const handlePrev = () => {
    if (allProjects.length <= 1 || currentIndex === -1) return;
    setDirection(-1);
    soundEngine.playChime(480, 780, 0.1);
    const prevIdx = (currentIndex - 1 + allProjects.length) % allProjects.length;
    if (onSelectProject) {
      onSelectProject(allProjects[prevIdx]);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const velocityThreshold = 150;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }
  };

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, currentIndex, allProjects]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer z-0"
        />

        {/* Side Navigation Arrow: Previous (Desktop & Tablet) */}
        {allProjects.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            onMouseEnter={() => soundEngine.playHover()}
            aria-label="Previous Project"
            title="Previous Project (Swipe Right / Left Arrow)"
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-[#121218]/90 border border-white/20 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] hover:scale-110 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer hidden sm:flex items-center justify-center group"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}

        {/* Side Navigation Arrow: Next (Desktop & Tablet) */}
        {allProjects.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            onMouseEnter={() => soundEngine.playHover()}
            aria-label="Next Project"
            title="Next Project (Swipe Left / Right Arrow)"
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-[#121218]/90 border border-white/20 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] hover:scale-110 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer hidden sm:flex items-center justify-center group"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}

        {/* Swipeable Modal Content Container */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.number}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative w-full max-w-4xl bg-[#111111] border-2 border-[#D7E2EA]/20 rounded-[30px] sm:rounded-[36px] p-5 sm:p-8 md:p-10 text-[#D7E2EA] z-10 shadow-[0_30px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto touch-pan-y select-none"
          >
            {/* Top Bar Header: Mobile Swiper Nav, Close Button, Project Switcher Dots */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
              {/* Project Counter & Pagination Dots */}
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-mono text-[#00E5FF] font-bold">
                  {currentIndex >= 0 ? `${currentIndex + 1} / ${allProjects.length}` : project.number}
                </span>

                {allProjects.length > 1 && (
                  <div className="flex items-center gap-1.5 ml-2">
                    {allProjects.map((p, idx) => (
                      <button
                        key={p.number}
                        type="button"
                        onClick={() => {
                          if (idx === currentIndex) return;
                          setDirection(idx > currentIndex ? 1 : -1);
                          soundEngine.playChime(480, 780, 0.1);
                          if (onSelectProject) onSelectProject(p);
                        }}
                        aria-label={`Jump to project ${p.title}`}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentIndex
                            ? 'w-6 bg-[#00E5FF]'
                            : 'w-2 bg-white/20 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Swipe Gesture Hint Pill */}
              {allProjects.length > 1 && (
                <div className="hidden xs:flex sm:hidden items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#D7E2EA]/70">
                  <MoveHorizontal className="w-3 h-3 text-[#00E5FF] animate-pulse" />
                  <span>Swipe to navigate</span>
                </div>
              )}

              {/* Top Controls: Mobile Next/Prev buttons + Close button */}
              <div className="flex items-center gap-2">
                {allProjects.length > 1 && (
                  <div className="flex sm:hidden items-center gap-1 mr-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D7E2EA] transition-colors cursor-pointer"
                      aria-label="Previous Project"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D7E2EA] transition-colors cursor-pointer"
                      aria-label="Next Project"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Modal"
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D7E2EA] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Header Info */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-black text-3xl text-[#B600A8]">{project.number}</span>
                <span className="text-xs uppercase font-medium tracking-widest text-[#D7E2EA]/60 border border-white/10 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-[#D7E2EA]/70 mt-1 max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Images Showcase */}
            <div className="my-6">
              {project.col1Image2 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#161616]">
                    <img
                      src={project.col2Image}
                      alt={project.title}
                      className="w-full h-56 sm:h-64 object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#161616]">
                      <img
                        src={project.col1Image1}
                        alt="Detail 1"
                        className="w-full h-56 sm:h-64 object-cover"
                        draggable={false}
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#161616]">
                      <img
                        src={project.col1Image2}
                        alt="Detail 2"
                        className="w-full h-56 sm:h-64 object-cover"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#161616]">
                    <img
                      src={project.col2Image}
                      alt={`${project.title} Main Operation`}
                      className="w-full h-56 sm:h-64 object-cover"
                      draggable={false}
                    />
                  </div>
                  {project.col1Image1 && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#161616]">
                      <img
                        src={project.col1Image1}
                        alt={`${project.title} Hardware Module`}
                        className="w-full h-56 sm:h-64 object-cover"
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Key Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 my-6">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
                <Box className="w-5 h-5 text-[#B600A8]" />
                <div>
                  <div className="text-xs text-[#D7E2EA]/50 uppercase font-medium">Stack & Tools</div>
                  <div className="text-sm font-semibold truncate max-w-[180px]">
                    {project.stack || 'React / TypeScript'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
                <Layers className="w-5 h-5 text-[#7621B0]" />
                <div>
                  <div className="text-xs text-[#D7E2EA]/50 uppercase font-medium">Category</div>
                  <div className="text-sm font-semibold truncate max-w-[180px]">
                    {project.category}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
                <Sparkles className="w-5 h-5 text-[#BE4C00]" />
                <div>
                  <div className="text-xs text-[#D7E2EA]/50 uppercase font-medium">Status</div>
                  <div className="text-sm font-semibold truncate max-w-[180px]">
                    {project.status || 'Active Project'}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              {onOpenFeedback && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenFeedback(project.title);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#B600A8]/40 bg-[#B600A8]/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B600A8]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquareHeart className="w-4 h-4 text-[#B600A8]" />
                  <span>Rate / Leave Feedback</span>
                </button>
              )}

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Close
                </button>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-white text-xs flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    }}
                  >
                    <span>Launch App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <a
                    href={project.col2Image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-white text-xs flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    }}
                  >
                    <span>View Asset</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};
