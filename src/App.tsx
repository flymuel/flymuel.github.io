import React, { useState, useEffect } from 'react';
import { AeroBackground } from './components/AeroBackground';
import { TopNav } from './components/TopNav';
import { ProfileWidget } from './components/ProfileWidget';
import { SkillsWidget } from './components/SkillsWidget';
import { ProjectsWidget } from './components/ProjectsWidget';
import { MediaPlayerWidget } from './components/MediaPlayerWidget';
import { BottomDock } from './components/BottomDock';
import { ContactModal } from './components/ContactModal';
import { aeroAudio } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [hasActiveProjectModal, setHasActiveProjectModal] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'skills', 'projects', 'media'];
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen relative font-sans text-sky-950 selection:bg-sky-300 selection:text-sky-950">
      {/* Background with CSS Sunbeam & Floating Specular Glass Bubbles */}
      <AeroBackground />

      {/* Main App Container */}
      <div className="relative z-10 flex flex-col min-h-screen pb-28 sm:pb-32">
        {/* Top Aero Navigation Bar */}
        <TopNav
          activeSection={activeSection}
          onNavClick={scrollToSection}
          onContactClick={() => setIsContactOpen(true)}
        />

        {/* Hero & Bento Box Widget Layout */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 w-full flex-1">
          <div className="flex flex-col gap-6 sm:gap-8">
            <ProfileWidget
              onContactClick={() => setIsContactOpen(true)}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              <div className="lg:col-span-7">
                <SkillsWidget />
              </div>
              <div className="lg:col-span-5">
                <MediaPlayerWidget />
              </div>
            </div>
            {/* Kita pantau status modal proyek lewat callback atau prop jika perlu, 
                atau kita biarkan ProjectsWidget melapor */}
            <ProjectsWidget onModalChange={(isOpen) => setHasActiveProjectModal(isOpen)} />
          </div>
        </main>
      </div>

      {/* Floating Bottom Dock (Early Mac OS X / iOS Aero Style) */}
      <BottomDock
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenContact={() => setIsContactOpen(true)}
        isModalOpen={isContactOpen || hasActiveProjectModal}
      />

      {/* Interactive Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}