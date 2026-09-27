/** Seeded noise: every replay jitters the same way. */
export const rnd = (n: number) => {
  const x = Math.sin(n * 91.345) * 43758.5453;
  return x - Math.floor(x);
};
export const sym = (n: number) => rnd(n) * 2 - 1;

type Mix = { attack?: number; pan?: number; pan1?: number; wet?: number };

/**
 * Every sound is synthesised: breath-like noise sweeps, lip pops, tongue
 * clicks and thumps. No music, no audio files.
 */
export function createSfx(ctx: AudioContext) {
  const rate = ctx.sampleRate;
  const bus = ctx.createGain();
  bus.gain.value = 0.9;
  bus.connect(ctx.createDynamicsCompressor()).connect(ctx.destination);

  // A small room: two seconds of decaying noise as the reverb impulse.
  const verb = ctx.createConvolver();
  const ir = ctx.createBuffer(2, rate * 2, rate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < d.length; i++) {
      d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 4;
    }
  }
  verb.buffer = ir;
  verb.connect(bus);

  const noise = ctx.createBuffer(1, rate, rate);
  const n = noise.getChannelData(0);
  for (let i = 0; i < n.length; i++) n[i] = Math.random() * 2 - 1;

  const voice = (t: number, dur: number, peak: number, mix: Mix = {}) => {
    const { attack = 0.004, pan = 0, pan1 = pan, wet = 0.15 } = mix;
    const g = ctx.createGain();
    const p = ctx.createStereoPanner();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    p.pan.setValueAtTime(pan, t);
    p.pan.linearRampToValueAtTime(pan1, t + dur);
    g.connect(p).connect(bus);
    if (wet) {
      const w = ctx.createGain();
      w.gain.value = wet;
      p.connect(w).connect(verb);
    }
    return g;
  };

  const tone = (
    t: number,
    dur: number,
    f0: number,
    f1: number,
    peak: number,
    type: OscillatorType = "sine",
    mix?: Mix,
  ) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    o.connect(voice(t, dur, peak, mix));
    o.start(t);
    o.stop(t + dur + 0.05);
  };

  const hiss = (
    t: number,
    dur: number,
    type: BiquadFilterType,
    f0: number,
    f1: number,
    q: number,
    peak: number,
    mix?: Mix,
  ) => {
    const src = ctx.createBufferSource();
    const f = ctx.createBiquadFilter();
    src.buffer = noise;
    src.loop = true;
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    src.connect(f).connect(voice(t, dur, peak, mix));
    src.start(t, Math.random());
    src.stop(t + dur + 0.05);
  };

  return {
    bus,
    /** Lips: a pop that falls in pitch. */
    pop: (t: number, v = 0.5) => {
      tone(t, 0.09, 1000, 180, v);
      hiss(t, 0.02, "highpass", 3000, 3000, 0.7, v * 0.25);
    },
    /** Tongue click. */
    tick: (t: number, f = 2600, v = 0.2) =>
      hiss(t, 0.03, "bandpass", f, f * 0.8, 5, v, { wet: 0.05 }),
    /** Breath through a sweeping band: swells, then cuts. */
    whoosh: (t: number, dur: number, f0: number, f1: number, pan = -0.6, pan1 = 0.6, v = 0.45) =>
      hiss(t, dur, "bandpass", f0, f1, 1.2, v, { attack: dur * 0.6, pan, pan1, wet: 0.2 }),
    swish: (t: number) =>
      hiss(t, 0.16, "highpass", 2500, 6000, 0.7, 0.25, { attack: 0.08, pan: 0.5, pan1: -0.5 }),
    impact: (t: number, v = 1) => {
      tone(t, 0.7, 130, 38, v, "sine", { wet: 0.3 });
      tone(t, 0.12, 300, 80, v * 0.35, "triangle");
      hiss(t, 0.25, "lowpass", 3000, 200, 0.7, v * 0.5, { wet: 0.4 });
    },
    thump: (t: number) => tone(t, 0.3, 160, 50, 0.6),
    sub: (t: number) => tone(t, 1.8, 70, 28, 0.8, "sine", { wet: 0 }),
    /** A "bwup" up-glide, like a beatboxer's lip bend. */
    bwup: (t: number) => tone(t, 0.16, 160, 720, 0.35),
    glitch: (t: number, dur: number) => {
      for (let i = 0; i < 12; i++) {
        const f = 90 + rnd(i) * 1800;
        tone(t + (i * dur) / 12, dur / 14, f, f, 0.12, "square", { wet: 0 });
      }
    },
    shimmer: (t: number) => {
      for (let i = 0; i < 10; i++) {
        const f = 2400 + rnd(i + 20) * 3600;
        tone(t + i * 0.035, 0.35, f, f * 1.02, 0.05, "sine", { pan: sym(i), wet: 0.8 });
      }
    },
    /** Power-off: a falling whine and a final click. */
    off: (t: number) => {
      tone(t, 0.5, 1400, 45, 0.35);
      hiss(t + 0.45, 0.03, "highpass", 2000, 2000, 0.7, 0.3);
    },
  };
}
