import api from './client'

export const adminApi = {
  getOverview: () => api.get('/api/admin/overview'),
}
