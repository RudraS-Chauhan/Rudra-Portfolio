import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectStatsSection } from './ProjectStatsSection';
import { ProjectCaseStudy, CaseStudyDetail } from './ProjectCaseStudy';
import { SEO } from './SEO';

export interface ProjectData {
  number: string;
  category: string;
  title: string;
  col1Image1?: string;
  col1Image2?: string;
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

export const caseStudyDetailsMap: Record<string, CaseStudyDetail> = {
  AtlasCV: {
    badges: [
      { iconName: 'cpu', label: 'Server-Side Gemini 2.5' },
      { iconName: 'lock', label: 'Deterministic Zod Schema' },
      { iconName: 'barchart', label: 'ATS Score Optimizer' },
      { iconName: 'share', label: 'Public Share Links' },
      { iconName: 'file', label: 'ATS PDF Generator' },
      { iconName: 'shield', label: 'Private Beta Pipeline' },
    ],
    features: [
      {
        title: 'Resume Intake & Structuring',
        description:
          'Extract unstructured candidate CVs into strict typed schema nodes using AI vision and multi-modal text models.',
      },
      {
        title: 'ATS Keyword Optimization',
        description:
          'Target job description alignment with real-time keyword density checks and ATS compatibility scoring.',
      },
      {
        title: 'LinkedIn Bio Synthesizer',
        description:
          'Synthesize high-converting headlines, about summaries, and experience impact bullets tailored for tech recruiters.',
      },
      {
        title: '60-Second Placement Kit',
        description:
          'One-click automated generation of tailored cover letter, ATS resume PDF, and recruiter outreach message.',
      },
    ],
    architectureLayers: [
      { name: 'User Client (Next.js 14 SPA)', layer: 'Layer 1' },
      { name: 'Intake Gateway & Upload Parser', layer: 'Layer 2' },
      { name: 'Gemini 2.5 AI Synthesis Engine', layer: 'Layer 3' },
      { name: 'Deterministic Zod Schema Validator', layer: 'Layer 4' },
      { name: 'ATS Keyword Scoring Heuristic', layer: 'Layer 5' },
      { name: 'PDF & Format Compilation Engine', layer: 'Layer 6' },
      { name: 'Supabase DB & Public Share Pages', layer: 'Layer 7' },
    ],
    problem:
      'Engineering graduates and early career developers spend 10+ hours per week manually tailoring resumes and LinkedIn profiles for different ATS systems, leading to high rejection rates due to parsing errors and missing keywords.',
    solution:
      'Engineered a high-speed AI placement kit pipeline that ingests raw master CVs, tokenizes target job descriptions in real-time, and outputs ATS-compliant resumes with tailored keywords in under 60 seconds.',
    architectureText:
      'Built with Next.js 14 App Router for serverless streaming endpoints, Gemini 2.5 API with strict JSON schema outputs, and Tailwind CSS for instant document rendering. Supabase PostgreSQL manages secure candidate records.',
    algorithmTitle: 'ATS GENERATION ENGINE — HOW IT WORKS',
    howItWorksSteps: [
      {
        step: 1,
        title: 'Raw Resume Intake',
        description:
          'Ingest PDF or plain text resume and extract structured profile node trees.',
      },
      {
        step: 2,
        title: 'Job Spec Tokenization',
        description:
          'Tokenize target job specs to extract high-impact skills, tools, and domain keywords.',
      },
      {
        step: 3,
        title: 'Gemini 2.5 Synthesis',
        description:
          'Prompt Gemini model with strict JSON schema constraints for zero-hallucination tailoring.',
      },
      {
        step: 4,
        title: 'ATS Score Verification',
        description:
          'Calculate semantic keyword match score between synthesized output and target vacancy.',
      },
      {
        step: 5,
        title: 'PDF Document Compilation',
        description:
          'Render responsive ATS-ready PDF preview with pixel-exact margins and font metrics.',
      },
      {
        step: 6,
        title: 'Share Link Generation',
        description:
          'Publish secure candidate share links with recruiter analytics tracking.',
      },
    ],
    challengesAndSolutions: [
      {
        challenge:
          'AI models outputting non-deterministic JSON structures that broke PDF rendering components.',
        solution:
          'Implemented strict Zod schema validation middleware with automatic retry and structured fallback outputs before handing off to the front-end renderer.',
      },
      {
        challenge: 'High latency when compiling complex multi-page PDF documents on edge servers.',
        solution:
          'Optimized document compilation with pure React-PDF primitives and client-side web workers.',
      },
    ],
    keyLearnings:
      'Mastered server-side AI prompt chaining, schema-enforced LLM responses, and rapid client-side PDF document compilation.',
    builtWith: {
      frontend: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS'],
      backend: ['Gemini 2.5 API', 'Serverless Edge Functions', 'Zod'],
      auth: ['Supabase Auth', 'PostgreSQL / pgvector'],
      deploy: ['Vercel', 'GitHub Actions'],
    },
  },

  'EventFit AI': {
    badges: [
      { iconName: 'cpu', label: 'Catalog Recommender Engine' },
      { iconName: 'terminal', label: 'College Style Rules' },
      { iconName: 'barchart', label: 'Zero Latency Matrix' },
      { iconName: 'globe', label: 'Offline-First Fallback' },
      { iconName: 'workflow', label: 'Vite + React 18' },
      { iconName: 'shield', label: 'Netlify Edge CDN' },
    ],
    features: [
      {
        title: 'Occasion & Event Filtering',
        description:
          'Select college hackathons, traditional ethnic days, tech fest galas, or casual campus meets.',
      },
      {
        title: 'Color Harmony Matrix',
        description:
          'Algorithmic color contrast and complementary color rule checks applied across local catalog items.',
      },
      {
        title: 'Catalog Inventory Matching',
        description:
          'Real-time stock matching from local clothing catalog inventory without external API latency.',
      },
      {
        title: 'Offline-First Fallback',
        description:
          'Guaranteed outfit recommendations operating seamlessly even under spotty campus Wi-Fi networks.',
      },
    ],
    architectureLayers: [
      { name: 'User Browser (Vite React SPA)', layer: 'Layer 1' },
      { name: 'Event Configurator & Mood Filters', layer: 'Layer 2' },
      { name: 'Color & Harmony Heuristic Core', layer: 'Layer 3' },
      { name: 'Catalog Inventory Repository', layer: 'Layer 4' },
      { name: 'Offline Storage & Local Cache', layer: 'Layer 5' },
      { name: 'Netlify Edge Asset CDN', layer: 'Layer 6' },
    ],
    problem:
      'College students struggle to coordinate appropriate, stylish outfits for varied campus events while relying on unstable campus Wi-Fi networks.',
    solution:
      'Engineered a zero-latency catalog-based outfit recommendation web app operating entirely in-browser with robust color harmony and occasion matching heuristics.',
    architectureText:
      'Built with Vite, React 18, and TypeScript utilizing custom memoized matrix algorithms, styled with Tailwind CSS, and delivered via Netlify Edge CDN.',
    algorithmTitle: 'OUTFIT MATCHING ALGORITHM — HOW IT WORKS',
    howItWorksSteps: [
      {
        step: 1,
        title: 'Occasion Tag Mapping',
        description: 'Map target event tags to curated style attribute vectors.',
      },
      {
        step: 2,
        title: 'Color Distance Calculation',
        description:
          'Calculate color distance and harmony index against top and bottom clothing item pairs.',
      },
      {
        step: 3,
        title: 'Catalog Outfit Scoring',
        description:
          'Rank outfit combinations using weighted occasion and fit preference scores.',
      },
      {
        step: 4,
        title: 'Fallback Resolution',
        description:
          'Trigger client fallback items if specific criteria yield empty subsets.',
      },
      {
        step: 5,
        title: 'Visual Card Rendering',
        description:
          'Output interactive 3D-card outfit combinations with direct shop/catalog links.',
      },
    ],
    challengesAndSolutions: [
      {
        challenge: 'Slow image loading on weak mobile network connections.',
        solution:
          'Pre-cached compressed WebP assets and implemented progressive skeleton loaders with client-side state caching.',
      },
    ],
    keyLearnings:
      'Built expertise in client-side recommendation algorithms, responsive image delivery optimization, and resilient offline web UX.',
    builtWith: {
      frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Client Matrix Matcher', 'Occasion Weight Heuristic'],
      deploy: ['Netlify Edge', 'Vite Bundler'],
    },
  },

  'ECHO-GATE Robotics': {
    badges: [
      { iconName: 'cpu', label: 'ROS / ROS2 Core' },
      { iconName: 'terminal', label: 'C++ Hardware Control' },
      { iconName: 'barchart', label: 'Real-Time Sensor Fusion' },
      { iconName: 'shield', label: 'Autonomous Navigation' },
      { iconName: 'workflow', label: 'Telemetry Pipeline' },
      { iconName: 'lock', label: 'Firmware HAL' },
    ],
    features: [
      {
        title: 'Firmware & HAL Development',
        description:
          'C++ microcontroller code for high-frequency sensor polling and motor driver actuator control.',
      },
      {
        title: 'Sensor Fusion (LiDAR & IMU)',
        description:
          'Extended Kalman Filtering (EKF) combining LiDAR scans, wheel odometry, and IMU telemetry.',
      },
      {
        title: 'Autonomous Path Planning',
        description:
          'Obstacle avoidance and dynamic goal navigation routines built on the ROS navigation stack.',
      },
      {
        title: 'Operator Dashboard Stream',
        description:
          'Real-time robot velocity, battery health, and node status diagnostics streaming over WebSockets.',
      },
    ],
    architectureLayers: [
      { name: 'Operator Control Station (Web UI)', layer: 'Layer 1' },
      { name: 'WebSocket Telemetry Gateway', layer: 'Layer 2' },
      { name: 'ROS Master & Message Interconnect', layer: 'Layer 3' },
      { name: 'Navigation & Path Planner Nodes', layer: 'Layer 4' },
      { name: 'EKF Sensor Fusion Node', layer: 'Layer 5' },
      { name: 'C++ STM32/ESP32 Firmware HAL', layer: 'Layer 6' },
      { name: 'Motor Actuators & LiDAR Hardware', layer: 'Layer 7' },
    ],
    problem:
      'Mobile robotics platforms face high latency and control loss when integrating heterogeneous sensor feeds with high-level navigation code.',
    solution:
      'Engineered a modular ROS C++/Python framework with low-latency inter-process communication (IPC) and embedded microcontroller firmware HAL.',
    architectureText:
      'Built with C++ micro-code on hardware controllers, ROS navigation stack for spatial mapping, and Python dashboard bridges.',
    algorithmTitle: 'AUTONOMOUS CONTROL LOOP — HOW IT WORKS',
    howItWorksSteps: [
      {
        step: 1,
        title: 'Sensor Feed Acquisition',
        description:
          'Read raw serial streams from 360 LiDAR, wheel encoders, and IMU sensors.',
      },
      {
        step: 2,
        title: 'Kalman State Estimation',
        description:
          'Execute EKF sensor fusion to calculate state estimation and robot location.',
      },
      {
        step: 3,
        title: 'Trajectory Traversal',
        description:
          'Compute optimal paths avoiding static and dynamic obstacles.',
      },
      {
        step: 4,
        title: 'PID Actuator Control',
        description:
          'Send high-frequency PWM velocity commands to motor drivers.',
      },
      {
        step: 5,
        title: 'Heartbeat Telemetry',
        description:
          'Stream node health and safety heartbeats back to ground station.',
      },
    ],
    challengesAndSolutions: [
      {
        challenge: 'High sensor noise causing jitter in autonomous trajectory planning.',
        solution:
          'Designed multi-stage moving average and Kalman filters in C++ before publishing to ROS odometry topics.',
      },
    ],
    keyLearnings:
      'Deepened mastery in mechatronics, C++ firmware optimization, real-time control loops, and ROS system architecture.',
    builtWith: {
      frontend: ['React', 'TypeScript', 'WebSockets'],
      backend: ['ROS / ROS2', 'Python Telemetry Bridge'],
      hardware: ['C++', 'STM32 / ESP32', '360 LiDAR', 'IMU', 'PID Loops'],
    },
  },
};

export const projectsData: ProjectData[] = [
  {
    number: '01',
    category: 'Flagship AI Platform (Private Beta)',
    title: 'AtlasCV',
    col1Image1: '/images/projects/atlascv-feature1.png',
    col1Image2: '/images/projects/atlascv-feature2.png',
    col2Image: '/images/projects/atlascv-main.png',
    description:
      'AI Placement Kit Generator built with Next.js, Gemini API, and Tailwind CSS. Generates ATS-ready resumes and optimized LinkedIn profiles in 60s for early beta testers.',
    stack: 'Next.js / Gemini API',
    status: 'Private Beta',
  },
  {
    number: '02',
    category: 'Catalog-based Outfit Recommender',
    title: 'EventFit AI',
    col1Image1: '/images/projects/eventfit-feature1.png',
    col1Image2: '/images/projects/eventfit-feature2.png',
    col2Image: '/images/projects/eventfit-main.png',
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
    col1Image1: '/images/projects/echogate-feature1.png',
    col2Image: '/images/projects/echogate-main.png',
    description:
      'Centralized robotics architecture & automated operation platform. Successfully delivered firmware development, sensor integration, and autonomous control loops.',
    stack: 'C++ / ROS / Python',
    status: 'Completed',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onLiveClick: (project: ProjectData) => void;
  onFeedbackClick: (projectTitle: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onLiveClick,
  onFeedbackClick,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const caseStudyData = caseStudyDetailsMap[project.title];

  // Derive screenshot file names for user guidance
  const slug = project.title.toLowerCase().replace(/[^a-z0-9]/g, '');

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string) => {
    const target = e.currentTarget;
    if (target.src !== fallbackUrl) {
      target.src = fallbackUrl;
    }
  };

  // Fallback web URLs if user hasn't added real local screenshots yet
  const defaultWebFallbacks: Record<string, { main: string; feat1: string; feat2: string }> = {
    AtlasCV: {
      main: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
      feat1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      feat2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    },
    'EventFit AI': {
      main: EVENTFIT_IMAGES.main,
      feat1: EVENTFIT_IMAGES.alt1,
      feat2: EVENTFIT_IMAGES.alt2,
    },
    'ECHO-GATE Robotics': {
      main: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
      feat1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      feat2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    },
  };

  const fallbacks = defaultWebFallbacks[project.title] || defaultWebFallbacks.AtlasCV;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => {
        // Auto open on scroll into view for an interactive experience!
        if (!isExpanded) setIsExpanded(true);
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full max-w-5xl"
    >
      <div className="w-full rounded-[28px] sm:rounded-[40px] md:rounded-[50px] border-2 border-[#D7E2EA]/30 hover:border-[#B600A8]/60 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300">
        {/* Top Row - Clickable Header */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full border-b border-[#D7E2EA]/15 pb-4 cursor-pointer group"
        >
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <span className="font-black text-[clamp(2.2rem,6vw,4.5rem)] leading-none text-[#D7E2EA] group-hover:text-[#B600A8] transition-colors select-none">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#D7E2EA] group-hover:text-white transition-colors">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white bg-[#B600A8] hover:bg-[#7621B0] px-3.5 py-2 rounded-full shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isExpanded ? 'Collapse' : 'Interactive View'}</span>
              <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFeedbackClick(project.title);
              }}
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#D7E2EA]/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-white/10 transition-colors cursor-pointer"
            >
              Rate Project
            </button>
            <LiveProjectButton onClick={() => onLiveClick(project)} />
          </div>
        </div>

        {/* Description & Stack pill */}
        {project.description && (
          <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Local Screenshot Directory Helper Badge */}
        <div className="bg-[#141418] border border-white/10 rounded-2xl p-3 sm:p-4 text-xs font-mono text-[#D7E2EA]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#B600A8] font-bold">📁 Screenshot Folder:</span>
            <code className="bg-white/5 px-2 py-0.5 rounded border border-white/10 text-white font-semibold">
              /public/images/projects/
            </code>
          </div>
          <div className="text-[11px] text-[#D7E2EA]/50">
            Filenames: <span className="text-[#E699FF]">{slug}-main.png</span>, <span className="text-[#E699FF]">{slug}-feature1.png</span>
          </div>
        </div>

        {/* Bottom Row - Image Grid (3-image or 2-image layout) */}
        {project.col1Image2 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 w-full">
            {/* Left Column (40% width) */}
            <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
              <div className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-white/10 bg-[#121212]">
                <img
                  src={project.col1Image1}
                  onError={(e) => handleImageError(e, fallbacks.feat1)}
                  alt={`${project.title} Feature 1`}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ height: 'clamp(120px, 15vw, 210px)' }}
                />
              </div>
              <div className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-white/10 bg-[#121212]">
                <img
                  src={project.col1Image2}
                  onError={(e) => handleImageError(e, fallbacks.feat2)}
                  alt={`${project.title} Feature 2`}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ height: 'clamp(140px, 18vw, 260px)' }}
                />
              </div>
            </div>

            {/* Right Column (60% width) */}
            <div className="md:col-span-7 flex">
              <div className="w-full h-full min-h-[240px] sm:min-h-[340px] rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-white/10 bg-[#121212]">
                <img
                  src={project.col2Image}
                  onError={(e) => handleImageError(e, fallbacks.main)}
                  alt={`${project.title} Main Preview`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Clean 2-image grid for hardware/firmware projects */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
            {project.col1Image1 && (
              <div className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-white/10 bg-[#121212] min-h-[220px] sm:min-h-[300px]">
                <img
                  src={project.col1Image1}
                  onError={(e) => handleImageError(e, fallbacks.feat1)}
                  alt={`${project.title} Hardware Module`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            <div className="w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-white/10 bg-[#121212] min-h-[220px] sm:min-h-[300px]">
              <img
                src={project.col2Image}
                onError={(e) => handleImageError(e, fallbacks.main)}
                alt={`${project.title} Main Operation`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        )}

        {/* Interactive Open-on-Scroll Case Study Deep-Dive */}
        {caseStudyData && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ProjectCaseStudy
              project={project}
              caseStudy={caseStudyData}
              onLiveClick={() => onLiveClick(project)}
              onFeedbackClick={() => onFeedbackClick(project.title)}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

interface ProjectsSectionProps {
  onLiveClick: (project: ProjectData) => void;
  onFeedbackClick: (projectTitle: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onLiveClick, onFeedbackClick }) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 relative px-5 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32 w-full select-none"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-12 sm:mb-16 md:mb-20">
            Projects
          </h2>
        </FadeIn>

        {/* Project Cards Stack */}
        <div className="w-full flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={projectsData.length}
              onLiveClick={onLiveClick}
              onFeedbackClick={onFeedbackClick}
            />
          ))}
        </div>

        {/* Quantitative Project Stats & Impact (D3 Chart + GitHub Showcase) */}
        <ProjectStatsSection />
      </div>
    </section>
  );
};

