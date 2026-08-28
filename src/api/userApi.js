import api from './client'

export const userApi = {
  getProfile: () => api.get('/api/profile'),
  updateProfile: (payload) => api.put('/api/profile', payload),
  getDashboard: () => api.get('/api/dashboard'),
  getApplications: () => api.get('/api/applications'),
  getProjects: () => api.get('/api/projects'),
  getSavedJobs: () => api.get('/api/saved-jobs'),
  getMessages: () => api.get('/api/messages'),
  getMessageContacts: () => api.get('/api/message-contacts'),
  sendMessage: (payload) => api.post('/api/messages', payload),
  getNotifications: () => api.get('/api/notifications'),
  getSettings: () => api.get('/api/settings'),
}
