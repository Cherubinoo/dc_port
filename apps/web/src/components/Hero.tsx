"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import SplitFlapText from "./SplitFlapText";
import SplitText from "./SplitText";
import RotatingText from "./RotatingText";

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

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden w-full bg-[#060503]">
      {/* Electric Glow Spotlights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FB6C00]/30 rounded-full blur-[110px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#E73F1E]/25 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto relative z-10">
        {/* Left-Aligned Widescreen Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left gap-6 max-w-5xl"
        >
          {/* Electric Role Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-[#F9B637]/50 text-[#FFDD9C] text-xs sm:text-sm font-mono tracking-wide shadow-lg shadow-[#FB6C00]/20">
            <Sparkles className="w-4 h-4 text-[#F9B637] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-semibold">{role}</span>
          </div>

          {/* Split Flap Display Board */}
          <div className="py-1">
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
              gap={5}
              fontSize={44}
              loop
              padTo={14}
            />
          </div>

          {/* Sequential GSAP SplitText Landing Title Animation */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-white drop-shadow-md flex flex-col items-start gap-2">
            <SplitText
              text="Hello,"
              className="grad-text font-black"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
            />
            <SplitText
              text="Cherubino here."
              className="text-slate-100 font-black"
              delay={650}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
            />
            
            {/* Dynamic Changing Sentence via RotatingText */}
            <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold grad-text-vibrant mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span>Building</span>
              <RotatingText
                texts={[
                  "intelligent AI systems.",
                  "real-time computer vision.",
                  "scalable cloud platforms.",
                  "high-throughput backends.",
                ]}
                mainClassName="px-3 py-1 bg-[#FB6C00]/20 text-[#FFDD9C] border border-[#FB6C00]/40 rounded-xl overflow-hidden shadow-lg shadow-[#FB6C00]/20 inline-flex items-center"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2400}
              />
            </div>
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
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#E73F1E] via-[#FB6C00] to-[#F9B637] text-white font-bold shadow-xl shadow-[#FB6C00]/35 hover:shadow-[#FB6C00]/60 transition-all text-sm sm:text-base border border-[#FFDD9C]/40"
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
                  className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#E73F1E]/20 border border-[#FB6C00]/60 text-[#FFDD9C] hover:bg-[#FB6C00]/30 hover:text-white transition-all text-sm sm:text-base shadow-lg shadow-[#FB6C00]/20"
                >
                  <Sparkles className="w-4 h-4 text-[#F9B637]" />
                  <span>View Resume</span>
                </motion.button>
              </a>
            )}

            <a href="#about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 px-7 py-4 rounded-full glass-panel border-slate-700 text-slate-200 font-semibold hover:text-[#FFDD9C] transition-all text-sm sm:text-base"
              >
                <Terminal className="w-4 h-4 text-[#F9B637]" />
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
        <div className="w-[2px] h-7 bg-gradient-to-b from-[#F9B637] to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
}
