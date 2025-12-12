import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const Footer = ({ onContactClick }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-bold gradient-text mb-4">Raza Shaud</p>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Electrical Engineer • Python Developer • ML Enthusiast
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <button
              onClick={() => onContactClick('email')}
              className="text-slate-400 hover:text-white transition-colors duration-300"
              aria-label="Send an email to Raza Shaud"
            >
              <Mail size={24} />
            </button>
            <button
              onClick={() => onContactClick('linkedin')}
              className="text-slate-400 hover:text-white transition-colors duration-300"
              aria-label="View Raza Shaud's LinkedIn profile"
            >
              <Linkedin size={24} />
            </button>
            <button
              onClick={() => onContactClick('github')}
              className="text-slate-400 hover:text-white transition-colors duration-300"
              aria-label="View Raza Shaud's GitHub profile"
            >
              <Github size={24} />
            </button>
          </div>
          <div className="border-t border-slate-800 pt-8 mt-8">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Raza Shaud. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm mt-1">Available for opportunities from June 2026.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;