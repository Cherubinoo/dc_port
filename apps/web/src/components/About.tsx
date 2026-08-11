"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Target, Award, Cpu } from "lucide-react";
import ProfileCard from "./ProfileCard";
import StrokeText from "./StrokeText";
import FoldText from "./FoldText";

interface AboutProps {
  profile?: {
    bio?: string;
    vision?: string;
    approach?: string;
    leadership?: string;
    current_focus?: string;
  } | null;
}

const personaRoles = [
  { label: "Software Architect", stroke: "#FB6C00" },
  { label: "AI Engineer", stroke: "#E73F1E" },
  { label: "Builder", stroke: "#F9B637" },
  { label: "Problem Overthinker", stroke: "#A78BFA" },
  { label: "Coffee Debugger", stroke: "#F59E0B" },
  { label: "Team Leader", stroke: "#10B981" },
];

const architectureQuestions = [
  "• How should the system work?",
  "• How will it scale?",
  "• Why is it slow?",
  "• Why did Docker suddenly decide to ruin my evening?",
  "• Can AI solve this?",
  "And most importantly... “Can we make this cooler?” 😎",
];

export default function About({ profile }: AboutProps) {
  const vision =
    profile?.vision ||
    "My long-term goal is to build impactful technology solutions that solve real problems at scale. I aim to contribute to the development of intelligent systems that make processes smarter, faster, and more efficient.";

  const currentFocus =
    profile?.current_focus ||
    "Right now, I am focused on:\n• Building scalable AI-driven platforms\n• Developing student-centric tools and applications\n• Improving real-time system performance\n• Exploring advanced system design and architecture";

  const leadership =
    profile?.leadership ||
    "As Vice President of my department, I actively:\n• Lead and coordinate technical initiatives\n• Work closely with teams on project development\n• Encourage collaborative problem-solving\n• Help create opportunities for students to build and innovate";

  // Cycling persona roles state
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIdx((prev) => (prev + 1) % personaRoles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);
  const currentRole = personaRoles[activeRoleIdx];

  // Cycling architecture questions state (FoldText loop)
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  useEffect(() => {
    const questionTimer = setInterval(() => {
      setActiveQuestionIdx((prev) => (prev + 1) % architectureQuestions.length);
    }, 3400);
    return () => clearInterval(questionTimer);
  }, []);
  const currentQuestion = architectureQuestions[activeQuestionIdx];

  return (
    <section id="about" className="py-32 relative border-t border-slate-800/80 bg-[#04060a]/70 w-full overflow-hidden">
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Left-Aligned Origin Story & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start text-left gap-7"
          >
            <div className="flex items-center gap-2 text-[#F9B637] font-mono text-sm uppercase tracking-wider font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F9B637] shadow-sm shadow-[#F9B637]" />
              <span>01 / The Origin Story</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              So... How Did I <span className="grad-text">Get Here?</span>
            </h2>

            {/* Story Paragraph Blocks */}
            <div className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed space-y-5">
              <p className="font-semibold text-white text-xl border-l-4 border-[#FB6C00] pl-4 py-1 italic bg-[#FB6C00]/10 rounded-r-xl">
                “What if I just build it myself?”
              </p>
              
              <p className="text-slate-300">
                Bad idea. 😂 Because that one thought somehow turned into countless lines of code, late-night debugging, questionable amounts of coffee, broken deployments, and a habit of turning random ideas into actual projects.
              </p>

              <p className="text-slate-300">
                I started with curiosity, fell into <strong className="text-[#FFDD9C] font-semibold">AI</strong>, got obsessed with building software, and eventually started wondering how all these pieces could fit together into systems that actually work in the real world.
              </p>

              <div className="p-4.5 rounded-2xl bg-[#18120c] border border-[#FB6C00]/40 text-[#FFDD9C] font-mono text-sm shadow-md">
                Then came <strong>computer vision, backend systems, cloud, Docker, databases, AI models...</strong> <br />
                Basically, I kept saying: <em className="text-slate-300">“I'll learn this one thing.”</em> And somehow ended up learning twelve. 💀
              </div>

              <p className="text-slate-300">
                I've built AI systems, production platforms, computer vision solutions, and automation tools. I've broken things, fixed them, deployed them, broken them again, and learned something new every time.
              </p>

              <p className="text-slate-200 font-medium">
                Somewhere along the way, I realized I didn't just enjoy writing code. <br />
                <span className="grad-text-vibrant font-bold text-xl">I enjoyed designing the whole thing.</span>
              </p>

              {/* Architecture Questions FoldText Loop (No Box, Frameless Unfold Animation) */}
              <div className="py-2.5 min-h-[68px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeQuestionIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <FoldText
                      key={`fold-q-${activeQuestionIdx}`}
                      text={currentQuestion}
                      splitBy="word"
                      hinge="top"
                      trigger="mount"
                      duration={0.6}
                      stagger={0.04}
                      ease="power3.out"
                      perspective={700}
                      creaseShading={0.55}
                      fontSize="clamp(1.1rem, 2.2vw, 1.4rem)"
                      fontWeight={700}
                      color={activeQuestionIdx === 5 ? "#FFDD9C" : "#F9B637"}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-slate-300">
                That eventually led me toward <strong className="text-white">Software Architecture and AI Engineering</strong> — building systems from the ground up while figuring out how all the moving pieces fit together.
              </p>

              <p className="text-slate-300">
                And then there's the people side. I love sharing ideas, building with others, organizing things, and getting people excited about technology. That's what led me to become <strong className="text-[#FFDD9C]">President of the Neoteric AI Association at Ramco Institute of Technology</strong>.
              </p>

              {/* Cycling Single Persona Role with StrokeText in Loop */}
              <div className="pt-3 space-y-3 w-full">
                <div className="text-xs font-mono uppercase tracking-widest text-[#FFDD9C] font-bold">
                  So today, I'm basically a mix of:
                </div>

                <div className="w-full max-w-md min-h-[82px] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeRoleIdx}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="p-4 px-6 rounded-2xl glass-panel border border-[#FB6C00]/50 bg-[#18120c]/90 flex items-center justify-center shadow-xl shadow-[#FB6C00]/15"
                    >
                      <div className="w-full overflow-hidden text-center">
                        <StrokeText
                          key={`stroke-${activeRoleIdx}`}
                          text={currentRole.label}
                          strokeColor={currentRole.stroke}
                          fillColor="#FFDD9C"
                          strokeWidth={1.5}
                          drawDuration={1.2}
                          fillDelay={0.15}
                          stagger={0.04}
                          trigger="mount"
                          fillMode="wipe"
                          fontSize={32}
                          fontWeight={800}
                          letterSpacing={-0.5}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Concluding Highlight Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#E73F1E]/20 via-[#FB6C00]/20 to-[#F9B637]/20 border border-[#FB6C00]/50 text-white font-medium text-base shadow-xl">
                I don't know exactly where this journey ends. But I do know one thing: <br />
                <span className="text-[#FFDD9C] font-bold text-lg">
                  If there's a crazy idea on the table, I'm probably already thinking about how to build it.
                </span>
                <div className="text-xs font-mono text-slate-400 pt-2 italic">
                  And yes... I still Google the error messages. 😌
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: ProfileCard + The Vision + Neoteric AI Leadership + Current Focus + Leadership */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end text-left gap-6 sticky top-24"
          >
            {/* Interactive 3D Tilt ProfileCard */}
            <div className="w-full flex justify-center lg:justify-end">
              <ProfileCard
                name="Delight Cherubino"
                title="Software Architect & AI Engineer"
                handle="Cherubinoo"
                status="Online • Building AI"
                contactText="Get in Touch"
                avatarUrl="/images/del-comic-sticker.png"
                miniAvatarUrl="/images/del-comic-sticker.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={true}
                behindGlowColor="rgba(251, 108, 0, 0.67)"
                innerGradient="linear-gradient(145deg, #18120c 0%, #FB6C0044 100%)"
                onContactClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>

            {/* 1. The Vision Card Container */}
            <div className="p-7 rounded-3xl glass-panel border-[#FB6C00]/30 hover:border-[#F9B637] transition-all flex flex-col gap-3 shadow-xl text-left w-full max-w-md">
              <div className="flex items-center gap-3 text-[#F9B637]">
                <Target className="w-5 h-5" />
                <h3 className="font-mono text-sm uppercase tracking-wider font-bold">The Vision</h3>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed font-normal">{vision}</p>
            </div>

            {/* 2. Neoteric AI Association Leadership Badge */}
            <div className="p-5 rounded-3xl glass-panel border-[#FB6C00]/40 flex items-center gap-4 w-full max-w-md shadow-xl text-left">
              <div className="p-3 rounded-2xl bg-[#FB6C00]/20 text-[#FFDD9C] border border-[#FB6C00]/40 flex-shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-white">Neoteric AI Association Leadership</div>
                <div className="text-xs text-slate-300 font-mono mt-0.5">President — Neoteric AI Association @ Ramco Institute of Technology</div>
              </div>
            </div>

            {/* 3. Current Focus Card */}
            <div className="p-6 rounded-3xl glass-panel border-[#E73F1E]/30 hover:border-[#FB6C00] transition-all flex flex-col gap-3 shadow-xl text-left w-full max-w-md">
              <div className="flex items-center gap-3 text-[#FB6C00]">
                <Compass className="w-5 h-5" />
                <h3 className="font-mono text-sm uppercase tracking-wider font-bold">Current Focus</h3>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal whitespace-pre-line">{currentFocus}</p>
            </div>

            {/* 4. Leadership Card */}
            <div className="p-6 rounded-3xl glass-panel border-[#F9B637]/30 hover:border-[#FFDD9C] transition-all flex flex-col gap-3 shadow-xl text-left w-full max-w-md">
              <div className="flex items-center gap-3 text-[#FFDD9C]">
                <Award className="w-5 h-5" />
                <h3 className="font-mono text-sm uppercase tracking-wider font-bold">Leadership</h3>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal whitespace-pre-line">{leadership}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
