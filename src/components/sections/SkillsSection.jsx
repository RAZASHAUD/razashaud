import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Brain, Zap, Star, Settings, Users, Lightbulb } from 'lucide-react';

const icons = {
  'Programming Languages': <Code className="text-primary mr-4 shrink-0" size={28} />,
  'Frameworks & Libraries': <Zap className="text-primary mr-4 shrink-0" size={28} />,
  'Databases': <Database className="text-primary mr-4 shrink-0" size={28} />,
  'Core Competencies': <Lightbulb className="text-primary mr-4 shrink-0" size={28} />,
  'Data Science': <Brain className="text-primary mr-4 shrink-0" size={28} />,
  'Technologies': <Settings className="text-primary mr-4 shrink-0" size={28} />,
  'Tools': <Star className="text-primary mr-4 shrink-0" size={28} />,
  'Soft Skills': <Users className="text-primary mr-4 shrink-0" size={28} />,
};

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

const SkillsSection = ({ skills }) => {
  return (
    <section id="skills" className="py-24 sm:py-32 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Technical Skills" 
          subtitle="Comprehensive expertise across programming, data science, and engineering technologies."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
              className="tech-card p-6"
            >
              <div className="flex items-center mb-5">
                {icons[category] || <Star className="text-primary mr-4 shrink-0" size={28} />}
                <h3 className="text-xl font-semibold text-text-primary">{category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;