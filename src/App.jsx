import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import PublicationsSection from '@/components/sections/PublicationsSection';
import ContactSection from '@/components/sections/ContactSection';

const skillsData = {
  'Programming Languages': ['Python', 'C', 'C++', 'SQL'],
  'Frameworks & Libraries': ['ReactJS', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'OpenCV'],
  'Databases': ['SQLite', 'SQL', 'NoSQL'],
  'Core Competencies': ['Data Structures', 'Algorithms', 'OOP'],
  'Data Science': ['Data Cleaning', 'Statistical Analysis', 'Machine Learning'],
  'Technologies': ['Arduino', 'MATLAB', 'Multisim', 'ETAP', 'Power BI'],
  'Tools': ['VS Code', 'Jupyter', 'PyCharm', 'Microsoft Office'],
  'Soft Skills': ['Problem-solving', 'Analytical Mindset', 'Communication', 'Teamwork', 'Adaptability', 'Critical Thinking']
};

const projectsData = [
  {
    title: 'Solar-Powered Robotic Cable Monitoring System',
    description: 'Developed a solar-powered mobile robot for cable insulation monitoring using camera sensors and a CNN model achieving 96.5% fault detection accuracy.',
    technologies: ['Arduino, Solar PV, CNN, OpenCV'],
    metrics: '94% F1 Score'
  },
  {
    title: 'Human & AI Voice Detection',
    description: 'Deep learning system to distinguish between human and AI-generated voices with high accuracy.',
    technologies: ['Python', 'TensorFlow', 'Audio Processing', 'Deep Learning'],
    metrics: '89% Accuracy'
  },
  {
    title: 'Saline Monitoring System',
    description: 'IoT-based healthcare solution for monitoring saline levels with automated alerts for patient safety.',
    technologies: ['Arduino', 'IoT', 'Sensors', 'Alert System'],
    metrics: 'IoT Integrated'
  },
  {
    title: 'Real-Time Face Mask Detection',
    description: 'Computer vision application for detecting face mask compliance in real-time video streams for public safety.',
    technologies: ['Python', 'OpenCV', 'Computer Vision', 'Real-time'],
    metrics: 'Real-time'
  },
];

const experiencesData = [
  {
    title: 'Machine Learning Intern',
    company: 'Tech Solutions Inc.',
    period: 'May – July 2025',
    description: 'Assisted in ML model testing, data preprocessing, and pipeline debugging for automation tasks.',
    skills: ['Data Cleaning', 'Statistical Analysis', 'Machine Learning']
  },
  {
    title: 'Trainee',
    company: 'SAIL',
    period: 'November – December 2024',
    description: 'Specialized training in industrial motors systems.',
    skills: ['Industrial Motors', 'Automation']
  },
  {
    title: 'Power Plant Operations Trainee',
    company: 'DVC',
    period: 'June – July 2024',
    description: 'Comprehensive training in substation automation, power plant operations, and security protocols.',
    skills: ['Substation Automation', 'Power Plant Operations', 'Security Systems']
  }
];

const publicationsData = [
  {
    title: 'IEEE GIEST 2024 Conference Paper',
    type: 'Conference Publication',
    description: 'Research paper presented at IEEE GIEST 2024 conference.'
  },
  {
    title: 'Journal Paper',
    type: 'Journal Publication',
    description: 'Noise Filtration and Voice Discrimination: Case Studies, Results, and Discussions'
  },
  {
    title: 'Udemy Python Bootcamp',
    type: 'Certification',
    description: 'Comprehensive Python programming certification.'
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'experience', 'education', 'publications', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2.5;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = () => {
  const a = document.createElement('a');
  a.href = '/resume.pdf';
  a.download = 'Raza_Shaud_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};



  const handleContactClick = (type) => {
    switch (type) {
      case 'email':
        window.location.href = 'mailto:rshaudx3@gmail.com';
        break;
      case 'phone':
        window.location.href = 'tel:+917439505623';
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/raza-shaud', '_blank', 'noopener,noreferrer');
        break;
      case 'github':
        window.open('https://github.com/RAZASHAUD', '_blank', 'noopener,noreferrer');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>Electrical Engineer, Software Developer & ML Enthusiast Portfolio – Raza Shaud</title>
        <meta name="description" content="Raza Shaud - Final-year B.Tech Electrical Engineering student with expertise in Python, Machine Learning, IoT, and industrial automation. Available for software engineering and ML opportunities from June 2026." />
        <meta property="og:title" content="Electrical Engineer, Software Developer & ML Enthusiast Portfolio – Raza Shaud" />
        <meta property="og:description" content="Raza Shaud - Final-year B.Tech Electrical Engineering student with expertise in Python, Machine Learning, IoT, and industrial automation. Available for software engineering and ML opportunities from June 2026." />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="Electrical Engineer, Python Developer, Machine Learning, Software Engineer, IoT, Industrial Automation, Kolkata, Raza Shaud" />
      </Helmet>

      <div className="min-h-screen bg-bg-subtle">
        <Header activeSection={activeSection} scrollToSection={scrollToSection} />
        <main>
          <HeroSection 
            scrollYProgress={scrollYProgress} 
            onResumeDownload={handleResumeDownload} 
            onScrollToSection={scrollToSection} 
          />
          <SkillsSection skills={skillsData} />
          <ProjectsSection projects={projectsData} />
          <ExperienceSection experiences={experiencesData} />
          <EducationSection />
          <PublicationsSection publications={publicationsData} />
          <ContactSection 
            onContactClick={handleContactClick}
            onResumeDownload={handleResumeDownload}
          />
        </main>
        <Footer onContactClick={handleContactClick} />
        <Toaster />
      </div>
    </>
  );
}


export default App;

