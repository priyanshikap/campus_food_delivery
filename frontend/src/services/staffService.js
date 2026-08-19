import { http } from './api';

export const getStaffOrders = () => http.get('/staff/orders');
export const updateOrderStatus = (orderId, status) => http.patch(`/staff/orders/${orderId}/status`, { status });
export const getManageMenuItems = () => http.get('/menu/manage');
export const createMenuItem = (item) => http.post('/menu', item);
export const updateMenuItem = (id, item) => http.put(`/menu/${id}`, item);
export const deleteMenuItem = (id) => http.delete(`/menu/${id}`);
export const getManageSlots = () => http.get('/slots/manage');
export const createSlot = (slot) => http.post('/slots', slot);
export const updateSlot = (id, slot) => http.put(`/slots/${id}`, slot);
export const deleteSlot = (id) => http.delete(`/slots/${id}`);
export const getInventory = () => http.get('/inventory');
export const updateInventory = (row, total) => http.put(`/inventory/${row.menuItemId}/${row.slotId}/${row.pickupDate}`, { total });
