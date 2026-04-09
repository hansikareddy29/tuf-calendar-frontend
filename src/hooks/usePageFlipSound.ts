'use client';

import { useRef, useCallback, useEffect } from 'react';

/**
 * usePageFlipSound — generates a multi-layered, highly realistic paper-flip sound.
 * Includes a 'flick' snap, a 'whoosh' for air movement, and a 'landing' thud.
 */
export function usePageFlipSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Pre-initialize context on mount if possible
    if (typeof window !== 'undefined' && !audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const playFlip = useCallback(() => {
    if (typeof window === 'undefined' || !audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // Helper to create noise buffer
    const createNoiseBuffer = (duration: number) => {
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      return buffer;
    };

    // 1. THE FLICK (Subtle initial paper snap)
    const flickSource = ctx.createBufferSource();
    flickSource.buffer = createNoiseBuffer(0.04);
    const flickFilter = ctx.createBiquadFilter();
    flickFilter.type = 'highpass';
    flickFilter.frequency.setValueAtTime(6000, now);
    const flickGain = ctx.createGain();
    flickGain.gain.setValueAtTime(0.08, now); // Much quieter
    flickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    flickSource.connect(flickFilter);
    flickFilter.connect(flickGain);
    flickGain.connect(ctx.destination);

    // 2. THE WHOOSH (Silky mid-range air movement)
    const whooshSource = ctx.createBufferSource();
    whooshSource.buffer = createNoiseBuffer(0.35);
    const whooshFilter = ctx.createBiquadFilter();
    whooshFilter.type = 'bandpass';
    whooshFilter.frequency.setValueAtTime(800, now);
    whooshFilter.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
    whooshFilter.Q.setValueAtTime(0.3, now); // Low Q for broad, soft sound
    const whooshGain = ctx.createGain();
    whooshGain.gain.setValueAtTime(0.03, now); // Very subtle
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    whooshSource.connect(whooshFilter);
    whooshFilter.connect(whooshGain);
    whooshGain.connect(ctx.destination);

    // 3. THE LANDING (Soft paper settle - NO OSCILLATOR)
    const landingSource = ctx.createBufferSource();
    landingSource.buffer = createNoiseBuffer(0.2);
    const landingFilter = ctx.createBiquadFilter();
    landingFilter.type = 'lowpass';
    landingFilter.frequency.setValueAtTime(400, now + 0.1);
    const landingGain = ctx.createGain();
    landingGain.gain.setValueAtTime(0, now);
    landingGain.gain.linearRampToValueAtTime(0.02, now + 0.15);
    landingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    landingSource.connect(landingFilter);
    landingFilter.connect(landingGain);
    landingGain.connect(ctx.destination);

    // Start all layers
    flickSource.start(now);
    whooshSource.start(now);
    landingSource.start(now + 0.1);

  }, []);

  return { playFlip };
}
