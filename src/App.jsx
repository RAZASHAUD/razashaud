import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { useTheme } from '@/lib/useTheme';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BenchSection from '@/components/sections/BenchSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import PublicationsSection from '@/components/sections/PublicationsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';
import CommandPalette from '@/components/CommandPalette';
import AskWidget from '@/components/AskWidget';

const SECTIONS = ['home', 'bench', 'projects', 'skills', 'experience', 'research', 'resume', 'contact'];

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [track, setTrack] = useState('all');
  const [highlight, setHighlight] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Raza Shaud — M.Tech IIT Guwahati · ML, Control & Embedded Systems</title>
        <meta name="description" content="Raza Shaud — M.Tech at IIT Guwahati (Systems, Control and Automation), GATE 2026 AIR 2139. Machine learning, computer vision and embedded systems, with interactive demos of published research and a downloadable résumé." />
        <meta property="og:title" content="Raza Shaud — M.Tech IIT Guwahati · ML, Control & Embedded Systems" />
        <meta property="og:description" content="Run my research in your browser: a 6-phase PMSM field visualiser, a live voice feature extractor and a fault-detection threshold explorer." />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <a href="#bench" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] btn btn-solid">
        Skip to the demos
      </a>

      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        theme={theme}
        toggleTheme={toggleTheme}
        openPalette={() => setPaletteOpen(true)}
      />

      <main>
        <HeroSection track={track} setTrack={setTrack} scrollToSection={scrollToSection} />
        <BenchSection track={track} />
        <ProjectsSection track={track} highlight={highlight} />
        <SkillsSection track={track} highlight={highlight} setHighlight={setHighlight} scrollToSection={scrollToSection} />
        <ExperienceSection track={track} />
        <PublicationsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />

      <CommandPalette
        open={paletteOpen}
        setOpen={setPaletteOpen}
        scrollToSection={scrollToSection}
        toggleTheme={toggleTheme}
        setTrack={setTrack}
        openAsk={() => setAskOpen(true)}
      />
      <AskWidget open={askOpen} setOpen={setAskOpen} />
    </>
  );
}
