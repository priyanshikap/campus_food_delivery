import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, MapPin, CalendarDays, Receipt, Ticket } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { validateLiveCartAvailability, hasBlockingAvailabilityIssues } from "../utils/inventoryValidation";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const STEEL = "#5C6B66";

function formatCurrency(n) {
  return `₹${Number(n).toFixed(0)}`;
}

function SectionLabel({ n, children }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="font-mono text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
        style={{ background: INK }}
      >
        {n}
      </span>
      <h3 className="font-semibold text-sm" style={{ color: INK }}>
        {children}
      </h3>
    </div>
  );
}

function ConfirmationView({ order }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: PAPER }}>
      <div
        className="w-full max-w-md bg-white rounded-lg border shadow-sm p-6 text-center"
        style={{ borderColor: BORDER }}
      >
        <div
          className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
          style={{ background: "#EAF4EC" }}
        >
          <CheckCircle2 size={28} color={GREEN} />
        </div>
        <h2 className="text-lg font-bold mb-1" style={{ color: INK }}>
          Pre-order placed
        </h2>
        <p className="text-xs mb-5" style={{ color: STEEL }}>
          Show this order ID at the counter during pickup.
        </p>

        <div
          className="rounded-md px-4 py-3 mb-5 flex items-center justify-between"
          style={{ background: PAPER, border: `1px dashed ${BORDER}` }}
        >
          <span className="font-mono text-lg font-bold" style={{ color: INK }}>
            {order.id}
          </span>
          <span
            className="text-[10px] font-bold px-2 py-1 rounded"
            style={{ background: "#FBF1DD", color: MUSTARD }}
          >
            PENDING
          </span>
        </div>

        <div className="text-left space-y-1.5 mb-5 text-sm">
          <div className="flex justify-between" style={{ color: STEEL }}>
            <span>Pickup</span>
            <span style={{ color: INK }}>
              {order.pickupDate} · {order.pickupSlot.time} (Counter {order.pickupSlot.counter})
            </span>
          </div>
          {order.items.map((it, i) => (
            <div key={i} className="flex justify-between" style={{ color: STEEL }}>
              <span>
                {it.qty} × {it.name}
              </span>
              <span className="font-mono" style={{ color: INK }}>
                {formatCurrency(it.price * it.qty)}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t font-semibold" style={{ borderColor: BORDER, color: INK }}>
            <span>Total</span>
            <span className="font-mono">{formatCurrency(order.total)}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/orders/${order.id}`)}
          className="w-full py-3 rounded-md font-semibold text-sm text-white shadow-sm hover:opacity-90 transition-opacity"
          style={{ background: MUSTARD }}
        >
          Track Order
        </button>
      </div>
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, pickupDate, pickupSlot, clearCart } = useCart();
  const { addOrder } = useOrders();

  const [phase, setPhase] = useState("review"); // review | submitting | confirmed | blocked
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [revalidationError, setRevalidationError] = useState(null);

  const preCheckWarnings = useMemo(() => validateLiveCartAvailability(items, pickupDate, pickupSlot), [items, pickupDate, pickupSlot]);
  const hasIssuesNow = hasBlockingAvailabilityIssues(preCheckWarnings);

  if (items.length === 0 && phase !== "confirmed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-6" style={{ background: PAPER }}>
        <p className="text-sm" style={{ color: STEEL }}>
          Your cart is empty — nothing to check out yet.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="px-5 py-2.5 rounded-md font-semibold text-sm text-white"
          style={{ background: MUSTARD }}
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setPhase("submitting");
    setRevalidationError(null);
    try {
      const order = await addOrder({
        items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
        total: subtotal,
        pickupDate,
        pickupSlot,
      });
      setConfirmedOrder(order);
      clearCart();
      setPhase("confirmed");
    } catch (error) {
      setRevalidationError(error.message || "We could not place the order. Please try again.");
      setPhase("review");
    }
  };

  if (phase === "confirmed" && confirmedOrder) {
    return <ConfirmationView order={confirmedOrder} />;
  }

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-6" style={{ color: INK }}>
          Checkout
        </h1>

        <div className="space-y-4">
          {/* 1. Pickup information */}
          <div className="bg-white rounded-lg border shadow-sm p-5" style={{ borderColor: BORDER }}>
            <SectionLabel n={1}>Pickup information</SectionLabel>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2" style={{ color: STEEL }}>
                <CalendarDays size={14} />
                <span style={{ color: INK }}>{pickupDate}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: STEEL }}>
                <MapPin size={14} />
                <span style={{ color: INK }}>
                  {pickupSlot ? `${pickupSlot.time} · Counter ${pickupSlot.counter}` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* 2 & 3 & 4. Order items, quantity, price */}
          <div className="bg-white rounded-lg border shadow-sm p-5" style={{ borderColor: BORDER }}>
            <SectionLabel n={2}>Order items</SectionLabel>
            <div className="space-y-2">
              {items.map((item) => {
                const check = preCheckWarnings.find((w) => w.itemId === item.id);
                return (
                  <div key={item.id} className="flex items-center justify-between text-sm py-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg shrink-0">{item.emoji}</span>
                      <div className="min-w-0">
                        <p className="truncate" style={{ color: INK }}>
                          {item.name}
                        </p>
                        {check && check.status !== "ok" && (
                          <p className="text-[11px] flex items-center gap-1" style={{ color: RED }}>
                            <AlertTriangle size={11} /> {check.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-mono text-xs" style={{ color: STEEL }}>
                        × {item.qty}
                      </span>
                      <span className="font-mono font-semibold w-14 text-right" style={{ color: INK }}>
                        {formatCurrency(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Total */}
          <div className="bg-white rounded-lg border shadow-sm p-5" style={{ borderColor: BORDER }}>
            <SectionLabel n={3}>Total</SectionLabel>
            <div className="flex justify-between items-baseline">
              <span className="text-sm" style={{ color: STEEL }}>
                Pay at counter on pickup
              </span>
              <span className="font-mono text-2xl font-bold" style={{ color: INK }}>
                {formatCurrency(subtotal)}
              </span>
            </div>
          </div>

          {/* Revalidation notice */}
          <div className="rounded-md px-4 py-3 flex gap-2 text-xs" style={{ background: "#FBF1DD", color: "#8A5A00" }}>
            <Ticket size={14} className="shrink-0 mt-0.5" />
            <span>Availability is locked in only once you place the pre-order — stock will be re-checked at submit time.</span>
          </div>

          {revalidationError && (
            <div className="rounded-md px-4 py-3 flex gap-2 text-xs" style={{ background: "#FBEAE6", color: RED }}>
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <span>{revalidationError}</span>
            </div>
          )}

          {/* 6 & 7. Place pre-order */}
          <button
            disabled={!pickupSlot || hasIssuesNow || phase === "submitting"}
            onClick={() => navigate("/payment")}
            className="w-full py-3.5 rounded-md font-semibold text-sm text-white shadow-sm transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: MUSTARD }}
          >
            <Receipt size={16} />
            Continue to payment
          </button>
        </div>
      </div>
    </div>
  );
}
