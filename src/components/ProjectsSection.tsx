import type { Project } from "../types/portfolio";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const sorted = [...projects].sort((a, b) => Number(b.highlight) - Number(a.highlight));

  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--signal)]">Projects</p>
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Things I've shipped
      </h2>

      <div className="mt-12">
        {sorted.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} total={sorted.length} />
        ))}
      </div>
    </section>
  );
}
