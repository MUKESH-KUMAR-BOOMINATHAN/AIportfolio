"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Code2, 
  Database, 
  Cpu, 
  Layout, 
  Hammer, 
  Milestone, 
  Sparkles
} from "lucide-react";

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  skills: string[];
}

const AI_SKILLS = [
  "LangGraph Orchestration",
  "CrewAI Multi-Agents",
  "Retrieval-Augmented Generation (RAG)",
  "ChromaDB Vector DB",
  "Prompt Engineering",
  "Semantic + Hybrid Search (BM25)",
  "Explainable AI (SHAP)",
  "Agent Workflow Intake & Routing",
  "Scikit-learn / Pandas / NumPy"
];

const TECHNICAL_SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    icon: <Code2 className="w-4 h-4 text-accent" />,
    skills: ["Python", "Java", "JavaScript", "TypeScript", "C", "SQL"]
  },
  {
    category: "Frontend Web",
    icon: <Layout className="w-4 h-4 text-accent-secondary" />,
    skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI"]
  },
  {
    category: "Backend & APIs",
    icon: <Cpu className="w-4 h-4 text-[#A78BFA]" />,
    skills: ["FastAPI", "Node.js", "Express.js", "Django", "REST APIs", "SQLAlchemy"]
  },
  {
    category: "Databases",
    icon: <Database className="w-4 h-4 text-[#F59E0B]" />,
    skills: ["ChromaDB", "MongoDB", "SQLite", "MySQL"]
  },
  {
    category: "Tools & Platforms",
    icon: <Hammer className="w-4 h-4 text-[#EC4899]" />,
    skills: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "AWS (basics)"]
  },
  {
    category: "CS Fundamentals",
    icon: <Milestone className="w-4 h-4 text-[#10B981]" />,
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "System Design", "Agile SDLC"]
  }
];

// Snapping spring physics configurations for tags
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
} as const;

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 350, 
      damping: 18 
    } 
  }
} as const;

export default function Skills() {
  const [activeTab, setActiveTab] = useState<"ai" | "tech">("ai");

  return (
    <section id="skills" className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full border-b border-glass-border">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent">
            <Brain className="w-5 h-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white tracking-wide">
            Skills & Expertise
          </h2>
          <div className="h-[1px] bg-glass-border w-24 hidden md:block" />
        </div>

        {/* Tab Selectors */}
        <div className="flex bg-card p-1 rounded-xl border border-glass-border self-start">
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "ai"
                ? "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-md shadow-accent/15"
                : "text-muted hover:text-white"
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>AI & Agent Engineering</span>
          </button>
          <button
            onClick={() => setActiveTab("tech")}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "tech"
                ? "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-md shadow-accent/15"
                : "text-muted hover:text-white"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Full-Stack & CS Core</span>
          </button>
        </div>
      </div>

      {/* Skills Display Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "ai" ? (
            <motion.div
              key="ai-panel"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={gridVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Left Column: Narrative & Focus details */}
              <div className="glass-panel h-full rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between border border-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/25 text-xs font-semibold uppercase">
                    Core Specialization
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-extrabold text-white">
                    Agent Orchestration & Hybrid RAG Architectures
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    I specialize in constructing structured agent graphs using LangGraph and CrewAI. 
                    During my capstone project at Prodapt Solutions, I engineered multi-step agents handling 
                    claims investigation by orchestrating classification, vector retrieval, and fraud analysis.
                  </p>
                  <p className="text-muted text-sm leading-relaxed">
                    I design vector storage indexing combining semantic embeddings search (ChromaDB) 
                    and keyword lookup algorithms to prevent hallucinations. My pipelines incorporate Scikit-learn 
                    Random Forest models linked with SHAP for explainability, giving teams clear, auditable audit trails.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-glass-border flex items-center gap-3 text-xs text-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                  <span>Actively building LLM-agent microservices and FastAPI endpoints</span>
                </div>
              </div>

              {/* Right Column: AI Skills Grid */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={gridVariants}
              >
                {AI_SKILLS.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-panel h-full rounded-xl p-4 flex items-center justify-between border border-glass-border hover:border-accent-secondary/40 transition-colors glow-card cursor-default"
                    variants={tagVariants}
                    whileHover={{ scale: 1.03, y: -2 }}
                  >
                    <span className="text-sm font-semibold text-white">{skill}</span>
                    <Brain className="w-4 h-4 text-accent-secondary shrink-0 ml-2" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="tech-panel"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={gridVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {TECHNICAL_SKILLS.map((group, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel h-full rounded-2xl p-5 border border-glass-border hover:border-accent/30 transition-colors flex flex-col justify-between"
                  variants={tagVariants}
                  whileHover={{ y: -3 }}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-card border border-glass-border">
                        {group.icon}
                      </div>
                      <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                        {group.category}
                      </h3>
                    </div>
                    {/* Skills list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {group.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-card/40 border border-glass-border text-white/80 hover:text-white transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
