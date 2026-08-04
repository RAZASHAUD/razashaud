# Raza Shaud — Portfolio

Live site: https://razashaud.vercel.app

## Deploy

```bash
npm install
npm run build     # check it builds
git add -A
git commit -m "Portfolio update"
git push
```

Vercel redeploys on push. Nothing needs configuring — no API keys, no environment
variables, no serverless functions. The contact form posts to Formspree
(form ID `mbgrrgll`, set in `src/data/portfolio.js`).

## Run locally

```bash
npm install
npm run dev
```

## Editing content

Everything on the site — profile, projects, skills, experience, education,
publications, achievements and the chat widget's answers — lives in one file:

```
src/data/portfolio.js
```

Change it there and the whole page updates. Nothing else needs touching.

## The résumé

`public/resume.pdf` is the one-page IIT Guwahati format résumé. To replace it,
overwrite that file with the same name and push.
