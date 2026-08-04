import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { experience, education } from '@/data/portfolio';

export default function ExperienceSection({ track }) {
  const shown = experience.filter((e) => track === 'all' || e.tracks.includes(track));
  const list = shown.length ? shown : experience;

  return (
    <section id="experience" className="py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          channel="CH3 · EXPERIENCE"
          title="Where I have already worked"
          subtitle="Two of these were on live industrial plant. That is where you learn what a spec sheet leaves out."
        />

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12">
          <div className="relative pl-6 border-l border-line">
            {list.map((e, i) => (
              <motion.div key={e.company} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative pb-10 last:pb-0">
                <span className="absolute -left-[1.72rem] top-1.5 w-2.5 h-2.5 rounded-full bg-trace ring-4 ring-ink" />
                <div className="readout">{e.period}</div>
                <h3 className="font-display text-lg font-bold mt-1">{e.title}</h3>
                <div className="text-trace text-sm font-mono">{e.company}</div>
                {e.place && <div className="readout mt-0.5">{e.place}</div>}
                <ul className="mt-3 space-y-1.5">
                  {e.points.map((p) => <li key={p} className="text-muted text-sm">{p}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 className="readout text-trace mb-4">Education</h3>
            <div className="space-y-4">
              {education.map((ed) => (
                <div key={ed.degree} className="panel p-5">
                  <div className="readout">{ed.period}</div>
                  <div className="font-display font-bold mt-1">{ed.degree}</div>
                  <div className="text-muted text-sm mt-1">{ed.school}</div>
                  {ed.detail && <div className="readout mt-1 text-trace">{ed.detail}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
