import React from 'react';
import { FaGithub, FaInstagram, FaYoutube, FaTerminal, FaSpotify, FaLinkedin } from 'react-icons/fa';
import { MdOutlineLaunch, MdEmail, MdPublic } from 'react-icons/md';
import { aeroAudio } from '../utils/audio';

interface ProfileWidgetProps {
  onContactClick: () => void;
}

export const ProfileWidget: React.FC<ProfileWidgetProps> = ({ onContactClick }) => {
  return (
    <section id="profile" className="aero-glass-panel p-6 sm:p-8 relative">
      <div className="glass-reflection" />
      {/* Decorative Aero Corner Specular Accent */}
      <div 
        className="absolute top-2 right-4 w-32 h-16 rounded-full pointer-events-none opacity-40 blur-xl"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(56,189,248,0.4) 60%, transparent 100%)' }}
      />
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
        {/* 3D Skeuomorphic Glossy Avatar Frame */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="aero-avatar-frame relative group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden relative border-2 border-white/90 shadow-inner bg-white">
              <img
                src="/avatar.jpg"
                alt="Christopher Samuel"
                className="w-full h-full object-cover relative z-10"
              />
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/70 via-white/20 to-transparent pointer-events-none rounded-t-full z-20" />
            </div>
            {/* Online / Active Jewel Badge */}
            <div 
              className="absolute bottom-1 right-2 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center z-30"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #86efac 0%, #22c55e 60%, #15803d 100%)',
                boxShadow: '0 2px 6px rgba(22, 163, 74, 0.4), inset 0 1px 1px rgba(255,255,255,0.9)'
              }}
              title="Status: Online & Available"
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full opacity-90" />
            </div>
          </div>
          {/* Quick Subtitle Pill */}
          <div className="mt-3 px-3 py-1 rounded-full bg-white/70 border border-white/90 shadow-sm text-xs font-semibold text-sky-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ready for Collaboration</span>
          </div>
        </div>

        {/* Profile Details & Bio */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-950 tracking-tight text-balance">
              Christopher Samuel
            </h1>
            <span className="text-base sm:text-lg font-semibold text-sky-700">
              @flymuel
            </span>
          </div>
          <p className="text-sky-950 text-sm sm:text-base leading-relaxed mb-6 font-medium max-w-2xl drop-shadow-sm">
            "Hello there! My name is Christopher Samuel, AKA flymuel. 
            I'm a technology enthusiast, web developer, and music writer based in Bitung, North Sulawesi. 
            In the digital music scene, I've known for exploring the Hip-Hop/Rap genre. 
            Some of my standout projects include the single 'SEKALI LAGI' and the track 'Don't Be Trippin'."
          </p>

          {/* Core Highlights Strip */}
          <div className="mb-6">
            <div className="p-3.5 rounded-xl bg-white/50 border border-white/75 shadow-sm w-full flex flex-col sm:flex-row items-center gap-3">
              <div className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <FaTerminal className="w-4 h-4 text-sky-700" />
                <span>I'm Currently Learning:</span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                  JavaScript
                </span>
                <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-sky-100/80 text-sky-800 border border-sky-200">
                  TypeScript
                </span>
                <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-orange-100/80 text-orange-800 border border-orange-200">
                  Java
                </span>
                <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-indigo-100/80 text-indigo-800 border border-indigo-200">
                  PHP
                </span>
                <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-sky-100/80 text-sky-800 border border-sky-200">
                  React
                </span>
              </div>
            </div>
          </div>

          {/* 3D Skeuomorphic Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            {/* Instagram Domain Link */}
            <a
              href="https://instagram.com/flymuel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => aeroAudio.playWaterClick()}
              className="btn-gel-aqua px-4 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md group"
            >
              <div className="gel-highlight" />
              <FaInstagram className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>Instagram</span>
              <MdOutlineLaunch className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* GitHub Profile Link */}
            <a
              href="https://github.com/flymuel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => aeroAudio.playWaterClick()}
              className="btn-gel-silver px-4 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md group"
            >
              <div className="gel-highlight" />
              <FaGithub className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>GitHub</span>
              <MdOutlineLaunch className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* LinkedIn Profile Link */}
            <a
              href="https://www.linkedin.com/in/christopher-samuel-1a0160253"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => aeroAudio.playWaterClick()}
              className="btn-gel-aqua px-4 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md group"
            >
              <div className="gel-highlight" />
              <FaLinkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>LinkedIn</span>
              <MdOutlineLaunch className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Spotify / Music Profile Link */}
            <a
              href="https://open.spotify.com/artist/7omIedo8YBtFKe8TYzkG2b?si=ky3wtB0RQsCWve8yg9SG1A"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => aeroAudio.playWaterClick()}
              className="btn-gel-green px-4 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md group"
            >
              <div className="gel-highlight" />
              <FaSpotify className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Spotify</span>
              <MdOutlineLaunch className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* YouTube Channel Link */}
            <a
              href="https://www.youtube.com/@flymuel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => aeroAudio.playWaterClick()}
              className="btn-gel-silver px-4 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md group"
            >
              <div className="gel-highlight" />
              <FaYoutube className="w-4 h-4 text-red-500 transition-transform group-hover:scale-110" />
              <span>YouTube Channel</span>
              <MdOutlineLaunch className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Quick Contact Action */}
            <button
              onClick={() => {
                aeroAudio.playWaterClick();
                onContactClick();
              }}
              className="btn-gel-green px-4 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <div className="gel-highlight" />
              <MdEmail className="w-4 h-4" />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};