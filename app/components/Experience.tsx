'use client';

import { motion } from 'framer-motion';
import { Calendar, ShieldAlert, Library, FlaskConical } from 'lucide-react';

const experiences = [
  {
    role: 'Polymer Composites Research Assistant',
    company: 'California State University, Monterey Bay (Mechatronics Engineering)',
    duration: 'November 2025 - Present',
    icon: FlaskConical,
    iconColor: 'bg-blue-600 text-white',
    bullets: [
      'Investigated the mechanical viability of processing pistachio shell agricultural byproducts as sustainable eco-filler materials in Low-Density Polyethylene (LDPE) matrices.',
      'Formulated multi-mesh sieve sorting criteria (63µm, 125µm, 250µm) and operated laboratory mixing extruders alongside injection molding equipment to fabricate standardized dog-bone tensile test specimens.',
      'Conducted over 600 independent mechanical stress trials utilizing an Instron 68TM-30 Universal Testing Machine to chart Elastic modulus, tensile strength, and elongation behaviors.'
    ]
  },
  {
    role: 'Resident Advisor',
    company: 'CSUMB Student Housing & Residential Life',
    duration: 'January 2026 - Present',
    icon: ShieldAlert,
    iconColor: 'bg-orange-500 text-white',
    bullets: [
      'Support a cohort of first-year residents, fostering a safe and inclusive community environment.',
      'Planned and led interactive community-building events for residents.',
      'Respond to on-call incidents and assisted residents with emergencies and room access issues.'
    ]
  },
  {
    role: 'Library Circulation Assistant',
    company: 'CSUMB Tanimura & Antle Memorial Library',
    duration: 'September 2025 - January 2026',
    icon: Library,
    iconColor: 'bg-blue-500 text-white',
    bullets: [
      'Organized library materials in accordance with the Library of Congress classification system.',
      'Assisted students with check-in/check-out of books, games, and course materials.',
      'Maintained organization and accuracy of materials, ensuring efficient library operation.'
    ]
  }
];

export default function Experience() {
  return (
    /* 🚀 FIXED: Swapped section background to match Technical Skills exactly */
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Developing operational leadership, high-stakes communication, and system organization across campus environments.
          </p>
        </motion.div>

        {/* Timeline Stack Layout Container */}
        <div className="relative border-l-2 border-gray-200 dark:border-gray-700 -ml-12 md:-ml-24 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.role} 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              viewport={{ once: true }} 
              className="relative pl-6 group"
            >
              
              {/* Timeline Bullet Node Icon */}
              <div className={`absolute -left-[18px] top-1 p-2 rounded-full shadow-md z-10 transition-transform group-hover:scale-110 ${exp.iconColor}`}>
                <exp.icon size={18} />
              </div>

              {/* 🚀 FIXED: Experience Card flipped to white / dark slate layers to jump out cleanly against the gray page layer */}
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                
                {/* Meta Layout Title Block */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm [font-kerning:none]">
                      {exp.company}
                    </p>
                  </div>
                  
                  {/* Duration Badge Element */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 text-xs font-semibold rounded-full shadow-sm whitespace-nowrap self-start">
                    <Calendar size={12} />
                    {exp.duration}
                  </div>
                </div>

                {/* Technical Bullet Items Summary */}
                <ul className="space-y-2.5 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed list-disc pl-4 marker:text-blue-500">
                  {exp.bullets.map((bullet, bIndex) => (
                    <li key={bIndex}>{bullet}</li>
                  ))}
                </ul>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
