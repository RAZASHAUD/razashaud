import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const ContactCard = ({ icon, title, value, onClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true, amount: 0.5 }}
    onClick={onClick}
    className="tech-card p-6 text-center cursor-pointer group"
  >
    {React.cloneElement(icon, { className: 'text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300' })}
    <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-text-secondary text-sm break-words">{value}</p>
  </motion.div>
);

const ContactSection = ({ onContactClick, onResumeDownload }) => {
  const contactInfo = [
    { icon: <Mail size={32} />, title: 'Email', value: 'rshaudx3@gmail.com', handler: () => onContactClick('email') },
    { icon: <Phone size={32} />, title: 'Phone', value: '+91 7439505623', handler: () => onContactClick('phone') },
    { icon: <Linkedin size={32} />, title: 'LinkedIn', value: 'linkedin.com/in/raza-shaud', handler: () => onContactClick('linkedin') },
    { icon: <Github size={32} />, title: 'GitHub', value: 'github.com/RAZASHAUD', handler: () => onContactClick('github') },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Get In Touch" subtitle="Ready to contribute to innovative projects and grow with your team." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactInfo.map((info, index) => (
            <ContactCard key={info.title} {...info} delay={index * 0.1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            onClick={onResumeDownload}
            className="btn-primary text-lg font-semibold px-10 py-7"
            aria-label="Download Raza Shaud's Complete Resume"
          >
            <Download size={22} className="mr-3" />
            Download Complete Resume
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;