import { useState } from "react";
import { usePortfolio } from "./hooks/usePortfolio";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AgentSimulator from "./components/AgentSimulator";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import AIAssistantModal from "./components/AIAssistantModal";

function App() {
  const {
    profile,
    stats,
    skills,
    experience,
    projects,
    certifications,
    education,
    languages,
    interests,
  } = usePortfolio();

  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--signal)] selection:text-slate-950 font-body relative overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        shortName={profile.shortName}
        onOpenCommand={() => setCommandOpen(true)}
      />

      <main>
        {/* Hero Section with 3D WebGL Core */}
        <HeroSection profile={profile} stats={stats} />

        {/* Live Multi-Agent RAG Playground */}
        <section id="agent-sandbox" className="mx-auto max-w-6xl px-6 py-12 scroll-mt-20">
          <AgentSimulator />
        </section>

        {/* Featured Projects with Architecture Deep-Dive */}
        <ProjectsSection
          projects={projects}
          githubUrl={profile.social.github}
        />

        {/* Professional Experience */}
        <ExperienceSection experience={experience} />

        {/* Skills & Capabilities Matrix */}
        <ServicesSection skills={skills} />

        {/* Certifications & Badges */}
        <CertificationsSection certifications={certifications} />

        {/* About, Education & Personal Background */}
        <AboutSection
          profile={profile}
          education={education}
          languages={languages}
          interests={interests}
        />

        {/* Contact Hub */}
        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        email={profile.social.email}
        phone={profile.social.phone}
        github={profile.social.github}
        linkedin={profile.social.linkedin}
      />

      {/* Floating Interactive AI Digital Twin (Voice & RAG Persona) */}
      <AIAssistantModal resumeUrl="/SRiram.Resume.pdf" />
    </div>
  );
}

export default App;
