"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ProjectItem } from "@/data/projects";

interface Props {
  project: ProjectItem;
  idx: number;
  onClick: () => void;
}

export default function ProjectCard({ project, idx, onClick }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
      onClick={onClick}
      className="group relative h-auto min-h-[500px] cursor-pointer overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-accent/80 transition-all shadow-xl rounded-xl flex flex-col justify-end"
    >
      <img 
        src={project.image} 
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      
      <div className="relative z-10 p-6 flex flex-col justify-end h-full transform group-hover:-translate-y-2 transition-transform duration-500">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-accent bg-black px-2 py-1">
            {project.category === "ai" ? "AI & Agents" : "Full Stack"}
          </span>
        </div>
        <h3 className="text-3xl font-heading font-black uppercase tracking-tighter text-white leading-none mb-3">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-white group-hover:text-accent transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
}
