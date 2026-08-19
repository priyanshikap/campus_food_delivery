import { useEffect, useState } from "react";
import { getManageSlots } from "../../services/staffService";
import { isSlotFull } from "../../utils/inventoryValidation";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const GREEN = "#2F7D4F";
const RED = "#C1442D";
const STEEL = "#5C6B66";

export default function PickupSlotSummary() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    getManageSlots().then(setSlots).catch(() => setSlots([]));
  }, []);

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4" style={{ borderColor: BORDER }}>
      <h3 className="font-semibold text-sm mb-3" style={{ color: INK }}>
        Pickup slot summary
      </h3>
      <div className="space-y-2">
        {slots.map((slot) => {
          const full = isSlotFull(slot);
          const pct = Math.min(100, Math.round((slot.ordersPlaced / slot.capacity) * 100));
          return (
            <div key={slot.id}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: INK }}>
                  {slot.time} · Counter {slot.counter}
                </span>
                <span className="font-mono" style={{ color: full ? RED : STEEL }}>
                  {slot.ordersPlaced}/{slot.capacity}
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: PAPER }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: full ? RED : GREEN }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
