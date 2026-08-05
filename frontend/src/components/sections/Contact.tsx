"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.message.trim()) newErrors.message = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulating success state without actually opening a mail client
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="w-full bg-accent text-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-heading font-black tracking-tighter uppercase mb-12"
        >
          Ready to Build?
        </motion.h2>

        <div className="border-t border-white/20 pt-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col md:flex-row gap-12 justify-between"
          >
            <div>
              <p className="text-xl font-bold mb-2 uppercase tracking-wide">Contact Details</p>
              <a href="mailto:mukeshkumarb107@gmail.com" className="block text-lg hover:underline underline-offset-4">mukeshkumarb107@gmail.com</a>
              <a href="tel:+918680834741" className="block text-lg hover:underline underline-offset-4">+91 8680834741</a>
              <p className="text-lg mt-2 opacity-80">Chennai, Tamil Nadu</p>
            </div>

            <div>
              <p className="text-xl font-bold mb-4 uppercase tracking-wide">Connect</p>
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/mukesh-kumar-b-b57122270" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-accent hover:scale-105 active:scale-95 transition-all duration-300">
                  LinkedIn
                </a>
                <a href="https://github.com/MUKESH-KUMAR-BOOMINATHAN" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-accent hover:scale-105 active:scale-95 transition-all duration-300">
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
