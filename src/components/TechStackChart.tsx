import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { motion } from 'framer-motion';
import { BarChart3, PieChart as PieChartIcon, Sparkles, Zap, Cpu, Terminal, Code2, Compass } from 'lucide-react';

// Domain Expertise Matrix for Radar Chart
const radarData = [
  { subject: 'Frontend UI', score: 95, fullMark: 100, projects: 'AtlasCV, EventFit AI' },
  { subject: 'Backend & Cloud', score: 90, fullMark: 100, projects: 'Express APIs, Supabase' },
  { subject: 'AI & Gemini', score: 94, fullMark: 100, projects: 'Gemini 2.5 Prompt Chains' },
  { subject: 'Robotics & ROS', score: 88, fullMark: 100, projects: 'ECHO-GATE Telemetry' },
  { subject: 'Dev Architecture', score: 92, fullMark: 100, projects: 'Clean Architecture' },
  { subject: 'Core Web Vitals', score: 96, fullMark: 100, projects: '100/100 Lighthouse' },
];

// Programming Language Mastery & Project Usage Polar Chart Data
const languagePolarData = [
  { name: 'Java', mastery: 97, usage: 28, projects: 'Core OOP, Data Structures & CS Pedagogy', color: '#F89820' },
  { name: 'TypeScript', mastery: 94, usage: 32, projects: 'AtlasCV, EventFit AI, Proxy APIs', color: '#00E5FF' },
  { name: 'Python', mastery: 90, usage: 20, projects: 'Gemini Prompt Chains & Data Prep', color: '#E699FF' },
  { name: 'C++ / ROS', mastery: 88, usage: 16, projects: 'ECHO-GATE Firmware & Control Loops', color: '#BE4C00' },
  { name: 'SQL / Postgres', mastery: 85, usage: 12, projects: 'Cloud Relational Schema', color: '#FFBD2E' },
];

// Tool Usage & Relative Expertise Bar Chart Data
const toolUsageData = [
  { name: 'Java', category: 'Backend/OOP', level: 97, usagePercent: 28, color: '#F89820', projects: 'Core Data Structures, OOP & CS Mentor' },
  { name: 'Next.js / React', category: 'Frontend', level: 95, usagePercent: 32, color: '#B600A8', projects: 'AtlasCV, EventFit AI' },
  { name: 'TypeScript', category: 'Language', level: 94, usagePercent: 28, color: '#00E5FF', projects: 'All Full-Stack Systems' },
  { name: 'Gemini API', category: 'AI/ML', level: 94, usagePercent: 22, color: '#E699FF', projects: 'AtlasCV Placement Kit' },
  { name: 'Python', category: 'AI/Data', level: 90, usagePercent: 20, color: '#E699FF', projects: 'Data Processing & Automation' },
  { name: 'Node / Express', category: 'Backend', level: 90, usagePercent: 18, color: '#7621B0', projects: 'REST & Proxy APIs' },
  { name: 'ROS / C++', category: 'Robotics', level: 88, usagePercent: 15, color: '#BE4C00', projects: 'ECHO-GATE Firmware' },
  { name: 'Tailwind CSS', category: 'Styling', level: 96, usagePercent: 25, color: '#27C93F', projects: 'Spatial UI Systems' },
  { name: 'PostgreSQL / SQL', category: 'Database', level: 85, usagePercent: 12, color: '#FFBD2E', projects: 'Cloud Relational Schema' },
  { name: 'SolidWorks CAD', category: '3D/CAD', level: 90, usagePercent: 10, color: '#FF5F56', projects: 'Hardware Mechanics' },
];

