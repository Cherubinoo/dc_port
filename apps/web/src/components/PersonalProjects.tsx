"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, X, FolderCode } from "lucide-react";
import ChromaGrid, { type ChromaItem } from "./ChromaGrid";
import type { Project } from "./Projects";

interface PersonalProjectsProps {
  projects: Project[];
}

export default function PersonalProjects({ projects }: PersonalProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const personalProjects = projects.filter((p) => p.category === "personal");
  if (personalProjects.length === 0) return null;

  const chromaItems: ChromaItem[] = personalProjects.map((p, i) => {
    const borders = ["#E73F1E", "#F9B637", "#FB6C00"];
    const gradients = [
      "linear-gradient(145deg, rgba(231, 63, 30, 0.25), rgba(6, 5, 3, 0.95))",
      "linear-gradient(145deg, rgba(249, 182, 55, 0.2), rgba(6, 5, 3, 0.95))",
      "linear-gradient(145deg, rgba(251, 108, 0, 0.25), rgba(6, 5, 3, 0.95))",
    ];

    return {
      _id: p._id,
      image: p.image,
      title: p.title,
      subtitle: p.description,
      company: p.company || "Personal Venture",
      handle: p.company || "Personal Venture",
      borderColor: borders[i % borders.length],
      gradient: gradients[i % gradients.length],
      tech_stack: p.tech_stack,
      award_name: p.award_name,
      award_link: p.award_link,
      live_link: p.live_link,
      github_link: p.github_link,
      originalProject: p,
    };
  });

  return (
    <section id="personal-projects" className="py-32 relative border-t border-slate-800/80 bg-[#060503]/70 w-full">
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto">
        
        {/* Left-Aligned Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left gap-3 mb-12"
        >
          <div className="flex items-center gap-2 text-[#E73F1E] font-mono text-sm uppercase tracking-wider font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E73F1E] shadow-sm shadow-[#E73F1E]" />
            <span>03 / Ventures & Experiments</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Digital <span className="grad-text">Crafts.</span>
          </h2>
        </motion.div>

        {/* ChromaGrid Spotlight Component */}
        <ChromaGrid
          items={chromaItems}
          radius={320}
          damping={0.45}
          fadeOut={0.6}
          columns={3}
          onItemClick={(item) => setSelectedProject(item.originalProject || null)}
        />
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border-slate-700 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E73F1E]/20 border border-[#FB6C00]/40 text-[#FFDD9C] text-xs font-mono w-fit">
                  <FolderCode className="w-4 h-4" />
                  <span>{selectedProject.company || "Personal Venture"}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">{selectedProject.title}</h2>

                {selectedProject.image && (
                  <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-800 relative">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </div>

                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProject.tech_stack || []).map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                  {selectedProject.github_link && (
                    <a
                      href={selectedProject.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {selectedProject.live_link && (
                    <a
                      href={selectedProject.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FB6C00] to-[#E73F1E] hover:brightness-110 text-white font-medium text-sm transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live App</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
