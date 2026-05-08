"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiReact, 
  SiNextdotjs, SiNodedotjs, SiTailwindcss, SiFlutter, SiFirebase, 
  SiDocker, SiGit, SiVercel, SiGooglegemini, SiDart, SiGithub 
} from 'react-icons/si';
import { FaJava, FaDatabase, FaRobot, FaMicrochip, FaCogs, FaProjectDiagram } from 'react-icons/fa';
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;
try {
  // Safely check for process/import.meta.env to prevent white screens in Vercel
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || 
                 (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY);
  
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (e) {
  console.error("Gemini API key is not set or invalid.", e);
}

const countUpCurve = (progress: number) => 1 - Math.pow(1 - progress, 3);

const techDescriptions: Record<string, string> = {
  'JavaScript': 'Core web scripting language.',
  'TypeScript': 'Strongly-typed superset of JS.',
  'Python': 'Used for AI, scripting, and backend.',
  'Java': 'Enterprise-level OOP and Android.',
  'C++': 'High-performance systems programming.',
  'SQL': 'Relational database architecture.',
  'React': 'Component-based UI library.',
  'Next.js': 'React framework for production.',
  'Node.js': 'Asynchronous server-side JS.',
  'Tailwind': 'Utility-first CSS framework.',
  'Tailwind CSS': 'Utility-first CSS framework.',
  'Flutter': 'Cross-platform mobile UI framework.',
  'Dart (Flutter)': 'Language for Flutter development.',
  'Firebase': 'BaaS for rapid application development.',
  'Docker': 'Containerization for consistent environments.',
  'Git': 'Version control system.',
  'Git & GitHub': 'Version control & collaboration.',
  'Vercel': 'Deployment and hosting platform.',
  'REST APIs': 'Standard communications.',
  'SQL databases': 'Structured data storage.',
  'Gemini AI': 'Google\'s advanced LLM ecosystem.',
  'Google Gemini': 'Google\'s advanced LLM ecosystem.',
  'Claude AI': 'Anthropic\'s LLM models.',
  'Prompt Engineering': 'Optimizing LLM outputs.',
  'SolidWorks': '3D CAD design for hardware.',
  'Hardware Integration': 'Bridging software & physical systems.',
  'Rapid Prototyping': 'Iterative physical development.',
};

const techIcons: Record<string, React.ReactNode> = {
  'JavaScript': <SiJavascript className="w-4 h-4" />,
  'TypeScript': <SiTypescript className="w-4 h-4" />,
  'Python': <SiPython className="w-4 h-4" />,
  'Java': <FaJava className="w-4 h-4" />,
  'C++': <SiCplusplus className="w-4 h-4" />,
  'SQL': <FaDatabase className="w-4 h-4" />,
  'React': <SiReact className="w-4 h-4" />,
  'Next.js': <SiNextdotjs className="w-4 h-4" />,
  'Node.js': <SiNodedotjs className="w-4 h-4" />,
  'Tailwind': <SiTailwindcss className="w-4 h-4" />,
  'Tailwind CSS': <SiTailwindcss className="w-4 h-4" />,
  'Flutter': <SiFlutter className="w-4 h-4" />,
  'Dart (Flutter)': <SiDart className="w-4 h-4" />,
  'Firebase': <SiFirebase className="w-4 h-4" />,
  'Docker': <SiDocker className="w-4 h-4" />,
  'Git': <SiGit className="w-4 h-4" />,
  'Git & GitHub': <SiGithub className="w-4 h-4" />,
  'Vercel': <SiVercel className="w-4 h-4" />,
  'REST APIs': <FaProjectDiagram className="w-4 h-4" />,
  'SQL databases': <FaDatabase className="w-4 h-4" />,
  'Gemini AI': <SiGooglegemini className="w-4 h-4" />,
  'Google Gemini': <SiGooglegemini className="w-4 h-4" />,
  'Claude AI': <FaRobot className="w-4 h-4" />,
  'Prompt Engineering': <FaRobot className="w-4 h-4" />,
  'SolidWorks': <FaCogs className="w-4 h-4" />,
  'Hardware Integration': <FaMicrochip className="w-4 h-4" />,
  'Rapid Prototyping': <FaCogs className="w-4 h-4" />,
};

const TooltipTag = ({ text, children, className }: { text?: string, children: React.ReactNode, className?: string }) => {
  return (
    <div className={`group relative flex ${className || ''}`}>
      {children}
      {text && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#22c55e]/30 text-white/90 text-xs rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-[100]">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#22c55e]/30" />
        </div>
      )}
    </div>
  );
};

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
  const [isScrambling, setIsScrambling] = useState(true);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

  useEffect(() => {
    let frame = 0;
    const queue = text.split('').map((char, idx) => ({
      from: char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)],
      to: char,
      start: Math.floor(idx * 3.6),
      end: Math.floor(idx * 3.6) + 8,
      char: ''
    }));
    let rafId: number;
    const update = () => {
      let complete = 0;
      let output = '';
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!queue[i].char || Math.random() < 0.28) {
            queue[i].char = chars[Math.floor(Math.random() * chars.length)];
          }
          output += queue[i].char;
        } else {
          output += from;
        }
      }
      setDisplayText(output);
      if (complete === queue.length) {
        setIsScrambling(false);
      } else {
        frame++;
        rafId = requestAnimationFrame(update);
      }
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [text]);

  return (
    <span className={`transition-colors duration-150 ${isScrambling ? 'text-[#22c55e]' : 'text-white'}`}>
      {displayText}
    </span>
  );
};

const TypingText = () => {
  const phrases = [
    "I build fast. I learn faster.",
    "Engineering AI-Powered Products.",
    "Integrating Frontends with Hardware.",
    "Deploying scalable Full-Stack apps."
  ];
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: NodeJS.Timeout;
    
    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        timeout = setTimeout(() => {}, 400); // Wait before typing next
      } else {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 30);
      }
    } else {
      if (text === currentPhrase) {
        timeout = setTimeout(() => setIsDeleting(true), 2500); // Wait before deleting
      } else {
        timeout = setTimeout(() => setText(currentPhrase.slice(0, text.length + 1)), 60);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span>
      <span className="text-white/60">{text}</span>
      <span className="text-[#22c55e] animate-[pulse_530ms_infinite]">|</span>
    </span>
  );
};

const TypewriterQuote = ({ quote }: { quote: string }) => {
  const [text, setText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let timeout: NodeJS.Timeout;
    if (text !== quote) {
      timeout = setTimeout(() => setText(quote.slice(0, text.length + 1)), 25);
    }
    return () => clearTimeout(timeout);
  }, [text, hasStarted, quote]);

  return (
    <span ref={ref}>
      {text}
      {text.length < quote.length && <span className="animate-[pulse_500ms_infinite] opacity-50">|</span>}
    </span>
  );
};

const CountUp = ({ end, suffix = '' }: { end: number, suffix?: string }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasTriggered) {
        setHasTriggered(true);
        let startTime: number;
        const duration = 2000;
        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easedProgress = countUpCurve(progress);
          setValue(Math.round(easedProgress * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasTriggered]);

  return (
    <span ref={ref}>
      {value}{value === end ? suffix : ''}
    </span>
  );
};

