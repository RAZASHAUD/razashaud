import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, MapPin } from 'lucide-react';
import { profile, tracks, stats } from '@/data/portfolio';
import photo from '../../assets/photo.jpg';

// A slow scope trace across the fold - the page opens on a signal, because
// every project here starts with one.
function TraceBackdrop() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf, t = 0, w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);
      const color = getComputedStyle(document.documentElement).getPropertyValue('--trace').trim();
      for (let layer = 0; layer < 2; layer++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const p = x / w;
          const y = h / 2
            + Math.sin(p * 7 + t + layer * 1.7) * h * 0.16
            + Math.sin(p * 17 - t * 1.6) * h * 0.05
            + Math.sin(p * 31 + t * 0.7) * h * 0.02;
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = `rgb(${color})`;
        ctx.globalAlpha = layer ? 0.08 : 0.2;
        ctx.lineWidth = layer ? 3 : 1.4;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-x-0 bottom-0 h-56 w-full pointer-events-none" aria-hidden="true" />;
}

export default function HeroSection({ track, setTrack, scrollToSection }) {
  const active = tracks.find((t) => t.id === track) || tracks[0];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 grid-field overflow-hidden">
      <TraceBackdrop />
      <div className="relative max-w-6xl mx-auto px-5 w-full">
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-live opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
              </span>
              <span className="readout">{profile.available}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
              className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
              Raza Shaud
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-3 font-mono text-sm text-trace">
              {profile.role}
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-4 text-lg md:text-xl text-fg/85 max-w-xl">
              I build things that measure the physical world and decide what to do about it —
              vision models on sensor data, firmware on the bench, machines that have to keep turning.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-9">
              <p className="readout mb-3">What are you hiring for?</p>
              <div className="flex flex-wrap gap-2">
                {tracks.map((t) => (
                  <button key={t.id} onClick={() => setTrack(t.id)}
                    className={`chip ${track === t.id ? 'chip-on' : 'hover:text-fg'}`}
                    aria-pressed={track === t.id}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 min-h-[5.5rem] sm:min-h-[4.5rem]">
                <AnimatePresence mode="wait">
                  <motion.p key={active.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-muted border-l-2 border-trace/60 pl-4 max-w-xl">
                    {active.pitch}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8">
              <button onClick={() => scrollToSection('projects')} className="btn btn-solid">
                See my work <ArrowRight size={16} />
              </button>
              <a href={profile.resume} download="Raza_Shaud_Resume.pdf" className="btn btn-ghost">
                <Download size={16} /> Resume
              </a>
            </motion.div>

            <div className="flex items-center gap-2 mt-6 readout">
              <MapPin size={13} /> {profile.location}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="panel p-2">
              <img src={photo} alt="Raza Shaud" className="w-full rounded-md object-cover aspect-[4/5]"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line mt-14 rounded-lg overflow-hidden border border-line">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }} className="bg-panel p-4">
              <div className="font-mono text-2xl text-trace">{s.value}</div>
              <div className="text-sm mt-1">{s.label}</div>
              <div className="readout mt-0.5">{s.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
