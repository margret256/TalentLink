import api from './client'

export const authApi = {
  login: (payload) => api.post('/api/login', payload),
  signup: (payload) => api.post('/api/signup', payload),
}
