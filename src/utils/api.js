import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const projectsAPI = {
  // Get all featured projects
  getAllProjects: () => api.get('/api/projects/'),
  
  // Get project by ID
  getProjectById: (id) => api.get(`/api/projects/${id}/`),
};

// Contact API
export const contactAPI = {
  sendMessage: (data) => api.post('/api/contact/', data),
};

export default api;