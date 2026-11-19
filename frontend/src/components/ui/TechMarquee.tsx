"use client";

import React from "react";

const TECH = [
  "Python", "FastAPI", "LangGraph", "CrewAI", "RAG", "ChromaDB", "Next.js", "React",
  "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Scikit-Learn", "SHAP", "Gemini API",
];

/** Infinite, pause-on-hover ticker of the core stack. */
export default function TechMarquee() {
  const row = [...TECH, ...TECH];
  return (
    <div
      aria-label="Core technologies"
      className="relative w-full overflow-hidden border-y border-white/10 bg-black py-5 group [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= TECH.length}
            className="flex items-center gap-8 px-4 text-sm md:text-base font-heading font-black uppercase tracking-widest text-white/70 hover:text-accent transition-colors whitespace-nowrap"
          >
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
