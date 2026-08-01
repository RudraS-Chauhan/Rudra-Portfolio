import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { SEO } from './components/SEO';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { InitialLoader } from './components/InitialLoader';
import { AudioToggle } from './components/AudioToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { CustomCursor } from './components/CustomCursor';
import { SectionDock } from './components/SectionDock';
import { ResumeModal } from './components/ResumeModal';
import { ProjectFeedbackModal } from './components/ProjectFeedbackModal';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { EducationSection } from './components/EducationSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection, ProjectData } from './components/ProjectsSection';
import { FooterSection } from './components/FooterSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { AiChatModal } from './components/AiChatModal';
import { soundEngine } from './lib/soundEngine';

const sectionFadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const sectionMetadata: Record<string, { section: string; description: string }> = {
  hero: {
    section: 'Lead Engineer & AI Builder',
    description: 'Rudra Singh Chauhan — Architecting enterprise SaaS platforms (AtlasCV), mechatronic systems (FOREFLEX), and catalog AI engines.',
  },
  about: {
    section: 'About Rudra',
    description: 'Learn about Rudra Singh Chauhan — B.Tech CSE (AI/ML) student, founder, and full-stack builder bridging AI models with physical hardware.',
  },
  techstack: {
    section: 'Tech Stack & Skills',
    description: 'Domain expertise in React, Next.js, Java, TypeScript, Gemini API, ROS, Embedded C++, SolidWorks 3D CAD, and SQL.',
  },
  education: {
    section: 'Education & Academic Foundation',
    description: 'Academic background in Computer Science & Engineering (AI/ML) at Bennett University, specializing in scalable systems and robotics.',
  },
  services: {
    section: 'Engineering Services',
    description: 'Full-stack AI development, custom web engineering, mechatronic prototyping, and rapid product MVP architecture.',
  },
  projects: {
    section: 'Featured Projects & Impact',
    description: 'Explore AtlasCV, EventFit AI, ECHO-GATE Robotics, and quantitative project impact benchmarks.',
  },
};

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [feedbackProjectTitle, setFeedbackProjectTitle] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleOpenContact = () => {
    soundEngine.playClick();
    setIsContactOpen(true);
  };
  const handleCloseContact = () => {
    soundEngine.playClick();
    setIsContactOpen(false);
  };

  const handleOpenAi = () => {
    soundEngine.playChime(500, 800, 0.15);
    setIsAiOpen(true);
  };
  const handleCloseAi = () => {
    soundEngine.playClick();
    setIsAiOpen(false);
  };

  const handleOpenResume = () => {
    soundEngine.playChime(450, 750, 0.15);
    setIsResumeOpen(true);
  };
  const handleCloseResume = () => {
    soundEngine.playClick();
    setIsResumeOpen(false);
  };

  const handleOpenFeedback = (projectTitle: string) => {
    soundEngine.playChime(500, 850, 0.15);
    setFeedbackProjectTitle(projectTitle);
  };
  const handleCloseFeedback = () => {
    soundEngine.playClick();
    setFeedbackProjectTitle(null);
  };

  const handleOpenProject = (project: ProjectData) => {
    soundEngine.playChime(400, 650, 0.12);
    setSelectedProject(project);
  };
  const handleCloseProject = () => {
    soundEngine.playClick();
    setSelectedProject(null);
  };

  // Scroll observer to update active section SEO title/metadata dynamically
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'techstack', 'education', 'services', 'projects'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
              const meta = sectionMetadata[id];
              if (meta) {
                document.title = `Rudra Singh Chauhan | ${meta.section}`;
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const currentMeta = sectionMetadata[activeSection] || sectionMetadata.hero;

  return (
    <div className="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] min-h-screen overflow-x-clip">
      {/* Initial Loader */}
      {!isLoaded && <InitialLoader onComplete={() => setIsLoaded(true)} />}

      {/* Interactive Custom Mouse Follower */}
      <CustomCursor />

      {/* Floating Audio Mute/Unmute Toggle & Theme Preference Toggle */}
      <AudioToggle />
      <ThemeToggle />

      {/* Section Dock for Side Dot Navigation */}
      <SectionDock />

      {/* Dynamic SEO Meta Tags */}
      <SEO
        title={selectedProject ? `Project: ${selectedProject.title}` : isAiOpen ? 'Ask AI Assistant' : 'Rudra Singh Chauhan'}
        section={selectedProject ? 'Portfolio' : isAiOpen ? 'Interactive AI' : currentMeta.section}
        description={selectedProject ? selectedProject.description : currentMeta.description}
      />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 1. Hero Section */}
      <div id="hero" className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionFadeInVariants}
          className="relative"
        >
          <HeroSection
            onContactClick={handleOpenContact}
            onAiClick={handleOpenAi}
            onResumeClick={handleOpenResume}
          />
        </motion.div>
      </div>

      {/* 2. About Section */}
      <div id="about" className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionFadeInVariants}
          className="relative"
        >
          <AboutSection
            onContactClick={handleOpenContact}
            onAiClick={handleOpenAi}
            onResumeClick={handleOpenResume}
          />
        </motion.div>
      </div>

      {/* 3. Tech Stack Section */}
      <div id="techstack" className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionFadeInVariants}
          className="relative"
        >
          <TechStackSection />
        </motion.div>
      </div>

      {/* 4. Education Section */}
      <div id="education" className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionFadeInVariants}
          className="relative"
        >
          <EducationSection />
        </motion.div>
      </div>

      {/* 5. Services Section */}
      <div id="services" className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionFadeInVariants}
          className="relative"
        >
          <ServicesSection />
        </motion.div>
      </div>

      {/* 6. Projects Section */}
      <div id="projects" className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.02 }}
          variants={sectionFadeInVariants}
          className="relative"
        >
          <ProjectsSection
            onLiveClick={handleOpenProject}
            onFeedbackClick={handleOpenFeedback}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionFadeInVariants}
        className="relative"
      >
        <FooterSection onContactClick={handleOpenContact} />
      </motion.div>

      {/* Interactive Modals */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
        onOpenFeedback={handleOpenFeedback}
      />
      <AiChatModal isOpen={isAiOpen} onClose={handleCloseAi} />
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
      <ProjectFeedbackModal
        isOpen={Boolean(feedbackProjectTitle)}
        onClose={handleCloseFeedback}
        projectTitle={feedbackProjectTitle || ''}
      />
    </div>
  );
}

export default App;

