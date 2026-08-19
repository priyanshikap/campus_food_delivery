

import { useEffect, useState } from "react";
import { createSlot, deleteSlot as removeSlot, getManageSlots, updateSlot as saveSlot } from "../services/staffService";
import { canDeleteSlot } from "../utils/slotValidators";

function generateId() {
  return `slot-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function useSlots() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    getManageSlots().then(setSlots).catch(() => setSlots([]));
  }, []);

  const addSlot = async (values) => {
    const slot = {
      id: generateId(),
      time: values.time.trim(),
      counter: values.counter,
      capacity: Number(values.capacity),
      ordersPlaced: 0,
      active: true,
    };
    const created = await createSlot(slot);
    setSlots((prev) => [...prev, created]);
  };

  const updateSlot = async (id, values) => {
    const current = slots.find((slot) => slot.id === id);
    const updated = await saveSlot(id, { ...current, ...values, capacity: Number(values.capacity) });
    setSlots((prev) => prev.map((s) => s.id === id ? updated : s));
  };

  /** Returns false (and does nothing) if the slot still has active bookings. */
  const deleteSlot = (id) => {
    const slot = slots.find((s) => s.id === id);
    if (!slot || !canDeleteSlot(slot)) return false;
    removeSlot(id).then(() => setSlots((prev) => prev.filter((s) => s.id !== id)));
    return true;
  };

  const toggleActive = async (id) => {
    const slot = slots.find((entry) => entry.id === id);
    if (!slot) return;
    const updated = await saveSlot(id, { ...slot, active: !slot.active });
    setSlots((prev) => prev.map((s) => s.id === id ? updated : s));
  };

  return { slots, addSlot, updateSlot, deleteSlot, toggleActive };
}
