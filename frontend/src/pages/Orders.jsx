import { Link } from "react-router-dom";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useOrders } from "../context/OrderContext";
import { formatDateTime } from "../utils/formatDate";

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
  CANCELLED: { bg: "#FBEAE6", color: RED },
};

export default function Orders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <ShoppingBag size={30} color={STEEL} className="mb-3" />
        <p className="text-sm" style={{ color: STEEL }}>
          No orders yet — place one from the menu.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-6" style={{ color: INK }}>
          My Orders
        </h1>

        <div className="space-y-3">
          {orders.map((order) => {
            const style = STATUS_STYLES[order.status] ?? STATUS_STYLES.PENDING;
            const placedAt = order.history?.[0]?.at;
            return (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="bg-white rounded-lg border shadow-sm p-4 flex items-center justify-between hover:-translate-y-0.5 transition-transform"
                style={{ borderColor: BORDER }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-sm font-bold" style={{ color: INK }}>
                      {order.id}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: STEEL }}>
                    {order.items.map((it) => `${it.qty}× ${it.name}`).join(", ")}
                  </p>
                  {placedAt && (
                    <p className="text-[11px] mt-0.5" style={{ color: STEEL }}>
                      Placed {formatDateTime(placedAt)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-sm font-semibold" style={{ color: INK }}>
                    ₹{order.total}
                  </span>
                  <ChevronRight size={16} color={STEEL} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
