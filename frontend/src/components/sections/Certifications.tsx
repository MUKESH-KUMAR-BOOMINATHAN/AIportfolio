"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ShieldCheck } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

const CERTIFICATIONS: Certificate[] = [
  {
    title: "AI in IT Industry and its Future Prospects",
    issuer: "SRM Valliammai Engineering College (VEC)",
    year: "2024",
    description: "Participated in an industry-guided seminar focusing on LLMs scaling vectors, cloud-compute trends, and vector database structures utilized in modern enterprise workflows."
  },
  {
    title: "MERN Full Stack Beginner Guide",
    issuer: "SRM Valliammai Engineering College (VEC)",
    year: "2025",
    description: "Completed intensive technical coursework covering MongoDB collections indexing, Express.js server frameworks, React client-side hooks, and Node.js REST API modules."
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 md:px-8 max-w-5xl mx-auto w-full border-b border-glass-border">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent">
          <Award className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white tracking-wide">
          Certifications
        </h2>
        <div className="h-[1px] bg-glass-border flex-1 ml-4" />
      </div>

      {/* Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div
            key={idx}
            className="glass-panel rounded-2xl p-6 border-glass-border hover:border-accent/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/10 transition-colors" />

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-white text-base leading-snug group-hover:text-accent transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-accent-secondary font-semibold">{cert.issuer}</p>
                </div>
                
                {/* Shield Check logo */}
                <div className="p-2 rounded-xl bg-card border border-glass-border text-accent shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <p className="text-muted text-xs md:text-sm leading-relaxed">
                {cert.description}
              </p>
            </div>

            {/* Date Issuer details */}
            <div className="mt-6 pt-4 border-t border-glass-border flex items-center justify-between text-[11px] text-muted">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Issued in {cert.year}</span>
              </span>
              <span className="font-semibold uppercase tracking-wider text-[9px] text-white/50">Verified Credential</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
