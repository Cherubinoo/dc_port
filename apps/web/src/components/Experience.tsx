"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Calendar, Building2 } from "lucide-react";

export interface ExperienceItem {
  _id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  is_academic: boolean;
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-32 relative border-t border-slate-800/80 bg-[#04060a] w-full">
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto">
        
        {/* Left-Aligned Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left gap-3 mb-16"
        >
          <div className="flex items-center gap-2 text-[#F9B637] font-mono text-sm uppercase tracking-wider font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F9B637] shadow-sm shadow-[#F9B637]" />
            <span>04 / The Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            History <span className="grad-text-vibrant">& Milestones.</span>
          </h2>
        </motion.div>

        {/* Timeline List */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0a0c10] border-2 border-[#FB6C00]/60 flex items-center justify-center group-hover:border-[#F9B637] group-hover:scale-110 transition-all shadow-md shadow-[#FB6C00]/10">
                <Terminal className="w-3.5 h-3.5 text-[#F9B637]" />
              </div>

              {/* Content Panel */}
              <div className="p-6 rounded-2xl glass-panel border-slate-800/80 hover:border-[#FB6C00]/40 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-[#F9B637] text-xs font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-4 group-hover:text-[#FFDD9C] transition-colors">
                  {exp.title}
                </h3>

                <div className="text-slate-300 text-sm leading-relaxed space-y-2 font-mono">
                  {(exp.description || "").split("\n").filter(Boolean).map((line, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#FB6C00] select-none">›</span>
                      <span>{line.replace(/^•\s*/, "")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
