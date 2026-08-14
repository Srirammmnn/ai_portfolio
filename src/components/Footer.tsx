import { useState } from "react";
import { Copy, Check, Phone } from "lucide-react";
import type { Profile } from "../types/portfolio";
import SocialLinks from "./SocialLinks";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

export default function Footer({ profile }: { profile: Profile }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <footer id="contact" className="border-t border-[var(--border)] px-6 pt-20 pb-8">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div>
          <p className="font-display chrome-text text-2xl font-bold">{profile.name}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{profile.specialization}</p>
          <p className="mt-1 font-mono text-xs text-[var(--text-dim)]">{profile.location}</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-dim)]">Navigate</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-dim)]">Reach out</p>
          <button
            onClick={copyEmail}
            className="mt-4 flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            {profile.social.email}
            {copied ? <Check size={14} className="signal-text" /> : <Copy size={14} />}
          </button>
          {profile.social.phone && (
            <p className="mt-2.5 flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Phone size={14} /> {profile.social.phone}
            </p>
          )}
          <SocialLinks social={profile.social} className="mt-5" />
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 font-mono text-xs text-[var(--text-dim)] sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Built with React · Tailwind · Framer Motion</span>
      </div>
    </footer>
  );
}
