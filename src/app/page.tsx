'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Cpu, 
  Code, 
  Wrench, 
  Heart, 
  ChevronUp, 
  Calendar, 
  ExternalLink,
  Milestone,
  CheckCircle,
  FileCheck
} from 'lucide-react';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectCard, { ProjectData } from '@/components/ProjectCard';
import StatsDashboard from '@/components/StatsDashboard';
import ContactForm from '@/components/ContactForm';

// Project records
const PROJECTS: ProjectData[] = [
  {
    title: "Life Lens",
    subtitle: "AI Health Advisory Application",
    description: "An AI-powered healthcare application providing personalized dietary suggestions, health advisory tracking, and wellness metrics dynamically using Gemini API.",
    tech: ["FlutterFlow", "Firebase", "Gemini API", "NoSQL"],
    features: [
      "Secure Recruiter/User authentication systems",
      "Personalized nutrition advice based on profile constraints",
      "Daily calorie and hydration goal tracking dashboards",
      "Adaptive UI optimized for mobile viewport dimensions"
    ],
    githubUrl: "https://github.com/Dinesh2k06/Life-Lens",
    demoUrl: "https://github.com/Dinesh2k06/Life-Lens",
    mockType: "lifelens"
  },
  {
    title: "Sign Language to Text",
    subtitle: "Computer Vision Translation Engine",
    description: "A machine learning pipeline that uses local video feeds to recognize human hand gestures and translate them to textual letters in real time.",
    tech: ["Python", "OpenCV", "TensorFlow", "Keras", "NumPy"],
    features: [
      "Robust skeleton hand-joint keypoint prediction tracking",
      "Real-time prediction with low latency inference pipelines",
      "Custom dataset training capturing distinct hand shape categories",
      "High accuracy score (95%+) on key alphabetic gestures"
    ],
    githubUrl: "https://github.com/Dinesh2k06/Sign-Language-to-Text-Converter",
    demoUrl: "https://github.com/Dinesh2k06/Sign-Language-to-Text-Converter",
    mockType: "signlang"
  }
];

