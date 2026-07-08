'use client';

import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { Github } from '@/components/Icons';
import { motion } from 'framer-motion';

export interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  mockType: 'lifelens' | 'signlang';
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  // Renders a high-fidelity mockup UI corresponding to the project type using inline SVG
  const renderMockup = (type: 'lifelens' | 'signlang') => {
    if (type === 'lifelens') {
      return (
        <div className="w-full h-full bg-zinc-950 dark:bg-zinc-950 p-4 rounded-t-2xl border-b border-white/5 flex flex-col font-mono text-[10px] text-zinc-400 select-none">
          {/* Mock app header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <span className="text-zinc-500 font-semibold">LifeLens AI Dashboard</span>
            <div className="w-8" />
          </div>
          
          {/* Mock Dashboard Layout */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            {/* Calories tracker */}
            <div className="p-2 rounded bg-white/5 border border-white/5 flex flex-col justify-between">
              <span className="text-zinc-500 text-[8px]">Daily Nutrition Goal</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-sm font-bold text-emerald-400">1,840</span>
                <span className="text-[7px]">/ 2,200 kcal</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[83%]" />
              </div>
            </div>

            {/* AI Recommendation panel */}
            <div className="p-2 rounded bg-white/5 border border-white/5 flex flex-col justify-between">
              <span className="text-zinc-500 text-[8px]">AI Advisor Tip</span>
              <p className="text-[8px] text-zinc-300 leading-tight mt-1 line-clamp-2">
                Increase dietary fiber. Add spinach or oats to balance glucose peaks.
              </p>
              <span className="text-[6px] text-[var(--brand-color-3)] mt-1">Gemini AI Pipeline • Active</span>
            </div>

            {/* Tracking Chart graph */}
            <div className="col-span-2 p-2 rounded bg-white/5 border border-white/5 flex-1 flex flex-col justify-between min-h-[50px]">
              <span className="text-zinc-500 text-[8px]">Weight & Health Trend</span>
              {/* SVG Sparkline chart */}
              <svg className="w-full h-8 mt-1 overflow-visible" viewBox="0 0 100 30">
                <path
                  d="M0,25 Q15,10 30,18 T60,8 T90,20 T100,5"
                  fill="none"
                  stroke="url(#blue-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="8" r="3" className="fill-[var(--brand-color-3)] animate-ping" />
                <circle cx="60" cy="8" r="2" className="fill-[var(--brand-color-3)]" />
                
                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--brand-color-2)" />
                    <stop offset="100%" stopColor="var(--brand-color-3)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      );
    } else {
      // Simulation converter interface mockup
      return (
        <div className="w-full h-full bg-zinc-900 p-4 rounded-t-2xl border-b border-white/5 flex flex-col font-mono text-[10px] text-zinc-400 select-none relative overflow-hidden">
          {/* Simulated Webcam Feed */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] to-zinc-950 z-0" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-emerald-500 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Webcam Feed
              </span>
              <span className="text-[8px] text-zinc-500">TF-Lite Inference • 24 FPS</span>
            </div>

            {/* Neural Net Skeletal Hand Drawing */}
            <div className="flex-1 flex items-center justify-center relative my-1">
              <svg className="w-28 h-20 overflow-visible text-[var(--brand-color-3)]" viewBox="0 0 100 80">
                {/* Hand Skeleton Lines */}
                <path d="M 50,75 L 50,55 L 40,40 L 35,30 L 32,25" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M 50,55 L 48,36 L 45,22 L 44,14" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M 50,55 L 56,38 L 59,24 L 60,16" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M 50,55 L 63,44 L 71,34 L 75,28" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M 50,55 L 35,62 L 25,60 M 25,60 L 18,52" fill="none" stroke="currentColor" strokeWidth="1" />
                
                {/* Joints (dots) */}
                <circle cx="50" cy="75" r="2.5" className="fill-[var(--brand-color-2)]" />
                <circle cx="50" cy="55" r="2" className="fill-[var(--brand-color-3)]" />
                <circle cx="40" cy="40" r="2" className="fill-[var(--brand-color-3)]" />
                <circle cx="35" cy="30" r="2" className="fill-[var(--brand-color-3)]" />
                <circle cx="32" cy="25" r="2" className="fill-[var(--brand-color-3)]" />
                
                <circle cx="48" cy="36" r="2" className="fill-[var(--brand-color-3)]" />
                <circle cx="45" cy="22" r="2" className="fill-[var(--brand-color-3)]" />
                <circle cx="44" cy="14" r="2" className="fill-[var(--brand-color-3)]" />

                <circle cx="56" cy="38" r="2" className="fill-[var(--brand-color-3)]" />
                <circle cx="59" cy="24" r="2" className="fill-[var(--brand-color-3)]" />
                <circle cx="60" cy="16" r="2" className="fill-[var(--brand-color-3)]" />

                {/* Bounding box around hand */}
                <rect x="15" y="10" width="65" height="68" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="18" y="20" fill="#ef4444" className="text-[6px] font-bold">Hand (0.97)</text>
              </svg>
            </div>

            {/* Translation Output Bar */}
            <div className="p-2 rounded bg-black/40 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[7px] text-zinc-500 block">Class Output</span>
                <span className="text-xs font-bold text-white font-mono tracking-widest">HELLO WORLD</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[var(--brand-color-2)]/20 text-[var(--brand-color-2)] text-[8px] font-bold">
                Match: 98%
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-2xl flex flex-col overflow-hidden h-full group"
    >
      {/* Mockup Container */}
      <div className="h-48 overflow-hidden relative bg-zinc-950 flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
        {renderMockup(project.mockType)}
      </div>

      {/* Info Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Card Head */}
          <div className="flex flex-col space-y-1">
            <span className="text-xs font-mono font-semibold text-[var(--brand-color-2)] dark:text-[var(--brand-color-3)] uppercase tracking-wider">
              {project.subtitle}
            </span>
            <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white">
              {project.title}
            </h3>
          </div>

          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            {project.description}
          </p>

          {/* Features check list */}
          <ul className="mt-4 space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle size={12} className="text-[var(--brand-color-3)] flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Footer tags and buttons */}
        <div className="space-y-4 pt-2">
          {/* Technology pill tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="flex items-center gap-4 pt-2 border-t border-black/5 dark:border-white/5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-[var(--brand-color-3)] dark:hover:text-white transition-colors duration-200"
              >
                <Github size={14} />
                <span>Source</span>
              </a>
            )}
            
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-color-2)] dark:text-[var(--brand-color-2)] hover:underline transition-all duration-200"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
