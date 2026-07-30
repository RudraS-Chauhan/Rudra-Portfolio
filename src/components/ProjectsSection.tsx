import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectStatsSection } from './ProjectStatsSection';

export interface ProjectData {
  number: string;
  category: string;
  title: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  description?: string;
  link?: string;
  stack?: string;
  status?: string;
}

export const EVENTFIT_IMAGES = {
  main: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1280&q=80',
  alt1: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1280&q=80',
  alt2: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1280&q=80',
  localMain: '/images/projects/eventfit-main.png',
  localAlt1: '/images/projects/eventfit-alt1.png',
  localAlt2: '/images/projects/eventfit-alt2.png',
};

const projectsData: ProjectData[] = [
  {
    number: '01',
    category: 'Flagship AI Platform (Private Beta)',
    title: 'AtlasCV',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    description:
      'AI Placement Kit Generator built with Next.js, Gemini API, and Tailwind CSS. Generates ATS-ready resumes and optimized LinkedIn profiles in 60s for early beta testers.',
    stack: 'Next.js / Gemini API',
    status: 'Private Beta',
  },
  {
    number: '02',
    category: 'Catalog-based Outfit Recommender',
    title: 'EventFit AI',
    col1Image1: EVENTFIT_IMAGES.alt1,
    col1Image2: EVENTFIT_IMAGES.alt2,
    col2Image: EVENTFIT_IMAGES.main,
    description:
      'EventFit AI generates complete outfit combinations from a local clothing catalog, with fallback logic and offline-safe behavior, built for Indian college students.',
    link: 'https://eventfitai.netlify.app/',
    stack: 'React, TypeScript, Vite, Netlify',
    status: 'Live Project',
  },
  {
    number: '03',
    category: 'Robotics Core (Completed Operation)',
    title: 'ECHO-GATE Robotics',
    col1Image1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    description:
      'Centralized robotics architecture & automated operation platform. Successfully delivered firmware development, sensor integration, and autonomous control loops.',
    stack: 'C++ / ROS / Python',
    status: 'Completed',
  },
  {
    number: '04',
    category: 'Instagram Studio & Client Web Development',
    title: 'ctrlhuman.io',
    col1Image1:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80',
    col1Image2:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1280&q=80',
    col2Image:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1280&q=80',
    description:
      'Instagram community hub (@ctrlhuman.io) where we communicate with online clients, acquire leads, and engineer custom high-converting web applications.',
    link: 'https://instagram.com/ctrlhuman.io',
    stack: 'React / Next.js / Tailwind',
    status: 'Client Studio',
  },
  {
    number: '05',
    category: 'Paper Hardware Startup (Ended)',
    title: 'Fold_Fantasia',
    col1Image1:
      'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1280&q=80',
    col1Image2:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80',
    col2Image:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1280&q=80',
    description:
      'Completed paper hardware startup focused on mathematical 3D origami structures, physical paper creations, and custom handcrafted paper design orders.',
    stack: 'Physical Hardware & Design',
    status: 'Completed Startup',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onLiveClick: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onLiveClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-20 sm:top-24 md:top-28 w-full flex justify-center mb-16 sm:mb-20"
      style={{
        top: `calc(5rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-5xl rounded-[32px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
      >
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full border-b border-[#D7E2EA]/15 pb-4">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-[#D7E2EA] select-none">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#D7E2EA]">
                {project.title}
              </h3>
            </div>
          </div>

          <LiveProjectButton onClick={() => onLiveClick(project)} />
        </div>

        {/* Bottom Row - Two Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 w-full">
          {/* Left Column (40% width) */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
            <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden border border-white/10 bg-[#121212]">
              <img
                src={project.col1Image1}
                alt={`${project.title} Detail 1`}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              />
            </div>
            <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden border border-white/10 bg-[#121212]">
              <img
                src={project.col1Image2}
                alt={`${project.title} Detail 2`}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              />
            </div>
          </div>

          {/* Right Column (60% width) */}
          <div className="md:col-span-7 flex">
            <div className="w-full h-full min-h-[260px] sm:min-h-[360px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden border border-white/10 bg-[#121212]">
              <img
                src={project.col2Image}
                alt={`${project.title} Main Preview`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onLiveClick: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onLiveClick }) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
            Project
          </h2>
        </FadeIn>

        {/* Stacked Cards */}
        <div className="w-full flex flex-col items-center">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={projectsData.length}
              onLiveClick={onLiveClick}
            />
          ))}
        </div>

        {/* Quantitative Project Stats & Impact (D3 Chart) */}
        <ProjectStatsSection />
      </div>
    </section>
  );
};
