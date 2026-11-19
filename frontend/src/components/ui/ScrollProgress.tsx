"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent bar at the very top that fills as the page is scrolled. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[70] shadow-[0_0_12px_var(--accent)]"
    />
  );
}
