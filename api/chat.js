// Vercel serverless function. Optional: the site works without it (the ask
// widget falls back to a curated FAQ). Add ANTHROPIC_API_KEY in your Vercel
// project settings to turn on real answers.
import { profile, projects, publications, experience, education, skills, achievements, responsibilities } from '../src/data/portfolio.js';

const FACTS = `
Name: ${profile.name}. ${profile.role}. ${profile.location}. ${profile.available}.
Contact: ${profile.email} / ${profile.emailInstitute}. Phone ${profile.phone}. GitHub ${profile.github}. LinkedIn ${profile.linkedin}.
Current programme: ${profile.role}. Roll no. ${profile.rollNo}.
Education: ${education.map((e) => `${e.degree}, ${e.school} (${e.period})${e.detail ? ', ' + e.detail : ''}`).join('; ')}.
Experience: ${experience.map((e) => `${e.title} at ${e.company}, ${e.place} (${e.period}) — ${e.points.join(' ')}`).join(' | ')}.
Projects: ${projects.map((p) => `${p.title} [${p.metric} ${p.metricLabel}] — ${p.summary} Stack: ${p.stack.join(', ')}. Results: ${p.results.join('; ')}`).join(' | ')}.
Publications: ${publications.map((p) => `${p.title} (${p.kind}, ${p.venue}) — ${p.note}`).join(' | ')}.
Skills: ${skills.map((s) => `${s.group}: ${s.items.join(', ')}`).join(' | ')}.
Achievements: ${achievements.map((a) => `${a.title} (${a.year}) — ${a.note}`).join(' | ')}.
Positions of responsibility: ${responsibilities.map((r) => `${r.title}, ${r.note} (${r.year})`).join(' | ')}.
`;

const SYSTEM = `You answer questions about Raza Shaud for visitors to his portfolio — usually recruiters and hiring managers.

Rules:
- Answer only from the facts below. If something is not there, say so plainly and point them to ${profile.email}.
- Never invent numbers, employers, dates or credentials.
- Two or three sentences. Plain, confident, no sales language.
- Speak about Raza in the third person.

FACTS
${FACTS}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: 'Not configured' });

  try {
    const { messages = [] } = req.body || {};
    const clean = messages
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
    if (!clean.length || clean[0].role !== 'user') clean.unshift({ role: 'user', content: 'Tell me about Raza.' });

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM,
        messages: clean,
      }),
    });

    if (!r.ok) return res.status(502).json({ error: 'Upstream error' });
    const data = await r.json();
    const text = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
    return res.status(200).json({ text });
  } catch {
    return res.status(500).json({ error: 'Request failed' });
  }
}
