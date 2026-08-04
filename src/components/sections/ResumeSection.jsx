import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { profile } from '@/data/portfolio';

export default function ResumeSection() {
  return (
    <section id="resume" className="py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          channel="CH5 · RÉSUMÉ"
          title="One page, everything on it"
          subtitle="IIT Guwahati format. Real selectable text, standard section headings and consistent dates, so résumé parsers read it correctly."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          <div className="space-y-3">
            <a href={profile.resume} download="Raza_Shaud_Resume.pdf"
              className="panel panel-hover p-6 flex items-start justify-between gap-4 group">
              <div>
                <div className="readout text-trace">pdf · one page</div>
                <div className="font-display text-lg font-bold mt-1 group-hover:text-trace transition-colors">
                  Download résumé
                </div>
                <p className="text-muted text-sm mt-1">
                  Education, experience, projects, skills, publications and achievements.
                </p>
              </div>
              <Download size={18} className="text-muted shrink-0 mt-1" />
            </a>

            <div className="panel p-6">
              <div className="readout mb-3">at a glance</div>
              <ul className="space-y-2 text-sm text-muted">
                <li>M.Tech, Systems Control and Automation — IIT Guwahati, 2026–28</li>
                <li>Three internships: machine learning, SAIL Bokaro, DVC Mejia</li>
                <li>Three projects, each with measured results</li>
                <li>Three publications, including an IEEE Best Paper Award</li>
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
              className="w-full h-[540px] hidden md:block bg-white" aria-label="Résumé preview">
              <p className="p-6 text-sm text-muted">
                Your browser will not display the PDF inline.{' '}
                <a href={profile.resume} download className="link-underline text-trace">Download it instead.</a>
              </p>
            </object>
            <div className="md:hidden p-6">
              <p className="text-sm text-muted">
                Preview is off on small screens because mobile browsers render embedded PDFs badly.
                Tap download above to open the real thing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
