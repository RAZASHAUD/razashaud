import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Operating-point explorer for the cable-fault classifier.
 * The two distributions are illustrative - they carry the class separation
 * implied by the reported 96.5% operating point, not raw project data.
 * The point of the widget is the trade-off: a utility that hates false alarms
 * and a utility that hates missed faults want different thresholds.
 */
const N = 1000, MU_OK = 0.30, MU_FAULT = 0.70, SIGMA = 0.11;
const erf = (x) => {
  const s = Math.sign(x); x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
};
const cdf = (x, mu, sd) => 0.5 * (1 + erf((x - mu) / (sd * Math.SQRT2)));
const pdf = (x, mu, sd) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

export default function ThresholdDemo() {
  const canvasRef = useRef(null);
  const [t, setT] = useState(0.5);

  const m = useMemo(() => {
    const TP = N * (1 - cdf(t, MU_FAULT, SIGMA));
    const FN = N - TP;
    const FP = N * (1 - cdf(t, MU_OK, SIGMA));
    const TN = N - FP;
    return {
      TP: Math.round(TP), FN: Math.round(FN), FP: Math.round(FP), TN: Math.round(TN),
      acc: ((TP + TN) / (2 * N)) * 100,
      prec: TP + FP > 0 ? (TP / (TP + FP)) * 100 : 0,
      rec: (TP / N) * 100,
    };
  }, [t]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const peak = pdf(MU_OK, MU_OK, SIGMA);
    const curve = (mu, color) => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let px = 0; px <= w; px++) {
        const y = h - (pdf(px / w, mu, SIGMA) / peak) * (h - 14);
        ctx.lineTo(px, y);
      }
      ctx.lineTo(w, h); ctx.closePath();
      ctx.fillStyle = color; ctx.globalAlpha = 0.16; ctx.fill();
      ctx.globalAlpha = 1; ctx.strokeStyle = color; ctx.lineWidth = 1.6; ctx.stroke();
    };
    curve(MU_OK, `rgb(${css('--trace')})`);
    curve(MU_FAULT, `rgb(${css('--live')})`);

    const tx = t * w;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(tx, 0); ctx.lineTo(tx, h);
    ctx.strokeStyle = `rgb(${css('--fg')})`; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = '500 10px "JetBrains Mono", monospace';
    ctx.fillStyle = `rgb(${css('--muted')})`;
    ctx.textAlign = 'left'; ctx.fillText('INTACT', 8, 14);
    ctx.textAlign = 'right'; ctx.fillText('FAULT', w - 8, 14);
  }, [t]);

  return (
    <div>
      <canvas ref={canvasRef} className="w-full h-[170px] block" aria-label="Score distributions with decision threshold" />
      <label className="block mt-3">
        <span className="readout">decision threshold · {t.toFixed(2)}</span>
        <input type="range" min="0.05" max="0.95" step="0.01" value={t}
          onChange={(e) => setT(parseFloat(e.target.value))}
          className="w-full mt-1 accent-[rgb(var(--trace))]" aria-label="Decision threshold" />
      </label>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {[['accuracy', m.acc], ['precision', m.prec], ['recall', m.rec]].map(([k, v]) => (
          <div key={k} className="panel p-3">
            <div className="readout">{k}</div>
            <div className="font-mono text-lg text-trace">{v.toFixed(1)}%</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-px mt-3 bg-line rounded-md overflow-hidden text-sm">
        <div className="bg-panel p-3"><span className="readout block">caught faults</span><span className="font-mono text-trace">{m.TP}</span></div>
        <div className="bg-panel p-3"><span className="readout block">missed faults</span><span className="font-mono text-live">{m.FN}</span></div>
        <div className="bg-panel p-3"><span className="readout block">false alarms</span><span className="font-mono text-live">{m.FP}</span></div>
        <div className="bg-panel p-3"><span className="readout block">correctly clear</span><span className="font-mono text-trace">{m.TN}</span></div>
      </div>

      <p className="text-sm text-muted mt-4">
        Drag the threshold. Push it left and no fault escapes, but crews get sent out for nothing;
        push it right and the truck rolls only when it must, while damaged spans stay in service.
        Cutting false positives by 78% meant moving this line deliberately, not just maximising accuracy.
        Distributions here are illustrative, set to the separation behind the reported 96.5% operating point.
      </p>
    </div>
  );
}
