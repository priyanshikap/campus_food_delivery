// Mock pickup slot config for the ManageSlots page. This is the staff-side
// source of truth that MOCK_PICKUP_SLOTS (data/mockData.js) mirrors on the
// student side — wire both to the same slotService endpoint later.

export const COUNTERS = ["A1", "B2"];

export const MOCK_SLOTS = [
  { id: "slot-1", time: "12:30 PM", counter: "A1", capacity: 8, ordersPlaced: 8, active: true },
  { id: "slot-2", time: "1:00 PM", counter: "A1", capacity: 8, ordersPlaced: 5, active: true },
  { id: "slot-3", time: "1:30 PM", counter: "B2", capacity: 6, ordersPlaced: 6, active: true },
  { id: "slot-4", time: "2:00 PM", counter: "B2", capacity: 6, ordersPlaced: 2, active: true },
  { id: "slot-5", time: "2:30 PM", counter: "B2", capacity: 6, ordersPlaced: 0, active: true },
  { id: "slot-6", time: "3:00 PM", counter: "A1", capacity: 8, ordersPlaced: 3, active: false },
];
