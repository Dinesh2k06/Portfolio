'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Sparkles, FileDown, Send } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';

const ROLES = ['AI & Generative AI Engineer', 'Machine Learning Enthusiast', 'Full-Stack Developer'];

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex === currentRole.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setTypedText(
          isDeleting
            ? currentRole.substring(0, charIndex - 1)
            : currentRole.substring(0, charIndex + 1)
        );
        setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
      }
    }, !isDeleting && charIndex === currentRole.length ? 2000 : (isDeleting && charIndex === 0 ? 500 : typingSpeed));

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const handleScrollTo = (id: string) => {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden py-16 bg-grid-pattern">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-brand-indigo/15 dark:bg-brand-indigo/10 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-brand-purple/15 dark:bg-brand-purple/10 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full flex flex-col md:grid md:grid-cols-12 items-center gap-12 z-10">
        
        {/* Left Side Info */}
        <div className="md:col-span-8 flex flex-col text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-brand-indigo/10 text-brand-indigo dark:text-zinc-300 border border-brand-indigo/25 self-start"
          >
            <Sparkles size={12} className="animate-spin-slow" />
            <span>Currently Preparing for Internships</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-none text-zinc-950 dark:text-white">
              Hi, I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple">Dinesh</span> 👋
            </h1>
            <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-zinc-800 dark:text-zinc-200 min-h-[36px]">
              <span className="text-brand-purple font-mono font-bold">&gt;&nbsp;</span>
              <span>{typedText}</span>
              <span className="animate-pulse font-light text-brand-indigo">|</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed"
          >
            B.Tech Artificial Intelligence & Data Science student passionate about Artificial Intelligence, Generative AI, Machine Learning, and building software that solves real-world problems.
            <br />
            <span className="block mt-3 text-zinc-500 dark:text-zinc-500 text-sm sm:text-base">
              I enjoy learning emerging technologies, building practical AI applications, solving coding challenges, and continuously improving my technical skills.
            </span>
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => handleScrollTo('#projects')}
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-linear-to-r from-brand-blue to-brand-indigo text-white hover:shadow-lg hover:shadow-brand-indigo/25 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              View Projects
            </button>
            <a
              href="/assets/dinesh_resume.pdf"
              download="Dinesh_S_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-zinc-100 text-zinc-800 dark:bg-white/5 dark:text-zinc-200 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              <FileDown size={16} />
              <span>Download Resume</span>
            </a>
            <button
              onClick={() => handleScrollTo('#contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-transparent text-zinc-700 dark:text-zinc-300 hover:text-brand-indigo dark:hover:text-white transition-all duration-300 cursor-pointer"
            >
              <Send size={16} />
              <span>Contact Me</span>
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-5 pt-4 text-zinc-400 dark:text-zinc-500"
          >
            <a
              href="https://github.com/Dinesh2k06"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 dark:hover:text-white transition-colors duration-200"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/dinesh--s"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue transition-colors duration-200"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://leetcode.com/u/Dinesh__2006/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500 transition-colors duration-200"
            >
              <Code size={20} />
            </a>
          </motion.div>
        </div>

        {/* Right Side Visuals (Circular Profile Placeholder / Visual Frame) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:col-span-4 flex justify-center items-center"
        >
          <div className="relative group w-64 h-64 md:w-80 md:h-80">
            {/* Floating Sparkles (Top Right) */}
            <div className="absolute -top-4 -right-4 w-12 h-12 md:w-16 md:h-16 rounded-2xl glass-panel flex items-center justify-center border border-white/10 dark:border-white/5 shadow-2xl pointer-events-none animate-float-slow z-20">
              <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-brand-indigo" />
            </div>
            
            {/* Floating Code (Bottom Left) */}
            <div className="absolute -bottom-4 -left-4 w-10 h-10 md:w-14 md:h-14 rounded-full glass-panel flex items-center justify-center border border-white/10 dark:border-white/5 shadow-2xl pointer-events-none animate-float-medium z-20">
              <Code className="w-4 h-4 md:w-6 md:h-6 text-brand-blue" />
            </div>

            {/* Pulsing Back Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-blue via-brand-indigo to-brand-purple blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-slow" />
            
            {/* Double Frame Effect */}
            <div className="absolute inset-2 rounded-full border border-white/10 dark:border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm z-0" />
            
            {/* Profile Image Shell */}
            <div className="relative w-full h-full rounded-full border-2 border-brand-indigo/30 p-2 overflow-hidden flex items-center justify-center z-10 glass-panel">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/dinesh_profile.jpg"
                  alt="Dinesh S Profile"
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-10" onClick={() => handleScrollTo('#about')}>
        <span className="text-[10px] tracking-widest font-mono text-zinc-400 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-brand-indigo" />
        </motion.div>
      </div>
    </section>
  );
}
