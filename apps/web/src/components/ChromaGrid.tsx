"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FolderCode, Award, ExternalLink, Sparkles } from "lucide-react";
import "./ChromaGrid.css";

export interface ChromaItem {
  _id?: string;
  image?: string;
  title: string;
  subtitle?: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  location?: string;
  company?: string;
  tech_stack?: string[];
  award_name?: string;
  award_link?: string;
  live_link?: string;
  github_link?: string;
  description?: string;
  category?: string;
  is_ongoing?: boolean;
  originalProject?: any;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  onItemClick?: (item: ChromaItem) => void;
}

export const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
  onItemClick,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<any>(null);
  const setY = useRef<any>(null);
  const pos = useRef({ x: 0, y: 0 });

  const data = items && items.length > 0 ? items : [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };

    if (setX.current && setY.current) {
      setX.current(pos.current.x);
      setY.current(pos.current.y);
    }
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    if (fadeRef.current) {
      gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    }
  };

  const handleLeave = () => {
    if (fadeRef.current) {
      gsap.to(fadeRef.current, {
        opacity: 1,
        duration: fadeOut,
        overwrite: true,
      });
    }
  };

  const handleCardClick = (c: ChromaItem) => {
    if (onItemClick) {
      onItemClick(c);
      return;
    }
    const targetUrl = c.url || c.live_link || c.github_link;
    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={
        {
          "--r": `${radius}px`,
          "--cols": columns,
          "--rows": rows,
        } as React.CSSProperties
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => {
        const borderCol = c.borderColor || "#F9B637";
        const bgGradient =
          c.gradient ||
          "linear-gradient(145deg, rgba(251, 108, 0, 0.18), rgba(12, 10, 8, 0.95))";

        return (
          <article
            key={c._id || i}
            className="chroma-card"
            onMouseMove={handleCardMove}
            onClick={() => handleCardClick(c)}
            style={
              {
                "--card-border": borderCol,
                "--card-gradient": bgGradient,
                cursor: "pointer",
              } as React.CSSProperties
            }
          >
            <div className="chroma-img-wrapper">
              {c.image ? (
                <img src={c.image} alt={c.title} loading="lazy" />
              ) : (
                <div className="chroma-img-placeholder">
                  <Sparkles className="w-6 h-6 text-[#F9B637]" />
                  <span>{c.company || c.handle || c.title}</span>
                </div>
              )}
            </div>

            <footer className="chroma-info">
              <div className="chroma-info-header">
                <h3 className="name">{c.title}</h3>
                {(c.handle || c.company) && (
                  <span className="handle">{c.handle || c.company}</span>
                )}
              </div>

              {c.award_name && (
                <div className="flex items-center gap-1.5 text-xs text-[#FFDD9C] font-semibold my-0.5">
                  <Award className="w-3.5 h-3.5 text-[#F9B637]" />
                  <span>{c.award_name}</span>
                </div>
              )}

              {c.subtitle && <p className="role">{c.subtitle}</p>}
              {!c.subtitle && c.description && (
                <p className="role">{c.description}</p>
              )}

              {c.tech_stack && c.tech_stack.length > 0 && (
                <div className="chroma-tags">
                  {c.tech_stack.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="chroma-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </footer>
          </article>
        );
      })}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
