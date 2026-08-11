"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

interface HeroProps {
  profile?: {
    name?: string;
    role?: string;
    hero_image?: string;
    email?: string;
    resume?: string;
  } | null;
}

export default function Hero({ profile }: HeroProps) {
  const role = profile?.role || "Artificial Intelligence & Data Science Student";
  const name = profile?.name || "Delight Cherubino";
  const parts = name.split(" ");
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");
  const bgImg = profile?.hero_image || "/images/1.jpg";

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden w-full">
      {/* Prominent, Fully Visible Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65 transition-opacity duration-1000 scale-105"
        style={{ backgroundImage: `url('${bgImg}')` }}
      />
      {/* Gradient vignette to ensure 100% text readability without hiding image */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04060a] via-[#04060a]/75 to-[#04060a]/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04060a]/60 via-transparent to-[#04060a]" />

      {/* Electric Glow Spotlights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/35 rounded-full blur-[110px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto relative z-10">
        {/* Left-Aligned Widescreen Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left gap-7 max-w-5xl"
        >
          {/* Electric Role Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-cyan-500/50 text-cyan-300 text-xs sm:text-sm font-mono tracking-wide shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-semibold">{role}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white drop-shadow-md">
            Hi, I'm <span className="grad-text">{firstName}</span>{" "}
            <span className="text-slate-200">{lastName}</span>
            <br />
            building with <span className="grad-text-vibrant underline decoration-cyan-400/80 decoration-wavy underline-offset-8">precision.</span>
          </h1>

          {/* Subtitle / Bio */}
          <p className="text-slate-200 text-lg sm:text-xl font-normal leading-relaxed max-w-4xl drop-shadow">
            President of Neoteric AI Association @ Ramco Institute of Technology. Architecting real-world computer vision solutions (YOLOv8), high-throughput backend platforms, and intelligent document extraction pipelines.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
            <a href="#work">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold shadow-xl shadow-blue-500/35 hover:shadow-blue-500/60 transition-all text-sm sm:text-base border border-blue-400/40"
              >
                <span>Explore Commercial Work</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </a>

            {profile?.resume && (
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 font-semibold hover:bg-cyan-900/90 hover:text-white transition-all text-sm sm:text-base shadow-lg shadow-cyan-500/20"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>View Resume</span>
                </motion.button>
              </a>
            )}

            <a href="#about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 px-7 py-4 rounded-full glass-panel border-slate-700 text-slate-200 font-semibold hover:text-white transition-all text-sm sm:text-base"
              >
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Discover Journey</span>
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">Scroll Down</span>
        <div className="w-[2px] h-7 bg-gradient-to-b from-cyan-400 to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
}
