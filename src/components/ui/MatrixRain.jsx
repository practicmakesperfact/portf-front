import React, { useEffect, useRef } from 'react';

const MatrixRain = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    // Meaningful tech/developer terms instead of random characters
    const techTerms = [
      "React", "Django", "Python", "JavaScript", "TypeScript", "Tailwind",
      "PostgreSQL", "MongoDB", "GraphQL", "REST API", "Git", "Docker",
      "AWS", "Vite", "NextJS", "NodeJS", "Express", "Redux", "GSAP",
      "Framer", "ThreeJS", "WebGL", "PWA", "SEO", "CI/CD", "Agile",
      "Linux", "Nginx", "Redis", "WebSocket", "JWT", "OAuth", "Firebase"
    ];

    // Combine tech terms with some symbols
    const getRandomChar = () => {
      if (Math.random() > 0.3) {
        return techTerms[Math.floor(Math.random() * techTerms.length)];
      }
      return "01";
    };

    const fontSize = 16;
    const columns = width / (fontSize * 8); // Adjust for longer text
    
    // Raindrops array - store objects with text and position
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = {
        text: getRandomChar(),
        y: Math.random() * -height, // Start above screen
        speed: 1 + Math.random() * 2, // Random speed
        opacity: Math.random() * 0.5 + 0.3 // Random opacity
      };
    }

    // Colors based on theme
    const getColors = () => {
      if (theme === 'dark') {
        return [
          '#00ff41', // Matrix green
          '#00cc33',
          '#00ff88',
          '#39ff14',
          '#32cd32'
        ];
      } else {
        // Light mode colors - soft blue/teal
        return [
          '#0ea5e9', // Primary blue
          '#06b6d4', // Cyan
          '#3b82f6', // Blue
          '#8b5cf6', // Violet
          '#10b981' // Emerald
        ];
      }
    };

    let animationId;

    const draw = () => {
      // Semi-transparent background for trail effect
      if (theme === 'dark') {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)'; // Lighter trail for readability
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      }
      ctx.fillRect(0, 0, width, height);

      const colors = getColors();

      // Draw the tech terms
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Color
        const colorIndex = Math.floor(Math.random() * colors.length);
        ctx.fillStyle = colors[colorIndex];
        ctx.globalAlpha = drop.opacity;
        
        // Font
        ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
        
        // Draw text
        ctx.fillText(drop.text, i * (fontSize * 8), drop.y);
        
        // Move drop down
        drop.y += drop.speed;
        
        // Reset if off screen
        if (drop.y > height + 50) {
          drop.y = -50;
          drop.text = getRandomChar();
          drop.speed = 1 + Math.random() * 2;
          drop.opacity = Math.random() * 0.5 + 0.3;
        }
        
        ctx.globalAlpha = 1.0;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: -1 }}
    />
  );
};

export default MatrixRain;