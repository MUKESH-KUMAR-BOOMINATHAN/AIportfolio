"use client";

import React, { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

interface Props {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

/** Counts from 0 to `to` the first time it scrolls into view. */
export default function AnimatedCounter({ to, suffix = "", prefix = "", decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);

  useEffect(() => {
    const write = (v: number) => {
      if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
    };
    if (!inView) return;
    if (reduce) {
      write(to);
      return;
    }
    const controls = animate(value, to, { duration: 1.6, ease: "easeOut", onUpdate: write });
    return () => controls.stop();
  }, [inView, reduce, to, prefix, suffix, decimals, value]);

  return <span ref={ref}>{`${prefix}${(0).toFixed(decimals)}${suffix}`}</span>;
}
