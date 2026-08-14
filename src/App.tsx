import { usePortfolio } from "./hooks/usePortfolio";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";

function App() {
  const { profile, skills, experience, projects, education, testimonials } = usePortfolio();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar shortName={profile.shortName} />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} education={education} />
        <ExperienceSection experience={experience} />
        <ServicesSection skills={skills} />
        <ProjectsSection projects={projects} />
        <TestimonialsSection testimonials={testimonials} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}

export default App;
