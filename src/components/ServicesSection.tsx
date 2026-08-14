import type { Skills } from "../types/portfolio";

export default function ServicesSection({ skills }: { skills: Skills }) {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--signal)]">Skills</p>
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        What I work with
      </h2>

      <div className="mt-12 divide-y divide-[var(--border)] border-t border-[var(--border)]">
        {skills.categories.map((cat, i) => (
          <div key={cat.name} className="grid gap-4 py-8 md:grid-cols-[80px_180px_1fr] md:items-baseline">
            <span className="font-mono text-sm text-[var(--text-dim)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display font-semibold">{cat.name}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="font-mono rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
