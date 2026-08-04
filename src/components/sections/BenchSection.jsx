import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import FieldDemo from '@/components/demos/FieldDemo';
import AudioDemo from '@/components/demos/AudioDemo';
import ThresholdDemo from '@/components/demos/ThresholdDemo';

const INSTRUMENTS = [
  {
    id: 'field',
    tab: 'Rotating field',
    title: '6-phase machine, one winding down',
    caption: 'From the IEEE GIEST 2024 Best Paper Award: dual-rotor 6-phase PMSM for EVs',
    tracks: ['power'],
    Component: FieldDemo,
  },
  {
    id: 'audio',
    tab: 'Voice features',
    title: 'Your voice, in the frequency domain',
    caption: 'The live MFCC front end from the human-vs-AI voice paper (89% accuracy)',
    tracks: ['ml'],
    Component: AudioDemo,
  },
  {
    id: 'threshold',
    tab: 'Fault threshold',
    title: 'Where to draw the line on a fault call',
    caption: 'The operating point behind 96.5% accuracy and 78% fewer false positives',
    tracks: ['ml', 'embedded'],
    Component: ThresholdDemo,
  },
];

export default function BenchSection({ track }) {
  const [active, setActive] = useState('field');

  // Someone who came here for ML work should land on the ML instrument.
  useEffect(() => {
    if (track === 'all') return;
    const match = INSTRUMENTS.find((i) => i.tracks.includes(track));
    if (match) setActive(match.id);
  }, [track]);

  const current = INSTRUMENTS.find((i) => i.id === active);
  const Demo = current.Component;

  return (
    <section id="bench" className="py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          channel="CH1 · THE BENCH"
          title="Run my research in your browser"
          subtitle="Three working instruments, each pulled out of a real project. Nothing here is a screenshot — drag the controls and the physics responds."
        />

        <div className="flex flex-wrap gap-2 mb-6">
          {INSTRUMENTS.map((i) => (
            <button key={i.id} onClick={() => setActive(i.id)}
              className={`chip ${active === i.id ? 'chip-on' : 'hover:text-fg'}`} aria-pressed={active === i.id}>
              {i.tab}
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="panel p-5 sm:p-8">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold">{current.title}</h3>
            <p className="readout mt-1">{current.caption}</p>
          </div>
          <Demo />
        </motion.div>
      </div>
    </section>
  );
}
