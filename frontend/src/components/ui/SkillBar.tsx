"use client";

import React from "react";
import { motion } from "framer-motion";
import type { SkillItem } from "@/data/skills";

interface Props {
  skill: SkillItem;
  idx: number;
}

export default function SkillBar({ skill, idx }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white">
        <span>{skill.label}</span>
        <span>{skill.percentage}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 relative overflow-hidden">
        <motion.div 
          initial={{ width: "0%" }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-accent"
        />
      </div>
    </div>
  );
}
