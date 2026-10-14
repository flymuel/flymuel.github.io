import React, { useState } from 'react';
import { aeroAudio } from '../utils/audio';

interface ClownfishProps {
  id: number;
  startX?: number;
  topPercent: number;
  duration: number;
  delay: number;
  scale?: number;
  direction?: 'ltr' | 'rtl';
}

export const Clownfish: React.FC<ClownfishProps> = ({
  id,
  topPercent,
  duration,
  delay,
  scale = 1,
  direction = 'ltr',
}) => {
  const [isDarting, setIsDarting] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    aeroAudio.playBubblePop();
    setIsDarting(true);
    setClickCount((prev) => prev + 1);
    setTimeout(() => setIsDarting(false), 1200);
  };

  const isRTL = direction === 'rtl';

  return (
    <div
      onClick={handleClick}
      title="Click me to play with the clownfish!"
      className={`absolute pointer-events-auto cursor-pointer select-none group transition-transform ${
        isRTL ? 'animate-swim-rtl' : 'animate-swim-ltr'
      } ${isDarting ? 'scale-125 duration-300!' : ''}`}
      style={{
        top: `${topPercent}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        zIndex: 5,
        filter: 'drop-shadow(0 6px 12px rgba(3, 105, 161, 0.35))',
      }}
    >
      <div
        className="relative"
        style={{
          transform: `scale(${scale}) ${isRTL ? 'scaleX(-1)' : ''}`,
          transformOrigin: 'center center',
        }}
      >
        {/* SVG Detailed Frutiger Aero Glossy Clownfish */}
       <img 
          src="/clownfish.png" 
          alt="Realistic Clownfish" 
          className="w-24 sm:w-32 h-auto drop-shadow-2xl transition-transform group-hover:scale-110"
          style={{
             filter: 'drop-shadow(0 10px 15px rgba(3, 105, 161, 0.4)) contrast(1.1) saturate(1.2)'
          }}
        />

        {/* Trail Bubble Particles on click/hover */}
        {isDarting && (
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 flex gap-1 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-white/80 border border-sky-300 shadow-sm animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 border border-sky-300 shadow-sm animate-ping" />
          </div>
        )}
      </div>
    </div>
  );
};
