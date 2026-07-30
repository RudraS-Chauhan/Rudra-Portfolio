import React from 'react';
import { FadeIn } from './FadeIn';
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-12 py-20 sm:py-24 relative z-20 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 border border-[#B600A8]/30 px-4 py-1 rounded-full mb-3 inline-flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Academic & Leadership
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight hero-heading">
              Education
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={30}>
          <div className="bg-[#121212] border-2 border-white/10 rounded-[36px] p-6 sm:p-10 md:p-12 relative overflow-hidden group hover:border-[#B600A8]/50 transition-all duration-300">
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#B600A8]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#B600A8] mb-1">
                  <BookOpen className="w-4 h-4" /> Undergraduate Degree
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                  Bachelor of Technology (B.Tech)
                </h3>
                <p className="text-sm sm:text-base text-[#D7E2EA]/70 mt-1">
                  Computer Science & Engineering / AI & Systems Specialization
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 text-xs sm:text-sm text-[#D7E2EA]/60">
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-[#B600A8]" /> Enrolled / Active Student
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B600A8]" /> India
                </span>
              </div>
            </div>

            {/* Core Philosophy & Accomplishments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest text-[#D7E2EA]/50 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#B600A8]" /> Engineering Philosophy
                </h4>
                <p className="text-sm sm:text-base text-[#D7E2EA]/80 leading-relaxed italic border-l-2 border-[#B600A8] pl-4 py-1">
                  &ldquo;I don&apos;t wait for graduation to start creating. Driven by building real hardware and AI products that solve tangible problems.&rdquo;
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest text-[#D7E2EA]/50 mb-3">
                  Key Milestones During Study
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#D7E2EA]/80">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8] mt-1.5 shrink-0" />
                    <span><strong>EventFit AI:</strong> Designed and deployed catalog-based outfit recommender web app on Netlify.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8] mt-1.5 shrink-0" />
                    <span><strong>AtlasCV (Private Beta):</strong> Built Next.js + Gemini API generator for ATS resumes and LinkedIn optimization.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8] mt-1.5 shrink-0" />
                    <span><strong>ECHO-GATE Robotics:</strong> Served as Lead Engineer architecting centralized firmware & autonomous control loops (Completed).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
