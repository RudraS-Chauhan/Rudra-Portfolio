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
  {
    title: 'ctrlhuman.io',
    shortName: 'ctrlhuman.io',
    category: 'Instagram Client Channel',
    loc: 9600,
    commits: 85,
    users: 60,
    latency: 40,
    color: '#00A896',
  },
  {
    title: 'Fold_Fantasia',
    shortName: 'Fold_Fantasia',
    category: 'Paper Hardware Startup',
    loc: 0, // Paper Hardware Startup (Origami creations, 0 software LOC)
    commits: 52,
    users: 50, // 50+ Origami paper designs sold
    latency: 0, // N/A (Hardware paper creation)
    color: '#3A86EF',
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
    <div className="w-full mt-16 sm:mt-24 pt-16 border-t border-white/10 space-y-20">
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

            <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#00A896]/40 transition-colors">
              <Award className="w-5 h-5 text-[#00A896] mb-1" />
              <span className="text-2xl sm:text-3xl font-black text-white">@ctrlhuman.io</span>
              <span className="text-[11px] uppercase tracking-wider text-[#D7E2EA]/60 mt-0.5">Instagram Channel</span>
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

            <div ref={containerRef} className="w-full">
              <svg ref={svgRef} className="w-full h-auto overflow-visible" />
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
