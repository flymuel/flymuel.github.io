/**
 * Frutiger Aero Synthesizer & Sound Effects
 * Generates mid-2000s Web 2.0 / Aero water droplet clicks and ambient synthesizer notes
 * using the browser's native Web Audio API (Zero external assets required).
 */

class AeroAudioEngine {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  private musicOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private currentNoteIndex: number = 0;
  private currentTrackIndex: number = 0;

  // Curated ambient arpeggios reminiscent of 2006 tech demos & aquatic themes
  private trackThemes = [
    {
      name: "Aero Breeze (Ambient Dream 2006)",
      artist: "Spotify Aero Playlist",
      notes: [523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, 587.33, 880.00], // C, E, G, C5, G, E, D, A
      tempo: 450,
      scale: "C Major 7th Sparkle"
    },
    {
      name: "Aquatic Ambiance (Crystal Waters)",
      artist: "Spotify Aero Playlist",
      notes: [392.00, 493.88, 587.33, 739.99, 587.33, 493.88, 440.00, 659.25], // G, B, D, F#, D, B, A, E
      tempo: 520,
      scale: "Aqua Lydian Flow"
    },
    {
      name: "Vista Horizons (Synths & Sky)",
      artist: "Spotify Aero Playlist",
      notes: [440.00, 554.37, 659.25, 830.61, 659.25, 554.37, 493.88, 739.99], // A, C#, E, G#, E, C#, B, F#
      tempo: 400,
      scale: "Sky Ether Chime"
    },
    {
      name: "Digital Nature (Green Meadow)",
      artist: "Spotify Aero Playlist",
      notes: [349.23, 440.00, 523.25, 698.46, 523.25, 440.00, 392.00, 587.33], // F, A, C, F5, C, A, G, D
      tempo: 480,
      scale: "Emerald Pure Nature"
    }
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Crisp Aero Water Droplet Click
   */
  public playWaterClick() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      
      // Pitch sweeps upward swiftly like a water drop
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Bubble Pop Sound Effect
   */
  public playBubblePop() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const now = ctx.currentTime;
      
      // Quick resonant pop
      const startFreq = 400 + Math.random() * 300;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 2.5, now + 0.05);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // ignore
    }
  }

  /**
   * Soft glassy chime when switching tabs or expanding cards
   */
  public playGlassChime() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [1200, 1800].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.12, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.15);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Play single synthesized chime note for the Media Player ambient loop
   */
  public playAmbientNote(freq: number, volume: number = 0.15) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm pure sine with subtle sub-harmonic for crystal clarity
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq / 2, now);

      gain.gain.setValueAtTime(volume * 0.6, now);
      gain.gain.exponentialRampToValueAtTime(volume * 0.01, now + 0.8);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 0.85);
      subOsc.stop(now + 0.85);
    } catch {
      // ignore
    }
  }

  public getTracks() {
    return this.trackThemes;
  }
}

export const aeroAudio = new AeroAudioEngine();
