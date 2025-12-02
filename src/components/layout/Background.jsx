import React from 'react';
import MatrixRain from '../ui/MatrixRain';
import { useTheme } from '../../contexts/ThemeContext';

const Background = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Matrix Rain - Show in both modes with different opacity */}
      <MatrixRain theme={theme} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-gray-900/50" />
    </div>
  );
};

export default Background;