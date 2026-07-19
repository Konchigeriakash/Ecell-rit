"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Chatbot } from "@/components/chatbot";
import { ArrowRight, Sparkles, Shield, Building, GraduationCap, BookOpen, CheckCircle2, ChevronRight, Cpu } from "lucide-react";

export default function Home() {
  const selectRoleAndGo = (role: string) => {
    localStorage.setItem("activeRole", role);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Glow effects for top landing section */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60 animate-glow pointer-events-none z-0" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl opacity-40 animate-glow-delayed pointer-events-none z-0" />

      {/* Landing Header */}
      <header className="px-6 lg:px-8 h-20 flex items-center border-b border-border/60 bg-card/60 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>
          <div>
            <span className="font-extrabold text-sm text-foreground uppercase tracking-wider block">AI Internship Portal</span>
            <span className="text-[10px] text-muted-foreground font-semibold">Ministry of Corporate Affairs & E-Cell RIT</span>
          </div>
        </div>
        
        <nav className="ml-auto flex items-center gap-6">
          <a href="#about" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            About Portal
          </a>
          <a href="#roles" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Portal Nodes
          </a>
          <a href="#security" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Security & Trust
          </a>
          
          <Link
            href="/dashboard"
            onClick={() => selectRoleAndGo("student")}
            className="px-4.5 py-2 text-xs font-extrabold bg-primary text-white rounded-xl hover:scale-102 active:scale-98 transition-all hover:shadow-lg shadow-primary/10 cursor-pointer"
          >
            Launch Console
          </Link>

          <ThemeToggle />
        </nav>
      </header>

      <main className="flex-1 z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-28 px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-xs font-bold text-primary">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                Vercel, Vertex & Genkit Powered Engine
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
                Next-Gen AI <br />
                <span className="bg-gradient-to-r from-primary via-indigo-500 to-secondary bg-clip-text text-transparent">
                  Internship Matching
                </span>
              </h1>
              
              <p className="text-muted-foreground text-sm sm:text-base max-w-lg leading-relaxed">
                Empowering India's technical ecosystem. Connecting verified engineering students from Ramaiah Institute of Technology with premier global enterprises through the Ministry of Corporate Affairs' AI orchestration grid.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/dashboard"
                  onClick={() => selectRoleAndGo("student")}
                  className="px-6 py-3.5 text-sm font-bold bg-primary text-white rounded-xl hover:scale-102 active:scale-98 transition-all hover:shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Find My Match
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link
                  href="/dashboard"
                  onClick={() => selectRoleAndGo("company")}
                  className="px-6 py-3.5 text-sm font-bold glass hover:bg-black/5 dark:hover:bg-white/5 text-foreground rounded-xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Onboard Corporate
                </Link>
              </div>
            </div>

            {/* Glowing Hero Visual Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl filter opacity-30 animate-pulse pointer-events-none" />
              
              {/* Glassmorphic Mockup Container */}
              <div className="glass-card p-6 rounded-2xl border border-border max-w-md w-full shadow-2xl relative animate-float">
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Matching Engine Live</span>
                  </div>
                  <span className="text-xs font-bold text-primary">Scorecard Node</span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-border/50">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Akash Konchigeri</h4>
                      <p className="text-[9px] text-muted-foreground font-medium mt-0.5">RIT Computer Science Student</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Vetted Node</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-border/50">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">AWS Cloud Intern</h4>
                      <p className="text-[9px] text-muted-foreground font-medium mt-0.5">Amazon Web Services</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-xl flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> 98% Match
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50/30 dark:bg-slate-900/20 p-3 rounded-xl border border-dashed border-border flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-bold">MCA Central DB Link</span>
                  <span className="text-[10px] text-emerald-500 font-bold">Sync Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border/60 bg-card/30">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-foreground">14,200+</p>
              <p className="text-xs text-muted-foreground font-semibold mt-1">Placements Verified</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-foreground">1,200+</p>
              <p className="text-xs text-muted-foreground font-semibold mt-1">Onboarded Corporates</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-foreground">94.2%</p>
              <p className="text-xs text-muted-foreground font-semibold mt-1">AI Match Accuracy</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-foreground">0.1s</p>
              <p className="text-xs text-muted-foreground font-semibold mt-1">Average Response Latency</p>
            </div>
          </div>
        </section>

        {/* Portal Nodes / Roles Section */}
        <section id="roles" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Ecosystem Access Nodes</h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Select your node to log in. Each role accesses dedicated pipelines synchronized via local mock stores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/dashboard"
              onClick={() => selectRoleAndGo("student")}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:scale-[1.03] transition-all hover:border-primary hover:shadow-lg duration-300 relative overflow-hidden"
            >
              <div>
                <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mt-4">Student Node</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Track applications, edit matching profiles, and view real-time compatibility scores.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-primary mt-6 group-hover:gap-2 transition-all">
                Enter Node <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => selectRoleAndGo("company")}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:scale-[1.03] transition-all hover:border-indigo-500 hover:shadow-lg duration-300 relative overflow-hidden"
            >
              <div>
                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl w-fit">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mt-4">Corporate Node</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Post internship roles, filter applicant profiles, and execute automated vetting pipelines.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-500 mt-6 group-hover:gap-2 transition-all">
                Enter Node <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => selectRoleAndGo("institute")}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:scale-[1.03] transition-all hover:border-emerald-500 hover:shadow-lg duration-300 relative overflow-hidden"
            >
              <div>
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl w-fit">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mt-4">Institute Node</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Review student USNs and CGPAs, approve verification requests, and view statistics.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 mt-6 group-hover:gap-2 transition-all">
                Enter Node <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => selectRoleAndGo("admin")}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:scale-[1.03] transition-all hover:border-accent hover:shadow-lg duration-300 relative overflow-hidden"
            >
              <div>
                <div className="p-3 bg-accent/10 text-accent rounded-xl w-fit">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mt-4">Admin Control Node</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Oversee security audit trails, monitor system latency metrics, and inspect transaction counts.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-accent mt-6 group-hover:gap-2 transition-all">
                Enter Node <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 bg-card/30 text-center text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 Ministry of Corporate Affairs, Government of India. Developed under RIT Entrepreneurship Cell node.</p>
          <div className="flex gap-4">
            <a href="https://github.com/Konchigeriakash/Ecell-rit" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* Floating AI Chatbot Assistant */}
      <Chatbot />
    </div>
  );
}
