"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerChat = () => {
    window.dispatchEvent(new Event("open-mukesh-ai"));
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "py-4 bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
          : "py-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="font-heading font-black text-white tracking-tighter text-2xl uppercase flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <span>Mukeshkumar</span>
          <span className="text-accent">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="group relative text-xs uppercase tracking-widest font-bold text-muted hover:text-white transition-colors py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
          <button
            onClick={triggerChat}
            className="px-6 py-2.5 bg-accent text-white text-xs uppercase font-bold tracking-widest hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-transparent"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={triggerChat}
            className="text-xs uppercase font-bold text-accent"
          >
            Let's Talk
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black border-b border-glass-border py-4 px-6 space-y-4"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
