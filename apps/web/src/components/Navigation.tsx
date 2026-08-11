"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, FileText, Settings } from "lucide-react";
import Link from "next/link";

interface NavigationProps {
  resumeUrl?: string;
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "personal-projects", label: "Projects" },
  { id: "experience", label: "Journey" },
  { id: "skills", label: "Stack" },
];

export default function Navigation({ resumeUrl }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = navItems.map((item) => item.id);
      const current = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= -300 && rect.top <= 300;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex items-center justify-center px-4">
      <nav className="glass-panel grad-border flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full shadow-2xl transition-all duration-300">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                isActive
                  ? "text-white bg-blue-600/30 font-semibold shadow-inner"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full border border-blue-500/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.a>
          );
        })}

        <div className="h-4 w-[1px] bg-slate-700/60 mx-1" />

        {resumeUrl && (
          <motion.a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:brightness-110"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </motion.a>
        )}

        <Link href="/admin">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full text-slate-400 hover:text-white transition-colors"
            title="Admin CMS"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </Link>

        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full text-slate-400 hover:text-amber-400 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>
      </nav>
    </div>
  );
}
