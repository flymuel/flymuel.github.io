/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
import { FaArrowUp } from 'react-icons/fa';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

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
      // Mengukur tinggi TopNav (sekitar 80px) untuk dijadikan jarak offset agar tidak tertutup
      const headerOffset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    aeroAudio.playWaterClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {/* Bento Grid: Single Column on Mobile, Responsive Multi-Column on Desktop */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Widget 1: Profile Widget */}
            <ProfileWidget
              onContactClick={() => setIsContactOpen(true)}
            />

            {/* Widgets 2 & 4: Skills & Media Player in 2-Column Desktop Bento Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Skills Widget (spans 7 cols on large screens) */}
              <div className="lg:col-span-7">
                <SkillsWidget />
              </div>

              {/* Media Player Widget: "Now Playing: Spotify Playlist" (spans 5 cols on large screens) */}
              <div className="lg:col-span-5">
                <MediaPlayerWidget />
              </div>
            </div>

            {/* Widget 3: Projects Widgets (Display as a grid of glossy cards) */}
            <ProjectsWidget />
          </div>
        </main>
      </div>

      {/* Floating Bottom Dock (Early Mac OS X / iOS Aero Style) */}
      <BottomDock
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Floating Scroll To Top Pill (Desktop & Mobile) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Return to top"
          className="fixed bottom-20 right-4 sm:right-6 z-30 btn-gel-silver w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg animate-fadeIn"
        >
          <div className="gel-highlight" />
          <FaArrowUp className="w-4 h-4 text-sky-900" />
        </button>
      )}

      {/* Interactive Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
