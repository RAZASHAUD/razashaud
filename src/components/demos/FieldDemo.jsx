import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Rotating-field visualiser for a 6-phase vs 3-phase machine.
 * Currents i_k = sin(theta - k*delta) are summed as space vectors at the
 * stator slot angles. With every phase healthy the tip traces a circle;
 * open one phase and the locus collapses into an ellipse - which is the
 * torque ripple you feel as cogging. Six phases degrade far more gracefully
 * than three, which is the practical argument in the IEEE GIEST paper.
 */
const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

export default function FieldDemo() {
  const canvasRef = useRef(null);
  const thetaRef = useRef(0);
  const rafRef = useRef(0);
  const [phases, setPhases] = useState(6);
  const [openPhase, setOpenPhase] = useState(false);
  const [running, setRunning] = useState(true);
  const [freq, setFreq] = useState(1.0);
  const [mag, setMag] = useState(0);

  const cfg = useMemo(() => ({ phases, openPhase }), [phases, openPhase]);

  // Torque-ripple figure: sweep a full electrical cycle and measure how much
  // the resultant magnitude moves. Balanced windings give ~0%.
  const ripple = useMemo(() => {
    let min = Infinity, max = -Infinity, sum = 0;
    const step = (2 * Math.PI) / 720;
    for (let t = 0; t < 2 * Math.PI; t += step) {
      let x = 0, y = 0;
      for (let k = 0; k < phases; k++) {
        if (openPhase && k === 0) continue;
        const a = (k * 2 * Math.PI) / phases;
        const i = Math.sin(t - a);
        x += i * Math.cos(a);
        y += i * Math.sin(a);
      }
      const m = Math.hypot(x, y);
      min = Math.min(min, m); max = Math.max(max, m); sum += m;
    }
    const mean = sum / 720;
    return mean > 0.001 ? ((max - min) / mean) * 100 : 0;
  }, [phases, openPhase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const locus = [];
    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let last = performance.now();
    let frames = 0;
    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (running && !reduce) thetaRef.current += dt * freq * 2 * Math.PI;
      const theta = thetaRef.current;

      const trace = `rgb(${css('--trace')})`;
      const live = `rgb(${css('--live')})`;
      const line = `rgb(${css('--line')})`;
      const muted = `rgb(${css('--muted')})`;

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.36;

      // stator bore
      ctx.strokeStyle = line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.24, 0, 2 * Math.PI); ctx.stroke();

      // windings, sized by instantaneous current
      const P = cfg.phases;
      let vx = 0, vy = 0;
      for (let k = 0; k < P; k++) {
        const a = (k * 2 * Math.PI) / P;
        const dead = cfg.openPhase && k === 0;
        const i = dead ? 0 : Math.sin(theta - a);
        vx += i * Math.cos(a); vy += i * Math.sin(a);
        const px = cx + Math.cos(a) * R, py = cy + Math.sin(a) * R;
        ctx.beginPath();
        ctx.arc(px, py, 5 + Math.abs(i) * 9, 0, 2 * Math.PI);
        ctx.fillStyle = dead ? 'rgba(239,68,68,0.75)' : (i >= 0 ? trace : live);
        ctx.globalAlpha = dead ? 1 : 0.25 + Math.abs(i) * 0.65;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillStyle = muted; ctx.textAlign = 'center';
        ctx.fillText(String.fromCharCode(65 + k), cx + Math.cos(a) * (R + 18), cy + Math.sin(a) * (R + 18) + 3);
      }

      const scale = R / (P / 2);
      const tipX = cx + vx * scale, tipY = cy + vy * scale;

      locus.push([tipX, tipY]);
      if (locus.length > 260) locus.shift();
      ctx.beginPath();
      locus.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = trace; ctx.globalAlpha = 0.35; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.globalAlpha = 1;

      // resultant space vector
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(tipX, tipY);
      ctx.strokeStyle = trace; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(tipX, tipY, 5, 0, 2 * Math.PI); ctx.fillStyle = trace; ctx.fill();

      if (++frames % 6 === 0) setMag(Math.hypot(vx, vy) / (P / 2));
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, [cfg, running, freq]);

  return (
    <div>
      <canvas ref={canvasRef} className="w-full h-[300px] sm:h-[340px]" aria-label="Rotating magnetic field visualiser" />

      <div className="flex flex-wrap gap-2 mt-4">
        {[6, 3].map((p) => (
          <button key={p} onClick={() => setPhases(p)} className={`chip ${phases === p ? 'chip-on' : ''}`}>
            {p}-phase
          </button>
        ))}
        <button onClick={() => setOpenPhase(!openPhase)} className={`chip ${openPhase ? 'chip-on' : ''}`}>
          {openPhase ? 'phase A open' : 'all healthy'}
        </button>
        <button onClick={() => setRunning(!running)} className="chip">{running ? 'pause' : 'run'}</button>
      </div>

      <label className="flex items-center gap-3 mt-4">
        <span className="readout shrink-0">speed</span>
        <input type="range" min="0.1" max="3" step="0.1" value={freq}
          onChange={(e) => setFreq(parseFloat(e.target.value))}
          className="w-full accent-[rgb(var(--trace))]" aria-label="Field rotation speed" />
      </label>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="panel p-3">
          <div className="readout">field magnitude</div>
          <div className="font-mono text-lg text-trace">{mag.toFixed(2)} pu</div>
        </div>
        <div className="panel p-3">
          <div className="readout">torque ripple</div>
          <div className={`font-mono text-lg ${ripple > 5 ? 'text-live' : 'text-trace'}`}>{ripple.toFixed(1)}%</div>
        </div>
      </div>

      <p className="text-sm text-muted mt-4">
        Open phase A on the 6-phase machine and the locus dents slightly — {ripple > 0 && phases === 6 && openPhase ? `${ripple.toFixed(0)}%` : 'a few percent'} ripple, still driveable.
        Do the same on 3-phase and the field collapses onto a line. That fault tolerance is the argument
        for six phases in an EV traction motor, and it is what the IEEE GIEST paper measures.
      </p>
    </div>
  );
}
