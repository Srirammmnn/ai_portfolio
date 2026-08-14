import { Github, Linkedin, Instagram, Mail, Globe } from "lucide-react";
import type { Social } from "../types/portfolio";

interface Props {
  social: Social;
  className?: string;
}

export default function SocialLinks({ social, className = "" }: Props) {
  const links = [
    { key: "github", href: social.github, icon: Github, label: "GitHub" },
    { key: "linkedin", href: social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { key: "instagram", href: social.instagram, icon: Instagram, label: "Instagram" },
    { key: "website", href: social.website, icon: Globe, label: "Website" },
    { key: "email", href: social.email ? `mailto:${social.email}` : "", icon: Mail, label: "Email" },
  ].filter((l) => l.href);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ key, href, icon: Icon, label }) => (
        <a
          key={key}
          href={href}
          target={key === "email" ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
        >
          <Icon size={16} strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}