const MagneticButton = ({ children, className, href, onClick }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(x * x + y * y);
    if (distance < 100) {
      const pull = 0.28;
      const tx = Math.max(-12, Math.min(12, x * pull));
      const ty = Math.max(-12, Math.min(12, y * pull));
      ref.current.style.transform = `translate(${tx}px, ${ty}px)`;
      ref.current.style.transition = 'transform 0.1s ease';
    } else {
      ref.current.style.transform = `translate(0px, 0px)`;
    }
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0px, 0px)`;
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  };

  const Wrapper = href ? 'a' : 'button';
  const props = href ? { href, target: href.startsWith('#') ? '_self' : '_blank', rel: 'noopener noreferrer' } : { onClick };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="inline-block">
      <Wrapper className={className} {...props}>
        {children}
      </Wrapper>
    </div>
  );
};

const TiltCard = ({ children, className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current || !shineRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    const rotateX = (mouseY - 0.5) * -12;
    const rotateY = (mouseX - 0.5) * 12;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    ref.current.style.transition = 'transform 0.1s ease';
    shineRef.current.style.background = `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, rgba(255,255,255,0.07) 0%, transparent 60%)`;
    shineRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (!ref.current || !shineRef.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    ref.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    shineRef.current.style.opacity = '0';
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`relative overflow-hidden ${className}`}>
      <div ref={shineRef} className="absolute inset-0 pointer-events-none z-[1] opacity-0 transition-opacity duration-300" style={{ borderRadius: 'inherit' }} />
      <div className="relative z-[2] h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};


const ChatWidget = () => {
  const [mood, setMood] = useState('technical');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{role: 'system' | 'user', text: string}[]>([
    { role: 'system', text: "Hello! I'm Rudra's AI assistant. I can answer questions about his skills, projects, and availability. What would you like to know?" }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    const userMessage = text.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const systemInstruction = `
        You are a friendly and professional AI assistant for Rudra Singh Chauhan's portfolio.
        Rudra is a first-year BTech student specializing in AI & Machine Learning at Galgotias University.
        
        Persona: ${mood === 'technical' ? 'Highly technical, precise, focusing on code and architecture.' : 
                  mood === 'visionary' ? 'Inspiring, focusing on the future of AI and innovation.' : 
                  mood === 'summarized' ? 'Extremely concise, bullet points, getting straight to the facts.' : 
                  'Casual, friendly, approachable, like a helpful peer.'}

        Key information about Rudra:
        - Role: Lead Engineer @ ECHO-GATE Robotics, AI & Full-Stack Developer.
        - Core Projects:
          1. AtlasCV: AI Placement Kit Generator (Next.js, Gemini API, Tailwind). Helps students get ATS resumes and LinkedIn profiles in 60s.
          2. ECHO-GATE: Leading architectural development for centralized robotics and automated operations core.
          3. FOREFLEX-AMTU: Bionic ankle actuator research (Hardware/CAD/SolidWorks).
          4. Fold_Fantasia: Previous 3D origami venture (2.5x growth).
        - Skills: JavaScript, TypeScript, Python, Java, C++, SQL, React, Next.js, Node.js, Tailwind CSS, Flutter, Dart, Firebase, Docker, Git.
        - Availability: Open to internships, projects, and collaborations.
        - Contact: rudra.dev.builds@gmail.com, WhatsApp: +91 7084150015.
        
        Guidelines:
        - Keep responses concise and helpful.
        - If you don't know something, be honest but mention Rudra's broad learning capacity.
        - Encourage the user to contact Rudra for specific inquiries.
      `;

      if (!ai) {
        setMessages(prev => [...prev, { role: 'system', text: "The AI assistant is currently unavailable. Please setup your Gemini API Key in the environment variables." }]);
        setIsTyping(false);
        return;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({ role: m.role === 'system' ? 'model' : 'user', parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I'm having a little trouble connecting right now, but feel free to reach out to Rudra directly!";
      setMessages(prev => [...prev, { role: 'system', text: reply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'system', text: "I encountered an error. Please try again later or contact Rudra directly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="mt-8 md:mt-12 bg-[#111] border border-white/5 rounded-3xl p-4 md:p-6 relative flex flex-col w-full shadow-2xl h-[450px] max-w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 md:mb-6 shrink-0 gap-4">
         <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
           <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
             <SiGooglegemini className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
           </div>
           <div className="overflow-hidden">
             <div className="text-white font-bold text-xs md:text-sm tracking-wide truncate">Portfolio Assistant</div>
             <div className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-wider mt-0.5 animate-pulse">Powered by Gemini</div>
           </div>
         </div>
         <div className="relative shrink-0">
           <select 
             value={mood} 
             onChange={(e) => setMood(e.target.value)}
             className="appearance-none pl-2 md:pl-3 pr-7 md:pr-8 py-1 md:py-1.5 bg-[#1a1a1a] border border-white/10 hover:border-white/20 rounded-lg text-[10px] md:text-xs text-white/70 focus:outline-none cursor-pointer flex items-center shadow-lg"
           >
             <option value="technical">⚙️ Technical</option>
             <option value="visionary">👁️ Visionary</option>
             <option value="summarized">⚡ Summarized</option>
             <option value="casual">👋 Casual</option>
           </select>
           <svg className="w-3 h-3 text-white/50 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 md:gap-4 mb-4 md:mb-6 pr-1 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 md:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'system' && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500"></span>
              </div>
            )}
            <div className={`p-3 md:p-4 text-xs md:text-sm rounded-2xl shadow-xl leading-relaxed max-w-[85%] md:max-w-[80%] ${
              msg.role === 'user' 
                ? 'bg-[#22c55e]/20 text-[#22c55e] rounded-tr-sm border border-[#22c55e]/30' 
                : 'bg-[#1a1a1a] border border-white/5 text-white/80 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 md:gap-3 animate-pulse">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
               <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <div className="p-3 md:p-4 bg-[#1a1a1a] border border-white/5 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['What is AtlasCV?', 'Tell me about ECHO-GATE', 'Why hire Rudra?', 'Current projects'].map((q) => (
             <button key={q} onClick={() => handleSend(q)} className="shrink-0 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-[11px] font-medium text-white/60 hover:text-white hover:border-white/30 transition-colors whitespace-nowrap">
               {q}
             </button>
          ))}
        </div>

        <div className="relative mt-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Ask AI about Rudra..." 
            className="w-full bg-[#161616] border border-white/10 rounded-xl py-2.5 md:py-3 pl-4 pr-12 text-xs md:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#22c55e]/50 transition-colors"
            disabled={isTyping}
          />
          <button 
            onClick={() => handleSend(inputValue)} 
            disabled={isTyping}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Modal State
  const [selectedProject, setSelectedProject] = useState<{title: string, role: string, description: string, tech: string[], link?: string, github?: string} | null>(null);

  // Blog State
  const defaultBlogs = useMemo(() => [
    {
      id: 1,
      title: "The Exponential Multiplier: Why AI is More Than Just a Copilot",
      content: "Exploring how leveraging early adoption of advanced AI frameworks transforms the engineering workflow from incremental to exponential. When you start building with robust AI tooling, the mindset shifts from simply writing code efficiently to architecting entire systems and having the AI serve as your robust compiler and intelligent ideation partner.",
      date: "Dec 12, 2025",
      readTime: "5 min read",
      category: "AI & Tech",
      excerpt: "Leveraging advanced AI frameworks changes the engineering workflow from mere linear progression to exponential leaps in productivity. In this article, I explore how shifting the mindset from standard coding to high-level architecture with AI leads to building much larger and more robust systems. Find out how AI serves as an intelligent ideation partner rather than just a code generator.",
    },
    {
      id: 2,
      title: "Architecting FOREFLEX-AMTU: Lessons in Bionic Hardware",
      content: "A deep dive into the electro-mechanical challenges and CAD iterations behind retrofitting passive prosthetics with active ankle actuators. Hardware is fundamentally unforgiving, testing your ability to iterate structurally while maintaining rigid constraints.",
      date: "Nov 28, 2025",
      readTime: "8 min read",
      category: "Hardware",
      excerpt: "Building physical hardware involves entirely different challenges compared to pure software development. Join me in a deep dive into the electro-mechanical hurdles and iterative CAD design process behind retrofitting passive prosthetics with active ankle actuators. Learn why rigid constraints make hardware development both challenging and intensely rewarding.",
    },
    {
      id: 3,
      title: "Shipping AtlasCV: From Idea to Hundreds of Users in Weeks",
      content: "How I built and scaled a live AI placement kit platform, the architectural decisions, and the reality of serving real users. Building for actual individuals introduces edge cases that no tutorial will ever prepare you for, emphasizing why shipping fast and listening is essential.",
      date: "Oct 15, 2025",
      readTime: "6 min read",
      category: "Engineering",
      excerpt: "Taking an idea from inception to a live platform used by hundreds of people is a transformational journey. This post breaks down the core architectural choices that powered AtlasCV and the harsh reality of dealing with real-world edge cases. Discover the lessons learned from failing pipelines, user feedback, and why shipping the MVP is the most critical step.",
    }
  ], []);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [newBlogForm, setNewBlogForm] = useState({ title: '', content: '', date: '' });

  useEffect(() => {
    const saved = localStorage.getItem('user_blogs');
    setTimeout(() => {
      if (saved) {
        setBlogs(JSON.parse(saved));
      } else {
        setBlogs(defaultBlogs);
      }
      setLoadingBlogs(false);
    }, 1500);
  }, [defaultBlogs]);

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogForm.title || !newBlogForm.content || !newBlogForm.date) return;
    const newBlog = {
      id: Date.now(),
      title: newBlogForm.title,
      content: newBlogForm.content,
      excerpt: newBlogForm.content.slice(0, 100) + '...',
      date: newBlogForm.date,
      readTime: Math.max(1, Math.ceil(newBlogForm.content.split(' ').length / 200)) + " min read",
      category: "Update"
    };
    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    localStorage.setItem('user_blogs', JSON.stringify(updatedBlogs));
    setIsCreatingBlog(false);
    setNewBlogForm({ title: '', content: '', date: '' });
  };

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<{name?: string, email?: string, message?: string}>({});
  const [touched, setTouched] = useState<{name?: boolean, email?: boolean, message?: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const validationTimeout = useRef<number | null>(null);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name' && !value.trim()) error = 'Name is required.';
    if (name === 'email') {
      if (!value.trim()) error = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address.';
    }
    if (name === 'message' && !value.trim()) error = 'Message is required.';
    return error;
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('contact', '').toLowerCase();
    
    setContactForm(prev => ({ ...prev, [fieldName]: value }));
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    if (validationTimeout.current) clearTimeout(validationTimeout.current);
    
    validationTimeout.current = window.setTimeout(() => {
      setFormErrors(prev => ({ ...prev, [fieldName]: validateField(fieldName, value) }));
    }, 400);
  };

  const validateForm = () => {
    const errors: {name?: string, email?: string, message?: string} = {
      name: validateField('name', contactForm.name),
      email: validateField('email', contactForm.email),
      message: validateField('message', contactForm.message)
    };
    // remove empty strings
    Object.keys(errors).forEach(key => {
      if (!errors[key as keyof typeof errors]) delete errors[key as keyof typeof errors];
    });
    setFormErrors(errors);
    setTouched({ name: true, email: true, message: true });
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const subject = encodeURIComponent(`Portfolio Contact from ${contactForm.name}`);
      const body = encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`);
      
      // Open default email client
      window.location.href = `mailto:rudra.dev.builds@gmail.com?subject=${subject}&body=${body}`;
      
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTouched({});
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('rudra.dev.builds@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  useEffect(() => {
    setIsMounted(true);
    document.title = "Rudra Singh Chauhan — Builder";
    
    // Ensure we start at the top
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(totalScroll / windowHeight);
      setNavScrolled(totalScroll > 80);
    };
    window.addEventListener('scroll', handleScroll);

    // Loading screen timeout
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(Math.round((elapsed / 2000) * 100), 100);
      setLoadingProgress(progress);
    }, 20);

    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
      clearInterval(interval);
    }, 2000);

    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(anchor.hash) as HTMLElement;
        if (el) {
          window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
          setMenuOpen(false);
        }
      }
    };
    document.addEventListener('click', handleNavClick as any);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleNavClick as any);
      clearTimeout(loadTimeout);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  if (!isMounted) return null;

  return (
    <div className="bg-[#080808] min-h-screen text-white font-sans selection:bg-[#22c55e]/30 selection:text-white relative overflow-x-hidden w-full max-w-[100vw]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes fadeIn { to { opacity: 1; } }
        body { overflow-x: hidden; width: 100%; position: relative; }
        body::before { content: ""; position: fixed; inset: 0; background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E"); pointer-events: none; z-index: 0; }
        .text-glow { text-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
        .border-glow { box-shadow: 0 0 30px rgba(34, 197, 94, 0.12); }
        .gradient-text { background: linear-gradient(90deg, #4ade80, #a3e635); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .loader-line { animation: loadingSlide 2s cubic-bezier(0.85, 0, 0.15, 1) forwards; }
        @keyframes loadingSlide { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes fadeCycle { 0%, 45% { opacity: 1; visibility: visible; } 50%, 95% { opacity: 0; visibility: hidden; } 100% { opacity: 1; visibility: visible; } }
        @keyframes fadeCycleOffset { 0%, 45% { opacity: 0; visibility: hidden; } 50%, 95% { opacity: 1; visibility: visible; } 100% { opacity: 0; visibility: hidden; } }
        @keyframes slide { from { background-position: 0 0; } to { background-position: 40px 40px; } }
      `}} />

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-[10000] bg-[#080808] flex items-center justify-center transition-opacity duration-500">
          <div className="flex flex-col items-center">
            <div className="font-mono text-3xl font-bold text-white tracking-widest mb-4 opacity-80">RSC</div>
            <div className="font-mono text-[#22c55e] text-lg mb-4">{loadingProgress}%</div>
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-[#22c55e] loader-line" />
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#22c55e] to-[#a3e635] z-[9999]" style={{ width: `${scrollProgress * 100}%` }} />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navScrolled ? 'bg-[#080808]/80 backdrop-blur-[20px] border-b border-[#22c55e]/10 py-1' : 'bg-transparent border-transparent py-4'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between relative">
          <a href="#hero" className="font-mono font-black text-[20px] md:text-[24px] tracking-tighter flex items-center gap-1 group relative z-10 w-auto md:w-[80px]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-emerald-200 group-hover:to-white transition-all duration-500">RSC</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#22c55e] animate-pulse group-hover:scale-150 transition-transform duration-300"></span>
          </a>
          
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center px-6 lg:px-8 py-3 rounded-full bg-[#111]/80 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-0">
            <div className="flex items-center gap-6 text-[13px] font-medium text-white/50 tracking-widest uppercase">
              <a href="#work" className="hover:text-white transition-colors duration-200">Work</a>
              <a href="#journey" className="hover:text-white transition-colors duration-200">Journey</a>
              <a href="#about" className="hover:text-white transition-colors duration-200">About</a>
              <a href="#skills" className="hover:text-white transition-colors duration-200">Skills</a>
              <a href="#insights" className="hover:text-white transition-colors duration-200">Insights</a>
              <a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a>
            </div>
          </div>
          
          <div className="hidden md:flex items-center justify-end w-[80px] z-10">
            <MagneticButton href="#contact" className="px-5 py-2.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-sm font-medium hover:bg-[#22c55e] hover:text-black transition-all duration-300 cursor-pointer w-max whitespace-nowrap shadow-[0_0_15px_rgba(34,197,94,0.15)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              Let's Talk
            </MagneticButton>
          </div>
          
          <button className="md:hidden text-[#22c55e] p-2 -mr-2 z-10" onClick={() => setMenuOpen(true)} aria-label="Open Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-[#080808]/98 backdrop-blur-md z-[100] flex flex-col items-center justify-center">
          <button className="absolute top-6 right-6 text-[#22c55e] p-2" onClick={() => setMenuOpen(false)} aria-label="Close Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div className="flex flex-col items-center gap-8 text-[32px] font-bold">
            {['Work', 'Journey', 'About', 'Skills', 'Insights', 'Contact'].map((item, i) => (
              <motion.a key={item} href={`#${item.toLowerCase()}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="text-white hover:text-[#22c55e] transition-colors" onClick={() => setMenuOpen(false)}>
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hero */}
      <section id="hero" className="min-h-screen flex flex-col justify-center pt-28 md:pt-32 pb-16 md:pb-20 max-w-6xl mx-auto px-4 md:px-10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] md:w-[800px] h-[300px] md:h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.04)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col items-start text-left w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full text-[11px] md:text-[12px] text-[#22c55e] mb-5 md:mb-6 font-medium tracking-wide">
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#22c55e] rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
            Systems & Machine Learning
          </div>
          <h1 className="text-[clamp(40px,10vw,96px)] font-black leading-[1.05] md:leading-[1.1] mb-2 tracking-tight group w-full">
            <span className="text-white/40 block text-[clamp(18px,4vw,48px)] mb-1 md:mb-2 font-mono font-medium tracking-tight">
              <ScrambleText text="Hi, I am" />
            </span>
            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
              <span className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#22c55e] hover:to-emerald-200 transition-all duration-300">Rudra</span>
              <span className="text-[#22c55e] animate-[bounce_2s_infinite] origin-bottom inline-block text-[0.8em]">👋</span>
            </div>
            <span className="gradient-text block mt-2 text-[clamp(20px,5vw,48px)]">Engineering Tomorrow's Innovations</span>
          </h1>
          <div className="text-lg md:text-2xl text-white/50 mb-8 mt-2 h-auto min-h-[2rem]">
            <TypingText />
          </div>
          <div className="flex flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
            <MagneticButton href="#work" className="w-full sm:w-auto bg-[#22c55e] text-black font-bold px-6 md:px-8 py-3.5 md:py-4 rounded-xl shadow-lg shadow-[#22c55e]/20 hover:bg-[#4ade80] hover:scale-[1.02] transition-all cursor-pointer text-center">
              See My Work ↓
            </MagneticButton>
            <MagneticButton href="#contact" className="w-full sm:w-auto border border-white/10 px-6 md:px-8 py-3.5 md:py-4 rounded-xl text-white/80 hover:border-[#22c55e] hover:bg-[#22c55e]/10 transition-all cursor-pointer text-center">
              Let's Talk →
            </MagneticButton>
          </div>
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl">
            <div className="bg-[#111] border border-white/5 rounded-[20px] p-5 md:p-6 lg:p-8 flex items-center gap-4 md:gap-6 hover:border-emerald-500/20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)]">
              <div className="w-14 h-14 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center shrink-0 shadow-inner">
                 <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-1"><CountUp end={1} />+</div>
                <div className="text-xs lg:text-sm text-white/50 font-medium">Live AI Products</div>
              </div>
            </div>
            
            <div className="bg-[#111] border border-white/5 rounded-[20px] p-6 lg:p-8 flex items-center gap-6 hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]">
              <div className="w-14 h-14 rounded-2xl border border-blue-500/20 bg-blue-500/10 flex items-center justify-center shrink-0 shadow-inner">
                 <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-lg lg:text-xl font-black tracking-tight text-white mb-0.5 leading-tight">Lead Engineer</div>
                <div className="text-[10px] lg:text-xs uppercase text-blue-400 font-bold tracking-wider">@ ECHO-GATE Robotics</div>
              </div>
            </div>
            
            <div className="bg-[#111] border border-white/5 rounded-[20px] p-6 lg:p-8 flex items-center gap-6 hover:border-amber-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)]">
              <div className="w-14 h-14 rounded-2xl border border-amber-500/20 bg-amber-500/10 flex items-center justify-center shrink-0 shadow-inner">
                 <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-0.5 font-sans">2.5x</div>
                <div className="text-[11px] lg:text-xs text-white/50 font-medium leading-[1.3] truncate max-w-full">Growth via Tech</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <motion.section id="work" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="py-24 md:py-32 max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-[#22c55e] font-bold uppercase mb-1">Featured</div>
            <h3 className="text-3xl font-black text-white mt-2">
              Latest Projects
            </h3>
          </div>
          <div className="text-sm text-[#22c55e] border-b border-[#22c55e]/30 pb-0.5 cursor-pointer hover:border-[#22c55e] transition-colors mb-2 md:mb-0">
            View all work
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* AtlasCV */}
          <TiltCard className="w-full bg-[#111] border border-white/5 rounded-[20px] p-6 md:p-10 hover:border-[#22c55e]/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,197,94,0.1)] group">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 md:w-[50%] lg:w-[40%]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
                    <span className="px-2 py-0.5 bg-[#22c55e]/15 border border-[#22c55e]/30 rounded text-xs text-[#22c55e] font-mono">LIVE</span>
                  </div>
                  <span className="text-xs text-white/45">2025</span>
                </div>
                <h3 className="text-[32px] md:text-[44px] font-black text-white mt-4">AtlasCV</h3>
                <div className="text-sm font-medium text-[#22c55e] mt-1">AI Placement Kit Generator</div>
                <p className="text-white/65 text-base leading-relaxed mt-4">
                  Paste your raw details — get a complete ATS resume, LinkedIn profile, and cold HR email in 60 seconds. Built specifically for Indian engineering students starting from scratch. Rebuilt the architecture mid-development when the Gemini API pipeline failed — shipped the stable MVP anyway.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {['Next.js', 'Gemini AI', 'Tailwind', 'Vercel'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/45 hover:border-[#22c55e] hover:bg-[#22c55e]/10 transition-all">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-3 mt-7 flex-wrap">
                  <a href="https://atlascv.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-[#22c55e] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#4ade80] transition-colors">
                    Visit Live ↗
                  </a>
                  <a href="https://github.com/RudraS-Chauhan/AtlasCV" target="_blank" rel="noopener noreferrer" className="border border-white/15 text-white/45 px-6 py-3 rounded-xl hover:border-white hover:text-white transition-colors">
                    GitHub
                  </a>
                  <button onClick={() => setSelectedProject({
                    title: "AtlasCV",
                    role: "AI Placement Kit Generator",
                    description: "AtlasCV is an AI-powered placement kit generator designed to streamline the application process for engineering students. By simply pasting raw details, it generates a complete ATS-friendly resume, an optimized LinkedIn profile, and a tailored cold HR email in under 60 seconds.\n\nBuilt starting from scratch, I had to rebuild the architecture mid-development when the Gemini API pipeline failed. Despite these challenges, I successfully shipped the stable MVP, providing immense value to students looking for their first breakthrough.",
                    tech: ['Next.js', 'Gemini AI', 'Tailwind', 'Vercel'],
                    link: "https://atlascv.vercel.app",
                    github: "https://github.com/RudraS-Chauhan/AtlasCV"
                  })} className="border border-white/15 text-white/45 px-6 py-3 rounded-xl hover:border-white hover:text-white transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="flex-1 md:w-[50%] lg:w-[60%] flex items-center justify-center relative">
                <div className="w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col relative">
                  <div className="h-8 bg-[#1a1a1a] flex items-center px-3 gap-2">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                    </div>
                    <div className="mx-auto bg-[#0a0a0a] px-3 py-1 rounded text-[10px] font-mono text-[#22c55e]">atlascv.vercel.app/dashboard</div>
                  </div>
                  <img src="/atlascv-2.png" alt="AtlasCV Dashboard Screen" loading="lazy" decoding="async" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
              </div>
            </div>
          </TiltCard>

          {/* ECHO-GATE Robotics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
            <TiltCard className="bg-[#111] border border-white/5 rounded-[20px] p-8 hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] flex flex-col h-full group">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[11px] text-emerald-500 font-bold uppercase tracking-wider">Lead Engineer</span>
              </div>
              <h3 className="text-[28px] font-bold text-white mt-4 tracking-tight">ECHO-GATE Robotics</h3>
              <div className="text-sm font-medium text-emerald-500 mt-1">AI Automated Core System Framework</div>
              <p className="text-white/60 text-sm leading-relaxed mt-4 flex-1">
                Leading the overarching architectural development for a centralized robotics and automated operations core. Driving AI tooling integration, internal dashboards, and overarching structural engineering to propel subsequent iterations. Managing cross-functional development across teams.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['System Architecture', 'AI Automation', 'Team Leadership', 'Full-Stack'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/45 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all">{tech}</span>
                ))}
              </div>
              <div className="mt-8">
                <button onClick={() => setSelectedProject({
                  title: "ECHO-GATE Robotics",
                  role: "Lead Engineer",
                  description: "As the Lead Engineer at ECHO-GATE Robotics, I led the overarching architectural development for a centralized robotics and automated operations core.\n\nMy responsibilities entailed driving advanced AI tooling integration to streamline processes, engineering comprehensive internal dashboards for better visibility and management, and spearheading the structural engineering required to propel the project's subsequent iterations. This role involved significant cross-functional management across varied engineering teams to ensure tightly coupled system integration and performance.",
                  tech: ['System Architecture', 'AI Automation', 'Team Leadership', 'Full-Stack']
                })} className="w-full sm:w-auto border border-white/15 text-white/45 px-6 py-3 rounded-xl hover:border-emerald-500 hover:text-emerald-500 transition-colors">
                  Learn More
                </button>
              </div>
            </TiltCard>

            {/* FOREFLEX-AMTU */}
            <TiltCard className="bg-[#111] border border-white/5 rounded-[20px] p-8 hover:border-amber-500/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] flex flex-col h-full group">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-[11px] text-amber-500 font-bold uppercase tracking-wider">Hardware Prototype</span>
              </div>
              <h3 className="text-[28px] font-bold text-white mt-4 tracking-[-0.02em]">FOREFLEX-AMTU</h3>
              <div className="text-sm font-medium text-amber-500 mt-1">Bionic Ankle Actuator Research</div>
              <p className="text-white/60 text-sm leading-relaxed mt-4 flex-1">
                A physical hardware research endeavor contrasting with pure software builds. Prototyping an innovative electro-mechanical ankle actuator intended to retrofit passive prosthetics using a non-backdrivable worm-gear transmission. Exploring 3D printing and hardware iteration.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['SolidWorks', '3D Printing', 'Hardware Integration', 'Biomechanics'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/45 hover:border-amber-500 hover:bg-amber-500/10 transition-all">{tech}</span>
                ))}
              </div>
              <div className="mt-8">
                <button onClick={() => setSelectedProject({
                  title: "FOREFLEX-AMTU",
                  role: "Hardware Prototype",
                  description: "FOREFLEX-AMTU represents a physical hardware research endeavor contrasting with pure software builds. It involves the prototyping of an innovative electro-mechanical ankle actuator intended to retrofit passive prosthetics.\n\nThe project explores the use of a non-backdrivable worm-gear transmission to manage forces. It relies heavily on principles of biomechanics, extensive 3D printing, and iterative hardware engineering using tools like SolidWorks.",
                  tech: ['SolidWorks', '3D Printing', 'Hardware Integration', 'Biomechanics']
                })} className="w-full sm:w-auto border border-white/15 text-white/45 px-6 py-3 rounded-xl hover:border-amber-500 hover:text-amber-500 transition-colors z-10 relative">
                  Learn More
                </button>
              </div>
              <div className="mt-8 w-full rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative">
                <img src="/foreflex-amtu.jpg" alt="FOREFLEX-AMTU Schematic" loading="lazy" decoding="async" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            </TiltCard>
          </div>

          {/* Other Projects / Freelance */}
          <TiltCard className="w-full bg-[#111] border border-white/5 rounded-[20px] p-6 md:p-10 hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] flex flex-col">
            <span className="self-start px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-500 font-mono uppercase">FREELANCE & EXPERIMENTS</span>
            <div className="flex flex-col md:flex-row gap-8 mt-5">
              <div className="flex-1 md:w-[50%]">
                <h3 className="text-[24px] font-bold text-white mt-3">Web & AI Consulting</h3>
                <p className="text-white/60 text-sm leading-relaxed mt-3">
                  Accelerated client project delivery, mapping concepts to fully functional, high-converting landing pages in exactly 7 days utilizing rapid deployment tools like Lovable. Integrated advanced AI workflows using Prompt Engineering to optimize campaigns.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                  {['React', 'Next.js', 'Lovable', 'Prompt Engineering'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/45">{tech}</span>
                  ))}
                </div>
                <div className="mb-8 flex gap-3 flex-wrap">
                  <a href="https://wa.me/917084150015?text=Hi%20Rudra%2C%20I'm%20interested%20in%20your%20Web%20%26%20AI%20Consulting%20services." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-600 transition-colors text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12c0 2.19.71 4.22 1.91 5.86L2.61 22l4.28-1.12C8.42 21.6 10.15 22 11.99 22c5.52 0 10-4.48 10-10S17.51 2 11.99 2zm5.55 14.18c-.24.67-1.39 1.25-1.93 1.32-.51.06-1.16.14-3.32-.75-2.61-1.08-4.28-3.76-4.41-3.93-.13-.18-1.06-1.39-1.06-2.66s.66-1.89.89-2.14c.22-.24.49-.3.65-.3h.45c.16 0 .38-.06.6.48.23.57.73 1.8.8 1.94.06.15.11.32.02.5-.09.18-.14.3-.28.46-.14.17-.29.38-.41.51-.14.15-.3.32-.13.62.17.3 1.48 2.45 2.16 3.03.88.75 1.54 1.15 1.83 1.28.29.13.46.11.63-.08.17-.18.73-.85.93-1.14.2-.29.39-.24.66-.14.27.1 1.74.82 2.04.97.3.15.5.23.57.35.07.12.07.7-.17 1.37z"/></svg>
                    Book Consultation
                  </a>
                  <button onClick={() => setSelectedProject({
                    title: "Web & AI Consulting",
                    role: "Freelance & Experiments",
                    description: "Independent consulting providing accelerated client project delivery. I map concepts to fully functional, high-converting landing pages in tight timelines utilizing rapid deployment tools like Lovable.\n\nBeyond just frontend development, I integrate advanced AI workflows utilizing Prompt Engineering to build dynamic systems tailored for distinct business optimization and improved campaigns.",
                    tech: ['React', 'Next.js', 'Lovable', 'Prompt Engineering']
                  })} className="border border-white/15 text-white/45 px-5 py-2.5 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-colors text-sm">
                    Learn More
                  </button>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-[24px] font-bold text-white flex items-center gap-3">Fold_Fantasia <span className="text-[10px] uppercase font-mono bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full">Closed</span></h3>
                  <p className="text-white/60 text-sm leading-relaxed mt-3">
                    Product Developer. Scaled an innovative 3D origami e-commerce venture, designing a custom order system for 50+ unique models and achieving 2.5x audience engagement growth through strategic marketing.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Product Dev', 'Strategy', 'Digital Marketing'].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/45">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-1 md:w-[50%] flex items-center justify-center mt-8 md:mt-0">
                <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative group flex items-center justify-center bg-[#0a0a0a]">
                  <img src="/velocity-io.jpg" alt="Velocity.io Web Consulting" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        <div className="flex justify-center mt-16 pb-8">
          <a href="https://github.com/RudraS-Chauhan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-[#22c55e]/10 border border-white/10 hover:border-[#22c55e]/50 rounded-full text-white/80 hover:text-[#22c55e] transition-all cursor-pointer font-bold text-sm tracking-wide shadow-lg hover:shadow-[#22c55e]/20 group">
             <span>View All GitHub Repositories</span>
             <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </motion.section>

      {/* Journey */}
      <motion.section id="journey" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="py-24 md:py-32 max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-[10px] tracking-[0.2em] text-[#22c55e] font-bold uppercase mb-1">MILESTONES</div>
        <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mt-2 mb-12">
          Professional Journey
        </h2>
        
        <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 flex flex-col gap-12">
          {/* Timeline Dot */}
          <div className="absolute top-0 bottom-0 left-[-0.5px] w-px bg-gradient-to-b from-[#22c55e] via-transparent to-transparent opacity-50"></div>
          
          <motion.div className="relative group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
            <div className="absolute -left-[41px] md:-left-[57px] top-1 z-10 flex items-center justify-center">
              <div className="absolute w-4 h-4 rounded-full bg-[#22c55e] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40"></div>
              <div className="relative w-4 h-4 rounded-full bg-[#111] border-2 border-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.5)] flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full"></div>
              </div>
            </div>
            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-[#22c55e]/30 transition-all duration-300 shadow-2xl group-hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 flex items-center justify-center shrink-0 border border-[#22c55e]/20">
                    <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#22c55e]">Leader & Engineer</h3>
                    <div className="text-sm text-white/50 font-mono mt-0.5">ECHO-GATE</div>
                  </div>
                </div>
                <div className="text-xs text-white/30 font-mono tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span>2026 - Present</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Leading product engineering and AI integrations to build scalable, robust systems. Developing full-stack architectures and leveraging early adoption of AI paradigms to accelerate shipment speed and product quality.
              </p>
              <div className="flex gap-3 text-xs font-mono text-white/40">
                <span>AI Engineering</span>
                <span>Full-Stack</span>
                <span>Leadership</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="relative group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="absolute -left-[41px] md:-left-[57px] top-1 z-10 flex items-center justify-center">
              <div className="absolute w-4 h-4 rounded-full border border-white/40 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50"></div>
              <div className="relative w-4 h-4 rounded-full bg-[#111] border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
            </div>
            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-blue-500/30 transition-all duration-300 shadow-2xl group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Bionic Actuator Researcher</h3>
                    <div className="text-sm text-white/50 font-mono mt-0.5">Independent R&D</div>
                  </div>
                </div>
                <div className="text-xs text-white/30 font-mono tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span>2025 - Present</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Designed and prototyped FOREFLEX-AMTU, an electro-mechanical ankle actuator to retrofit passive prosthetics. Applied principles of biomechanics, rapid prototyping, and CAD modeling.
              </p>
              <div className="flex gap-3 text-xs font-mono text-white/40">
                <span>Hardware</span>
                <span>SolidWorks</span>
                <span>Biomechanics</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About */}
      <motion.section id="about" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="py-24 md:py-32 max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-[10px] tracking-[0.2em] text-[#22c55e] font-bold uppercase mb-1">WHO I AM</div>
        <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mt-2">
          About
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-8 md:items-start">
          <div className="w-full md:w-[40%] flex justify-center md:justify-start relative mb-12 md:mb-0 md:sticky md:top-32 h-fit">
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] rounded-full border-2 border-[#22c55e]/20 p-2 shrink-0">
              <div className="absolute inset-0 rounded-full border border-white/5 m-3 pointer-events-none" />
              
              <div className="w-full h-full rounded-full bg-[#111] shadow-[0_0_40px_rgba(34,197,94,0.15)] flex flex-col items-center justify-center overflow-hidden relative group border border-white/10 z-20">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#0a0a0a]">
                   <svg className="w-1/2 h-1/2 text-[#22c55e]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   </svg>
                </div>
                <img src="/image.jpg" alt="Rudra Singh Chauhan" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-20 opacity-0 transition-opacity duration-300" onLoad={(e) => e.currentTarget.style.opacity = '1'} onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
              
              {/* Floating badges */}
              <div className="absolute top-2 -right-4 sm:-right-8 md:-right-12 bg-[#111] border border-[#22c55e]/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[9px] md:text-xs text-emerald-400 font-medium shadow-lg shadow-black/50 z-30 transition-transform hover:scale-105 cursor-default backdrop-blur-md whitespace-nowrap">
                AI Automation
              </div>
              <div className="absolute bottom-2 -left-4 sm:-left-8 md:-left-12 bg-[#111] border border-blue-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[9px] md:text-xs text-blue-400 font-medium shadow-lg shadow-black/50 z-30 transition-transform hover:scale-105 cursor-default backdrop-blur-md whitespace-nowrap">
                Lead Engineer
              </div>
            </div>
          </div>

          <div className="w-full md:w-[60%] flex flex-col">
            <span className="hidden md:block text-[100px] leading-[0.8] text-[#22c55e] font-serif opacity-60 -mb-4">"</span>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-[1.8] text-white/75 font-normal">
              <TypewriterQuote quote="I'm a builder. I don't wait for graduation to start creating. From launching a live AI platform serving hundreds of students to architecting bionic hardware like the FOREFLEX-AMTU, I turn complex problems into scalable solutions. I use AI not as a crutch, but as an exponential force multiplier to engineer the future—today." />
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 mt-8">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none text-center text-xs md:text-sm font-semibold text-[#22c55e] hover:text-black border border-[#22c55e]/30 px-6 md:px-8 py-3 md:py-3.5 rounded-xl hover:bg-[#22c55e] transition-all">
                Download Resume ↓
              </a>
              <a href="#contact" className="flex-1 md:flex-none text-center text-xs md:text-sm font-semibold text-white/60 hover:text-white border border-white/10 px-6 md:px-8 py-3 md:py-3.5 rounded-xl hover:bg-white/5 transition-all">
                Get in Touch →
              </a>
            </div>

            <ChatWidget />
          </div>
        </div>
      </motion.section>

      {/* Education */}
      <motion.section id="education" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="py-12 md:py-16 max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-[10px] tracking-[0.2em] text-[#22c55e] font-bold uppercase mb-1">ACADEMICS</div>
        <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mt-2">
          Education
        </h2>
        <p className="text-white/45 text-base mt-2 mb-10">My formal academic background and qualifications.</p>
        
        <div className="mt-12 bg-[#111] border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#22c55e]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Galgotias University</h3>
              <p className="text-base md:text-lg text-[#22c55e] mt-2 font-medium">BTech in Computer Science (AI & Machine Learning)</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6 text-sm text-white/50">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  Expected 2029
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
                  Greater Noida, UP
                </span>
              </div>
            </div>
            
            <div className="flex-1 md:max-w-md bg-white/5 border border-white/10 rounded-xl p-6 self-start">
              <div className="text-[10px] text-white/40 font-mono tracking-widest uppercase mb-3">Relevant Coursework</div>
              <ul className="grid grid-cols-1 gap-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
                  Data Structures & Algorithms
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
                  Object-Oriented Design (OOP)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
                  Artificial Intelligence
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section id="skills" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="py-24 md:py-32 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 mb-12 flex flex-col items-start text-left">
          <div className="text-sm md:text-base tracking-[0.2em] text-[#22c55e] font-bold uppercase mb-1">WHAT I USE</div>
          <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mt-2">
            Tech Stack
          </h2>
        </div>

        {/* Infinite Marquee */}
        <div className="relative w-full flex mask-image-gradient py-8 bg-[#111] border-y border-white/5 shadow-[0_0_40px_rgba(34,197,94,0.05)]">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex w-max animate-marquee gap-4 px-2 hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4">
                {['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL', 'React', 'Next.js', 'Node.js', 'Tailwind', 'Flutter', 'Firebase', 'Docker', 'Git', 'Vercel', 'Gemini AI', 'SolidWorks'].map((tech) => (
                  <TooltipTag key={`${i}-${tech}`} text={techDescriptions[tech]}>
                    <div className="flex items-center gap-2 px-5 py-3 bg-[#161616] border border-white/10 rounded-full text-white/80 whitespace-nowrap text-sm font-medium hover:bg-[#22c55e]/10 hover:text-[#22c55e] hover:border-[#22c55e]/50 cursor-pointer transition-colors shadow-lg">
                      <span className="text-[#22c55e] opacity-80">{techIcons[tech]}</span>
                      {tech}
                    </div>
                  </TooltipTag>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 mt-16">
          <div className="flex flex-col gap-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:border-white/20 transition-colors">
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold text-white tracking-wide">Foundational Languages & Paradigms</h3>
              <p className="text-sm text-white/40 mt-1">The fundamental building blocks</p>
            </div>
            <div className="w-full md:w-2/3 flex flex-wrap gap-3">
              {['Java', 'Python', 'SQL', 'JavaScript', 'Dart (Flutter)', 'C++'].map((skill, i) => (
                <motion.div key={skill} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="cursor-default">
                  <TooltipTag text={techDescriptions[skill]}>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/80 hover:bg-[#22c55e]/10 hover:border-[#22c55e]/50 hover:text-[#22c55e] hover:-translate-y-1 hover:shadow-lg shadow-[#22c55e]/10 transition-all flex items-center gap-2">
                       <span className="text-[#22c55e] opacity-80">{techIcons[skill]}</span>
                      {skill}
                    </span>
                  </TooltipTag>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:border-white/20 transition-colors">
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold text-white tracking-wide">Modern Frameworks & Production Tools</h3>
              <p className="text-sm text-white/40 mt-1">The ecosystems for scalable products</p>
            </div>
            <div className="w-full md:w-2/3 flex flex-wrap gap-3">
              {['React', 'Next.js', 'Flutter', 'Tailwind CSS', 'Git & GitHub', 'Vercel', 'REST APIs', 'SQL databases'].map((skill, i) => (
                <motion.div key={skill} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="cursor-default">
                  <TooltipTag text={techDescriptions[skill]}>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/80 hover:bg-[#22c55e]/10 hover:border-[#22c55e]/50 hover:text-[#22c55e] hover:-translate-y-1 hover:shadow-lg shadow-[#22c55e]/10 transition-all flex items-center gap-2">
                       <span className="text-[#22c55e] opacity-80">{techIcons[skill]}</span>
                      {skill}
                    </span>
                  </TooltipTag>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:border-white/20 transition-colors">
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold text-white tracking-wide">AI Workflows & Product Engineering</h3>
              <p className="text-sm text-white/40 mt-1">Domain expertise & force multipliers</p>
            </div>
            <div className="w-full md:w-2/3 flex flex-wrap gap-3">
              {['Prompt Engineering', 'Google Gemini', 'Claude AI', 'Hardware Integration', 'SolidWorks', 'Rapid Prototyping'].map((skill, i) => (
                <motion.div key={skill} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="cursor-default">
                  <TooltipTag text={techDescriptions[skill]}>
                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/80 hover:bg-[#22c55e]/10 hover:border-[#22c55e]/50 hover:text-[#22c55e] hover:-translate-y-1 hover:shadow-lg shadow-[#22c55e]/10 transition-all flex items-center gap-2">
                       <span className="text-[#22c55e] opacity-80">{techIcons[skill]}</span>
                      {skill}
                    </span>
                  </TooltipTag>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:border-white/20 transition-colors">
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold text-white tracking-wide">Conversational Languages</h3>
              <p className="text-sm text-white/40 mt-1">Global communication</p>
            </div>
            <div className="w-full md:w-2/3 flex flex-wrap gap-3">
              {[
                { name: 'Hindi', level: 'Native' },
                { name: 'English', level: 'C2' },
                { name: 'German', level: 'B1' }
              ].map((lang, i) => (
                <motion.span key={lang.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white/80 hover:bg-[#22c55e]/10 hover:border-[#22c55e]/50 hover:text-[#22c55e] hover:-translate-y-1 hover:shadow-lg shadow-[#22c55e]/10 transition-all cursor-default flex items-center gap-3">
                  {lang.name} <span className="inline-flex items-center justify-center text-[8px] font-black text-[#22c55e] uppercase tracking-tighter bg-[#22c55e]/20 px-1.5 py-0.5 rounded border border-[#22c55e]/30 group-hover:bg-[#22c55e] group-hover:text-black transition-colors">{lang.level}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        </div>
      </motion.section>

      {/* Insights / Blog */}
      <motion.section id="insights" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="py-24 md:py-32 max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-[#22c55e] font-bold uppercase mb-1">WRITING & THOUGHTS</div>
            <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mt-2">
              Insights
            </h2>
          </div>
          <button onClick={() => setIsCreatingBlog(true)} className="px-6 py-3 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] hover:bg-[#22c55e] hover:text-black hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2 focus:ring-offset-[#111] rounded-xl font-bold text-sm flex items-center gap-2 w-fit">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
            New Post
          </button>
        </div>
        
        {loadingBlogs ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#22c55e]/20 border-t-[#22c55e] rounded-full animate-spin mb-4"></div>
            <div className="text-white/50 text-sm font-mono animate-pulse">Loading insights...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#22c55e]/30 transition-all duration-300 shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-white/50 tracking-wider group-hover:bg-[#22c55e]/10 group-hover:text-[#22c55e] transition-colors">{post.category}</span>
                    <span className="text-[10px] font-mono text-white/30">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#22c55e] transition-colors">
                    <button onClick={() => setSelectedBlog(post)} aria-label={`Read article: ${post.title}`} className="text-left focus:outline-none focus:ring-2 focus:ring-[#22c55e] rounded-sm w-full">{post.title}</button>
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
                  <span className="text-[11px] text-white/40 font-mono tracking-wide">{post.date}</span>
                  <button onClick={() => setSelectedBlog(post)} aria-label={`Read article: ${post.title}`} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#22c55e] group-hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111] focus:ring-[#22c55e]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Contact */}
      <motion.section id="contact" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="py-20 md:py-32 max-w-6xl mx-auto px-4 md:px-10 overflow-hidden">
        <div className="text-[10px] tracking-[0.2em] text-[#22c55e] font-bold uppercase mb-1">GET IN TOUCH</div>
        <h2 className="text-[clamp(32px,5vw,52px)] font-black text-white mt-2">
          Contact
        </h2>
        <p className="text-white/45 text-sm md:text-base mt-2">Always open to internships, projects, or a good conversation.</p>
        
        <div className="mt-10 md:mt-12 flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="flex-1 w-full md:w-[45%]">
            <h3 className="text-[28px] md:text-[32px] font-bold text-white leading-tight">Want to work together?</h3>
            <p className="text-white/45 max-w-[560px] mt-4 leading-relaxed text-sm md:text-base">
              I'm currently looking for my first internship in Mobile/Frontend or Full-Stack development. I ship fast, I learn faster.
            </p>
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div onClick={handleCopyEmail} className="group relative bg-[#111111] border-l-[3px] border-l-transparent border-y border-r border-white/5 rounded-2xl p-5 md:p-6 transition-all duration-200 hover:border-l-[#22c55e] hover:bg-[#141414] hover:shadow-[-4px_0_20px_rgba(34,197,94,0.08)] cursor-pointer overflow-hidden">
                <div className="absolute top-4 md:top-5 right-4 md:right-5 text-white/45 group-hover:text-[#22c55e] group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-all">
                  {copiedEmail ? <svg className="w-5 h-5 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                </div>
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 md:w-5 md:h-5 text-white/45" aria-label="Email"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                  <span className="text-[10px] md:text-xs text-white/45 uppercase tracking-wide">Email</span>
                </div>
                <div className="text-sm md:text-[16px] font-semibold text-white break-all">rudra.dev.builds@gmail.com</div>
              </div>
              <a href="https://linkedin.com/in/rudrasc-tech" target="_blank" rel="noopener noreferrer" className="group relative bg-[#111111] border-l-[3px] border-l-transparent border-y border-r border-white/5 rounded-2xl p-5 md:p-6 transition-all duration-200 hover:border-l-[#22c55e] hover:bg-[#141414] hover:shadow-[-4px_0_20px_rgba(34,197,94,0.08)]">
                <div className="absolute top-4 md:top-5 right-4 md:right-5 text-white/45 group-hover:text-[#22c55e] group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-all">↗</div>
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white/45" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 0z"/></svg>
                  <span className="text-[10px] md:text-xs text-white/45 uppercase tracking-wide">LinkedIn</span>
                </div>
                <div className="text-sm md:text-[16px] font-semibold text-white break-all truncate">linkedin.com/in/rudrasc-tech</div>
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full md:w-[55%] bg-[#111] border border-white/5 rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <h4 className="text-xl font-bold text-white mb-6">Send a Message</h4>
            {submitStatus === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-[#111] z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-[#22c55e]/10 rounded-full flex items-center justify-center mb-4 border border-[#22c55e]/30">
                  <svg className="w-8 h-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Opened</h3>
                <p className="text-white/60 mb-6">Your email client has been opened. Thanks for reaching out!</p>
                <button onClick={() => setSubmitStatus('idle')} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white transition-all outline-none focus:ring-2 focus:ring-[#22c55e]">
                  Send another message
                </button>
              </motion.div>
            ) : submitStatus === 'error' ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-[#111] z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/30">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Failed</h3>
                <p className="text-white/60 mb-6">Something went wrong. Please try again later.</p>
                <button onClick={() => setSubmitStatus('idle')} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white transition-all outline-none focus:ring-2 focus:ring-[#22c55e]">
                  Try again
                </button>
              </motion.div>
            ) : null}
            <form className="flex flex-col gap-4" onSubmit={handleContactSubmit} noValidate>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label htmlFor="contactName" className="text-sm text-white/70 font-medium ml-1 cursor-pointer">Name <span className="text-red-500" aria-hidden="true">*</span></label>
                  <input id="contactName" type="text" placeholder="Your Name" value={contactForm.name} onChange={handleContactChange} aria-required="true" aria-invalid={touched.name && !!formErrors.name} aria-describedby={formErrors.name ? "name-error" : undefined} className={`w-full bg-[#0a0a0a] border ${touched.name && formErrors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#22c55e]/50 focus:bg-[#141414] transition-all text-sm`} disabled={isSubmitting} />
                  {touched.name && formErrors.name && <span id="name-error" className="text-xs text-red-500 ml-1" role="alert">{formErrors.name}</span>}
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label htmlFor="contactEmail" className="text-sm text-white/70 font-medium ml-1 cursor-pointer">Email <span className="text-red-500" aria-hidden="true">*</span></label>
                  <input id="contactEmail" type="email" placeholder="Your Email" value={contactForm.email} onChange={handleContactChange} aria-required="true" aria-invalid={touched.email && !!formErrors.email} aria-describedby={formErrors.email ? "email-error" : undefined} className={`w-full bg-[#0a0a0a] border ${touched.email && formErrors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#22c55e]/50 focus:bg-[#141414] transition-all text-sm`} disabled={isSubmitting} />
                  {touched.email && formErrors.email && <span id="email-error" className="text-xs text-red-500 ml-1" role="alert">{formErrors.email}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="contactMessage" className="text-sm text-white/70 font-medium ml-1 cursor-pointer">Message <span className="text-red-500" aria-hidden="true">*</span></label>
                <textarea id="contactMessage" placeholder="Your Message" rows={5} value={contactForm.message} onChange={handleContactChange} aria-required="true" aria-invalid={touched.message && !!formErrors.message} aria-describedby={formErrors.message ? "message-error" : undefined} className={`bg-[#0a0a0a] border ${touched.message && formErrors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#22c55e]/50 focus:bg-[#141414] transition-all w-full resize-none text-sm`} disabled={isSubmitting}></textarea>
                {touched.message && formErrors.message && <span id="message-error" className="text-xs text-red-500 ml-1" role="alert">{formErrors.message}</span>}
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-2">
                <button type="button" onClick={() => { setContactForm({ name: '', email: '', message: '' }); setFormErrors({}); setTouched({}); }} disabled={isSubmitting} className="flex-1 bg-[#1a1a1a] text-white/80 font-bold px-6 py-4 rounded-xl hover:bg-[#222] transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed border border-white/5 hover:border-white/10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111] focus:ring-[#22c55e] outline-none">
                  Reset Form
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#22c55e] text-black font-bold px-6 py-4 rounded-xl hover:bg-[#4ade80] hover:scale-[1.02] transition-all text-sm disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Sending...
                    </>
                  ) : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/917084150015" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform z-50 cursor-pointer">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M11.99 2C6.47 2 2 6.48 2 12c0 2.19.71 4.22 1.91 5.86L2.61 22l4.28-1.12C8.42 21.6 10.15 22 11.99 22c5.52 0 10-4.48 10-10S17.51 2 11.99 2zm5.55 14.18c-.24.67-1.39 1.25-1.93 1.32-.51.06-1.16.14-3.32-.75-2.61-1.08-4.28-3.76-4.41-3.93-.13-.18-1.06-1.39-1.06-2.66s.66-1.89.89-2.14c.22-.24.49-.3.65-.3h.45c.16 0 .38-.06.6.48.23.57.73 1.8.8 1.94.06.15.11.32.02.5-.09.18-.14.3-.28.46-.14.17-.29.38-.41.51-.14.15-.3.32-.13.62.17.3 1.48 2.45 2.16 3.03.88.75 1.54 1.15 1.83 1.28.29.13.46.11.63-.08.17-.18.73-.85.93-1.14.2-.29.39-.24.66-.14.27.1 1.74.82 2.04.97.3.15.5.23.57.35.07.12.07.7-.17 1.37z"/></svg>
      </a>
      
      {/* Footer */}
      <footer className="border-t border-white/5 pt-16 pb-12 mt-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <a href="#hero" className="font-mono font-bold text-2xl text-[#22c55e] inline-block mb-6">RSC</a>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Engineering high-performance products at the intersection of AI, Robotics, and Full-Stack development. Building for the future, one ship at a time.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Navigation</h4>
              <ul className="flex flex-col gap-4 text-sm text-white/50">
                <li><a href="#work" className="hover:text-[#22c55e] transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none rounded-sm">Featured Work</a></li>
                <li><a href="#journey" className="hover:text-[#22c55e] transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none rounded-sm">Milestones</a></li>
                <li><a href="#about" className="hover:text-[#22c55e] transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none rounded-sm">About Me</a></li>
                <li><a href="#skills" className="hover:text-[#22c55e] transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none rounded-sm">Tech Stack</a></li>
                <li><a href="#insights" className="hover:text-[#22c55e] transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none rounded-sm">Insights</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-6">Connect</h4>
              <ul className="flex flex-col gap-4 text-sm text-white/50">
                <li>
                  <a href="https://linkedin.com/in/rudrasc-tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#22c55e] transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none rounded-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/RudraS-Chauhan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#22c55e] transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none rounded-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://ig.me/m/ctrlhuman.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#22c55e] transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none rounded-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/917084150015" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#22c55e] transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none rounded-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12c0 2.19.71 4.22 1.91 5.86L2.61 22l4.28-1.12C8.42 21.6 10.15 22 11.99 22c5.52 0 10-4.48 10-10S17.51 2 11.99 2zm5.55 14.18c-.24.67-1.39 1.25-1.93 1.32-.51.06-1.16.14-3.32-.75-2.61-1.08-4.28-3.76-4.41-3.93-.13-.18-1.06-1.39-1.06-2.66s.66-1.89.89-2.14c.22-.24.49-.3.65-.3h.45c.16 0 .38-.06.6.48.23.57.73 1.8.8 1.94.06.15.11.32.02.5-.09.18-.14.3-.28.46-.14.17-.29.38-.41.51-.14.15-.3.32-.13.62.17.3 1.48 2.45 2.16 3.03.88.75 1.54 1.15 1.83 1.28.29.13.46.11.63-.08.17-.18.73-.85.93-1.14.2-.29.39-.24.66-.14.27.1 1.74.82 2.04.97.3.15.5.23.57.35.07.12.07.7-.17 1.37z"/></svg>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono text-white/20">
               <span>© {new Date().getFullYear()} Rudra Singh Chauhan</span>
               <span className="hidden md:inline w-1 h-1 rounded-full bg-white/10"></span>
               <span className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
                 Available for Internships
               </span>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] text-white/10 uppercase tracking-widest font-bold text-center">
              Built with precision and AI
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-10 max-w-2xl w-full relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-sm font-medium text-[#22c55e] mb-2 uppercase tracking-wider">{selectedProject.role}</div>
                  <h3 className="text-3xl md:text-4xl font-black text-white">{selectedProject.title}</h3>
                </div>
                
                <div className="h-px w-full bg-white/10 my-2" />
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/70 text-base md:text-lg leading-relaxed whitespace-pre-wrap">{selectedProject.description}</p>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-bold tracking-wider text-white/50 uppercase mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {(selectedProject.link || selectedProject.github) && (
                  <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/10">
                    {selectedProject.link && (
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="bg-[#22c55e] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#4ade80] hover:scale-105 transition-all text-sm flex items-center gap-2">
                        <span>Visit Live Project</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 hover:text-white transition-all text-sm flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        <span>View Source Code</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-10 max-w-3xl w-full relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-white/50 tracking-wider">
                      {selectedBlog.category}
                    </span>
                    <span className="text-[11px] text-white/40 font-mono tracking-wide">
                      {selectedBlog.date}
                    </span>
                    <span className="text-[10px] font-mono text-white/30">
                      • {selectedBlog.readTime}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">{selectedBlog.title}</h3>
                </div>
                
                <div className="h-px w-full bg-white/10 my-4" />
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/70 text-base md:text-lg leading-relaxed whitespace-pre-wrap">{selectedBlog.content}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCreatingBlog && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCreatingBlog(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-10 max-w-2xl w-full relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsCreatingBlog(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors focus:ring-2 focus:ring-[#22c55e] outline-none"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col gap-4">
                <h3 className="text-3xl font-black text-white mb-2">Create New Post</h3>
                <form onSubmit={handleCreateBlog} className="flex flex-col gap-4" noValidate>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-white/70 font-medium ml-1">Title</label>
                    <input type="text" required value={newBlogForm.title} onChange={(e) => setNewBlogForm({...newBlogForm, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 max-w-full" placeholder="Post Title" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-white/70 font-medium ml-1">Date</label>
                    <input type="text" required value={newBlogForm.date} onChange={(e) => setNewBlogForm({...newBlogForm, date: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 max-w-full" placeholder="e.g. May 08, 2026" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-white/70 font-medium ml-1">Content</label>
                    <textarea rows={10} required value={newBlogForm.content} onChange={(e) => setNewBlogForm({...newBlogForm, content: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e]/50 max-w-full resize-none" placeholder="Write your thoughts..." />
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => setIsCreatingBlog(false)} className="px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-all text-sm font-bold focus:ring-2 focus:ring-[#22c55e] outline-none">Cancel</button>
                    <button type="submit" disabled={!newBlogForm.title || !newBlogForm.date || !newBlogForm.content} className="px-6 py-3 rounded-xl bg-[#22c55e] text-black hover:bg-[#4ade80] transition-all text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#22c55e] focus:ring-offset-2 focus:ring-offset-[#111] outline-none">Publish Post</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}