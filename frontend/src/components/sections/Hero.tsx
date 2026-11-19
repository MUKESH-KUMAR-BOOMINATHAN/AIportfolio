"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownRight, Briefcase } from "lucide-react";
import {
  motion,
  Variants,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const ROLES = ["AI Engineer", "Full Stack Developer", "RAG & Agent Builder", "Problem Solver"];
const GIANT = "MUKESH".split("");

/** Types and deletes through ROLES forever. Static text for reduced-motion users. */
function Typewriter() {
  const reduce = useReducedMotion();
  const [text, setText] = useState(ROLES[0]);

  useEffect(() => {
    if (reduce) return;
    let role = 0;
    let char = ROLES[0].length;
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.9 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const CHIPS = [
  { label: "LangGraph", className: "top-[36%] left-[2%] md:left-[12%] lg:left-[18%]", delay: 0 },
  { label: "FastAPI", className: "top-[48%] right-[1%] md:right-[12%] lg:right-[22%]", delay: 1.2 },
  { label: "Next.js", className: "top-[60%] left-[8%] md:left-[16%] lg:left-[24%] hidden sm:block", delay: 2.2 },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll: the person rises slightly faster than the type, and the whole stage fades out.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const personScrollY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const titleScrollY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Mouse: two depth layers shift in opposite directions.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 18 });
  const smy = useSpring(my, { stiffness: 70, damping: 18 });
  const titleX = useTransform(smx, [-0.5, 0.5], [reduce ? 0 : 28, reduce ? 0 : -28]);
  const titleY = useTransform(smy, [-0.5, 0.5], [reduce ? 0 : 10, reduce ? 0 : -10]);
  const personX = useTransform(smx, [-0.5, 0.5], [reduce ? 0 : -16, reduce ? 0 : 16]);
  const personY = useTransform(smy, [-0.5, 0.5], [reduce ? 0 : -6, reduce ? 0 : 6]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const triggerChat = () => window.dispatchEvent(new Event("open-mukesh-ai"));

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={onMove}
      className="relative min-h-[100svh] overflow-hidden pt-20 md:pt-24"
    >
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[640px] h-[640px] max-w-[120vw] rounded-full bg-accent/30 blur-[150px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* ============ STAGE: type behind, person in front ============ */}
        <motion.div
          style={{ opacity: fade }}
          className="relative h-[72svh] min-h-[520px] lg:h-[calc(100svh-6rem)] lg:min-h-[640px]"
        >
          {/* Top-left tagline */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="absolute top-2 left-0 z-20 max-w-[55%]"
          >
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-white/80 leading-relaxed">
              AI &amp; Full Stack
              <br />
              Engineer
              <br />
              <span className="inline-block mt-2 w-8 h-px bg-accent" />
            </p>
            <p className="mt-3 text-base sm:text-xl font-heading font-bold min-h-[1.8rem]">
              <Typewriter />
            </p>
          </motion.div>

          {/* Top-right status */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="absolute top-2 right-0 z-20 text-right"
          >
            <p className="flex items-center justify-end gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-white/80 leading-relaxed">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to
            </p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-white/80">Opportunities</p>
            <p className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-muted">
              Chennai · 2026
            </p>
          </motion.div>

          {/* LAYER 1 — giant name */}
          <motion.h1
            aria-label="Mukesh Kumar"
            style={{ x: titleX, y: reduce ? 0 : titleY }}
            className="absolute inset-x-0 top-[26%] sm:top-[20%] lg:top-[12%] z-0 flex justify-center select-none pointer-events-none"
          >
            <motion.span
              style={{ y: titleScrollY }}
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.07, delayChildren: 0.15 }}
              className="flex font-heading font-black uppercase leading-[0.8] tracking-tighter text-accent text-[22.5vw] md:text-[clamp(8rem,20vw,20rem)]"
            >
              {GIANT.map((ch, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    aria-hidden
                    variants={{
                      hidden: { y: "105%" },
                      visible: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="block"
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </motion.h1>

          {/* LAYER 2 — person cutout */}
          <motion.div
            style={{ x: personX, y: reduce ? 0 : personY }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-[66%] sm:h-[78%] lg:h-[88%] aspect-[6/5]"
          >
            <motion.div style={{ y: personScrollY }} className="relative w-full h-full">
              <motion.div
                initial={{ opacity: 0, y: 70, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src="/profile-bust-v2.webp"
                  alt="Portrait of Mukeshkumar Boominathan"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(232,40,28,0.35)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating tech chips */}
          {CHIPS.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + c.delay * 0.15, type: "spring", stiffness: 200 }}
              className={`absolute ${c.className} z-20`}
            >
              <div
                className="animate-float px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-xl"
                style={{ animationDelay: `${c.delay}s` }}
              >
                <span className="text-accent mr-1.5">●</span>
                {c.label}
              </div>
            </motion.div>
          ))}

          {/* Rotating badge (desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.4, duration: 0.7, type: "spring" }}
            className="hidden lg:block absolute right-[7%] top-[56%] w-28 h-28 bg-black/80 backdrop-blur-md rounded-full border-2 border-accent shadow-2xl z-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow [animation-duration:12s]">
              <path id="hero-curve" fill="transparent" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              <text className="text-[10px] font-bold uppercase fill-white">
                <textPath href="#hero-curve" textLength="236" lengthAdjust="spacing">
                  • AI Engineer • Full Stack •
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center text-accent text-2xl font-black">✦</span>
          </motion.div>
        </motion.div>

        {/* ============ Copy + CTAs (below on mobile, overlaid bottom-left on desktop) ============ */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="relative z-20 mt-2 pb-14 lg:mt-0 lg:pb-0 lg:absolute lg:bottom-10 lg:left-8 lg:max-w-sm"
        >
          <p className="text-sm md:text-base text-muted font-medium leading-relaxed">
            I build robust web apps, RAG pipelines and multi-agent graphs — explainable, production-ready systems that
            solve real-world problems.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group flex items-center gap-3 bg-accent text-white py-3.5 px-6 rounded-full uppercase font-bold tracking-widest text-xs hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_10px_40px_-10px_var(--accent)]"
            >
              <span>View Work</span>
              <span className="bg-black/20 rounded-full p-1 group-hover:-rotate-45 transition-transform duration-300">
                <ArrowDownRight className="w-4 h-4" />
              </span>
            </a>
            <button
              onClick={triggerChat}
              className="flex items-center gap-2.5 border border-white/25 text-white py-3.5 px-6 rounded-full uppercase font-bold tracking-widest text-xs hover:scale-105 hover:bg-white hover:text-black active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>Hire Me</span>
            </button>
          </div>
        </motion.div>

        {/* Socials + scroll cue, bottom-right on desktop */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="visible"
          style={{ opacity: fade }}
          className="hidden lg:flex absolute bottom-10 right-8 z-20 items-center gap-3"
        >
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
          <a
            href="#about"
            aria-label="Scroll to About"
            className="ml-3 flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted hover:text-white transition-colors"
          >
            Scroll
            <span className="relative block w-px h-8 bg-white/20 overflow-hidden">
              <motion.span
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-accent"
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
