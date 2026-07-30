"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Sparkles,
  BookOpen
} from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  } as const;

  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full border-b border-glass-border">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent">
          <User className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white tracking-wide">
          About Me
        </h2>
        <div className="h-[1px] bg-glass-border flex-1 ml-4" />
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Left Column: Big Narrative Card */}
        <motion.div 
          className="lg:col-span-2 glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-between glow-card relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-accent-secondary text-xs uppercase tracking-wider font-semibold">
              <Sparkles className="w-4 h-4 text-accent-secondary" />
              <span>Career Objective & Mindset</span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight">
              I love solving hard engineering problems by combining robust code with intelligent AI agents.
            </h3>
            
            <p className="text-muted text-sm md:text-base leading-relaxed">
              My journey into programming started in college when I got tired of manually renaming hundreds of event photos 
              and wrote a python script to do it. That small win opened my eyes to the power of automation and backend engineering. 
              Since then, I've focused on building scalable APIs and orchestrating multi-agent systems.
            </p>
            
            <p className="text-muted text-sm md:text-base leading-relaxed">
              During my internship at Prodapt Solutions, I got to design a LangGraph platform for claims anomaly analysis. 
              Seeing how safety policies and explainable models (like Random Forests with SHAP logs) can make AI agent decisions fully 
              auditable changed the way I think about engineering. For me, it's not just about getting the LLM to output a response; 
              it's about building a system that teams can actually trust.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 mt-8 border-t border-glass-border">
            <div className="space-y-1">
              <p className="text-xs text-muted">Cumulative CGPA</p>
              <h4 className="text-xl font-heading font-extrabold text-white">8.32 / 10</h4>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted">Field of Study</p>
              <h4 className="text-sm font-heading font-bold text-white">B.E. Computer Science</h4>
            </div>
            <div className="space-y-1 col-span-2 md:col-span-1">
              <p className="text-xs text-muted">Location</p>
              <h4 className="text-sm font-heading font-bold text-white">Chennai, TN, India</h4>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact & Academic Dashboard */}
        <div className="space-y-6">
          
          {/* Contact Details Card */}
          <motion.div 
            className="glass-panel rounded-2xl p-6 space-y-4 border border-glass-border hover:border-accent/30 transition-colors"
            variants={itemVariants}
          >
            <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">Contact Info</h4>
            
            <div className="space-y-3.5">
              <a 
                href="mailto:mukeshkumarb107@gmail.com" 
                className="flex items-center gap-3 text-sm text-muted hover:text-white transition-colors"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-glass-border">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <span>mukeshkumarb107@gmail.com</span>
              </a>
              
              <a 
                href="tel:+918680834741" 
                className="flex items-center gap-3 text-sm text-muted hover:text-white transition-colors"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-glass-border">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <span>+91 8680834741</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-muted">
                <div className="p-2 rounded-lg bg-white/5 border border-glass-border">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-glass-border">
              <a
                href="https://www.linkedin.com/in/mukesh-kumar-b-b57122270"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-card border border-glass-border hover:border-accent/40 text-xs text-muted hover:text-white transition-all font-semibold"
              >
                {/* Inline LinkedIn SVG */}
                <svg className="w-4 h-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/MUKESH-KUMAR-BOOMINATHAN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-card border border-glass-border hover:border-accent/40 text-xs text-muted hover:text-white transition-all font-semibold"
              >
                {/* Inline GitHub SVG */}
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>

          {/* Education Snippet Card */}
          <motion.div 
            className="glass-panel rounded-2xl p-6 space-y-4 border border-glass-border hover:border-accent-secondary/30 transition-colors relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent-secondary/5 rounded-full blur-xl pointer-events-none" />
            <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-accent-secondary" />
              <span>Current Education</span>
            </h4>
            
            <div className="space-y-1">
              <h5 className="text-sm font-bold text-white">SRM Valliammai Engineering College</h5>
              <p className="text-xs text-accent-secondary font-medium">Oct 2022 – May 2026</p>
              <p className="text-xs text-muted leading-relaxed pt-1">
                Bachelor of Engineering in Computer Science and Engineering. Currently in final year, 
                specializing in AI engineering and system design.
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
