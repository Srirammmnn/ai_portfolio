import type { Experience } from "../types/portfolio";

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--signal)]">Experience</p>
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Where I've built
      </h2>

      <div className="mt-12 divide-y divide-[var(--border)] border-t border-[var(--border)]">
        {experience.map((exp, i) => (
          <div key={exp.company} className="grid gap-6 py-10 md:grid-cols-[80px_1fr]">
            <span className="font-mono text-sm text-[var(--text-dim)]">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-xl font-semibold">
                  {exp.role} <span className="text-[var(--text-muted)]">— {exp.company}</span>
                </h3>
                <span className="font-mono rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)]">
                  {exp.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--text-dim)]">{exp.location}</p>
              <p className="mt-4 text-[var(--text-muted)]">{exp.summary}</p>

              <ul className="mt-5 space-y-2.5">
                {exp.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--signal)]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
