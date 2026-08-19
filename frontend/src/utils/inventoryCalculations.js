// Inventory calculations — pure functions only. Inventory.jsx reads these
// results and renders them; it never computes availability itself.

export const LOW_STOCK_THRESHOLD = 5;

export const INVENTORY_STATUS = {
  AVAILABLE: "AVAILABLE",
  LOW_STOCK: "LOW STOCK",
  SOLD_OUT: "SOLD OUT",
  TEMPORARILY_UNAVAILABLE: "TEMPORARILY UNAVAILABLE",
};

/** @param {{ total: number, reserved: number }} entry */
export function getAvailableQty(entry) {
  return Math.max(0, entry.total - entry.reserved);
}

/**
 * @param {{ total: number, reserved: number, manuallyUnavailable?: boolean }} entry
 * @returns {string} one of INVENTORY_STATUS
 */
export function getInventoryStatus(entry) {
  if (entry.manuallyUnavailable) return INVENTORY_STATUS.TEMPORARILY_UNAVAILABLE;

  const available = getAvailableQty(entry);
  if (available === 0) return INVENTORY_STATUS.SOLD_OUT;
  if (available <= LOW_STOCK_THRESHOLD) return INVENTORY_STATUS.LOW_STOCK;
  return INVENTORY_STATUS.AVAILABLE;
}

/** Percentage of total stock still available, for the progress bar. 0–100. */
export function getAvailabilityPercent(entry) {
  if (entry.total <= 0) return 0;
  return Math.round((getAvailableQty(entry) / entry.total) * 100);
}

/** Enriches a raw inventory row with derived available/status/percent fields. */
export function deriveInventoryRow(entry) {
  return {
    ...entry,
    available: getAvailableQty(entry),
    status: getInventoryStatus(entry),
    availabilityPercent: getAvailabilityPercent(entry),
  };
}

export function isLowOrOut(entry) {
  const status = getInventoryStatus(entry);
  return status === INVENTORY_STATUS.LOW_STOCK || status === INVENTORY_STATUS.SOLD_OUT;
}
