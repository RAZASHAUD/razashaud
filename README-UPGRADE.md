# Portfolio + résumé — what you have and what to do next

Same stack as your original site (Vite + React + Tailwind + framer-motion), no new
dependencies. `npm install && npm run dev` works as before.

Everything on the site now comes from your IIT Guwahati résumé. Nothing is invented.

---

## 1. The résumés

| File | Where it lives | Use it for |
|---|---|---|
| `Raza_Shaud_Resume.pdf` | `public/` (served at `/Raza_Shaud_Resume.pdf`) | IIT Guwahati one-page format. Placement portals, professors, anyone asking for "your CV". |
| `Raza_Shaud_Resume_ATS.docx` | `public/` | Plain single column, no tables. Upload this where a portal auto-fills fields from your file. |
| `Raza_Shaud_Resume_IITG.tex` | `resume-source/` | LaTeX source. Edit on Overleaf or run `pdflatex` locally, then copy the PDF back into `public/`. |
| `build-ats-docx.js` | `resume-source/` | Regenerates the ATS `.docx` (`node build-ats-docx.js`). |

Both fit on one page. Both are real selectable text with standard section names,
consistent date formats and no text trapped inside images — which is what actually
determines whether a parser reads your résumé correctly.

**Two things I changed in the résumé content:**

- Fixed "Obtimized" → "Optimized" in the Tech Solutions bullet.
- Added **GATE 2026, All India Rank 2139** under Achievements. It was missing, and
  for an M.Tech student it is one of the strongest single lines you have.
- Added one bullet each to SAIL and DVC so those entries are not bare headings.
  Both are drawn from how you described them earlier — read them and correct anything
  that overstates what you actually did.

**To add the IITG logo to the header:** drop a file called `iitg-logo.png` next to the
`.tex` file and recompile. The template detects it and lays the header out around it;
without it the header sits flush left, which also looks fine.

## 2. The portfolio

Three of your projects now run as working instruments in the visitor's browser:

| Instrument | What the visitor does | What it proves |
|---|---|---|
| **Rotating field** | Switches 6-phase vs 3-phase, opens a winding, watches the field locus dent instead of collapse | IEEE GIEST 2024 Best Paper — dual-rotor 6-phase PMSM |
| **Voice features** | Speaks into their mic, sees the live MFCC-style band energies | The 89% voice classifier's feature front end |
| **Fault threshold** | Drags the decision threshold, watches false alarms trade against missed faults | Why 96.5% accuracy *and* 78% fewer false positives took a deliberate operating point |

Around them: a hiring-track selector that re-sorts the whole page, project case studies
with your real numbers, skills that jump to the projects that used them, a `⌘K` command
palette, an "ask about my work" widget, a résumé section with inline preview, and a
working contact form. Dark by default, light toggle, keyboard accessible, reduced-motion
respected.

**Corrections I made against your old site:** it listed TensorFlow and described the
voice project as deep learning — your résumé says scikit-learn and a Random Forest, so
the site now says that. The cable project is YOLO v8, not a generic CNN. The face mask
detection project is gone, since it is not on your résumé and an interviewer comparing
the two would notice. The "99% process automation" claim is also gone — it was not
backed anywhere.

## 3. Read this before you publish — the availability line

Your résumé says M.Tech 2026–2028. So the old "available from June 2026" framing was
wrong, and I have set this instead:

```js
// src/data/portfolio.js
available: 'M.Tech 2026–28 · open to summer 2027 internships and research collaborations',
```

**Change that one line if it is wrong.** It appears in the hero, the footer and the
chat widget. If you are actually looking for full-time roles from 2028, or for a
specific research group, say exactly that — it is the first thing a recruiter reads.

## 4. Still to fill in

In `src/data/portfolio.js`:

1. **`experience[0].company`** — "Tech Solutions Inc." reads as a placeholder. Use the real name, or describe it honestly as an unnamed/self-directed engagement.
2. **`projects[].links`** — all three are empty. Your résumé says "Github" next to each project; add the actual repo URLs: `links: [{ label: 'Code', url: 'https://github.com/RAZASHAUD/…' }]`. An engineering portfolio with no code links is the biggest gap left.
3. **`publications[].url`** — IEEE Xplore or journal links where they exist.
4. **`profile.formspreeId`** — free at formspree.io. Without it the contact form falls back to opening the visitor's mail client, which loses a good share of them.
5. **`profile.calendar`** — optional Cal.com/Calendly link; a "book a call" card appears automatically if you add one.

Update the résumé's GitHub links at the same time so the two never disagree.

## 5. Optional: real AI answers in the ask widget

It already works offline from a curated FAQ. To make it answer anything:

1. Get a key at console.anthropic.com.
2. Vercel → project → Settings → Environment Variables → add `ANTHROPIC_API_KEY`.
3. Redeploy. `api/chat.js` picks it up.

The key stays server-side. The system prompt restricts answers to facts from
`portfolio.js` and instructs the model to refuse to invent anything, so it cannot
fabricate a credential on your behalf.

## 6. Deploying

```bash
git add -A
git commit -m "Résumé-driven rebuild: IITG + ATS résumés, live research demos"
git push
```

Vercel redeploys `razashaud.vercel.app` on push. Test the microphone demo on the live
HTTPS site — browsers block mic access over plain HTTP, so it only works on `localhost`
and in production.

## 7. Honesty note on the demos

Each demo states on the page what it is. The field visualiser is real physics computed
live. The audio demo is a real FFT front end on the visitor's own voice, and it says
the classifier itself is a Random Forest trained offline. The threshold explorer says
its distributions are illustrative. Keep that framing — if an interviewer asks "is this
your actual model?", the page has already answered honestly, and that is worth more
than the demo itself.
