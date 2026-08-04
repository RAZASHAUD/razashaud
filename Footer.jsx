import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { profile } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left">
          <p className="font-display font-bold">{profile.name}</p>
          <p className="readout mt-1">{profile.available}</p>
        </div>
        <div className="flex items-center gap-5">
          <a href={`mailto:${profile.email}`} className="text-muted hover:text-trace transition-colors" aria-label="Email"><Mail size={18} /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-trace transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-trace transition-colors" aria-label="GitHub"><Github size={18} /></a>
        </div>
        <p className="readout">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
