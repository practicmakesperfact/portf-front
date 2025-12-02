import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Home, User, Code, Briefcase, FolderOpen, Mail } from 'lucide-react';

const ScrollNavigation = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide button based on scroll position
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < document.body.scrollHeight - window.innerHeight - 100);
      
      // Determine current section
      const scrollTop = window.scrollY + 100; // Offset for header
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollTop >= offsetTop) {
            setCurrentSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextIndex = currentSection + 1;
    if (nextIndex < sections.length) {
      const element = document.getElementById(sections[nextIndex].id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If at last section, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    const prevIndex = currentSection - 1;
    if (prevIndex >= 0) {
      const element = document.getElementById(sections[prevIndex].id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const scrollToSection = (index) => {
    const element = document.getElementById(sections[index].id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setShowTooltip(false);
    }
  };

  const currentIcon = sections[currentSection]?.icon || ChevronDown;
  const nextSection = currentSection < sections.length - 1 
    ? sections[currentSection + 1].label 
    : 'Top';

  // Hide on desktop (optional) - uncomment if you want to hide on desktop
  // if (window.innerWidth > 768) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
          {/* Section Indicator Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-3 mb-3"
              >
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Jump to Section
                </div>
                <div className="space-y-1">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(index)}
                      className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-colors ${
                        index === currentSection
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      <span>{section.label}</span>
                      {index === currentSection && (
                        <span className="ml-auto w-2 h-2 bg-primary-500 rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Navigation Button */}
          <div className="flex flex-col items-center space-y-3">
            {/* Previous Button */}
            {currentSection > 0 && (
              <motion.button
                onClick={scrollToPrev}
                className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to previous section"
              >
                <ChevronUp className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
            )}

            {/* Current Section Indicator */}
            <motion.button
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="relative p-4 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white shadow-2xl hover:shadow-3xl transition-all group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Show navigation menu"
            >
              <div className="relative w-6 h-6">
                <motion.div
                  key={currentSection}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <currentIcon className="w-6 h-6" />
                </motion.div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-12 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 text-white text-xs px-3 py-2 rounded whitespace-nowrap">
                {sections[currentSection]?.label || 'Home'}
                <div className="absolute -bottom-1 right-3 w-2 h-2 bg-black/80 transform rotate-45"></div>
              </div>
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={scrollToNext}
              className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Scroll to ${nextSection}`}
            >
              <ChevronDown className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute -bottom-8 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {nextSection}
              </span>
            </motion.button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-2 flex flex-col items-center space-y-1">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {currentSection + 1} / {sections.length}
            </div>
            <div className="w-1 h-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500"
                initial={{ height: '0%' }}
                animate={{ 
                  height: `${((currentSection + 1) / sections.length) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ScrollNavigation;