import { Github, Linkedin, Mail, Globe, Phone } from "lucide-react";
import type { Social } from "../types/portfolio";
import { soundManager } from "../utils/audio";

interface Props {
  social: Social;
  className?: string;
}

export default function SocialLinks({ social, className = "" }: Props) {
  const links = [
    { key: "github", href: social.github, icon: Github, label: "GitHub" },
    { key: "linkedin", href: social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { key: "website", href: social.website, icon: Globe, label: "Website" },
    { key: "email", href: social.email ? `mailto:${social.email}` : "", icon: Mail, label: "Email" },
    { key: "phone", href: social.phone ? `tel:${social.phone}` : "", icon: Phone, label: "Phone" },
  ].filter((l) => l.href);

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {links.map(({ key, href, icon: Icon, label }) => (
        <a
          key={key}
          href={href}
          target={key === "email" || key === "phone" ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={label}
          onClick={() => soundManager.playHover()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-800/80 text-zinc-300 transition-all hover:border-[var(--signal)] hover:text-[var(--signal)] hover:scale-105 active:scale-95 shadow-sm"
          title={label}
        >
          <Icon size={14} strokeWidth={2} />
        </a>
      ))}
    </div>
  );
}
