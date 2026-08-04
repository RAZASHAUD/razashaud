import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Command } from 'lucide-react';

const NAV = [
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['research', 'Research'],
  ['resume', 'Résumé'],
];

export default function Header({ activeSection, scrollToSection, theme, toggleTheme, openPalette }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <button onClick={() => scrollToSection('home')} className="flex items-center gap-2.5 shrink-0">
          <span className="grid place-items-center w-8 h-8 rounded border border-trace/50 font-mono text-xs text-trace">RS</span>
          <span className="font-display font-bold tracking-tight hidden sm:block">Raza Shaud</span>
        </button>

        <nav className="hidden md:flex items-center gap-6" aria-label="Sections">
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => scrollToSection(id)}
              className={`text-sm transition-colors ${activeSection === id ? 'text-trace' : 'text-muted hover:text-fg'}`}
              aria-current={activeSection === id ? 'true' : undefined}>
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={openPalette} className="hidden sm:flex items-center gap-1.5 chip" aria-label="Open command palette">
            <Command size={12} /> K
          </button>
          <button onClick={toggleTheme} className="p-2 text-muted hover:text-trace transition-colors" aria-label="Switch colour theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn btn-solid text-sm py-2 px-4 hidden sm:inline-flex">
            Hire me
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-muted" aria-expanded={open} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-panel px-5 py-3 space-y-1">
          {[...NAV, ['contact', 'Contact']].map(([id, label]) => (
            <button key={id} onClick={() => { scrollToSection(id); setOpen(false); }}
              className="block w-full text-left py-2 text-sm text-muted hover:text-trace">
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
