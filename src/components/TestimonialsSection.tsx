import type { Testimonial } from "../types/portfolio";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  const track = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-[var(--surface)] py-24">
      <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-[var(--signal)]">
        Testimonials
      </p>
      <h2 className="font-display mt-3 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
        What people say
      </h2>

      <div className="mt-12 overflow-hidden">
        <div className="marquee-track flex w-max gap-6 px-6">
          {track.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="w-80 shrink-0 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6"
            >
              <span aria-hidden className="text-2xl">
                💬
              </span>
              <p className="mt-4 text-sm italic leading-relaxed text-[var(--text-muted)]">
                "{t.quote}"
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-semibold text-black"
                  style={{ backgroundColor: t.avatarColor }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest">{t.name}</p>
                  <p className="text-xs text-[var(--text-dim)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
