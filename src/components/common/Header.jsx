import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm"
      style={{ height: '64px' }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo - Click to scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 focus:outline-none group"
            aria-label="Scroll to top"
          >
            <Code2 className="w-8 h-8 text-primary-600 dark:text-primary-400 transition-colors group-hover:text-primary-700 dark:group-hover:text-primary-300" />
            <span className="text-xl font-bold font-mono">
              <span className="bg-gradient-to-r from-primary-600 to-green-500 dark:from-primary-400 dark:to-green-400 bg-clip-text text-transparent">
                DEVPORT
              </span>
            </span>
          </motion.button>

          {/* Theme Toggle Only */}
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