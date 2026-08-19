// Mock data for the Staff Operations Dashboard. Replace with orderService /
// dashboardService calls later — shape stays the same.

export const MOCK_LIVE_ORDERS = [
  {
    id: "CB-2305",
    customer: "Aditi Rao",
    items: [
      { name: "Paneer Tikka Wrap", qty: 1 },
      { name: "Cold Coffee", qty: 1 },
    ],
    pickupSlot: { time: "2:00 PM", counter: "B2" },
    status: "PENDING",
    placedAt: "2026-08-19T13:40:00",
  },
  {
    id: "CB-2304",
    customer: "Rohan Mehta",
    items: [{ name: "Masala Dosa", qty: 2 }],
    pickupSlot: { time: "1:30 PM", counter: "B2" },
    status: "PENDING",
    placedAt: "2026-08-19T13:36:00",
  },
  {
    id: "CB-2300",
    customer: "Sneha Iyer",
    items: [
      { name: "Veg Sandwich", qty: 1 },
      { name: "Samosa", qty: 3 },
    ],
    pickupSlot: { time: "1:00 PM", counter: "A1" },
    status: "CONFIRMED",
    placedAt: "2026-08-19T13:10:00",
  },
  {
    id: "CB-2298",
    customer: "Karthik Nair",
    items: [{ name: "Veg Puff", qty: 2 }],
    pickupSlot: { time: "1:00 PM", counter: "A1" },
    status: "CONFIRMED",
    placedAt: "2026-08-19T13:05:00",
  },
  {
    id: "CB-2291",
    customer: "Priya Sharma",
    items: [
      { name: "Paneer Tikka Wrap", qty: 1 },
      { name: "Cold Coffee", qty: 1 },
    ],
    pickupSlot: { time: "1:55 PM", counter: "B2" },
    status: "PREPARING",
    placedAt: "2026-08-19T13:12:00",
  },
  {
    id: "CB-2287",
    customer: "Divya Menon",
    items: [{ name: "Masala Dosa", qty: 1 }],
    pickupSlot: { time: "12:30 PM", counter: "A1" },
    status: "PREPARING",
    placedAt: "2026-08-19T12:50:00",
  },
  {
    id: "CB-2283",
    customer: "Arjun Verma",
    items: [{ name: "Cold Coffee", qty: 2 }],
    pickupSlot: { time: "12:30 PM", counter: "A1" },
    status: "READY",
    placedAt: "2026-08-19T12:20:00",
  },
  {
    id: "CB-2280",
    customer: "Meera Pillai",
    items: [
      { name: "Masala Dosa", qty: 1 },
      { name: "Samosa", qty: 2 },
    ],
    pickupSlot: { time: "12:30 PM", counter: "A1" },
    status: "COLLECTED",
    placedAt: "2026-08-19T11:58:00",
  },
  {
    id: "CB-2276",
    customer: "Vikram Das",
    items: [{ name: "Veg Sandwich", qty: 1 }],
    pickupSlot: { time: "11:30 AM", counter: "B2" },
    status: "COLLECTED",
    placedAt: "2026-08-19T11:15:00",
  },
];

// itemName -> units left. Drives the low-inventory alert strip.
export const MOCK_LOW_INVENTORY = [
  { name: "Cold Coffee", available: 2, threshold: 5 },
  { name: "Veg Puff", available: 0, threshold: 5 },
  { name: "Paneer Tikka Wrap", available: 4, threshold: 5 },
];
