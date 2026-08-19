import { useState } from "react";
import { ArrowLeft, CreditCard, LockKeyhole, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const RED = "#C1442D";
const STEEL = "#5C6B66";

function formatCurrency(value) {
  return `₹${Number(value).toFixed(0)}`;
}

export default function Payment() {
  const navigate = useNavigate();
  const { items, subtotal, pickupDate, pickupSlot, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [method, setMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-6" style={{ background: PAPER }}>
        <p className="text-sm" style={{ color: STEEL }}>Your cart is empty.</p>
        <button onClick={() => navigate("/menu")} className="rounded-md px-5 py-2.5 text-sm font-semibold text-white" style={{ background: MUSTARD }}>
          Browse menu
        </button>
      </div>
    );
  }

  const handlePayment = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setError("");
    if (!pickupSlot) {
      setError("Choose a pickup slot before paying.");
      navigate("/cart");
      return;
    }
    if (method === "card" && (!cardNumber || !name || !expiry || !cvv)) {
      setError("Complete all card details to continue.");
      return;
    }

    try {
      setIsSubmitting(true);
      const order = await addOrder({
        items: items.map(({ id, name: itemName, qty, price, emoji }) => ({ id, name: itemName, qty, price: Number(price), emoji })),
        total: subtotal,
        pickupDate,
        pickupSlot,
        payment: { status: "PAID", method: method === "card" ? "Card" : "Campus wallet" },
      });
      clearCart();
      navigate(`/orders/${order.id}`);
    } catch (paymentError) {
      setError(paymentError.message || "Payment could not be completed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <button onClick={() => navigate("/checkout")} className="mb-6 flex items-center gap-1.5 text-xs font-medium hover:underline" style={{ color: STEEL }}>
          <ArrowLeft size={14} /> Back to checkout
        </button>
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <form onSubmit={handlePayment} className="rounded-lg border bg-white p-6 shadow-sm" style={{ borderColor: BORDER }}>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "#FBF1DD", color: MUSTARD }}>
                <LockKeyhole size={18} />
              </span>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: INK }}>Payment</h1>
                <p className="text-xs" style={{ color: STEEL }}>Securely confirm your CampusBite order.</p>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-2">
              {[{ id: "card", label: "Card", icon: CreditCard }, { id: "wallet", label: "Campus wallet", icon: Wallet }].map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" onClick={() => setMethod(id)} className="flex items-center justify-center gap-2 rounded-md border px-3 py-3 text-sm font-semibold" style={{ borderColor: method === id ? MUSTARD : BORDER, background: method === id ? "#FBF1DD" : "#FFFFFF", color: INK }}>
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div className="space-y-3">
                <input required value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="Card number" inputMode="numeric" className="w-full rounded-md border px-3 py-2.5 text-sm" style={{ borderColor: BORDER }} />
                <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Name on card" className="w-full rounded-md border px-3 py-2.5 text-sm" style={{ borderColor: BORDER }} />
                <div className="grid grid-cols-2 gap-3">
                  <input required value={expiry} onChange={(event) => setExpiry(event.target.value)} placeholder="MM / YY" className="rounded-md border px-3 py-2.5 text-sm" style={{ borderColor: BORDER }} />
                  <input required value={cvv} onChange={(event) => setCvv(event.target.value)} placeholder="CVV" inputMode="numeric" className="rounded-md border px-3 py-2.5 text-sm" style={{ borderColor: BORDER }} />
                </div>
              </div>
            )}
            {method === "wallet" && <p className="rounded-md px-3 py-3 text-sm" style={{ background: "#EAF4EC", color: STEEL }}>Campus wallet balance will be checked at confirmation.</p>}
            {error && <p className="mt-4 rounded-md px-3 py-2 text-xs" style={{ background: "#FBEAE6", color: RED }}>{error}</p>}
            <button disabled={isSubmitting} type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60" style={{ background: MUSTARD }}>
              {isSubmitting ? "Processing..." : `Pay ${formatCurrency(subtotal)}`}
            </button>
          </form>

          <aside className="h-fit rounded-lg border bg-white p-5 shadow-sm" style={{ borderColor: BORDER }}>
            <h2 className="mb-4 font-semibold" style={{ color: INK }}>Order summary</h2>
            <div className="space-y-2 text-sm" style={{ color: STEEL }}>
              {items.map((item) => <div key={item.id} className="flex justify-between gap-3"><span>{item.qty} × {item.name}</span><span>{formatCurrency(item.price * item.qty)}</span></div>)}
            </div>
            <div className="mt-4 flex justify-between border-t pt-4 font-semibold" style={{ borderColor: BORDER, color: INK }}><span>Total</span><span>{formatCurrency(subtotal)}</span></div>
            <p className="mt-4 text-xs" style={{ color: STEEL }}>Pickup: {pickupDate}<br />{pickupSlot?.time ?? "Choose a slot"} · Counter {pickupSlot?.counter ?? "—"}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
