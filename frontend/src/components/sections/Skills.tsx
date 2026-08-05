"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { DETAILED_SKILLS } from "@/data/detailedSkills";
import { Code2, LayoutTemplate, Server, Cpu, Database, Wrench } from "lucide-react";

const icons = [Code2, LayoutTemplate, Server, Cpu, Database, Wrench];

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="skills" className="w-full bg-black text-white py-16 md:py-24 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 border-b-2 border-white/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter">
            Technical <br /> <span className="text-accent">Arsenal</span>
          </h2>
          <p className="text-muted max-w-sm text-sm uppercase font-bold tracking-widest leading-relaxed">
            A comprehensive breakdown of my engineering capabilities and tools.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {DETAILED_SKILLS.map((category, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 hover:border-accent/80 shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-black group-hover:bg-accent transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-black uppercase tracking-wide">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1.5 bg-black border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
