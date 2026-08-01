import React from 'react';
import { Globe } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { RecruiterFastTrack } from './RecruiterFastTrack';
import { SEO } from './SEO';

interface AboutSectionProps {
  onContactClick?: () => void;
  onAiClick?: () => void;
  onResumeClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick, onAiClick, onResumeClick }) => {
  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectsScroll = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-16 sm:py-20 bg-[#0C0C0C] overflow-hidden select-none"
    >
      {/* Decorative 3D Images in Corners */}
      {/* Top-left: Moon Icon */}
      <div className="absolute top-[3%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-0 opacity-40 sm:opacity-100">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon 3D Asset"
            className="w-[80px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </FadeIn>
      </div>

      {/* Bottom-left: 3D Object */}
      <div className="absolute bottom-[6%] left-[2%] sm:left-[6%] md:left-[10%] pointer-events-none z-0 opacity-40 sm:opacity-100">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Shape Asset"
            className="w-[70px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </FadeIn>
      </div>

      {/* Top-right: Lego Icon */}
      <div className="absolute top-[3%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-0 opacity-40 sm:opacity-100">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego 3D Asset"
            className="w-[80px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </FadeIn>
      </div>

      {/* Bottom-right: 3D Group */}
      <div className="absolute bottom-[6%] right-[2%] sm:right-[6%] md:right-[10%] pointer-events-none z-0 opacity-40 sm:opacity-100">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Asset"
            className="w-[85px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </FadeIn>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full my-auto text-center gap-8">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>

        {/* Animated Bio Paragraph */}
        <div className="px-4">
          <AnimatedText text="I am an AI Systems Builder and Full-Stack Engineer who translates complex technical challenges into scalable production software. From building EventFit AI — a catalog outfit recommendation engine — to engineering AtlasCV in private beta and leading control loops at ECHO-GATE Robotics, I focus on sub-second API speeds, resilient architectures, and pristine spatial UI. Let's engineer something extraordinary!" />
        </div>

        {/* Core Expertise Badges */}
        <FadeIn delay={0.15} y={15} className="w-full flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-[#B600A8] hover:border-[#B600A8]/50 transition-colors">
              ⚡ Gemini API & LLM Agents
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-[#00E5FF] hover:border-[#00E5FF]/50 transition-colors">
              🚀 Next.js 14 / React / TypeScript
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-emerald-400 hover:border-emerald-400/50 transition-colors">
              🤖 ROS / C++ Autonomous Robotics
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-amber-400 hover:border-amber-400/50 transition-colors">
              🌐 High-Speed Cloud APIs & PostgreSQL
            </span>
          </div>
        </FadeIn>

        {/* Spoken Languages */}
        <FadeIn delay={0.18} y={15} className="w-full flex flex-col items-center gap-2.5">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/60 font-bold flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10">
            <Globe className="w-3.5 h-3.5 text-[#00E5FF]" /> Spoken Languages
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full bg-[#141419] border border-white/10 text-xs font-mono text-white flex items-center gap-2 shadow-md hover:border-[#00E5FF]/40 transition-all">
              <span className="text-base">🇮🇳</span>
              <strong className="text-white font-bold">Hindi</strong>
              <span className="text-amber-400 font-semibold text-[11px]">(Mother Tongue / Native)</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#141419] border border-white/10 text-xs font-mono text-white flex items-center gap-2 shadow-md hover:border-[#00E5FF]/40 transition-all">
              <span className="text-base">🇬🇧</span>
              <strong className="text-white font-bold">English</strong>
              <span className="text-emerald-400 font-semibold text-[11px]">(Fluent Native)</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#141419] border border-white/10 text-xs font-mono text-white flex items-center gap-2 shadow-md hover:border-[#00E5FF]/40 transition-all">
              <span className="text-base">🇩🇪</span>
              <strong className="text-white font-bold">German</strong>
              <span className="text-[#00E5FF] font-semibold text-[11px]">(Proficient)</span>
            </span>
          </div>
        </FadeIn>

        {/* Recruiter Fast Track Widget */}
        <FadeIn delay={0.2} y={20} className="w-full flex justify-center">
          <RecruiterFastTrack
            onResumeClick={onResumeClick}
            onContactClick={handleContact}
            onProjectClick={handleProjectsScroll}
          />
        </FadeIn>

        {/* Contact Button */}
        <FadeIn delay={0.3} y={20}>
          <ContactButton onClick={handleContact} />
        </FadeIn>
      </div>
    </section>
  );
};

