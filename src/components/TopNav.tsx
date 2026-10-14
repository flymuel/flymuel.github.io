import React, { useState, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute, FaRegClock } from 'react-icons/fa';
import { MdAutoAwesome } from 'react-icons/md';
import { aeroAudio } from '../utils/audio';

interface TopNavProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  onContactClick?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onNavClick, activeSection, onContactClick }) => {
  const [time, setTime] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    aeroAudio.soundEnabled = next;
    if (next) {
      aeroAudio.playWaterClick();
    }
  };

  const handleNav = (id: string) => {
    aeroAudio.playWaterClick();
    onNavClick(id);
  };

  return (
    <header className="sticky top-3 z-40 max-w-6xl mx-auto px-4 w-full">
      <nav className="aero-glass-panel px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 backdrop-blur-xl border border-white/80 shadow-lg">
        <div className="glass-reflection" />

        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-cyan-400 via-sky-300 to-white flex items-center justify-center shadow-md border border-white/90">
           <img src="/favicon.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sky-950 text-base sm:text-lg tracking-tight flex items-center gap-1.5 leading-none">
              Christopher Samuel <span className="text-xs font-semibold text-sky-750">(@flymuel)</span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-sky-950 relative z-10">
          <button
            onClick={() => handleNav('profile')}
            className={`transition-all hover:text-sky-600 cursor-pointer ${
              activeSection === 'profile' ? 'text-sky-800 font-bold underline decoration-sky-400 underline-offset-4' : 'text-sky-900/90'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => handleNav('skills')}
            className={`transition-all hover:text-sky-600 cursor-pointer ${
              activeSection === 'skills' ? 'text-sky-800 font-bold underline decoration-sky-400 underline-offset-4' : 'text-sky-900/90'
            }`}
          >
            Skills
          </button>
          
          <button
            onClick={() => handleNav('media')}
            className={`transition-all hover:text-sky-600 cursor-pointer ${
              activeSection === 'media' ? 'text-sky-800 font-bold underline decoration-sky-400 underline-offset-4' : 'text-sky-900/90'
            }`}
          >
            Music Player
          </button>

          <button
            onClick={() => handleNav('projects')}
            className={`transition-all hover:text-sky-600 cursor-pointer ${
              activeSection === 'projects' ? 'text-sky-800 font-bold underline decoration-sky-400 underline-offset-4' : 'text-sky-900/90'
            }`}
          >
            Projects
          </button>

          {/* Contact sekarang memicu popup (onContactClick) */}
          <button
            onClick={() => {
              aeroAudio.playWaterClick();
              if (onContactClick)
              onContactClick();
            }}
            className={`transition-all hover:text-sky-600 cursor-pointer text-sky-900/90`}
          >
            Contact
          </button>
        </div>

        {/* Zone 3: Clock Gadget & Sound Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 relative z-10 shrink-0">
          {/* Aero Desktop Clock Gadget */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 border border-white/80 shadow-inner text-xs font-mono text-sky-900 font-semibold">
            <FaRegClock className="w-3.5 h-3.5 text-sky-600" />
            <span>{time || '12:00:00'}</span>
          </div>

          {/* Sound FX Gel Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Aero Sound FX' : 'Enable Aero Sound FX'}
            className="btn-gel-silver px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
          >
            <div className="gel-highlight" />
            {soundEnabled ? (
              <>
                <FaVolumeUp className="w-3.5 h-3.5 text-sky-700" />
                <span className="hidden sm:inline text-sky-900 text-[11px]">Audio On</span>
              </>
            ) : (
              <>
                <FaVolumeMute className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline text-slate-600 text-[11px]">Muted</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};
