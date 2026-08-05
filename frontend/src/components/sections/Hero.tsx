"use client";

import React, { useEffect, useState } from "react";
import { ArrowDownRight, Briefcase } from "lucide-react";
import { motion, Variants } from "framer-motion";
import StatItem from "@/components/ui/StatItem";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerChat = () => {
    window.dispatchEvent(new Event("open-mukesh-ai"));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
    }
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <section id="home" className="relative flex flex-col justify-center overflow-hidden py-12 md:py-16">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-0">
        
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:w-7/12 w-full pt-10 lg:pt-20 z-10"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl lg:text-[7rem] leading-[0.85] font-heading font-black tracking-tighter text-white uppercase"
          >
            AI & <br /> Full Stack <br /> Engineer<span className="text-accent">.</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl text-muted max-w-lg font-medium leading-relaxed"
          >
            I'm a software engineer specializing in robust web applications, 
            RAG pipelines, and multi-agent graphs. Building explainable, 
            production-ready systems that solve real-world problems.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <a
              href="#projects"
              className="group flex items-center gap-4 bg-accent text-white py-4 px-6 uppercase font-bold tracking-widest text-sm hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>View Work</span>
              <div className="bg-black/20 group-hover:bg-black/10 rounded-full p-1 group-hover:-rotate-45 transition-transform duration-300">
                <ArrowDownRight className="w-5 h-5" />
              </div>
            </a>
            <button
              onClick={triggerChat}
              className="group flex items-center gap-4 border border-white/20 text-white py-4 px-6 uppercase font-bold tracking-widest text-sm hover:scale-105 hover:bg-white hover:text-black active:scale-95 transition-all duration-300"
            >
              <Briefcase className="w-5 h-5" />
              <span>Hire Me</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Image/Red Block */}
        <div className="lg:w-5/12 w-full relative h-[500px] lg:h-[750px] lg:-mt-16 flex justify-end">
          {/* Red block full-bleed to right */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[120%] lg:w-[150%] h-full bg-accent -z-10 origin-right" 
          />
          
          <motion.div 
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full h-full p-6 lg:p-10 flex flex-col justify-end lg:justify-center items-center"
          >
            <div className="relative w-full max-w-[360px] aspect-[4/5] overflow-hidden bg-white p-3 md:p-4 shadow-2xl">
              <div className="w-full h-full relative overflow-hidden bg-black/20">
              <img 
                src="/profile.jpg" 
                alt="Mukeshkumar Portrait"
                className="w-full h-full object-cover object-top filter grayscale contrast-125"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </div>
            
            {/* Rotating Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
              className="absolute bottom-4 left-4 lg:bottom-20 lg:-left-12 w-32 h-32 lg:w-40 lg:h-40 bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center border-4 border-accent animate-spin-slow shadow-2xl"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-90" style={{ animation: "spin 10s linear infinite" }}>
                <path id="curve" fill="transparent" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                <text className="text-[11px] font-bold uppercase tracking-widest fill-current">
                  <textPath href="#curve" startOffset="5%">
                    * SOFTWARE ENGINEER * AI ENGINEER *
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Stat Strip Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-white/[0.03] backdrop-blur-md border-t border-white/10 py-8 mt-12 z-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
          <StatItem value="7 Mos" label="Industrial Experience" />
          <StatItem value="7+" label="Projects Completed" />
          <StatItem value="2" label="Internships" />
          <StatItem value="8.32" label="Academic CGPA" />
        </div>
      </motion.div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </section>
  );
}
