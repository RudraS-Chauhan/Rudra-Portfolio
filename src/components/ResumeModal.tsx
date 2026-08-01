import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Copy, Check, FileText, ExternalLink, Award, BookOpen, Briefcase, Code } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';
import { SEO } from './SEO';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const resumeText = `
RUDRA SINGH CHAUHAN
AI/ML Engineer | Computer Vision & Robotics | Full-Stack AI Systems
Greater Delhi Area, India | +91 7084150015 | chauhanrudrasingh2007@gmail.com | linkedin.com/in/rudrasc-tech

SUMMARY
AI/ML engineer building production computer vision and LLM-orchestrated systems — shipped a resume-parsing assistant at 94% accuracy using Gemini 3.1, and a real-time sign-language translation system at 92% recognition accuracy using OpenCV and MediaPipe. Currently leading a 6-person cross-functional team (AtlasCV) and a 5-person robotics team (ECHO-GATE) under 2-week Agile sprints.

TECHNICAL SKILLS
- Languages: Python, Java (Core + Advanced OOP), JavaScript, HTML/CSS
- AI/ML & Computer Vision: OpenCV, MediaPipe, Gemini 3.1, Prompt Engineering, LLM Orchestration
- Full-Stack / Backend: Node.js, Next.js, REST APIs
- Robotics / Embedded: Embedded Systems, Arduino, I2C Display Integration, Sensor Integration
- Engineering Practices: Agile/Scrum, Sprint Planning, Git/GitHub, Code Review Workflows

EXPERIENCE
1. Founder & Lead Developer — AtlasCV (Feb 2026 – Present)
   - Architected full-stack AI career assistant with 94% resume parsing accuracy using Node.js & Gemini 3.1.
   - Built automated interview-prep pipeline chaining prompt engineering with Next.js frontend.
2. Engineering Lead — ECHO-GATE Robotics (Jan 2026 – Present)
   - Led 5-member robotics team to build sign language translation telemetry system with 550ms localized latency & 92% accuracy.
   - Achieved stable 30+ FPS gesture recognition using OpenCV and MediaPipe. Selected for institutional patent filing via university IPR cell.
3. Google Student Ambassador — Google (Aug 2025 – Jan 2026)
   - Facilitated AI & Cloud workshops for 5,000+ students on campus.
4. Private Computer Science Instructor & Mentor — Self-employed (Mar 2025 – Present)
   - Designed Java + OOP curriculum for high-school students, improving assessment scores by 30-40%.
5. Founder — Fold_Fantasia (Jun 2024 – Nov 2025)
   - Bootstrapped D2C e-commerce venture delivering 50+ custom origami creations before strategic pivot into AI/ML.

ACADEMIC PROJECTS
- ATM Simulator | Java, OOP
- Student Management System | Java, CRUD
- Currency Converter | Java, API Integration

EDUCATION
- B.Tech in Artificial Intelligence — Galgotias University (2025 – 2029)
- Senior Secondary (Maths & CS) — City Montessori School, Lucknow (Grade 10: 92% | Grade 12: 87%)

CERTIFICATIONS
- 5-Day AI Agents Intensive Course — Google
- Java Fundamentals & Programming
- Tata Cybersecurity Analyst & Deloitte Cyber Simulation — Forage
  `.trim();

  const handleCopyText = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    soundEngine.playClick();
    window.print();
  };

  const handleDownload = () => {
    soundEngine.playClick();
    const element = document.createElement('a');
    const file = new Blob([resumeText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Rudra_Singh_Chauhan_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-[#121212] border border-white/10 rounded-[32px] max-w-4xl w-full p-5 sm:p-8 my-auto relative shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-[#D7E2EA] max-h-[90vh] flex flex-col"
        >
          {/* Top Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#B600A8]" />
              <h2 className="text-lg sm:text-xl font-extrabold uppercase text-white tracking-tight">
                Curriculum Vitae / Resume
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                onMouseEnter={() => soundEngine.playHover()}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                onMouseEnter={() => soundEngine.playHover()}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer hidden sm:flex"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={handleDownload}
                onMouseEnter={() => soundEngine.playHover()}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-xs font-bold text-white shadow-[0_0_15px_rgba(182,0,168,0.4)] hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Printable Resume Canvas */}
          <div className="overflow-y-auto pr-2 mt-4 space-y-6 text-xs sm:text-sm leading-relaxed select-text">
            {/* Header */}
            <div className="text-center sm:text-left border-b border-white/10 pb-5">
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Rudra Singh Chauhan
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#B600A8] mt-0.5">
                AI/ML Engineer | Computer Vision & Robotics | Full-Stack AI Systems
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#D7E2EA]/70 mt-2 font-mono">
                <span>Greater Delhi Area, India</span>
                <span>• +91 7084150015</span>
                <span>• chauhanrudrasingh2007@gmail.com</span>
                <a
                  href="https://linkedin.com/in/rudrasc-tech"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B600A8] underline hover:text-white inline-flex items-center gap-1"
                >
                  linkedin.com/in/rudrasc-tech <ExternalLink className="w-3 h-3 inline" />
                </a>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#B600A8] mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Summary
              </h3>
              <p className="text-[#D7E2EA]/80 leading-relaxed bg-white/5 border border-white/5 p-3.5 rounded-xl">
                AI/ML engineer building production computer vision and LLM-orchestrated systems — shipped a resume-parsing assistant at 94% accuracy using Gemini 3.1, and a real-time sign-language translation system at 92% recognition accuracy using OpenCV and MediaPipe. Currently leading a 6-person cross-functional team (AtlasCV) and a 5-person robotics team (ECHO-GATE) under 2-week Agile sprints.
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#B600A8] mb-2 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" /> Technical Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                  <span className="font-bold text-white block mb-0.5">Languages:</span>
                  <span className="text-[#D7E2EA]/80">Python, Java (Core + Advanced OOP), JavaScript, HTML/CSS</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                  <span className="font-bold text-white block mb-0.5">AI/ML & Computer Vision:</span>
                  <span className="text-[#D7E2EA]/80">OpenCV, MediaPipe, Gemini 3.1, Prompt Engineering, LLM Orchestration</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                  <span className="font-bold text-white block mb-0.5">Full-Stack & Backend:</span>
                  <span className="text-[#D7E2EA]/80">Node.js, Next.js, Express, REST APIs</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                  <span className="font-bold text-white block mb-0.5">Robotics & Embedded:</span>
                  <span className="text-[#D7E2EA]/80">Embedded Systems, Arduino, I2C Integration, Sensor Telemetry</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#B600A8] mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Professional Experience
              </h3>
              <div className="space-y-3.5">
                <div className="border-l-2 border-[#B600A8] pl-3.5 py-0.5">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h4 className="font-bold text-white">Founder & Lead Developer — AtlasCV</h4>
                    <span className="text-[11px] font-mono text-[#B600A8]">Feb 2026 – Present</span>
                  </div>
                  <ul className="list-disc list-inside text-[#D7E2EA]/80 text-xs mt-1 space-y-1">
                    <li>Architected full-stack AI career assistant achieving 94% resume parsing accuracy with Node.js & Gemini 3.1.</li>
                    <li>Reduced team delivery lag by 87% implementing 2-week Agile sprints across 6 members.</li>
                    <li>Built automated interview-prep pipeline chaining prompt engineering workflows with Next.js.</li>
                  </ul>
                </div>

                <div className="border-l-2 border-[#7621B0] pl-3.5 py-0.5">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h4 className="font-bold text-white">Engineering Lead — ECHO-GATE Robotics</h4>
                    <span className="text-[11px] font-mono text-[#7621B0]">Jan 2026 – Present</span>
                  </div>
                  <ul className="list-disc list-inside text-[#D7E2EA]/80 text-xs mt-1 space-y-1">
                    <li>Led 5-member team to deploy real-time assistive sign language translation hardware with 550ms latency & 92% accuracy.</li>
                    <li>Achieved stable 30+ FPS gesture recognition using OpenCV and MediaPipe. Selected for institutional patent filing.</li>
                  </ul>
                </div>

                <div className="border-l-2 border-[#BE4C00] pl-3.5 py-0.5">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h4 className="font-bold text-white">Google Student Ambassador — Google</h4>
                    <span className="text-[11px] font-mono text-[#BE4C00]">Aug 2025 – Jan 2026</span>
                  </div>
                  <p className="text-xs text-[#D7E2EA]/80 mt-1">
                    Facilitated workshops on Cloud, AI, and Android for a student body of 5,000+.
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#B600A8] mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Education
                </h3>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-white block">B.Tech in Artificial Intelligence</span>
                    <span className="text-[#D7E2EA]/70">Galgotias University (Sept 2025 – 2029)</span>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <span className="font-bold text-white block">Senior Secondary (Maths & CS)</span>
                    <span className="text-[#D7E2EA]/70">City Montessori School, Lucknow</span>
                    <span className="block text-[11px] font-mono text-[#B600A8]">Grade 10: 92% | Grade 12: 87%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#B600A8] mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Certifications
                </h3>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
                    <span>5-Day AI Agents Intensive Course — Google</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7621B0]" />
                    <span>Java Fundamentals & Programming</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BE4C00]" />
                    <span>Tata Cybersecurity Analyst Simulation</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]" />
                    <span>Deloitte Cyber Simulation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
