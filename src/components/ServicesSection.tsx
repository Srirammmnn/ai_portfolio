import { useState } from "react";
import type { Skills } from "../types/portfolio";
import { soundManager } from "../utils/audio";
import TiltCard from "./TiltCard";
import { Cpu, Sparkles, Database, Server, Terminal } from "lucide-react";

export default function ServicesSection({ skills }: { skills: Skills }) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", ...skills.categories.map((c) => c.name)];

  const getCategoryIcon = (name: string) => {
    if (name.includes("Generative") || name.includes("AI")) return Sparkles;
    if (name.includes("RAG") || name.includes("Database")) return Database;
    if (name.includes("Backend") || name.includes("Cloud")) return Server;
    return Terminal;
  };

  const filtered = skills.categories.filter(
    (c) => activeTab === "All" || c.name === activeTab
  );

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
            <Cpu size={13} />
            <span>Tech Stack</span>
          </div>
          <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Technical Skills & Tools
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)]">
            Specialized toolset across LLM orchestration, vector databases, backend microservices, and cloud MLOps.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(cat);
              }}
              className={`rounded-full px-3 py-1 font-mono text-xs transition-all ${
                activeTab === cat
                  ? "bg-[var(--signal)] text-slate-950 font-semibold"
                  : "bg-[var(--surface)] border border-[var(--border)] text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Clean Skill Clusters */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cat) => {
          const Icon = getCategoryIcon(cat.name);
          return (
            <TiltCard
              key={cat.name}
              maxTilt={4}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 backdrop-blur-xl shadow-md hover:border-[var(--signal)]/40 transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 rounded-lg bg-slate-900 text-[var(--signal)] border border-slate-800">
                  <Icon size={15} />
                </div>
                <h3 className="font-display font-semibold text-sm text-white">{cat.name}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-slate-950/70 px-2 py-0.5 font-mono text-[11px] text-slate-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-[var(--signal)]" />
                    {item}
                  </span>
                ))}
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