export const TechStackChart: React.FC = () => {
  const [chartMode, setChartMode] = useState<'polar' | 'radar' | 'bar'>('polar');

  return (
    <div className="w-full bg-[#121216] border border-white/10 rounded-[28px] sm:rounded-[36px] p-5 sm:p-8 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#B600A8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#00E5FF]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Section Subheader */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 px-3 py-0.5 rounded-full border border-[#B600A8]/30 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Visual Distribution Analytics
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            Tool Mastery & Language Distribution Matrix
          </h3>
          <p className="text-xs sm:text-sm text-[#D7E2EA]/60 mt-1 max-w-xl">
            Interactive breakdown of programming language mastery, relative project usage shares, and primary software & hardware tools.
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 border border-white/10 p-1.5 rounded-2xl shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setChartMode('polar')}
            className={`text-xs px-3 py-2 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              chartMode === 'polar'
                ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.5)]'
                : 'text-[#D7E2EA]/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Polar Gauge</span>
          </button>

          <button
            type="button"
            onClick={() => setChartMode('radar')}
            className={`text-xs px-3 py-2 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              chartMode === 'radar'
                ? 'bg-[#B600A8] text-white shadow-[0_0_20px_rgba(182,0,168,0.5)]'
                : 'text-[#D7E2EA]/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <PieChartIcon className="w-3.5 h-3.5" />
            <span>Radar Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setChartMode('bar')}
            className={`text-xs px-3 py-2 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              chartMode === 'bar'
                ? 'bg-[#B600A8] text-white shadow-[0_0_20px_rgba(182,0,168,0.5)]'
                : 'text-[#D7E2EA]/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Tool Mastery Bars</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-8 w-full h-[340px] sm:h-[390px] flex items-center justify-center">
          {chartMode === 'polar' ? (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-3/5 h-[260px] sm:h-[320px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languagePolarData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={115}
                      paddingAngle={5}
                      dataKey="usage"
                      nameKey="name"
                    >
                      {languagePolarData.map((entry, index) => (
                        <Cell key={`polar-cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.6)" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#18181F] border border-[#00E5FF]/50 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md text-xs font-mono">
                              <div className="font-bold text-white text-sm mb-1">{data.name}</div>
                              <div className="text-[#00E5FF] font-bold">Project Usage Share: {data.usage}%</div>
                              <div className="text-[#E699FF] font-bold">Language Mastery: {data.mastery}%</div>
                              <div className="text-[#D7E2EA]/70 text-[11px] mt-1">Implementations: {data.projects}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-white font-mono">100%</span>
                  <span className="text-[10px] text-[#00E5FF] uppercase font-mono tracking-widest">Type-Safe</span>
                </div>
              </div>

              <div className="w-full md:w-2/5 flex flex-col gap-2 font-mono text-xs">
                <div className="text-[#00E5FF] font-bold uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" /> Language Usage Shares
                </div>
                {languagePolarData.map((lang) => (
                  <div key={lang.name} className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                      <span className="font-bold text-white text-xs">{lang.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#00E5FF] font-bold block">{lang.mastery}% Mastery</span>
                      <span className="text-[#D7E2EA]/50 text-[10px]">{lang.usage}% Share</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : chartMode === 'radar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.12)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#D7E2EA', fontSize: 12, fontWeight: 700 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255, 255, 255, 0.2)" />
                <Radar
                  name="Expertise Level"
                  dataKey="score"
                  stroke="#B600A8"
                  fill="#B600A8"
                  fillOpacity={0.45}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#18181F] border border-[#B600A8]/50 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md text-xs font-mono">
                          <div className="font-bold text-white text-sm mb-1">{data.subject}</div>
                          <div className="text-[#B600A8] font-bold">Expertise: {data.score}%</div>
                          <div className="text-[#D7E2EA]/70 text-[11px] mt-1">Projects: {data.projects}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={toolUsageData}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
              >
                <XAxis type="number" domain={[0, 100]} stroke="rgba(255, 255, 255, 0.3)" tick={{ fill: '#D7E2EA', fontSize: 11 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="rgba(255, 255, 255, 0.3)"
                  tick={{ fill: '#D7E2EA', fontSize: 11, fontWeight: 600 }}
                  width={110}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#18181F] border border-white/20 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md text-xs font-mono">
                          <div className="font-bold text-white text-sm mb-1">{data.name}</div>
                          <div className="text-[#00E5FF] font-bold">Mastery Level: {data.level}%</div>
                          <div className="text-[#D7E2EA]/70 text-[11px] mt-1">Relative Usage: {data.usagePercent}%</div>
                          <div className="text-[#E699FF] text-[10px] mt-0.5">Key Implementation: {data.projects}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="level"
                  radius={[0, 8, 8, 0]}
                  className="cursor-pointer"
                >
                  {toolUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Sidebar Mini Gauge & Metrics */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
          {/* Mini Polar Gauge Widget for Sidebar */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5 font-mono">
                <Compass className="w-3.5 h-3.5" /> Language Polar Distribution
              </span>
              <span className="text-[10px] text-[#D7E2EA]/50 font-mono">5 Core Specs</span>
            </div>

            <div className="h-[120px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languagePolarData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={52}
                    paddingAngle={4}
                    dataKey="usage"
                  >
                    {languagePolarData.map((entry, index) => (
                      <Cell key={`mini-cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-black text-white font-mono">5 Langs</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#B600A8]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Core Metrics Breakdown
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[#D7E2EA]/60">Primary Languages</span>
                <span className="text-[#00E5FF] font-bold">TS / Java / Py / C++</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[#D7E2EA]/60">Top Stack</span>
                <span className="text-[#B600A8] font-bold">Next.js + Gemini API</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#D7E2EA]/60">Avg Language Score</span>
                <span className="text-emerald-400 font-bold">90.2%</span>
              </div>
            </div>
          </div>

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <Terminal className="w-4 h-4 text-[#00E5FF] mx-auto mb-1" />
              <div className="text-lg font-black text-white font-mono">100%</div>
              <div className="text-[10px] text-[#D7E2EA]/60 uppercase tracking-wider">Type Safety</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
              <Cpu className="w-4 h-4 text-[#B600A8] mx-auto mb-1" />
              <div className="text-lg font-black text-white font-mono">60s</div>
              <div className="text-[10px] text-[#D7E2EA]/60 uppercase tracking-wider">AI Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
