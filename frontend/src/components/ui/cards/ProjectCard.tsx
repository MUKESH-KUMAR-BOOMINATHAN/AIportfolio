"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import type { ProjectItem } from "@/data/projects";

interface Props {
  project: ProjectItem;
  idx: number;
  onClick: () => void;
}

export default function ProjectCard({ project, idx, onClick }: Props) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 160, damping: 20 });
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 160, damping: 20 });
  const spot = useMotionTemplate`radial-gradient(380px circle at ${useTransform(mx, (v) => v * 100)}% ${useTransform(
    my,
    (v) => v * 100
  )}%, rgba(232,40,28,0.28), transparent 65%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1200px]"
    >
      <motion.article
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${project.title}`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full min-h-[460px] md:min-h-[520px] cursor-pointer overflow-hidden bg-card border border-white/10 hover:border-accent/80 transition-colors shadow-xl rounded-2xl flex flex-col justify-end"
      >
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover grayscale [@media(hover:none)]:grayscale-0 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20 group-hover:from-black/95 transition-colors duration-500" />
        {/* cursor spotlight */}
        <motion.div
          aria-hidden
          style={{ background: spot }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen"
        />

        {/* corner arrow */}
        <div className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full border border-white/25 bg-black/50 backdrop-blur-md grid place-items-center group-hover:bg-accent group-hover:border-accent group-hover:rotate-45 transition-all duration-300">
          <ArrowUpRight className="w-5 h-5" />
        </div>

        <div className="relative z-10 p-6 md:p-7 flex flex-col justify-end h-full [transform:translateZ(40px)]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[10px] uppercase font-black tracking-widest text-white bg-accent px-2.5 py-1 rounded-full">
              {project.category === "ai" ? "AI & Agents" : "Full Stack"}
            </span>
            <span className="text-[10px] uppercase font-black tracking-widest text-white/70 border border-white/20 px-2.5 py-1 rounded-full">
              {project.year}
            </span>
            {project.video && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-white/90 border border-white/30 px-2.5 py-1 rounded-full">
                <Play className="w-3 h-3 fill-current" /> Demo
              </span>
            )}
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-white leading-[1.05] mb-3">
            {project.title}
          </h3>
          <p className="text-sm text-white/70 leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">{project.shortDesc}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s} className="text-[10px] px-2 py-1 rounded bg-white/10 border border-white/10 text-white/80 uppercase tracking-wider font-bold">
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-[10px] px-2 py-1 text-muted uppercase tracking-wider font-bold">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-accent transition-colors">
            <span>View Details</span>
            <span className="block h-px w-8 bg-current group-hover:w-14 transition-all duration-300" />
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
