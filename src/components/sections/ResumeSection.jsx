import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, FileType2 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { profile } from '@/data/portfolio';

export default function ResumeSection() {
  return (
    <section id="resume" className="py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          channel="CH6 · RÉSUMÉ"
          title="One page, both formats"
          subtitle="The IIT Guwahati format for placement portals and academic applications; a plain single-column version for company job boards that parse resumes automatically."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          <div className="space-y-3">
            <a href={profile.resume} download className="panel panel-hover p-5 flex items-start justify-between gap-4 group">
              <div>
                <div className="readout text-trace">iit guwahati format · pdf</div>
                <div className="font-display font-bold mt-1 group-hover:text-trace transition-colors">Raza_Shaud_Resume.pdf</div>
                <p className="text-muted text-sm mt-1">One page. Use this for placement portals, professors and anyone who asks for “your CV”.</p>
              </div>
              <Download size={18} className="text-muted shrink-0 mt-1" />
            </a>

            <a href={profile.resumeAts} download className="panel panel-hover p-5 flex items-start justify-between gap-4 group">
              <div>
                <div className="readout text-trace">ats plain · docx</div>
                <div className="font-display font-bold mt-1 group-hover:text-trace transition-colors">Raza_Shaud_Resume_ATS.docx</div>
                <p className="text-muted text-sm mt-1">Single column, no tables, standard headings. Use this when a portal asks you to upload and it auto-fills the fields.</p>
              </div>
              <FileType2 size={18} className="text-muted shrink-0 mt-1" />
            </a>

            <div className="panel p-5">
              <div className="readout mb-3">what a parser reads off it</div>
              <ul className="space-y-1.5 text-sm text-muted">
                <li>Real selectable text — no scanned images, no text inside graphics</li>
                <li>Standard section names: Education, Experience, Projects, Skills</li>
                <li>Dates in one consistent format, on the same line as the role</li>
                <li>Every claim carries a number a reader can check</li>
              </ul>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }}
            className="panel overflow-hidden">
            <div className="px-4 py-2.5 border-b border-line flex items-center gap-2">
              <FileText size={14} className="text-trace" />
              <span className="readout">preview</span>
            </div>
            <object data={`${profile.resume}#view=FitH&toolbar=0`} type="application/pdf"
              className="w-full h-[520px] hidden md:block bg-white" aria-label="Résumé preview">
              <p className="p-6 text-sm text-muted">
                Your browser will not display the PDF inline. <a href={profile.resume} download className="link-underline text-trace">Download it instead.</a>
              </p>
            </object>
            <div className="md:hidden p-6">
              <p className="text-sm text-muted">
                PDF preview is turned off on small screens because mobile browsers render it badly.
                Tap the download above to open the real thing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
