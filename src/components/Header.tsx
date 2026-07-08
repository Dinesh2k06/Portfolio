'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stats', href: '#stats' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for header background styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update custom scroll indicator width
      const scrollIndicator = document.querySelector('.scroll-indicator') as HTMLElement;
      if (scrollIndicator) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const scrollPct = (window.scrollY / totalHeight) * 100;
          scrollIndicator.style.width = `${scrollPct}%`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
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
    <>
      <div className="scroll-indicator" />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/75 dark:bg-[#030303]/75 backdrop-blur-md border-b border-black/5 dark:border-white/5'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Title */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-zinc-900 dark:text-white"
          >
            <div className="p-1.5 rounded-lg bg-[var(--brand-color-2)] text-white">
              <Terminal size={18} />
            </div>
            <span>Dinesh<span className="text-[var(--brand-color-3)]">.</span></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-[var(--brand-color-3)] dark:hover:text-[var(--brand-color-3)] transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions (Toggle Theme & CTA) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              id="desktop-theme-toggle"
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-black/5 dark:border-white/5"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <a
              href="/assets/dinesh_resume.pdf"
              download="Dinesh_S_Resume.pdf"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--brand-color-2)] text-white hover:bg-[#F43F5E] transition-all duration-300 shadow-sm"
            >
              <span>Resume</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              id="mobile-theme-toggle"
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-black/5 dark:border-white/5"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle Menu"
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-black/5 dark:border-white/5"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-black/5 dark:border-white/5 bg-white/95 dark:bg-[#030303]/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-base font-semibold text-zinc-700 dark:text-zinc-300 hover:text-[var(--brand-color-3)] dark:hover:text-[var(--brand-color-3)] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
                
                <a
                  href="/assets/dinesh_resume.pdf"
                  download="Dinesh_S_Resume.pdf"
                  className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl text-sm font-semibold bg-[var(--brand-color-2)] text-white hover:bg-[#F43F5E] transition-all duration-300 shadow-sm"
                >
                  <span>Download Resume</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
