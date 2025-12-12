import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.5 }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">{title}</h2>
    <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">{subtitle}</p>
  </motion.div>
);

const EducationSection = () => {
  return (
    <section id="education" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Education"
          subtitle="Strong academic foundation in electrical engineering and technology."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
            className="tech-card p-8"
          >
            <div className="flex items-center mb-4">
              <GraduationCap className="text-primary mr-4 shrink-0" size={36} />
              <div>
                <h3 className="text-xl font-bold text-text-primary">B.Tech in Electrical Engineering</h3>
                <p className="text-primary font-semibold">2022 – 2026</p>
              </div>
            </div>
            <p className="text-text-secondary mb-4">
              Ghani Khan Choudhury Institute of Engineering & Technology, Malda
            </p>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block text-sm font-semibold">
              Available from June 2026
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="tech-card p-8"
          >
            <div className="flex items-center mb-4">
              <BookOpen className="text-primary mr-4 shrink-0" size={36} />
              <div>
                <h3 className="text-xl font-bold text-text-primary">Higher Secondary (WBCHSE)</h3>
                <p className="text-primary font-semibold">2020 – 2022</p>
              </div>
            </div>
            <p className="text-text-secondary">
              Arya Parishad Vidyalaya, Kolkata
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;