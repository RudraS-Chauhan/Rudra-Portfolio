import React from 'react';
import { Github, Linkedin, Instagram, Mail, ExternalLink } from 'lucide-react';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.FC<{ className?: string }>;
  label: string;
}

export const socialLinksList: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/RudraS-Chauhan',
    icon: Github,
    label: 'RudraS-Chauhan',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rudrasc-tech/',
    icon: Linkedin,
    label: 'rudrasc-tech',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/ctrlhuman.io',
    icon: Instagram,
    label: '@ctrlhuman.io',
  },
  {
    name: 'Email',
    url: 'mailto:rudra.dev.builds@gmail.com',
    icon: Mail,
    label: 'rudra.dev.builds@gmail.com',
  },
];

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', showLabels = true }) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socialLinksList.map((social) => {
        const IconComponent = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#B600A8]/50 hover:bg-white/10 text-[#D7E2EA] hover:text-white transition-all duration-300 hover:scale-105"
            title={`${social.name}: ${social.label}`}
          >
            <IconComponent className="w-4 h-4 text-[#B600A8] group-hover:scale-110 transition-transform" />
            {showLabels && (
              <span className="text-xs font-medium uppercase tracking-wider">
                {social.name}
              </span>
            )}
            <ExternalLink className="w-3 h-3 text-[#D7E2EA]/40 group-hover:text-white transition-colors" />
          </a>
        );
      })}
    </div>
  );
};
