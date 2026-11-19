"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS = [
  { to: PROJECTS.length, suffix: "", decimals: 0, label: "Projects shipped" },
  { to: 2, suffix: "", decimals: 0, label: "Internships" },
  { to: 8.32, suffix: "", decimals: 2, label: "CGPA" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-28 px-4 md:px-8 w-full bg-black text-white border-t border-white/10 overflow-hidden"
    >
      <div aria-hidden className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full bg-accent/15 blur-[130px]" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 lg:gap-24 items-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-sm lg:max-w-none lg:w-5/12 relative group"
        >
          <motion.div
            aria-hidden
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="absolute top-6 -left-4 sm:-left-6 w-full h-full rounded-3xl bg-accent -z-0 group-hover:top-4 group-hover:-left-3 transition-all duration-500"
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-card aspect-[4/5]">
            <Image
              src="/profile.webp"
              alt="Mukeshkumar Boominathan by the coast"
              fill
              sizes="(max-width: 1024px) 384px, 520px"
              className="object-cover object-[50%_60%] grayscale-[0.35] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="w-full lg:w-7/12 space-y-10"
        >
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">01 — About</p>
            <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter leading-[0.95]">
              Engineering <br /> <span className="text-accent">Trust</span>
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed font-medium max-w-2xl">
              My journey into programming started in college when I got tired of manually renaming hundreds of event
              photos and wrote a python script to do it. That small win opened my eyes to the power of automation and
              backend engineering.
            </p>
            <p className="text-muted text-base md:text-lg leading-relaxed font-medium max-w-2xl">
              During my internship at Prodapt Solutions, I designed a LangGraph platform for claims anomaly analysis.
              Seeing how safety policies and explainable models can make AI agent decisions fully auditable changed the
              way I think about engineering. It&apos;s not just about getting the LLM to output a response; it&apos;s
              about building a system that teams can actually trust.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 sm:p-5 hover:border-accent/70 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-heading font-black text-white">
                  <AnimatedCounter to={s.to} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="mt-1 text-[10px] uppercase font-bold tracking-widest text-muted">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <a
            href="/resume.pdf"
            download="Mukeshkumar_Boominathan_Resume.pdf"
            className="group inline-flex items-center gap-4 border-2 border-white rounded-full px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Download Resume</span>
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
