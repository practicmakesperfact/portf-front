import React from 'react';
import Header from '../common/Header';
// import Footer from '../common/Footer';
import ThemeToggle from '../common/ThemeToggle';
import Background from './Background';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Background />
      <ThemeToggle />
      
      <div className="relative z-10">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;