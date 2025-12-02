import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'haymanot@example.com', href: 'mailto:haymanot@example.com' },
    { icon: Phone, text: '+251 9XX XXX XXX', href: 'tel:+2519XXXXXXXX' },
    { icon: MapPin, text: 'Addis Ababa, Ethiopia' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom">
        <div className="py-12 md:py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 group focus:outline-none"
                aria-label="Scroll to top"
              >
                <Code2 className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors" />
                <span className="text-2xl font-bold font-mono">
                  <span className="bg-gradient-to-r from-primary-600 to-green-500 dark:from-primary-400 dark:to-green-400 bg-clip-text text-transparent">
                    HAYMANOT
                  </span>
                </span>
              </button>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Crafting exceptional digital experiences with modern technologies.
                Specializing in React, Django, and full-stack web development.
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>in Ethiopia</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-3 mr-2 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Get In Touch
              </h3>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <info.icon className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {info.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-800 mb-8"></div>

          {/* Copyright and Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Haymanot Asmare. All rights reserved.
            </div>
            
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              <span className="mr-2">Built with</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">
                React
              </span>
              <span className="mx-1">+</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">
                Django
              </span>
              <span className="mx-1">+</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">
                Tailwind
              </span>
            </div>
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 md:bottom-8 md:right-8 p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all z-40 group"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <div className="relative">
              <Code2 className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors" />
              <div className="absolute -top-8 -left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Back to top
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;