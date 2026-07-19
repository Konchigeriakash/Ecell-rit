"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, UserCheck, AlertTriangle, TrendingUp, Award, Users } from "lucide-react";

type VerificationRequest = {
  id: string;
  name: string;
  department: string;
  usn: string;
  gpa: number;
  status: "Pending" | "Verified" | "Flagged";
};

const INITIAL_REQUESTS: VerificationRequest[] = [
  {
    id: "req-1",
    name: "Akash Konchigeri",
    department: "Computer Science",
    usn: "1RI22CS001",
    gpa: 9.2,
    status: "Pending"
  },
  {
    id: "req-2",
    name: "Neha Kulkarni",
    department: "Information Science",
    usn: "1RI22IS045",
    gpa: 8.8,
    status: "Pending"
  },
  {
    id: "req-3",
    name: "Vikram Sen",
    department: "Electronics & Communication",
    usn: "1RI22EC092",
    gpa: 8.1,
    status: "Pending"
  },
  {
    id: "req-4",
    name: "Sneha Reddy",
    department: "Mechanical Engineering",
    usn: "1RI21ME034",
    gpa: 7.9,
    status: "Verified"
  }
];

export function InstituteView() {
  const [requests, setRequests] = useState<VerificationRequest[]>(INITIAL_REQUESTS);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleVerify = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "Verified" } : r));
    const student = requests.find(r => r.id === id);
    triggerToast(`Student ${student?.name} verified successfully!`);
  };

  const handleFlag = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "Flagged" } : r));
    const student = requests.find(r => r.id === id);
    triggerToast(`Verification request for ${student?.name} flagged for review.`);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const pendingRequests = requests.filter(r => r.status === "Pending");
  const verifiedCount = requests.filter(r => r.status === "Verified").length;
  const flaggedCount = requests.filter(r => r.status === "Flagged").length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 glass-card bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-slide-up">
          <UserCheck className="w-5 h-5" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Enrolled</p>
              <h3 className="text-xl font-bold mt-1 text-foreground">
                248 Students
              </h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Verified Credentials</p>
              <h3 className="text-xl font-bold mt-1 text-foreground">
                {verifiedCount + 142} Verified
              </h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Awaiting Verification</p>
              <h3 className="text-xl font-bold mt-1 text-foreground">
                {pendingRequests.length} Pending
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Grid with Table and Custom Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Verification List */}
        <div className="xl:col-span-2 glass-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border/60">
            <h3 className="font-bold text-foreground">Credential Verification Queue</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Verify student CGPA, USN, and department credentials before syncing to Ministry servers.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-border text-xs text-muted-foreground uppercase font-bold">
                  <th className="p-4">Student & USN</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">GPA</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {requests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-sm text-foreground">{req.name}</div>
                      <div className="text-xs text-muted-foreground">{req.usn}</div>
                    </td>
                    <td className="p-4 text-sm text-foreground">{req.department}</td>
                    <td className="p-4 text-sm font-semibold text-foreground">{req.gpa} / 10</td>
                    <td className="p-4 text-right">
                      {req.status === "Pending" ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleVerify(req.id)}
                            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleFlag(req.id)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            Flag
                          </button>
                        </div>
                      ) : (
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          req.status === "Verified" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                        }`}>
                          {req.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Card with Custom SVG Chart */}
        <div className="glass-card p-6 rounded-2xl border border-border flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-foreground">Department Placements</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Placement distribution across engineering streams.
            </p>
          </div>

          {/* Premium Custom SVG Chart */}
          <div className="h-64 flex items-center justify-center relative my-6">
            <svg viewBox="0 0 200 200" className="w-48 h-48 transform -rotate-90">
              {/* Circle charts representing different departments */}
              {/* Computer Science - 45% */}
              <circle
                r="70"
                cx="100"
                cy="100"
                fill="transparent"
                stroke="var(--primary)"
                strokeWidth="14"
                strokeDasharray="439.8"
                strokeDashoffset="197.9" // 45% of 439.8
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
              {/* Information Science - 30% */}
              <circle
                r="50"
                cx="100"
                cy="100"
                fill="transparent"
                stroke="var(--secondary)"
                strokeWidth="14"
                strokeDasharray="314.1"
                strokeDashoffset="94.2" // 30% of 314.1
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
              {/* Electronics - 20% */}
              <circle
                r="30"
                cx="100"
                cy="100"
                fill="transparent"
                stroke="var(--accent)"
                strokeWidth="14"
                strokeDasharray="188.4"
                strokeDashoffset="37.6" // 20% of 188.4
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-foreground">87%</span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Placement Rate</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-4 border-t border-border/60">
            <div>
              <div className="flex items-center justify-center gap-1.5 font-bold text-foreground">
                <span className="w-2.5 h-2.5 bg-primary rounded-full inline-block" /> CS
              </div>
              <span className="text-[10px] text-muted-foreground font-medium mt-0.5 inline-block">45% Shared</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 font-bold text-foreground">
                <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block" /> IS
              </div>
              <span className="text-[10px] text-muted-foreground font-medium mt-0.5 inline-block">30% Shared</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 font-bold text-foreground">
                <span className="w-2.5 h-2.5 bg-accent rounded-full inline-block" /> EC
              </div>
              <span className="text-[10px] text-muted-foreground font-medium mt-0.5 inline-block">20% Shared</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
