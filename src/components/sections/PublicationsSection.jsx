import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gamepad2, Languages } from 'lucide-react';

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

const PublicationsSection = ({ publications }) => {
  const hobbies = ['Swimming', 'Chess', 'Cricket', 'Carrom'];
  const languages = ['English', 'Hindi', 'Bengali'];

  return (
    <section id="publications" className="py-24 sm:py-32 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Publications & Certifications"
          subtitle="Academic contributions and professional development achievements."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="tech-card p-6"
            >
              <div className="flex items-center mb-3">
                <Award className="text-primary mr-3 shrink-0" size={24} />
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {publication.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{publication.title}</h3>
              <p className="text-text-secondary text-sm">{publication.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 tech-card p-8"
        >
          <h3 className="text-2xl font-bold text-center text-text-primary mb-8">Additional Information</h3>
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Gamepad2 className="text-primary mr-3" size={24} />
                <h4 className="text-lg font-semibold text-text-primary">Hobbies & Interests</h4>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {hobbies.map((hobby) => (
                  <span key={hobby} className="skill-tag">{hobby}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Languages className="text-primary mr-3" size={24} />
                <h4 className="text-lg font-semibold text-text-primary">Languages</h4>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {languages.map((language) => (
                  <span key={language} className="skill-tag">{language}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PublicationsSection;