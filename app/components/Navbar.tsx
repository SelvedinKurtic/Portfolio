'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Close dropdown if user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    setDropdownOpen(false);
    
    const hash = href.substring(href.indexOf('#'));
    
    if (pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Experience sub-items data map array
  const experienceItems = [
    { name: 'All Experience', href: '/#experience' },
    { name: 'Engineering R&D', href: '/#experience' }, // Snaps to timeline
    { name: 'Club Leadership', href: '/#experience' },
    { name: 'Robotics Team', href: '/#experience' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/#home" onClick={(e) => handleNavClick(e, '/#home')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors">Home</Link>
            <Link href="/#about" onClick={(e) => handleNavClick(e, '/#about')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors">About</Link>
            <Link href="/#skills" onClick={(e) => handleNavClick(e, '/#skills')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors">Skills</Link>
            <Link href="/#projects" onClick={(e) => handleNavClick(e, '/#projects')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors">Projects</Link>
            
            {/* 🚀 Desktop Dropdown Trigger Item Container */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors cursor-pointer py-2">
                <span>Experience</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-xl shadow-xl p-1.5 z-50"
                  >
                    {experienceItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/#contact" onClick={(e) => handleNavClick(e, '/#contact')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors">Contact</Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300 cursor-pointer">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 rounded-lg mt-2 shadow-xl border border-slate-100 dark:border-gray-700">
              <Link href="/#home" onClick={(e) => handleNavClick(e, '/#home')} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300">Home</Link>
              <Link href="/#about" onClick={(e) => handleNavClick(e, '/#about')} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300">About</Link>
              <Link href="/#skills" onClick={(e) => handleNavClick(e, '/#skills')} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300">Skills</Link>
              <Link href="/#projects" onClick={(e) => handleNavClick(e, '/#projects')} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300">Projects</Link>
              
              {/* Mobile Sub-Items Grouping */}
              <div className="pl-3 border-l-2 border-slate-100 dark:border-gray-700 space-y-1">
                <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</div>
                {experienceItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    onClick={(e) => handleNavClick(e, subItem.href)}
                    className="block px-3 py-1.5 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>

              <Link href="/#contact" onClick={(e) => handleNavClick(e, '/#contact')} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300">Contact</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
