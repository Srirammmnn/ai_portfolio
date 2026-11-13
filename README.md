# Sriram M — Interactive 3D AI/ML Portfolio

A production-grade, interactive 3D personal portfolio website engineered for **Sriram M** (AI/ML Engineer & Backend Systems Specialist), showcasing autonomous multi-agent systems, enterprise RAG pipelines, LLM fine-tuning, and high-concurrency FastAPI backends.

Built with **React 19**, **Three.js (WebGL 3D)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Canvas Confetti**.

---

## ✨ Key Features & Interactive Architecture

### 1. 🌐 Real-Time Interactive 3D WebGL Canvas (`ThreeCanvas.tsx`)
- **Three Visual 3D Modes**:
  - `Neural Core`: Geodesic icosahedron wireframe with glowing node vertices, inner pulsating nucleus, and orbiting gyroscope rings.
  - `Agent Swarm`: 260+ dynamic particles forming a swirling interconnected galaxy with real-time distance-based synaptic connection lines.
  - `Quantum Torus`: Intertwined mathematical torus knot with scanning light waves.
- **Mouse & Pointer Physics**:
  - Drag to orbit and inspect the 3D model.
  - Dynamic cursor parallax tilt with smooth damping inertia.
  - Click to fire synaptic energy pulses with audio feedback.
  - Auto-rotation toggle and live WebGL FPS / node stats.

### 2. ⚡ Live Multi-Agent RAG Playground (`AgentSimulator.tsx`)
- An interactive live sandbox directly demonstrating Sriram's **LangGraph + FastAPI** architecture.
- Real-time step-by-step pipeline visualization:
  - Step 1: Autonomous Query Router (`RouterAgent`)
  - Step 2: Hybrid RRF Dense (Qdrant) + Sparse (BM25) Retrieval (`RetrieverAgent`)
  - Step 3: Model Context Protocol (MCP) Tool Calling (`ToolCallerAgent`)
  - Step 4: RAGAS Guardrails & Faithfulness Validation (`EvaluatorAgent`)
- Streamed responses with real-time telemetry stats (Latency: ~168ms, RAGAS Faithfulness: 98.6%, Token usage).

### 3. 🎨 Curated Design System & 4 Theme Palettes (`ThemeSelector.tsx`)
- **Quantum Cyan (Default)**: Electric Cyan (`#00f5d4`) + Neural Violet (`#8b5cf6`) on Obsidian.
- **Cyber Emerald**: Matrix Emerald (`#10b981`) + Lime (`#84cc16`) on Carbon.
- **Solar Flare**: Sunset Coral (`#f43f5e`) + Amber Gold (`#f59e0b`) on Deep Onyx.
- **Hyper Violet**: Synthesizer Violet (`#a855f7`) + Ice Cyan (`#38bdf8`) on Midnight Void.
- Persistent user preference saved in `localStorage`.

### 4. 🎴 3D Tilt Cards with Specular Glare (`TiltCard.tsx`)
- Realistic physics-based perspective rotation (`perspective(1000px) rotateX(...) rotateY(...)`) on mouse move.
- Dynamic radial glare highlight that follows cursor position.

### 5. 🔍 Command Palette (`CommandPalette.tsx`)
- Press **`Ctrl + K`** or **`Cmd + K`** (or click the search button in the navbar) to open the interactive command hub.
- Rapid keyboard navigation (arrow keys + Enter) to jump to any section, project, or execute actions (Download Resume, Copy Email/Phone, Open Socials).

### 6. 🔊 Zero-Latency Web Audio API Synthesizer (`audio.ts`)
- Subtle futuristic audio clicks, hovers, pulse chimes, and celebration chimes generated purely with native Web Audio oscillators (no external MP3/WAV files to load).
- Global mute/unmute toggle in the navbar.

### 7. 🏗️ Project Architecture Deep-Dive Modals (`ProjectModal.tsx`)
- Detailed modal dialogs for each project featuring:
  - System architecture flow diagrams
  - Benchmark impact metrics
  - Engineering challenges solved
  - Technology stack chips and direct GitHub links

### 8. 📄 100% Comprehensive Content from Resume
- **ROR Technologies Internship**: ~40% query resolution reduction across 500+ daily chats, 0.91 AUC-ROC on 150K rows, sub-200ms async FastAPI inference, Celery/Redis pipeline cut from 4h to 45m, Docker/AWS EC2 CI/CD.
- **5 Detailed Projects**:
  1. *Enterprise Multi-Agent RAG Knowledge Assistant* (LangGraph, MCP, Qdrant, RAGAS, FastAPI)
  2. *Customer Support LLM Fine-Tuning & Serving* (Llama-3.1-8B, QLoRA, vLLM, MLflow)
  3. *Gym Membership Retention Automation Platform* (n8n, React, WhatsApp Business API, Supabase)
  4. *Customer Churn Prediction ML System* (XGBoost, Scikit-learn, Optuna, FastAPI)
  5. *AI Virtual Mouse Using Hand Gestures* (OpenCV, MediaPipe, PyAutoGUI)
- **6 Verified Certifications**: Udemy (Agentic Engineer 2025), Coursera (Deep Learning, Generative AI IBM, Prompt Engineering), AWS Training (DevOps on AWS), GeeksforGeeks (Python).
- **Education**: MCA at Kumaraguru College of Technology (GPA: 8.4/10) & BCA at PSG College of Arts and Science (GPA: 7.0/10) with campus photos.
- **Languages & Interests**: English, Tamil, Kannada · Traveling, Fitness, Coding, MotoGP, Formula 1.
- **Contact Hub**: Email, Phone/WhatsApp, instant clipboard copy with visual feedback, and direct contact form.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
The optimized static build will be generated in `dist/`.

### 4. Deploy to Netlify / Vercel
Deploy the `dist/` directory directly to Netlify (such as your `portfolio33my.netlify.app`), Vercel, or GitHub Pages.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **3D Graphics**: Three.js (WebGL Canvas)
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Animations**: Framer Motion, Canvas Confetti
- **Icons**: Lucide React
- **Audio**: Native Web Audio API
