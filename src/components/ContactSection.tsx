import { useState } from "react";
import type { Profile } from "../types/portfolio";
import { soundManager } from "../utils/audio";
import confetti from "canvas-confetti";
import TiltCard from "./TiltCard";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

export default function ContactSection({ profile }: { profile: Profile }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.social.email);
    soundManager.playSuccess();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.social.phone);
    soundManager.playSuccess();
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    soundManager.playClick();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      soundManager.playSuccess();
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#f43f5e", "#fb7185", "#f59e0b"],
        });
      } catch {}

      const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
      const body = encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
      );
      window.open(`mailto:${profile.social.email}?subject=${subject}&body=${body}`, "_blank");

      setTimeout(() => {
        setSentSuccess(false);
        setFormState({ name: "", email: "", message: "" });
      }, 3000);
    }, 600);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20 relative">
      <div className="flex flex-col items-start max-w-2xl border-b border-[var(--border)] pb-6">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
          <Mail size={13} />
          <span>Contact</span>
        </div>
        <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Get in Touch
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)]">
          Available for AI/ML engineering positions, contract roles, and technical collaborations.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Direct info */}
        <div className="lg:col-span-5 space-y-3">
          <TiltCard
            maxTilt={4}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 backdrop-blur-xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 text-[var(--signal)]">
                  <Mail size={15} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-slate-500">Email</div>
                  <a
                    href={`mailto:${profile.social.email}`}
                    className="font-mono text-xs sm:text-sm text-white hover:text-[var(--signal)]"
                  >
                    {profile.social.email}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg border border-[var(--border)] bg-slate-900 text-slate-400 hover:text-white"
                title="Copy email"
              >
                {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </TiltCard>

          <TiltCard
            maxTilt={4}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 backdrop-blur-xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 text-[var(--signal)]">
                  <Phone size={15} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase text-slate-500">Phone / WhatsApp</div>
                  <a
                    href={`tel:${profile.social.phone}`}
                    className="font-mono text-xs sm:text-sm text-white hover:text-[var(--signal)]"
                  >
                    {profile.social.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyPhone}
                className="p-1.5 rounded-lg border border-[var(--border)] bg-slate-900 text-slate-400 hover:text-white"
                title="Copy phone"
              >
                {copiedPhone ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </TiltCard>

          <TiltCard
            maxTilt={4}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 backdrop-blur-xl shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-900 text-[var(--signal)]">
                <MapPin size={15} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-slate-500">Location</div>
                <div className="font-mono text-xs sm:text-sm text-white">
                  {profile.location} · Open to Relocation / Remote
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Social Pills */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--signal)] text-xs font-mono text-slate-300 hover:text-white transition-all"
            >
              <Github size={14} className="text-[var(--signal)]" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--signal)] text-xs font-mono text-slate-300 hover:text-white transition-all"
            >
              <Linkedin size={14} className="text-[var(--signal)]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={profile.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--signal)] text-xs font-mono text-slate-300 hover:text-white transition-all"
            >
              <Globe size={14} className="text-[var(--signal)]" />
              <span>Web</span>
            </a>
          </div>
        </div>

        {/* Right Column: Clean Message Form */}
        <div className="lg:col-span-7">
          <TiltCard
            maxTilt={3}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 backdrop-blur-xl shadow-xl"
          >
            <h3 className="font-display text-base font-bold text-white mb-4">
              Send a Message
            </h3>

            <form onSubmit={handleSendMessage} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Alex Walker"
                    className="w-full rounded-xl border border-[var(--border)] bg-slate-950/80 px-3.5 py-2 font-mono text-xs text-white placeholder-slate-600 focus:border-[var(--signal)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-400 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-[var(--border)] bg-slate-950/80 px-3.5 py-2 font-mono text-xs text-white placeholder-slate-600 focus:border-[var(--signal)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-400 mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your role or project..."
                  className="w-full rounded-xl border border-[var(--border)] bg-slate-950/80 px-3.5 py-2 font-mono text-xs text-white placeholder-slate-600 focus:border-[var(--signal)] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--signal)] to-amber-500 p-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-50"
              >
                {isSending ? (
                  <span>Sending...</span>
                ) : sentSuccess ? (
                  <span className="flex items-center gap-1.5 text-emerald-950">
                    <Check size={14} />
                    Opening Mail Client...
                  </span>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Send Message to Sriram</span>
                  </>
                )}
              </button>
            </form>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
