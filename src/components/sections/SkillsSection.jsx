import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Brain, Zap, Star, Settings, Users, Lightbulb } from 'lucide-react';

// 🔹 Icons Mapping
const icons = {
  'Programming Languages': <Code className="text-primary mr-4 shrink-0" size={28} />,
  'Machine Learning': <Brain className="text-primary mr-4 shrink-0" size={28} />,
  'Electrical Engineering': <Zap className="text-primary mr-4 shrink-0" size={28} />,
  'Embedded Systems & IoT': <Settings className="text-primary mr-4 shrink-0" size={28} />,
  'Computer Vision & Signal Processing': <Lightbulb className="text-primary mr-4 shrink-0" size={28} />,
  'Tools & Software': <Users className="text-primary mr-4 shrink-0" size={28} />,
};

// 🔹 Section Header
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

const SkillsSection = () => {

  // ✅ UPDATED SKILLS FROM YOUR RESUME + LINKEDIN
  const skills = {
    'Programming Languages': ['Python', 'C', 'C++', 'Arduino C'],

    'Machine Learning': [
      'TensorFlow',
      'Scikit-learn',
      'NumPy',
      'Pandas',
      'Deep Learning',
      'CNN',
      'Random Forest',
      'SVM',
      'Data Preprocessing'
    ],

    'Electrical Engineering': [
      'ETAP', 
      'PMSM', 
      'Industrial Automation', 
      'MATLAB', 
      'ANSYS'
    ],

    'Embedded Systems & IoT': [
      'Arduino (Uno)', 
      'Microcontroller Programming', 
      'Sensor Interfacing', 
      'GSM Communication', 
      'Real-Time Monitoring', 
      'Hardware Prototyping'
    ],

    'Computer Vision & Signal Processing': [
      'OpenCV', 
      'YOLOv5', 
      'Image Processing', 
      'MFCC Feature Extraction'
    ],

    'Tools & Software': [
      'Git',
      'Arduino IDE', 
      'Microsoft Office (Excel, Word, PowerPoint)'
    ]
  };

  return (
    <section id="skills" className="py-24 sm:py-32 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Technical Skills" 
          subtitle="Strong foundation in Electrical Engineering, Machine Learning, and Software Development."
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
                  <span key={skill} className="skill-tag">
                    {skill}
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

export default SkillsSection;
