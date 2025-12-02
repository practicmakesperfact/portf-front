// import React from 'react';
// import { motion } from 'framer-motion';
// import { User, MapPin, Briefcase, Award, Download } from 'lucide-react';

// const About = () => {
//   const experiences = [
//     {
//       year: '2022 - Present',
//       role: 'Senior Full Stack Developer',
//       company: 'Tech Solutions Inc.',
//       description: 'Leading development of enterprise web applications.',
//     },
//     {
//       year: '2020 - 2022',
//       role: 'Frontend Developer',
//       company: 'Digital Agency',
//       description: 'Built responsive web applications for various clients.',
//     },
//     {
//       year: '2019 - 2020',
//       role: 'Junior Developer',
//       company: 'Startup Studio',
//       description: 'Started career building MVPs for startups.',
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 30, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 100,
//         damping: 12,
//       },
//     },
//   };

//   return (
//     <section id="about" className="section-padding">
//       <div className="container-custom">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-100px' }}
//           className="max-w-6xl mx-auto"
//         >
//           {/* Section Header */}
//           <motion.div
//             variants={itemVariants}
//             className="text-center mb-16"
//           >
//             <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium mb-4">
//               <User className="w-4 h-4" />
//               <span>About Me</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//               Crafting Digital{' '}
//               <span className="bg-gradient-to-r from-primary-600 to-green-500 dark:from-primary-400 dark:to-green-400 bg-clip-text text-transparent">
//                 Excellence
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
//               Passionate developer with expertise in modern web technologies and a focus on creating impactful digital solutions.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Column - Image & Quick Info */}
//             <motion.div variants={itemVariants} className="space-y-8">
//               {/* Profile Image */}
//               <div className="relative">
//                 <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden mx-auto border-4 border-white dark:border-gray-800 shadow-2xl">
//                   {/* Placeholder for profile image - Replace with actual image */}
//                   <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 flex items-center justify-center">
//                     <User className="w-32 h-32 text-white/80" />
//                   </div>
//                 </div>
//                 {/* Floating badges */}
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.5 }}
//                   className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
//                 >
//                   <Award className="w-8 h-8 text-yellow-500" />
//                 </motion.div>
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.7 }}
//                   className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
//                 >
//                   <Briefcase className="w-8 h-8 text-green-500" />
//                 </motion.div>
//               </div>

//               {/* Quick Info */}
//               <div className="space-y-4">
//                 <div className="flex items-center justify-center space-x-4">
//                   <MapPin className="w-5 h-5 text-gray-500" />
//                   <span className="text-gray-700 dark:text-gray-300">Addis Ababa, Ethiopia</span>
//                 </div>
                
//                 <a
//                   href="/resume.pdf"
//                   download
//                   className="btn-primary inline-flex items-center space-x-2 mx-auto"
//                 >
//                   <Download className="w-5 h-5" />
//                   <span>Download Resume</span>
//                 </a>
//               </div>
//             </motion.div>

//             {/* Right Column - Bio & Experience */}
//             <motion.div variants={itemVariants} className="space-y-8">
//               {/* Bio */}
//               <div className="space-y-4">
//                 <h3 className="text-2xl font-bold">My Journey</h3>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   With over 4 years of experience in web development, I specialize in building scalable, 
//                   high-performance applications using modern technologies. My journey began with a passion 
//                   for problem-solving and has evolved into a career creating digital solutions that make an impact.
//                 </p>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   I believe in writing clean, maintainable code and staying updated with the latest industry trends. 
//                   My expertise spans across the entire development stack, from crafting pixel-perfect UIs to 
//                   architecting robust backend systems.
//                 </p>
//               </div>

//               {/* Experience Timeline */}
//               <div className="space-y-6">
//                 <h3 className="text-2xl font-bold">Experience</h3>
//                 <div className="space-y-6">
//                   {experiences.map((exp, index) => (
//                     <motion.div
//                       key={exp.year}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.2 }}
//                       viewport={{ once: true }}
//                       className="relative pl-10 pb-6 last:pb-0"
//                     >
//                       {/* Timeline line */}
//                       {index < experiences.length - 1 && (
//                         <div className="absolute left-[18px] top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
//                       )}
                      
//                       {/* Timeline dot */}
//                       <div className="absolute left-0 top-2 w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center">
//                         <div className="w-3 h-3 rounded-full bg-white" />
//                       </div>
                      
//                       {/* Content */}
//                       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//                         <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-1">
//                           {exp.year}
//                         </div>
//                         <h4 className="text-xl font-bold mb-1">{exp.role}</h4>
//                         <div className="text-gray-600 dark:text-gray-400 mb-2">{exp.company}</div>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">{exp.description}</p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* Philosophy */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 viewport={{ once: true }}
//                 className="bg-gradient-to-r from-primary-500/10 to-green-500/10 dark:from-primary-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800"
//               >
//                 <h4 className="text-xl font-bold mb-3">My Philosophy</h4>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   "Great software is built at the intersection of elegant design, robust engineering, 
//                   and user-centric thinking. I strive to create solutions that are not just functional, 
//                   but delightful to use."
//                 </p>
//               </motion.div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default About;