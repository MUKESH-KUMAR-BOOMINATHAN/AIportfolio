"use client";

import React from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import SkillBar from "@/components/ui/SkillBar";
import { SKILLS } from "@/data/skills";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-8 w-full bg-black text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left / Portrait */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-5/12 relative hidden md:block"
        >
          <div className="absolute top-8 -left-8 w-full h-full bg-accent -z-10" />
          <div className="relative border border-white/20 p-4 bg-black">
            <img 
              src="/profile.jpg" 
              alt="About Mukeshkumar"
              className="w-full h-auto aspect-[4/5] object-cover object-top filter grayscale contrast-125"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </motion.div>

        {/* Right / Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-7/12 space-y-12"
        >
          
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter">
              Engineering <br /> <span className="text-accent">Trust</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed font-medium max-w-2xl">
              My journey into programming started in college when I got tired of manually renaming hundreds of event photos 
              and wrote a python script to do it. That small win opened my eyes to the power of automation and backend engineering.
            </p>
            <p className="text-muted text-lg leading-relaxed font-medium max-w-2xl">
              During my internship at Prodapt Solutions, I designed a LangGraph platform for claims anomaly analysis. 
              Seeing how safety policies and explainable models can make AI agent decisions fully 
              auditable changed the way I think about engineering. It's not just about getting the LLM to output a response; 
              it's about building a system that teams can actually trust.
            </p>
          </div>

          {/* Skill Bars */}
          <div className="space-y-6 max-w-xl">
            {SKILLS.map((skill, idx) => (
              <SkillBar key={idx} skill={skill} idx={idx} />
            ))}
          </div>

          <div className="pt-4">
            <a
              href="/resume.pdf"
              download="Mukeshkumar_Boominathan_Resume.pdf"
              className="inline-flex items-center gap-4 border-2 border-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Download Resume</span>
              <Download className="w-4 h-4" />
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
