'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, School, Tractor } from 'lucide-react';

const activityData = [
  {
    id: 'club-leadership',
    role: 'Founder & President',
    company: 'CSUMB Engineering Club',
    duration: 'January 2025 - Present',
    icon: Users,
    iconColor: 'bg-emerald-600 text-white',
    bullets: [
      'Organized and led bi-weekly technical meetings for students interested in engineering disciplines to foster collaboration and skill development.',
      'Planned and coordinated large-scale campus engineering events, bridging student projects with academic and industry interest.',
      'Led an annual clean-up initiative as part of community engagement and environmental responsibility across the campus grounds.'
    ]
  },
  {
    id: 'robotics-team',
    role: 'RobOtters',
    company: 'CSUMB Farm Robotics Competition Team',
    duration: 'November 2025 - Present',
    icon: Tractor,
    iconColor: 'bg-purple-600 text-white',
    bullets: [
      'Designed and programmed Bonsai Amiga autonomous robot to follow workers during harvest.',
      'Contributed to improving broccolini harvest efficiency for field operations.'
    ]
  },
  {
    id: 'mate-rov',
    role: 'MATE ROV Mentor',
    company: 'X-Academy - Watsonville, CA',
    duration: 'February 2026 - Present',
    icon: School,
    iconColor: 'bg-pink-600 text-white',
    bullets: [
      'Assisted a team of 20 students in defining mission objectives and project goals.',
      'Supported the development, testing, and iteration of ROV prototypes.',
      'Helped troubleshoot basic electronics including circuits, wiring, and waterproofing.'
    ]
  }
];

export default function Activities() {
  return (
    <section id="activities" className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Activities & Leadership
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Extracurricular engineering initiatives, volunteer operations, and hardware competition teams.
          </p>
        </motion.div>

        {/* Continuous track timeline line that perfectly aligns with your career path */}
        <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-0 md:-ml-24 space-y-12">
          {activityData.map((act, index) => (
            <motion.div 
              key={act.role} 
              id={act.id} 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              viewport={{ once: true }} 
              className="relative pl-6 group scroll-mt-24"
            >
              
              {/* Timeline Bullet Node Icon */}
              <div className={`absolute -left-[18px] top-1 p-2 rounded-full shadow-md z-10 transition-transform group-hover:scale-110 ${act.iconColor}`}>
                <act.icon size={18} />
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {act.role}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-normal">
                      {act.company}
                    </p>
                  </div>
                  
                  {/* Calendar Duration Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 text-xs font-semibold rounded-full shadow-sm whitespace-nowrap self-start">
                    <Calendar size={12} />
                    {act.duration}
                  </div>
                </div>

                {/* Technical Bullet Items */}
                <ul className="space-y-2.5 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed list-disc pl-4 marker:text-blue-500">
                  {act.bullets.map((bullet, bIndex) => (
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
