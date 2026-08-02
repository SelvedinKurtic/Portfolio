"use client";

import React, { useState, useEffect } from 'react';

export default function ThemeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('light');

  useEffect(() => {
    // Check if the user has already selected a theme profile in the past
    const savedTheme = localStorage.getItem('user-theme-pref');
    
    if (!savedTheme) {
      // If no history exists on disk, trigger the choice prompt pop-up instantly
      setIsOpen(true);
    } else {
      // If they already chose in a previous session, silently apply it
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (theme: string) => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      setActiveTheme('dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      setActiveTheme('light');
    }
    
    // Save to device storage disk and close modal window
    localStorage.setItem('user-theme-pref', theme);
    setIsOpen(false);
  };

  // Quick switch toggle handler for the floating action button
  const handleToggleClick = () => {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  return (
    <>
      {/* 1. FLOATING ACTION THEME SWITCH BUTTON (Always visible in bottom-right corner) */}
      <button
        onClick={handleToggleClick}
        aria-label="Toggle Theme Mode"
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-200 border border-slate-200 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group flex items-center justify-center"
      >
        {activeTheme === 'dark' ? (
          <span className="text-xl group-hover:rotate-12 transition-transform">☀️</span>
        ) : (
          <span className="text-xl group-hover:-rotate-12 transition-transform">🌙</span>
        )}
      </button>

      {/* 2. WELCOMING ENTRY MODAL POP-UP PANEL LAYER */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          
          {/* Modal Card Structure */}
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8 text-center">
            
            {/* Header Area */}
            <div className="mb-6">
              <div className="text-3xl mb-3">🌓</div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                Welcome to My Portfolio
              </h3>
              <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                Please select your preferred viewing mode to optimize the engineering blueprints and case study logs.
              </p>
            </div>

            {/* Mode Choice Grid Options Layout */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Light Mode Card Selector */}
              <button
                onClick={() => applyTheme('light')}
                className="flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950/30 border-2 border-slate-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl group transition-all cursor-pointer"
              >
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">☀️</span>
                <span className="text-sm font-bold text-slate-800 dark:text-gray-200">Light Mode</span>
              </button>

              {/* Dark Mode Card Selector */}
              <button
                onClick={() => applyTheme('dark')}
                className="flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950/30 border-2 border-slate-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl group transition-all cursor-pointer"
              >
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🌙</span>
                <span className="text-sm font-bold text-slate-800 dark:text-gray-200">Dark Mode</span>
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
