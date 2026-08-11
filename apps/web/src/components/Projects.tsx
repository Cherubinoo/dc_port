"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, X, Briefcase, Award, ArrowUpRight } from "lucide-react";

export interface Project {
  _id: string;
  title: string;
  company: string;
  category: string;
  description: string;
  tech_stack: string[];
  award_name?: string;
  award_link?: string;
  live_link?: string;
  github_link?: string;
  image?: string;
  is_ongoing: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const workProjects = projects.filter((p) => p.category === "work");
  if (workProjects.length === 0) return null;

  return (
    <section id="work" className="py-32 relative border-t border-slate-800/80 bg-[#04060a] w-full">
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto">
        
        {/* Left-Aligned Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left gap-3 mb-16"
        >
          <div className="flex items-center gap-2 text-blue-400 font-mono text-sm uppercase tracking-wider font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500" />
            <span>02 / Commercial Impact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Selected <span className="grad-text">Case Studies.</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workProjects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl glass-panel border-slate-800 p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                {project.image && (
                  <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-700/50 relative mb-2">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Top Badge Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-mono">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{project.company}</span>
                  </div>

                  {project.award_name ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                      <Award className="w-3.5 h-3.5 text-amber-300" />
                      <span>Winner</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-slate-800/60">
                {project.tech_stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/50 text-slate-300 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Modal */}
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
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-mono">
                    <Briefcase className="w-4 h-4" />
                    <span>{selectedProject.company}</span>
                  </div>
                  {selectedProject.award_name && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                      🏆 {selectedProject.award_name}
                    </div>
                  )}
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-medium text-sm transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo / Details</span>
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
