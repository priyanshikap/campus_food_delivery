import { Plus } from "lucide-react";
import { useCart } from "../hooks/useCart";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const RED = "#C1442D";
const STEEL = "#5C6B66";

export default function FoodCard({ item }) {
  const { addItem } = useCart();
  const soldOut = item.available === false;

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col" style={{ borderColor: BORDER }}>
      <div
        className="w-full h-24 rounded-md flex items-center justify-center text-4xl mb-3"
        style={{ background: PAPER, border: `1px solid ${BORDER}` }}
      >
        {item.emoji}
      </div>

      <p className="font-semibold text-sm mb-0.5" style={{ color: INK }}>
        {item.name}
      </p>
      <p className="text-xs mb-2 flex-1" style={{ color: STEEL }}>
        {item.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="font-mono text-sm font-bold" style={{ color: INK }}>
          ₹{item.price}
        </span>
        <button
          disabled={soldOut}
          onClick={() => addItem({ id: item.id, name: item.name, price: item.price, emoji: item.emoji, category: item.category })}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md text-white disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: soldOut ? STEEL : MUSTARD }}
        >
          <Plus size={12} /> {soldOut ? "Sold out" : "Add"}
        </button>
      </div>
    </div>
  );
}
