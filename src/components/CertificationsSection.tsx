import type { Certification } from "../types/portfolio";
import TiltCard from "./TiltCard";
import { Award, CheckCircle } from "lucide-react";

export default function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-20 relative">
      <div className="flex flex-col items-start max-w-2xl border-b border-[var(--border)] pb-6">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
          <Award size={13} />
          <span>Credentials</span>
        </div>
        <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Certifications
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)]">
          Verified industry credentials in agentic AI, deep learning, cloud DevOps, and prompt engineering.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <TiltCard
            key={cert.title}
            maxTilt={4}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 backdrop-blur-xl hover:border-[var(--signal)]/40 transition-colors shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--signal)] font-semibold">{cert.issuer}</span>
                <span className="text-slate-400">{cert.year}</span>
              </div>

              <h3 className="font-display mt-2 text-sm font-bold text-white leading-snug">
                {cert.title}
              </h3>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-emerald-400">
              <span className="flex items-center gap-1">
                <CheckCircle size={12} />
                Verified
              </span>
              <span className="text-slate-500">Official</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
