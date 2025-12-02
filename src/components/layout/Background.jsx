import React from 'react';
import MatrixRain from '../ui/MatrixRain';
import { useTheme } from '../../contexts/ThemeContext';

const Background = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Matrix Rain - Only in dark mode */}
      {theme === 'dark' && <MatrixRain />}
      
      {/* Grid overlay for light mode */}
      {theme === 'light' && (
        <div 
          className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 100, 255, 0.1) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(0, 100, 255, 0.1) 1px, transparent 1px)`
          }}
        />
      )}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900" />
    </div>
  );
};

export default Background;