import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { faq, profile } from '@/data/portfolio';

const SUGGESTIONS = ['When can you start?', 'What is your strongest project?', 'Tell me about the IEEE paper', 'What is your ML stack?'];

// Keyword overlap against the curated FAQ in portfolio.js. Everything runs in
// the browser, so the widget works on a static deploy with nothing to configure.
function localAnswer(text) {
  const t = text.toLowerCase();
  let best = null, score = 0;
  for (const item of faq) {
    const s = item.q.reduce((acc, k) => acc + (t.includes(k) ? k.length : 0), 0);
    if (s > score) { score = s; best = item; }
  }
  if (best) return best.a;
  return `I do not have that one written down. Email ${profile.email} and Raza will answer directly — or ask about his projects, papers, internships or availability.`;
}

export default function AskWidget({ open, setOpen }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ask me anything about Raza’s work — projects, papers, stack, availability.' },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open]);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    const next = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setInput('');
    setBusy(true);

    // Answers come from the curated FAQ in portfolio.js - no server, no API key,
    // and nothing here can invent a credential.
    window.setTimeout(() => {
      setMessages([...next, { role: 'assistant', content: localAnswer(q) }]);
      setBusy(false);
    }, 320);
  };

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-40 btn btn-solid shadow-lg shadow-black/30 rounded-full px-5"
        aria-label="Ask about my work">
        {open ? <X size={17} /> : <MessageSquare size={17} />}
        <span className="hidden sm:inline">{open ? 'Close' : 'Ask about my work'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:w-[24rem] z-40 panel flex flex-col max-h-[70vh]"
            role="dialog" aria-label="Ask about Raza's work">
            <div className="px-4 py-3 border-b border-line flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-trace" />
              <span className="readout">ask about my work</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm rounded-lg px-3 py-2 max-w-[90%] ${
                  m.role === 'user' ? 'ml-auto bg-trace/15 text-fg' : 'bg-ink border border-line text-muted'}`}>
                  {m.content}
                </div>
              ))}
              {busy && <div className="readout">thinking…</div>}
              <div ref={endRef} />
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="chip hover:text-fg text-left">{s}</button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-line flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Type a question…"
                className="flex-1 bg-ink border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-trace" />
              <button onClick={() => send()} className="btn btn-solid px-3 py-2" aria-label="Send question">
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
