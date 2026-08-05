"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/data/certifications";

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 md:py-24 px-4 md:px-8 w-full bg-black text-white border-t border-white/20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter">
            Verified <br /> <span className="text-accent">Credentials</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
              className="border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 flex flex-col justify-between hover:border-accent/80 hover:bg-white/[0.05] transition-all shadow-xl rounded-xl group"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-accent mb-2 block group-hover:text-white transition-colors">
                      {cert.issuer} · {cert.year}
                    </span>
                    <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tighter leading-tight group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                  
                  <div className="p-3 bg-black border border-white/20 text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>

                <p className="text-muted text-sm leading-relaxed font-medium break-words whitespace-normal">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
