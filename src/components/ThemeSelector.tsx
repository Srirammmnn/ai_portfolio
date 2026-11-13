import { useEffect, useState } from "react";
import { soundManager } from "../utils/audio";
import { Palette } from "lucide-react";

export type ThemeType = "solar" | "quantum" | "emerald" | "hyperviolet";

const THEMES: { id: ThemeType; name: string; primary: string; secondary: string }[] = [
  { id: "solar", name: "Solar (Default)", primary: "#f43f5e", secondary: "#f59e0b" },
  { id: "quantum", name: "Quantum", primary: "#00f5d4", secondary: "#8b5cf6" },
  { id: "emerald", name: "Emerald", primary: "#10b981", secondary: "#84cc16" },
  { id: "hyperviolet", name: "Violet", primary: "#a855f7", secondary: "#38bdf8" },
];

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("solar");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("sriram-portfolio-theme") as ThemeType) || "solar";
    setCurrentTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const handleSelect = (id: ThemeType) => {
    soundManager.playClick();
    setCurrentTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem("sriram-portfolio-theme", id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          soundManager.playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 font-mono text-xs text-slate-300 hover:text-white hover:border-[var(--signal)]/50 transition-all backdrop-blur-md"
        title="Theme Palette"
      >
        <Palette size={14} className="text-[var(--signal)]" />
        <span className="hidden sm:inline capitalize">{currentTheme}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-[var(--border)] bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl">
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Color Palette
            </div>
            <div className="space-y-1 mt-1">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                    currentTheme === t.id
                      ? "bg-slate-800 text-white font-medium"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <span className="capitalize">{t.name}</span>
                  <div className="flex items-center gap-1">
                    <span
                      className="h-2.5 w-2.5 rounded-full shadow-sm"
                      style={{ backgroundColor: t.primary }}
                    />
                    <span
                      className="h-2.5 w-2.5 rounded-full shadow-sm"
                      style={{ backgroundColor: t.secondary }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
