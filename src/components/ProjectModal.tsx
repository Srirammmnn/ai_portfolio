import { useEffect } from "react";
import type { Project } from "../types/portfolio";
import { soundManager } from "../utils/audio";
import {
  X,
  Layers,
  Cpu,
  BarChart2,
  CheckCircle,
  ExternalLink,
  Github,
  Zap,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  githubUrl: string;
}

export default function ProjectModal({ project, onClose, githubUrl }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface-hi)] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="pr-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--signal)] font-semibold">
              Project Architecture & Deep-Dive
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-xs text-slate-400">{project.year}</span>
          </div>

          <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {project.title}
          </h2>
          <p className="mt-1 text-sm text-[var(--signal)] font-mono">{project.subtitle}</p>
        </div>

        {/* Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {project.metrics.map((m) => (
              <div
                key={m}
                className="rounded-xl border border-[var(--border)] bg-slate-900/60 p-3 text-center"
              >
                <div className="flex items-center justify-center gap-1 text-[var(--signal)] mb-1">
                  <Zap size={13} />
                </div>
                <div className="font-mono text-xs font-semibold text-white">{m}</div>
              </div>
            ))}
          </div>
        )}

        {/* Overview Description */}
        <div className="mt-6">
          <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-white uppercase tracking-wider mb-2">
            <Layers size={15} className="text-[var(--signal)]" />
            System Architecture & Implementation
          </h4>
          <p className="text-sm leading-relaxed text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-[var(--border)]">
            {project.description}
          </p>
        </div>

        {/* Architecture Pipeline Flow */}
        {project.architecture && project.architecture.length > 0 && (
          <div className="mt-6">
            <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">
              <Cpu size={15} className="text-[var(--signal)]" />
              Pipeline Execution Stages
            </h4>
            <div className="space-y-2">
              {project.architecture.map((stage, idx) => (
                <div
                  key={stage}
                  className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-200"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--signal)]/20 font-mono text-[10px] font-bold text-[var(--signal)]">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{stage}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engineering Challenges Solved */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="mt-6">
            <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">
              <BarChart2 size={15} className="text-[var(--signal)]" />
              Key Engineering Challenges Solved
            </h4>
            <ul className="space-y-2">
              {project.challenges.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                >
                  <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mt-6">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
            Technologies & Tools
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border)] bg-slate-900/90 px-3 py-1 font-mono text-xs text-[var(--signal)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
          <div className="font-mono text-xs text-slate-500">
            Role: <span className="text-slate-300">{project.role}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-slate-900 px-4 py-2 font-mono text-xs text-slate-300 hover:text-white hover:border-[var(--signal)] transition-colors"
            >
              <Github size={13} />
              View on GitHub
            </a>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-[var(--signal)] px-4 py-2 font-mono text-xs font-semibold text-slate-950 hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={13} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
