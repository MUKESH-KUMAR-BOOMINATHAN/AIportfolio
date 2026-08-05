"use client";

import React from "react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black border-t border-white/10 py-8 px-4 md:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted uppercase tracking-widest font-bold">
          © {new Date().getFullYear()} Mukeshkumar Boominathan
        </p>
        <button
          onClick={handleScrollToTop}
          className="text-xs uppercase font-bold text-accent hover:text-white transition-colors"
        >
          Back to Top [^]
        </button>
      </div>
    </footer>
  );
}
