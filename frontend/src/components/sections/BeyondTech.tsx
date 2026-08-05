"use client";

import React from "react";
import { motion } from "framer-motion";
import { ACTIVITIES } from "@/data/beyondTech";
import BeyondTechCard from "@/components/ui/cards/BeyondTechCard";

export default function BeyondTech() {
  return (
    <section id="beyond-tech" className="py-16 md:py-24 px-4 md:px-8 w-full bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 border-b-2 border-white/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter">
            Beyond <br /> <span className="text-accent">Technology</span>
          </h2>
          <p className="text-muted max-w-md text-sm font-medium leading-relaxed">
            I believe clean code is only half the equation. To build world-class products, an engineer 
            needs a builder's mindset that encompasses communication, quick thinking, and narrative storytelling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {ACTIVITIES.map((act, idx) => (
            <BeyondTechCard key={idx} activity={act} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
