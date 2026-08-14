import type { Profile, Education } from "../types/portfolio";

interface Props {
  profile: Profile;
  education: Education[];
}

export default function AboutSection({ profile, education }: Props) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--signal)]">About</p>
      <h2 className="font-display mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
        {profile.specialization}
      </h2>

      <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <p
          className="max-w-xl text-lg leading-relaxed text-[var(--text-muted)]"
          style={{ overflowWrap: "normal", wordBreak: "normal" }}
        >
          {profile.bio}
        </p>

        <div className="flex flex-col gap-6">
          {education.map((ed) => (
            <div key={ed.degree} className="border-l-2 border-[var(--border)] pl-5">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-dim)]">
                {ed.period}
              </p>
              <p className="font-display mt-1 font-semibold">{ed.degree}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{ed.institution}</p>
              {ed.image && (
                <img src={ed.image} alt={ed.institution} className="mt-3 w-full h-32 object-cover rounded-md border border-[var(--border)]" />
              )}
              <p className="mt-2 font-mono text-xs text-[var(--signal)]">{ed.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
