import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Clock,
  CircleCheck,
  ChefHat,
  PackageCheck,
  CheckCheck,
  XCircle,
  MapPin,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import { useOrders } from "../context/OrderContext";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const STEEL = "#5C6B66";

const STAGES = [
  { key: "PENDING", label: "Pending", icon: Clock },
  { key: "CONFIRMED", label: "Confirmed", icon: CircleCheck },
  { key: "PREPARING", label: "Preparing", icon: ChefHat },
  { key: "READY", label: "Ready", icon: PackageCheck },
  { key: "COLLECTED", label: "Collected", icon: CheckCheck },
];

// Cancellation is only offered up through CONFIRMED — once the kitchen
// starts on the order (PREPARING) it can no longer be pulled back.
const CANCELLABLE_UP_TO_INDEX = 1;

function formatCurrency(n) {
  return `₹${n.toFixed(0)}`;
}

function formatTime(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  });
}

function Timeline({ order }) {
  const currentIndex = STAGES.findIndex((s) => s.key === order.status);
  const historyMap = Object.fromEntries(order.history.map((h) => [h.status, h.at]));

  return (
    <div className="flex flex-col sm:flex-row gap-0">
      {STAGES.map((stage, i) => {
        const Icon = stage.icon;
        const reached = i <= currentIndex;
        const isCurrent = i === currentIndex;
        const at = historyMap[stage.key];

        return (
          <div key={stage.key} className="flex sm:flex-col flex-1 items-start sm:items-center relative">
            {/* connector */}
            {i > 0 && (
              <>
                {/* vertical connector (mobile) */}
                <div
                  className="sm:hidden absolute left-[19px] -top-4 w-0.5 h-4"
                  style={{ background: reached ? GREEN : BORDER }}
                />
                {/* horizontal connector (desktop) */}
                <div
                  className="hidden sm:block absolute top-5 right-1/2 w-full h-0.5"
                  style={{ background: reached ? GREEN : BORDER, zIndex: 0 }}
                />
              </>
            )}

            <div className="flex sm:flex-col items-center gap-3 sm:gap-2 relative z-10 pb-6 sm:pb-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{
                  background: reached ? GREEN : "#FFFFFF",
                  border: `2px solid ${reached ? GREEN : BORDER}`,
                  boxShadow: isCurrent ? `0 0 0 4px #EAF4EC` : "none",
                }}
              >
                <Icon size={18} color={reached ? "#FFFFFF" : STEEL} />
              </div>
              <div className="sm:text-center">
                <p
                  className="text-xs font-semibold"
                  style={{ color: reached ? INK : STEEL }}
                >
                  {stage.label}
                  {isCurrent && (
                    <span
                      className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full align-middle animate-pulse"
                      style={{ background: MUSTARD }}
                    />
                  )}
                </p>
                {at && (
                  <p className="text-[10px] font-mono" style={{ color: STEEL }}>
                    {formatTime(at)}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CancelledBanner({ at, rejected = false }) {
  return (
    <div className="flex items-center gap-3 rounded-md p-4" style={{ background: "#FBEAE6" }}>
      <XCircle size={22} color={RED} />
      <div>
        <p className="text-sm font-semibold" style={{ color: RED }}>
          {rejected ? "Order rejected" : "Order cancelled"}
        </p>
        {at && (
          <p className="text-xs font-mono" style={{ color: STEEL }}>
            {formatTime(at)}
          </p>
        )}
      </div>
    </div>
  );
}

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, cancelOrder } = useOrders();
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const [now, setNow] = useState(Date.now());

  const order = orders.find((o) => o.id === orderId) ?? orders[0];

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAPER }}>
        <p style={{ color: STEEL }}>Order not found.</p>
      </div>
    );
  }

  const currentIndex = STAGES.findIndex((s) => s.key === order.status);
  const isCancelled = order.status === "CANCELLED";
  const isRejected = order.status === "REJECTED";
  const secondsRemaining = order.confirmedAt ? Math.max(0, 30 - Math.floor((now - new Date(order.confirmedAt).getTime()) / 1000)) : 0;
  const canCancel = !isCancelled && order.status === "CONFIRMED" && secondsRemaining > 0;
  const cancelledAt = order.history.find((h) => h.status === "CANCELLED")?.at;

  useEffect(() => {
    if (order.status !== "CONFIRMED" || !order.confirmedAt) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [order.status, order.confirmedAt]);

  const explanation = isCancelled || isRejected
    ? null
    : order.status === "COLLECTED"
    ? "This order has already been collected and is complete — it can't be cancelled or collected again."
    : order.status === "READY"
    ? "This order is ready at the counter and can no longer be cancelled."
    : order.status === "PREPARING"
    ? "The kitchen has already started on this order, so it can no longer be cancelled."
    : null;

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-medium mb-6 hover:underline"
          style={{ color: STEEL }}
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Ticket header */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-6" style={{ borderColor: BORDER }}>
          <div className="p-6 flex items-start justify-between" style={{ borderBottom: `2px dashed ${BORDER}` }}>
            <div>
              <p className="text-[11px] uppercase tracking-wide font-semibold mb-1" style={{ color: STEEL }}>
                Order
              </p>
              <p className="font-mono text-2xl font-bold" style={{ color: INK }}>
                {order.id}
              </p>
            </div>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                background: isCancelled ? "#FBEAE6" : currentIndex === STAGES.length - 1 ? "#EAF4EC" : "#FBF1DD",
                color: isCancelled ? RED : currentIndex === STAGES.length - 1 ? GREEN : MUSTARD,
              }}
            >
              {order.status}
            </span>
          </div>

          <div className="p-6 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} color={STEEL} />
              <span style={{ color: INK }}>{order.pickupDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} color={STEEL} />
              <span style={{ color: INK }}>
                {order.pickupSlot.time} · Counter {order.pickupSlot.counter}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline / cancelled state */}
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-6" style={{ borderColor: BORDER }}>
          <h3 className="font-semibold text-sm mb-6" style={{ color: INK }}>
            Order progress
          </h3>
          {isCancelled || isRejected ? <CancelledBanner at={cancelledAt} rejected={isRejected} /> : <Timeline order={order} />}
        </div>

        {/* Items */}
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-6" style={{ borderColor: BORDER }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: INK }}>
            Items
          </h3>
          <div className="space-y-2 mb-4">
            {order.items.map((it, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span style={{ color: INK }}>
                  {it.qty} × {it.name}
                </span>
                <span className="font-mono" style={{ color: STEEL }}>
                  {formatCurrency(it.price * it.qty)}
                </span>
              </div>
            ))}
          </div>
          <div
            className="flex justify-between pt-3 font-semibold text-sm"
            style={{ borderTop: `2px dashed ${BORDER}`, color: INK }}
          >
            <span>Total</span>
            <span className="font-mono">{formatCurrency(order.total)}</span>
          </div>
        </div>

        {/* Cancellation */}
        {!isCancelled && !isRejected && (
          <div className="bg-white rounded-lg border shadow-sm p-6" style={{ borderColor: BORDER }}>
            {canCancel ? (
              !confirmingCancel ? (
                <button
                  onClick={() => setConfirmingCancel(true)}
                  className="w-full py-3 rounded-md font-semibold text-sm border-2 transition-colors hover:bg-red-50"
                  style={{ borderColor: RED, color: RED }}
                >
                  Cancel Order ({secondsRemaining}s)
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm" style={{ color: INK }}>
                    Cancel this order? This can't be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setConfirmingCancel(false)}
                      className="flex-1 py-2.5 rounded-md font-semibold text-sm border"
                      style={{ borderColor: BORDER, color: STEEL }}
                    >
                      Keep order
                    </button>
                    <button
                      onClick={() => {
                        cancelOrder(order.id);
                        setConfirmingCancel(false);
                      }}
                      className="flex-1 py-2.5 rounded-md font-semibold text-sm text-white"
                      style={{ background: RED }}
                    >
                      Yes, cancel
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div>
                <button
                  disabled
                  className="w-full py-3 rounded-md font-semibold text-sm border-2 opacity-40 cursor-not-allowed mb-2"
                  style={{ borderColor: RED, color: RED }}
                >
                  Cancel Order
                </button>
                <p className="text-xs text-center" style={{ color: STEEL }}>
                  {order.status === "PENDING" ? "Cancellation is available for 30 seconds after staff confirmation." : explanation || "The 30-second cancellation window has expired."}
                </p>
              </div>
            )}
          </div>
        )}

        <p className="text-center text-xs mt-6">
          <Link to="/orders" className="hover:underline" style={{ color: STEEL }}>
            View all orders
          </Link>
        </p>
      </div>
    </div>
  );
}
