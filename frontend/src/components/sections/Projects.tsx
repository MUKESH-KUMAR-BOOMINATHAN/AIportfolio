"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FolderGit2, ExternalLink, Cpu, Info, ChevronRight, X, GitFork, Star } from "lucide-react";

interface Project {
  title: string;
  category: "ai" | "fullstack";
  shortDesc: string;
  longDesc: string;
  stack: string[];
  metrics: string[];
  github: string;
  demo?: string;
  architectureFlow?: string[];
  challengeAndSolution: {
    challenge: string;
    solution: string;
  };
}

const PROJECTS: Project[] = [
  {
    title: "Insurance Claims Investigation Assistant",
    category: "ai",
    shortDesc: "Multi-agent LangGraph platform automating fraud investigation, risk scoring, and hybrid RAG search over claim logs.",
    longDesc: "This advanced claims automation platform orchestrates multiple LLM agents inside a structured LangGraph state machine. Built as a capstone project for Prodapt Solutions, it replicates FDE workflows to intakes claims, detects anomalies, queries historical logs using hybrid keyword + vector indexing, and calculates explainable fraud scores using Random Forest classifiers and SHAP visualizations.",
    stack: ["FastAPI", "React.js", "LangGraph", "ChromaDB", "SQLite", "Python", "Sentence Transformers", "Scikit-Learn", "SHAP", "Pydantic"],
    metrics: ["100% auditable evidence-based reasoning", "Fast API orchestration <500ms latency", "Hybrid RAG semantic + BM25 keyword search"],
    github: "https://github.com/MUKESH-KUMAR-BOOMINATHAN/insurance-claims-agent",
    architectureFlow: [
      "1. Intake Node: Formulates claims structures and runs Pydantic schema validation.",
      "2. Fraud Detection: Triggers Scikit-Learn classifiers and SHAP values computation.",
      "3. Retrieval Node: Performs semantic hybrid search over ChromaDB historical logs.",
      "4. Risk Assessor: Synthesizes embeddings similarity matches and claims history.",
      "5. Recommendations: Formulates explainable advice logs and outputs formatted FastAPI reports."
    ],
    challengeAndSolution: {
      challenge: "Recruiters and adjusters struggle to trust black-box LLM suggestions, requiring clear evidence trails for claim denials.",
      solution: "Integrated Scikit-learn models coupled with SHAP (SHapley Additive exPlanations) values directly inside the LangGraph agent state. The generated output includes a JSON evidence log explaining exactly which variables (e.g. claim frequency, amount anomalies) contributed to the risk score."
    }
  },
  {
    title: "Multi-Agent Customer Support Platform",
    category: "ai",
    shortDesc: "CrewAI and LangGraph multi-agent swarm handling intent classification, semantic policy search, and resolution logic.",
    longDesc: "An AI-powered customer support desk orchestrating specialized, cooperative agents. Powered by CrewAI and FastAPI, it routes incoming tickets, queries enterprise knowledge bases using Retrieval-Augmented Generation, and draft context-grounded email resolutions with complete reasoning traces.",
    stack: ["Python", "FastAPI", "LangGraph", "CrewAI", "ChromaDB", "Gemini API", "Vector Databases", "REST APIs"],
    metrics: ["Auto-routing tickets to correct specialized sub-agent", "Zero-hallucination guardrails via RAG policy verification", "Full auditability logs for developer inspect"],
    github: "https://github.com/MUKESH-KUMAR-BOOMINATHAN/multi-agent-support",
    architectureFlow: [
      "1. Intent Router Agent: Analyzes user query and routes to the policy agent.",
      "2. Policy Retriever (RAG): Queries ChromaDB for company policy rules.",
      "3. Decision Drafting Agent: Synthesizes policies to draft resolution suggestions.",
      "4. Quality Assurance Agent: Compares drafts against safety guardrails before finalizing."
    ],
    challengeAndSolution: {
      challenge: "Preventing generic LLM suggestions that violate company support policies.",
      solution: "Implemented an isolated RAG verification layer. Before the response agent writes the final ticket solution, the CrewAI QA Agent checks it against the raw policy chunks retrieved from ChromaDB, failing the draft if it diverges from policy."
    }
  },
  {
    title: "Netflix Cloud Streaming Clone",
    category: "fullstack",
    shortDesc: "MERN Stack streaming platform with secure authentication, content browsing databases, and responsive CSS UI.",
    longDesc: "A production-styled streaming media portal built on the MongoDB, Express, React, and Node (MERN) stack. It implements JWT token security, cookies authorization, REST API content management, and an adaptive styling design resembling Netflix, optimized for cross-browser responsive layouts.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "MUI", "JWT Auth", "REST APIs", "Git"],
    metrics: ["Fully-secure Cookie based token authentication", "Adaptive movie dashboard and content filter grids", "REST APIs managing movies CRUD"],
    github: "https://github.com/MUKESH-KUMAR-BOOMINATHAN/netflix-clone",
    challengeAndSolution: {
      challenge: "Building a fluid, media-heavy content page that behaves responsively across mobile, tablets, and wide-aspect monitors.",
      solution: "Created responsive grid controllers using React and styled components, combined with pre-cached media links to provide smooth animations and minimal layout shift during image loading."
    }
  }
];

