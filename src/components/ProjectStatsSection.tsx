import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FadeIn } from './FadeIn';
import { BarChart3, Code, GitCommit, Users, Zap, Award, Activity, Rocket, Clock, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ProjectMetricData {
  title: string;
  shortName: string;
  category: string;
  loc: number; // Lines of Code
  commits: number; // Git Commits / Iterations
  users: number; // Active Sessions / Beta Users / Clients
  latency: number; // Average latency in ms (lower is faster)
  color: string;
}

const statsData: ProjectMetricData[] = [
  {
    title: 'AtlasCV Platform',
    shortName: 'AtlasCV',
    category: 'AI Placement Kit',
    loc: 18500,
    commits: 142,
    users: 120,
    latency: 60,
    color: '#B600A8',
  },
  {
    title: 'EventFit AI',
    shortName: 'EventFit AI',
    category: 'Outfit Recommender',
    loc: 12400,
    commits: 94,
    users: 480,
    latency: 35,
    color: '#7621B0',
  },
  {
    title: 'ECHO-GATE Robotics',
    shortName: 'ECHO-GATE',
    category: 'Robotics Core',
    loc: 24000,
    commits: 215,
    users: 15,
    latency: 12,
    color: '#BE4C00',
  },
];

type MetricType = 'loc' | 'commits' | 'users' | 'latency';

interface MetricMeta {
  key: MetricType;
  label: string;
  unit: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}

const metricsList: MetricMeta[] = [
  {
    key: 'loc',
    label: 'Lines of Code',
    unit: 'LOC',
    icon: Code,
    description: 'Total modular software codebase volume across TypeScript, C++, Python & React.',
  },
  {
    key: 'commits',
    label: 'Commits & Iterations',
    unit: 'commits',
    icon: GitCommit,
    description: 'Version controlled deployments, releases & physical design iterations.',
  },
  {
    key: 'users',
    label: 'Clients & Engagements',
    unit: 'users / clients',
    icon: Users,
    description: 'Active beta testers, recommendation sessions, Instagram leads, & paper designs.',
  },
  {
    key: 'latency',
    label: 'Speed / Latency',
    unit: 'ms response',
    icon: Zap,
    description: 'Avg execution speed (lower latency = higher real-time performance).',
  },
];

interface ImpactItem {
  id: string;
  metricLabel: string;
  valueDisplay: string;
  subtitle: string;
  percentage: number; // 0-100 scale for horizontal bar
  color: string;
  icon: React.FC<{ className?: string }>;
  detail: string;
}

const impactMetricsList: ImpactItem[] = [
  {
    id: 'github',
    metricLabel: 'Total GitHub Contributions',
    valueDisplay: '68+ Contributions',
    subtitle: 'Recent active cycle on GitHub (@RudraS-Chauhan)',
    percentage: 88,
    color: 'from-[#B600A8] to-[#7621B0]',
    icon: GitCommit,
    detail: '21+ commits in July across AtlasCV, Campus-Closet-AI, and Portfolio repositories.',
  },
  {
    id: 'deploys',
    metricLabel: 'Deployment Frequency',
    valueDisplay: '14+ Deploys / month',
    subtitle: 'Automated CI/CD via Vercel & Netlify',
    percentage: 78,
    color: 'from-[#7621B0] to-[#BE4C00]',
    icon: Rocket,
    detail: 'Automated build checks, preview environments, and instant production releases.',
  },
  {
    id: 'response-ai',
    metricLabel: 'AtlasCV AI Kit Generation Time',
    valueDisplay: '< 60 Seconds',
    subtitle: 'Full Placement Kit (Resume, Cover Letter & LinkedIn)',
    percentage: 95,
    color: 'from-[#BE4C00] to-[#00A896]',
    icon: Clock,
    detail: 'Gemini API structured JSON response pipeline with sub-minute document compilation.',
  },
  {
    id: 'response-catalog',
    metricLabel: 'EventFit Catalog Match Speed',
    valueDisplay: '< 35 ms',
    subtitle: 'Offline-Safe Catalog Matching Engine',
    percentage: 98,
    color: 'from-[#00A896] to-[#3A86EF]',
    icon: Gauge,
    detail: 'Local outfit combination generator with fallback logic for instant recommendations.',
  },
];

export const ProjectStatsSection: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('loc');
  const [hoveredProject, setHoveredProject] = useState<ProjectMetricData | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentMeta = metricsList.find((m) => m.key === activeMetric)!;

  // Render D3 chart when metric changes or window resizes
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const height = 340;
    const margin = { top: 30, right: 30, bottom: 60, left: 60 };
    const width = Math.max(containerWidth, 300);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', height);

    const x = d3
      .scaleBand()
      .domain(statsData.map((d) => d.shortName))
      .range([margin.left, width - margin.right])
      .padding(0.35);

    const maxValue = d3.max(statsData, (d) => d[activeMetric]) || 100;
    const y = d3
      .scaleLinear()
      .domain([0, maxValue * 1.15])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Grid lines
    const yAxisGrid = d3
      .axisLeft(y)
      .tickSize(-width + margin.left + margin.right)
      .tickFormat(() => '')
      .ticks(5);

    svg
      .append('g')
      .attr('class', 'grid-lines')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxisGrid)
      .selectAll('line')
      .attr('stroke', 'rgba(215, 226, 234, 0.08)')
      .attr('stroke-dasharray', '3,3');

    // X Axis
    const xAxis = d3.axisBottom(x);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#D7E2EA')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('dy', '1.2em');

    // Y Axis
    const yAxis = d3
      .axisLeft(y)
      .ticks(5)
      .tickFormat((d) => {
        const val = Number(d);
        if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
        return `${val}`;
      });

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#D7E2EA')
      .attr('font-size', '11px');

    svg.selectAll('.domain').attr('stroke', 'rgba(215, 226, 234, 0.2)');
    svg.selectAll('.tick line').attr('stroke', 'rgba(215, 226, 234, 0.15)');

    // Bars
    const bars = svg
      .append('g')
      .selectAll('rect')
      .data(statsData)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.shortName) || 0)
      .attr('width', x.bandwidth())
      .attr('y', height - margin.bottom)
      .attr('height', 0)
      .attr('rx', 8)
      .attr('fill', (d) => d.color)
      .attr('opacity', 0.85)
      .attr('cursor', 'pointer')
      .on('mouseenter', (event, d) => {
        setHoveredProject(d);
        d3.select(event.currentTarget)
          .transition()
          .duration(150)
          .attr('opacity', 1)
          .attr('transform', 'scale(1.02)')
          .attr('transform-origin', `${(x(d.shortName) || 0) + x.bandwidth() / 2}px ${height - margin.bottom}px`);
      })
      .on('mouseleave', (event) => {
        setHoveredProject(null);
        d3.select(event.currentTarget)
          .transition()
          .duration(150)
          .attr('opacity', 0.85)
          .attr('transform', 'scale(1)');
      });

    // Animate Bars Rising
    bars
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .attr('y', (d) => y(d[activeMetric]))
      .attr('height', (d) => height - margin.bottom - y(d[activeMetric]));

    // Bar Value Labels on top
    svg
      .append('g')
      .selectAll('text')
      .data(statsData)
      .enter()
      .append('text')
      .text((d) => {
        const val = d[activeMetric];
        if (d.shortName === 'Fold_Fantasia' && activeMetric === 'loc') {
          return 'Paper (0 LOC)';
        }
        if (activeMetric === 'loc' && val >= 1000) return `${(val / 1000).toFixed(1)}k`;
        if (activeMetric === 'latency') return val > 0 ? `${val}ms` : 'N/A';
        return `${val}`;
      })
      .attr('x', (d) => (x(d.shortName) || 0) + x.bandwidth() / 2)
      .attr('y', (d) => y(d[activeMetric]) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', '#D7E2EA')
      .attr('font-size', '11px')
      .attr('font-weight', '700')
      .attr('opacity', 0)
      .transition()
      .delay(400)
      .duration(400)
      .attr('opacity', 1);
  }, [activeMetric]);

  const totalLoc = statsData.reduce((acc, curr) => acc + curr.loc, 0);
  const totalCommits = statsData.reduce((acc, curr) => acc + curr.commits, 0);

  return (
    <div className="relative w-full mt-12 sm:mt-16 pt-12 border-t border-white/10 space-y-16">
      {/* 0. GITHUB PROFILE & LIVE REPOSITORY SHOWCASE */}
      <div>
        <FadeIn delay={0} y={30}>
          <div className="bg-gradient-to-br from-[#161618] via-[#121212] to-[#0D0D0E] border border-white/15 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Background glow accent */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#B600A8]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white shadow-lg">
                  <GitCommit className="w-8 h-8 text-[#B600A8]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/15 border border-[#B600A8]/30 px-3 py-0.5 rounded-full">
                      GitHub Activity
                    </span>
                    <span className="text-xs font-semibold text-[#D7E2EA]/60">
                      @RudraS-Chauhan
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                    GitHub Codebase Showcase
                  </h3>
                </div>
              </div>

              <a
                href="https://github.com/RudraS-Chauhan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B600A8] to-[#7621B0] hover:from-[#7621B0] hover:to-[#B600A8] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-full border border-white/20 shadow-lg hover:shadow-[0_0_25px_rgba(182,0,168,0.5)] transition-all transform hover:-translate-y-0.5 shrink-0"
              >
                <span>Visit GitHub Profile</span>
                <Rocket className="w-4 h-4" />
              </a>
            </div>

            {/* Repositories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative z-10">
              <a
                href="https://github.com/RudraS-Chauhan"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B600A8]/50 p-5 rounded-2xl transition-all group flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white group-hover:text-[#B600A8] transition-colors">
                      AtlasCV Platform
                    </span>
                    <Code className="w-4 h-4 text-[#B600A8]" />
                  </div>
                  <p className="text-xs text-[#D7E2EA]/70 line-clamp-2">
                    AI Placement Kit generator built with Gemini 2.5 API, React, and TypeScript.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#D7E2EA]/50 font-mono pt-2 border-t border-white/5">
                  <span>TypeScript</span>
                  <span className="text-[#B600A8] font-bold">18.5k LOC</span>
                </div>
              </a>

              <a
                href="https://github.com/RudraS-Chauhan"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#7621B0]/50 p-5 rounded-2xl transition-all group flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white group-hover:text-[#7621B0] transition-colors">
                      EventFit AI
                    </span>
                    <Code className="w-4 h-4 text-[#7621B0]" />
                  </div>
                  <p className="text-xs text-[#D7E2EA]/70 line-clamp-2">
                    Smart catalog & offline outfit recommendation matrix engine.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#D7E2EA]/50 font-mono pt-2 border-t border-white/5">
                  <span>Next.js / TS</span>
                  <span className="text-[#7621B0] font-bold">12.4k LOC</span>
                </div>
              </a>

              <a
                href="https://github.com/RudraS-Chauhan"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#BE4C00]/50 p-5 rounded-2xl transition-all group flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white group-hover:text-[#BE4C00] transition-colors">
                      ECHO-GATE Core
                    </span>
                    <Gauge className="w-4 h-4 text-[#BE4C00]" />
                  </div>
                  <p className="text-xs text-[#D7E2EA]/70 line-clamp-2">
                    Autonomous robotics low-latency control software & hardware ROS modules.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#D7E2EA]/50 font-mono pt-2 border-t border-white/5">
                  <span>C++ / Embedded</span>
                  <span className="text-[#BE4C00] font-bold">24.0k LOC</span>
                </div>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 1. LIGHTWEIGHT PROJECT IMPACT HORIZONTAL BAR CHART */}
      <div>
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 border border-[#B600A8]/30 px-4 py-1 rounded-full mb-3 inline-flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Quantitative Benchmarks
            </span>
            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Project Impact
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/60 max-w-xl mt-3">
              Key performance indicators tracking development activity, release cadences, system latencies, and user engagement.
            </p>
          </div>
        </FadeIn>

        {/* Lightweight Horizontal Bar Chart Cards */}
        <FadeIn delay={0.15} y={20}>
          <div className="bg-[#121212] border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-6">
            {impactMetricsList.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className="space-y-2 group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#B600A8]">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white uppercase text-xs tracking-wide">
                          {item.metricLabel}
                        </span>
                        <span className="text-[11px] text-[#D7E2EA]/50 block">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto mt-1 sm:mt-0">
                      <span className="font-mono text-xs sm:text-sm font-extrabold text-[#B600A8] bg-[#B600A8]/10 border border-[#B600A8]/30 px-3 py-0.5 rounded-full">
                        {item.valueDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${item.color} shadow-[0_0_12px_rgba(182,0,168,0.5)]`}
                    />
                  </div>

                  <p className="text-[11px] text-[#D7E2EA]/60 leading-normal pl-8">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>

      {/* 2. D3 COMPARATIVE METRIC CHART */}
      <div>
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#B600A8] bg-[#B600A8]/10 border border-[#B600A8]/30 px-4 py-1 rounded-full mb-3 inline-flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" /> System Comparison
            </span>
            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Project Comparison & Codebase Volume
            </h3>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/60 max-w-xl mt-3">
              Inspect volume, commit density, and response profiles across individual platforms.
            </p>
          </div>
        </FadeIn>

        {/* Summary Stat Highlights */}
        <FadeIn delay={0.1} y={20}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#B600A8]/40 transition-colors">
              <Code className="w-5 h-5 text-[#B600A8] mb-1" />
              <span className="text-2xl sm:text-3xl font-black text-white">{(totalLoc / 1000).toFixed(1)}k+</span>
              <span className="text-[11px] uppercase tracking-wider text-[#D7E2EA]/60 mt-0.5">Software LOC</span>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#7621B0]/40 transition-colors">
              <GitCommit className="w-5 h-5 text-[#7621B0] mb-1" />
              <span className="text-2xl sm:text-3xl font-black text-white">{totalCommits}+</span>
              <span className="text-[11px] uppercase tracking-wider text-[#D7E2EA]/60 mt-0.5">Project Iterations</span>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#BE4C00]/40 transition-colors">
              <Zap className="w-5 h-5 text-[#BE4C00] mb-1" />
              <span className="text-2xl sm:text-3xl font-black text-white">&lt;60s</span>
              <span className="text-[11px] uppercase tracking-wider text-[#D7E2EA]/60 mt-0.5">AtlasCV Speed</span>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#B600A8]/40 transition-colors">
              <Award className="w-5 h-5 text-[#B600A8] mb-1" />
              <span className="text-2xl sm:text-3xl font-black text-white">3 Flagships</span>
              <span className="text-[11px] uppercase tracking-wider text-[#D7E2EA]/60 mt-0.5">Core Production Systems</span>
            </div>
          </div>
        </FadeIn>

        {/* Interactive Metric Switcher */}
        <FadeIn delay={0.15} y={20}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            {metricsList.map((m) => {
              const IconComp = m.icon;
              const isActive = activeMetric === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setActiveMetric(m.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white shadow-[0_0_20px_rgba(182,0,168,0.4)] scale-105'
                      : 'bg-white/5 border border-white/10 text-[#D7E2EA]/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* D3 Chart Box */}
        <FadeIn delay={0.2} y={20}>
          <div className="bg-[#121212] border border-white/10 rounded-[32px] p-4 sm:p-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 px-2">
              <div>
                <h4 className="text-lg font-bold uppercase text-white flex items-center gap-2">
                  <currentMeta.icon className="w-4 h-4 text-[#B600A8]" />
                  {currentMeta.label} Overview
                </h4>
                <p className="text-xs text-[#D7E2EA]/60">{currentMeta.description}</p>
              </div>

              {hoveredProject && (
                <div className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-medium text-white flex items-center gap-2 animate-fade-in">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredProject.color }} />
                  <span>
                    <strong>{hoveredProject.title}:</strong>{' '}
                    {hoveredProject.shortName === 'Fold_Fantasia' && activeMetric === 'loc'
                      ? 'Paper Hardware Startup (0 LOC)'
                      : `${hoveredProject[activeMetric]} ${currentMeta.unit}`}
                  </span>
                </div>
              )}
            </div>

            <div ref={containerRef} className="relative w-full">
              <svg ref={svgRef} className="w-full h-auto overflow-visible" />
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
