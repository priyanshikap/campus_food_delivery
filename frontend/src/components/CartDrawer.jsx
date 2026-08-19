import { Link } from "react-router-dom";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/useCart";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const STEEL = "#5C6B66";

function formatCurrency(n) {
  return `₹${Number(n).toFixed(0)}`;
}

export default function CartDrawer({ isOpen, onClose }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-sm h-full bg-white flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: BORDER }}>
          <h3 className="font-semibold text-sm" style={{ color: INK }}>
            Your Cart
          </h3>
          <button onClick={onClose} aria-label="Close cart">
            <X size={18} color={STEEL} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-2">
              <ShoppingBag size={28} color={STEEL} />
              <p className="text-sm" style={{ color: STEEL }}>
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 shrink-0 rounded-md flex items-center justify-center text-lg"
                    style={{ background: PAPER, border: `1px solid ${BORDER}` }}
                  >
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: INK }}>
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="w-5 h-5 rounded border text-xs flex items-center justify-center"
                        style={{ borderColor: BORDER, color: INK }}
                      >
                        −
                      </button>
                      <span className="text-xs font-mono" style={{ color: INK }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="w-5 h-5 rounded border text-xs flex items-center justify-center"
                        style={{ borderColor: BORDER, color: INK }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold" style={{ color: INK }}>
                    {formatCurrency(item.price * item.qty)}
                  </span>
                  <button onClick={() => removeItem(item.id)} className="text-[10px]" style={{ color: STEEL }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t" style={{ borderColor: BORDER }}>
            <div className="flex justify-between mb-3 text-sm">
              <span style={{ color: STEEL }}>Subtotal</span>
              <span className="font-mono font-semibold" style={{ color: INK }}>
                {formatCurrency(subtotal)}
              </span>
            </div>
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full text-center py-2.5 rounded-md text-sm font-semibold text-white"
              style={{ background: MUSTARD }}
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
