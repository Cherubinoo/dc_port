"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Building2, Briefcase, Award, CheckCircle2, Trophy, Sparkles } from "lucide-react";

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
  if (!experiences) return null;

  // Filter internship experience vs leadership
  const isInternship = (exp: ExperienceItem) => {
    const text = `${exp.title} ${exp.company} ${exp.description}`.toLowerCase();
    return text.includes("intern") || text.includes("igress") || text.includes("ramco cements") || text.includes("analyst");
  };

  const defaultInternships: ExperienceItem[] = [
    {
      _id: "intern-1",
      title: "ML Intern — Cement Bag Counting System",
      company: "The Ramco Cements Limited",
      duration: "Jan 2025 – Dec 2025",
      description: "• Engineered, trained, and optimized a custom YOLOv8 computer vision model (97.5% accuracy), handling end-to-end dataset annotation, augmentation, and hyperparameter tuning.\n• Optimized model inference using ONNX Runtime for real-time edge processing and authored setup documentation for factory personnel.\n• Built a PyQt5 inventory management dashboard and presented evaluation metrics, loss curves, and ROI findings directly to plant leadership.",
      is_academic: false,
    },
    {
      _id: "intern-2",
      title: "AI & ML Intern — Human Detection & Security System",
      company: "The Ramco Cements Limited",
      duration: "May 2024 – Aug 2024",
      description: "• Developed human detection project using AI with Python and computer vision libraries.\n• Trained and deployed object detection models on multi-camera RTSP video feeds utilizing Python multithreading for concurrent batch inference.\n• Contributed to data cleaning process and setting up automated systems to track water extraction and consumption.",
      is_academic: false,
    },
    {
      _id: "intern-3",
      title: "Data Analyst & Project Intern",
      company: "Igress Solutions LLP",
      duration: "Nov 2023 – Dec 2023",
      description: "• Designed Power BI sales analytics dashboards and engineered automated Python ETL pipelines for AWS sales & telemetry data.\n• Collaborated with team members on cloud infrastructure project management and operational dashboards.\n• Received Spot and Impact Awards within month one for data presentation clarity and precision ETL modeling.",
      is_academic: false,
    },
  ];

  const dbInternships = experiences.filter(isInternship);
  const internships = dbInternships.length >= 3 ? dbInternships : defaultInternships;
  const leaderships = experiences.filter((e) => !isInternship(e));

  const achievements = [
    {
      title: "1st Prize — National Paper Presentation",
      org: "Francis Xavier Engineering College",
      detail: "AI research presentation on deep learning architectures for cancer differentiation.",
    },
    {
      title: "1st Prize — INNOVANZA 2025 National Hackathon",
      org: "INNOVANZA 2025",
      detail: "Industrial Safety Gear Monitoring System combining YOLOv8 CV + Microcontrollers.",
    },
    {
      title: "Best Team Award (Lead) — National AI Innovate Hackathon",
      org: "National AI Innovate",
      detail: "Led production LLM solution design, prompt engineering, and live model pitch.",
    },
    {
      title: "Finalist — HACKODESY 2k25",
      org: "Kalasalingam University",
      detail: "Reached national finals in competitive AI system design.",
    },
  ];

  return (
    <section id="experience" className="py-32 relative border-t border-slate-800/80 bg-[#04060a] w-full overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#FB6C00]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#F9B637]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto space-y-24 relative z-10">
        
        {/* Section Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left gap-3 border-b border-slate-800/80 pb-8"
        >
          <div className="flex items-center gap-2 text-[#F9B637] font-mono text-sm uppercase tracking-wider font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F9B637] shadow-sm shadow-[#F9B637]" />
            <span>04 / Career & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            History <span className="grad-text-vibrant">& Track Record.</span>
          </h2>
        </motion.div>

        {/* DIVISION 1: INDUSTRIAL INTERNSHIPS */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white border-l-4 border-[#FB6C00] pl-4"
          >
            <Briefcase className="w-6 h-6 text-[#FB6C00]" />
            <h3>Industrial Internship Experience</h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FB6C00]/15 text-[#FFDD9C] border border-[#FB6C00]/30 ml-2">
              {internships.length} Roles
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {internships.map((exp, idx) => (
              <motion.div
                key={exp._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 sm:p-7 rounded-3xl border-slate-800 hover:border-[#FB6C00]/50 transition-all duration-300 flex flex-col justify-between gap-6 bg-[#060503]/90 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Company & Duration */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2 text-[#FFDD9C] text-xs font-mono font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-[#FB6C00]" />
                      <span>{exp.company}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#F9B637]" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white group-hover:text-[#FFDD9C] transition-colors leading-tight">
                    {exp.title}
                  </h4>

                  {/* Description List */}
                  <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2 font-mono pt-1">
                    {(exp.description || "")
                      .split("\n")
                      .filter(Boolean)
                      .map((line, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#FB6C00] font-bold select-none mt-0.5">›</span>
                          <span>{line.replace(/^•\s*/, "")}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Experience
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DIVISION 2: LEADERSHIP & ASSOCIATION ROLES */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white border-l-4 border-[#F9B637] pl-4"
          >
            <Award className="w-6 h-6 text-[#F9B637]" />
            <h3>Leadership & Technical Association Roles</h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F9B637]/15 text-[#FFDD9C] border border-[#F9B637]/30 ml-2">
              {leaderships.length} Positions
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leaderships.map((exp, idx) => (
              <motion.div
                key={exp._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 sm:p-7 rounded-3xl border-slate-800 hover:border-[#F9B637]/50 transition-all duration-300 flex flex-col justify-between gap-5 bg-[#060503]/90"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <span className="px-3 py-1 rounded-full bg-[#F9B637]/15 text-[#FFDD9C] text-xs font-mono font-semibold">
                      {exp.company}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{exp.duration}</span>
                  </div>

                  <h4 className="text-xl font-bold text-white">{exp.title}</h4>

                  <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2 font-mono">
                    {(exp.description || "")
                      .split("\n")
                      .filter(Boolean)
                      .map((line, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#F9B637] font-bold select-none mt-0.5">›</span>
                          <span>{line.replace(/^•\s*/, "")}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DIVISION 3: NATIONAL HONORS & HACKATHON ACHIEVEMENTS */}
        <div className="space-y-8 pt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white border-l-4 border-emerald-500 pl-4"
          >
            <Trophy className="w-6 h-6 text-emerald-400" />
            <h3>National Honors & Hackathon Achievements</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((ach, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 rounded-2xl glass-panel border-slate-800 hover:border-emerald-500/40 transition-all bg-[#080a0e] space-y-2.5"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{ach.org}</span>
                </div>
                <h5 className="text-base font-bold text-white">{ach.title}</h5>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">{ach.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
