import { useState, useEffect } from "react";
import type { Profile } from "../types/portfolio";
import { soundManager } from "../utils/audio";
import { ArrowUp } from "lucide-react";

export default function Footer({ profile }: { profile: Profile }) {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Coimbatore (IST / Asia/Kolkata)
      const istTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setLocalTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-slate-950/80 backdrop-blur-xl py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Status */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-white text-lg">
              {profile.name}
            </span>
            <span className="rounded bg-[var(--signal)]/15 px-2 py-0.5 font-mono text-[10px] text-[var(--signal)]">
              AI/ML Engineer
            </span>
          </div>
          <p className="font-mono text-xs text-[var(--text-dim)] mt-1">
            Coimbatore, India · Local Time:{" "}
            <span className="text-[var(--signal)]">{localTime || "IST"}</span>
          </p>
        </div>

        {/* Center: Tech note */}
        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <span>Engineered with React 19, Three.js 3D & Tailwind</span>
        </div>

        {/* Right: Scroll to top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-slate-900/80 px-4 py-2 font-mono text-xs text-slate-300 hover:text-white hover:border-[var(--signal)] transition-all shadow-md active:scale-95"
          >
            <span>Back to Top</span>
            <ArrowUp size={13} className="text-[var(--signal)]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
