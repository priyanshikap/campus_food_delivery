// Mock menu catalog for the ManageMenu page. Swap for menuService calls
// later — deriveMenuStatus() and validators keep working on the same shape.

export const MENU_CATEGORIES = ["Wraps", "Beverages", "Snacks", "South Indian", "Sandwiches"];

export const MOCK_MENU_ITEMS = [
  { id: "item-paneer-wrap", name: "Paneer Tikka Wrap", category: "Wraps", price: 120, description: "Grilled paneer, onions & mint chutney in a soft wrap.", emoji: "🌯", available: true },
  { id: "item-cold-coffee", name: "Cold Coffee", category: "Beverages", price: 60, description: "Chilled coffee blended with milk & ice.", emoji: "🥤", available: true },
  { id: "item-veg-puff", name: "Veg Puff", category: "Snacks", price: 35, description: "Flaky pastry with a spiced vegetable filling.", emoji: "🥐", available: false },
  { id: "item-masala-dosa", name: "Masala Dosa", category: "South Indian", price: 90, description: "Crisp rice crepe with spiced potato filling, served with chutney & sambar.", emoji: "🥞", available: true },
  { id: "item-samosa", name: "Samosa", category: "Snacks", price: 20, description: "Deep-fried pastry with a savoury potato-pea filling.", emoji: "🥟", available: true },
  { id: "item-veg-sandwich", name: "Veg Sandwich", category: "Sandwiches", price: 55, description: "Grilled sandwich with mixed vegetables & chutney.", emoji: "🥪", available: true },
  { id: "item-lemon-tea", name: "Lemon Iced Tea", category: "Beverages", price: 45, description: "Refreshing iced tea with a hint of lemon.", emoji: "🧊", available: true },
];
