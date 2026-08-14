import { motion } from "framer-motion";
import type { Profile } from "../types/portfolio";
import SocialLinks from "./SocialLinks";
import AgentAvatar from "./AgentAvatar";

export default function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section
      id="home"
      className="relative grid min-h-screen grid-rows-[auto_1fr_auto] overflow-hidden px-6 pt-28 pb-12"
    >
      {/* ambient grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-dim)]"
        >
          {profile.role} · {profile.location}
        </motion.p>

        <h1 className="font-display mt-6 whitespace-nowrap chrome-text font-extrabold leading-none tracking-tight text-[clamp(3rem,13vw,9.5rem)]">
          Hi, I'm {profile.shortName}
        </h1>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 items-center justify-center">
        <AgentAvatar className="w-56 h-48 sm:w-72 sm:h-60" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <p className="font-body text-lg text-[var(--text-muted)] sm:text-xl">{profile.tagline}</p>
        
        <a 
          href="/SRiram.Resume.pdf" 
          download="Sriram_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 font-mono text-sm font-medium text-[var(--bg)] transition-transform hover:scale-105 active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          DOWNLOAD RESUME
        </a>

        <SocialLinks social={profile.social} />
      </div>
    </section>
  );
}
