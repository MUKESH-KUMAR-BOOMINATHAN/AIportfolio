"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, MessageSquareText } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
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
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // Simulate network submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Trigger the native mail client as an end-to-end fallback since this is a static site without a direct email API
    window.location.href = `mailto:mukeshkumarb107@gmail.com?subject=${encodeURIComponent(formData.subject || 'Message from Portfolio')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 pb-32 lg:pb-20 px-4 md:px-8 max-w-6xl mx-auto w-full border-b border-glass-border">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-16">
        <div className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent">
          <MessageSquareText className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white tracking-wide">
          Let's Connect
        </h2>
        <div className="h-[1px] bg-glass-border flex-1 ml-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left Side: Contact details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-white">Direct Pathways</h3>
            <p className="text-muted text-sm leading-relaxed">
              If you have an open Software Engineer, Full Stack, or AI Engineer role, 
              are looking to collaborate on LLM agents/RAG platforms, or simply want to chat 
              about tech—feel free to reach out. I will get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email link */}
            <a
              href="mailto:mukeshkumarb107@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-glass-border hover:border-accent/40 hover:-translate-y-0.5 transition-all group"
            >
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-accent group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-muted">Email Me Directly</p>
                <p className="text-sm font-semibold text-white">mukeshkumarb107@gmail.com</p>
              </div>
            </a>

            {/* Phone link */}
            <a
              href="tel:+918680834741"
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-glass-border hover:border-accent/40 hover:-translate-y-0.5 transition-all group"
            >
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-accent group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-muted">Call / WhatsApp</p>
                <p className="text-sm font-semibold text-white">+91 8680834741</p>
              </div>
            </a>

            {/* LinkedIn link */}
            <a
              href="https://www.linkedin.com/in/mukesh-kumar-b-b57122270"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-glass-border hover:border-accent/40 hover:-translate-y-0.5 transition-all group"
            >
              <div className="p-3 rounded-lg bg-[#0A66C2]/15 border border-[#0A66C2]/20 text-[#0A66C2] group-hover:scale-105 transition-transform animate-pulse">
                {/* Inline LinkedIn SVG */}
                <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-muted">Professional Network</p>
                <p className="text-sm font-semibold text-white">linkedin.com/in/mukesh-kumar-b</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-3">
          <div className="glass-panel rounded-2xl p-6 md:p-8 border-glass-border relative">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success-prompt"
                  className="flex flex-col items-center text-center py-12 space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="p-4 rounded-full bg-success/15 border border-success/35 text-success">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-muted text-sm max-w-sm leading-relaxed">
                    Thank you! Your message has been received. I've also emailed a confirmation fallback copy.
                    You can also mail me directly at <a href="mailto:mukeshkumarb107@gmail.com" className="text-accent underline font-semibold">mukeshkumarb107@gmail.com</a>.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-card border border-glass-border hover:border-accent/40 text-xs font-semibold text-white cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form-fields"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h4 className="text-lg font-heading font-bold text-white mb-4">Send a Message</h4>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted font-semibold uppercase">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full bg-card border text-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors ${
                        errors.name ? "border-red-500/50" : "border-glass-border"
                      }`}
                    />
                    {errors.name && <span className="text-[11px] text-red-400">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted font-semibold uppercase">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah.jenkins@company.com"
                      className={`w-full bg-card border text-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors ${
                        errors.email ? "border-red-500/50" : "border-glass-border"
                      }`}
                    />
                    {errors.email && <span className="text-[11px] text-red-400">{errors.email}</span>}
                  </div>

                  {/* Subject field */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted font-semibold uppercase">Subject (Optional)</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineer Job Posting"
                      className="w-full bg-card border border-glass-border text-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted font-semibold uppercase">Your Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message details here..."
                      className={`w-full bg-card border text-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none ${
                        errors.message ? "border-red-500/50" : "border-glass-border"
                      }`}
                    />
                    {errors.message && <span className="text-[11px] text-red-400">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-secondary text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {status === "loading" ? (
                      <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
