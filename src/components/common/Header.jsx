import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 focus:outline-none group"
            aria-label="Scroll to top"
          >
            <Code2 className="w-8 h-8 text-primary-600 dark:text-primary-400 transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-300" />
            <span className="text-xl font-bold font-mono">
              <span className="bg-gradient-to-r from-primary-600 to-green-500 dark:from-primary-400 dark:to-green-400 bg-clip-text text-transparent">
                HAYMANOT
              </span>
            </span>
          </motion.button>

          {/* DESKTOP NAVIGATION - Only show on desktop */}
          {!isMobile && (
            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </nav>
          )}

          {/* Theme Toggle - Always visible */}
          <motion.button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <div className="relative w-5 h-5">
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;