"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

export interface SkillItem {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface SkillsProps {
  skills: SkillItem[];
}

export default function Skills({ skills }: SkillsProps) {
  const grouped = useMemo(() => {
    const map = new Map<string, SkillItem[]>();
    (skills || []).forEach((skill) => {
      const cat = skill.category || "Other";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(skill);
    });
    return Array.from(map.entries());
  }, [skills]);

  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="py-32 relative border-t border-slate-800/80 bg-[#04060a]/70 w-full">
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto">
        
        {/* Left-Aligned Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left gap-3 mb-16"
        >
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
            <span>05 / Technical Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Stack <span className="grad-text">& Tools.</span>
          </h2>
        </motion.div>

        {/* Grouped Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {grouped.map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-panel border-cyan-500/20 text-cyan-400 font-mono text-xs font-semibold w-fit">
                <Wrench className="w-3.5 h-3.5" />
                <span>{category}</span>
              </div>

              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill._id} className="p-4 rounded-xl glass-panel border-slate-800 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-200">{skill.name}</span>
                      <span className="font-mono text-xs text-slate-400">{skill.proficiency}%</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
