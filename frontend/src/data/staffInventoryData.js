// Mock data for the Staff Inventory page. Replace with a real inventory
// service call later — deriveInventoryRow() in inventoryCalculations.js
// works the same on live data as long as { total, reserved } are present.

export const CATEGORIES = ["Wraps", "Beverages", "Snacks", "South Indian", "Sandwiches"];
export const PICKUP_DATES = ["2026-08-19", "2026-08-20"];
export const PICKUP_SLOTS = ["12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM"];

export const MOCK_INVENTORY_ROWS = [
  { id: "inv-1", name: "Paneer Tikka Wrap", category: "Wraps", pickupDate: "2026-08-19", pickupSlot: "1:30 PM", total: 20, reserved: 16 },
  { id: "inv-2", name: "Cold Coffee", category: "Beverages", pickupDate: "2026-08-19", pickupSlot: "1:30 PM", total: 15, reserved: 13 },
  { id: "inv-3", name: "Veg Puff", category: "Snacks", pickupDate: "2026-08-19", pickupSlot: "1:00 PM", total: 10, reserved: 10 },
  { id: "inv-4", name: "Masala Dosa", category: "South Indian", pickupDate: "2026-08-19", pickupSlot: "12:30 PM", total: 25, reserved: 9 },
  { id: "inv-5", name: "Samosa", category: "Snacks", pickupDate: "2026-08-19", pickupSlot: "12:30 PM", total: 40, reserved: 12 },
  { id: "inv-6", name: "Veg Sandwich", category: "Sandwiches", pickupDate: "2026-08-19", pickupSlot: "2:00 PM", total: 20, reserved: 8 },
  { id: "inv-7", name: "Hakka Noodles", category: "South Indian", pickupDate: "2026-08-19", pickupSlot: "2:00 PM", total: 12, reserved: 3, manuallyUnavailable: true },
  { id: "inv-8", name: "Lemon Iced Tea", category: "Beverages", pickupDate: "2026-08-19", pickupSlot: "2:30 PM", total: 18, reserved: 4 },
  { id: "inv-9", name: "Paneer Tikka Wrap", category: "Wraps", pickupDate: "2026-08-20", pickupSlot: "1:00 PM", total: 20, reserved: 2 },
  { id: "inv-10", name: "Masala Dosa", category: "South Indian", pickupDate: "2026-08-20", pickupSlot: "12:30 PM", total: 25, reserved: 5 },
  { id: "inv-11", name: "Veg Sandwich", category: "Sandwiches", pickupDate: "2026-08-20", pickupSlot: "1:30 PM", total: 20, reserved: 0 },
  { id: "inv-12", name: "Samosa", category: "Snacks", pickupDate: "2026-08-20", pickupSlot: "12:30 PM", total: 40, reserved: 0 },
];
