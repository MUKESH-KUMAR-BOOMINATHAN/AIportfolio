"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Mic, Megaphone, MessageSquareText, PenTool, Trophy } from "lucide-react";

interface Activity {
  title: string;
  icon: React.ReactNode;
  achievement: string;
  description: string;
  tag: string;
  colorClass: string;
}

const ACTIVITIES: Activity[] = [
  {
    title: "Emceeing & Event Hosting",
    icon: <Mic className="w-5 h-5 text-accent" />,
    achievement: "University Main Stage Coordinator",
    tag: "Communication",
    colorClass: "border-accent/30 hover:border-accent/60 shadow-accent/5",
    description: "I hosted the main stage for university-level mega fests, including official College Day celebrations and the annual Pongal Fest. I managed stage scheduling and directed live audiences of over 2,000+ students, faculty, and VIP guests."
  },
  {
    title: "Adzap (Improv Ad Pitching)",
    icon: <Megaphone className="w-5 h-5 text-accent-secondary" />,
    achievement: "2nd Prize — Techutsav National Level Symposium",
    tag: "Improvisation & Sales",
    colorClass: "border-accent-secondary/30 hover:border-accent-secondary/60 shadow-accent-secondary/5",
    description: "I won second place in a high-pressure, competitive product-pitching event. I formulated and delivered a creative, persuasive sales pitch for a randomly assigned, bizarre product within a strict 60-second limit."
  },
  {
    title: "Competitive Debating",
    icon: <MessageSquareText className="w-5 h-5 text-[#A78BFA]" />,
    achievement: "Finalist — SRM University Milan Intercollege",
    tag: "Critical Thinking",
    colorClass: "border-[#A78BFA]/30 hover:border-[#A78BFA]/60 shadow-[#A78BFA]/5",
    description: "I represented my college and debated complex contemporary topics focusing on AI ethics, digital privacy, and technology policies at the prestigious Milan inter-college cultural festival hosted by SRM University."
  },
  {
    title: "Creative Script Writing",
    icon: <PenTool className="w-5 h-5 text-[#E11D48]" />,
    achievement: "1st Prize — SRM University Milan Intercollege",
    tag: "Creative Storytelling",
    colorClass: "border-[#E11D48]/30 hover:border-[#E11D48]/60 shadow-[#E11D48]/5",
    description: "I was awarded first place at the national-level festival Milan for writing an original theatrical script. I focused on structuring narrative dialogues, scene pacing, and developing engaging character arcs."
  }
];

// Spring scale variants for Emceeing card
const scaleVariants = {
  hidden: { opacity: 0, scale: 0.4, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 15 } 
  }
};

// Slide variants for Adzap card
const slideVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 20 } 
  }
};

// Page unfurl variants for Scriptwriting card
const unfurlVariants = {
  hidden: { opacity: 0, rotateY: -90 },
  visible: { 
    opacity: 1, 
    rotateY: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

// Default spring variants for general cards
const defaultCardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150 }
  }
};

export default function BeyondTech() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  return (
    <section id="beyond-tech" className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full border-b border-glass-border">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent">
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white tracking-wide">
          Beyond Technology
        </h2>
        <div className="h-[1px] bg-glass-border flex-1 ml-4" />
      </div>

      {/* Narrative Section Header */}
      <div className="max-w-3xl mb-12 space-y-4">
        <p className="text-muted text-sm md:text-base leading-relaxed">
          I believe clean code is only half the equation. To build world-class products, an engineer 
          needs a builder's mindset that encompasses **communication, quick thinking, and narrative storytelling**. 
          My awards in public speaking, scriptwriting, and ad-pitch fests reflect my ability 
          to translate complex technical ideas into compelling human stories.
        </p>
      </div>

      {/* Activities Grid with customized physics for each activity */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ perspective: 1200 }}
      >
        {ACTIVITIES.map((act, idx) => {
          let customVariants: any = defaultCardVariants;
          let customHover: any = { y: -4 };
          let customStyle: React.CSSProperties = {};

          if (idx === 0) {
            // Emceeing: scales out with spring physics
            customVariants = scaleVariants;
            customHover = { scale: 1.01, y: -4 };
          } else if (idx === 1) {
            // Adzap: spring slide
            customVariants = slideVariants;
            customHover = { scale: 1.02, rotate: 0.5, y: -3 };
          } else if (idx === 2) {
            // Debate: swings like a placard on hover
            customHover = { 
              rotateZ: [0, -3, 3, -1.5, 1.5, 0],
              y: -4,
              transition: { duration: 0.6 }
            } as any;
          } else if (idx === 3) {
            // Script Writing: unfurls like a page
            customVariants = unfurlVariants;
            customStyle = { transformOrigin: "left center" };
            customHover = { rotateY: -10, scale: 1.02, transition: { duration: 0.3 } };
          }

          return (
            <motion.div
              key={idx}
              className={`glass-panel rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative overflow-hidden ${act.colorClass} ${idx === 0 ? "md:col-span-2" : ""}`}
              variants={customVariants}
              whileHover={customHover}
              style={customStyle}
            >
              {/* Ambient visual indicator */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full pointer-events-none" />

              <div className="space-y-4">
                {/* Header block */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-card border border-glass-border">
                      {act.icon}
                    </div>
                    <h3 className="font-heading font-bold text-white text-base">
                      {act.title}
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted bg-card px-2.5 py-1 rounded-full border border-glass-border">
                    {act.tag}
                  </span>
                </div>

                {/* Achievement highlight */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{act.achievement}</span>
                </div>

                {/* Description */}
                <p className="text-muted text-xs md:text-sm leading-relaxed">
                  {act.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
