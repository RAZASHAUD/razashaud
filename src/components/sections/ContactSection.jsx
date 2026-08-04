import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download, Linkedin, Github, Send } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { profile } from '@/data/portfolio';

const ROLES = ['ML / Computer Vision', 'Embedded / IoT', 'Power & Machines', 'Something else'];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: ROLES[0], message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    if (profile.formspreeId) {
      try {
        const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        setStatus(res.ok ? 'sent' : 'error');
      } catch {
        setStatus('error');
      }
      return;
    }

    // No form backend wired up yet - hand the message to their mail client instead.
    const body = `${form.message}\n\n—\n${form.name}${form.company ? `, ${form.company}` : ''}\n${form.email}\nRole: ${form.role}`;
    window.location.href =
      `mailto:${profile.email}?subject=${encodeURIComponent(`Opportunity — ${form.role}`)}&body=${encodeURIComponent(body)}`;
    setStatus('sent');
  };

  return (
    <section id="contact" className="py-24 border-t border-line grid-field">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          channel="CH6 · CONTACT"
          title="Tell me what you need built"
          subtitle="I answer every message that names a real project. Currently at IIT Guwahati — open to summer internships, research collaborations and anything that needs sensors, models and hardware in the same room."
        />

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10">
          <div className="space-y-3">
            <button onClick={copyEmail} className="panel panel-hover p-5 w-full text-left flex items-center justify-between gap-4">
              <div>
                <div className="readout">email</div>
                <div className="font-mono text-sm mt-1 break-all">{profile.email}</div>
                <div className="readout mt-1 break-all">{profile.emailInstitute}</div>
              </div>
              {copied ? <Check size={17} className="text-trace shrink-0" /> : <Copy size={17} className="text-muted shrink-0" />}
            </button>

            <a href={profile.resume} download="Raza_Shaud_Resume.pdf" className="panel panel-hover p-5 flex items-center justify-between gap-4">
              <div>
                <div className="readout">resume</div>
                <div className="text-sm mt-1">One page, IIT Guwahati format</div>
              </div>
              <Download size={17} className="text-muted" />
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="panel panel-hover p-5 flex items-center gap-3">
                <Linkedin size={17} className="text-muted" /><span className="text-sm">LinkedIn</span>
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="panel panel-hover p-5 flex items-center gap-3">
                <Github size={17} className="text-muted" /><span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>

          <motion.form onSubmit={submit} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} className="panel p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="readout">your name</span>
                <input required value={form.name} onChange={set('name')}
                  className="w-full mt-1.5 bg-ink border border-line rounded-md px-3 py-2.5 text-sm focus:border-trace outline-none" />
              </label>
              <label className="block">
                <span className="readout">email</span>
                <input required type="email" value={form.email} onChange={set('email')}
                  className="w-full mt-1.5 bg-ink border border-line rounded-md px-3 py-2.5 text-sm focus:border-trace outline-none" />
              </label>
            </div>

            <label className="block">
              <span className="readout">company</span>
              <input value={form.company} onChange={set('company')}
                className="w-full mt-1.5 bg-ink border border-line rounded-md px-3 py-2.5 text-sm focus:border-trace outline-none" />
            </label>

            <div>
              <span className="readout">hiring for</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {ROLES.map((r) => (
                  <button type="button" key={r} onClick={() => setForm({ ...form, role: r })}
                    className={`chip ${form.role === r ? 'chip-on' : 'hover:text-fg'}`}>{r}</button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="readout">what would I be working on?</span>
              <textarea required rows={4} value={form.message} onChange={set('message')}
                className="w-full mt-1.5 bg-ink border border-line rounded-md px-3 py-2.5 text-sm focus:border-trace outline-none resize-y" />
            </label>

            <button type="submit" disabled={status === 'sending'} className="btn btn-solid w-full disabled:opacity-60">
              <Send size={16} /> {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'sent' && (
              <p className="text-sm text-trace">Message on its way. I usually reply within a day.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-live">
                That did not go through. Email {profile.email} directly and it will reach me.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
