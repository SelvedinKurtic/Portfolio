'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ThemeModal from './ThemeModal';




export default function Layout({ children }: { children: React.ReactNode }) {
  // This checks if the browser has finished loading its background settings
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Tells the layout it is safe to display the site
  }, []);

  return (
    /* This main wrapper div scales your layout background seamlessly across themes */
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <ThemeModal />

  


      
      {/* 
        This is the curtain: It keeps the content hidden until the colors are sorted out.
        Once ready, it smoothly fades your hero, projects, and career cards onto the screen.
      */}
      <main className={`transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </main>
    </div>
  );
}
