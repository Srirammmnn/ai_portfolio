import type { Project } from "../types/portfolio";
import TiltCard from "./TiltCard";
import { soundManager } from "../utils/audio";
import {
  Sparkles,
  Layers,
  Zap,
  Github,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onOpenDetails: (project: Project) => void;
  githubUrl: string;
}

export default function ProjectCard({
  project,
  index,
  total,
  onOpenDetails,
  githubUrl,
}: ProjectCardProps) {
  return (
    <TiltCard
      maxTilt={5}
      className={`group rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200 shadow-lg flex flex-col justify-between ${
        project.highlight
          ? "border-[var(--signal)]/40 bg-[var(--surface-hi)] hover:border-[var(--signal)]"
          : "border-[var(--border)] bg-[var(--surface)] hover:border-slate-700"
      }`}
    >
      <div>
        {/* Top Header: Index & Category */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[var(--text-dim)]">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {project.highlight && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--signal)]/15 border border-[var(--signal)]/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--signal)] font-semibold">
                <Sparkles size={11} />
                Featured
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-slate-400">{project.year}</span>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-4">
          <h3 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-[var(--signal)] transition-colors">
            {project.title}
          </h3>
          <p className="mt-1 text-xs font-mono text-[var(--signal)] line-clamp-1">
            {project.subtitle}
          </p>
        </div>

        {/* Short Description */}
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--text-muted)] line-clamp-3">
          {project.description}
        </p>

        {/* Key Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.metrics.slice(0, 2).map((metric) => (
              <span
                key={metric}
                className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-slate-200"
              >
                <Zap size={10} className="text-[var(--signal)]" />
                {metric}
              </span>
            ))}
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="mt-3 flex flex-wrap gap-1">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--border)] bg-slate-950/60 px-2 py-0.5 font-mono text-[10px] text-slate-400"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="rounded-md px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
              +{project.stack.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-[var(--border)] pt-4">
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenDetails(project);
          }}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-hi)] px-3 py-1 font-mono text-xs text-white hover:border-[var(--signal)] hover:text-[var(--signal)] transition-all"
        >
          <Layers size={12} />
          <span>Architecture</span>
          <ChevronRight size={12} />
        </button>

        <div className="flex items-center gap-1.5">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="p-1.5 rounded-full border border-[var(--border)] text-slate-400 hover:text-white hover:border-[var(--signal)] transition-colors"
            title="GitHub"
          >
            <Github size={13} />
          </a>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-1 rounded-full bg-[var(--signal)] px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-950 hover:opacity-90 transition-opacity"
            >
              <span>Demo</span>
              <ArrowUpRight size={11} />
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
