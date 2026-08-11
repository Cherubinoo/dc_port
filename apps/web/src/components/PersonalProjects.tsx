"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, X, FolderCode, ArrowUpRight } from "lucide-react";
import type { Project } from "./Projects";

interface PersonalProjectsProps {
  projects: Project[];
}

export default function PersonalProjects({ projects }: PersonalProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const personalProjects = projects.filter((p) => p.category === "personal");
  if (personalProjects.length === 0) return null;

  return (
    <section id="personal-projects" className="py-32 relative border-t border-slate-800/80 bg-[#04060a]/70 w-full">
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto">
        
        {/* Left-Aligned Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left gap-3 mb-16"
        >
          <div className="flex items-center gap-2 text-purple-400 font-mono text-sm uppercase tracking-wider font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500" />
            <span>03 / Ventures & Experiments</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Digital <span className="grad-text">Crafts.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalProjects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl glass-panel border-slate-800 p-6 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-400 text-xs font-mono">
                    <FolderCode className="w-3.5 h-3.5" />
                    <span>{project.company || "Personal Venture"}</span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-800/60 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-purple-600 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-100 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-slate-800/40">
                {project.tech_stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-800/40 border border-slate-700/40 text-slate-300 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
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
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 border border-purple-800 text-purple-400 text-xs font-mono w-fit">
                  <FolderCode className="w-4 h-4" />
                  <span>{selectedProject.company || "Personal Venture"}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">{selectedProject.title}</h2>

                <div className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </div>

                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech_stack.map((tech, i) => (
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-medium text-sm transition-colors shadow-lg"
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
