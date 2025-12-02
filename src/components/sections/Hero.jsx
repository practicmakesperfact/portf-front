import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Github, Linkedin, Twitter, FileText } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
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
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900 z-0" />
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Animated Code Icon */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <motion.div
              variants={floatVariants}
              animate="float"
              className="p-6 rounded-2xl glass-card inline-flex"
            >
              <Code2 className="w-16 h-16 text-primary-600 dark:text-primary-400" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="block text-gray-800 dark:text-white mb-2">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-600 to-green-500 dark:from-primary-400 dark:to-green-400 bg-clip-text text-transparent">
                [Your Name]
              </span>
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl text-gray-600 dark:text-gray-300 font-mono">
              Full Stack Developer
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto font-light"
          >
            Building exceptional digital experiences with{' '}
            <span className="font-semibold text-primary-600 dark:text-primary-400">React</span>,{' '}
            <span className="font-semibold text-primary-600 dark:text-primary-400">Django</span>, and modern web technologies
            for companies worldwide.
          </motion.p>

          {/* Specialization Tags */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {['React Specialist', 'Django Expert', 'UI/UX Designer', 'DevOps', 'API Development'].map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm border border-primary-200 dark:border-primary-800"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              onClick={scrollToContact}
              className="btn-primary group flex items-center justify-center space-x-2 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              onClick={scrollToProjects}
              className="btn-secondary group flex items-center justify-center space-x-2 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card hover:bg-white/20 dark:hover:bg-black/20 transition-all group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { value: '4+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Completed' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: '24/7', label: 'Available' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 1 }}
                className="text-center p-6 rounded-2xl glass-card"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              Scroll to explore
            </div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 mx-auto relative"
            >
              <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;