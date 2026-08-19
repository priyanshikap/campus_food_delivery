import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, AlertTriangle, MapPin, CalendarDays } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getPickupSlots } from "../services/menuService";
import { validateLiveCartAvailability, hasBlockingAvailabilityIssues, isSlotFull } from "../utils/inventoryValidation";

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

/** Dashed "ticket stub" divider with punched-circle notches at both ends. */
function Perforation() {
  return (
    <div className="relative my-4">
      <div className="border-t-2 border-dashed" style={{ borderColor: BORDER }} />
      <span
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
        style={{ background: PAPER, border: `2px solid ${BORDER}` }}
      />
      <span
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
        style={{ background: PAPER, border: `2px solid ${BORDER}` }}
      />
    </div>
  );
}

function QuantityStepper({ qty, onChange }) {
  return (
    <div className="inline-flex items-center rounded-md border" style={{ borderColor: BORDER }}>
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label="Decrease quantity"
        className="w-8 h-8 flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors rounded-l-md"
      >
        <Minus size={14} color={INK} />
      </button>
      <span className="w-8 text-center font-mono text-sm font-semibold" style={{ color: INK }}>
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors rounded-r-md"
      >
        <Plus size={14} color={INK} />
      </button>
    </div>
  );
}

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
        style={{ background: "#FFFFFF", border: `2px dashed ${BORDER}` }}
      >
        <ShoppingBag size={30} color={STEEL} />
      </div>
      <h2 className="text-xl font-bold mb-1" style={{ color: INK }}>
        Your tray is empty
      </h2>
      <p className="text-sm mb-6 max-w-xs" style={{ color: STEEL }}>
        Nothing queued up for pickup yet. Browse the menu and add something to get started.
      </p>
      <button
        onClick={() => navigate("/menu")}
        className="px-5 py-2.5 rounded-md font-semibold text-sm text-white shadow-sm hover:opacity-90 transition-opacity"
        style={{ background: MUSTARD }}
      >
        Browse Menu
      </button>
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, subtotal, pickupDate, setPickupDate, pickupSlot, setPickupSlot } =
    useCart();
  const [pickupSlots, setPickupSlots] = useState([]);

  useEffect(() => {
    getPickupSlots().then(setPickupSlots).catch(() => setPickupSlots([]));
  }, []);

  const availability = useMemo(() => validateLiveCartAvailability(items, pickupDate, pickupSlot), [items, pickupDate, pickupSlot]);
  const blocked = hasBlockingAvailabilityIssues(availability);
  const warnings = availability.filter((a) => a.status !== "ok");
  const slotFull = isSlotFull(pickupSlot);

  const canCheckout = items.length > 0 && !!pickupSlot && !blocked && !slotFull;

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>
            Your Cart
          </h1>
          <span className="font-mono text-sm" style={{ color: STEEL }}>
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* ── Left column: items + pickup selection ── */}
          <div className="space-y-6">
            {/* Item list, ticket-stub card */}
            <div className="bg-white rounded-lg border shadow-sm p-5" style={{ borderColor: BORDER }}>
              {items.map((item, idx) => {
                const check = availability.find((a) => a.itemId === item.id);
                return (
                  <div key={item.id}>
                    {idx > 0 && <Perforation />}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 shrink-0 rounded-md flex items-center justify-center text-2xl"
                        style={{ background: PAPER, border: `1px solid ${BORDER}` }}
                      >
                        {item.emoji}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate" style={{ color: INK }}>
                          {item.name}
                        </p>
                        <p className="text-xs" style={{ color: STEEL }}>
                          {formatCurrency(item.price)} each · {item.category}
                        </p>
                        {check && check.status !== "ok" && (
                          <p className="text-xs font-medium mt-1 flex items-center gap-1" style={{ color: RED }}>
                            <AlertTriangle size={12} /> {check.message}
                          </p>
                        )}
                      </div>

                      <QuantityStepper qty={item.qty} onChange={(q) => updateQuantity(item.id, q)} />

                      <p className="w-16 text-right font-mono text-sm font-semibold shrink-0" style={{ color: INK }}>
                        {formatCurrency(item.price * item.qty)}
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="p-2 rounded-md hover:bg-red-50 transition-colors shrink-0"
                      >
                        <Trash2 size={16} color={RED} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pickup date */}
            <div className="bg-white rounded-lg border shadow-sm p-5" style={{ borderColor: BORDER }}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={16} color={STEEL} />
                <h3 className="font-semibold text-sm" style={{ color: INK }}>
                  Pickup date
                </h3>
              </div>
              <input
                type="date"
                value={pickupDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full sm:w-56 rounded-md border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2"
                style={{ borderColor: BORDER, color: INK, "--tw-ring-color": MUSTARD }}
              />
            </div>

            {/* Pickup slot */}
            <div className="bg-white rounded-lg border shadow-sm p-5" style={{ borderColor: BORDER }}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} color={STEEL} />
                <h3 className="font-semibold text-sm" style={{ color: INK }}>
                  Pickup slot
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {pickupSlots.map((slot) => {
                  const full = isSlotFull(slot);
                  const selected = pickupSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={full}
                      onClick={() => setPickupSlot(slot)}
                      className="flex items-center justify-between rounded-md border px-3 py-2.5 text-left transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        borderColor: selected ? MUSTARD : BORDER,
                        background: selected ? "#FBF1DD" : "#FFFFFF",
                        boxShadow: selected ? `0 0 0 1px ${MUSTARD}` : "none",
                      }}
                    >
                      <div>
                        <p className="font-mono text-sm font-semibold" style={{ color: INK }}>
                          {slot.time}
                        </p>
                        <p className="text-[11px]" style={{ color: STEEL }}>
                          Counter {slot.counter}
                        </p>
                      </div>
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          color: full ? RED : GREEN,
                          background: full ? "#FBEAE6" : "#EAF4EC",
                        }}
                      >
                        {full ? "FULL" : `${slot.capacity - slot.ordersPlaced} left`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right column: summary ── */}
          <div className="lg:sticky lg:top-6 h-fit space-y-4">
            <div className="bg-white rounded-lg border shadow-sm p-5" style={{ borderColor: BORDER }}>
              <h3 className="font-semibold text-sm mb-4" style={{ color: INK }}>
                Order summary
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between" style={{ color: STEEL }}>
                  <span>Subtotal</span>
                  <span className="font-mono" style={{ color: INK }}>
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: STEEL }}>
                  <span>Pickup</span>
                  <span>{pickupSlot ? `${pickupSlot.time} · Counter ${pickupSlot.counter}` : "Not selected"}</span>
                </div>
              </div>

              <Perforation />

              <div className="flex justify-between items-baseline mb-4">
                <span className="font-semibold text-sm" style={{ color: INK }}>
                  Total
                </span>
                <span className="font-mono text-xl font-bold" style={{ color: INK }}>
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {(warnings.length > 0 || slotFull) && (
                <div
                  className="rounded-md px-3 py-2.5 mb-4 text-xs flex gap-2"
                  style={{ background: "#FBEAE6", color: RED }}
                >
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <span>
                    {slotFull
                      ? "Your selected slot just filled up — pick another time."
                      : "Some items in your cart have limited or no stock left. Adjust quantities to continue."}
                  </span>
                </div>
              )}

              {!pickupSlot && (
                <p className="text-xs mb-4" style={{ color: STEEL }}>
                  Select a pickup slot to enable checkout.
                </p>
              )}

              <button
                disabled={!canCheckout}
                onClick={() => navigate("/checkout")}
                className="w-full py-3 rounded-md font-semibold text-sm text-white shadow-sm transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                style={{ background: MUSTARD }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
