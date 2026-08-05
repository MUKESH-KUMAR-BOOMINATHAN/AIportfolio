"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Award } from "lucide-react";
import type { EducationItem } from "@/data/education";

interface Props {
  education: EducationItem;
  idx: number;
}

export default function EducationCard({ education, idx }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
      className="border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-12 hover:border-accent/80 hover:bg-white/[0.05] transition-all shadow-xl rounded-xl flex flex-col justify-between"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-white mb-2 leading-none">
            {education.degree}
          </h3>
          <span className="inline-block text-[10px] uppercase font-black tracking-widest text-black bg-white px-3 py-1">
            Degree
          </span>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 text-muted text-sm font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-accent" />
            <span>{education.institution}</span>
          </div>
          <div className="flex items-center gap-3 text-muted text-sm font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{education.period}</span>
          </div>
          <div className="flex items-center gap-3 text-muted text-sm font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-accent" />
            <span>CGPA: {education.cgpa}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
