import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ScrollNavigation = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const sections = ['home', 'about', 'skills', 'services', 'projects', 'contact'];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      if (!isMobile) return;
      
      // Show/hide button
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < document.body.scrollHeight - window.innerHeight - 100);
      
      // Determine current section
      const scrollTop = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
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
    handleScroll();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const scrollToNext = () => {
    if (!isMobile) return;
    
    const nextIndex = currentSection + 1;
    if (nextIndex < sections.length) {
      const element = document.getElementById(sections[nextIndex]);
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
    if (!isMobile) return;
    
    const prevIndex = currentSection - 1;
    if (prevIndex >= 0) {
      const element = document.getElementById(sections[prevIndex]);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Don't show on desktop
  if (!isMobile) return null;

  const nextSection = currentSection < sections.length - 1 
    ? sections[currentSection + 1] 
    : 'home';

  return (
    <AnimatePresence>
      {isVisible && isMobile && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
          {/* Previous Button (only show if not at first section) */}
          {currentSection > 0 && (
            <motion.button
              onClick={scrollToPrev}
              className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to previous section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <ChevronUp className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>
          )}

          {/* Main Scroll Button */}
          <motion.button
            onClick={scrollToNext}
            className="p-4 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white shadow-2xl hover:shadow-3xl transition-all animate-pulse-subtle"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Scroll to ${nextSection}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>

          {/* Progress Indicator */}
          <div className="flex flex-col items-center space-y-1 mt-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              {currentSection + 1}/{sections.length}
            </div>
            <div className="w-1 h-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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