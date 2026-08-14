import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types/portfolio";

interface Props {
  project: Project;
  index: number;
  total: number;
}

export default function ProjectCard({ project, index, total }: Props) {
  const top = 96 + index * 16;

  return (
    <div
      className="sticky mb-6"
      style={{ top, zIndex: index + 1 }}
    >
      <div
        className={`rounded-2xl border p-8 sm:p-10 ${
          project.highlight
            ? "border-[var(--signal)]/40 bg-[var(--surface-hi)]"
            : "border-[var(--border)] bg-[var(--surface)]"
        }`}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--text-dim)]">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              {project.highlight && (
                <span className="font-mono rounded-full bg-[var(--signal)]/15 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-[var(--signal)]">
                  Featured
                </span>
              )}
            </div>
            <h3 className="font-display mt-3 text-2xl font-semibold sm:text-3xl">{project.title}</h3>
            <p className="mt-1 text-sm text-[var(--text-dim)]">{project.subtitle}</p>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-[var(--text)] transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
            >
              Live project <ArrowUpRight size={14} />
            </a>
          )}
        </div>

        <p className="mt-6 max-w-2xl leading-relaxed text-[var(--text-muted)]">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4 font-mono text-xs text-[var(--text-dim)]">
          <span>{project.role}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
      </div>
    </div>
  );
}
