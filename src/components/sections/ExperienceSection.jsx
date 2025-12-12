import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

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

const ExperienceSection = ({ experiences }) => {
  return (
    <section id="experience" className="py-24 sm:py-32 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Professional Experience"
          subtitle="Hands-on experience in software development and industrial engineering."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="relative mb-12"
            >
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
              <div className={`tech-card p-8 ml-auto ${index % 2 === 0 ? 'md:mr-[calc(50%+2rem)]' : 'md:ml-[calc(50%+2rem)]'}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">{experience.title}</h3>
                    <div className="flex items-center text-primary mb-2 md:mb-0">
                      <Briefcase size={16} className="mr-2" />
                      <span className="font-semibold">{experience.company}</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mt-2 md:mt-0 whitespace-nowrap">
                    {experience.period}
                  </div>
                </div>

                <p className="text-text-secondary mb-6 leading-relaxed">
                  {experience.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;