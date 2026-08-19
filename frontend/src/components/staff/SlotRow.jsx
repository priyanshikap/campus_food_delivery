import { Pencil, Trash2 } from "lucide-react";
import { canDeleteSlot } from "../../utils/slotValidators";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const STEEL = "#5C6B66";

export default function SlotRow({ slot, onEdit, onDelete, onToggleActive }) {
  const pct = Math.min(100, Math.round((slot.ordersPlaced / slot.capacity) * 100));
  const deletable = canDeleteSlot(slot);

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4" style={{ borderColor: BORDER }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <p className="font-mono text-sm font-bold" style={{ color: INK }}>
            {slot.time}
          </p>
          <span className="text-xs" style={{ color: STEEL }}>
            Counter {slot.counter}
          </span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: slot.active ? "#EAF4EC" : "#EFEFEF", color: slot.active ? GREEN : STEEL }}
          >
            {slot.active ? "ACTIVE" : "DISABLED"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleActive(slot.id)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-md border"
            style={{ borderColor: BORDER, color: slot.active ? RED : GREEN }}
          >
            {slot.active ? "Disable" : "Enable"}
          </button>
          <button onClick={() => onEdit(slot)} aria-label={`Edit ${slot.time} slot`} className="p-2 rounded-md hover:bg-black/5">
            <Pencil size={15} color={STEEL} />
          </button>
          <button
            onClick={() => deletable && onDelete(slot.id)}
            disabled={!deletable}
            aria-label={`Delete ${slot.time} slot`}
            className="p-2 rounded-md hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed"
            title={deletable ? "Delete slot" : "Can't delete a slot with active bookings"}
          >
            <Trash2 size={15} color={RED} />
          </button>
        </div>
      </div>

      <div className="flex justify-between text-xs mb-1" style={{ color: STEEL }}>
        <span>Bookings</span>
        <span className="font-mono">
          {slot.ordersPlaced}/{slot.capacity}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: PAPER }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 100 ? RED : GREEN }} />
      </div>
      {!deletable && (
        <p className="text-[11px] mt-2" style={{ color: STEEL }}>
          Has active bookings — disable instead of deleting, or wait until orders clear.
        </p>
      )}
    </div>
  );
}
