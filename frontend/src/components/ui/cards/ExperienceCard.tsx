"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";
import type { ExperienceItem } from "@/data/experience";

interface Props {
  experience: ExperienceItem;
  idx: number;
}

export default function ExperienceCard({ experience, idx }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
      className="border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-12 hover:border-accent/80 hover:bg-white/[0.05] transition-all shadow-xl rounded-xl"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Left Column: Meta Data */}
        <div className="w-full lg:w-1/3 shrink-0 space-y-6">
          <div>
            <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-white mb-2 leading-none">
              {experience.role}
            </h3>
            <span className="inline-block text-[10px] uppercase font-black tracking-widest text-black bg-white px-3 py-1">
              {experience.type}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted text-sm font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-accent" />
              <span>{experience.company}</span>
            </div>
            <div className="flex items-center gap-3 text-muted text-sm font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center gap-3 text-muted text-sm font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-accent" />
              <span>{experience.period}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Description & Tags */}
        <div className="w-full lg:w-2/3 space-y-8">
          <ul className="space-y-4">
            {experience.description.map((bullet, i) => (
              <li key={i} className="flex gap-4">
                <span className="text-accent font-black mt-1">{"//"}</span>
                <p className="text-muted text-sm leading-relaxed font-medium">
                  {bullet}
                </p>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
            {experience.tech.map((tag, i) => (
              <span key={i} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-black border border-white/20 text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
