// Local mock data for the CampusBite Menu page.
// Inventory is slot-specific: each item's stock is keyed by "dateId:slotId".
// Replace with live API data once integration is requested.

export const categories = ['All', 'Meals', 'Wraps', 'Combo', 'Beverages', 'Snacks']

const dateFormatter = new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric' })

function toLocalDateId(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const pickupDates = Array.from({ length: 3 }, (_, index) => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + index)
  const id = toLocalDateId(date)
  return {
    id,
    label: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : date.toLocaleDateString('en-IN', { weekday: 'short' }),
    date: dateFormatter.format(date),
  }
})

export const pickupSlots = [
  { id: 's1', time: '12:00 PM', window: '12:00 \u2013 12:15', capacity: 40, reserved: 34 },
  { id: 's2', time: '12:15 PM', window: '12:15 \u2013 12:30', capacity: 40, reserved: 40 },
  { id: 's3', time: '12:30 PM', window: '12:30 \u2013 12:45', capacity: 40, reserved: 12 },
  { id: 's4', time: '1:00 PM', window: '1:00 \u2013 1:15', capacity: 40, reserved: 30 },
  { id: 's5', time: '1:15 PM', window: '1:15 \u2013 1:30', capacity: 40, reserved: 6 },
]

const DATE_IDS = pickupDates.map((d) => d.id)
const SLOT_IDS = pickupSlots.map((s) => s.id)

/**
 * Builds a stockBySlot map across every date/slot combination from a compact
 * per-slot [total, reserved] pattern. Later dates are scaled down to
 * simulate lighter (less-reserved) demand further out. Pure mock data helper
 * — no real inventory logic lives here or in any component.
 */
function buildStock(pattern) {
  const stock = {}
  DATE_IDS.forEach((dateId, dIdx) => {
    const reservedScale = dIdx === 0 ? 1 : dIdx === 1 ? 0.65 : 0.4
    SLOT_IDS.forEach((slotId, sIdx) => {
      const [total, reserved] = pattern[sIdx]
      const scaledReserved = Math.min(total, Math.round(reserved * reservedScale))
      stock[`${dateId}:${slotId}`] = { total, reserved: scaledReserved }
    })
  })
  return stock
}

export const menuItems = [
  {
    id: 'm1',
    name: 'Paneer Tikka Wrap',
    category: 'Wraps',
    price: 120,
    prepTime: '8 min',
    tag: 'Bestseller',
    description: 'Char-grilled paneer, mint chutney and crunchy salad rolled in a warm tortilla.',
    temporarilyUnavailable: false,
    stockBySlot: buildStock([
      [20, 20],
      [18, 9],
      [18, 3],
      [15, 15],
      [15, 2],
    ]),
  },
  {
    id: 'm2',
    name: 'South Indian Thali',
    category: 'Meals',
    price: 150,
    prepTime: '12 min',
    tag: 'Chef pick',
    description: 'Sambar, rasam, two seasonal vegetables, curd and rice served on a steel plate.',
    temporarilyUnavailable: false,
    stockBySlot: buildStock([
      [12, 4],
      [12, 12],
      [12, 6],
      [10, 1],
      [10, 10],
    ]),
  },
  {
    id: 'm3',
    name: 'Cold Coffee + Sandwich',
    category: 'Combo',
    price: 95,
    prepTime: '5 min',
    tag: 'Quick bite',
    description: 'Iced coffee blended fresh, paired with a grilled veg & cheese sandwich.',
    temporarilyUnavailable: false,
    stockBySlot: buildStock([
      [25, 6],
      [25, 10],
      [25, 2],
      [20, 4],
      [20, 8],
    ]),
  },
  {
    id: 'm4',
    name: 'Veg Fried Rice',
    category: 'Meals',
    price: 110,
    prepTime: '10 min',
    tag: 'Popular',
    description: 'Wok-tossed rice with seasonal vegetables, spring onion and soy glaze.',
    temporarilyUnavailable: false,
    stockBySlot: buildStock([
      [15, 3],
      [15, 15],
      [15, 4],
      [12, 12],
      [12, 5],
    ]),
  },
  {
    id: 'm5',
    name: 'Masala Dosa',
    category: 'Meals',
    price: 90,
    prepTime: '10 min',
    tag: null,
    description: 'Crisp rice-and-lentil crepe filled with spiced potato masala, served with chutney.',
    temporarilyUnavailable: true,
    stockBySlot: buildStock([
      [18, 2],
      [18, 5],
      [18, 1],
      [15, 3],
      [15, 2],
    ]),
  },
  {
    id: 'm6',
    name: 'Fresh Lime Soda',
    category: 'Beverages',
    price: 45,
    prepTime: '3 min',
    tag: null,
    description: 'Sweet, salted or mixed \u2014 made fresh to order with soda and lime.',
    temporarilyUnavailable: false,
    stockBySlot: buildStock([
      [30, 5],
      [30, 8],
      [30, 3],
      [25, 6],
      [25, 4],
    ]),
  },
  {
    id: 'm7',
    name: 'Veg Puff',
    category: 'Snacks',
    price: 35,
    prepTime: '2 min',
    tag: 'Quick bite',
    description: 'Flaky puff pastry stuffed with a lightly spiced vegetable filling.',
    temporarilyUnavailable: false,
    stockBySlot: buildStock([
      [40, 10],
      [40, 38],
      [40, 12],
      [35, 5],
      [35, 35],
    ]),
  },
  {
    id: 'm8',
    name: 'Chicken Roll',
    category: 'Wraps',
    price: 135,
    prepTime: '9 min',
    tag: null,
    description: 'Spiced chicken, onions and a tangy sauce rolled in a flaky paratha.',
    temporarilyUnavailable: false,
    stockBySlot: buildStock([
      [16, 6],
      [16, 16],
      [16, 5],
      [14, 3],
      [14, 7],
    ]),
  },
]
