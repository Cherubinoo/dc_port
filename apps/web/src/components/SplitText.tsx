"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: { opacity?: number; y?: number; x?: number; scale?: number; rotate?: number };
  to?: { opacity?: number; y?: number; x?: number; scale?: number; rotate?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  onLetterAnimationComplete?: () => void;
  style?: React.CSSProperties;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete,
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || animatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            observer.disconnect();

            const targets = el.querySelectorAll(".split-unit");
            if (!targets.length) return;

            const delaySec = delay / 1000;

            gsap.fromTo(
              targets,
              { ...from },
              {
                ...to,
                duration,
                ease,
                delay: delaySec,
                stagger: 0.04,
                onComplete: () => {
                  onLetterAnimationComplete?.();
                },
              }
            );
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay, duration, ease, from, to, threshold, rootMargin, onLetterAnimationComplete, text]);

  // Split text into words and units
  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`.trim()}
      style={{ textAlign, ...style }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {splitType === "chars" ? (
            word.split("").map((char, cIdx) => (
              <span
                key={cIdx}
                className="split-unit inline-block"
                style={{ opacity: from.opacity ?? 0 }}
              >
                {char}
              </span>
            ))
          ) : (
            <span
              className="split-unit inline-block"
              style={{ opacity: from.opacity ?? 0 }}
            >
              {word}
            </span>
          )}
          {wIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default SplitText;
