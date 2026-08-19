// Local mock data for the CampusBite landing page.
// Replace with live API data once integration is requested.

export const SEED_CART_ITEMS = []
export const SEED_ORDERS = []

export const MOCK_INVENTORY = {
  'm1': 4,
  'm2': 2,
  'm3': 0,
  'm4': 16,
  'm5': 28,
  'm6': 12,
  'm7': 14,
  'item-paneer-wrap': 4,
  'item-cold-coffee': 2,
  'item-veg-puff': 0,
  'item-masala-dosa': 16,
  'item-samosa': 28,
  'item-veg-sandwich': 12,
  'item-lemon-tea': 14,
}

export const MOCK_PICKUP_SLOTS = [
  { id: 's1', time: '12:00 PM', counter: 'A1', capacity: 40, ordersPlaced: 34, active: true },
  { id: 's2', time: '12:15 PM', counter: 'A1', capacity: 40, ordersPlaced: 40, active: true },
  { id: 's3', time: '12:30 PM', counter: 'A1', capacity: 40, ordersPlaced: 12, active: true },
  { id: 's4', time: '1:00 PM', counter: 'A1', capacity: 40, ordersPlaced: 30, active: true },
  { id: 's5', time: '1:15 PM', counter: 'B2', capacity: 40, ordersPlaced: 6, active: true },
]

export const popularFoods = [
  {
    id: 'f1',
    name: 'Paneer Tikka Wrap',
    category: 'Wraps',
    price: 120,
    prepTime: '8 min',
    tag: 'Bestseller',
    remaining: 14,
  },
  {
    id: 'f2',
    name: 'South Indian Thali',
    category: 'Meals',
    price: 150,
    prepTime: '12 min',
    tag: 'Chef pick',
    remaining: 6,
  },
  {
    id: 'f3',
    name: 'Cold Coffee + Sandwich',
    category: 'Combo',
    price: 95,
    prepTime: '5 min',
    tag: 'Quick bite',
    remaining: 22,
  },
  {
    id: 'f4',
    name: 'Veg Fried Rice',
    category: 'Meals',
    price: 110,
    prepTime: '10 min',
    tag: 'Popular',
    remaining: 9,
  },
]

export const pickupSlots = [
  { id: 's1', time: '12:00 PM', window: '12:00 – 12:15', capacity: 40, reserved: 31 },
  { id: 's2', time: '12:15 PM', window: '12:15 – 12:30', capacity: 40, reserved: 40 },
  { id: 's3', time: '12:30 PM', window: '12:30 – 12:45', capacity: 40, reserved: 12 },
  { id: 's4', time: '1:00 PM', window: '1:00 – 1:15', capacity: 40, reserved: 5 },
]

export const howItWorks = [
  {
    step: '01',
    title: 'Browse',
    description: 'Check today\u2019s menu and live counter stock before you leave class.',
  },
  {
    step: '02',
    title: 'Choose slot',
    description: 'Pick a pickup window that fits your schedule, down to the quarter hour.',
  },
  {
    step: '03',
    title: 'Reserve',
    description: 'Your order and ingredients are held the moment you check out.',
  },
  {
    step: '04',
    title: 'Pick up',
    description: 'Walk straight to the counter, show your pass, and go.',
  },
]

export const benefits = [
  {
    title: 'Zero queue time',
    description: 'Your food is reserved and timed, so you walk in and walk out.',
  },
  {
    title: 'Real inventory',
    description: 'Stock is slot-specific and updates live \u2014 no more sold-out surprises.',
  },
  {
    title: 'Built for timetables',
    description: 'Order between lectures and collect exactly when you\u2019re free.',
  },
  {
    title: 'One pass, every counter',
    description: 'A single CampusBite pass works across every canteen counter on campus.',
  },
]
