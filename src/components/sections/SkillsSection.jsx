import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { skills, projects } from '@/data/portfolio';

export default function SkillsSection({ track, highlight, setHighlight, scrollToSection }) {
  const usedIn = (skill) => projects.filter((p) => p.stack.includes(skill));

  const pick = (skill) => {
    if (highlight === skill) { setHighlight(null); return; }
    setHighlight(skill);
    if (usedIn(skill).length) scrollToSection('projects');
  };

  const groups = skills.filter((g) => track === 'all' || g.tracks.includes(track) || g.tracks.includes('all'));

  return (
    <section id="skills" className="py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          channel="CH3 · SKILLS"
          title="Tap a tool to see where I used it"
          subtitle="Anything with a project behind it jumps you to the evidence. The rest is honest supporting cast."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, i) => (
            <motion.div key={g.group} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="panel p-5">
              <h3 className="readout text-trace mb-4">{g.group}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => {
                  const n = usedIn(s).length;
                  return (
                    <button key={s} onClick={() => pick(s)}
                      className={`chip ${highlight === s ? 'chip-on' : n ? 'hover:text-fg cursor-pointer' : 'opacity-70'}`}
                      title={n ? `Used in ${n} project${n > 1 ? 's' : ''}` : 'Coursework and self-study'}>
                      {s}{n > 0 && <span className="ml-1.5 text-[0.65rem] opacity-70">{n}</span>}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {highlight && (
          <p className="mt-6 text-sm text-muted">
            Showing where <span className="text-trace font-mono">{highlight}</span> appears.{' '}
            <button onClick={() => setHighlight(null)} className="link-underline">Clear</button>
          </p>
        )}
      </div>
    </section>
  );
}
