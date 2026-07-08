'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Code, Award } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    // Simulate backend sending request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const contactDetails = [
    { icon: <Mail size={18} />, label: 'Email', value: 'sddinesh190306@gmail.com', href: 'mailto:sddinesh190306@gmail.com' },
    { icon: <Phone size={18} />, label: 'Phone', value: '+91 9345966603', href: 'tel:+919345966603' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Coimbatore, Tamil Nadu, India', href: null },
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/dinesh--s', color: 'hover:text-brand-blue dark:hover:text-brand-blue border-brand-blue/15' },
    { icon: <Github size={20} />, href: 'https://github.com/Dinesh2k06', color: 'hover:text-zinc-900 dark:hover:text-white border-zinc-500/15' },
    { icon: <Code size={20} />, href: 'https://leetcode.com/u/Dinesh__2006/', color: 'hover:text-amber-500 border-amber-500/15' },
    { icon: <Award size={20} />, href: 'https://www.hackerrank.com/profile/sddinesh190306', color: 'hover:text-emerald-500 border-emerald-500/15' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* LEFT: Contact Cards & Info */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <h4 className="text-xl font-bold font-display text-zinc-900 dark:text-white">
            Get in Touch
          </h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            I am actively looking for internship, project collaboration, and learning opportunities in Artificial Intelligence, NLP, RAG, and Software Engineering. Drop a message or reach out via email!
          </p>

          <div className="space-y-4">
            {contactDetails.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl flex items-center gap-4 border border-black/5 dark:border-white/5"
              >
                <div className="p-2.5 rounded-lg bg-brand-indigo/10 text-brand-indigo dark:text-brand-purple">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono block uppercase font-bold">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-brand-indigo dark:hover:text-brand-purple transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Grid */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
            Connect With Me
          </span>
          <div className="flex items-center gap-3">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl glass-panel border border-black/5 dark:border-white/5 flex items-center justify-center text-zinc-500 transition-all duration-300 hover:scale-105 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Validation Form */}
      <div className="lg:col-span-7">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-black/5 dark:border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/5 rounded-full blur-2xl pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-zinc-500 font-mono">
                  NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:border-brand-indigo transition-colors"
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-zinc-500 font-mono">
                  EMAIL *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:border-brand-indigo transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-semibold text-zinc-500 font-mono">
                SUBJECT
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Collaboration Opportunity"
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:border-brand-indigo transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-zinc-500 font-mono">
                MESSAGE *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:border-brand-indigo transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                id="contact-submit-btn"
                disabled={status === 'sending' || status === 'success'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-brand-blue to-brand-indigo hover:shadow-md hover:shadow-brand-indigo/15 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer"
              >
                {status === 'sending' ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </div>

            {/* Form Response Banner Alert */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-emerald-500 mt-4 text-xs font-semibold"
                >
                  <CheckCircle2 size={16} />
                  <span>Message sent successfully! Dinesh will reach out to you shortly.</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center gap-3 text-red-500 mt-4 text-xs font-semibold"
                >
                  <AlertCircle size={16} />
                  <span>Failed to send the message. Please email directly.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
      
    </div>
  );
}
