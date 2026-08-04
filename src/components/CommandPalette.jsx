import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CornerDownLeft } from 'lucide-react';
import { profile, tracks } from '@/data/portfolio';

export default function CommandPalette({ open, setOpen, scrollToSection, toggleTheme, setTrack, openAsk }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => [
    { label: 'Go to the live demos', group: 'Navigate', run: () => scrollToSection('bench') },
    { label: 'Go to projects', group: 'Navigate', run: () => scrollToSection('projects') },
    { label: 'Go to skills', group: 'Navigate', run: () => scrollToSection('skills') },
    { label: 'Go to experience', group: 'Navigate', run: () => scrollToSection('experience') },
    { label: 'Go to research and papers', group: 'Navigate', run: () => scrollToSection('research') },
    { label: 'Go to the résumé', group: 'Navigate', run: () => scrollToSection('resume') },
    { label: 'Go to contact', group: 'Navigate', run: () => scrollToSection('contact') },
    { label: 'Ask a question about my work', group: 'Actions', run: openAsk },
    { label: 'Download résumé — IIT Guwahati format (PDF)', group: 'Actions', run: () => { const a = document.createElement('a'); a.href = profile.resume; a.download = 'Raza_Shaud_Resume.pdf'; a.click(); } },
    { label: 'Download résumé — ATS plain (DOCX)', group: 'Actions', run: () => { const a = document.createElement('a'); a.href = profile.resumeAts; a.download = 'Raza_Shaud_Resume_ATS.docx'; a.click(); } },
    { label: `Copy email — ${profile.email}`, group: 'Actions', run: () => navigator.clipboard.writeText(profile.email) },
    { label: 'Open LinkedIn', group: 'Actions', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
    { label: 'Open GitHub', group: 'Actions', run: () => window.open(profile.github, '_blank', 'noopener') },
    { label: 'Switch light / dark', group: 'Actions', run: toggleTheme },
    ...tracks.map((t) => ({ label: `Tailor the page to ${t.label}`, group: 'Hiring for', run: () => { setTrack(t.id); scrollToSection('home'); } })),
  ], [scrollToSection, toggleTheme, setTrack, openAsk]);

  const results = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 40); } }, [open]);

  if (!open) return null;

  const fire = (c) => { c.run(); setOpen(false); };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm p-4 sm:pt-[12vh]" onClick={() => setOpen(false)}>
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="panel max-w-lg mx-auto overflow-hidden" role="dialog" aria-label="Command palette">
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <Search size={16} className="text-muted shrink-0" />
          <input ref={inputRef} value={q}
            onChange={(e) => { setQ(e.target.value); setSel(0); }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
              if (e.key === 'Enter' && results[sel]) fire(results[sel]);
            }}
            placeholder="Jump anywhere, or type what you need…"
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted" />
        </div>
        <ul className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 && <li className="px-4 py-6 text-sm text-muted">Nothing matches. Try “resume”, “demos” or “email”.</li>}
          {results.map((c, i) => (
            <li key={c.label}>
              <button onMouseEnter={() => setSel(i)} onClick={() => fire(c)}
                className={`w-full flex items-center justify-between gap-4 px-4 py-2.5 text-left text-sm ${i === sel ? 'bg-trace/10 text-trace' : 'text-fg'}`}>
                <span>{c.label}</span>
                <span className="readout shrink-0">{i === sel ? <CornerDownLeft size={13} /> : c.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
