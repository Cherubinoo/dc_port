"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles, Terminal } from "lucide-react";
import SplitFlapText from "./SplitFlapText";
import RotatingText from "./RotatingText";
import Dock from "./Dock";

interface HeroProps {
  profile?: {
    name?: string;
    role?: string;
    hero_image?: string;
    email?: string;
    resume?: string;
  } | null;
}

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function Hero({ profile }: HeroProps) {
  const email = profile?.email || "delightcherubino@gmail.com";

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden w-full bg-[#060503]">
      {/* Ambient Electric Spotlights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FB6C00]/25 rounded-full blur-[110px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#E73F1E]/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left gap-7 max-w-5xl"
        >
          {/* Top Status Bar: Role Tagline + SplitFlap Board */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-[#F9B637]/50 text-[#FFDD9C] text-xs sm:text-sm font-mono tracking-wide shadow-lg shadow-[#FB6C00]/20">
              <Sparkles className="w-4 h-4 text-[#F9B637] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-semibold">Software Architect &bull; AI Engineer &bull; Builder at Heart</span>
            </div>

            <div className="py-0.5">
              <SplitFlapText
                words={["LAUNCH READY", "AI ARCHITECT", "SIGNAL LIVE", "PRECISION CODE"]}
                flipDuration={0.12}
                stagger={0.05}
                cycleDelay={2600}
                charset="alphanumeric"
                flipsPerChar={8}
                tileColor="#18120c"
                textColor="#FFDD9C"
                tileRadius={8}
                gap={4}
                fontSize={32}
                loop
                padTo={14}
              />
            </div>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-white drop-shadow-md flex flex-col items-start gap-2">
            <div>
              Hello & Welcome, I'm <span className="grad-text">Delight Cherubino</span>
            </div>

            {/* Dynamic Changing Sentence via RotatingText */}
            <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-200 mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span>Building</span>
              <RotatingText
                texts={[
                  "intelligent AI systems.",
                  "real-time computer vision.",
                  "scalable cloud platforms.",
                  "high-throughput backends.",
                ]}
                mainClassName="px-3.5 py-1 bg-[#FB6C00]/20 text-[#FFDD9C] border border-[#FB6C00]/40 rounded-xl overflow-hidden shadow-lg shadow-[#FB6C00]/20 inline-flex items-center whitespace-nowrap"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 whitespace-nowrap"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2600}
                splitBy="words"
              />
            </div>
          </h1>

          {/* Bio / Subtitle */}
          <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed max-w-4xl drop-shadow">
            I love turning crazy ideas into real, scalable products — architecting software, building intelligent AI systems, and leading teams that love creating things that actually work.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-start gap-4 pt-1">
            <a href="#work">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#E73F1E] via-[#FB6C00] to-[#F9B637] text-white font-bold shadow-xl shadow-[#FB6C00]/35 hover:shadow-[#FB6C00]/60 transition-all text-sm sm:text-base border border-[#FFDD9C]/40 cursor-pointer"
              >
                <span>Explore Commercial Work</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </a>

            {profile?.resume && (
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#E73F1E]/20 border border-[#FB6C00]/60 text-[#FFDD9C] hover:bg-[#FB6C00]/30 hover:text-white transition-all text-sm sm:text-base shadow-lg shadow-[#FB6C00]/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#F9B637]" />
                  <span>View Resume</span>
                </motion.button>
              </a>
            )}

            <a href="#about">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 px-7 py-4 rounded-full glass-panel border-slate-700 text-slate-200 font-semibold hover:text-[#FFDD9C] transition-all text-sm sm:text-base cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-[#F9B637]" />
                <span>Discover Journey</span>
              </motion.button>
            </a>
          </div>

          {/* Social Platforms Dock Bar */}
          <div className="flex flex-col items-start gap-2 pt-2 w-full">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFDD9C] font-bold">
              Social Platforms Dock:
            </span>
            <Dock
              items={[
                {
                  icon: <GithubIcon className="w-5 h-5 text-[#F9B637]" />,
                  label: "GitHub (@Cherubinoo)",
                  onClick: () => window.open("https://github.com/Cherubinoo", "_blank"),
                },
                {
                  icon: <LinkedinIcon className="w-5 h-5 text-[#FB6C00]" />,
                  label: "LinkedIn Profile",
                  onClick: () => window.open("https://www.linkedin.com/in/delight-cherubino-bb8456291/", "_blank"),
                },
                {
                  icon: <MailIcon className="w-5 h-5 text-[#E73F1E]" />,
                  label: `Email (${email})`,
                  onClick: () => window.open(`mailto:${email}`, "_self"),
                },
                {
                  icon: <FileText className="w-5 h-5 text-[#FFDD9C]" />,
                  label: "Download Resume PDF",
                  onClick: () => {
                    const url = profile?.resume;
                    const targetUrl = (!url || url.includes("drive.google.com")) ? "/delightcherubinoI.pdf" : url;
                    window.open(targetUrl, "_blank");
                  },
                },
              ]}
              panelHeight={58}
              baseItemSize={44}
              magnification={66}
              distance={180}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">Scroll Down</span>
        <div className="w-[2px] h-7 bg-gradient-to-b from-[#F9B637] to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
}
