import api from './client'

export const jobsApi = {
  getAll: () => api.get('/api/jobs'),
  getEmployerJobs: () => api.get('/api/employer/jobs'),
  getEmployerJob: (id) => api.get(`/api/employer/jobs/${id}`),
  getById: (id) => api.get(`/api/jobs/${id}`),
  getCategories: () => api.get('/api/categories'),
  getCompanies: () => api.get('/api/companies'),
  postOpportunity: (payload) => api.post('/api/post-opportunity', payload),
  apply: (id) => api.post(`/api/jobs/${id}/apply`, {}),
  save: (id) => api.post(`/api/jobs/${id}/save`, {}),
}
