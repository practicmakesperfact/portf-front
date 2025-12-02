import React from 'react';
import Header from '../common/Header';
// import Footer from '../common/Footer';
import Background from './Background';
import ScrollNavigation from '../common/ScrollNavigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative">
      <Background />
      
      {/* Container with padding to prevent overlap */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        {/* Main content area with top padding for header */}
        <main className="flex-grow pt-16">
          {children}
        </main>
        
        {/* <Footer /> */}
      </div>
      
      {/* Floating Scroll Navigation */}
      <ScrollNavigation />
    </div>
  );
};

export default Layout;