"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownRight, Briefcase, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import {
  motion,
  Variants,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const ROLES = ["AI Engineer", "Full Stack Developer", "RAG & Agent Builder", "Problem Solver"];

/** Types and deletes through ROLES forever. Static text for reduced-motion users. */
function Typewriter() {
  const reduce = useReducedMotion();
  const [text, setText] = useState(ROLES[0]);

  useEffect(() => {
    if (reduce) return;
    let role = 0;
    let char = 0;
    let deleting = true; // first word is already shown in full, so start by erasing it
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = ROLES[role];
      char += deleting ? -1 : 1;
      setText(full.slice(0, char));
      let delay = deleting ? 35 : 75;
      if (!deleting && char === full.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && char === 0) {
        deleting = false;
        role = (role + 1) % ROLES.length;
        delay = 350;
      }
      t = setTimeout(tick, delay);
    };
    char = ROLES[0].length;
    t = setTimeout(tick, 1800);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <span className="text-white" aria-label={ROLES.join(", ")}>
      {text}
      <span className="inline-block w-[2px] h-[1em] -mb-[0.15em] ml-1 bg-accent animate-pulse" />
    </span>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/** Each headline word slides up out of its own mask. */
function RevealWord({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        variants={{
          hidden: { y: "110%" },
          visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
        }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

const CHIPS = [
  { label: "LangGraph", className: "top-[8%] -left-2 lg:-left-14", delay: 0 },
  { label: "FastAPI", className: "top-[34%] -right-2 lg:-right-10", delay: 1.2 },
  { label: "Next.js", className: "bottom-[22%] -right-2 lg:-right-6", delay: 2.2 },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll parallax: portrait drifts slower than text, glow drifts up.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse tilt on the portrait.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 140, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const triggerChat = () => window.dispatchEvent(new Event("open-mukesh-ai"));

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16 md:pt-28"
    >
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[620px] h-[620px] rounded-full bg-accent/40 blur-[140px]"
      />
      <div aria-hidden className="absolute bottom-0 -left-40 w-[420px] h-[420px] rounded-full bg-accent-secondary/10 blur-[130px]" />

      <div className="relative max-w-7xl mx-auto w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-14 lg:gap-8">
        {/* Left */}
        <motion.div
          style={{ y: textY, opacity: fade }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 z-10 order-2 lg:order-1"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-[11px] font-bold uppercase tracking-widest text-white/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to opportunities
            <span className="hidden sm:flex items-center gap-1 text-muted">
              <MapPin className="w-3 h-3" /> Chennai, IN
            </span>
          </motion.div>

          <motion.h1
            variants={containerVariants}
            className="mt-8 text-[3.4rem] sm:text-7xl lg:text-[6.5rem] leading-[0.88] font-heading font-black tracking-tighter text-white uppercase"
          >
            <RevealWord>Mukesh</RevealWord>
            <RevealWord>
              <span className="text-gradient">Kumar</span>
              <span className="text-accent">.</span>
            </RevealWord>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-2xl md:text-3xl font-heading font-bold text-accent min-h-[2.4rem]"
          >
            <Typewriter />
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base md:text-lg text-muted max-w-xl font-medium leading-relaxed"
          >
            I build robust web apps, RAG pipelines and multi-agent graphs — explainable,
            production-ready systems that solve real-world problems.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group relative flex items-center gap-4 bg-accent text-white py-4 px-7 rounded-full uppercase font-bold tracking-widest text-sm overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_10px_40px_-10px_var(--accent)]"
            >
              <span>View Work</span>
              <span className="bg-black/20 rounded-full p-1 group-hover:-rotate-45 transition-transform duration-300">
                <ArrowDownRight className="w-5 h-5" />
              </span>
            </a>
            <button
              onClick={triggerChat}
              className="group flex items-center gap-3 border border-white/25 text-white py-4 px-7 rounded-full uppercase font-bold tracking-widest text-sm hover:scale-105 hover:bg-white hover:text-black active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Briefcase className="w-5 h-5" />
              <span>Hire Me</span>
            </button>
            <div className="flex items-center gap-2 ml-1">
              <a
                href="https://github.com/MUKESH-KUMAR-BOOMINATHAN"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-full border border-white/15 text-white/80 hover:text-accent hover:border-accent hover:-translate-y-1 transition-all"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/mukesh-kumar-b-b57122270"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-full border border-white/15 text-white/80 hover:text-accent hover:border-accent hover:-translate-y-1 transition-all"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          style={{ y: imgY }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px] [perspective:1100px]"
          >
            {/* Offset red frame */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute inset-0 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 rounded-3xl bg-accent"
            />
            {/* Spinning dashed ring */}
            <div
              aria-hidden
              className="absolute -inset-5 rounded-[2rem] border border-dashed border-white/20 animate-spin-slow [animation-duration:40s]"
            />

            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/20 bg-card shadow-2xl"
            >
              <Image
                src="/profile.jpg"
                alt="Mukeshkumar Boominathan standing by the sea in a brown blazer"
                fill
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
                className="object-cover object-[50%_35%] scale-105 hover:scale-110 transition-transform duration-[1200ms] ease-out"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="font-heading font-black text-lg uppercase tracking-tight leading-none">
                    Mukeshkumar B.
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-white/70 mt-1 font-bold">
                    AI &amp; Full Stack
                  </p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-accent px-2.5 py-1 rounded-full">
                  2026
                </span>
              </div>
            </motion.div>

            {/* Floating tech chips */}
            {CHIPS.map((c) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + c.delay * 0.15, type: "spring", stiffness: 200 }}
                className={`absolute ${c.className} z-20`}
              >
                <div
                  className="animate-float px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-black uppercase tracking-widest shadow-xl"
                  style={{ animationDelay: `${c.delay}s` }}
                >
                  <span className="text-accent mr-1.5">●</span>
                  {c.label}
                </div>
              </motion.div>
            ))}

            {/* Rotating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.7, type: "spring" }}
              className="absolute -bottom-8 -left-6 lg:-left-14 w-28 h-28 lg:w-36 lg:h-36 bg-black/85 backdrop-blur-md rounded-full border-4 border-accent shadow-2xl z-20 hidden sm:block"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow [animation-duration:12s]">
                <path id="hero-curve" fill="transparent" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                <text className="text-[10.5px] font-bold uppercase tracking-[0.18em] fill-white">
                  <textPath href="#hero-curve">• Software Engineer • AI Engineer</textPath>
                </text>
              </svg>
              <span className="absolute inset-0 grid place-items-center text-accent text-2xl font-black">✦</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted hover:text-white transition-colors"
      >
        Scroll
        <span className="relative block w-[1px] h-10 bg-white/20 overflow-hidden">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent"
          />
        </span>
      </motion.a>
    </section>
  );
}
