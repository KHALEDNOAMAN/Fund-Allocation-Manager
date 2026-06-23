import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3006/api' });
export const fundApi = { getAll: () => api.get('/funds'), getById: (id) => api.get(`/funds/${id}`), create: (d) => api.post('/funds', d) };
export const allocationApi = { getAll: (p) => api.get('/allocations', { params: p }), create: (d) => api.post('/allocations', d), approve: (id, d) => api.put(`/allocations/${id}/approve`, d), reject: (id, d) => api.put(`/allocations/${id}/reject`, d) };
export const transferApi = { getAll: () => api.get('/transfers'), create: (d) => api.post('/transfers', d), approve: (id) => api.put(`/transfers/${id}/approve`) };
export const reportApi = { summary: () => api.get('/reports/summary'), variance: () => api.get('/reports/variance') };
export default api;
