"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

interface FooterProps {
  profile?: {
    name?: string;
    email?: string;
    phone?: string;
    github?: string;
    linkedin?: string;
  } | null;
}

export default function Footer({ profile }: FooterProps) {
  const email = profile?.email || "delightcherubino@gmail.com";
  const phone = profile?.phone || "+91 82207 89878";
  const github = profile?.github || "https://github.com/Cherubinoo";
  const linkedin = profile?.linkedin || "https://www.linkedin.com/in/delight-cherubino-bb8456291/";
  const name = profile?.name || "Delight Cherubino";

  return (
    <footer id="contact" className="py-32 relative border-t border-slate-800/80 bg-[#04060a] w-full">
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Left Column: Widescreen Left-Aligned CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col items-start text-left gap-6"
          >
            <div className="flex items-center gap-2 text-[#F9B637] font-mono text-sm uppercase tracking-wider font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FB6C00] shadow-sm shadow-[#FB6C00]" />
              <span>Let's create something memorable</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Ready to build an experience that feels <span className="grad-text">effortless</span> and unforgettable?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal">
              Available for selective product partnerships, AI solution design, and ambitious engineering builds.
            </p>

            <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
              <a href={`mailto:${email}?subject=Project Inquiry`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#E73F1E] via-[#FB6C00] to-[#F9B637] text-white font-bold shadow-xl shadow-[#FB6C00]/35 hover:shadow-[#FB6C00]/60 transition-all text-sm sm:text-base border border-[#FFDD9C]/40"
                >
                  <span>Start a conversation</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </a>

              <a href="#home" className="text-slate-300 hover:text-white text-sm font-semibold underline underline-offset-4 px-4 py-2">
                Back to top
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <div className="p-7 rounded-3xl glass-panel border-[#FB6C00]/30 space-y-5 shadow-xl">
              <div className="flex items-center gap-3 text-slate-100 text-base">
                <Mail className="w-5 h-5 text-[#F9B637]" />
                <a href={`mailto:${email}`} className="hover:text-[#F9B637] transition-colors font-semibold">
                  {email}
                </a>
              </div>

              {phone && (
                <div className="flex items-center gap-3 text-slate-100 text-base">
                  <Phone className="w-5 h-5 text-[#FB6C00]" />
                  <span className="font-semibold">{phone}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-slate-300 text-sm font-mono">
                <MapPin className="w-5 h-5 text-[#E73F1E]" />
                <span>Based in India • Global Collaboration</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full glass-panel border-[#FB6C00]/40 text-slate-200 hover:text-[#FFDD9C] hover:border-[#F9B637] transition-colors shadow-lg"
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </a>
              )}

              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full glass-panel border-[#FB6C00]/40 text-slate-200 hover:text-[#FFDD9C] hover:border-[#F9B637] transition-colors shadow-lg"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              )}

              <a
                href={`mailto:${email}`}
                className="p-3.5 rounded-full glass-panel border-[#FB6C00]/40 text-slate-200 hover:text-[#FFDD9C] hover:border-[#F9B637] transition-colors shadow-lg"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-slate-500">
          <span>© {new Date().getFullYear()} {name}</span>
          <span>Built with Precision & Passion (Next.js 16 + Convex)</span>
        </div>
      </div>
    </footer>
  );
}
