// Mock data for StudentDashboard.jsx
// Swap these for real calls to services/dashboardService.js and services/orderService.js
// once the backend endpoints are wired up. Shapes are kept intentionally close to
// what those services will eventually return.

export const mockStudent = {
  name: 'Aditi Sharma',
  id: 'STU2291',
  initials: 'AS',
};

export const mockActiveOrder = {
  id: 'CB-2291',
  status: 'PREPARING', // PENDING | CONFIRMED | PREPARING | READY | COLLECTED
  items: [
    { name: 'Paneer Tikka Wrap', qty: 1 },
    { name: 'Cold Coffee', qty: 1 },
  ],
  total: 180,
  placedAt: '1:42 PM',
  eta: '~10 min',
  counter: 'B2',
};

export const mockTodayPickup = {
  time: '1:55 PM',
  counter: 'B2',
  orderId: 'CB-2291',
};

export const mockStats = {
  totalOrders: 47,
  monthlySpend: 1860,
  favoriteItem: { name: 'Paneer Tikka Wrap', emoji: '🌯', count: 12 },
};

export const mockRecentOrders = [
  { id: 'CB-2288', itemSummary: 'Veg Momos ×2, Filter Coffee', status: 'COLLECTED', date: 'Yesterday', total: 140 },
  { id: 'CB-2273', itemSummary: 'Masala Dosa, Filter Coffee', status: 'COLLECTED', date: 'Mon, 17 Aug', total: 110 },
  { id: 'CB-2260', itemSummary: 'Chicken Roll ×1', status: 'CANCELLED', date: 'Fri, 14 Aug', total: 120 },
  { id: 'CB-2244', itemSummary: 'Maggi Bowl, Cold Coffee', status: 'COLLECTED', date: 'Wed, 12 Aug', total: 130 },
  { id: 'CB-2231', itemSummary: 'Paneer Tikka Wrap, Fruit Bowl', status: 'COLLECTED', date: 'Mon, 10 Aug', total: 210 },
];

export const mockRecommended = [
  { id: 'itm-01', name: 'Paneer Tikka Wrap', emoji: '🌯', category: 'Wraps & Rolls', price: 120, tag: 'Your favorite' },
  { id: 'itm-02', name: 'Masala Dosa', emoji: '🥞', category: 'South Indian', price: 90, tag: 'Popular' },
  { id: 'itm-03', name: 'Cold Coffee', emoji: '🥤', category: 'Beverages', price: 60, tag: null },
  { id: 'itm-04', name: 'Veg Momos', emoji: '🥟', category: 'Snacks', price: 80, tag: 'New' },
];

export const mockNotifications = [
  { id: 'n1', text: 'Your order #CB-2288 was collected. Enjoy!', time: 'Yesterday, 1:20 PM', read: true },
  { id: 'n2', text: 'Filter Coffee is back at Counter 3.', time: 'Yesterday, 9:05 AM', read: true },
  { id: 'n3', text: 'The 1–2 PM pickup slot is filling up fast today.', time: 'Today, 11:30 AM', read: false },
  { id: 'n4', text: 'Order #CB-2291 moved to Preparing.', time: 'Today, 1:44 PM', read: false },
];
