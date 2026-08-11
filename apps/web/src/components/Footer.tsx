"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle2, Sparkles, X, MessageSquare, Send, User, MailCheck } from "lucide-react";
import Stepper, { Step } from "./Stepper";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

interface FooterProps {
  profile?: {
    name?: string;
    email?: string;
    phone?: string;
    github?: string;
    linkedin?: string;
  } | null;
}

export default function Footer({ profile }: FooterProps) {
  const email = profile?.email || "delightcherubino@gmail.com";
  const phone = profile?.phone || "+91 82207 89878";
  const github = profile?.github || "https://github.com/Cherubinoo";
  const linkedin = profile?.linkedin || "https://www.linkedin.com/in/delight-cherubino-bb8456291/";
  const name = profile?.name || "Delight Cherubino";

  // Stepper Contact Wizard State
  const [isStepperOpen, setIsStepperOpen] = useState(false);
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorEmail: "",
    topic: "AI & ML System Design",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleFormSubmit = async () => {
    if (!formData.visitorName || !formData.visitorEmail || !formData.message) {
      setSendError("Please complete all required fields before completing.");
      return;
    }

    setIsSending(true);
    setSendError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.visitorName,
          email: formData.visitorEmail,
          topic: formData.topic,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSent(true);
      } else {
        setSendError(data.error || "Failed to send email. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setSendError("Connection error. Please check internet connection.");
    } finally {
      setIsSending(false);
    }
  };

  const topics = [
    "AI & ML System Design",
    "GenAI / Fine-Tuning Build",
    "Industrial Computer Vision",
    "Full-Stack Architecture",
    "Internship / Career Opportunity",
    "General Inquiry",
  ];

  return (
    <footer id="contact" className="py-32 relative border-t border-slate-800/80 bg-[#04060a] w-full">
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-[1550px] mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Left Column: Widescreen Left-Aligned CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col items-start text-left gap-6"
          >
            <div className="flex items-center gap-2 text-[#F9B637] font-mono text-sm uppercase tracking-wider font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FB6C00] shadow-sm shadow-[#FB6C00]" />
              <span>Let's create something memorable</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Ready to build an experience that feels <span className="grad-text">effortless</span> and unforgettable?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal">
              Available for selective product partnerships, AI solution design, and ambitious engineering builds.
            </p>

            <div className="flex flex-wrap items-center justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsStepperOpen(true)}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#E73F1E] via-[#FB6C00] to-[#F9B637] text-white font-bold shadow-xl shadow-[#FB6C00]/35 hover:shadow-[#FB6C00]/60 transition-all text-sm sm:text-base border border-[#FFDD9C]/40 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Start a conversation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <a href="#home" className="text-slate-300 hover:text-white text-sm font-semibold underline underline-offset-4 px-4 py-2">
                Back to top
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <div className="p-7 rounded-3xl glass-panel border-[#FB6C00]/30 space-y-5 shadow-xl bg-[#060503]/90">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="text-xs font-mono text-[#FFDD9C] uppercase font-bold flex items-center gap-2">
                  <MailCheck className="w-4 h-4 text-[#FB6C00]" />
                  <span>Direct Communication Dispatch</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
                  Auto-Responder Enabled
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-100 text-base">
                <Mail className="w-5 h-5 text-[#F9B637]" />
                <a href={`mailto:${email}`} className="hover:text-[#F9B637] transition-colors font-semibold font-mono text-sm">
                  {email}
                </a>
              </div>

              {phone && (
                <div className="flex items-center gap-3 text-slate-100 text-base">
                  <Phone className="w-5 h-5 text-[#FB6C00]" />
                  <span className="font-semibold font-mono text-sm">{phone}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-slate-300 text-xs font-mono pt-1">
                <MapPin className="w-4 h-4 text-[#E73F1E]" />
                <span>Based in India &bull; Global Collaboration</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full glass-panel border-[#FB6C00]/40 text-slate-200 hover:text-[#FFDD9C] hover:border-[#F9B637] transition-colors shadow-lg"
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </a>
              )}

              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full glass-panel border-[#FB6C00]/40 text-slate-200 hover:text-[#FFDD9C] hover:border-[#F9B637] transition-colors shadow-lg"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              )}

              <button
                onClick={() => setIsStepperOpen(true)}
                className="p-3.5 rounded-full glass-panel border-[#FB6C00]/40 text-[#FFDD9C] hover:bg-[#FB6C00]/20 transition-colors shadow-lg cursor-pointer"
                aria-label="Open Stepper Contact Wizard"
              >
                <MessageSquare className="w-5 h-5 text-[#FB6C00]" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-slate-500">
          <span>© {new Date().getFullYear()} {name}</span>
          <span>Built with Precision & Passion</span>
        </div>
      </div>

      {/* REACT BITS STEPPER CONTACT WIZARD MODAL */}
      <AnimatePresence>
        {isStepperOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-xl glass-panel rounded-3xl border border-[#FB6C00]/50 bg-[#060503] shadow-2xl p-6 sm:p-8 space-y-4 relative"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-[#FB6C00]/20 border border-[#FB6C00]/40 text-[#FFDD9C]">
                    <Sparkles className="w-5 h-5 text-[#FB6C00]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">Start a Conversation</h3>
                    <p className="text-xs font-mono text-slate-400">Interactive Contact Stepper Wizard</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsStepperOpen(false);
                    setIsSent(false);
                  }}
                  className="p-2 rounded-full glass-panel text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stepper Content Container */}
              {isSent ? (
                /* SUCCESS CONFIRMATION STATE */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 text-center space-y-4 font-mono"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h4 className="text-2xl font-bold text-white">Message Dispatched!</h4>
                  
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2 text-left">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <MailCheck className="w-4 h-4" />
                      <span>Notification sent to: delightcherubino@gmail.com</span>
                    </div>
                    <p className="leading-relaxed pt-1">
                      An automated confirmation email has also been sent back to <strong className="text-[#FFDD9C]">{formData.visitorEmail}</strong> with your note summary.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsStepperOpen(false);
                      setIsSent(false);
                      setFormData({ visitorName: "", visitorEmail: "", topic: "AI & ML System Design", message: "" });
                    }}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FB6C00] to-[#F9B637] text-white font-bold text-xs font-mono shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    Done & Close
                  </button>
                </motion.div>
              ) : (
                /* REACT BITS STEPPER WIZARD */
                <Stepper
                  initialStep={1}
                  onFinalStepCompleted={handleFormSubmit}
                  backButtonText="Previous"
                  nextButtonText="Continue &rarr;"
                >
                  {/* STEP 1: CONTACT DETAILS */}
                  <Step>
                    <div className="space-y-4 py-2">
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <User className="w-4 h-4 text-[#FB6C00]" />
                          <span>Who is reaching out?</span>
                        </h4>
                        <p className="text-xs text-slate-400 font-mono">Step 1 of 3: Enter your contact info</p>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        <div>
                          <label className="block text-slate-300 mb-1.5 uppercase font-bold">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.visitorName}
                            onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                            placeholder="e.g. Alex Morgan"
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:border-[#FB6C00] outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 mb-1.5 uppercase font-bold">Your Email Address *</label>
                          <input
                            type="email"
                            required
                            value={formData.visitorEmail}
                            onChange={(e) => setFormData({ ...formData, visitorEmail: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:border-[#FB6C00] outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </Step>

                  {/* STEP 2: TOPIC SELECTOR */}
                  <Step>
                    <div className="space-y-4 py-2">
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-[#FB6C00]" />
                          <span>What would you like to discuss?</span>
                        </h4>
                        <p className="text-xs text-slate-400 font-mono">Step 2 of 3: Select collaboration domain</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                        {topics.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setFormData({ ...formData, topic: item })}
                            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                              formData.topic === item
                                ? "bg-[#FB6C00]/20 border-[#FB6C00] text-[#FFDD9C] font-bold shadow-md"
                                : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item}</span>
                              {formData.topic === item && <CheckCircle2 className="w-3.5 h-3.5 text-[#FB6C00]" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Step>

                  {/* STEP 3: MESSAGE & SCOPE DETAILS */}
                  <Step>
                    <div className="space-y-4 py-2">
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <Send className="w-4 h-4 text-[#FB6C00]" />
                          <span>Project Details & Message</span>
                        </h4>
                        <p className="text-xs text-slate-400 font-mono">Step 3 of 3: Provide project details</p>
                      </div>

                      <div className="space-y-3 font-mono text-xs">
                        <div>
                          <label className="block text-slate-300 mb-1.5 uppercase font-bold">Your Message *</label>
                          <textarea
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Describe your project, timeline, target deliverables, or question..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:border-[#FB6C00] outline-none transition-colors"
                          />
                        </div>

                        {sendError && (
                          <p className="text-xs font-mono text-red-400 bg-red-950/60 p-2.5 rounded-lg border border-red-800">
                            {sendError}
                          </p>
                        )}

                        {isSending && (
                          <div className="p-3 rounded-xl bg-[#FB6C00]/20 border border-[#FB6C00]/40 text-[#FFDD9C] flex items-center gap-2 text-xs">
                            <span className="w-3 h-3 rounded-full bg-[#FB6C00] animate-ping" />
                            <span>Dispatching Nodemailer alert to delightcherubino@gmail.com & sending auto-responder...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Step>
                </Stepper>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
