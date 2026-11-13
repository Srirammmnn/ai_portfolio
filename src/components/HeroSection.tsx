import { motion } from "framer-motion";
import type { Profile, StatItem } from "../types/portfolio";
import SocialLinks from "./SocialLinks";
import TiltCard from "./TiltCard";
import { soundManager } from "../utils/audio";
import confetti from "canvas-confetti";

interface HeroProps {
  profile: Profile;
  stats: StatItem[];
}

export default function HeroSection({ profile }: HeroProps) {
  const handleDownload = () => {
    soundManager.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ff6a00", "#f97316", "#fb923c"],
      });
    } catch {}
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-16 px-6 overflow-hidden flex flex-col justify-center bg-[#111113]"
    >
      <div className="relative z-10 mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Exactly Matching Reference Layout */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Greeting */}
          <p className="font-display text-sm sm:text-base font-medium text-zinc-400 tracking-wide">
            HI I am
          </p>

          {/* Name */}
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
            {profile.name}
          </h2>

          {/* Large Orange Role Headline matching 'UI/UX designer' in reference */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--signal)] tracking-tight mt-1 mb-4 leading-none">
            {profile.role}
          </h1>

          {/* Short, sweet description */}
          <p className="font-body text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed mb-6">
            Building autonomous Multi-Agent RAG pipelines, fine-tuned LLMs with QLoRA, and high-concurrency FastAPI microservices with sub-200ms latency.
          </p>

          {/* Circular Social Media Icons Strip */}
          <div className="mb-6">
            <SocialLinks social={profile.social} />
          </div>

          {/* Two Action Buttons: Solid Orange 'Hire Me' + Dark Outlined 'Download CV' */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onClick={() => soundManager.playClick()}
              className="rounded-lg bg-[var(--signal)] px-7 py-3 font-display text-sm font-bold text-black transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-[var(--signal)]/25"
            >
              Hire Me
            </a>

            <a
              href="/SRiram.Resume.pdf"
              download="Sriram_Resume.pdf"
              onClick={handleDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-700 bg-zinc-900/80 px-7 py-3 font-display text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:border-zinc-500 active:scale-95"
            >
              Download CV
            </a>
          </div>

          {/* Floating Dark Stats Card at Bottom Left matching reference */}
          <div className="mt-10 rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-6 sm:gap-10 w-full sm:w-auto">
            <div className="text-left">
              <div className="font-display text-xl sm:text-2xl font-bold text-[var(--signal)]">
                6mo+
              </div>
              <div className="font-display text-xs text-zinc-400 mt-0.5">
                Experience
              </div>
            </div>

            <div className="h-8 w-[1px] bg-zinc-800" />

            <div className="text-left">
              <div className="font-display text-xl sm:text-2xl font-bold text-[var(--signal)]">
                5+
              </div>
              <div className="font-display text-xs text-zinc-400 mt-0.5">
                Projects done
              </div>
            </div>

            <div className="h-8 w-[1px] bg-zinc-800" />

            <div className="text-left">
              <div className="font-display text-xl sm:text-2xl font-bold text-[var(--signal)]">
                40%
              </div>
              <div className="font-display text-xs text-zinc-400 mt-0.5">
                Query time cut
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Circular Backdrop Framing the 3D Cartoon Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-5 relative flex items-center justify-center w-full"
        >
          <TiltCard
            maxTilt={5}
            glare={false}
            className="relative flex items-center justify-center"
          >
            {/* The Signature Circular Backdrop from Reference */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] rounded-full bg-[#18181c] border border-zinc-800/80 shadow-[0_0_60px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
              {/* Subtle inner circular shadow / radial glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--signal)]/10 blur-3xl pointer-events-none" />

              {/* 3D Cartoon Avatar of Sriram */}
              <img
                src="/cartoon-avatar.png"
                alt="Sriram M 3D Cartoon Avatar"
                className="w-full h-full object-cover object-center relative z-0 transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Subtle outer accent ring */}
            <div className="pointer-events-none absolute inset-0 -m-3 rounded-full border border-zinc-800/40" />
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
