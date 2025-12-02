import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{ marginTop: '4rem' }} // Add margin to prevent overlap
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {theme === 'dark' ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700" />
          )}
        </motion.div>
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </div>
    </motion.button>
  );
};

export default ThemeToggle;