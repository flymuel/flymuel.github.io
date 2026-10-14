import React from 'react';
import { FaUser, FaFolderOpen } from 'react-icons/fa';
import { MdEmail, MdOutlineAlbum, MdAutoAwesome } from 'react-icons/md';
import { aeroAudio } from '../utils/audio';

interface BottomDockProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  activeSection,
  onNavigate,
  onOpenContact
}) => {
  const navItems = [
    {
      id: 'profile',
      label: 'Home',
      icon: <FaUser className="w-5 h-5 text-sky-900" />,
      color: 'from-cyan-300 via-sky-200 to-white',
      badge: 'Profile'
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <MdAutoAwesome className="w-5 h-5 text-emerald-900" />,
      color: 'from-emerald-300 via-teal-200 to-white',
      badge: 'Badges'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <FaFolderOpen className="w-5 h-5 text-blue-900" />,
      color: 'from-blue-300 via-sky-200 to-white',
      badge: 'Works'
    },
    {
      id: 'media',
      label: 'Player',
      icon: <MdOutlineAlbum className="w-5 h-5 text-indigo-900" />,
      color: 'from-indigo-300 via-sky-200 to-white',
      badge: 'Spotify'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <MdEmail className="w-5 h-5 text-amber-900" />,
      color: 'from-amber-300 via-emerald-200 to-white',
      badge: 'Connect'
    }
  ];

  const handleClick = (id: string) => {
    aeroAudio.playGlassChime();
    if (id === 'contact') {
      onOpenContact();
    } else {
      onNavigate(id);
    }
  };

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 px-2 pointer-events-auto md:hidden">
      {/* 3D Glossy Aero Dock Container */}
      <div className="aero-dock px-3 sm:px-4 py-2 flex items-end gap-2 sm:gap-3.5 relative shadow-2xl">
        {/* Dock Base Shelf Reflection Plate */}
        <div className="dock-shelf-plate" />

        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div key={item.id} className="flex flex-col items-center group relative">
              {/* Tooltip Badge on Hover */}
              <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 pointer-events-none px-2 py-0.5 rounded-lg bg-sky-950/85 text-white text-[11px] font-bold shadow-lg border border-sky-400/40 whitespace-nowrap z-50">
                {item.label}
              </div>

              {/* 3D Skeuomorphic Glossy Icon Button */}
              <button
                onClick={() => handleClick(item.id)}
                className={`dock-icon-btn w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-linear-to-tr ${item.color} p-0.5 flex flex-col items-center justify-center border-2 border-white/95 shadow-md cursor-pointer ${
                  isActive ? 'ring-2 ring-sky-400 scale-105' : ''
                }`}
                aria-label={item.label}
              >
                {/* Glossy top curved highlight */}
                <div className="absolute top-0.5 left-1.5 right-1.5 h-1/2 bg-linear-to-b from-white/90 via-white/30 to-transparent rounded-t-xl pointer-events-none" />

                <div className="relative z-10 drop-shadow-xs">
                  {item.icon}
                </div>
              </button>

              {/* Active Indicator Light (Jewel Dot) */}
              <div
                className={`dock-dot transition-opacity duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
