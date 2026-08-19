import { Pencil, Trash2 } from "lucide-react";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const STEEL = "#5C6B66";

export default function MenuItemRow({ item, onEdit, onDelete, onToggleAvailability }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 flex items-center gap-4" style={{ borderColor: BORDER }}>
      <div
        className="w-12 h-12 shrink-0 rounded-md flex items-center justify-center text-2xl"
        style={{ background: PAPER, border: `1px solid ${BORDER}` }}
      >
        {item.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm truncate" style={{ color: INK }}>
            {item.name}
          </p>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
            style={{ background: item.available ? "#EAF4EC" : "#FBEAE6", color: item.available ? GREEN : RED }}
          >
            {item.available ? "LISTED" : "HIDDEN"}
          </span>
        </div>
        <p className="text-xs truncate" style={{ color: STEEL }}>
          {item.category} · ₹{item.price}
        </p>
      </div>

      <button
        onClick={() => onToggleAvailability(item.id)}
        className="text-xs font-semibold px-3 py-2 rounded-md border shrink-0"
        style={{ borderColor: BORDER, color: item.available ? RED : GREEN }}
      >
        {item.available ? "Hide" : "List"}
      </button>
      <button onClick={() => onEdit(item)} aria-label={`Edit ${item.name}`} className="p-2 rounded-md hover:bg-black/5 shrink-0">
        <Pencil size={15} color={STEEL} />
      </button>
      <button onClick={() => onDelete(item.id)} aria-label={`Delete ${item.name}`} className="p-2 rounded-md hover:bg-red-50 shrink-0">
        <Trash2 size={15} color={RED} />
      </button>
    </div>
  );
}
