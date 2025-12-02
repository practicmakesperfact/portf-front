import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    'Software Engineer',
    'Full-Stack Developer',
    'React Specialist',
    'Django Expert'
  ];

  // Animate role text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/haymanot-asmare', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/haymanot-asmare', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:haymanot@example.com', label: 'Email' },
    { icon: FileText, href: '/resume.pdf', label: 'Resume' },
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatVariants = {
    float: {
      y: [0, -8, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const roleVariants = {
    enter: { y: 20, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden section-padding pt-20"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900 z-0" />
      
      {/* Content - Optimized for screen fit */}
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Animated Code Icon - Smaller */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <motion.div
              variants={floatVariants}
              animate="float"
              className="p-4 rounded-2xl glass-card inline-flex"
            >
              <Code2 className="w-12 h-12 md:w-14 md:h-14 text-primary-600 dark:text-primary-400" />
            </motion.div>
          </motion.div>

          {/* Title - Optimized text sizes */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3"
          >
            <span className="block text-gray-800 dark:text-white mb-1">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-600 to-green-500 dark:from-primary-400 dark:to-green-400 bg-clip-text text-transparent">
                Haymanot Asmare
              </span>
            </span>
            
            {/* Animated Roles - Smaller */}
            <div className="h-16 md:h-20 lg:h-24 flex items-center justify-center">
              <motion.div
                key={currentRole}
                variants={roleVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 font-mono"
              >
                {roles[currentRole]}
              </motion.div>
            </div>
          </motion.h1>

          {/* Tagline - Smaller */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-primary-600 dark:text-primary-400 mb-6 max-w-2xl mx-auto font-semibold"
          >
            Turning Ideas into Reality
          </motion.p>

          {/* CTA Buttons - Smaller */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
          >
            <motion.button
              onClick={scrollToContact}
              className="btn-primary group flex items-center justify-center space-x-2 text-base px-5 py-2.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              onClick={scrollToProjects}
              className="btn-secondary group flex items-center justify-center space-x-2 text-base px-5 py-2.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Social Links - Smaller */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-4 mb-10"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-card hover:bg-white/20 dark:hover:bg-black/20 transition-all group"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats - Smaller and compact */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { value: '2+', label: 'Years Experience' },
              { value: '5+', label: 'Projects Delivered' },
              { value: '10+', label: 'Happy Clients' },
              { value: '10K+', label: 'Lines of Code' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.8 }}
                className="text-center p-4 rounded-xl glass-card"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Scroll Hint - Smaller */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 md:hidden"
          >
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">
              Scroll or tap button to navigate
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;