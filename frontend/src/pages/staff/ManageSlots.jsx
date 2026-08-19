import { useState } from "react";
import { Plus } from "lucide-react";
import { useSlots } from "../../hooks/useSlots";
import SlotRow from "../../components/staff/SlotRow";
import SlotForm from "../../components/staff/SlotForm";

const INK = "#1E1B16";
const PAPER = "#EFE7D8";
const BORDER = "#D9CBAA";
const MUSTARD = "#D98E04";
const STEEL = "#5C6B66";
const RED = "#C1442D";

export default function ManageSlots() {
  const { slots, addSlot, updateSlot, deleteSlot, toggleActive } = useSlots();
  const [formMode, setFormMode] = useState(null); // null | 'add' | slot being edited
  const [blockedNotice, setBlockedNotice] = useState(false);

  const handleSubmit = (values) => {
    if (formMode === "add") {
      addSlot(values);
    } else if (formMode) {
      updateSlot(formMode.id, values);
    }
    setFormMode(null);
  };

  const handleDelete = (id) => {
    const ok = deleteSlot(id);
    if (!ok) {
      setBlockedNotice(true);
      setTimeout(() => setBlockedNotice(false), 3000);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>
            Manage Pickup Slots
          </h1>
          <button
            onClick={() => setFormMode("add")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-white"
            style={{ background: MUSTARD }}
          >
            <Plus size={14} /> Add slot
          </button>
        </div>
        <p className="text-sm mb-6" style={{ color: STEEL }}>
          {slots.length} slots configured
        </p>

        {blockedNotice && (
          <div className="rounded-md px-4 py-3 mb-4 text-xs" style={{ background: "#FBEAE6", color: RED }}>
            That slot has active bookings and can't be deleted — disable it instead.
          </div>
        )}

        <div className="space-y-3">
          {slots.map((slot) => (
            <SlotRow key={slot.id} slot={slot} onEdit={(s) => setFormMode(s)} onDelete={handleDelete} onToggleActive={toggleActive} />
          ))}
        </div>

        {formMode && (
          <SlotForm
            initialValues={formMode === "add" ? null : formMode}
            onSubmit={handleSubmit}
            onCancel={() => setFormMode(null)}
          />
        )}
      </div>
    </div>
  );
}
