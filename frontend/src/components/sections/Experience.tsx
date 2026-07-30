"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, MapPin, CheckCircle2 } from "lucide-react";

interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  details: string[];
  skills: string[];
}

const EXPERIENCES: Job[] = [
  {
    company: "Prodapt Solutions Pvt. Ltd.",
    role: "Software Engineering Intern (FDE Track)",
    location: "Chennai, Tamil Nadu, India",
    period: "Feb 2026 – June 2026",
    details: [
      "Completed intensive corporate training in Python, SQL, OOP, and software engineering best practices as part of an FDE (Forward Deployed Engineer) track.",
      "Built an LLM-powered Insurance Claims Investigation Platform (capstone project) using Python, FastAPI, LangGraph, ChromaDB, and SQLite to automate claims analysis.",
      "Designed a multi-step LangGraph agent workflow orchestrating intake, fraud-risk assessment, similar-claim semantic lookup, and explainable AI recommendation logs.",
      "Built a hybrid RAG pipeline using Sentence Transformers embeddings in ChromaDB, combining semantic and keyword (BM25) search for historical claim retrieval.",
      "Integrated a Scikit-learn Random Forest model with SHAP explainability into the LLM workflow to generate evidence-based, auditable decisions.",
      "Architected REST APIs (FastAPI, Pydantic, SQLAlchemy) to orchestrate LLM agent calls, claim CRUD operations, and report generation, following Git workflows."
    ],
    skills: ["Python", "FastAPI", "LangGraph", "ChromaDB", "SQLite", "RAG", "Scikit-Learn", "SHAP", "REST APIs", "SQLAlchemy", "Git", "Agile"]
  },
  {
    company: "CurrentEdge Systems Pvt. Ltd.",
    role: "Web Development Intern",
    location: "Bangalore, Karnataka, India",
    period: "May 2025 – June 2025",
    details: [
      "Developed backend API modules and services using Node.js and Express.js for enterprise web applications.",
      "Engineered adaptive frontend interfaces and product views using Next.js and Material UI, deployed directly to production.",
      "Architected, tested, and documented robust REST APIs using Postman.",
      "Utilized Git within Agile workflows for production-ready feature delivery and pull request reviews."
    ],
    skills: ["Node.js", "Express.js", "Next.js", "Material UI", "REST APIs", "Postman", "Git", "Agile"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 md:px-8 max-w-5xl mx-auto w-full border-b border-glass-border">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-16">
        <div className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent">
          <Briefcase className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white tracking-wide">
          Work Experience
        </h2>
        <div className="h-[1px] bg-glass-border flex-1 ml-4" />
      </div>

      {/* Experience Timeline */}
      <div className="relative border-l-2 border-glass-border ml-4 md:ml-6 pl-6 md:pl-10 space-y-16">
        {EXPERIENCES.map((job, idx) => (
          <motion.div
            key={idx}
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            {/* Timeline dot */}
            <span className="absolute -left-[45px] md:-left-[53px] top-1.5 w-6 h-6 rounded-full bg-background border-4 border-accent flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
            </span>

            {/* Experience Panel */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 glow-card relative space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-white flex items-center gap-2">
                    {job.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs md:text-sm text-muted">
                    <span className="flex items-center gap-1.5 font-semibold text-accent-secondary">
                      <Building2 className="w-4 h-4 text-accent" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                  </div>
                </div>
                
                {/* Date Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-glass-border text-xs text-white font-medium self-start md:self-center">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span>{job.period}</span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3.5 text-sm text-muted leading-relaxed">
                {job.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="pt-4 border-t border-glass-border">
                <p className="text-[10px] uppercase tracking-wider text-muted mb-2 font-semibold">Technologies Utilized:</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-card/60 border border-glass-border text-white hover:border-accent-secondary/50 hover:bg-card transition-colors select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
