"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  value: string;
  label: string;
}

export default function StatItem({ value, label }: Props) {
  return (
    <div className="text-center md:text-left">
      <div className="text-2xl md:text-3xl font-heading font-black text-white">{value}</div>
      <div className="text-[10px] uppercase font-bold tracking-widest text-muted">{label}</div>
    </div>
  );
}
