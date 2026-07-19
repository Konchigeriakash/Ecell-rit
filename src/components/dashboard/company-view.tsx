"use client";

import React, { useState, useEffect } from "react";
import { Plus, Users, Sparkles, FileText, CheckCircle2, XCircle, ChevronRight, Briefcase } from "lucide-react";

type Candidate = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  matchScore: number;
  status: "Applied" | "Shortlisted" | "Interviewing" | "Offered" | "Rejected";
  dateApplied: string;
};

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "cand-1",
    name: "Akash Konchigeri",
    role: "AI & Machine Learning Intern",
    skills: ["Python", "TensorFlow", "React", "Next.js"],
    matchScore: 98,
    status: "Applied",
    dateApplied: "2026-07-18"
  },
  {
    id: "cand-2",
    name: "Rohan Sharma",
    role: "Full Stack Engineer",
    skills: ["TypeScript", "Next.js", "Node.js"],
    matchScore: 89,
    status: "Shortlisted",
    dateApplied: "2026-07-16"
  },
  {
    id: "cand-3",
    name: "Priya Patel",
    role: "AI & Machine Learning Intern",
    skills: ["Python", "PyTorch", "SQL"],
    matchScore: 82,
    status: "Interviewing",
    dateApplied: "2026-07-14"
  },
  {
    id: "cand-4",
    name: "Amit Verma",
    role: "Cloud Engineering Intern",
    skills: ["AWS", "Docker", "Linux"],
    matchScore: 71,
    status: "Rejected",
    dateApplied: "2026-07-12"
  }
];

