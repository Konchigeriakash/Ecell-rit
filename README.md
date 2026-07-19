# AI-Powered Internship Matching Platform (Ministry of Corporate Affairs)
### Engineered by Entrepreneurship Cell, Ramaiah Institute of Technology (RIT)

A brand-new, premium, state-of-the-art Web Application designed for the **Ministry of Corporate Affairs (Government of India)** to connect technical students with corporate opportunities via an AI-driven matchmaking grid.

## 🚀 Key Features

* **Interactive Multi-Node Dashboard**: Swappable interfaces for different users in the ecosystem:
  - **Student Node**: Real-time AI Match compatibility score, profile skill editing, live internship matching list, and application tracking history.
  - **Corporate Node**: Form to post new openings and applicant pipeline logs with AI Match grades and action buttons (Shortlist, Interview, Offer, Reject).
  - **Institute Node (RIT)**: CGPA/USN verification queue, approved credential updates, and custom animated department placement rate charts.
  - **Admin Control Node**: Platform metrics overview (Placement rate, corporate partners, Vertex engine latency tracker), system health, and secure audit logs.
* **Multi-Dashboard State Synchronization**: Student actions (applying to a job) instantly populate on the Corporate review pipeline; Corporate actions (shortlisting or hiring) instantly reflect in the Student's tracking log via persistent local store synchronizers.
* **AI Floating Chatbot Widget**: Integrated portal helper using simulated Gemini & Genkit nodes. Features suggested questions, microphone mic waves animation mockup, and Text-to-Speech (speechSynthesis) options.
* **Sleek, Premium Design**: High-fidelity dark mode styling, custom glassmorphism components (`backdrop-blur-md`), smooth glowing visual circles, and micro-hover CSS animations.
* **Bulletproof Build & React 19 Compatibility**: Uses modern Next.js 16 (Turbopack compiler), React 19, and Tailwind CSS v4. Standardizes visual metrics using pure SVG visualizations (donut and columns) to prevent peer-dependency errors during production compilations.

---

## 🛠️ Technology Stack

* **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Runtime**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 💻 Getting Started

### Prerequisites

* Node.js v18.x or above
* npm v9.x or above

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Konchigeriakash/Ecell-rit.git
   cd Ecell-rit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. Verify optimized build:
   ```bash
   npm run build
   ```

---

## 📂 Project Architecture

```text
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Multi-role dashboard shell workspace
│   │   ├── globals.css         # Custom animations & glassmorphic utility rules
│   │   ├── layout.tsx          # Root theme integration and SEO meta attributes
│   │   └── page.tsx            # Premium landing visual home page
│   ├── components/
│   │   ├── chatbot.tsx         # AI Floating Assistant with TTS and mic animations
│   │   ├── theme-provider.tsx  # Core Theme Context for dark/light selection
│   │   ├── theme-toggle.tsx    # sun/moon switcher button
│   │   └── dashboard/
│   │       ├── student-view.tsx   # Student job lists and profile skill inputs
│   │       ├── company-view.tsx   # Company posting panels and hiring logs
│   │       ├── institute-view.tsx # RIT USN credential vetting and SVG graphs
│   │       └── admin-view.tsx     # National stats monitor and event logs
└── package.json
```

---

## 🌟 Showcasing on LinkedIn

This project is tailored to be extremely visual and interactive, making it perfect for video recordings and screenshots:
1. **Interactive Swapper**: Select different roles using the dropdown in the header to demonstrate student, corporate, academic, and administrative flows.
2. **Real-time Recalculations**: Modify skills in the Student profile tab, click save, and watch match percentages immediately adapt.
3. **Responsive UI**: Test the collapsing mobile sidebar, dark mode sun/moon toggle, and floating assistant animations.
4. **TTS Sound**: Click the Volume icon in the AI Chatbot header and ask a question to listen to speech synthesis output.

---
*Developed under the guidelines of E-Cell Ramaiah Institute of Technology for the Ministry of Corporate Affairs, Government of India.*
