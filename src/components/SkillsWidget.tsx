import React from 'react';
import { FaGlobe, FaPalette, FaMusic, FaFilm, FaCamera, } from 'react-icons/fa';
import { FaMicrochip } from 'react-icons/fa6';

export const SkillsWidget: React.FC = () => {
  const skills = [
    { name: 'Web Developing', icon: <FaGlobe className="w-4 h-4 text-sky-600" /> },
    { name: 'Graphic Design', icon: <FaPalette className="w-4 h-4 text-emerald-600" /> },
    { name: 'Digital Music Production', icon: <FaMusic className="w-4 h-4 text-indigo-500" /> },
    { name: 'Video Editing', icon: <FaFilm className="w-4 h-4 text-rose-500" /> },
    { name: 'Photo Editing', icon: <FaCamera className="w-4 h-4 text-amber-500" /> },
  ];

  return (
    <section id="skills" className="aero-glass-panel p-6 sm:p-8 relative min-h-80">
      <div className="glass-reflection pointer-events-none" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Section Header (Tanpa Tab) */}
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-white/60 border border-white shadow-sm">
            <FaMicrochip className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-sky-950 tracking-tight">
              Technical Skills & Competencies
            </h2>
          </div>
        </div>

        {/* Flexbox Container untuk menampilkan keahlian */}
        <div className="flex flex-wrap gap-3 mt-2">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group relative px-4 py-2.5 bg-linear-to-b from-white/95 to-white/70 border border-white/90 rounded-2xl flex items-center justify-between gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default"
            >
              {/* Highlight Atas Khas Frutiger Aero */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/80 to-transparent h-1/2 pointer-events-none opacity-50" />
              
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="p-1 rounded-full bg-sky-50 border border-sky-100 shadow-inner group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <span className="text-sm font-extrabold text-sky-900 tracking-tight">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};