import { useEffect, useState } from "react";
import { soundManager } from "../utils/audio";
import confetti from "canvas-confetti";
import {
  Search,
  FileText,
  Mail,
  Phone,
  Github,
  Linkedin,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Terminal,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  onSelectProject?: (projectId: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  email,
  phone,
  github,
  linkedin,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = [
    {
      id: "download-resume",
      title: "Download Resume (PDF)",
      category: "Action",
      icon: FileText,
      action: () => {
        const link = document.createElement("a");
        link.href = "/SRiram.Resume.pdf";
        link.download = "Sriram_Resume.pdf";
        link.click();
        confetti({ particleCount: 40 });
      },
    },
    {
      id: "copy-email",
      title: `Copy Email: ${email}`,
      category: "Action",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(email);
        soundManager.playSuccess();
        alert("Email copied to clipboard!");
      },
    },
    {
      id: "copy-phone",
      title: `Copy Phone: ${phone}`,
      category: "Action",
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText(phone);
        soundManager.playSuccess();
        alert("Phone copied to clipboard!");
      },
    },
    {
      id: "nav-about",
      title: "Jump to: About Sriram",
      category: "Navigation",
      icon: Code2,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-experience",
      title: "Jump to: Experience (ROR Technologies)",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-skills",
      title: "Jump to: Technical Skills Matrix",
      category: "Navigation",
      icon: Terminal,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-projects",
      title: "Jump to: Featured Projects",
      category: "Navigation",
      icon: Code2,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-certs",
      title: "Jump to: Certifications",
      category: "Navigation",
      icon: Award,
      action: () => {
        document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-education",
      title: "Jump to: Education (KCT / PSG)",
      category: "Navigation",
      icon: GraduationCap,
      action: () => {
        document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "project-rag",
      title: "Project: Enterprise Multi-Agent RAG Assistant",
      category: "Project",
      icon: Code2,
      action: () => {
        if (onSelectProject) onSelectProject("multi-agent-rag");
      },
    },
    {
      id: "project-finetune",
      title: "Project: Customer Support LLM Fine-Tuning (QLoRA)",
      category: "Project",
      icon: Code2,
      action: () => {
        if (onSelectProject) onSelectProject("llm-fine-tuning");
      },
    },
    {
      id: "project-gym",
      title: "Project: Gym Retention Automation Platform (n8n)",
      category: "Project",
      icon: Code2,
      action: () => {
        if (onSelectProject) onSelectProject("gym-automation");
      },
    },
    {
      id: "social-github",
      title: "Open GitHub Profile",
      category: "Social",
      icon: Github,
      action: () => {
        window.open(github, "_blank");
      },
    },
    {
      id: "social-linkedin",
      title: "Open LinkedIn Profile",
      category: "Social",
      icon: Linkedin,
      action: () => {
        window.open(linkedin, "_blank");
      },
    },
  ];

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        soundManager.playClick();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        soundManager.playHover();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        soundManager.playHover();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        soundManager.playClick();
        filtered[selectedIndex].action();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface-hi)] p-3 shadow-2xl backdrop-blur-2xl z-10 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-[var(--border)]">
          <Search size={18} className="text-[var(--signal)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, or section..."
            autoFocus
            className="w-full bg-transparent font-mono text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400">
            ESC
          </kbd>
        </div>

        {/* List of matching commands */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playClick();
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                    isSelected
                      ? "bg-[var(--signal)]/15 border border-[var(--signal)]/30 text-white"
                      : "text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected ? "bg-[var(--signal)] text-slate-950" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      <Icon size={14} />
                    </div>
                    <span className="font-mono text-xs">{item.title}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border)] px-3 py-2 text-[10px] font-mono text-slate-500">
          <span>Use ↑↓ to navigate, Enter to select</span>
          <span className="text-[var(--signal)]">Sriram M Command Hub</span>
        </div>
      </div>
    </div>
  );
}
