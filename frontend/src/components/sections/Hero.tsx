"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Briefcase, Sparkles, MapPin, Terminal } from "lucide-react";

const TITLES = ["Software Engineer", "AI Engineer", "Full Stack Developer"];

function AgentTerminalMockup() {
  const logs = [
    { text: ">>> Initializing claims_investigation_graph..." },
    { text: "[node:intake] Parsing incoming claim data (PDF)..." },
    { text: "[node:retriever] Querying ChromaDB (vector-embedding)..." },
    { text: "  -> Found 3 similar claims (Threshold Cosine >= 0.82)" },
    { text: "[node:classifier] Executing Random Forest model..." },
    { text: "  -> Anomaly Risk Score: 78.4% | SHAP logs generated." },
    { text: "[node:llm_agent] Synthesizing recommendations via Gemini..." },
    { text: "[system] Done. Graph complete. Adjuster alert sent! (1.4s)" },
    { text: ">>> Waiting for new claim inputs..." }
  ];

  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % (logs.length + 1);
        if (nextIndex === 0) {
          setCurrentLogs([]);
          return 0;
        } else {
          setCurrentLogs(logs.slice(0, nextIndex).map(l => l.text));
          return nextIndex;
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full glass-panel rounded-2xl border border-glass-border p-4 shadow-2xl font-mono text-[10px] sm:text-xs text-white/90 overflow-hidden relative flex flex-col h-[290px] bg-black/40">
      {/* Title bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-glass-border">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] opacity-80" />
        </div>
        <span className="text-[10px] text-muted font-semibold uppercase tracking-wider flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5 text-accent-secondary" />
          <span>langgraph_agent.py</span>
        </span>
        <span className="w-8" />
      </div>
      {/* Console lines */}
      <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-left scrollbar-thin scrollbar-thumb-card scrollbar-track-transparent">
        {currentLogs.map((log, idx) => {
          let color = "text-white/80";
          if (log.startsWith(">>>")) color = "text-accent font-bold";
          else if (log.startsWith("[system]")) color = "text-success font-semibold";
          else if (log.startsWith("  ->")) color = "text-accent-secondary font-medium";
          else if (log.includes("[node")) color = "text-purple-400 font-semibold";
          return (
            <div key={idx} className={`${color} leading-relaxed transition-all duration-300`}>
              {log}
            </div>
          );
        })}
        {/* Blinking cursor */}
        <span className="inline-block w-1.5 h-4 bg-accent ml-1 animate-pulse" />
      </div>
    </div>
  );
}

export default function Hero() {
  // Cursor coordinate tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Typing effect logic
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeTitle = TITLES[titleIndex];
    const typingSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && currentText === activeTitle) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? activeTitle.slice(0, currentText.length - 1)
            : activeTitle.slice(0, currentText.length + 1)
        );
      }, typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  const triggerChat = () => {
    window.dispatchEvent(new Event("open-mukesh-ai"));
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden px-4 md:px-8 border-b border-glass-border cursor-default"
      style={{
        background: `radial-gradient(circle 450px at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
      }}
    >
      {/* Background Subtle Mesh / Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Ambient glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-accent-secondary/10 blur-[90px] animate-pulse-slow pointer-events-none" />

      {/* Hero Content Container - Responsive Grid */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
        
        {/* Left Column: Headings & Copy */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-6">
          
          {/* Status Tag */}
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-accent font-semibold border border-accent/20 cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={triggerChat}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
            <span>HireMukeshkumar AI is Online & Ready</span>
          </motion.div>

          {/* Location Tag */}
          <motion.div 
            className="flex items-center gap-1.5 text-xs text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Chennai, Tamil Nadu, India</span>
          </motion.div>

          {/* Main Name Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-white mt-1 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Mukeshkumar <span className="text-gradient-cyan">Boominathan</span>
          </motion.h1>

          {/* Animated Cycling Titles */}
          <motion.div 
            className="h-10 flex items-center justify-center lg:justify-start text-xl sm:text-2xl md:text-3xl font-heading font-medium tracking-wide text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span>I'm a&nbsp;</span>
            <span className="text-accent-secondary border-r-2 border-accent-secondary pr-1 font-bold animate-pulse">
              {currentText}
            </span>
          </motion.div>

          {/* Short Objective */}
          <motion.p 
            className="text-muted text-sm sm:text-base leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            I'm a final-year CS student specialized in engineering robust web applications, 
            RAG pipelines, and multi-agent graphs using LangGraph. I focus on building 
            explainable, production-ready systems that solve real-world problems.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <Briefcase className="w-4 h-4" />
              <span>View Projects</span>
            </a>

            <button
              onClick={triggerChat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-secondary text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/20 border border-white/10 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Chat with HireAI</span>
            </button>

            <a
              href="/resume.pdf"
              download="Mukeshkumar_Boominathan_Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-card border border-glass-border hover:border-accent-secondary/50 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Interactive Terminal Mockup */}
        <motion.div 
          className="lg:col-span-5 w-full hidden lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
        >
          <AgentTerminalMockup />
        </motion.div>

      </div>
    </section>
  );
}
