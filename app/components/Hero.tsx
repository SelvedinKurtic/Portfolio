'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Github, FileText } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background canvas gradient block */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} >
          
          {/* Main Title Heading Layout */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Selvedin Kurtic
            </span>
          </motion.h1>

          {/* Core Biography Paragraph Narrative Summary */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            I enjoy building things and figuring out how they work. Whether it's designing hardware, writing code, or working on research, I like taking on projects that teach me something new.
          </motion.p>

          {/* Clean, Non-Busy Action Buttons Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }} 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
          >
            {/* 🎯 Primary Core Action: Local Scroll To Projects */}
            <button 
              onClick={() => scrollToSection('#projects')} 
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-sm"
            >
              View Projects
            </button>

            {/* 📄 NEW: Interactive Resume PDF Action Link */}
            <a
              href="/Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 cursor-pointer"
            >
              <FileText size={18} className="text-orange-500 dark:text-red-500" />
              <span>View Resume</span>
            </a>

            {/* 💼 LinkedIn External Profile Link Button */}
            <a
              href="https://www.linkedin.com/in/selvedin-kurtic/" // 👈 Swap with your active URL path
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0077b5] text-white font-semibold rounded-lg hover:bg-[#006297] transition-all duration-200 transform hover:scale-105 shadow-sm"
            >
              <Linkedin size={18} className="fill-current" />
              <span>LinkedIn</span>
            </a>

            {/* 📦 GitHub Repository Link Button */}
            <a
              href="https://github.com/SelvedinKurtic/" // 👈 Swap with your active URL path
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white border border-slate-800 dark:border-slate-700 font-semibold rounded-lg hover:bg-black dark:hover:bg-slate-700 transition-all duration-200 transform hover:scale-105 shadow-sm"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </motion.div>

        </motion.div>
      </div>

      {/* Bouncing down indicator arrow */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 1 }} 
        className="absolute bottom-44 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button 
          onClick={() => scrollToSection('#about')} 
          className="animate-bounce cursor-pointer p-2 flex items-center justify-center"
          aria-label="Scroll Down to About Section"
        >
          <ChevronDown className="w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" />
        </button>
      </motion.div>
    </section>
  );
}
