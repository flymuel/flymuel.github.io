import React, { useState, useEffect } from 'react';
import { aeroAudio } from '../utils/audio';
import { Clownfish } from './Clownfish';

interface Bubble {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FishData {
  id: number;
  topPercent: number;
  duration: number;
  delay: number;
  scale: number;
  direction: 'ltr' | 'rtl';
}

export const AeroBackground: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [fishes, setFishes] = useState<FishData[]>([
    {
      id: 1,
      topPercent: 22,
      duration: 24,
      delay: 0,
      scale: 0.95,
      direction: 'ltr',
    },
    {
      id: 2,
      topPercent: 48,
      duration: 32,
      delay: 6,
      scale: 0.8,
      direction: 'rtl',
    },
    {
      id: 3,
      topPercent: 68,
      duration: 26,
      delay: 14,
      scale: 1.1,
      direction: 'ltr',
    },
    {
      id: 4,
      topPercent: 36,
      duration: 38,
      delay: 18,
      scale: 0.65,
      direction: 'rtl',
    },
  ]);

  useEffect(() => {

    const initialBubbles: Bubble[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 65) + 35, // 35px to 100px
      left: Math.floor(Math.random() * 92) + 4,   // 4% to 96%
      top: Math.floor(Math.random() * 85) + 10,   // 10% to 95%
      duration: Math.floor(Math.random() * 10) + 12, // 12s to 22s float
      delay: Math.floor(Math.random() * 6),
      opacity: Math.random() * 0.45 + 0.45,
    }));
    setBubbles(initialBubbles);
  }, []);

  const handlePopBubble = (id: number) => {
    aeroAudio.playBubblePop();
    setBubbles((prev) => prev.filter((b) => b.id !== id));

    setTimeout(() => {
      setBubbles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          size: Math.floor(Math.random() * 60) + 35,
          left: Math.floor(Math.random() * 90) + 5,
          top: 92,
          duration: Math.floor(Math.random() * 10) + 12,
          delay: 0,
          opacity: Math.random() * 0.45 + 0.45,
        },
      ]);
    }, 2800);
  };

  const handleAddFish = () => {
    aeroAudio.playBubblePop();
    const newId = Date.now();
    const isRtl = Math.random() > 0.5;
    const newFish: FishData = {
      id: newId,
      topPercent: Math.floor(Math.random() * 55) + 18, // 18% to 73%
      duration: Math.floor(Math.random() * 14) + 20,    // 20s to 34s
      delay: 0,
      scale: parseFloat((Math.random() * 0.5 + 0.7).toFixed(2)), // 0.7 to 1.2
      direction: isRtl ? 'rtl' : 'ltr',
    };
    setFishes((prev) => [...prev, newFish]);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 aero-background">
      {/* Upper Sunlight Lens Flare */}
      <div className="lens-flare-top" />

      {/* Underwater Caustics & Sunbeam Shimmer */}
      <div
        className="absolute top-0 right-1/4 w-150 h-125 pointer-events-none opacity-45 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at 70% 20%, rgba(255, 255, 255, 0.8) 0%, rgba(167, 243, 208, 0.5) 30%, rgba(56, 189, 248, 0.3) 60%, transparent 80%)',
        }}
      />

      {/* Secondary Soft Sunburst Beam */}
      <div
        className="absolute top-1/4 left-10 w-125 h-100 pointer-events-none opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(125, 211, 252, 0.6) 0%, rgba(56, 189, 248, 0.2) 50%, transparent 75%)',
        }}
      />

      {/* Floating 3D Specular Glass Bubbles (Clickable) */}
      <div className="absolute inset-0 pointer-events-auto">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            onClick={() => handlePopBubble(bubble.id)}
            title="Click to pop bubble!"
            className="aero-bubble transition-transform hover:scale-115 active:scale-90"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
              opacity: bubble.opacity,
            }}
          />
        ))}
      </div>

      {/* Swimming Frutiger Aero Clownfish */}
      <div className="absolute inset-0 pointer-events-auto">
        {fishes.map((fish) => (
          <Clownfish
            key={fish.id}
            id={fish.id}
            topPercent={fish.topPercent}
            duration={fish.duration}
            delay={fish.delay}
            scale={fish.scale}
            direction={fish.direction}
          />
        ))}
      </div>
    </div>
  );
};
