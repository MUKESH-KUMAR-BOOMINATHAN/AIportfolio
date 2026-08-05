"use client";

import React from "react";
import { motion } from "framer-motion";
import EducationCard from "@/components/ui/cards/EducationCard";
import { EDUCATION } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="py-16 md:py-24 px-4 md:px-8 w-full bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 border-b-2 border-white/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter">
            Academic <br /> <span className="text-accent">Background</span>
          </h2>
          <p className="text-muted max-w-sm text-sm uppercase font-bold tracking-widest leading-relaxed">
            Foundations in computer science and engineering principles.
          </p>
        </motion.div>

        <div className="space-y-8">
          {EDUCATION.map((edu, idx) => (
            <EducationCard key={idx} education={edu} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
