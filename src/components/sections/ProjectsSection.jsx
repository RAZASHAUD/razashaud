import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ExternalLink } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { projects } from '@/data/portfolio';

function CaseStudy({ project, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto p-4 sm:p-8"
      onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <motion.article initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="panel max-w-2xl mx-auto my-4 p-6 sm:p-9">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="readout text-trace">{project.metric} · {project.metricLabel}</span>
            <h3 className="font-display text-2xl font-bold mt-2">{project.title}</h3>
            <p className="readout mt-1">{project.context} · {project.period}</p>
          </div>
          <button onClick={onClose} className="p-2 text-muted hover:text-fg shrink-0" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-7">
          <div>
            <p className="readout mb-2">The problem</p>
            <p className="text-muted">{project.problem}</p>
          </div>
          <div>
            <p className="readout mb-2">What I built</p>
            <ul className="space-y-2">
              {project.approach.map((a) => (
                <li key={a} className="flex gap-3 text-muted">
                  <span className="text-trace mt-1.5 h-1 w-1 rounded-full bg-trace shrink-0" />{a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="readout mb-2">Outcome</p>
            <ul className="space-y-2">
              {project.results.map((r) => (
                <li key={r} className="font-mono text-sm text-trace">{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="readout mb-2">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-sm py-2">
                  {l.label} <ExternalLink size={14} />
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function ProjectsSection({ track, highlight }) {
  const [open, setOpen] = useState(null);
  const shown = projects.filter((p) => track === 'all' || p.tracks.includes(track));

  return (
    <section id="projects" className="py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          channel="CH2 · PROJECTS"
          title="Three builds, measured"
          subtitle={track === 'all'
            ? 'Open any card for the problem, the build and the numbers.'
            : `Filtered to the track you picked — ${shown.length} of ${projects.length} projects.`}
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.button key={p.id} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                onClick={() => setOpen(p)}
                className={`panel panel-hover p-6 text-left group ${highlight && p.stack.includes(highlight) ? 'border-trace/60' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold group-hover:text-trace transition-colors">{p.title}</h3>
                  <ArrowUpRight size={18} className="text-muted group-hover:text-trace transition-colors shrink-0" />
                </div>
                <div className="font-mono text-sm text-trace mt-2">{p.metric} <span className="text-muted">{p.metricLabel}</span></div>
                <div className="readout mt-1">{p.period}</div>
                <p className="text-muted text-sm mt-3">{p.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className={`chip ${highlight === s ? 'chip-on' : ''}`}>{s}</span>
                  ))}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
