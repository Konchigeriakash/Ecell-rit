"use client";

import React, { useState } from "react";
import { ShieldAlert, Server, Sparkles, Activity, FileText, CheckCircle2, Globe } from "lucide-react";

type AuditLog = {
  id: string;
  event: string;
  source: string;
  time: string;
  severity: "info" | "warning" | "success";
};

const INITIAL_LOGS: AuditLog[] = [
  {
    id: "log-1",
    event: "Gemini matched 142 student profiles to AWS Cloud Engineer openings",
    source: "AI Orchestrator",
    time: "2 minutes ago",
    severity: "success"
  },
  {
    id: "log-2",
    event: "MHRD verified Ramaiah Institute of Technology security certificate",
    source: "MCA Verification API",
    time: "15 minutes ago",
    severity: "success"
  },
  {
    id: "log-3",
    event: "Quota alert: Genkit token utilization reached 78% of tier limit",
    source: "Google Vertex Engine",
    time: "1 hour ago",
    severity: "warning"
  },
  {
    id: "log-4",
    event: "New company registration request submitted by Zoom Technologies",
    source: "Corporate Registry",
    time: "2 hours ago",
    severity: "info"
  }
];

export function AdminView() {
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_LOGS);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">National Placements</p>
          <h3 className="text-xl font-bold mt-1 text-foreground">14,284 Verified</h3>
          <span className="text-[10px] text-emerald-500 font-semibold mt-1 inline-block">↑ 18.2% this term</span>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Onboarded Corporate Partners</p>
          <h3 className="text-xl font-bold mt-1 text-foreground">1,248 Firms</h3>
          <span className="text-[10px] text-emerald-500 font-semibold mt-1 inline-block">↑ 24 new this week</span>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">AI System Health</p>
          <h3 className="text-xl font-bold mt-1 text-emerald-500 flex items-center gap-1.5">
            <Server className="w-4 h-4 animate-pulse" /> 99.98% Up
          </h3>
          <span className="text-[10px] text-muted-foreground font-medium mt-1 inline-block">All models operational</span>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Avg Placement Cycle</p>
          <h3 className="text-xl font-bold mt-1 text-foreground">8.2 Days</h3>
          <span className="text-[10px] text-emerald-500 font-semibold mt-1 inline-block">↓ 1.4 days using AI matching</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Audit Log Table */}
        <div className="xl:col-span-2 glass-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border/60 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground">MCA Security & Matching Audit</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Real-time log of background matching flows and system connections.
              </p>
            </div>
            <Activity className="w-5 h-5 text-muted-foreground animate-pulse" />
          </div>
          
          <div className="divide-y divide-border/60">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors flex items-start gap-4">
                <span className={`p-1.5 rounded-lg mt-0.5 ${
                  log.severity === "success" ? "bg-emerald-500/10 text-emerald-500" :
                  log.severity === "warning" ? "bg-amber-500/10 text-amber-500" :
                  "bg-indigo-500/10 text-indigo-500"
                }`}>
                  {log.severity === "success" ? <CheckCircle2 className="w-4 h-4" /> :
                   log.severity === "warning" ? <ShieldAlert className="w-4 h-4" /> :
                   <Globe className="w-4 h-4" />}
                </span>
                <div className="space-y-0.5 flex-1">
                  <p className="text-sm font-semibold text-foreground">{log.event}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Source: {log.source}</span>
                    <span>•</span>
                    <span>{log.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom SVG Column Chart */}
        <div className="glass-card p-6 rounded-2xl border border-border flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-foreground">Active Internships Volume</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Monthly posted listings trend.
            </p>
          </div>

          {/* Premium Custom SVG Bar Chart */}
          <div className="h-56 flex items-end justify-between relative my-6 px-2">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 border-b border-border">
              <div className="border-t border-border w-full" />
              <div className="border-t border-border w-full" />
              <div className="border-t border-border w-full" />
              <div className="border-t border-border w-full" />
            </div>

            {/* Bars */}
            <div className="flex flex-col items-center gap-2 z-10 w-full">
              <div className="flex items-end justify-between w-full h-40 px-4">
                {/* Jan - 40% */}
                <div className="flex flex-col items-center gap-1 group w-8">
                  <div className="w-6 bg-primary/20 hover:bg-primary transition-all duration-500 rounded-t-md h-16 relative">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border px-1.5 py-0.5 rounded shadow">1.2K</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-semibold">Jan</span>
                </div>
                {/* Feb - 60% */}
                <div className="flex flex-col items-center gap-1 group w-8">
                  <div className="w-6 bg-primary/30 hover:bg-primary transition-all duration-500 rounded-t-md h-24 relative">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border px-1.5 py-0.5 rounded shadow">2.4K</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-semibold">Feb</span>
                </div>
                {/* Mar - 75% */}
                <div className="flex flex-col items-center gap-1 group w-8">
                  <div className="w-6 bg-primary/50 hover:bg-primary transition-all duration-500 rounded-t-md h-30 relative">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border px-1.5 py-0.5 rounded shadow">3.8K</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-semibold">Mar</span>
                </div>
                {/* Apr - 90% */}
                <div className="flex flex-col items-center gap-1 group w-8">
                  <div className="w-6 bg-primary hover:bg-primary-hover transition-all duration-500 rounded-t-md h-36 relative">
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border px-1.5 py-0.5 rounded shadow">4.5K</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-semibold">Apr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-4">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              MCA Matching Database Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
