"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// Generalized AI/ML label mapping
const SECTION_MAP: Record<string, { label: string; base: number }> = {
  hero:       { label: "INITIALIZING_CORE_WEIGHTS",   base: 0.982 },
  healthcare: { label: "PATTERN_RECOGNITION_MODE",    base: 0.941 },
  jarvis:     { label: "NEURAL_SIGNAL_PROCESSING",    base: 0.973 },
  learning:   { label: "KNOWLEDGE_GRAPH_MAPPING",     base: 0.968 },
  skills:     { label: "DISPATCH_INFERENCE_READY",    base: 0.955 },
  contact:    { label: "DISPATCH_INFERENCE_READY",    base: 0.991 },
};

export function NeuralSynapseRail() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [displayedLabel, setDisplayedLabel] = useState("INITIALIZING_CORE_WEIGHTS");
  const [confidence, setConfidence] = useState("0.982");
  const [slideState, setSlideState] = useState<"in" | "out">("in");
  const railRef = useRef<HTMLDivElement>(null);

  // Track scroll position for the dot
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver — -45% rootMargin for center detection
  useEffect(() => {
    const sections = document.querySelectorAll("[data-synapse-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionId = (entry.target as HTMLElement).dataset.synapseSection;
            if (sectionId) setActiveSection(sectionId);
          }
        }
      },
      {
        rootMargin: "-45% 0% -45% 0%",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Vertical slide + fade transition when activeSection changes
  useEffect(() => {
    const newData = SECTION_MAP[activeSection];
    const newLabel = newData ? newData.label : "DISPATCH_INFERENCE_READY";

    if (newLabel === displayedLabel) return;

    // Slide old text up & out
    setSlideState("out");

    // After the out animation, swap text and slide new text in
    const timer = setTimeout(() => {
      setDisplayedLabel(newLabel);
      setSlideState("in");
    }, 200); // half of the 0.4s total for the out phase

    return () => clearTimeout(timer);
  }, [activeSection, displayedLabel]);

  // Confidence jitter — calm 800ms interval
  useEffect(() => {
    const sectionData = SECTION_MAP[activeSection];
    const base = sectionData ? sectionData.base : 0.955;

    const flicker = () => {
      const jitter = (Math.random() - 0.5) * 0.04;
      const val = Math.min(0.999, Math.max(0.0, base + jitter));
      setConfidence(val.toFixed(3));
    };

    flicker();
    const interval = setInterval(flicker, 800);
    return () => clearInterval(interval);
  }, [activeSection]);

  // Scroll to top with flash
  const handleClick = useCallback(() => {
    setIsFlashing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsFlashing(false), 800);
  }, []);

  const railTop = 10;
  const railLength = 80;

  return (
    <div
      ref={railRef}
      className="fixed right-6 z-50"
      style={{ top: `${railTop}vh`, height: `${railLength}vh` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rail line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, hsl(var(--foreground)/0.15) 10%, hsl(var(--foreground)/0.25) 50%, hsl(var(--foreground)/0.15) 90%, transparent 100%)`,
        }}
      />

      {/* Flash on click */}
      {isFlashing && (
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full"
          style={{
            background: `linear-gradient(to top, transparent, hsl(var(--foreground)/0.8), transparent)`,
            animation: "synapse-flash 0.8s ease-out forwards",
          }}
        />
      )}

      {/* Node + label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
        style={{
          top: `${scrollPercent * 100}%`,
          transition: isHovered ? "top 0.05s linear" : "top 0.15s ease-out",
        }}
        onClick={handleClick}
        aria-label="Scroll to top"
      >
        {/* Outer glow */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: isHovered ? "20px" : "14px",
            height: isHovered ? "20px" : "14px",
            left: "50%", top: "50%",
            background: "hsl(var(--foreground)/0.06)",
            boxShadow: `0 0 ${isHovered ? "12px" : "8px"} hsl(var(--foreground)/${isHovered ? "0.15" : "0.08"})`,
            animation: "synapse-pulse 2.5s ease-in-out infinite",
            transition: "all 0.3s ease",
          }}
        />
        {/* Inner dot */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: isHovered ? "6px" : "4px",
            height: isHovered ? "6px" : "4px",
            left: "50%", top: "50%",
            background: "hsl(var(--foreground)/0.7)",
            boxShadow: `0 0 ${isHovered ? "6px" : "3px"} hsl(var(--foreground)/0.4)`,
            transition: "all 0.3s ease",
          }}
        />

        {/* Inference label — vertical slide + fade, hidden on mobile */}
        <div
          className="absolute top-1/2 pointer-events-none select-none whitespace-nowrap overflow-hidden hidden md:block"
          style={{
            right: "22px",
            transform: slideState === "in"
              ? "translateY(-50%) translateY(0px)"
              : "translateY(-50%) translateY(-6px)",
            opacity: slideState === "in" ? (isHovered ? 1 : 0.65) : 0,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <span
            className="font-mono uppercase font-bold"
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "hsl(var(--foreground)/0.8)",
            }}
          >
            {displayedLabel}
          </span>
          <span
            className="font-mono ml-1.5 font-medium"
            style={{
              fontSize: "10px",
              color: "hsl(var(--foreground)/0.5)",
              animation: "confidence-flicker 0.8s ease-in-out infinite alternate",
            }}
          >
            [{confidence}]
          </span>
        </div>
      </div>
    </div>
  );
}
