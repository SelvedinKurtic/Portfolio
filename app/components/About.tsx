'use client';

import { motion } from 'framer-motion';
import { FolderOpen, RefreshCw, RulerDimensionLine } from 'lucide-react';

const stats = [
  { icon: RefreshCw, label: 'Prototyping Iterations', value: '100+' },
  { icon: RulerDimensionLine, label: 'Layer Height', value: '0.25mm' },
  { icon: FolderOpen, label: 'Projects', value: '4+' },
];
// stats will change the stats in the about area, you can change the icon, writing, and values. It depends on what you want. icons are from https://lucide.dev/icons/

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I've always enjoyed understanding how things work, which naturally led me to engineering. I like taking an idea from a sketch or concept and turning it into something real. Whether it's designing a PCB, programming a microcontroller, or creating a CAD model, I enjoy the process of learning, building, and improving with every project.
          </p>
        </motion.div>

        {/* Content & Narrative Grid Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          viewport={{ once: true }} 
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                My Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                What started as curiosity has grown into a passion for engineering. From personal projects to undergraduate research, I've enjoyed challenging myself with new ideas and learning something from every project I take on.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                My Approach
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                I don't expect every project to work perfectly the first time, and that's part of what makes engineering enjoyable. I like learning through trial and error, improving my designs, and finding better ways to solve problems along the way.
              </p>
            </div>
          </div>

          {/* Metrics Statistics Grid Layout Rows loop */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                viewport={{ once: true }} 
                className="text-center"
              >
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <stat.icon className="w-8 h-8 text-orange-500 dark:text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
