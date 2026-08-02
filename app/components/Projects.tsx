'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Main Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </motion.div>

        {/* Dynamic Card Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            // Track if this individual project image fails to load
            const [imageError, setImageError] = useState(false);

            return (
              <Link href={project.liveUrl || "#"} key={project.id} className="block">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: index * 0.1 }} 
                  viewport={{ once: true }} 
                  className="h-full bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col border border-transparent hover:border-blue-500 dark:hover:border-blue-400 group"
                >
                  
                  {/* COMPONENT BOX: Structural image viewport frame */}
                  <div className="relative h-48 bg-slate-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    
                    {!imageError ? (
                      /* 1. Renders cleanly with zero filters when file is valid */
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="object-cover w-full h-full absolute inset-0 transition-all duration-300 group-hover:scale-105"
                        onError={() => setImageError(true)} // Snaps to fallback ONLY on explicit 404 block
                      />
                    ) : (
                      /* 2. This is the graphics layer toggle fallback if link breaks */
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center text-center p-4 text-white">
                        <span className="text-2xl mb-1">🛠️</span>
                        <span className="text-xs font-bold font-mono tracking-wider bg-black/30 px-2 py-0.5 rounded uppercase">
                          {project.title}
                        </span>
                      </div>
                    )}

                    {/* Translucent overlay that fades in smoothly on mouse hover */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 flex flex-col items-center justify-center transition-all p-4 text-center z-10">
                      <span className="text-white text-xs font-bold tracking-wider uppercase bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 shadow-md transition-all transform translate-y-1 group-hover:translate-y-0">
                        📸 View Case Study
                      </span>
                    </div>
                  </div>

                  {/* Project Details Block */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Skill Badge Tags Group */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md font-semibold text-xs border border-blue-200 dark:border-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
