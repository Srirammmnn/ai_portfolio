import { useState } from "react";
import type { Project } from "../types/portfolio";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { soundManager } from "../utils/audio";
import { Code2 } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  githubUrl: string;
}

export default function ProjectsSection({ projects, githubUrl }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterCategories = [
    { id: "all", label: "All Projects" },
    { id: "genai", label: "GenAI & RAG" },
    { id: "ml", label: "ML & Vision" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "genai") return p.id === "multi-agent-rag" || p.id === "llm-fine-tuning" || p.id === "gym-automation";
    if (filter === "ml") return p.id === "churn-prediction" || p.id === "ai-virtual-mouse";
    return true;
  });

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
            <Code2 size={13} />
            <span>Portfolio</span>
          </div>
          <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Featured AI Systems & Projects
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)] max-w-xl">
            Autonomous multi-agent swarms, QLoRA fine-tuning, computer vision, and production ML pipelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {filterCategories.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                soundManager.playClick();
                setFilter(f.id);
              }}
              className={`rounded-full px-3 py-1 font-mono text-xs transition-all ${
                filter === f.id
                  ? "bg-[var(--signal)] text-slate-950 font-semibold shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                  : "bg-[var(--surface)] border border-[var(--border)] text-slate-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((p, idx) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={idx}
            total={filteredProjects.length}
            onOpenDetails={(proj) => setSelectedProject(proj)}
            githubUrl={githubUrl}
          />
        ))}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        githubUrl={githubUrl}
      />
    </section>
  );
}
