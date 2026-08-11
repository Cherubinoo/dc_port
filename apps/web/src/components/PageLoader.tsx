"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TrueFocus from "./TrueFocus";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Play TrueFocus "Hello Welcome" animation on land/refresh, then smooth fade out
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#060503] flex items-center justify-center p-6 select-none"
        >
          {/* Ambient Orange Backlight Glow */}
          <div className="absolute w-[500px] h-[500px] bg-[#FB6C00]/18 rounded-full blur-[160px] pointer-events-none" />

          {/* Minimal TrueFocus Hello Welcome Animation */}
          <div className="relative z-10">
            <TrueFocus
              sentence="Hello Welcome"
              blurAmount={6}
              borderColor="#FB6C00"
              glowColor="rgba(251, 108, 0, 0.65)"
              animationDuration={0.7}
              pauseBetweenAnimations={0.6}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
