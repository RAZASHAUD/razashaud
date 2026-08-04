import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Trophy, Users } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { publications, achievements, responsibilities, extras } from '@/data/portfolio';

const Row = ({ item, icon: Icon }) => (
  <li className="flex gap-3 py-2.5 border-b border-line last:border-0">
    <Icon size={15} className="text-trace shrink-0 mt-1" />
    <div className="flex-1">
      <div className="text-sm font-medium">{item.title}</div>
      <div className="text-muted text-sm">{item.note}</div>
    </div>
    <span className="readout shrink-0">{item.year}</span>
  </li>
);

export default function PublicationsSection() {
  return (
    <section id="research" className="py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          channel="CH4 · RESEARCH & RECOGNITION"
          title="Published work"
          subtitle="Three papers, one of them a Best Paper Award at an IEEE conference."
        />

        <div className="space-y-4">
          {publications.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`panel p-6 ${p.featured ? 'border-live/50' : ''}`}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Award size={16} className={p.featured ? 'text-live' : 'text-trace'} />
                <span className={`readout ${p.featured ? 'text-live' : 'text-trace'}`}>{p.kind}</span>
                <span className="readout">{p.venue}</span>
              </div>
              <h3 className="font-display text-lg font-bold">{p.title}</h3>
              <p className="text-muted text-sm mt-2">{p.note}</p>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-trace mt-3 link-underline">
                  Read the paper <ExternalLink size={13} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mt-10">
          <div className="panel p-6">
            <h3 className="readout text-trace mb-2">Achievements</h3>
            <ul>{achievements.map((a) => <Row key={a.title} item={a} icon={Trophy} />)}</ul>
          </div>
          <div className="panel p-6">
            <h3 className="readout text-trace mb-2">Positions of responsibility</h3>
            <ul>{responsibilities.map((r) => <Row key={r.title} item={r} icon={Users} />)}</ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          <div className="panel p-5">
            <h3 className="readout text-trace mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">{extras.languages.map((l) => <span key={l} className="chip">{l}</span>)}</div>
          </div>
          <div className="panel p-5">
            <h3 className="readout text-trace mb-3">Away from the bench</h3>
            <div className="flex flex-wrap gap-2">{extras.interests.map((l) => <span key={l} className="chip">{l}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
