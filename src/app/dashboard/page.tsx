"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { StudentView } from "@/components/dashboard/student-view";
import { CompanyView } from "@/components/dashboard/company-view";
import { InstituteView } from "@/components/dashboard/institute-view";
import { AdminView } from "@/components/dashboard/admin-view";
import { ThemeToggle } from "@/components/theme-toggle";
import { Chatbot } from "@/components/chatbot";
import { LayoutDashboard, Award, Sparkles, BookOpen, LogOut, Shield, Building, GraduationCap, ChevronDown } from "lucide-react";

type Role = "student" | "company" | "institute" | "admin";

export default function Dashboard() {
  const [activeRole, setActiveRole] = useState<Role>("student");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync role with localStorage or query parameters if set
  useEffect(() => {
    const savedRole = localStorage.getItem("activeRole") as Role | null;
    if (savedRole) {
      setActiveRole(savedRole);
    }
  }, []);

  const handleRoleChange = (role: Role) => {
    setActiveRole(role);
    localStorage.setItem("activeRole", role);
    setIsDropdownOpen(false);
  };

  const getRoleLabel = (role: Role) => {
    switch (role) {
      case "student": return "Student Node";
      case "company": return "Corporate Node";
      case "institute": return "Institute Node";
      case "admin": return "National Admin";
    }
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case "student": return <GraduationCap className="w-4 h-4" />;
      case "company": return <Building className="w-4 h-4" />;
      case "institute": return <BookOpen className="w-4 h-4" />;
      case "admin": return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border/80 bg-card hidden md:flex flex-col justify-between py-6 px-4">
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 px-2">
            <span className="p-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <span className="font-extrabold text-sm text-foreground uppercase tracking-wider block">AI Internship</span>
              <span className="text-[10px] text-muted-foreground font-semibold">E-Cell RIT Node</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Core Workspace</span>
            </Link>
            
            <a
              href="https://github.com/Konchigeriakash/Ecell-rit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850/50 text-muted-foreground hover:text-foreground font-semibold text-sm transition-all"
            >
              <Award className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            
            <a
              href="#docs"
              className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850/50 text-muted-foreground hover:text-foreground font-semibold text-sm transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Guidelines docs</span>
            </a>
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="space-y-4">
          <div className="glass p-3 rounded-xl border border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Verification Server</p>
            <p className="text-xs text-emerald-500 font-bold mt-0.5 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> Connected
            </p>
          </div>
          
          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 font-semibold text-sm transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Core Content Container */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Workspace Header */}
        <header className="h-20 border-b border-border/80 bg-card px-6 flex items-center justify-between z-20">
          {/* Breadcrumbs & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
              <span>MCA AI Node</span>
              <span>/</span>
              <span>RIT Grid</span>
              <span>/</span>
              <span className="text-primary">{getRoleLabel(activeRole)}</span>
            </div>
            <h2 className="text-lg font-black mt-0.5 text-foreground">Interactive Portal Console</h2>
          </div>

          {/* Interactive controls */}
          <div className="flex items-center gap-4">
            {/* Dynamic Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="glass px-4 py-2 rounded-xl text-xs font-bold text-foreground border border-border flex items-center gap-2 transition-all hover:scale-102 cursor-pointer shadow"
              >
                {getRoleIcon(activeRole)}
                <span>Switch Role</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 glass-card border border-border rounded-xl shadow-2xl py-1 z-30 animate-slide-up">
                  <div className="px-3 py-1.5 text-[9px] text-muted-foreground font-bold uppercase tracking-wider border-b border-border/50">
                    Select Portal Node
                  </div>
                  <button
                    onClick={() => handleRoleChange("student")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      activeRole === "student" ? "bg-primary/10 text-primary" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground"
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-primary" /> Student Dashboard
                  </button>
                  <button
                    onClick={() => handleRoleChange("company")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      activeRole === "company" ? "bg-primary/10 text-primary" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground"
                    }`}
                  >
                    <Building className="w-4 h-4 text-indigo-500" /> Company Dashboard
                  </button>
                  <button
                    onClick={() => handleRoleChange("institute")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      activeRole === "institute" ? "bg-primary/10 text-primary" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground"
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-emerald-500" /> Institute Dashboard
                  </button>
                  <button
                    onClick={() => handleRoleChange("admin")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      activeRole === "admin" ? "bg-primary/10 text-primary" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground"
                    }`}
                  >
                    <Shield className="w-4 h-4 text-accent" /> Admin Control Node
                  </button>
                </div>
              )}
            </div>

            <ThemeToggle />
          </div>
        </header>

        {/* Dynamic Center Work Area */}
        <main className="flex-1 p-6 md:p-8 bg-slate-50/20 dark:bg-slate-900/5 overflow-y-auto">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {activeRole === "student" && <StudentView />}
            {activeRole === "company" && <CompanyView />}
            {activeRole === "institute" && <InstituteView />}
            {activeRole === "admin" && <AdminView />}
          </div>
        </main>
      </div>

      {/* Floating AI Chatbot Assistant */}
      <Chatbot />
    </div>
  );
}
