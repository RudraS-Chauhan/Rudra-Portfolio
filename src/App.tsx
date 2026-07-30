import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ScrollProgressBar } from './components/ScrollProgressBar';
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

const sectionFadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
};

export function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const handleOpenAi = () => setIsAiOpen(true);
  const handleCloseAi = () => setIsAiOpen(false);

  const handleOpenProject = (project: ProjectData) => setSelectedProject(project);
  const handleCloseProject = () => setSelectedProject(null);

  return (
    <div className="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] min-h-screen overflow-x-clip">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 1. Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionFadeInVariants}
      >
        <HeroSection onContactClick={handleOpenContact} onAiClick={handleOpenAi} />
      </motion.div>

      {/* 2. About Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionFadeInVariants}
      >
        <AboutSection onContactClick={handleOpenContact} />
      </motion.div>

      {/* 3. Tech Stack Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionFadeInVariants}
      >
        <TechStackSection />
      </motion.div>

      {/* 4. Education Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionFadeInVariants}
      >
        <EducationSection />
      </motion.div>

      {/* 5. Services Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionFadeInVariants}
      >
        <ServicesSection />
      </motion.div>

      {/* 6. Projects Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionFadeInVariants}
      >
        <ProjectsSection onLiveClick={handleOpenProject} />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionFadeInVariants}
      >
        <FooterSection onContactClick={handleOpenContact} />
      </motion.div>

      {/* Interactive Modals */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
      <ProjectModal project={selectedProject} onClose={handleCloseProject} />
      <AiChatModal isOpen={isAiOpen} onClose={handleCloseAi} />
    </div>
  );
}

export default App;
