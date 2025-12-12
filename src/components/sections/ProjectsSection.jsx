import React from 'react';
import { motion } from 'framer-motion';

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

const ProjectsSection = ({ projects }) => {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Featured Projects"
          subtitle="Innovative solutions combining engineering principles with cutting-edge technology."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="project-card p-6 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-text-primary pr-4">{project.title}</h3>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold shrink-0">
                  {project.metrics}
                </div>
              </div>

              <p className="text-text-secondary mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                <p className="w-full text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Technologies Used</p>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;