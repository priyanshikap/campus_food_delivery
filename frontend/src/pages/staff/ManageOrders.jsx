import { Search } from "lucide-react";
import { useOrderHistory } from "../../hooks/useOrderHistory";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const STEEL = "#5C6B66";
const TEAL = "#2A6F77";

const STATUS_STYLES = {
  PENDING: { bg: "#FBF1DD", color: MUSTARD },
  CONFIRMED: { bg: "#E7EEF0", color: TEAL },
  PREPARING: { bg: "#FDEFE3", color: "#B25E1F" },
  READY: { bg: "#EAF4EC", color: GREEN },
  COLLECTED: { bg: "#EFEFEF", color: STEEL },
  REJECTED: { bg: "#FBEAE6", color: RED },
  CANCELLED: { bg: "#FBEAE6", color: RED },
};

const STATUS_FILTERS = ["ALL", "PENDING", "CONFIRMED", "PREPARING", "READY", "COLLECTED", "REJECTED", "CANCELLED"];

function formatDateTime(iso) {
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "numeric", minute: "2-digit" });
}
function formatCurrency(n) {
  return `₹${n}`;
}

export default function ManageOrders() {
  const { orders, dates, search, setSearch, statusFilter, setStatusFilter, dateFilter, setDateFilter, summary } =
    useOrderHistory();

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: INK }}>
          Order History
        </h1>
        <p className="text-sm mb-6" style={{ color: STEEL }}>
          {summary.count} orders · {formatCurrency(summary.totalRevenue)} collected revenue in view
        </p>

        <div className="flex flex-col lg:flex-row gap-3 mb-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" color={STEEL} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order ID, customer, or item…"
              className="w-full pl-9 pr-3 py-2.5 rounded-md border text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: BORDER, color: INK, "--tw-ring-color": MUSTARD }}
            />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-md border px-3 py-2.5 text-sm bg-white"
            style={{ borderColor: BORDER, color: INK }}
          >
            <option value="ALL">All dates</option>
            {dates.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-1.5 overflow-x-auto mb-5">
          {STATUS_FILTERS.map((f) => {
            const active = statusFilter === f;
            return (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className="px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors"
                style={{
                  background: active ? MUSTARD : "#FFFFFF",
                  color: active ? "#FFFFFF" : STEEL,
                  border: `1px solid ${active ? MUSTARD : BORDER}`,
                }}
              >
                {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>

        {/* Table — desktop */}
        <div className="hidden md:block bg-white rounded-lg border shadow-sm overflow-hidden" style={{ borderColor: BORDER }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: PAPER }}>
                {["Order ID", "Customer", "Items", "Pickup", "Placed", "Total", "Status"].map((h) => (
                  <th key={h} className="text-left font-semibold text-[11px] uppercase tracking-wide px-4 py-3" style={{ color: STEEL }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const style = STATUS_STYLES[order.status];
                return (
                  <tr key={order.id} style={{ borderTop: `1px solid ${BORDER}` }}>
                    <td className="px-4 py-3 font-mono font-semibold" style={{ color: INK }}>
                      {order.id}
                    </td>
                    <td className="px-4 py-3" style={{ color: INK }}>
                      {order.customer}
                    </td>
                    <td className="px-4 py-3" style={{ color: STEEL }}>
                      {order.items.map((it) => `${it.qty}× ${it.name}`).join(", ")}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: STEEL }}>
                      {order.pickupSlot.time} · {order.pickupSlot.counter}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs whitespace-nowrap" style={{ color: STEEL }}>
                      {formatDateTime(order.placedAt)}
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: INK }}>
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap"
                        style={{ background: style.bg, color: style.color }}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center text-sm py-8" style={{ color: STEEL }}>
              No orders match your search or filters.
            </p>
          )}
        </div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-3">
          {orders.map((order) => {
            const style = STATUS_STYLES[order.status];
            return (
              <div key={order.id} className="bg-white rounded-lg border shadow-sm p-4" style={{ borderColor: BORDER }}>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-sm font-bold" style={{ color: INK }}>
                    {order.id}
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs mb-2" style={{ color: STEEL }}>
                  {order.customer} · {formatDateTime(order.placedAt)}
                </p>
                <p className="text-xs mb-2" style={{ color: INK }}>
                  {order.items.map((it) => `${it.qty}× ${it.name}`).join(", ")}
                </p>
                <div className="flex justify-between text-xs" style={{ color: STEEL }}>
                  <span>
                    {order.pickupSlot.time} · {order.pickupSlot.counter}
                  </span>
                  <span className="font-mono font-semibold" style={{ color: INK }}>
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            );
          })}
          {orders.length === 0 && (
            <p className="text-center text-sm py-8" style={{ color: STEEL }}>
              No orders match your search or filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
