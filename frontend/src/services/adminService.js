import { http } from './api';

export const getAdminUsers = () => http.get('/admin/users');
export const updateUserStatus = (id, status) => http.patch(`/admin/users/${id}/status`, { status });
export const getAdminAnalytics = (range) => http.get(`/admin/analytics?range=${range}`);
