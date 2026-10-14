import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute, FaListUl, FaBroadcastTower } from 'react-icons/fa';
import { MdOutlineAlbum } from 'react-icons/md';
import { aeroAudio } from '../utils/audio';

// DAFTAR LAGU ANDA
const playlist = [
  { name: "LEASE", artist: "阿保剛", src: "/lagu1.mp3" },
  { name: "aquatic ambience", artist: "Scizzie", src: "/lagu2.mp3" },
  { name: "crystal setting", artist: "alyzea", src: "/lagu3.mp3" }
];

export const MediaPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

  // Referensi ke elemen audio
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = playlist[currentTrackIndex];

// 1. EFEK UNTUK AUTOPLAY (HACK INTERAKSI AKTIF)
  useEffect(() => {
    const unlockAudio = () => {
      // Jika audio ada dan sedang berhenti (paused), paksa putar
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            // Hapus sensor setelah lagu berhasil terputar agar tidak memberatkan web
            window.removeEventListener('mousedown', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
          })
          .catch((err) => {
            console.log("Menunggu klik pengguna yang valid...", err);
          });
      }
    };

    // Gunakan sensor aktif yang diizinkan browser (Klik mouse, sentuh layar HP, tekan keyboard)
    window.addEventListener('mousedown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('mousedown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  // 2. EFEK UNTUK VOLUME
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 3. EFEK PLAY/PAUSE MANUAL (Berdasarkan State)
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {}); // Biarkan diam jika di-block
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    aeroAudio.playWaterClick();
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    aeroAudio.playWaterClick();
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    aeroAudio.playWaterClick();
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    aeroAudio.playWaterClick();
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="media" className="aero-glass-panel p-6 sm:p-8 relative">
      <div className="glass-reflection" />
      
      {/* ELEMEN AUDIO TERSEMBUNYI */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleNext}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <FaBroadcastTower className="w-4 h-4 text-emerald-600 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-sky-950 tracking-tight">
                Music Player
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              aeroAudio.playWaterClick();
              setShowPlaylist(!showPlaylist);
            }}
            className="btn-gel-silver px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <div className="gel-highlight" />
            <FaListUl className="w-3.5 h-3.5 text-sky-800" />
            <span>{showPlaylist ? 'Hide Tracks' : 'Select Track'}</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-linear-to-b from-sky-100/90 via-sky-200/50 to-sky-100/90 border-2 border-white/95 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-white/70 to-transparent pointer-events-none" />
          
          {/* LAYAR LCD FRUTIGER AERO */}
          <div className="mp3-lcd p-4 sm:p-5 mb-5 rounded-xl">
            <div className="flex items-center justify-between text-[11px] tracking-wider mb-2 font-mono text-cyan-300/80">
              <span className="flex items-center gap-1.5">
                <MdOutlineAlbum className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''} text-cyan-400`} />
                <span>{isPlaying ? 'STEREO   PLAYING' : 'STEREO   PAUSED'}</span>
              </span>
              <span>128 KBPS   44.1 KHZ</span>
            </div>

            <div className="my-2">
              <div className="text-sm sm:text-base font-bold text-cyan-200 truncate font-mono tracking-wide drop-shadow-sm">
                  {currentTrack.name}
              </div>
              <div className="text-xs text-cyan-400/90 font-mono mt-0.5">
                Artist: {currentTrack.artist}
              </div>
            </div>

            {/* Visualizer Animasi */}
            <div className="h-8 flex items-end gap-1 sm:gap-1.5 py-1 my-3 bg-black/30 px-3 rounded-lg border border-cyan-950/60">
              {Array.from({ length: 24 }).map((_, i) => {
                const activeHeight = isPlaying 
                  ? Math.sin(i * 0.8 + currentTime * 2) * 45 + 50 
                  : 12;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-linear-to-t from-cyan-500 via-sky-400 to-emerald-300 rounded-t-xs transition-all duration-150"
                    style={{
                      height: `${Math.max(10, Math.min(100, activeHeight))}%`,
                      opacity: isPlaying ? 0.9 : 0.35
                    }}
                  />
                );
              })}
            </div>

            {/* Bar Waktu (Progress Bar) */}
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mt-2">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 mx-3 h-2 bg-cyan-950/80 rounded-full overflow-hidden border border-cyan-800/40 relative">
                <div 
                  className="h-full bg-linear-to-r from-cyan-400 to-emerald-300 rounded-full transition-all duration-300"
                  style={{ width: `${(duration ? (currentTime / duration) * 100 : 0)}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* KONTROL TOMBOL 3D */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              <button onClick={handlePrev} className="btn-gel-silver w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-md">
                <div className="gel-highlight" />
                <FaStepBackward className="w-4 h-4 text-sky-900" />
              </button>
              
              <button onClick={togglePlay} className="btn-gel-aqua w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform">
                <div className="gel-highlight" />
                {isPlaying ? <FaPause className="w-6 h-6 text-white drop-shadow-sm" /> : <FaPlay className="w-6 h-6 text-white fill-white ml-0.5 drop-shadow-sm" />}
              </button>
              
              <button onClick={handleNext} className="btn-gel-silver w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-md">
                <div className="gel-highlight" />
                <FaStepForward className="w-4 h-4 text-sky-900" />
              </button>
            </div>
            
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/70 border border-white/90 shadow-inner w-full sm:w-auto">
              {volume === 0 ? <FaVolumeMute className="w-4 h-4 text-slate-500" /> : <FaVolumeUp className="w-4 h-4 text-sky-700" />}
              <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-24 sm:w-28 accent-sky-500 cursor-pointer" />
              <span className="text-[11px] font-mono font-bold text-sky-900 w-8 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </div>

          {/* PILIHAN PLAYLIST */}
          {showPlaylist && (
            <div className="mt-4 pt-4 border-t border-white/80 animate-fadeIn">
              <div className="space-y-1.5">
                {playlist.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectTrack(idx)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      currentTrackIndex === idx ? 'bg-sky-500 text-white font-bold shadow-sm' : 'bg-white/60 hover:bg-white text-sky-900 border border-white/80'
                    }`}
                  >
                    <span>{idx + 1}. {t.name}</span>
                    <span className="text-[10px] opacity-80">{t.artist}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};