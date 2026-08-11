"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Cpu,
  FolderOpen,
  X,
  Sparkles,
  CheckCircle2,
  Maximize2,
  Database
} from "lucide-react";
import LogoLoop from "./LogoLoop";
import Folder from "./Folder";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group skills cleanly into categories with fallback guarantee
  const defaultSkills: SkillItem[] = [
    { _id: "s1", name: "LLM Fine-Tuning (LoRA, PEFT, SFT)", category: "LLM Engineering & GenAI", proficiency: 96 },
    { _id: "s2", name: "Quantization (GGUF, AWQ)", category: "LLM Engineering & GenAI", proficiency: 92 },
    { _id: "s3", name: "RAG & Vector DB Architecture", category: "LLM Engineering & GenAI", proficiency: 94 },
    { _id: "s4", name: "Ollama / Llama 3 8B & AWS Bedrock", category: "LLM Engineering & GenAI", proficiency: 95 },
    
    { _id: "s5", name: "YOLOv8 Object Detection", category: "Computer Vision & ML", proficiency: 97 },
    { _id: "s6", name: "ONNX Runtime Edge Inference", category: "Computer Vision & ML", proficiency: 92 },
    { _id: "s7", name: "PyTorch & OpenCV Pipelines", category: "Computer Vision & ML", proficiency: 95 },
    { _id: "s8", name: "Dataset Annotation & Augmentation", category: "Computer Vision & ML", proficiency: 90 },

    { _id: "s9", name: "PostgreSQL & Relational Schemas", category: "Database & Storage Systems", proficiency: 94 },
    { _id: "s10", name: "Redis Caching & In-Memory Queues", category: "Database & Storage Systems", proficiency: 90 },
    { _id: "s11", name: "Vector DBs (ChromaDB, Pinecone)", category: "Database & Storage Systems", proficiency: 92 },
    { _id: "s12", name: "Convex Realtime DB & AWS S3", category: "Database & Storage Systems", proficiency: 95 },
    { _id: "s13", name: "Power BI & Python ETL Pipelines", category: "Database & Storage Systems", proficiency: 90 },

    { _id: "s14", name: "Python / FastAPI / Django", category: "Full-Stack & Cloud DevOps", proficiency: 96 },
    { _id: "s15", name: "React / Next.js / TypeScript", category: "Full-Stack & Cloud DevOps", proficiency: 92 },
    { _id: "s16", name: "Docker Sandboxing & CI/CD", category: "Full-Stack & Cloud DevOps", proficiency: 90 },

    { _id: "s17", name: "LMS Integration & Documentation", category: "Architecture & Technical Writing", proficiency: 94 },
    { _id: "s18", name: "Anti-Cheat Detection Algorithms", category: "Architecture & Technical Writing", proficiency: 90 }
  ];

  const activeSkillsList = (skills && skills.length >= 12) ? skills : defaultSkills;

  const grouped = useMemo(() => {
    const map = new Map<string, SkillItem[]>();
    activeSkillsList.forEach((skill) => {
      const cat = skill.category || "General Stack";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(skill);
    });
    return Array.from(map.entries());
  }, [activeSkillsList]);

  if (!skills || skills.length === 0) return null;

  const getCategoryTheme = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("llm") || cat.includes("genai") || cat.includes("ai")) {
      return {
        icon: <Brain className="w-4 h-4 text-[#FB6C00]" />,
        color: "#FB6C00",
        bg: "bg-[#FB6C00]/10",
        border: "border-[#FB6C00]/40",
        text: "text-[#FFDD9C]",
      };
    }
    if (cat.includes("vision") || cat.includes("cv") || cat.includes("ml")) {
      return {
        icon: <Sparkles className="w-4 h-4 text-[#E73F1E]" />,
        color: "#E73F1E",
        bg: "bg-[#E73F1E]/10",
        border: "border-[#E73F1E]/40",
        text: "text-red-300",
      };
    }
    if (cat.includes("database") || cat.includes("storage") || cat.includes("sql") || cat.includes("db")) {
      return {
        icon: <Database className="w-4 h-4 text-emerald-400" />,
        color: "#10b981",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/40",
        text: "text-emerald-300",
      };
    }
    if (cat.includes("backend") || cat.includes("full") || cat.includes("cloud")) {
      return {
        icon: <Cpu className="w-4 h-4 text-[#F9B637]" />,
        color: "#F9B637",
        bg: "bg-[#F9B637]/10",
        border: "border-[#F9B637]/40",
        text: "text-[#FFDD9C]",
      };
    }
    return {
      icon: <FolderOpen className="w-4 h-4 text-purple-400" />,
      color: "#a855f7",
      bg: "bg-purple-500/10",
      border: "border-purple-500/40",
      text: "text-purple-300",
    };
  };

  const activeCategorySkills = selectedCategory
    ? grouped.find(([cat]) => cat === selectedCategory)?.[1] || []
    : [];

  return (
    <section id="skills" className="py-20 relative border-t border-slate-800/80 bg-[#04060a]/90 w-full overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#FB6C00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto space-y-10 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6"
        >
          <div>
            <div className="flex items-center gap-2 text-[#F9B637] font-mono text-xs uppercase tracking-wider font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-[#FB6C00] shadow-sm shadow-[#FB6C00]" />
              <span>05 / Stack & Tools</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Technical <span className="grad-text">Arsenal.</span>
            </h2>
          </div>

          <p className="text-slate-400 text-xs font-mono max-w-md">
            Click 3D stack folders to trigger paper popouts and inspect full domain specs & competencies.
          </p>
        </motion.div>

        {/* Compact Folder Grid with React Bits 3D Folder Component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {grouped.map(([category, items], idx) => {
            const theme = getCategoryTheme(category);
            
            // Build logo loop items from skill names
            const logoItems = items.map((sk) => ({
              node: (
                <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-[11px] font-mono font-semibold whitespace-nowrap flex items-center gap-1.5 shadow-sm hover:border-[#FB6C00]/50 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB6C00]" />
                  {sk.name}
                </span>
              ),
              title: sk.name,
            }));

            // Build paper preview elements for 3D folder popout animation
            const paperNodes = items.slice(0, 3).map((sk, i) => (
              <span key={i} className="text-[9px] font-mono font-bold text-[#FFDD9C] truncate text-center px-1">
                {sk.name.split(" ")[0]}
              </span>
            ));

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`p-6 rounded-3xl glass-panel border border-slate-800 hover:${theme.border} transition-all duration-300 bg-[#060503]/90 flex flex-col justify-between gap-5 group shadow-lg hover:-translate-y-1`}
              >
                {/* 3D Folder Animation + Category Title */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-xl ${theme.bg} border ${theme.border}`}>
                        {theme.icon}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {items.length} Skills
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#FFDD9C] transition-colors leading-tight">
                      {category}
                    </h3>
                  </div>

                  {/* React Bits 3D Interactive Folder */}
                  <Folder
                    color={theme.color}
                    size={0.85}
                    items={paperNodes}
                    onClick={() => setSelectedCategory(category)}
                  />
                </div>

                {/* React Bits LogoLoop Infinite Marquee */}
                <div className="py-2 border-t border-b border-slate-800/60 overflow-hidden">
                  <LogoLoop
                    logos={logoItems}
                    speed={45 + idx * 8}
                    logoHeight={20}
                    gap={10}
                    fadeOut
                    fadeOutColor="#060503"
                    pauseOnHover
                  />
                </div>

                {/* Inspect Button Prompt */}
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="w-full flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-[#FFDD9C] transition-colors pt-1 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-semibold">
                    <FolderOpen className="w-3.5 h-3.5 text-[#FB6C00]" />
                    <span>Open {category.split(" ")[0]} Folder</span>
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#FFDD9C] transition-colors" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* POPUP LIGHTBOX MODAL FOR DETAILED STACK FOLDER */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-2xl glass-panel rounded-3xl border border-[#FB6C00]/40 p-6 sm:p-8 bg-[#090805]/95 shadow-2xl space-y-6 relative overflow-hidden"
            >
              {/* Top Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#FB6C00]/20 border border-[#FB6C00]/40 text-[#FFDD9C]">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{selectedCategory}</span>
                      <span className="text-xs font-mono text-[#FFDD9C] px-2.5 py-0.5 rounded-full bg-[#FB6C00]/20 border border-[#FB6C00]/30">
                        {activeCategorySkills.length} Verified Items
                      </span>
                    </h3>
                    <p className="text-xs font-mono text-slate-400">Technical Breakdown & Proficiency Specs</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 rounded-full glass-panel text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Skills List in Lightbox */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {activeCategorySkills.map((sk) => (
                  <div
                    key={sk._id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2 hover:border-[#FB6C00]/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
                        <CheckCircle2 className="w-4 h-4 text-[#FB6C00]" />
                        <span>{sk.name}</span>
                      </span>
                      <span className="font-mono text-xs text-[#FFDD9C] font-bold px-2 py-0.5 rounded bg-[#FB6C00]/10 border border-[#FB6C00]/20">
                        {sk.proficiency}% Mastery
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800/80">
                      <div
                        style={{ width: `${Math.min(sk.proficiency, 100)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#E73F1E] via-[#FB6C00] to-[#F9B637]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Close */}
              <div className="flex justify-end pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Stack Folder
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
