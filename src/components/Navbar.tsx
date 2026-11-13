import { useState, useEffect } from "react";
import { soundManager } from "../utils/audio";
import ThemeSelector from "./ThemeSelector";
import {
  Volume2,
  VolumeX,
  Search,
  Menu,
  X,
} from "lucide-react";

interface NavbarProps {
  shortName: string;
  onOpenCommand: () => void;
}

export default function Navbar({ shortName, onOpenCommand }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    soundManager.enabled = next;
    setSoundEnabled(next);
    if (next) soundManager.playSuccess();
  };

  const navLinks = [
    { label: "Home", href: "#home", active: true },
    { label: "Services", href: "#skills" },
    { label: "About me", href: "#about" },
    { label: "Portfolio", href: "#projects" },
    { label: "Contact me", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#111113]/90 backdrop-blur-xl border-b border-[#2a2a30] py-3.5 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Brand Logo matching reference */}
        <a
          href="#home"
          onClick={() => soundManager.playClick()}
          className="flex items-center gap-1.5 font-display font-extrabold text-xl tracking-tight text-white group"
        >
          <span className="text-[var(--signal)] font-bold text-2xl tracking-tighter">
            {shortName.toUpperCase()}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)] mb-2" />
        </a>

        {/* Center Nav Links exactly like reference */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => soundManager.playHover()}
              className={`text-sm font-medium transition-colors ${
                link.active
                  ? "text-[var(--signal)] font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Tools: Search, Audio, Theme, and solid 'Hire Me' button */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCommand();
            }}
            className="hidden sm:flex p-2 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white transition-colors"
            title="Search (⌘K)"
          >
            <Search size={14} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white transition-colors"
            title={soundEnabled ? "Mute audio" : "Enable audio"}
          >
            {soundEnabled ? (
              <Volume2 size={14} className="text-[var(--signal)]" />
            ) : (
              <VolumeX size={14} />
            )}
          </button>

          {/* Theme Selector */}
          <ThemeSelector />

          {/* Solid Orange 'Hire Me' Button like reference image */}
          <a
            href="#contact"
            onClick={() => soundManager.playClick()}
            className="hidden sm:flex items-center justify-center rounded-lg bg-[var(--signal)] px-5 py-2 font-display text-xs font-bold text-black transition-all hover:opacity-90 active:scale-95 shadow-md"
          >
            Hire Me
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 border-t border-zinc-800 bg-zinc-950/95 px-6 py-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`text-sm py-1.5 transition-colors ${
                  link.active
                    ? "text-[var(--signal)] font-semibold"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-lg bg-[var(--signal)] p-2.5 font-display text-xs font-bold text-black"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
