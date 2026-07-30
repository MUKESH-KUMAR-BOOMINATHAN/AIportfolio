"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Compass, 
  RotateCcw, 
  Settings,
  AlertCircle,
  ChevronRight
} from "lucide-react";

interface Source {
  id: string;
  category: string;
  text: string;
  similarity: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

const SUGGESTED_QUESTIONS = [
  { label: "What did you do at Prodapt?", text: "What did you do during your Software Engineering internship at Prodapt Solutions?" },
  { label: "Explain your LangGraph project", text: "Can you explain the details and architecture of your Insurance Claims Investigation Assistant project?" },
  { label: "Why are you a fit for a Full-Stack role?", text: "How do your skills and projects align with a Full-Stack Developer role? Why are you a good fit?" },
  { label: "Summarize your background", text: "Could you summarize your software engineering background, core skills, and experience in a punchy way?" }
];

export default function HireMukeshAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm **HireMukeshkumar AI**, a customized assistant trained on my portfolio database. Ask me anything about my internships, agent architectures, or how I get things done!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [tone, setTone] = useState<"concise" | "detailed">("concise");
  const [showConfig, setShowConfig] = useState(false);
  
  // Tooltip session-dismissed states
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load session storage for tooltip triggers and runtime env check
  useEffect(() => {
    // Console warning if API URL env is missing
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn(
        "WARNING: NEXT_PUBLIC_API_URL is undefined at runtime. " +
        "HireMukeshkumar AI falls back to http://localhost:8000. " +
        "Make sure to configure it in frontend/.env.local if your backend is hosted elsewhere."
      );
    }

    const dismissed = sessionStorage.getItem("ai-chat-tooltip-dismissed") === "true";
    setIsTooltipDismissed(dismissed);
    
    if (!dismissed) {
      // Trigger tooltip 3 seconds after page loads
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen to custom open event from Navbar/Hero
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
    e.stopPropagation(); // prevent opening chat drawer
    setShowTooltip(false);
    setIsTooltipDismissed(true);
    sessionStorage.setItem("ai-chat-tooltip-dismissed", "true");
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const history = messages
      .slice(-6)
      .map(msg => ({ role: msg.role, content: msg.content }));

    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: history,
          tone: tone
        }),
      });

      if (!response.ok) {
        throw new Error("Could not connect to the backend server.");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("ReadableStream is not supported.");

      let done = false;
      let streamedText = "";
      let retrievedSources: Source[] = [];
      let buffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: !done });
          
          let boundary = buffer.indexOf("\n\n");
          while (boundary !== -1) {
            const block = buffer.slice(0, boundary).trim();
            buffer = buffer.slice(boundary + 2);

            const lines = block.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const dataStr = line.slice(6).trim();
                if (dataStr === "[DONE]") {
                  done = true;
                  break;
                }
                try {
                  const parsed = JSON.parse(dataStr);
                  if (parsed.sources) {
                    retrievedSources = parsed.sources;
                  } else if (parsed.text) {
                    streamedText += parsed.text;
                    setMessages(prev => {
                      const updated = [...prev];
                      updated[updated.length - 1] = {
                        role: "assistant",
                        content: streamedText,
                        sources: retrievedSources.length > 0 ? retrievedSources : undefined
                      };
                      return updated;
                    });
                  } else if (parsed.error) {
                    // Fix: Update state correctly when error occurs so it streams the issue in the bubble
                    streamedText += `\n\n*(Error: ${parsed.error})*`;
                    setMessages(prev => {
                      const updated = [...prev];
                      updated[updated.length - 1] = {
                        role: "assistant",
                        content: streamedText,
                        sources: retrievedSources.length > 0 ? retrievedSources : undefined
                      };
                      return updated;
                    });
                  }
                } catch (e) {
                  // Buffer incomplete JSON segment
                }
              }
            }
            boundary = buffer.indexOf("\n\n");
          }
        }
      }
    } catch (error: any) {
      console.error(error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I had trouble reaching my AI backend. Please verify that the server is active at `http://localhost:8000` or configure the backend `.env` file."
        };
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi there! I'm **HireMukeshkumar AI**, a customized assistant trained on my portfolio database. Ask me anything about my internships, agent architectures, or how I get things done!"
      }
    ]);
  };

  return (
    <>
      {/* Session-Aware Speech Bubble Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 p-3.5 rounded-xl glass-panel text-xs text-white flex items-start gap-3 max-w-[250px] shadow-2xl select-none"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex-1 font-semibold leading-relaxed">
              Got a question? Ask me anything directly! 👋
            </div>
            <button
              onClick={handleDismissTooltip}
              className="p-1 rounded-md text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {/* Speach bubble pointer arrow */}
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-[#0B1120] border-r border-b border-glass-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (Dynamic animation states) */}
      <motion.button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 border border-white/20 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none flex items-center gap-2 cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Chat with HireMukeshkumar AI"
      >
        <MessageSquare className={`w-6 h-6 ${!isTooltipDismissed ? "animate-pulse" : ""}`} />
        <span className="text-sm font-semibold pr-1 hidden md:inline">HireMukeshkumar AI</span>
        
        {/* Blinking glow halo disabled once session tooltip is dismissed */}
        {!isTooltipDismissed && (
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-15 pointer-events-none z-[-1]" />
        )}
      </motion.button>

      {/* Chat Drawer Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] glass-panel border-l border-glass-border shadow-2xl flex flex-col focus:outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-glass-border flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  {/* Status Indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-background animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white tracking-wide flex items-center gap-1.5">
                    HireMukeshkumar AI
                  </h3>
                  <p className="text-xs text-muted flex items-center gap-1">
                    Mukeshkumar Boominathan's AI Representative
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfig(!showConfig)}
                  className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 transition-colors"
                  title="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Config Overlay panel */}
            <AnimatePresence>
              {showConfig && (
                <motion.div
                  className="p-4 bg-card border-b border-glass-border flex flex-col gap-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">AI Configuration</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Response Tone</span>
                    <div className="flex bg-black/40 rounded-lg p-0.5 border border-glass-border">
                      <button
                        onClick={() => setTone("concise")}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          tone === "concise" 
                            ? "bg-accent text-white" 
                            : "text-muted hover:text-white"
                        }`}
                      >
                        Concise
                      </button>
                      <button
                        onClick={() => setTone("detailed")}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          tone === "detailed" 
                            ? "bg-accent text-white" 
                            : "text-muted hover:text-white"
                        }`}
                      >
                        Detailed
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-muted/80 flex gap-1.5 items-start mt-1">
                    <AlertCircle className="w-4 h-4 shrink-0 text-accent" />
                    <span>This assistant retrieves factual sections from Mukeshkumar Boominathan's resume (Prodapt intern, projects, skill tags) using embedding similarity matching, and streams Gemini API outputs.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Body */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-card scrollbar-track-transparent"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 select-none">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div className="max-w-[85%] space-y-2">
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.role === "user" 
                        ? "bg-accent text-white rounded-tr-none" 
                        : "bg-card text-foreground border border-glass-border rounded-tl-none leading-relaxed"
                    }`}>
                      <div className="space-y-2 whitespace-pre-line font-sans">
                        {msg.content.split("\n").map((para, pIdx) => {
                          const parts = para.split(/\*\*([^*]+)\*\*/g);
                          return (
                            <p key={pIdx} className="m-0 leading-relaxed">
                              {parts.map((part, ptIdx) => {
                                return ptIdx % 2 === 1 ? <strong key={ptIdx} className="text-white font-bold">{part}</strong> : part;
                              })}
                            </p>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sources retrieved */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center gap-1 text-[10px] text-muted uppercase tracking-wider mb-1.5">
                          <Compass className="w-3 h-3 text-accent-secondary" />
                          <span>RAG Sources Retrieved:</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {msg.sources.slice(0, 2).map((src, srcIdx) => (
                            <div 
                              key={srcIdx} 
                              className="p-2 rounded-lg bg-black/30 border border-glass-border text-[10px] space-y-1 hover:border-accent/40 transition-colors"
                              title={src.text}
                            >
                              <div className="flex justify-between items-center text-white/80 font-bold">
                                <span className="uppercase text-[9px] text-accent-secondary">{src.category}</span>
                                <span>{(src.similarity * 100).toFixed(0)}% Match</span>
                              </div>
                              <p className="text-muted/80 line-clamp-2">{src.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 select-none">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-card border border-glass-border rounded-tl-none flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Footer */}
            <div className="p-4 border-t border-glass-border bg-black/20 space-y-3">
              {messages.length === 1 && !inputValue && (
                <div className="space-y-1.5">
                  <p className="text-[10px] text-muted uppercase tracking-wider">Suggested Questions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q.text)}
                        className="text-xs px-2.5 py-1.5 rounded-xl bg-card border border-glass-border hover:border-accent-secondary/50 text-muted hover:text-white transition-all text-left flex items-center justify-between gap-1 w-full sm:w-auto cursor-pointer"
                      >
                        <span>{q.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-muted" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me a question..."
                  className="flex-1 bg-card border border-glass-border text-sm text-white rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3 rounded-xl bg-accent text-white hover:bg-accent-secondary disabled:bg-card disabled:text-muted disabled:border disabled:border-glass-border hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
