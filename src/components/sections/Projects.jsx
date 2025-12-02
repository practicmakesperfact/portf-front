import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Eye, 
  Code2, 
  Globe, 
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { projectsAPI } from '../../utils/api';
import { useApi } from '../../hooks/useApi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTech, setSelectedTech] = useState('all');
  const { loading, error, callApi } = useApi();

  // Fetch projects from Django API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await callApi(() => projectsAPI.getAllProjects());
        setProjects(data);
        setFilteredProjects(data);
        
        // Extract all technologies for filtering
        const allTechs = new Set();
        data.forEach(project => {
          if (project.technologies_list) {
            project.technologies_list.forEach(tech => allTechs.add(tech.trim()));
          }
        });
        setTechnologies(['all', ...Array.from(allTechs)]);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  // Extract unique technologies for filtering
  const [technologies, setTechnologies] = useState(['all']);

  // Filter projects by technology
  useEffect(() => {
    if (selectedTech === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.technologies_list?.some(tech => 
          tech.toLowerCase().includes(selectedTech.toLowerCase())
        )
      );
      setFilteredProjects(filtered);
    }
  }, [selectedTech, projects]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Navigate to next/previous project in modal
  const navigateProject = (direction) => {
    if (!selectedProject) return;
    
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % projects.length;
    } else {
      newIndex = (currentIndex - 1 + projects.length) % projects.length;
    }
    
    setSelectedProject(projects[newIndex]);
  };

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium mb-4">
              <FolderOpen className="w-4 h-4" />
              <span>Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured{' '}
              <span className="bg-gradient-to-r from-primary-600 to-green-500 dark:from-primary-400 dark:to-green-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A showcase of my recent work. Each project demonstrates different aspects of my skills and expertise.
            </p>
          </motion.div>

          {/* Technology Filter */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {technologies.slice(0, 8).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTech === tech
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {tech === 'all' ? 'All Projects' : tech}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center py-20"
            >
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 max-w-md mx-auto">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  custom={index}
                  className="group relative"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border border-gray-200 dark:border-gray-700">
                    {/* Project Image */}
                    <div 
                      className="h-48 md:h-56 overflow-hidden bg-gradient-to-br from-primary-500/20 to-green-500/20 dark:from-primary-900/20 dark:to-green-900/20 relative cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code2 className="w-16 h-16 text-primary-600 dark:text-primary-400 opacity-30" />
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Eye className="w-8 h-8 mx-auto mb-2" />
                          <span className="text-sm font-medium">View Details</span>
                        </div>
                      </div>
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      {/* Project Type */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                          {project.project_type || 'Web Application'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {project.created_at ? new Date(project.created_at).getFullYear() : '2024'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 line-clamp-1">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.short_description || project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies_list?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies_list && project.technologies_list.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                            +{project.technologies_list.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => handleProjectClick(project)}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center space-x-1 group/btn"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        
                        <div className="flex items-center space-x-3">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              aria-label="GitHub repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              aria-label="Live demo"
                            >
                              <Globe className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Projects Found */}
          {!loading && !error && filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FolderOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {selectedTech !== 'all' 
                  ? `No projects found with ${selectedTech} technology. Try a different filter.`
                  : 'No projects available at the moment. Check back soon!'}
              </p>
            </motion.div>
          )}

          {/* Call to Action */}
          {!loading && !error && projects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Interested in seeing more? Check out my GitHub for additional projects and code samples.
              </p>
              <a
                href="https://github.com/haymanot-asmare"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>View More on GitHub</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                {/* Modal Image */}
                <div className="h-64 md:h-80 overflow-hidden bg-gradient-to-br from-primary-500/20 to-green-500/20">
                  {selectedProject.image_url ? (
                    <img
                      src={selectedProject.image_url}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Code2 className="w-20 h-20 text-primary-600 dark:text-primary-400 opacity-30" />
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Navigation Buttons */}
                {projects.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateProject('prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigateProject('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                {/* Project Header */}
                <div className="flex flex-wrap items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                        {selectedProject.project_type || 'Web Application'}
                      </span>
                      {selectedProject.featured && (
                        <span className="text-xs font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                      {selectedProject.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    {selectedProject.github_url && (
                      <a
                        href={selectedProject.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center space-x-2 text-sm px-4 py-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    
                    {selectedProject.live_url && (
                      <a
                        href={selectedProject.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center space-x-2 text-sm px-4 py-2"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">About this project</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies_list?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-lg border border-primary-200 dark:border-primary-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                {selectedProject.features_list && selectedProject.features_list.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">Key Features</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {selectedProject.features_list.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Project Links */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                  {selectedProject.demo_url && (
                    <a
                      href={selectedProject.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Demo</span>
                    </a>
                  )}
                  
                  {selectedProject.documentation_url && (
                    <a
                      href={selectedProject.documentation_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Documentation</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;