// Currently learning stack
const CURRENTLY_LEARNING = [
  'Machine Learning', 'Generative AI', 'LangChain', 'LangGraph', 
  'AI Agents', 'Prompt Engineering', 'RAG', 'TensorFlow', 
  'OpenCV', 'Streamlit', 'React', 'Next.js', 
  'Tailwind CSS', 'Docker', 'Azure AI'
];

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for Back-to-Top display
  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-background transition-colors duration-300">
      <Header />
      
      <main className="flex-grow w-full">
        {/* HERO */}
        <Hero />

        {/* ABOUT ME */}
        <section id="about" className="py-20 border-t border-black/5 dark:border-white/5 relative bg-zinc-50/50 dark:bg-[#050505]/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Header Title */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-brand-indigo dark:text-brand-purple uppercase">
                  Introduction
                </span>
                <h3 className="text-3xl font-display font-extrabold text-zinc-950 dark:text-white leading-tight">
                  Passionate about AI Engineering.
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-brand-blue to-brand-purple rounded" />
              </div>

              {/* Text Narrative */}
              <div className="lg:col-span-8 space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal text-base md:text-lg">
                <p>
                  I am a <strong className="text-zinc-950 dark:text-white font-semibold">Bachelor of Technology student specializing in Artificial Intelligence & Data Science</strong> at SNS College of Engineering. My core focus lies in translating conceptual algorithms into functional, intelligent software that solves tangible real-world problems.
                </p>
                <p>
                  I enjoy developing practical AI-driven applications, mastering the fundamentals of Machine Learning and Generative AI patterns, and solving coding challenges to hone my logical skills. I am committed to continuous growth and building a solid technical foundation.
                </p>
                <p>
                  Believing in a hands-on approach, I continuously experiment with tools like Large Language Model orchestrators and modern web frameworks, positioning myself to contribute value to engineering and research teams.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* EDUCATION & EXPERIENCE */}
        <section id="experience" className="py-20 border-t border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Section Title */}
            <div className="flex flex-col items-center text-center space-y-3 mb-16">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-indigo dark:text-brand-purple uppercase">
                Timeline
              </span>
              <h2 className="text-3xl font-display font-extrabold text-zinc-950 dark:text-white">
                Education & Experience
              </h2>
              <p className="text-sm text-zinc-500 max-w-lg">
                A brief overview of my educational milestones and professional beginnings.
              </p>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* EXPERIENCE COLUMN */}
              <div className="space-y-8">
                <h4 className="text-lg font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                  <Briefcase className="text-brand-blue" size={18} />
                  Professional Experience
                </h4>

                <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 pl-6 space-y-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-brand-blue border border-white dark:border-[#030303]" />
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-base font-bold text-zinc-900 dark:text-white">
                        Data & Web Intern
                      </h5>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">
                        <Calendar size={10} />
                        June 2025 – July 2025
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-zinc-500 font-mono">
                      Ravenan Technologies
                    </span>
                    
                    {/* Responsibilities list */}
                    <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                        <span>Collected, structured, and analyzed raw product data from major e-commerce websites.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                        <span>Organized and manipulated large datasets using Microsoft Excel to identify marketplace trends.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                        <span>Created comprehensive reports using advanced tools like Pivot Tables and interactive charts.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                        <span>Leveraged Python web scraping pipelines, HTML, and CSS to automate data aggregation, increasing efficiency.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* EDUCATION COLUMN */}
              <div className="space-y-8">
                <h4 className="text-lg font-bold font-display text-zinc-900 dark:text-white flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                  <GraduationCap className="text-brand-purple" size={18} />
                  Academic History
                </h4>

                <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 pl-6 space-y-8">
                  {/* Timeline Dot */}
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-brand-purple border border-white dark:border-[#030303]" />

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-base font-bold text-zinc-900 dark:text-white">
                        Bachelor of Technology
                      </h5>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded-full">
                        <Calendar size={10} />
                        2024 – 2028 (Pursuing)
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        Artificial Intelligence & Data Science
                      </span>
                      <span className="text-xs font-semibold text-zinc-500 font-mono mt-0.5">
                        SNS College of Engineering
                      </span>
                    </div>
                    
                    {/* Grade Info */}
                    <div className="p-3.5 rounded-xl glass-panel border border-brand-purple/15 flex items-center justify-between max-w-[200px]">
                      <div>
                        <span className="text-[9px] text-zinc-400 font-mono block font-bold">CURRENT PERFORMANCE</span>
                        <span className="text-sm font-extrabold text-brand-purple">8.31 CGPA</span>
                      </div>
                      <Award size={18} className="text-brand-purple" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-20 border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-[#050505]/40">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Title */}
            <div className="flex flex-col items-center text-center space-y-3 mb-16">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-indigo dark:text-brand-purple uppercase">
                Expertise
              </span>
              <h2 className="text-3xl font-display font-extrabold text-zinc-950 dark:text-white">
                Technical Skillset
              </h2>
              <p className="text-sm text-zinc-500 max-w-lg">
                Categorized toolkit indicating my core fields of technical focus.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Languages */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue">
                      <Code size={18} />
                    </div>
                    <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                      Programming Languages
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Python', 'Java', 'C', 'HTML', 'CSS'].map((lang) => (
                      <span key={lang} className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-zinc-700 dark:text-zinc-300">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Core Knowledge */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-brand-indigo/10 text-brand-indigo">
                      <Cpu size={18} />
                    </div>
                    <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                      Core Knowledge
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      'Object-Oriented Programming', 
                      'Data Structures & Algorithms', 
                      'SQL Basics', 
                      'DBMS Fundamentals', 
                      'Data Analysis', 
                      'Logical Problem Solving'
                    ].map((item) => (
                      <span key={item} className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-zinc-700 dark:text-zinc-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tools */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-brand-purple/10 text-brand-purple">
                      <Wrench size={18} />
                    </div>
                    <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                      Tools & Platforms
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Git', 'GitHub', 'VS Code', 'FlutterFlow', 'Firebase', 'MySQL', 'Microsoft Excel', 'Google Colab'].map((tool) => (
                      <span key={tool} className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-zinc-700 dark:text-zinc-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* CURRENTLY LEARNING SUB-SECTION */}
            <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-brand-indigo/15 dark:border-brand-purple/15 bg-linear-to-tr from-brand-blue/5 via-brand-indigo/5 to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col space-y-4 relative z-10">
                <div className="flex flex-wrap items-center gap-2 text-zinc-800 dark:text-zinc-200">
                  <span className="text-xs font-mono font-bold tracking-wider text-brand-indigo dark:text-brand-purple uppercase">
                    Continuous Growth
                  </span>
                  <span className="text-xs text-zinc-500">•</span>
                  <h4 className="text-lg font-bold font-display">
                    Currently Learning
                  </h4>
                </div>
                
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-3xl">
                  &ldquo;I believe in continuous learning. These are the technologies I&apos;m currently exploring through courses, projects, and hands-on practice.&rdquo;
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {CURRENTLY_LEARNING.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono font-semibold bg-brand-indigo/10 text-brand-indigo dark:text-brand-purple border border-brand-indigo/15 animate-hover cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 border-t border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Title */}
            <div className="flex flex-col items-center text-center space-y-3 mb-16">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-indigo dark:text-brand-purple uppercase">
                Works
              </span>
              <h2 className="text-3xl font-display font-extrabold text-zinc-950 dark:text-white">
                Featured Projects
              </h2>
              <p className="text-sm text-zinc-500 max-w-lg">
                Selected developmental works applying AI models and standard software architecture patterns.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>

          </div>
        </section>

        {/* DASHBOARD INTEGRATIONS */}
        <section id="stats" className="py-20 border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-[#050505]/40">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Title */}
            <div className="flex flex-col items-center text-center space-y-3 mb-12">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-indigo dark:text-brand-purple uppercase">
                Activity
              </span>
              <h2 className="text-3xl font-display font-extrabold text-zinc-950 dark:text-white">
                Development Activity
              </h2>
              <p className="text-sm text-zinc-500 max-w-lg">
                Real-time dashboard syncing my coding challenges and repository contributions.
              </p>
            </div>

            <StatsDashboard />

          </div>
        </section>

        {/* CERTIFICATIONS & ACHIEVEMENTS */}
        <section id="credentials" className="py-20 border-t border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Certifications */}
              <div className="lg:col-span-7 space-y-8">
                <h3 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                  <FileCheck className="text-brand-purple" size={20} />
                  Certifications
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Google AI Cert */}
                  <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-44 group border border-black/5 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-xl pointer-events-none" />
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold text-brand-blue tracking-wide uppercase">GOOGLE CLOUD</span>
                      <h4 className="text-sm font-bold font-display text-zinc-900 dark:text-white group-hover:text-brand-blue transition-colors leading-snug">
                        Google AI Foundations
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Concepts in Neural Networks, Deep Learning, and generative models on GCP.
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-black/5 dark:border-white/5">
                      <span>Credential Placeholder</span>
                      <span className="text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                        Verify <ExternalLink size={10} />
                      </span>
                    </div>
                  </div>

                  {/* LangChain Cert */}
                  <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-44 group border border-black/5 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-xl pointer-events-none" />
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold text-brand-purple tracking-wide uppercase">AI ORCHESTRATION</span>
                      <h4 className="text-sm font-bold font-display text-zinc-900 dark:text-white group-hover:text-brand-purple transition-colors leading-snug">
                        LangChain Development
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Chaining LLM workflows, document parsing, memory injection, and RAG pipelines.
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-black/5 dark:border-white/5">
                      <span>Credential Placeholder</span>
                      <span className="text-brand-purple hover:underline cursor-pointer flex items-center gap-1">
                        Verify <ExternalLink size={10} />
                      </span>
                    </div>
                  </div>

                  {/* Microsoft Learn */}
                  <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-44 group border border-black/5 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-xl pointer-events-none" />
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold text-brand-blue tracking-wide uppercase">MICROSOFT AZURE</span>
                      <h4 className="text-sm font-bold font-display text-zinc-900 dark:text-white group-hover:text-brand-blue transition-colors leading-snug">
                        Azure AI Fundamentals
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Cognitive Services, Azure ML Studio, Custom Vision, and conversational interfaces.
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-black/5 dark:border-white/5">
                      <span>Credential ID Placeholder</span>
                      <span className="text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                        Verify <ExternalLink size={10} />
                      </span>
                    </div>
                  </div>

                  {/* Internship Certificate */}
                  <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-44 group border border-black/5 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-xl pointer-events-none" />
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold text-brand-purple tracking-wide uppercase">RAVENAN TECHNOLOGIES</span>
                      <h4 className="text-sm font-bold font-display text-zinc-900 dark:text-white group-hover:text-brand-purple transition-colors leading-snug">
                        Data & Web Internship
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Verification of training as a Data Analysis and scraping developer.
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-black/5 dark:border-white/5">
                      <span>Ravenan Ref #10294</span>
                      <span className="text-brand-purple hover:underline cursor-pointer flex items-center gap-1">
                        Verify <ExternalLink size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Achievements */}
              <div className="lg:col-span-5 space-y-8">
                <h3 className="text-2xl font-display font-extrabold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                  <Milestone className="text-brand-blue" size={20} />
                  Achievements
                </h3>

                <div className="space-y-4">
                  {[
                    { title: "Completed AI Internship", detail: "Gained real-world experience scraping data and organizing commercial datasets at Ravenan Technologies." },
                    { title: "Built AI Projects", detail: "Successfully developed Life Lens (Gemini API Health Advisor) and Sign Language to Text recognition models." },
                    { title: "Active GitHub Learner", detail: "Committed to tracking learning progress via public version-controlled repositories daily." },
                    { title: "LeetCode Problem Solver", detail: "Solved 140+ coding queries covering Data Structures, SQL basics, and algorithmic complexity maps." },
                    { title: "Hackathon Participant", detail: "Collaborated on campus hackathons, engineering solutions under tight constraints." }
                  ].map((ach, idx) => (
                    <div key={idx} className="glass-panel p-4 rounded-xl flex items-start gap-4 border border-black/5 dark:border-white/5">
                      <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={16} />
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-display">
                          {ach.title}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                          {ach.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-[#050505]/40">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Title */}
            <div className="flex flex-col items-center text-center space-y-3 mb-16">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-indigo dark:text-brand-purple uppercase">
                Contact
              </span>
              <h2 className="text-3xl font-display font-extrabold text-zinc-950 dark:text-white">
                Connect With Me
              </h2>
              <p className="text-sm text-zinc-500 max-w-lg">
                Let&apos;s build together. Reach out via email, phone, or fill out the form directly.
              </p>
            </div>

            <ContactForm />

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-black/5 dark:border-white/5 bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart size={10} className="text-red-500 fill-red-500" />
            <span>by Dinesh S</span>
          </div>
          <span>Copyright © 2026</span>
        </div>
      </footer>

      {/* BACK TO TOP WIDGET */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            id="back-to-top-btn"
            aria-label="Back to Top"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-brand-indigo dark:hover:bg-brand-indigo hover:text-white transition-all shadow-md cursor-pointer border border-black/5 dark:border-white/5"
          >
            <ChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
