import type { Experience } from "../types/portfolio";
import TiltCard from "./TiltCard";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 relative">
      <div className="flex flex-col items-start max-w-2xl border-b border-[var(--border)] pb-6">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
          <Briefcase size={13} />
          <span>Experience</span>
        </div>
        <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Where I've Built & Shipped
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)]">
          Hands-on AI/ML engineering, chatbot automation, and real-time backend API optimization.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {experience.map((exp) => (
          <TiltCard
            key={exp.company}
            maxTilt={4}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:border-[var(--signal)]/40 transition-colors"
          >
            {/* Header: Role, Company, Period */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border)] pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span className="text-[var(--signal)] font-medium">Internship</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={11} />
                    {exp.location}
                  </span>
                </div>
                <h3 className="font-display mt-1 text-xl sm:text-2xl font-bold text-white">
                  {exp.role}{" "}
                  <span className="text-[var(--signal)]">@ {exp.company}</span>
                </h3>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-slate-900/80 px-3 py-1 font-mono text-xs text-slate-300">
                <Calendar size={12} className="text-[var(--signal)]" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Quick Metrics */}
            {exp.metrics && (
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {exp.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-[var(--border)] bg-slate-900/50 p-2.5 text-center"
                  >
                    <div className="font-mono text-lg font-bold text-[var(--signal)]">
                      {m.value}
                    </div>
                    <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Core Achievements */}
            <div className="mt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exp.highlights.slice(0, 4).map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-800/60 bg-slate-950/40 p-3 text-xs leading-relaxed text-slate-300"
                  >
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0 text-[var(--signal)]"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