export function CompanyView() {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [activeTab, setActiveTab] = useState<"applicants" | "post">("applicants");
  
  // Job Post state
  const [jobTitle, setJobTitle] = useState("");
  const [jobStipend, setJobStipend] = useState("");
  const [jobSkills, setJobSkills] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Sync with Student actions via localStorage
  useEffect(() => {
    // Check if student applied to any mock jobs
    const studentAppsRaw = localStorage.getItem("studentApplications");
    if (studentAppsRaw) {
      const studentApps = JSON.parse(studentAppsRaw);
      const studentName = localStorage.getItem("studentName") || "Akash Konchigeri";
      const studentSkills = localStorage.getItem("studentSkills") || "React, Next.js, TypeScript";

      // Reconstruct candidates array to merge student applications
      const newCandList = [...INITIAL_CANDIDATES];
      
      studentApps.forEach((app: any) => {
        // Check if student application is already in our list
        const exists = newCandList.some(
          c => c.name === studentName && c.role === app.title && c.dateApplied === app.date
        );
        if (!exists) {
          newCandList.unshift({
            id: app.id,
            name: studentName,
            role: app.title,
            skills: studentSkills.split(",").map(s => s.trim()),
            matchScore: app.matchScore,
            status: app.status,
            dateApplied: app.date
          });
        } else {
          // Sync state updates
          const idx = newCandList.findIndex(c => c.name === studentName && c.role === app.title);
          if (idx !== -1) {
            newCandList[idx].status = app.status;
          }
        }
      });
      setCandidates(newCandList);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpdateStatus = (candidateId: string, newStatus: Candidate["status"]) => {
    // Update local state
    const updated = candidates.map(c => 
      c.id === candidateId ? { ...c, status: newStatus } : c
    );
    setCandidates(updated);

    // Sync back to student applications in localStorage if it is the student
    const studentName = localStorage.getItem("studentName") || "Akash Konchigeri";
    const cand = candidates.find(c => c.id === candidateId);
    if (cand && cand.name === studentName) {
      const studentAppsRaw = localStorage.getItem("studentApplications");
      if (studentAppsRaw) {
        const studentApps = JSON.parse(studentAppsRaw);
        const updatedStudentApps = studentApps.map((app: any) => 
          app.id === candidateId ? { ...app, status: newStatus } : app
        );
        localStorage.setItem("studentApplications", JSON.stringify(updatedStudentApps));
      }
    }

    triggerToast(`Candidate status updated to ${newStatus}`);
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast(`New opening for "${jobTitle}" posted successfully!`);
    
    // Clear form
    setJobTitle("");
    setJobStipend("");
    setJobSkills("");
    setJobDesc("");
    setActiveTab("applicants");
  };

  const pendingCount = candidates.filter(c => c.status === "Applied").length;
  const shortlistedCount = candidates.filter(c => c.status === "Shortlisted" || c.status === "Interviewing").length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 glass-card bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Applicants</p>
              <h3 className="text-xl font-bold mt-1 text-foreground">
                {candidates.length} Registered
              </h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">AI Vet Shortlisted</p>
              <h3 className="text-xl font-bold mt-1 text-foreground">
                {shortlistedCount} Candidates
              </h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Needs Action</p>
              <h3 className="text-xl font-bold mt-1 text-foreground">
                {pendingCount} Pending Review
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-border/60 pb-px">
        <button
          onClick={() => setActiveTab("applicants")}
          className={`pb-4 px-4 font-semibold text-sm transition-all relative cursor-pointer ${
            activeTab === "applicants" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Applicants Pipeline
          {activeTab === "applicants" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("post")}
          className={`pb-4 px-4 font-semibold text-sm transition-all relative cursor-pointer ${
            activeTab === "post" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Post New Internship
          {activeTab === "post" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "applicants" && (
        <div className="glass-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border/60">
            <h3 className="font-bold text-foreground">AI-Vetted Candidate Pipeline</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review candidates matched by the Ministry of Corporate Affairs' scoring engine.
            </p>
          </div>
          
          <div className="divide-y divide-border/60">
            {candidates.map((cand) => (
              <div 
                key={cand.id} 
                className="p-6 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-foreground">{cand.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-muted-foreground">
                      {cand.role}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      Applied: {cand.dateApplied}
                    </span>
                    <span className="flex items-center gap-1.5">
                      Skills: {cand.skills.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-4">
                  {/* AI Score */}
                  <div className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                    cand.matchScore > 90 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                      : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
                  }`}>
                    <Sparkles className="w-4 h-4" />
                    {cand.matchScore}% Match
                  </div>

                  {/* Status Badge */}
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    cand.status === "Offered" ? "bg-emerald-500/10 text-emerald-500" :
                    cand.status === "Shortlisted" ? "bg-sky-500/10 text-sky-500" :
                    cand.status === "Interviewing" ? "bg-amber-500/10 text-amber-500" :
                    cand.status === "Applied" ? "bg-slate-500/10 text-slate-500" :
                    "bg-red-500/10 text-red-500"
                  }`}>
                    {cand.status}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    {cand.status === "Applied" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(cand.id, "Shortlisted")}
                          className="p-1.5 text-sky-500 hover:bg-sky-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Shortlist"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(cand.id, "Rejected")}
                          className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {cand.status === "Shortlisted" && (
                      <button
                        onClick={() => handleUpdateStatus(cand.id, "Interviewing")}
                        className="px-3 py-1.5 bg-amber-500 text-white font-bold text-xs rounded-lg hover:bg-amber-600 transition-colors cursor-pointer"
                      >
                        Start Interviews
                      </button>
                    )}
                    {cand.status === "Interviewing" && (
                      <button
                        onClick={() => handleUpdateStatus(cand.id, "Offered")}
                        className="px-3 py-1.5 bg-emerald-500 text-white font-bold text-xs rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                      >
                        Make Offer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "post" && (
        <div className="glass-card p-8 rounded-2xl border border-border/80">
          <form onSubmit={handlePostJob} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">Post a New AI-Matched Internship</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Provide details for the position. Students will be matched based on skills using the MCA algorithm.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Internship Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Backend Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full glass p-3 rounded-xl border border-border text-sm text-foreground focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Monthly Stipend</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₹40,000/mo"
                  value={jobStipend}
                  onChange={(e) => setJobStipend(e.target.value)}
                  className="w-full glass p-3 rounded-xl border border-border text-sm text-foreground focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Required Skills (Comma-separated)</label>
              <input
                type="text"
                required
                placeholder="e.g. Python, SQL, Docker, FastAPI"
                value={jobSkills}
                onChange={(e) => setJobSkills(e.target.value)}
                className="w-full glass p-3 rounded-xl border border-border text-sm text-foreground focus:border-primary outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description & Core Responsibilities</label>
              <textarea
                required
                rows={4}
                placeholder="Describe what the student will be working on..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                className="w-full glass p-3 rounded-xl border border-border text-sm text-foreground focus:border-primary outline-none transition-colors"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-border/60">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:scale-102 active:scale-98 transition-all hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Post Position
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
