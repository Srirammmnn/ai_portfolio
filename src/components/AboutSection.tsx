import type { Profile, Education, Language } from "../types/portfolio";
import TiltCard from "./TiltCard";
import { GraduationCap, Sparkles, Languages, Heart } from "lucide-react";

interface AboutProps {
  profile: Profile;
  education: Education[];
  languages: Language[];
  interests: string[];
}

export default function AboutSection({
  profile,
  education,
  languages,
  interests,
}: AboutProps) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 relative">
      <div className="flex flex-col items-start max-w-2xl border-b border-[var(--border)] pb-6">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
          <Sparkles size={13} />
          <span>About Me</span>
        </div>
        <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Background & Education
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)]">
          Computer Science graduate with deep hands-on expertise in artificial intelligence and backend architecture.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Bio & Quick Facts */}
        <div className="lg:col-span-5 space-y-5">
          <TiltCard
            maxTilt={4}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 backdrop-blur-xl shadow-lg"
          >
            <h3 className="font-display font-bold text-base text-white mb-2">
              Engineering Focus
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              {profile.bio}
            </p>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <span className="font-mono text-[11px] text-[var(--signal)] font-semibold uppercase tracking-wider block mb-1">
                Specialization
              </span>
              <p className="font-mono text-xs text-slate-300">
                {profile.specialization}
              </p>
            </div>
          </TiltCard>

          {/* Languages & Interests Combined into One Neat Card */}
          <TiltCard
            maxTilt={4}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 backdrop-blur-xl shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Languages size={14} className="text-[var(--signal)]" />
              <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                Languages & Interests
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {languages.map((l) => (
                <span
                  key={l.name}
                  className="rounded-md border border-[var(--border)] bg-slate-900/80 px-2.5 py-1 font-mono text-[11px] text-slate-200"
                >
                  <span className="font-semibold text-white">{l.name}</span>{" "}
                  <span className="text-[var(--signal)]">({l.proficiency.split(" ")[0]})</span>
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center gap-1.5 flex-wrap">
              <Heart size={13} className="text-rose-400 mr-1 shrink-0" />
              {interests.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </TiltCard>
        </div>

        {/* Right: Education Cards */}
        <div className="lg:col-span-7 space-y-4">
          {education.map((ed) => (
            <TiltCard
              key={ed.degree}
              maxTilt={4}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 backdrop-blur-xl shadow-lg overflow-hidden"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                    <GraduationCap size={13} className="text-[var(--signal)]" />
                    <span>{ed.period}</span>
                  </div>
                  <h3 className="font-display mt-1 text-lg font-bold text-white">
                    {ed.degree}
                  </h3>
                  <p className="text-xs text-[var(--signal)] font-medium mt-0.5">
                    {ed.institution}
                  </p>
                </div>

                <div className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 font-mono text-xs font-semibold text-emerald-400">
                  {ed.detail}
                </div>
              </div>

              {ed.image && (
                <div className="mt-4 relative h-36 w-full overflow-hidden rounded-xl border border-[var(--border)]">
                  <img
                    src={ed.image}
                    alt={ed.institution}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent" />
                </div>
              )}
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
