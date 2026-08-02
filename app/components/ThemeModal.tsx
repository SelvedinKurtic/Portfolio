'use client';

import React, { useState, useEffect } from 'react';

export default function ThemeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('light');
  
  // Troll state trackers for the light mode prompts
  const [trollStage, setTrollStage] = useState(0); 

  useEffect(() => {
    const savedTheme = localStorage.getItem('user-theme-pref');
    if (!savedTheme) {
      setIsOpen(true);
    } else {
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
    localStorage.setItem('user-theme-pref', theme);
    setIsOpen(false);
    setTrollStage(0); // Reset troll loop on successful choice
  };

  // Intercept the choice if they pick Light Mode
  const handleLightModeSelection = () => {
    if (trollStage === 0) {
      setTrollStage(1); // Trigger: Are you sure?
    } else if (trollStage === 1) {
      setTrollStage(2); // Trigger: Unfortunate choice...
    } else if (trollStage === 2) {
      setTrollStage(3); // Trigger: Why...
    } else {
      applyTheme('light'); // Fine, let them have it
    }
  };

  const handleToggleClick = () => {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    // Also intercept the floating FAB button toggle if they switch to light mode
    if (activeTheme === 'dark') {
      setIsOpen(true);
      setTrollStage(1);
    } else {
      applyTheme(nextTheme);
    }
  };

  return (
    <>
      {/* Floating Theme Toggle (Bottom Right) */}
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

      {/* Main Welcoming Modal Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8 text-center">
            
            {/* STAGE 0: Standard Initial Welcome Screen */}
            {trollStage === 0 && (
              <>
                <div className="mb-6">
                  <div className="text-3xl mb-3">🌓</div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                    Welcome to My Portfolio
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                    Please select your preferred viewing mode to optimize the engineering blueprints and case study logs.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleLightModeSelection}
                    className="flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950/30 border-2 border-slate-200 dark:border-gray-700 hover:border-blue-500 rounded-xl group transition-all cursor-pointer"
                  >
                    <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">☀️</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-gray-200">Light Mode</span>
                  </button>

                  <button
                    onClick={() => applyTheme('dark')}
                    className="flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950/30 border-2 border-slate-200 dark:border-gray-700 hover:border-blue-500 rounded-xl group transition-all cursor-pointer"
                  >
                    <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🌙</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-gray-200">Dark Mode</span>
                  </button>
                </div>
              </>
            )}

            {/* STAGE 1: "Are you sure?" Prompt Warning */}
            {trollStage === 1 && (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                <div className="text-4xl mb-4">👀</div>
                <h3 className="text-2xl font-black text-amber-500 mb-3">
                  Are you absolutely sure?
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
                  My portfolio is best viewed in dark mode. Your eyes might melt if you activate the light theme right now.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => applyTheme('dark')}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg shadow hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    Save My Eyes (Pick Dark Mode)
                  </button>
                  <button
                    onClick={handleLightModeSelection}
                    className="w-full py-2.5 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    No, I like flashbangs. Proceed.
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2: "Unfortunate choice" Final Prompt Warning */}
            {trollStage === 2 && (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                <div className="text-4xl mb-4">🤦‍♂️</div>
                <h3 className="text-2xl font-black text-red-500 mb-3">
                  Unfortunate choice...
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
                  This is your final warning. The engineering council will judge you for this path.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => applyTheme('dark')}
                    className="w-full py-3 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-lg hover:bg-black transition-all cursor-pointer"
                  >
                    Go Back (Choose Dark Mode)
                  </button>
                  <button
                    onClick={handleLightModeSelection}
                    className="w-full py-2.5 text-xs font-semibold text-red-400/80 hover:text-red-500 underline transition-colors cursor-pointer"
                  >
                    I accept my fate. Turn on Light Mode.
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 3: "Why?" Final Prompt Warning */}
            {trollStage === 3 && (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                <div className="text-4xl mb-4"> 😡 </div>
                <h3 className="text-2xl font-black text-red-500 mb-3">
                  Why?
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Seriouslly this is your final warning. Don't chose the light side, I promise the dark side is so much more enjoyable.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => applyTheme('dark')}
                    className="w-full py-3 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-lg hover:bg-black transition-all cursor-pointer"
                  >
                    Ok I giveup (Choose Dark Mode)
                  </button>
                  <button
                    onClick={handleLightModeSelection}
                    className="w-full py-2.5 text-xs font-semibold text-red-400/80 hover:text-red-500 underline transition-colors cursor-pointer"
                  >
                    Just let me see the website on lightmode already 🙄
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
