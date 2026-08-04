import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Waves } from 'lucide-react';

/**
 * Live audio feature front end: frame -> FFT -> log-spaced band energies.
 * This is the same first stage that feeds the human/AI voice classifier in the
 * journal paper. The classifier itself is a Random Forest trained offline in
 * scikit-learn on a 15-D MFCC vector; what runs here in your browser is the
 * feature extractor, on your own voice.
 * Audio never leaves the page - nothing is recorded or uploaded.
 */
const BANDS = 14;
const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

export default function AudioDemo() {
  const canvasRef = useRef(null);
  const audioRef = useRef({});
  const rafRef = useRef(0);
  const [mode, setMode] = useState('idle'); // idle | mic | tone | error
  const [bands, setBands] = useState(() => new Array(BANDS).fill(0));
  const [centroid, setCentroid] = useState(0);
  const [level, setLevel] = useState(-90);

  const stop = () => {
    cancelAnimationFrame(rafRef.current);
    const a = audioRef.current;
    a.stream?.getTracks().forEach((t) => t.stop());
    try { a.osc?.stop(); } catch (e) { /* already stopped */ }
    a.ctx?.close();
    audioRef.current = {};
    setMode('idle');
  };

  useEffect(() => () => stop(), []);

  const run = (source, ctx, extra = {}) => {
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.72;
    source.connect(analyser);
    audioRef.current = { ctx, analyser, ...extra };

    const bins = analyser.frequencyBinCount;
    const data = new Uint8Array(bins);
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    c.fillStyle = `rgb(${css('--ink')})`;
    c.fillRect(0, 0, canvas.width, canvas.height);

    const nyquist = ctx.sampleRate / 2;
    const edges = Array.from({ length: BANDS + 1 }, (_, i) =>
      Math.round((bins - 1) * (Math.pow(300, i / BANDS) - 1) / 299)
    );

    let frame = 0;
    const tick = () => {
      analyser.getByteFrequencyData(data);

      // scroll the spectrogram one column left, paint the newest slice on the right
      c.drawImage(canvas, -1, 0);
      const H = canvas.height;
      for (let y = 0; y < H; y++) {
        const idx = Math.floor(Math.pow(1 - y / H, 2) * (bins - 1));
        const v = data[idx] / 255;
        if (v > 0.03) {
          const hue = 190 - v * 150; // cyan floor climbing to amber peaks
          c.fillStyle = `hsl(${hue} 85% ${12 + v * 46}%)`;
        } else {
          c.fillStyle = `rgb(${css('--ink')})`;
        }
        c.fillRect(canvas.width - 1, y, 1, 1);
      }

      if (frame++ % 3 === 0) {
        const out = [];
        for (let b = 0; b < BANDS; b++) {
          let s = 0, n = 0;
          for (let i = edges[b]; i <= Math.max(edges[b], edges[b + 1]); i++) { s += data[i]; n++; }
          out.push(n ? s / n / 255 : 0);
        }
        setBands(out);

        let num = 0, den = 0, energy = 0;
        for (let i = 0; i < bins; i++) { const m = data[i] / 255; num += i * m; den += m; energy += m * m; }
        setCentroid(den > 0.5 ? (num / den) * (nyquist / bins) : 0);
        setLevel(energy > 0 ? Math.max(-90, 20 * Math.log10(Math.sqrt(energy / bins))) : -90);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  };

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      run(ctx.createMediaStreamSource(stream), ctx, { stream });
      setMode('mic');
    } catch (e) {
      setMode('error');
    }
  };

  const startTone = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.0001; // analysed, not played out loud
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 6);
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    run(osc, ctx, { osc });
    setMode('tone');
  };

  const running = mode === 'mic' || mode === 'tone';

  return (
    <div>
      <div className="relative rounded-md overflow-hidden border border-line bg-ink">
        <canvas ref={canvasRef} className="w-full h-[200px] block" aria-label="Live frequency spectrogram" />
        {!running && (
          <div className="absolute inset-0 grid place-items-center text-center px-6">
            <p className="text-sm text-muted max-w-xs">
              Start the analyser and speak. The scrolling plot is your voice in the frequency domain —
              the surface the classifier actually reads.
            </p>
          </div>
        )}
        {running && <div className="absolute top-2 right-2 readout text-live">● live</div>}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {!running ? (
          <>
            <button onClick={startMic} className="btn btn-solid text-sm py-2">
              <Mic size={16} /> Use my microphone
            </button>
            <button onClick={startTone} className="btn btn-ghost text-sm py-2">
              <Waves size={16} /> Run a test sweep
            </button>
          </>
        ) : (
          <button onClick={stop} className="btn btn-ghost text-sm py-2"><MicOff size={16} /> Stop</button>
        )}
      </div>

      {mode === 'error' && (
        <p className="text-sm text-live mt-3">
          Microphone access was blocked. Allow it in your browser settings, or run the test sweep instead.
        </p>
      )}

      <div className="mt-5">
        <div className="readout mb-2">log-spaced band energies</div>
        <div className="flex items-end gap-1 h-16">
          {bands.map((v, i) => (
            <div key={i} className="flex-1 rounded-sm transition-[height] duration-75"
              style={{ height: `${Math.max(3, v * 100)}%`, background: `rgb(var(--${v > 0.6 ? 'live' : 'trace'}) / ${0.35 + v * 0.65})` }} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="panel p-3">
          <div className="readout">spectral centroid</div>
          <div className="font-mono text-lg text-trace">{centroid ? `${(centroid / 1000).toFixed(2)} kHz` : '—'}</div>
        </div>
        <div className="panel p-3">
          <div className="readout">level</div>
          <div className="font-mono text-lg text-trace">{level > -89 ? `${level.toFixed(0)} dB` : '—'}</div>
        </div>
      </div>

      <p className="text-sm text-muted mt-4">
        Audio is processed in your browser and never sent anywhere. Synthetic speech tends to sit unnaturally
        still in these bands — that stability is one of the cues the trained Random Forest picks up on,
        after spectral gating strips 65% of the interference.
      </p>
    </div>
  );
}
