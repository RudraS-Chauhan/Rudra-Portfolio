import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { Layout, Server, BrainCircuit, Bot, Sparkles, ChevronDown, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  level: number; // Percentage 0-100
  experience?: string; // e.g. "2+ yrs"
  highlight?: boolean;
}

interface TechCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  skills: Skill[];
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    subtitle: 'UI & User Experience',
    description: 'Crafting highly responsive, accessible web interfaces with fluid motion and modern typography.',
    icon: Layout,
    skills: [
      { name: 'React', level: 95, experience: '3+ yrs', highlight: true },
      { name: 'Next.js', level: 90, experience: '2+ yrs', highlight: true },
      { name: 'TypeScript', level: 92, experience: '3+ yrs', highlight: true },
      { name: 'Tailwind CSS', level: 95, experience: '3+ yrs', highlight: true },
      { name: 'Framer Motion', level: 88, experience: '2+ yrs', highlight: true },
      { name: 'JavaScript (ES6+)', level: 94, experience: '3+ yrs' },
      { name: 'Vite & Webpack', level: 85, experience: '2+ yrs' },
      { name: 'HTML5 / CSS3', level: 85, experience: '1 yr' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Cloud Systems',
    subtitle: 'Services & Infrastructure',
    description: 'Building secure server-side logic, API gateways, database schemas, and automated CI/CD pipelines.',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 90, experience: '3+ yrs', highlight: true },
      { name: 'Express.js', level: 92, experience: '3+ yrs', highlight: true },
      { name: 'Java', level: 88, experience: '2 yrs', highlight: true },
      { name: 'REST APIs', level: 94, experience: '3+ yrs', highlight: true },
      { name: 'Python', level: 85, experience: '2+ yrs' },
      { name: 'SQL / PostgreSQL', level: 82, experience: '2+ yrs' },
      { name: 'WebSockets', level: 80, experience: '1+ yrs' },
      { name: 'Vercel & Netlify', level: 92, experience: '3+ yrs' },
      { name: 'Server Architecture', level: 86, experience: '2+ yrs' },
    ],
  },
  {
    id: 'aiml',
    title: 'AI & ML Systems',
    subtitle: 'Generative Models & Logic',
    description: 'Integrating LLM workflows, smart recommender engines, and automated prompt pipelines.',
    icon: BrainCircuit,
    skills: [
      { name: 'Gemini API', level: 94, experience: '2+ yrs', highlight: true },
      { name: 'LLM Workflow Chains', level: 90, experience: '2+ yrs', highlight: true },
      { name: 'Catalog Recommender Logic', level: 88, experience: '2+ yrs', highlight: true },
      { name: 'Prompt Engineering', level: 92, experience: '2+ yrs' },
      { name: 'RAG Architectures', level: 80, experience: '1+ yrs' },
      { name: 'AI API Proxying', level: 90, experience: '2+ yrs' },
      { name: 'Fallback Logic', level: 92, experience: '2+ yrs' },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics & Hardware',
    subtitle: 'Embedded Control & CAD',
    description: 'Architecting low-latency firmware, autonomous ROS loops, and SolidWorks 3D mechanical assemblies.',
    icon: Bot,
    skills: [
      { name: 'ROS (Robot Operating System)', level: 88, experience: '2+ yrs', highlight: true },
      { name: 'Embedded C++', level: 85, experience: '2+ yrs', highlight: true },
      { name: 'SolidWorks 3D CAD', level: 90, experience: '3+ yrs', highlight: true },
      { name: 'Autonomous Control Loops', level: 86, experience: '2+ yrs' },
      { name: 'Sensor Integration', level: 88, experience: '2+ yrs' },
      { name: 'Microcontrollers', level: 84, experience: '2+ yrs' },
      { name: 'Git & Version Control', level: 92, experience: '3+ yrs' },
    ],
  },
];

export const TechStackSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('frontend');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="techstack"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-12 py-20 sm:py-24 relative z-20 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 border border-[#B600A8]/30 px-4 py-1 rounded-full mb-3 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Capabilities & Interactive Stack
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight hero-heading">
              Tech Stack
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#D7E2EA]/60 max-w-2xl mt-4 leading-relaxed">
              Domain expertise spanning modern web engineering, server infrastructure, generative AI integration, and autonomous hardware systems. Click or hover any category to inspect proficiency metrics.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {techCategories.map((cat, idx) => {
            const IconComp = cat.icon;
            const isExpanded = expandedId === cat.id;

            return (
              <FadeIn key={cat.id} delay={idx * 0.1} y={30}>
                <div
                  onClick={() => toggleExpand(cat.id)}
                  onMouseEnter={() => setExpandedId(cat.id)}
                  className={`h-full bg-[#121212] border rounded-[32px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer group ${
                    isExpanded
                      ? 'border-[#B600A8]/70 shadow-[0_15px_40px_rgba(182,0,168,0.2)] bg-[#151218]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Header with Icon, Title, and Toggle Arrow */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 shrink-0 ${
                          isExpanded
                            ? 'bg-[#B600A8] text-white border-[#B600A8]'
                            : 'bg-white/5 border-white/10 text-[#B600A8] group-hover:bg-[#B600A8]/20'
                        }`}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#B600A8]">
                            {cat.subtitle}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white leading-tight">
                            {cat.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#D7E2EA]/50 group-hover:text-white transition-colors">
                        <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
                          {isExpanded ? 'Details' : 'Expand'}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#B600A8]' : ''}`} />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mb-6 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Skill Badges Summary */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                            skill.highlight
                              ? 'bg-gradient-to-r from-[#B600A8]/20 to-[#7621B0]/20 border border-[#B600A8]/50 text-white font-semibold'
                              : 'bg-white/5 border border-white/10 text-[#D7E2EA]/80'
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Interactive Proficiency Progress Indicators */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="pt-6 border-t border-white/10 space-y-3.5 overflow-hidden"
                        >
                          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#B600A8] font-bold mb-1">
                            <span className="flex items-center gap-1">
                              <Award className="w-3.5 h-3.5" /> Technical Proficiency
                            </span>
                            <span>Level & Experience</span>
                          </div>

                          {cat.skills.map((skill) => (
                            <div key={skill.name} className="space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className={`font-medium ${skill.highlight ? 'text-white' : 'text-[#D7E2EA]/90'}`}>
                                  {skill.name}
                                </span>
                                <div className="flex items-center gap-2">
                                  {skill.experience && (
                                    <span className="text-[10px] text-[#D7E2EA]/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                                      {skill.experience}
                                    </span>
                                  )}
                                  <span className="font-mono text-[11px] font-bold text-[#B600A8]">
                                    {skill.level}%
                                  </span>
                                </div>
                              </div>

                              {/* Progress Indicator Bar */}
                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                                  className={`h-full rounded-full ${
                                    skill.highlight
                                      ? 'bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]'
                                      : 'bg-white/40'
                                  }`}
                                />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
