"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode,
  FolderOpen,
  ChevronRight,
  ExternalLink,
  Code,
  Terminal,
  Sparkles,
  CheckCircle2,
  Quote,
  MousePointerClick
} from "lucide-react";
import type { Project } from "./Projects";

interface PersonalProjectsProps {
  projects: Project[];
  saying?: string;
}

export default function PersonalProjects({ projects, saying }: PersonalProjectsProps) {
  const personalProjects = projects.filter((p) => p.category === "personal" || p.category === "experiment");
  const displayProjects = personalProjects.length > 0 ? personalProjects : projects;

  const [activeIdx, setActiveIdx] = useState(0);
  const activeProj = displayProjects[activeIdx] || displayProjects[0];

  const getFileExtension = (title: string, tech: string[]) => {
    const t = title.toLowerCase();
    const stack = (tech || []).join(" ").toLowerCase();
    if (stack.includes("python") || t.includes("sentiment") || t.includes("ocr")) return ".py";
    if (stack.includes("docker") || t.includes("hosting")) return ".dockerfile";
    if (stack.includes("react") || stack.includes("next")) return ".tsx";
    return ".ts";
  };

  return (
    <section id="personal-projects" className="py-32 relative border-t border-slate-800/80 bg-[#04060a]/90 w-full overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FB6C00]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto relative z-10 space-y-8">
        
        {/* Header & Developer Saying Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left gap-4"
        >
          <div className="flex items-center gap-2 text-[#E73F1E] font-mono text-sm uppercase tracking-wider font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E73F1E] shadow-sm shadow-[#E73F1E]" />
            <span>03 / Ventures & Experiments</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Digital <span className="grad-text">Crafts.</span>
          </h2>

          {/* Developer Saying Tagline */}
          <div className="p-4 rounded-2xl bg-[#090805] border border-[#FB6C00]/30 text-[#FFDD9C] font-mono text-xs sm:text-sm flex items-center gap-3 shadow-lg max-w-3xl">
            <Quote className="w-5 h-5 text-[#FB6C00] flex-shrink-0" />
            <span className="italic leading-relaxed">
              "{saying || "Great software isn't just written — it unfolds through late-night experiments, broken builds, and relentless iteration."}"
            </span>
          </div>
        </motion.div>

        {/* IDE File Explorer Workspace Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full glass-panel rounded-3xl border-[#FB6C00]/30 shadow-2xl overflow-hidden bg-[#060503]/95 grid grid-cols-1 lg:grid-cols-12 border"
        >
          {/* IDE Window Title Bar */}
          <div className="lg:col-span-12 px-6 py-3.5 bg-[#0e0c08] border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-3 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#F9B637]" />
                cherubino-labs / digital-crafts / workspace
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#F9B637]">
              <MousePointerClick className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden sm:inline">Click files in sidebar to switch views</span>
            </div>
          </div>

          {/* Left Sidebar: Interactive File Directory Explorer */}
          <div className="lg:col-span-4 p-5 bg-[#090805] border-b lg:border-b-0 lg:border-r border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-400 tracking-wider font-bold px-2">
              <span className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#F9B637]" />
                <span>repository-tree</span>
              </span>
              <span className="text-[10px] text-slate-500 font-normal">[{displayProjects.length} files]</span>
            </div>

            <div className="space-y-2 pt-1">
              {displayProjects.map((proj, idx) => {
                const isActive = idx === activeIdx;
                const ext = getFileExtension(proj.title, proj.tech_stack);
                return (
                  <button
                    key={proj._id || idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left font-mono text-xs transition-all border cursor-pointer ${
                      isActive
                        ? "bg-[#FB6C00]/20 border-[#FB6C00]/60 text-[#FFDD9C] font-bold shadow-lg shadow-[#FB6C00]/15 scale-[1.02]"
                        : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <FileCode className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? "text-[#FB6C00]" : "text-slate-500"}`} />
                      <span className="truncate">
                        {proj.title.toLowerCase().replace(/\s+/g, "-")}{ext}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#FB6C00] shadow-sm shadow-[#FB6C00] animate-pulse" />
                      )}
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90 text-[#FFDD9C]" : "text-slate-600"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Panel: File Content & Case Study Inspector */}
          <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between gap-6 min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeProj && (
                <motion.div
                  key={activeProj._id || activeIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  {/* File Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#FB6C00]/20 border border-[#FB6C00]/40 text-[#FFDD9C] text-xs font-mono font-bold">
                        {activeProj.company || "Personal Venture"}
                      </span>
                      {activeProj.is_ongoing && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-[11px] font-mono flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Active Lab</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-mono text-slate-400">
                      Active Buffer: <span className="text-[#FFDD9C] font-semibold">{activeProj.title.toLowerCase().replace(/\s+/g, "-")}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {activeProj.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-1">
                      {activeProj.description}
                    </p>
                  </div>

                  {/* Code Inspection JSON Snippet Block */}
                  <div className="p-4.5 rounded-2xl bg-[#090805] border border-slate-800 space-y-2.5 font-mono text-xs shadow-inner">
                    <div className="flex items-center justify-between text-slate-500 border-b border-slate-800/60 pb-2">
                      <span className="flex items-center gap-2">
                        <Code className="w-3.5 h-3.5 text-[#F9B637]" />
                        <span>specifications.json</span>
                      </span>
                      <span>UTF-8</span>
                    </div>

                    <div className="space-y-1 text-slate-300 pt-1">
                      <div><span className="text-[#FB6C00]">"architecture"</span>: <span className="text-emerald-300">"{activeProj.title} Pipeline"</span>,</div>
                      <div><span className="text-[#FB6C00]">"owner"</span>: <span className="text-[#FFDD9C]">"Delight Cherubino"</span>,</div>
                      <div><span className="text-[#FB6C00]">"category"</span>: <span className="text-purple-300">"Personal Venture & Experiment"</span>,</div>
                      <div>
                        <span className="text-[#FB6C00]">"tech_stack"</span>: [
                        <span className="text-[#F9B637]">
                          {(activeProj.tech_stack || []).map((t) => `"${t}"`).join(", ")}
                        </span>
                        ]
                      </div>
                    </div>
                  </div>

                  {/* Technologies Badges */}
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2.5 font-bold">
                      Environment Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(activeProj.tech_stack || []).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#F9B637]" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons Bar */}
            {activeProj && (
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/80">
                {activeProj.github_link && (
                  <a
                    href={activeProj.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs font-mono transition-colors shadow-md"
                  >
                    <Code className="w-4 h-4 text-[#F9B637]" />
                    <span>Inspect GitHub Source</span>
                  </a>
                )}

                {activeProj.live_link && (
                  <a
                    href={activeProj.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FB6C00] via-[#F9B637] to-[#E73F1E] hover:brightness-110 text-white font-bold text-xs font-mono transition-all shadow-lg shadow-[#FB6C00]/20 border border-[#FFDD9C]/30"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Application</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
