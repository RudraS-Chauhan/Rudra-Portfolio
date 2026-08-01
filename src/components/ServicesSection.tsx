import React from 'react';
import { FadeIn } from './FadeIn';
import { SEO } from './SEO';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'AI & Full-Stack Engineering',
    description:
      'Building high-performance LLM-powered applications, Next.js platforms, and robust backends integrated with Google Gemini API, TypeScript, and modern web architectures.',
  },
  {
    number: '02',
    title: 'Robotics & System Architecture',
    description:
      'Architected low-latency embedded systems, autonomous control modules, and centralized operations hardware as Lead Engineer at ECHO-GATE Robotics.',
  },
  {
    number: '03',
    title: 'Smart Catalog & Recommender Engines',
    description:
      'Building offline-safe catalog recommendation systems like EventFit AI with fallback logic, automated outfit matching algorithms, and intelligent user flows.',
  },
  {
    number: '04',
    title: 'High-Performance Web & API Architecture',
    description:
      'Helping startups and founders build conversion-focused digital platforms with custom automated AI prompt chains, sub-second API speeds, and modern dark-mode spatial UI.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32 w-full select-none relative z-10"
    >
      <div id="price" className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="font-black uppercase text-center text-[#0C0C0C] leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="w-full flex flex-col border-t border-[#0C0C0C]/15">
          {servicesData.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.1} y={30}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 gap-4 sm:gap-8 md:gap-12 group transition-colors duration-300 hover:bg-black/[0.02] px-2 sm:px-4 rounded-xl">
                {/* Number */}
                <div className="font-black text-[clamp(3rem,10vw,140px)] leading-none text-[#0C0C0C] tracking-tighter shrink-0 select-none">
                  {service.number}
                </div>

                {/* Name & Description Stacked */}
                <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                  <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] leading-tight text-[#0C0C0C]">
                    {service.title}
                  </h3>
                  <p className="font-light text-[#0C0C0C]/60 leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