// 3D tilt project card component
function ProjectCard({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  const x = useMotionValue(175);
  const y = useMotionValue(125);

  const rotateX = useTransform(y, [0, 250], [10, -10]);
  const rotateY = useTransform(x, [0, 350], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(175);
    y.set(125);
  }

  return (
    <motion.div
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className="glass-panel rounded-2xl p-6 border-glass-border hover:border-accent/40 transition-colors flex flex-col justify-between glow-card relative cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(project)}
    >
      <div style={{ transform: "translateZ(30px)" }} className="space-y-4">
        {/* Category Icon tag */}
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase font-bold tracking-wider text-accent-secondary bg-accent-secondary/15 px-2.5 py-1 rounded-full border border-accent-secondary/20">
            {project.category === "ai" ? "AI & Agents" : "Full Stack"}
          </span>
          
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg bg-card border border-glass-border text-muted hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-bold text-white line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted text-xs md:text-sm leading-relaxed line-clamp-3">
          {project.shortDesc}
        </p>

        {/* Metrics highlights */}
        <div className="space-y-1.5 pt-2">
          {project.metrics.slice(0, 2).map((m, mIdx) => (
            <div key={mIdx} className="flex items-center gap-1.5 text-xs text-accent-secondary font-medium">
              <Cpu className="w-3 h-3 text-accent shrink-0" />
              <span className="line-clamp-1">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer actions */}
      <div style={{ transform: "translateZ(20px)" }} className="pt-6 mt-6 border-t border-glass-border flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
          }}
          className="inline-flex items-center gap-1 text-xs text-white/90 hover:text-accent font-semibold transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>View Details</span>
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </button>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span>Source</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "ai" | "fullstack">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full border-b border-glass-border">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white tracking-wide">
            Featured Projects
          </h2>
          <div className="h-[1px] bg-glass-border w-24 hidden md:block" />
        </div>

        {/* Project Category Filters */}
        <div className="flex bg-card p-1 rounded-xl border border-glass-border self-start">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              filter === "all" ? "bg-accent text-white" : "text-muted hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("ai")}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              filter === "ai" ? "bg-accent text-white" : "text-muted hover:text-white"
            }`}
          >
            AI & Agents
          </button>
          <button
            onClick={() => setFilter("fullstack")}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              filter === "fullstack" ? "bg-accent text-white" : "text-muted hover:text-white"
            }`}
          >
            Full Stack
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} onSelect={setSelectedProject} />
          ))}
        </AnimatePresence>
      </div>

      {/* Architectural Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              className="glass-panel rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto flex flex-col p-6 border-glass-border shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-accent-secondary">
                    {selectedProject.category === "ai" ? "AI & Agent Architecture" : "Full Stack Architecture"}
                  </span>
                  <h3 className="text-xl md:text-2xl font-heading font-extrabold text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-muted text-sm leading-relaxed">
                    {selectedProject.longDesc}
                  </p>

                  {/* Challenge & Solution box */}
                  <div className="p-4 rounded-xl bg-card border border-glass-border space-y-2">
                    <h4 className="text-xs font-bold text-accent uppercase tracking-wider">The Engineering Challenge</h4>
                    <p className="text-muted text-xs leading-relaxed">{selectedProject.challengeAndSolution.challenge}</p>
                    <h4 className="text-xs font-bold text-accent-secondary uppercase tracking-wider pt-2">Technical Implementation</h4>
                    <p className="text-muted text-xs leading-relaxed">{selectedProject.challengeAndSolution.solution}</p>
                  </div>

                  {/* Agent Flow Diagram */}
                  {selectedProject.architectureFlow && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">LangGraph Agent Nodes & State Transitions</h4>
                      <div className="p-4 rounded-xl bg-black/40 border border-glass-border font-mono text-xs text-accent-secondary/90 space-y-1.5 leading-relaxed">
                        {selectedProject.architectureFlow.map((flow, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-1">
                            <span className="text-accent">{">"}</span>
                            <span>{flow}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Integrated Technologies</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.stack.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-card border border-glass-border text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer links */}
                <div className="flex justify-end gap-3 pt-6 border-t border-glass-border">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 rounded-xl bg-card hover:bg-card/85 text-xs text-white border border-glass-border transition-colors cursor-pointer"
                  >
                    Close Details
                  </button>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-secondary text-xs text-white font-semibold transition-all inline-flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
