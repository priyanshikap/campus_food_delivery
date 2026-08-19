// Deterministic mock analytics data. No Math.random — a fixed wave pattern
// keeps numbers the same on every render and internally consistent across
// the KPI cards and charts (e.g. daily orders roughly sum to the KPI total).

function round(n) {
  return Math.round(n);
}

/** Generates a realistic-looking daily orders/revenue series with a weekly rhythm. */
function generateDailySeries(days, { baseOrders, amplitude, avgOrderValue }) {
  const series = [];
  const today = new Date("2026-08-19");
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay(); // 0 = Sunday
    const weekendDip = dayOfWeek === 0 || dayOfWeek === 6 ? 0.6 : 1;
    const wave = Math.sin((days - i) * 0.9) * amplitude;
    const orders = Math.max(4, round((baseOrders + wave) * weekendDip));
    series.push({
      label: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      orders,
      revenue: round(orders * avgOrderValue),
    });
  }
  return series;
}

/** Generates an hourly series for the "Today" view. */
function generateHourlySeries() {
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const shape = [4, 9, 14, 22, 26, 18, 12, 15, 9, 3]; // lunch + evening peaks
  return hours.map((h, i) => ({
    label: `${h > 12 ? h - 12 : h}${h >= 12 ? "pm" : "am"}`,
    orders: shape[i],
    revenue: round(shape[i] * 142),
  }));
}

const AVG_ORDER_VALUE = 142;

const TODAY_SERIES = generateHourlySeries();
const WEEK_SERIES = generateDailySeries(7, { baseOrders: 118, amplitude: 20, avgOrderValue: AVG_ORDER_VALUE });
const MONTH_SERIES = generateDailySeries(30, { baseOrders: 116, amplitude: 18, avgOrderValue: AVG_ORDER_VALUE });

function sumOrders(series) {
  return series.reduce((s, p) => s + p.orders, 0);
}
function sumRevenue(series) {
  return series.reduce((s, p) => s + p.revenue, 0);
}

const POPULAR_ITEMS_BASE = [
  { name: "Paneer Tikka Wrap", share: 0.22 },
  { name: "Masala Dosa", share: 0.18 },
  { name: "Cold Coffee", share: 0.16 },
  { name: "Samosa", share: 0.14 },
  { name: "Veg Sandwich", share: 0.12 },
];

const SLOT_DEMAND_BASE = [
  { slot: "12:30 PM", share: 0.26 },
  { slot: "1:00 PM", share: 0.22 },
  { slot: "1:30 PM", share: 0.2 },
  { slot: "2:00 PM", share: 0.18 },
  { slot: "2:30 PM", share: 0.14 },
];

const INVENTORY_UTILIZATION = [
  { category: "Wraps", utilization: 78 },
  { category: "South Indian", utilization: 54 },
  { category: "Beverages", utilization: 86 },
  { category: "Snacks", utilization: 61 },
  { category: "Sandwiches", utilization: 40 },
];

function buildRange(series, { completionRate, cancellationRate, avgPrepTime }) {
  const totalOrders = sumOrders(series);
  const revenue = sumRevenue(series);
  return {
    ordersOverTime: series,
    kpis: {
      totalOrders,
      revenue,
      completionRate,
      cancellationRate,
      avgPrepTime,
    },
    popularItems: POPULAR_ITEMS_BASE.map((it) => ({ name: it.name, orders: round(totalOrders * it.share) })),
    slotDemand: SLOT_DEMAND_BASE.map((s) => ({ slot: s.slot, orders: round(totalOrders * s.share) })),
    inventoryUtilization: INVENTORY_UTILIZATION,
  };
}

export const ANALYTICS_BY_RANGE = {
  TODAY: buildRange(TODAY_SERIES, { completionRate: 82, cancellationRate: 6, avgPrepTime: 9.4 }),
  "7D": buildRange(WEEK_SERIES, { completionRate: 85, cancellationRate: 5, avgPrepTime: 8.7 }),
  "30D": buildRange(MONTH_SERIES, { completionRate: 87, cancellationRate: 4.5, avgPrepTime: 8.2 }),
};
