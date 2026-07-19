"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, CheckCircle2, User, Search, Award, FileText, Send, Sparkles } from "lucide-react";

type Internship = {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  skills: string[];
  matchScore: number;
  description: string;
};

type Application = {
  id: string;
  title: string;
  company: string;
  status: "Applied" | "Shortlisted" | "Interviewing" | "Offered" | "Rejected";
  date: string;
  matchScore: number;
};

const INITIAL_JOBS: Internship[] = [
  {
    id: "job-1",
    title: "AI & Machine Learning Intern",
    company: "Google India",
    location: "Bangalore (Hybrid)",
    stipend: "₹50,000/mo",
    skills: ["Python", "TensorFlow", "React", "Next.js"],
    matchScore: 98,
    description: "Work with Google's Genkit and Gemini teams to deploy intelligent agent interfaces."
  },
  {
    id: "job-2",
    title: "Full Stack Engineer",
    company: "Microsoft",
    location: "Hyderabad (Remote)",
    stipend: "₹45,000/mo",
    skills: ["TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
    matchScore: 94,
    description: "Develop high-performance frontends and microservices for cloud management portals."
  },
  {
    id: "job-3",
    title: "Data Analyst & Researcher",
    company: "Infosys",
    location: "Bangalore (On-site)",
    stipend: "₹35,000/mo",
    skills: ["Python", "SQL", "Tableau", "Pandas"],
    matchScore: 82,
    description: "Analyze enterprise business data pipelines to identify bottlenecks and optimize storage."
  },
  {
    id: "job-4",
    title: "Cloud Engineering Intern",
    company: "Amazon Web Services",
    location: "Pune (Hybrid)",
    stipend: "₹48,000/mo",
    skills: ["AWS", "Docker", "Python", "Kubernetes"],
    matchScore: 75,
    description: "Assist in deploying serverless architectures and Kubernetes clusters for global clients."
  }
];

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    title: "Frontend Engineer Intern",
    company: "Vercel",
    status: "Shortlisted",
    date: "2026-07-15",
    matchScore: 96
  },
  {
    id: "app-2",
    title: "Software Engineer",
    company: "Uber",
    status: "Interviewing",
    date: "2026-07-10",
    matchScore: 91
  }
];

