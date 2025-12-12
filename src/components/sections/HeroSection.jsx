import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profilePic from '../../assets/photo.jpg'; // relative import from src/components/sections -> src/assets

const HeroSection = ({ onResumeDownload, onScrollToSection }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 110 } },
  };

  return (
    <section id="home" className="hero-bg min-h-screen flex items-center pt-16 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight"
            >
              Raza Shaud
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-4 text-blue-200">
              Electrical Engineer • Python Developer • ML Enthusiast
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center text-blue-200 mb-6">
              <MapPin size={18} className="mr-2" />
              Kolkata, India
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-blue-100 mb-8 max-w-xl">
              Final-year B.Tech Electrical Engineering student with hands-on experience in Python,
              Machine Learning, IoT, and industrial automation. Passionate about building
              interdisciplinary solutions that combine hardware and software.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => onResumeDownload && onResumeDownload()}
                className="btn-primary inline-flex items-center gap-2 text-base font-semibold px-6 py-3"
                aria-label="Download Raza Shaud's Resume"
              >
                <Download size={18} />
                Download Resume (PDF)
              </Button>

              <Button
                onClick={() => onScrollToSection && onScrollToSection('contact')}
                className="btn-secondary inline-flex items-center gap-2 text-base font-semibold px-6 py-3"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Photo + decorative blobs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative flex justify-center items-center"
          >
            <div className="w-full max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={profilePic}
                alt="Raza Shaud - Electrical Engineer and Software Developer"
                className="w-full object-cover rounded-2xl"
                onError={(e) => {
                  // If the local image fails to load, hide it gracefully
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* decorative animated blobs */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.18, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-300/15 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.25, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll down chevron */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default HeroSection;