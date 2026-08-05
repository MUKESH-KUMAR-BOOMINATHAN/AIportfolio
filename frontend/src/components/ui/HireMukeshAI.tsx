"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Send, 
  Settings,
  AlertCircle,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { useChat } from "@/hooks/useChat";

const SUGGESTED_QUESTIONS = [
  { label: "Prodapt Internship", text: "What did you do during your Software Engineering internship at Prodapt Solutions?" },
  { label: "LangGraph Architecture", text: "Can you explain the details and architecture of your Insurance Claims Investigation Assistant project?" },
  { label: "Full-Stack Fit", text: "How do your skills and projects align with a Full-Stack Developer role? Why are you a good fit?" },
  { label: "Quick Summary", text: "Could you summarize your software engineering background, core skills, and experience in a punchy way?" }
];

export default function HireMukeshAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isTyping,
    tone,
    setTone,
    handleSend,
    handleReset
  } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn(
        "WARNING: NEXT_PUBLIC_API_URL is undefined at runtime. " +
        "HireMukeshkumar AI uses the configured backend API URL."
      );
    }

    const dismissed = sessionStorage.getItem("ai-chat-tooltip-dismissed") === "true";
    setIsTooltipDismissed(dismissed);
    
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
          setIsTooltipDismissed(true);
          sessionStorage.setItem("ai-chat-tooltip-dismissed", "true");
        }, 6000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowTooltip(false);
      setIsTooltipDismissed(true);
      sessionStorage.setItem("ai-chat-tooltip-dismissed", "true");
    };
    window.addEventListener("open-mukesh-ai", handleOpen);
    return () => window.removeEventListener("open-mukesh-ai", handleOpen);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTooltip(false);
    setIsTooltipDismissed(true);
    sessionStorage.setItem("ai-chat-tooltip-dismissed", "true");
  };

  const handleDismissTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    setIsTooltipDismissed(true);
    sessionStorage.setItem("ai-chat-tooltip-dismissed", "true");
  };

  const onSubmit = (text: string) => {
    if (!text.trim()) return;
    handleSend(text);
    setInputValue("");
  };

  return (
    <>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 p-4 bg-accent text-white flex items-start gap-3 max-w-[250px] shadow-2xl select-none rounded-lg backdrop-blur-md bg-accent/90"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <div className="flex-1 font-bold uppercase tracking-wider text-[11px] leading-relaxed">
              Ask AI about Mukeshkumar
            </div>
            <button onClick={handleDismissTooltip} className="p-1 hover:bg-black/20 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-50 p-4 bg-accent text-white hover:bg-white hover:text-black transition-colors focus:outline-none flex items-center gap-3 border border-white/20 shadow-2xl rounded-full group backdrop-blur-md bg-accent/90"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="text-xs font-black uppercase tracking-widest hidden md:inline group-hover:text-black pr-2">Ask AI</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] bg-black/85 backdrop-blur-2xl border-l border-accent/40 shadow-2xl flex flex-col focus:outline-none text-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.03] backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent text-white flex items-center justify-center font-black text-xl uppercase tracking-tighter rounded-lg shadow-lg">
                  AI
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl uppercase tracking-tighter">
                    HireMukesh AI
                  </h3>
                  <p className="text-[10px] text-accent uppercase font-bold tracking-widest">
                    Agent Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfig(!showConfig)}
                  className="p-2.5 text-muted hover:text-white bg-black/40 border border-white/10 rounded-lg hover:border-accent transition-colors"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2.5 text-muted hover:text-white bg-black/40 border border-white/10 rounded-lg hover:border-accent transition-colors"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 text-white bg-accent hover:bg-white hover:text-black transition-colors rounded-lg shadow-md"
                  title="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Config Overlay */}
            <AnimatePresence>
              {showConfig && (
                <motion.div
                  className="p-6 bg-card border-b border-white/20"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-4">Agent Configuration</h4>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="text-white">Response Tone</span>
                    <div className="flex bg-black border border-white/20">
                      <button
                        onClick={() => setTone("concise")}
                        className={`px-4 py-2 transition-colors ${tone === "concise" ? "bg-white text-black" : "text-muted hover:text-white"}`}
                      >
                        Concise
                      </button>
                      <button
                        onClick={() => setTone("detailed")}
                        className={`px-4 py-2 transition-colors border-l border-white/20 ${tone === "detailed" ? "bg-white text-black" : "text-muted hover:text-white"}`}
                      >
                        Detailed
                      </button>
                    </div>
                  </div>
                  <div className="text-[10px] text-muted flex gap-2 items-start uppercase tracking-wider font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0 text-accent" />
                    <span>Retrieves factual sections using embedding similarity matching via Gemini API.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Body */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-8 bg-black"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <span className="text-[10px] uppercase font-black tracking-widest text-muted mb-2">
                    {msg.role === "user" ? "You" : "AI Agent"}
                  </span>
                  <div className={`p-4 max-w-[85%] text-sm font-medium leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-white text-black" 
                      : "bg-card border border-white/20 text-white"
                  }`}>
                    <div className="space-y-4">
                      {msg.content.split("\n").map((para, pIdx) => {
                        const parts = para.split(/\*\*([^*]+)\*\*/g);
                        return (
                          <p key={pIdx}>
                            {parts.map((part, ptIdx) => {
                              return ptIdx % 2 === 1 ? <strong key={ptIdx} className={`font-black ${msg.role === "user" ? "text-black" : "text-accent"}`}>{part}</strong> : part;
                            })}
                          </p>
                        );
                      })}
                    </div>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-[9px] uppercase font-black tracking-widest text-accent mb-2 block">Sources</span>
                        <div className="space-y-2">
                          {msg.sources.slice(0, 2).map((src, srcIdx) => (
                            <div key={srcIdx} className="bg-black p-3 border border-white/10">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] uppercase font-black text-white">{src.category}</span>
                                <span className="text-[9px] uppercase font-black text-muted">{(src.similarity * 100).toFixed(0)}% MATCH</span>
                              </div>
                              <p className="text-[10px] text-muted truncate">{src.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                        {msg.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => onSubmit(suggestion)}
                            disabled={isTyping}
                            className="w-full text-[10px] px-3 py-2 bg-black border border-white/10 text-accent uppercase tracking-widest font-bold hover:border-accent transition-colors text-left flex justify-between items-center disabled:opacity-50"
                          >
                            <span>{suggestion}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-black tracking-widest text-muted mb-2">AI Agent</span>
                  <div className="p-4 bg-card border border-white/20 flex gap-2">
                    <span className="w-2 h-2 bg-accent animate-pulse" />
                    <span className="w-2 h-2 bg-accent animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-accent animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input */}
            <div className="p-6 border-t border-white/20 bg-card">
              {messages.length === 1 && !inputValue && (
                <div className="mb-4 space-y-2">
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted mb-2">Suggestions</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSubmit(q.text)}
                        className="text-[10px] px-3 py-2 bg-black border border-white/10 text-white uppercase tracking-widest font-bold hover:border-accent hover:text-accent transition-colors text-left flex justify-between items-center"
                      >
                        <span>{q.label}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(inputValue);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="TYPE MESSAGE..."
                  className="flex-1 bg-black border border-white/20 text-white px-4 py-3 text-xs uppercase font-bold tracking-widest focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="px-6 bg-accent text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:bg-card disabled:text-muted disabled:border disabled:border-white/20 flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