export function StudentView() {
  const [studentName, setStudentName] = useState("Akash Konchigeri");
  const [skills, setSkills] = useState("React, Next.js, TypeScript, Python, Tailwind CSS");
  const [jobs, setJobs] = useState<Internship[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"matching" | "applications" | "profile">("matching");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Load from local storage
  useEffect(() => {
    const savedName = localStorage.getItem("studentName");
    const savedSkills = localStorage.getItem("studentSkills");
    const savedApps = localStorage.getItem("studentApplications");
    
    if (savedName) setStudentName(savedName);
    if (savedSkills) setSkills(savedSkills);
    if (savedApps) setApplications(JSON.parse(savedApps));
  }, []);

  // Update matching scores based on skills
  useEffect(() => {
    const skillList = skills.toLowerCase().split(",").map(s => s.trim()).filter(s => s.length > 0);
    const updatedJobs = INITIAL_JOBS.map(job => {
      let matches = 0;
      job.skills.forEach(skill => {
        if (skillList.some(s => s.includes(skill.toLowerCase()) || skill.toLowerCase().includes(s))) {
          matches++;
        }
      });
      const matchScore = Math.min(100, Math.max(30, Math.round((matches / job.skills.length) * 100) + 15));
      return { ...job, matchScore };
    }).sort((a, b) => b.matchScore - a.matchScore);
    
    setJobs(updatedJobs);
  }, [skills]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleApply = (job: Internship) => {
    // Check if already applied
    if (applications.some(app => app.company === job.company && app.title === job.title)) {
      triggerToast(`You have already applied to ${job.company}`);
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      title: job.title,
      company: job.company,
      status: "Applied",
      date: new Date().toISOString().split("T")[0],
      matchScore: job.matchScore
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);
    localStorage.setItem("studentApplications", JSON.stringify(updatedApps));
    triggerToast(`Application submitted successfully to ${job.company}!`);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("studentName", studentName);
    localStorage.setItem("studentSkills", skills);
    triggerToast("Profile updated successfully!");
    setActiveTab("matching");
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 glass-card bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Verification Status</p>
              <h3 className="text-lg font-bold mt-1 flex items-center gap-1.5 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified student
              </h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-all duration-500"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">AI Avg Match Rate</p>
              <h3 className="text-lg font-bold mt-1 text-foreground">
                91.5% Compatibility
              </h3>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.01] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 text-accent rounded-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Applied Openings</p>
              <h3 className="text-lg font-bold mt-1 text-foreground">
                {applications.length} Submitted
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-border/60 pb-px">
        <button
          onClick={() => setActiveTab("matching")}
          className={`pb-4 px-4 font-semibold text-sm transition-all relative cursor-pointer ${
            activeTab === "matching" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          AI Matched Internships
          {activeTab === "matching" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`pb-4 px-4 font-semibold text-sm transition-all relative cursor-pointer ${
            activeTab === "applications" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          My Applications
          {activeTab === "applications" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-4 px-4 font-semibold text-sm transition-all relative cursor-pointer ${
            activeTab === "profile" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Resume & Profile
          {activeTab === "profile" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "matching" && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="flex items-center gap-3 glass p-2 rounded-xl border border-border">
            <Search className="w-5 h-5 text-muted-foreground ml-2" />
            <input
              type="text"
              placeholder="Search by role, company, or tech stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-0 outline-none w-full text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg transition-all flex flex-col justify-between border border-border/80"
              >
                {/* Match indicator glow */}
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                  style={{ backgroundColor: job.matchScore > 90 ? '#10b981' : '#6366f1' }}
                />
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground">
                        {job.company}
                      </span>
                      <h4 className="text-lg font-bold text-foreground mt-2">{job.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{job.location}</p>
                    </div>
                    {/* Radial score glow */}
                    <div className="flex flex-col items-center">
                      <div className={`text-xs font-black px-2.5 py-1.5 rounded-xl border flex items-center gap-1 ${
                        job.matchScore > 90 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
                      }`}>
                        <Sparkles className="w-3.5 h-3.5" />
                        {job.matchScore}% Fit
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 rounded-md bg-primary/5 text-primary border border-primary/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/60">
                  <span className="text-sm font-semibold text-emerald-500">{job.stipend}</span>
                  <button
                    onClick={() => handleApply(job)}
                    className="px-4 py-2 text-xs font-bold bg-primary text-white rounded-xl hover:scale-102 active:scale-98 transition-all hover:shadow-lg cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="col-span-2 text-center py-12 glass-card rounded-2xl border border-dashed border-border/80">
                <p className="text-muted-foreground text-sm">No matched internships found for "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "applications" && (
        <div className="glass-card rounded-2xl overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-border text-xs text-muted-foreground uppercase font-bold">
                  <th className="p-4">Internship & Company</th>
                  <th className="p-4">Date Applied</th>
                  <th className="p-4">AI Score</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-sm text-foreground">{app.title}</div>
                      <div className="text-xs text-muted-foreground">{app.company}</div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{app.date}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-500">
                        <Sparkles className="w-3.5 h-3.5" />
                        {app.matchScore}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        app.status === "Offered" ? "bg-emerald-500/10 text-emerald-500" :
                        app.status === "Shortlisted" ? "bg-sky-500/10 text-sky-500" :
                        app.status === "Interviewing" ? "bg-amber-500/10 text-amber-500" :
                        app.status === "Applied" ? "bg-slate-500/10 text-slate-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-sm text-muted-foreground">
                      No applications submitted yet. Go to "AI Matched Internships" to apply!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <div className="glass-card p-8 rounded-2xl border border-border/80">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">Verify & Edit Profile Details</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Our AI engine recalculates your matching scores in real-time as you update your skills and experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  className="w-full glass p-3 rounded-xl border border-border text-sm text-foreground focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Institution / College</label>
                <input
                  type="text"
                  value="Ramaiah Institute of Technology (RIT)"
                  disabled
                  className="w-full glass p-3 rounded-xl border border-border text-sm text-muted-foreground bg-slate-100/10 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Skills (Comma-separated)</label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={3}
                required
                className="w-full glass p-3 rounded-xl border border-border text-sm text-foreground focus:border-primary outline-none transition-colors"
                placeholder="e.g. React, Next.js, TypeScript, Python, TensorFlow"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-border/60">
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:scale-102 active:scale-98 transition-all hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Save Profile Details
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
