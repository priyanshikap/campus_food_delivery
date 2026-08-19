// Full order history for the ManageOrders page. This is intentionally a
// separate, larger dataset from data/staffMockData.js's MOCK_LIVE_ORDERS
// (which only feeds the live queue on StaffDashboard) — swap for a real
// paginated orderService call later.

export const MOCK_ORDER_HISTORY = [
  { id: "CB-2305", customer: "Aditi Rao", items: [{ name: "Paneer Tikka Wrap", qty: 1 }, { name: "Cold Coffee", qty: 1 }], pickupSlot: { time: "2:00 PM", counter: "B2" }, status: "PENDING", placedAt: "2026-08-19T13:40:00", total: 180 },
  { id: "CB-2304", customer: "Rohan Mehta", items: [{ name: "Masala Dosa", qty: 2 }], pickupSlot: { time: "1:30 PM", counter: "B2" }, status: "PENDING", placedAt: "2026-08-19T13:36:00", total: 180 },
  { id: "CB-2300", customer: "Sneha Iyer", items: [{ name: "Veg Sandwich", qty: 1 }, { name: "Samosa", qty: 3 }], pickupSlot: { time: "1:00 PM", counter: "A1" }, status: "CONFIRMED", placedAt: "2026-08-19T13:10:00", total: 115 },
  { id: "CB-2298", customer: "Karthik Nair", items: [{ name: "Veg Puff", qty: 2 }], pickupSlot: { time: "1:00 PM", counter: "A1" }, status: "CONFIRMED", placedAt: "2026-08-19T13:05:00", total: 70 },
  { id: "CB-2291", customer: "Priya Sharma", items: [{ name: "Paneer Tikka Wrap", qty: 1 }, { name: "Cold Coffee", qty: 1 }], pickupSlot: { time: "1:55 PM", counter: "B2" }, status: "PREPARING", placedAt: "2026-08-19T13:12:00", total: 180 },
  { id: "CB-2287", customer: "Divya Menon", items: [{ name: "Masala Dosa", qty: 1 }], pickupSlot: { time: "12:30 PM", counter: "A1" }, status: "PREPARING", placedAt: "2026-08-19T12:50:00", total: 90 },
  { id: "CB-2283", customer: "Arjun Verma", items: [{ name: "Cold Coffee", qty: 2 }], pickupSlot: { time: "12:30 PM", counter: "A1" }, status: "READY", placedAt: "2026-08-19T12:20:00", total: 120 },
  { id: "CB-2280", customer: "Meera Pillai", items: [{ name: "Masala Dosa", qty: 1 }, { name: "Samosa", qty: 2 }], pickupSlot: { time: "12:30 PM", counter: "A1" }, status: "COLLECTED", placedAt: "2026-08-19T11:58:00", total: 130 },
  { id: "CB-2276", customer: "Vikram Das", items: [{ name: "Veg Sandwich", qty: 1 }], pickupSlot: { time: "11:30 AM", counter: "B2" }, status: "COLLECTED", placedAt: "2026-08-19T11:15:00", total: 55 },
  { id: "CB-2271", customer: "Neha Kapoor", items: [{ name: "Veg Puff", qty: 3 }], pickupSlot: { time: "11:00 AM", counter: "A1" }, status: "REJECTED", placedAt: "2026-08-19T10:40:00", total: 105 },
  { id: "CB-2265", customer: "Sanjay Rao", items: [{ name: "Cold Coffee", qty: 1 }], pickupSlot: { time: "10:30 AM", counter: "B2" }, status: "CANCELLED", placedAt: "2026-08-19T10:05:00", total: 60 },
  { id: "CB-2240", customer: "Ishita Sen", items: [{ name: "Masala Dosa", qty: 2 }, { name: "Lemon Iced Tea", qty: 1 }], pickupSlot: { time: "1:00 PM", counter: "A1" }, status: "COLLECTED", placedAt: "2026-08-18T13:02:00", total: 225 },
  { id: "CB-2233", customer: "Farhan Ali", items: [{ name: "Veg Sandwich", qty: 2 }], pickupSlot: { time: "12:30 PM", counter: "A1" }, status: "COLLECTED", placedAt: "2026-08-18T12:20:00", total: 110 },
  { id: "CB-2228", customer: "Ritu Nambiar", items: [{ name: "Paneer Tikka Wrap", qty: 1 }], pickupSlot: { time: "2:00 PM", counter: "B2" }, status: "REJECTED", placedAt: "2026-08-18T13:45:00", total: 120 },
  { id: "CB-2219", customer: "Devansh Gupta", items: [{ name: "Samosa", qty: 4 }], pickupSlot: { time: "11:00 AM", counter: "A1" }, status: "COLLECTED", placedAt: "2026-08-18T10:55:00", total: 80 },
];
