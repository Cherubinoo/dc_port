"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Target, Award, Cpu } from "lucide-react";

interface AboutProps {
  profile?: {
    bio?: string;
    vision?: string;
    approach?: string;
    leadership?: string;
    current_focus?: string;
  } | null;
}

export default function About({ profile }: AboutProps) {
  const bio =
    profile?.bio ||
    "I'm Delight Cherubino, an Artificial Intelligence and Data Science student at Ramco Institute of Technology, with a strong focus on building real-world, scalable AI solutions. I currently serve as the President of the Neoteric AI Association.";

  const vision =
    profile?.vision ||
    "My long-term goal is to build impactful technology solutions that solve real problems at scale. I aim to contribute to the development of intelligent systems that make processes smarter, faster, and more efficient.";

  const currentFocus =
    profile?.current_focus ||
    "Building scalable AI-driven platforms, student-centric tools, and real-time computer vision applications.";

  const leadership =
    profile?.leadership ||
    "As Vice President of my department, I lead technical initiatives, mentor peers in AI development, and foster collaborative problem-solving.";

  return (
    <section id="about" className="py-32 relative border-t border-slate-800/80 bg-[#04060a]/70 w-full">
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Left-Aligned Story Headline & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start text-left gap-6"
          >
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
              <span>01 / The Story</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Turning complex logic into <br />
              <span className="grad-text">seamless</span> human experiences.
            </h2>

            <div className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed whitespace-pre-line space-y-4">
              {bio}
            </div>

            {/* Vibrant Neoteric AI Association Leadership Badge */}
            <div className="p-5 rounded-2xl glass-panel border-blue-500/30 flex items-center gap-4 mt-2 w-full max-w-lg shadow-lg">
              <div className="p-3 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-400/40">
                <Cpu className="w-7 h-7" />
              </div>
              <div>
                <div className="text-base font-bold text-white">Neoteric AI Association Leadership</div>
                <div className="text-xs text-slate-300 font-mono">President — Neoteric AI Association @ Ramco Institute of Technology</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Vibrant Info Cards Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Vision Card */}
            <div className="p-8 rounded-3xl glass-panel border-blue-500/30 hover:border-blue-400 transition-all flex flex-col gap-3 shadow-xl">
              <div className="flex items-center gap-3 text-blue-400">
                <Target className="w-6 h-6" />
                <h3 className="font-mono text-base uppercase tracking-wider font-bold">The Vision</h3>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">{vision}</p>
            </div>

            {/* Current Focus Card */}
            <div className="p-8 rounded-3xl glass-panel border-purple-500/30 hover:border-purple-400 transition-all flex flex-col gap-3 shadow-xl">
              <div className="flex items-center gap-3 text-purple-400">
                <Compass className="w-6 h-6" />
                <h3 className="font-mono text-base uppercase tracking-wider font-bold">Current Focus</h3>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line">{currentFocus}</p>
            </div>

            {/* Leadership Card */}
            <div className="p-8 rounded-3xl glass-panel border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col gap-3 shadow-xl">
              <div className="flex items-center gap-3 text-emerald-400">
                <Award className="w-6 h-6" />
                <h3 className="font-mono text-base uppercase tracking-wider font-bold">Leadership</h3>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line">{leadership}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
