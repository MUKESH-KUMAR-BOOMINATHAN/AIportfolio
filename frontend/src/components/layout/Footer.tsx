"use client";

import React from "react";
import { Sparkles, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#03050f] border-t border-glass-border py-12 px-4 md:px-8 mt-auto z-10 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand signatures */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a
            href="#"
            className="font-heading font-extrabold text-white tracking-wide flex items-center gap-1.5"
          >
            <span>Mukeshkumar Boominathan</span>
          </a>
          <p className="text-xs text-muted text-center md:text-left leading-relaxed">
            Software Engineer · AI Engineer · Full Stack Developer
          </p>
        </div>

        {/* Middle Side: Tag indicating tech framework stack */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card border border-glass-border text-[10px] text-muted font-mono tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span>Next.js + FastAPI + Gemini RAG</span>
        </div>

        {/* Right Side: Navigation & Scroll Top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/MUKESH-KUMAR-BOOMINATHAN"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors"
            title="GitHub"
          >
            {/* Inline Github SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/mukesh-kumar-b-b57122270"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors"
            title="LinkedIn"
          >
            {/* Inline Linkedin SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="mailto:mukeshkumarb107@gmail.com"
            className="text-muted hover:text-white transition-colors"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          
          <div className="h-6 w-[1px] bg-glass-border mx-1" />

          {/* Back to top button */}
          <button
            onClick={handleScrollToTop}
            className="p-2.5 rounded-xl bg-card border border-glass-border text-muted hover:text-white hover:border-accent transition-all cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-glass-border/40 text-center text-[10px] text-muted/65">
        <p>© {new Date().getFullYear()} Mukeshkumar Boominathan. All Rights Reserved. Built with strict production standards.</p>
      </div>
    </footer>
  );
}
