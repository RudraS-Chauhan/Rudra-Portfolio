import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Box, Sparkles, Layers } from 'lucide-react';
import { ProjectData } from './ProjectsSection';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#111111] border-2 border-[#D7E2EA]/20 rounded-[36px] p-6 sm:p-8 md:p-10 text-[#D7E2EA] z-10 shadow-[0_30px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D7E2EA] transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Info */}
          <div className="flex flex-col gap-2 mb-6 pr-12">
            <div className="flex items-center gap-3">
              <span className="font-black text-3xl text-[#B600A8]">{project.number}</span>
              <span className="text-xs uppercase font-medium tracking-widest text-[#D7E2EA]/60 border border-white/10 px-3 py-1 rounded-full">
                {project.category}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#D7E2EA]/70 mt-1 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Images Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#161616]">
              <img src={project.col2Image} alt={project.title} className="w-full h-64 object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#161616]">
                <img src={project.col1Image1} alt="Detail 1" className="w-full h-30 sm:h-32 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#161616]">
                <img src={project.col1Image2} alt="Detail 2" className="w-full h-30 sm:h-32 object-cover" />
              </div>
            </div>
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
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3 rounded-full font-medium uppercase tracking-widest text-white text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              >
                <span>Launch App</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <a
                href={project.col2Image}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3 rounded-full font-medium uppercase tracking-widest text-white text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              >
                <span>View Full Asset</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
