"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Mic, Volume2, Sparkles } from "lucide-react";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const SUGGESTIONS = [
  "How does the AI matching work?",
  "What is the role of E-Cell RIT?",
  "Is the stipend government-funded?",
  "How do I verify student credentials?"
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I am your MCA AI Internship Portal assistant. How can I help you today?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      text: textToSend,
      isUser: true
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      let botResponse = "That's an interesting question! Under the Ministry of Corporate Affairs (MCA) guidelines, candidates are matched using their verified skill profiles. E-Cell RIT coordinates student vetting to ensure credentials are accurate before deployment.";
      
      const query = textToSend.toLowerCase();
      if (query.includes("matching")) {
        botResponse = "Our AI matching engine scores candidates out of 100 based on the overlap between their verified skills, college GPA, and the posting requirements. Shortlisted candidates (90%+) are automatically recommended to corporate hiring dashboards.";
      } else if (query.includes("rit") || query.includes("e-cell")) {
        botResponse = "The Entrepreneurship Cell at Ramaiah Institute of Technology (E-Cell RIT) powers the student verification node. They verify student credentials, host workshops, and help connect technical talent to premier internships.";
      } else if (query.includes("stipend") || query.includes("funded")) {
        botResponse = "Yes! Internships posted under the MCA scheme offer a monthly stipend, with a portion co-funded by the Government of India and the participating partner corporate under CSR guidelines.";
      } else if (query.includes("verify") || query.includes("credentials")) {
        botResponse = "Institutes (like RIT) access their specialized portal to verify USNs and GPAs. Once checked, the student profile is marked with a green 'Verified' badge, enabling instant AI matching.";
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        text: botResponse,
        isUser: false
      };

      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);

      // Play audio if enabled
      if (speechEnabled && typeof window !== "undefined") {
        const utterance = new SpeechSynthesisUtterance(botResponse);
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    }, 1200);
  };

  const handleSpeechToggle = () => {
    setSpeechEnabled(!speechEnabled);
    if (!speechEnabled && typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance("Voice responses enabled.");
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMicClick = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInput("How does E-Cell RIT work?");
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all animate-float cursor-pointer hover:shadow-primary/30"
          aria-label="Open Assistant"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window Sheet */}
      {isOpen && (
        <div className="glass-card w-[360px] sm:w-[400px] h-[550px] rounded-2xl flex flex-col overflow-hidden border border-border shadow-2xl animate-slide-up">
          {/* Header */}
          <div className="p-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <h4 className="font-bold text-sm">AI Portal Assistant</h4>
                <p className="text-[10px] opacity-80">Powered by Gemini & Genkit</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSpeechToggle}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  speechEnabled ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/70"
                }`}
                title="Toggle Text-to-Speech"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-slate-900/10">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${msg.isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {!msg.isUser && (
                  <span className="w-7 h-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </span>
                )}
                <div className={`p-3.5 rounded-2xl text-sm ${
                  msg.isUser 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "glass-card text-foreground rounded-tl-none border-border"
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                <span className="w-7 h-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 animate-bounce">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs text-muted-foreground italic font-medium">Matching queries...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-border/50 flex flex-col gap-1.5 bg-slate-50/50 dark:bg-slate-900/5">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider px-1">Suggested Questions:</span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-[11px] px-2.5 py-1 glass hover:bg-primary/5 hover:text-primary transition-all rounded-lg text-left text-muted-foreground border border-border cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t border-border flex items-center gap-2 bg-card"
          >
            <input
              type="text"
              placeholder={isListening ? "Listening..." : "Type your query..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isListening || isLoading}
              className="flex-1 glass p-2 px-3 rounded-xl border border-border text-sm text-foreground outline-none focus:border-primary placeholder:text-muted-foreground transition-all"
            />
            
            <button
              type="button"
              onClick={handleMicClick}
              disabled={isListening || isLoading}
              className={`p-2 rounded-xl transition-all border cursor-pointer ${
                isListening 
                  ? "bg-red-500 border-red-600 text-white animate-pulse" 
                  : "glass hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground"
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
