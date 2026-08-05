"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import type { ProjectItem } from "@/data/projects";
import ProjectCard from "@/components/ui/cards/ProjectCard";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-8 w-full bg-black text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 border-b-2 border-white/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter">
            Selected <br /> <span className="text-accent">Works</span>
          </h2>
          <p className="text-muted max-w-sm text-sm uppercase font-bold tracking-widest leading-relaxed">
            A showcase of AI architecture, LangGraph orchestration, and full-stack engineering.
          </p>
        </motion.div>

        {/* 3-Column Image-Forward Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard 
              key={idx} 
              project={project} 
              idx={idx} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>

      {/* Architectural Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              className="bg-black/85 backdrop-blur-2xl w-full max-w-4xl max-h-[90vh] border border-white/10 relative z-10 flex flex-col shadow-2xl rounded-xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close button — fixed in top-right, never scrolls away */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 text-muted hover:text-white bg-black/80 backdrop-blur-md border border-white/20 rounded-lg transition-all z-30 hover:scale-110 active:scale-95 hover:border-accent"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable interior */}
              <div className="overflow-y-auto flex flex-col md:flex-row">
                {/* Modal Image */}
                <div className="w-full md:w-2/5 h-64 md:min-h-[400px] relative border-b md:border-b-0 md:border-r border-white/10 overflow-hidden shrink-0">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover filter grayscale hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-accent/20 mix-blend-multiply" />
                </div>

                {/* Modal Content */}
                <div className="w-full md:w-3/5 p-8 md:p-12 space-y-8">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-accent mb-2 block">
                      {selectedProject.category === "ai" ? "AI Architecture" : "Full Stack Dev"}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tighter text-white pr-10">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <p className="text-muted text-sm font-medium leading-relaxed">
                      {selectedProject.longDesc}
                    </p>

                    <div className="border border-white/10 p-6 space-y-4 bg-white/[0.03] backdrop-blur-md rounded-lg">
                      <div>
                        <h4 className="text-xs font-black text-accent uppercase tracking-widest">The Challenge</h4>
                        <p className="text-white/80 text-sm mt-1">{selectedProject.challengeAndSolution.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-accent uppercase tracking-widest">Technical Implementation</h4>
                        <p className="text-white/80 text-sm mt-1">{selectedProject.challengeAndSolution.solution}</p>
                      </div>
                    </div>

                    {selectedProject.architectureFlow && (
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3">Agent Nodes & Flow</h4>
                        <div className="border border-white/10 p-4 font-mono text-[10px] text-muted space-y-2 bg-black/50 uppercase tracking-wider rounded-lg">
                          {selectedProject.architectureFlow.map((flow, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span className="text-accent">{">"}</span>
                              <span>{flow}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((tag, idx) => (
                          <span key={idx} className="text-[10px] px-3 py-1 bg-white/5 border border-white/10 text-white uppercase tracking-wider font-bold rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-xs font-black uppercase tracking-widest rounded-lg hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 group"
                    >
                      <span>View Repository</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
