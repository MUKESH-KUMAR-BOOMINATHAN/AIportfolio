"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic, Megaphone, MessageSquareText, PenTool } from "lucide-react";
import type { ActivityItem } from "@/data/beyondTech";

const iconMap = {
  Mic: <Mic className="w-6 h-6 text-accent" />,
  Megaphone: <Megaphone className="w-6 h-6 text-accent" />,
  MessageSquareText: <MessageSquareText className="w-6 h-6 text-accent" />,
  PenTool: <PenTool className="w-6 h-6 text-accent" />
};

interface Props {
  activity: ActivityItem;
  idx: number;
}

export default function BeyondTechCard({ activity, idx }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
      className={`border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 md:p-10 flex flex-col hover:border-accent/80 hover:bg-white/[0.05] transition-all shadow-xl rounded-xl ${idx === 0 || idx === 3 ? "md:col-span-2" : ""}`}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-black border border-white/20">
            {iconMap[activity.iconName]}
          </div>
          <span className="text-[10px] uppercase font-black tracking-widest text-black bg-white px-3 py-1">
            {activity.tag}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tighter mb-2">
            {activity.title}
          </h3>
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-4">
            {activity.achievement}
          </div>
          <p className="text-muted text-sm leading-relaxed font-medium break-words whitespace-normal">
            {activity.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
