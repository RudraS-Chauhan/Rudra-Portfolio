import React from 'react';
import { ContactButton } from './ContactButton';
import { SocialLinks } from './SocialLinks';
import { Mail, ArrowUp } from 'lucide-react';
import { SEO } from './SEO';

interface FooterSectionProps {
  onContactClick: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] pt-16 sm:pt-20 pb-12 px-5 sm:px-8 md:px-10 border-t border-white/10 w-full select-none relative z-20"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Top Call to Action */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#B600A8]">
              Have a project in mind?
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-2 hero-heading">
              Let&apos;s Work Together
            </h2>
          </div>
          <ContactButton onClick={onContactClick} label="Get In Touch" />
        </div>

        {/* Middle Links & Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/10">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Rudra Portfolio</h4>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/60 leading-relaxed">
              Lead Engineer & AI Builder. Creating EventFit AI, AtlasCV (Private Beta), and scalable web platforms.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Direct Contact</h4>
            <a
              href="mailto:rudra.dev.builds@gmail.com"
              className="flex items-center gap-2 text-xs sm:text-sm text-[#D7E2EA]/80 hover:text-white transition-colors mb-2"
            >
              <Mail className="w-4 h-4 text-[#B600A8]" />
              <span>rudra.dev.builds@gmail.com</span>
            </a>
            <p className="text-xs text-[#D7E2EA]/50">Available for engineering leadership & AI consultation</p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Navigation</h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#D7E2EA]/70">
              <li><a href="#about" className="hover:text-white transition-colors">About Me</a></li>
              <li><a href="#techstack" className="hover:text-white transition-colors">Tech Stack</a></li>
              <li><a href="#education" className="hover:text-white transition-colors">Education</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services & Pricing</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Featured Projects</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Social Media</h4>
            <SocialLinks showLabels={true} className="flex-col items-start gap-2" />
          </div>
        </div>

        {/* Bottom copyright & scroll to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-[#D7E2EA]/50">
          <p>© {new Date().getFullYear()} Rudra -- Lead Engineer & AI Builder. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="uppercase font-medium tracking-wider">Back to Top</span>
            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

